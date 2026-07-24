import mongoose from "mongoose";

import Admission from "../models/admission.model.js";
import Student from "../models/student.model.js";
import Counsellor from "../models/counsellor.model.js";

import Contact from "../models/Contact.model.js";
import University from "../models/university.model.js";
import Course from "../models/course_model.js";
import Counter from "../models/Counter.model.js";

import Auth from "../models/auth.model.js";
import Notification from "../models/notification.model.js";
import Email from "../models/email.model.js";

import Activity from "../models/activity.model.js";

// =====================================================
// CREATE ADMISSION
// =====================================================



export const createAdmission = async (req, res) => {
  try {
    const {
      studentId,
      lead,
      counsellor,

      university,
      course,

      intake,
      country,

      tuitionFee = 0,
      scholarshipAmount = 0,

      universityCommissionPercent = 0,
      counsellorCommissionPercent = 0,

      expectedJoiningDate,
      paymentDueDate,

      admissionDate,

      notes = "",
      remarks = "",
    } = req.body;


    // =====================================================
    // BASIC VALIDATION
    // =====================================================

    if (!studentId || !lead || !university || !course) {
      return res.status(400).json({
        success: false,
        message: "Student, Lead, University and Course are required.",
      });
    }


    // =====================================================
    // FETCH MASTER DATA
    // =====================================================

    const [student, leadData, universityData, courseData] =
      await Promise.all([
        Student.findById(studentId),

        Contact.findById(lead),

        University.findById(university),

        Course.findById(course),
      ]);


    if (!student) {
      throw new Error("Student not found.");
    }


    if (!leadData) {
      throw new Error("Lead not found.");
    }


    if (!universityData) {
      throw new Error("University not found.");
    }


    if (!courseData) {
      throw new Error("Course not found.");
    }



    // =====================================================
    // UNIVERSITY COURSE MATCH CHECK
    // =====================================================

    if (
      courseData.university.toString() !==
      universityData._id.toString()
    ) {
      throw new Error(
        "Selected course does not belong to selected university."
      );
    }



    // =====================================================
    // ACTIVE STATUS CHECK
    // =====================================================

    if (universityData.status !== "Approved") {
      throw new Error("University is not approved.");
    }


    if (courseData.status !== "Active") {
      throw new Error("Course is not active.");
    }



    // =====================================================
    // COUNSELLOR FIND
    // =====================================================

    const counsellorId =
      counsellor ||
      student.counsellor ||
      leadData.counsellor;


    if (!counsellorId) {
      throw new Error("Counsellor not assigned.");
    }


    const counsellorData =
      await Counsellor.findById(counsellorId);


    if (!counsellorData) {
      throw new Error("Counsellor not found.");
    }



    // =====================================================
    // DUPLICATE ADMISSION CHECK
    // =====================================================

    const existingAdmission =
      await Admission.findOne({
        student: student._id,

        university: universityData._id,

        course: courseData._id,

        admissionStatus: {
          $nin: [
            "Cancelled",
            "Rejected",
          ],
        },
      });


    if (existingAdmission) {
      throw new Error(
        "Admission already exists for this student, university and course."
      );
    }



    // =====================================================
    // SINGLE ACTIVE ADMISSION CHECK
    // =====================================================

    const activeAdmission =
      await Admission.findOne({
        student: student._id,

        admissionStatus: {
          $in: [
            "Applied",
            "Documents Pending",
            "Documents Verified",
            "Offer Letter",
            "Fee Paid",
            "Enrolled",
          ],
        },
      });


    if (activeAdmission) {
      throw new Error(
        "Student already has an active admission."
      );
    }



    // =====================================================
    // GENERATE ADMISSION NUMBER
    // =====================================================

    const counter =
      await Counter.findOneAndUpdate(
        {
          name: "admission",
        },

        {
          $inc: {
            sequence: 1,
          },
        },

        {
          new: true,
          upsert: true,
        }
      );


    const admissionNumber =
      `ADM-${String(counter.sequence).padStart(6, "0")}`;
    // =====================================================
    // FEE CALCULATION
    // =====================================================

    const finalTuitionFee =
      Number(tuitionFee || courseData.fees || 0);

    const finalScholarship =
      Number(scholarshipAmount || 0);

    const netFee =
      Math.max(finalTuitionFee - finalScholarship, 0);



    // =====================================================
    // COMMISSION CALCULATION
    // =====================================================

    const finalUniversityCommissionAmount =
      (netFee *
        Number(universityCommissionPercent)) /
      100;


    const finalCounsellorCommissionAmount =
      (finalUniversityCommissionAmount *
        Number(counsellorCommissionPercent)) /
      100;



    // =====================================================
    // CREATE ADMISSION
    // =====================================================

    const admissionResult =
      await Admission.create([
        {
          admissionNumber,


          // REFERENCES

          lead: leadData._id,

          student: student._id,

          counsellor: counsellorData._id,

          university: universityData._id,

          course: courseData._id,

          createdBy: req.user._id,



          // STUDENT SNAPSHOT

          studentName:
            student.studentName,

          studentEmail:
            student.email || "",

          studentPhone:
            student.phoneNumber || "",



          // UNIVERSITY SNAPSHOT

          universityName:
            universityData.universityName,



          // COURSE SNAPSHOT

          courseName:
            courseData.courseName,



          // ADMISSION DETAILS

          intake:
            intake ||
            student.intake ||
            "",


          country:
            country ||
            student.country ||
            "India",


          admissionDate:
            admissionDate ||
            new Date(),


          expectedJoiningDate:
            expectedJoiningDate ||
            null,



          // FEES

          tuitionFee:
            finalTuitionFee,


          scholarshipAmount:
            finalScholarship,


          netFee,



          // UNIVERSITY COMMISSION

          universityCommissionPercent:
            Number(universityCommissionPercent),


          universityCommissionAmount:
            finalUniversityCommissionAmount,



          // COUNSELLOR COMMISSION

          counsellorCommissionPercent:
            Number(counsellorCommissionPercent),


          counsellorCommissionAmount:
            finalCounsellorCommissionAmount,



          paymentDueDate:
            paymentDueDate ||
            null,


          notes,

          remarks,



          timeline: [
            {
              title:
                "Admission Created",


              description:
                `Admission ${admissionNumber} created by ${req.user.name}.`,


              createdBy:
                req.user._id,


              date:
                new Date(),
            },
          ],
        },
      ]);


    const createdAdmission =
      admissionResult[0];




    // =====================================================
    // UPDATE STUDENT AFTER ADMISSION
    // =====================================================

    await Student.findByIdAndUpdate(
      student._id,

      {
        university:
          universityData.universityName,


        course:
          courseData.courseName,


        country:
          country ||
          student.country ||
          "India",


        intake:
          intake ||
          student.intake ||
          "",


        tuitionFee:
          finalTuitionFee,


        commissionPercent:
          Number(counsellorCommissionPercent),


        commissionAmount:
          finalCounsellorCommissionAmount,


        admissionStatus:
          "Applied",



        $push: {
          timeline: {
            title:
              "Admission Created",


            description:
              `Admission ${admissionNumber} created.`,


            date:
              new Date(),
          },
        },
      }
    );




    // =====================================================
    // UPDATE LEAD STATUS
    // =====================================================

    await Contact.findByIdAndUpdate(
      leadData._id,

      {
        status:
          "Converted",


        applicationStatus:
          "Applied",


        university:
          universityData.universityName,


        country:
          country ||
          "India",


        intake:
          intake ||
          "",


        tuitionFee:
          finalTuitionFee,


        commissionAmount:
          finalCounsellorCommissionAmount,


        paymentStatus:
          "Pending",



        $push: {
          timeline: {
            title:
              "Lead Converted",


            description:
              `Lead converted into admission ${admissionNumber}.`,


            date:
              new Date(),
          },
        },
      }
    );
// =====================================================
// UPDATE COUNSELLOR PERFORMANCE
// =====================================================

await Counsellor.findByIdAndUpdate(
  counsellorData._id,

  {
    $inc: {
      convertedLeads: 1,
    },
  }
);




// =====================================================
// RECALCULATE COUNSELLOR COMMISSION
// =====================================================

const commissionSummary =
  await Admission.aggregate([
    {
      $match: {
        counsellor: counsellorData._id,
      },
    },

    {
      $group: {
        _id: null,

        totalCommission: {
          $sum:
            "$counsellorCommissionAmount",
        },


        paidCommission: {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$counsellorPaymentStatus",
                  "Paid",
                ],
              },

              "$counsellorCommissionAmount",

              0,
            ],
          },
        },
      },
    },
  ]);



