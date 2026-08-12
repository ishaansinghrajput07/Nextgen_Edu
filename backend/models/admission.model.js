import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    // ============================================
    // Admission Number
    // ============================================

    admissionNumber: {
  type: String,
  required: true,
  unique: true,
  trim: true,
},

    // ============================================
    // Created By
    // ============================================

   createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Auth",
  required: true,
},

    // ============================================
    // References
    // ============================================

   lead: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Contact",
  required: true,
},

   student: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Student",
  required: true,
},

    counsellor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Counsellor",
      required: true,
      index: true,
    },

    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
      index: true,
    },

   course: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Course",
  required: true,
},

    // ============================================
    // Student Snapshot
    // ============================================

    studentName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    studentEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
      index: true,
    },

    studentPhone: {
      type: String,
      trim: true,
      default: "",
      maxlength: 20,
    },

    // ============================================
    // University Snapshot
    // ============================================

    universityName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
        // ============================================
    // Course Snapshot
    // ============================================

    courseName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    // ============================================
    // Admission Details
    // ============================================

    intake: {
      type: String,
      trim: true,
      default: "",
      maxlength: 100,
      index: true,
    },

    country: {
      type: String,
      trim: true,
      default: "India",
      maxlength: 100,
      index: true,
    },

    admissionDate: {
      type: Date,
      default: Date.now,
      index: true,
    },

    expectedJoiningDate: {
      type: Date,
      default: null,
    },

    paymentDueDate: {
      type: Date,
      default: null,
    },

    studentCode: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    applicationNumber: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    // ============================================
    // Fee Details
    // ============================================

    tuitionFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    scholarshipAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    netFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ============================================
    // University Commission
    // ============================================

    universityCommissionPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    universityCommissionAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    universityPaymentStatus: {
      type: String,
      enum: ["Pending", "Partial", "Paid", "Cancelled"],
      default: "Pending",
      index: true,
    },

    universityPaymentDate: {
      type: Date,
      default: null,
    },

    universityPaymentReference: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    universityInvoiceNumber: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },
        // ============================================
    // Counsellor Commission
    // ============================================

    counsellorCommissionPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    counsellorCommissionAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    counsellorPaymentStatus: {
      type: String,
      enum: ["Pending", "Partial", "Paid", "Cancelled"],
      default: "Pending",
      index: true,
    },

    counsellorPaymentDate: {
      type: Date,
      default: null,
    },

    counsellorPaymentReference: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    // ============================================
    // Admission Workflow
    // ============================================

    admissionStatus: {
      type: String,
      enum: [
        "Applied",
        "Document Pending",
        "Documents Pending",
        "Documents Verified",
        "Offer Letter",
        "Fee Paid",
        "Enrolled",
        "Rejected",
        "Cancelled",
        "Admission Cancelled",
        "Withdrawn",
      ],
      default: "Applied",
      index: true,
    },

    applicationStatus: {
      type: String,
      enum: [
        "Not Applied",
        "Applied",
        "Document Pending",
        "Documents Pending",
        "Documents Verified",
        "Offer Letter",
        "Fee Paid",
        "Enrolled",
        "Rejected",
        "Cancelled",
        "Admission Cancelled",
        "Withdrawn",
      ],
      default: "Applied",
      index: true,
    },

    documentStatus: {
      type: String,
      enum: [
        "Pending",
        "Uploaded",
        "Verified",
        "Rejected",
      ],
      default: "Pending",
      index: true,
    },

    enrollmentStatus: {
      type: String,
      enum: [
        "Pending",
        "Enrolled",
      ],
      default: "Pending",
      index: true,
    },

    // ============================================
    // Invoice Details
    // ============================================

    invoiceNumber: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    receiptNumber: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    offerLetter: {
      type: String,
      default: "",
      trim: true,
    },

    cas: {
      type: String,
      default: "",
      trim: true,
    },

    visa: {
      type: String,
      default: "",
      trim: true,
    },
        // ============================================
    // Email Status
    // ============================================

    adminMailSent: {
      type: Boolean,
      default: false,
    },

    counsellorMailSent: {
      type: Boolean,
      default: false,
    },

    studentMailSent: {
      type: Boolean,
      default: false,
    },

    universityMailSent: {
      type: Boolean,
      default: false,
    },

    // ============================================
    // Notes & Remarks
    // ============================================

    notes: {
      type: String,
      default: "",
      trim: true,
      maxlength: 5000,
    },

    remarks: {
      type: String,
      default: "",
      trim: true,
      maxlength: 3000,
    },

    // ============================================
    // Timeline
    // ============================================

    timeline: [
      {
        title: {
          type: String,
          default: "",
          trim: true,
          maxlength: 150,
        },

        description: {
          type: String,
          default: "",
          trim: true,
          maxlength: 1000,
        },

        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Auth",
          default: null,
        },

        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
        // ============================================
    // University Payment History
    // ============================================

    universityPayments: [
      {
        amount: {
          type: Number,
          default: 0,
          min: 0,
        },

        paymentDate: {
          type: Date,
          default: Date.now,
        },

        paymentMode: {
          type: String,
          enum: [
            "Cash",
            "Bank Transfer",
            "UPI",
            "Cheque",
            "Online",
          ],
          default: "Bank Transfer",
        },

        transactionId: {
          type: String,
          default: "",
          trim: true,
          maxlength: 100,
        },

        referenceNumber: {
          type: String,
          default: "",
          trim: true,
          maxlength: 100,
        },

        receivedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Auth",
          default: null,
        },

        remarks: {
          type: String,
          default: "",
          trim: true,
          maxlength: 500,
        },
      },
    ],
        // ============================================
    // Counsellor Payment History
    // ============================================

    counsellorPayments: [
      {
        amount: {
          type: Number,
          default: 0,
          min: 0,
        },

        paymentDate: {
          type: Date,
          default: Date.now,
        },

        paymentMode: {
          type: String,
          enum: [
            "Cash",
            "Bank Transfer",
            "UPI",
            "Cheque",
          ],
          default: "Bank Transfer",
        },

        transactionId: {
          type: String,
          default: "",
          trim: true,
          maxlength: 100,
        },

        referenceNumber: {
          type: String,
          default: "",
          trim: true,
          maxlength: 100,
        },

        paidBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Auth",
          default: null,
        },

        remarks: {
          type: String,
          default: "",
          trim: true,
          maxlength: 500,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
/*
|--------------------------------------------------------------------------
| Compound Indexes
|--------------------------------------------------------------------------
*/

// Prevent duplicate admission for same student + university + course
admissionSchema.index(
  {
    student: 1,
    university: 1,
    course: 1,
  },
  {
    unique: true,
    name: "unique_student_university_course",
  }
);

// Admission Number
admissionSchema.index(
  {
    admissionNumber: 1,
  },
  {
    unique: true,
    name: "admission_number_index",
  }
);

// Dashboard & Listing
admissionSchema.index({
  counsellor: 1,
  admissionStatus: 1,
});

admissionSchema.index({
  university: 1,
  admissionStatus: 1,
});

admissionSchema.index({
  course: 1,
});

admissionSchema.index({
  createdBy: 1,
});

admissionSchema.index({
  student: 1,
});

admissionSchema.index({
  lead: 1,
});

// Payment Tracking
admissionSchema.index({
  universityPaymentStatus: 1,
  counsellorPaymentStatus: 1,
});

// Workflow
admissionSchema.index({
  documentStatus: 1,
  enrollmentStatus: 1,
});

// Search
admissionSchema.index({
  studentName: "text",
  studentEmail: "text",
  studentPhone: "text",
  universityName: "text",
  courseName: "text",
  admissionNumber: "text",
});

// Date Filters
admissionSchema.index({
  admissionDate: -1,
});

admissionSchema.index({
  createdAt: -1,
});

admissionSchema.index({
  updatedAt: -1,
});
/*
|--------------------------------------------------------------------------
| Pre Save Hooks
|--------------------------------------------------------------------------
*/
/*
|--------------------------------------------------------------------------
| Pre Save Hooks
|--------------------------------------------------------------------------
*/


// =====================================================
// Auto Calculate Net Fee & Commission
// =====================================================

admissionSchema.pre("save", function () {

  // Net Fee

  this.netFee = Math.max(
    Number(this.tuitionFee || 0) -
      Number(this.scholarshipAmount || 0),
    0
  );


  // University Commission

  this.universityCommissionAmount =
    (
      this.netFee *
      Number(this.universityCommissionPercent || 0)
    ) / 100;



  // Counsellor Commission

  this.counsellorCommissionAmount =
    (
      this.universityCommissionAmount *
      Number(this.counsellorCommissionPercent || 0)
    ) / 100;

});



// =====================================================
// Auto Payment Dates
// =====================================================

admissionSchema.pre("save", function () {


  if (
    this.isModified("universityPaymentStatus") &&
    this.universityPaymentStatus === "Paid" &&
    !this.universityPaymentDate
  ) {

    this.universityPaymentDate = new Date();

  }



  if (
    this.isModified("counsellorPaymentStatus") &&
    this.counsellorPaymentStatus === "Paid" &&
    !this.counsellorPaymentDate
  ) {

    this.counsellorPaymentDate = new Date();

  }


});


// =====================================================
// Keep Application Status In Sync
// =====================================================

admissionSchema.pre("save", function () {
  if (this.isModified("admissionStatus")) {
    this.applicationStatus = this.admissionStatus;
  }
});




// =====================================================
// Trim Common String Fields
// =====================================================

admissionSchema.pre("save", function () {


  if (this.studentName) {

    this.studentName =
      this.studentName.trim();

  }



  if (this.studentEmail) {

    this.studentEmail =
      this.studentEmail.trim().toLowerCase();

  }



  if (this.studentPhone) {

    this.studentPhone =
      this.studentPhone.trim();

  }



  if (this.universityName) {

    this.universityName =
      this.universityName.trim();

  }



  if (this.courseName) {

    this.courseName =
      this.courseName.trim();

  }


});

// Dashboard Counter
admissionSchema.statics.getDashboardCounts = async function () {
  const totalAdmissions = await this.countDocuments();

  const activeAdmissions = await this.countDocuments({
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

  const cancelledAdmissions = await this.countDocuments({
    admissionStatus: "Cancelled",
  });

  const rejectedAdmissions = await this.countDocuments({
    admissionStatus: "Rejected",
  });

  return {
    totalAdmissions,
    activeAdmissions,
    cancelledAdmissions,
    rejectedAdmissions,
  };
};

/*
|--------------------------------------------------------------------------
| Export Model
|--------------------------------------------------------------------------
*/

const Admission =
  mongoose.models.Admission ||
  mongoose.model("Admission", admissionSchema);

export default Admission;
