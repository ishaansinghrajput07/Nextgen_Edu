import Student from "../models/student.model.js";
import Contact from "../models/Contact.model.js";
import Activity from "../models/activity.model.js";

// =================================================
// CREATE STUDENT
// =================================================

export const createStudent = async (req, res) => {
  try {
    const {
      lead,
      studentName,
      email,
      phoneNumber,
      counsellor,

      university,
      course,
      country,
      intake,

      tuitionFee,

      commissionPercent,
      commissionAmount,

      notes,
    } = req.body;

    // ============================================
    // Check Lead Exists
    // ============================================

    const leadData = await Contact.findById(lead);

    if (!leadData) {
      return res.status(404).json({
        success: false,

        message: "Lead not found",
      });
    }

    // ============================================
    // Duplicate Student Check
    // ============================================

    const existingStudent = await Student.findOne({
      email,

      phoneNumber,
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,

        message: "Student already exists",
      });
    }

    // ============================================
    // Create Student
    // ============================================

    const student = await Student.create({
      studentNumber: `STD-${Date.now()}`,

      lead,

      studentName,

      email,

      phoneNumber,

      counsellor,

      university,

      course,

      country,

      intake,

      tuitionFee,

      commissionPercent,

      commissionAmount,

      notes,

      timeline: [
        {
          title: "Student Created",

          description: `${req.user.name} created student profile.`,

          date: new Date(),
        },
      ],
    });

    // ============================================
    // Activity
    // ============================================

    await Activity.create({
      action: `Student Created (${student.studentName})`,

      by: req.user.name,
    });

    return res.status(201).json({
      success: true,

      message: "Student created successfully",

      student,
    });
  } catch (error) {
    console.log("CREATE STUDENT ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Server Error",

      error: error.message,
    });
  }
};

// =================================================
// GET ALL STUDENTS
// =================================================
// =================================================
// GET ALL STUDENTS
// Admin + Counsellor
// =================================================

export const getAllStudents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      admissionStatus,
      counsellor,
    } = req.query;

    const query = {};

    // =================================================
    // ROLE BASED ACCESS
    // =================================================

    // Admin → all students
    // Counsellor → only assigned students
    if (req.user.role?.toLowerCase() === "counsellor") {
      query.counsellor = req.user._id;
    }

    // =================================================
    // SEARCH
    // =================================================

    if (search) {
      query.$or = [
        {
          studentName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phoneNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // =================================================
    // ADMISSION STATUS
    // =================================================

    if (admissionStatus) {
      query.admissionStatus = admissionStatus;
    }

    // =================================================
    // ADMIN COUNSELLOR FILTER
    // =================================================

    // Admin can filter by counsellor.
    // Counsellor cannot change their own assigned-student scope.
    if (
      counsellor &&
      req.user.role?.toLowerCase() === "admin"
    ) {
      query.counsellor = counsellor;
    }

    // =================================================
    // PAGINATION
    // =================================================

    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.max(Number(limit) || 10, 1);

    const skip = (pageNumber - 1) * limitNumber;

    // =================================================
    // TOTAL
    // =================================================

    const total = await Student.countDocuments(query);

    // =================================================
    // STUDENTS
    // =================================================

    const students = await Student.find(query)
      .populate("lead", "studentName phone email")
      .populate("counsellor", "name email employeeId")
      .populate("university", "name")
      .populate("course", "name")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limitNumber);

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,
      total,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      students,
    });
  } catch (error) {
    console.log("GET ALL STUDENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
// =================================================
// GET SINGLE STUDENT
// =================================================

export const getSingleStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)

      .populate("lead")

      .populate("counsellor", "name email employeeId");

    if (!student) {
      return res.status(404).json({
        success: false,

        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,

      student,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

// =================================================
// UPDATE STUDENT
// =================================================

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,

        message: "Student not found",
      });
    }

    Object.assign(student, req.body);

    student.timeline.push({
      title: "Student Updated",

      description: `${req.user.name} updated student profile.`,

      date: new Date(),
    });

    await student.save();

    await Activity.create({
      action: `Student Updated (${student.studentName})`,

      by: req.user.name,
    });

    return res.status(200).json({
      success: true,

      message: "Student updated successfully",

      student,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

// =================================================
// DELETE STUDENT
// =================================================

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,

        message: "Student not found",
      });
    }

    const name = student.studentName;

    await student.deleteOne();

    await Activity.create({
      action: `Student Deleted (${name})`,

      by: req.user.name,
    });

    return res.status(200).json({
      success: true,

      message: "Student deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

// =================================================
// STUDENT STATS
// =================================================

export const getStudentStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    const enrolled = await Student.countDocuments({
      admissionStatus: "Enrolled",
    });

    const pending = await Student.countDocuments({
      paymentStatus: "Pending",
    });

    const paid = await Student.countDocuments({
      paymentStatus: "Paid",
    });

    return res.status(200).json({
      success: true,

      stats: {
        totalStudents,

        enrolled,

        pending,

        paid,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};