const totalCommission =
  commissionSummary[0]?.totalCommission || 0;


const paidCommission =
  commissionSummary[0]?.paidCommission || 0;



await Counsellor.findByIdAndUpdate(
  counsellorData._id,

  {
    totalCommission,

    paidCommission,

    pendingCommission:
      totalCommission - paidCommission,
  }
);




// =====================================================
// ACTIVITY LOG
// =====================================================

await Activity.create(
  [
    {
      action:
        `Admission ${admissionNumber} created for ${student.studentName}.`,


      by:
        req.user.name,
    },
  ]
);





// =====================================================
// ADMIN NOTIFICATION
// =====================================================

const admins =
  await Auth.find({
    role: {
      $in: [
        "SuperAdmin",
        "Admin",
      ],
    },

    isActive: true,
  });



if (admins.length > 0) {

  const adminNotifications =
    admins.map((admin) => ({

      title:
        "New Admission Created",


      message:
        `Admission ${admissionNumber} created for ${student.studentName}.`,


      receiver:
        admin._id,


      receiverModel:
        "Auth",


      type:
        "Admission",


      icon:
        "GraduationCap",


      link:
        `/admin/admissions/${createdAdmission._id}`,


      createdBy:
        req.user._id,

    }));



  await Notification.insertMany(
    adminNotifications
  );

}





// =====================================================
// COUNSELLOR NOTIFICATION
// =====================================================

await Notification.create(
  [
    {
      title:
        "Admission Created",


      message:
        `Admission ${admissionNumber} has been created successfully.`,


      receiver:
        counsellorData._id,


      receiverModel:
        "Counsellor",


      type:
        "Admission",


      icon:
        "UserCheck",


      link:
        `/counsellor/admissions/${createdAdmission._id}`,


      createdBy:
        req.user._id,
    },
  ]
);

// =====================================================
// EMAIL LOG CREATION
// =====================================================

const emailLogs = [];


if (student.email) {

  emailLogs.push({

    receiver:
      student.email,


    subject:
      "Admission Created Successfully",


    message:
      `Dear ${student.studentName}, your admission ${admissionNumber} has been created successfully.`,


    type:
      "Admission",


    sentBy:
      req.user._id,

  });

}



if (universityData.email) {

  emailLogs.push({

    receiver:
      universityData.email,


    subject:
      "New Student Admission",


    message:
      `New admission received for ${student.studentName} in ${courseData.courseName}.`,


    type:
      "Admission",


    sentBy:
      req.user._id,

  });

}



if (emailLogs.length) {

  await Email.insertMany(
    emailLogs
  );

}




// =====================================================
// FINAL RESPONSE DATA
// =====================================================

const finalAdmission =
  await Admission.findById(
    createdAdmission._id
  )

    .populate({
      path:
        "student",

      select:
        "studentNumber studentName email phoneNumber admissionStatus",
    })


    .populate({
      path:
        "lead",

      select:
        "leadNumber leadName email phoneNumber status",
    })


    .populate({
      path:
        "university",

      select:
        "universityName universityLogo country state city",
    })


    .populate({
      path:
        "course",

      select:
        "courseName duration fees courseMode",
    })


    .populate({
      path:
        "counsellor",

      select:
        "name email employeeId phoneNumber",
    })


    .populate({
      path:
        "createdBy",

      select:
        "name email role",
    });





return res.status(201).json({

  success:
    true,


  message:
    "Admission created successfully.",


  admission:
    finalAdmission,

});




} catch (error) {


console.error(
  "CREATE ADMISSION ERROR:",
  error
);



return res.status(500).json({

  success:
    false,


  message:
    error.message ||
    "Failed to create admission.",

});

}
};

// =====================================================
// GET ALL ADMISSIONS
// Search + Filter + Pagination
// =====================================================
export const getAllAdmissions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      university,
      course,
      counsellor,
      admissionStatus,
      documentStatus,
      enrollmentStatus,
      universityPaymentStatus,
      counsellorPaymentStatus,
      intake,
      country,
      fromDate,
      toDate,
    } = req.query;

    const query = {};

    // ============================================
    // Search
    // ============================================

    if (search.trim()) {
      query.$or = [
        {
          studentName: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          studentEmail: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          studentPhone: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          admissionNumber: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    // ============================================
    // Filters
    // ============================================

    if (university) query.university = university;

    if (course) query.course = course;

    if (counsellor) query.counsellor = counsellor;

    if (admissionStatus) query.admissionStatus = admissionStatus;

    if (documentStatus) query.documentStatus = documentStatus;

    if (enrollmentStatus) query.enrollmentStatus = enrollmentStatus;

    if (universityPaymentStatus)
      query.universityPaymentStatus = universityPaymentStatus;

    if (counsellorPaymentStatus)
      query.counsellorPaymentStatus = counsellorPaymentStatus;

    if (intake) query.intake = intake;

    if (country) query.country = country;

    // ============================================
    // Date Filter
    // ============================================

    if (fromDate || toDate) {
      query.admissionDate = {};

      if (fromDate) query.admissionDate.$gte = new Date(fromDate);

      if (toDate) query.admissionDate.$lte = new Date(toDate);
    }

    // ============================================
    // Pagination
    // ============================================

    const pageNumber = Math.max(Number(page), 1);

    const pageSize = Math.max(Number(limit), 1);

    const skip = (pageNumber - 1) * pageSize;

    // ============================================
    // Fetch
    // ============================================

    const [total, admissions] = await Promise.all([
      Admission.countDocuments(query),

      Admission.find(query)
        .populate({
          path: "student",
          select: "studentName email phoneNumber admissionStatus",
        })
        .populate({
          path: "lead",
          select: "leadName phoneNumber email status",
        })
        .populate({
          path: "university",
          select: "universityName universityLogo status",
        })
        .populate({
          path: "course",
          select: "courseName duration fees courseMode",
        })
        .populate({
          path: "counsellor",
          select: "name employeeId email phoneNumber",
        })
        .populate({
          path: "createdBy",
          select: "name email role",
        })
        .sort({
          admissionDate: -1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(pageSize)
        .lean(),
    ]);

    return res.status(200).json({
      success: true,
      total,
      count: admissions.length,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / pageSize),
      admissions,
    });
  } catch (error) {
    console.error("GET ALL ADMISSIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch admissions.",
      error: error.message,
    });
  }
};
// =====================================================
// GET SINGLE ADMISSION
// =====================================================
export const getSingleAdmission = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid admission id.",
      });
    }

    const admission = await Admission.findById(id)
      .populate({
        path: "student",
        select:
          "studentNumber studentName email phoneNumber admissionStatus counsellor university course intake documents notes timeline",
      })
      .populate({
        path: "lead",
        select:
          "leadNumber leadName email phoneNumber qualification interestedCourse status source",
      })
      .populate({
        path: "university",
        select:
          "universityName universityLogo location country state city website email phoneNumber status",
      })
      .populate({
        path: "course",
        select: "courseName duration fees courseMode status",
      })
      .populate({
        path: "counsellor",
        select: "name employeeId email phoneNumber designation role",
      })
      .populate({
        path: "createdBy",
        select: "name email role",
      })
      .lean();

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found.",
      });
    }

    return res.status(200).json({
      success: true,
      admission,
    });
  } catch (error) {
    console.error("GET SINGLE ADMISSION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch admission.",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE ADMISSION
// =====================================================
export const deleteAdmission = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        success: false,
        message: "Invalid admission id.",
      });
    }

    const admission = await Admission.findById(id).session(session);

    if (!admission) {
      await session.abortTransaction();
      session.endSession();

      return res.status(404).json({
        success: false,
        message: "Admission not found.",
      });
    }

    // ============================================
    // Reset Student
    // ============================================

    await Student.findByIdAndUpdate(
      admission.student,
      {
        admissionStatus: "Interested",
        university: "",
        course: "",
        intake: "",
      },
      { session },
    );

    // ============================================
    // Reset Lead
    // ============================================

    await Contact.findByIdAndUpdate(
      admission.lead,
      {
        applicationStatus: "Not Applied",
      },
      { session },
    );
    // ============================================
    // Update Counsellor Converted Leads
    // ============================================

    await Counsellor.findByIdAndUpdate(
      admission.counsellor,
      {
        $inc: {
          convertedLeads: -1,
        },
      },
      {
        session,
      },
    );
    // ============================================
    // Activity
    // ============================================

    await Activity.create(
      [
        {
          action: `Admission ${admission.admissionNumber} deleted`,
          by: req.user.name,
        },
      ],
      { session },
    );

    // ============================================
    // Delete Admission
    // ============================================

    await Admission.findByIdAndDelete(id, { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Admission deleted successfully.",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("DELETE ADMISSION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete admission.",
      error: error.message,
    });
  }
};
// =====================================================
// UPDATE ADMISSION
// =====================================================

export const updateAdmission = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { id } = req.params;

    // =====================================================
    // VALIDATE ID
    // =====================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        success: false,
        message: "Invalid admission id.",
      });
    }

    // =====================================================
    // FIND ADMISSION
    // =====================================================

    const admission = await Admission.findById(id).session(session);

    if (!admission) {
      await session.abortTransaction();
      session.endSession();

      return res.status(404).json({
        success: false,
        message: "Admission not found.",
      });
    }

    // =====================================================
    // REQUEST DATA
    // =====================================================

    const {
      university,
      course,

      intake,
      country,

      tuitionFee,
      scholarshipAmount,
      netFee,

      universityCommissionPercent,
      universityCommissionAmount,

      counsellorCommissionPercent,
      counsellorCommissionAmount,

      universityPaymentStatus,
      counsellorPaymentStatus,

      admissionStatus,
      documentStatus,
      enrollmentStatus,

      admissionDate,
      expectedJoiningDate,
      paymentDueDate,

      remarks,
      notes,
    } = req.body;

    // =====================================================
    // OLD DATA SNAPSHOT
    // =====================================================

    const oldAdmissionStatus = admission.admissionStatus;

    const oldUniversityPaymentStatus = admission.universityPaymentStatus;

    const oldCounsellorPaymentStatus = admission.counsellorPaymentStatus;

    const oldUniversity = admission.universityName;

    const oldCourse = admission.courseName;

    // =====================================================
    // UNIVERSITY UPDATE
    // =====================================================

    if (university) {
      const universityData =
        await University.findById(university).session(session);

      if (!universityData) {
        await session.abortTransaction();
        session.endSession();

        return res.status(404).json({
          success: false,
          message: "University not found.",
        });
      }

      admission.university = universityData._id;

      admission.universityName = universityData.universityName;
    }

    // =====================================================
    // COURSE UPDATE
    // =====================================================

    if (course) {
      const courseData = await Course.findById(course).session(session);

      if (!courseData) {
        await session.abortTransaction();
        session.endSession();

        return res.status(404).json({
          success: false,
          message: "Course not found.",
        });
      }

      admission.course = courseData._id;

      admission.courseName = courseData.courseName;
    }

    // =====================================================
    // UPDATE BASIC DETAILS
    // =====================================================

    if (intake !== undefined) admission.intake = intake;

    if (country !== undefined) admission.country = country;

    if (tuitionFee !== undefined) admission.tuitionFee = tuitionFee;

    if (scholarshipAmount !== undefined)
      admission.scholarshipAmount = scholarshipAmount;

    if (netFee !== undefined) admission.netFee = netFee;

    // =====================================================
    // COMMISSION UPDATE
    // =====================================================

    // =====================================================
    // AUTO COMMISSION RECALCULATION
    // =====================================================

    admission.netFee =
      Number(admission.tuitionFee || 0) -
      Number(admission.scholarshipAmount || 0);

    admission.universityCommissionAmount =
      (admission.netFee * Number(admission.universityCommissionPercent || 0)) /
      100;

    admission.counsellorCommissionAmount =
      (admission.universityCommissionAmount *
        Number(admission.counsellorCommissionPercent || 0)) /
      100;

    if (universityCommissionPercent !== undefined) {
      admission.universityCommissionPercent = universityCommissionPercent;
    }

    if (universityCommissionAmount !== undefined) {
      admission.universityCommissionAmount = universityCommissionAmount;
    }

    if (counsellorCommissionPercent !== undefined) {
      admission.counsellorCommissionPercent = counsellorCommissionPercent;
    }

    if (counsellorCommissionAmount !== undefined) {
      admission.counsellorCommissionAmount = counsellorCommissionAmount;
    }

    // =====================================================
    // STATUS UPDATE
    // =====================================================

    if (universityPaymentStatus)
      admission.universityPaymentStatus = universityPaymentStatus;

    if (counsellorPaymentStatus)
      admission.counsellorPaymentStatus = counsellorPaymentStatus;

    if (admissionStatus) admission.admissionStatus = admissionStatus;

    if (documentStatus) admission.documentStatus = documentStatus;

    if (enrollmentStatus) admission.enrollmentStatus = enrollmentStatus;

    // =====================================================
    // DATE UPDATE
    // =====================================================

    if (admissionDate) admission.admissionDate = admissionDate;

    if (expectedJoiningDate)
      admission.expectedJoiningDate = expectedJoiningDate;

    if (paymentDueDate) admission.paymentDueDate = paymentDueDate;

    // =====================================================
    // NOTES UPDATE
    // =====================================================

    if (remarks !== undefined) admission.remarks = remarks;

    if (notes !== undefined) admission.notes = notes;

    // =====================================================
    // PAYMENT DATE AUTO UPDATE
    // =====================================================

    if (
      oldUniversityPaymentStatus !== "Paid" &&
      admission.universityPaymentStatus === "Paid"
    ) {
      admission.universityPaymentDate = new Date();
    }

    if (
      oldCounsellorPaymentStatus !== "Paid" &&
      admission.counsellorPaymentStatus === "Paid"
    ) {
      admission.counsellorPaymentDate = new Date();
    }

    // =====================================================
    // TIMELINE ENTRY
    // =====================================================

    admission.timeline.push({
      title: "Admission Updated",

      description: `${req.user.name} updated admission details.`,

      createdBy: req.user._id,

      date: new Date(),
    });

    await admission.save({
      session,
    });
    // =====================================================
    // UPDATE STUDENT INFORMATION
    // =====================================================

    await Student.findByIdAndUpdate(
      admission.student,
      {
        university: admission.universityName,

        course: admission.courseName,

        country: admission.country,

        intake: admission.intake,

        tuitionFee: admission.tuitionFee,

        commissionPercent: admission.counsellorCommissionPercent,

        commissionAmount: admission.counsellorCommissionAmount,

        paymentStatus: admission.counsellorPaymentStatus,

        admissionStatus: admission.admissionStatus,

        $push: {
          timeline: {
            title: "Admission Updated",

            description: `Admission details updated by ${req.user.name}.`,

            date: new Date(),
          },
        },
      },
      {
        session,
      },
    );

    // =====================================================
    // UPDATE LEAD STATUS
    // =====================================================

    await Contact.findByIdAndUpdate(
      admission.lead,
      {
        applicationStatus: admission.admissionStatus,

        university: admission.universityName,

        country: admission.country,

        intake: admission.intake,

        tuitionFee: admission.tuitionFee,

        commissionAmount: admission.counsellorCommissionAmount,

        paymentStatus: admission.counsellorPaymentStatus,

        $push: {
          timeline: {
            title: "Admission Updated",

            description: `Lead converted admission updated by ${req.user.name}.`,

            date: new Date(),
          },
        },
      },
      {
        session,
      },
    );

    // =====================================================
    // ACTIVITY LOGS
    // =====================================================

    if (oldAdmissionStatus !== admission.admissionStatus) {
      await Activity.create(
        [
          {
            action: `Admission status changed ${oldAdmissionStatus} → ${admission.admissionStatus}`,

            by: req.user.name,
          },
        ],
        {
          session,
        },
      );
    }

    if (oldUniversityPaymentStatus !== admission.universityPaymentStatus) {
      await Activity.create(
        [
          {
            action: `University payment status changed ${oldUniversityPaymentStatus} → ${admission.universityPaymentStatus}`,

            by: req.user.name,
          },
        ],
        {
          session,
        },
      );
    }

    if (oldCounsellorPaymentStatus !== admission.counsellorPaymentStatus) {
      await Activity.create(
        [
          {
            action: `Counsellor payment status changed ${oldCounsellorPaymentStatus} → ${admission.counsellorPaymentStatus}`,

            by: req.user.name,
          },
        ],
        {
          session,
        },
      );
    }

    if (oldUniversity !== admission.universityName) {
      await Activity.create(
        [
          {
            action: `University changed ${oldUniversity} → ${admission.universityName}`,

            by: req.user.name,
          },
        ],
        {
          session,
        },
      );
    }

    if (oldCourse !== admission.courseName) {
      await Activity.create(
        [
          {
            action: `Course changed ${oldCourse} → ${admission.courseName}`,

            by: req.user.name,
          },
        ],
        {
          session,
        },
      );
    }

    // =====================================================
    // COUNSELLOR COMMISSION RECALCULATION
    // =====================================================

    if (admission.counsellor) {
      const commissionData = await Admission.aggregate([
        {
          $match: {
            counsellor: admission.counsellor,
          },
        },

        {
          $group: {
            _id: null,

            totalCommission: {
              $sum: "$counsellorCommissionAmount",
            },

            paidCommission: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$counsellorPaymentStatus", "Paid"],
                  },

                  "$counsellorCommissionAmount",

                  0,
                ],
              },
            },
          },
        },
      ]).session(session);

      const totalCommission = commissionData[0]?.totalCommission || 0;

      const paidCommission = commissionData[0]?.paidCommission || 0;

      await Counsellor.findByIdAndUpdate(
        admission.counsellor,
        {
          totalCommission,

          paidCommission,

          pendingCommission: totalCommission - paidCommission,
        },
        {
          session,
        },
      );
    }

    // =====================================================
    // ADMIN NOTIFICATION
    // =====================================================

    const admins = await Auth.find({
      role: {
        $in: ["SuperAdmin", "Admin"],
      },

      isActive: true,
    }).session(session);

    if (admins.length) {
      const notifications = admins.map((admin) => ({
        title: "Admission Updated",

        message: `Admission ${admission.admissionNumber} updated by ${req.user.name}.`,

        receiver: admin._id,

        receiverModel: "Auth",

        type: "Admission",

        icon: "GraduationCap",

        link: `/admin/admissions/${admission._id}`,

        createdBy: req.user._id,
      }));

      await Notification.insertMany(notifications, {
        session,
      });
    }
    // =====================================================
    // COUNSELLOR NOTIFICATION
    // =====================================================

    if (admission.counsellor) {
      await Notification.create(
        [
          {
            title: "Admission Updated",

            message: `Admission ${admission.admissionNumber} details have been updated.`,

            receiver: admission.counsellor,

            receiverModel: "Counsellor",

            type: "Admission",

            icon: "GraduationCap",

            link: `/counsellor/admissions/${admission._id}`,

            createdBy: req.user._id,
          },
        ],
        {
          session,
        },
      );
    }

    // =====================================================
    // EMAIL LOG
    // =====================================================

    const emailReceivers = [];

    if (admission.studentEmail) {
      emailReceivers.push({
        receiver: admission.studentEmail,

        subject: "Admission Updated",

        message: `Your admission ${admission.admissionNumber} details have been updated.`,

        type: "Admission",

        sentBy: req.user._id,
      });
    }

    if (emailReceivers.length) {
      await Email.insertMany(emailReceivers, {
        session,
      });
    }

    // =====================================================
    // REFRESH DATA
    // =====================================================

    const updatedAdmission = await Admission.findById(admission._id)
      .populate({
        path: "student",

        select: "studentNumber studentName email phoneNumber admissionStatus",
      })

      .populate({
        path: "lead",

        select: "leadNumber leadName email phoneNumber status",
      })

      .populate({
        path: "university",

        select: "universityName universityLogo country state city status",
      })

      .populate({
        path: "course",

        select: "courseName duration fees courseMode",
      })

      .populate({
        path: "counsellor",

        select: "name email employeeId phoneNumber role",
      })

      .populate({
        path: "createdBy",

        select: "name email role",
      })

      .session(session);

    // =====================================================
    // COMMIT TRANSACTION
    // =====================================================

    await session.commitTransaction();

    session.endSession();

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,

      message: "Admission updated successfully.",

      admission: updatedAdmission,
    });
  } catch (error) {
    await session.abortTransaction();

    session.endSession();

    console.error("UPDATE ADMISSION ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to update admission.",

      error: error.message,
    });
  }
};

// =====================================================
// GET ADMISSION STATS
// Dashboard Analytics
// =====================================================
export const getAdmissionStats = async (req, res) => {
  try {
    // =================================================
    // BASIC COUNTS
    // =================================================

    const totalAdmissions = await Admission.countDocuments();

    const appliedAdmissions = await Admission.countDocuments({
      admissionStatus: "Applied",
    });

    const offerLetterAdmissions = await Admission.countDocuments({
      admissionStatus: "Offer Letter",
    });

    const enrolledAdmissions = await Admission.countDocuments({
      admissionStatus: "Enrolled",
    });

    const cancelledAdmissions = await Admission.countDocuments({
      admissionStatus: "Cancelled",
    });

    // =================================================
    // DOCUMENT STATUS
    // =================================================

    const pendingDocuments = await Admission.countDocuments({
      documentStatus: "Pending",
    });

    const verifiedDocuments = await Admission.countDocuments({
      documentStatus: "Verified",
    });

    // =================================================
    // PAYMENT STATUS
    // =================================================

    const universityPaid = await Admission.countDocuments({
      universityPaymentStatus: "Paid",
    });

    const universityPending = await Admission.countDocuments({
      universityPaymentStatus: "Pending",
    });

    const counsellorPaid = await Admission.countDocuments({
      counsellorPaymentStatus: "Paid",
    });

    const counsellorPending = await Admission.countDocuments({
      counsellorPaymentStatus: "Pending",
    });

    // =================================================
    // FINANCIAL SUMMARY
    // =================================================

    const financial = await Admission.aggregate([
      {
        $group: {
          _id: null,

          totalFee: {
            $sum: "$tuitionFee",
          },

          totalNetFee: {
            $sum: "$netFee",
          },

          universityCommission: {
            $sum: "$universityCommissionAmount",
          },

          counsellorCommission: {
            $sum: "$counsellorCommissionAmount",
          },

          paidCounsellorCommission: {
            $sum: {
              $cond: [
                {
                  $eq: ["$counsellorPaymentStatus", "Paid"],
                },

                "$counsellorCommissionAmount",

                0,
              ],
            },
          },

          pendingCounsellorCommission: {
            $sum: {
              $cond: [
                {
                  $ne: ["$counsellorPaymentStatus", "Paid"],
                },

                "$counsellorCommissionAmount",

                0,
              ],
            },
          },
        },
      },
    ]);

    const financialData = financial[0] || {
      totalFee: 0,
      totalNetFee: 0,
      universityCommission: 0,
      counsellorCommission: 0,
      paidCounsellorCommission: 0,
      pendingCounsellorCommission: 0,
    };

    // =================================================
    // MONTHLY REPORT
    // =================================================

    const monthlyAdmissions = await Admission.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$admissionDate",
            },

            year: {
              $year: "$admissionDate",
            },
          },

          count: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.year": 1,

          "_id.month": 1,
        },
      },
    ]);

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,

      stats: {
        totalAdmissions,

        appliedAdmissions,

        offerLetterAdmissions,

        enrolledAdmissions,

        cancelledAdmissions,

        pendingDocuments,

        verifiedDocuments,

        universityPaid,

        universityPending,

        counsellorPaid,

        counsellorPending,

        ...financialData,

        monthlyAdmissions,
      },
    });
  } catch (error) {
    console.error("ADMISSION STATS ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to fetch admission statistics.",

      error: error.message,
    });
  }
};
