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
},

university: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "University",
  required: true,
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
    },

    studentEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    studentPhone: {
      type: String,
      trim: true,
      default: "",
    },

    // ============================================
    // University Snapshot
    // ============================================

    universityName: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================================
    // Course Snapshot
    // ============================================

    courseName: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================================
    // Admission Details
    // ============================================

    intake: {
      type: String,
      trim: true,
      default: "",
    },

    country: {
      type: String,
      trim: true,
      default: "India",
    },

    admissionDate: {
      type: Date,
      default: Date.now,
    },

    expectedJoiningDate: {
      type: Date,
      default: null,
    },

    tuitionFee: {
      type: Number,
      min: 0,
      default: 0,
    },

    scholarshipAmount: {
      type: Number,
      min: 0,
      default: 0,
    },

    netFee: {
      type: Number,
      min: 0,
      default: 0,
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
      enum: ["Pending", "Partial", "Paid"],
      default: "Pending",
    },

    universityPaymentDate: {
      type: Date,
      default: null,
    },

    universityPaymentReference: {
      type: String,
      default: "",
      trim: true,
    },

    universityInvoiceNumber: {
      type: String,
      default: "",
      trim: true,
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
      enum: ["Pending", "Partial", "Paid"],
      default: "Pending",
    },

    counsellorPaymentDate: {
      type: Date,
      default: null,
    },

    counsellorPaymentReference: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================
    // Due Date
    // ============================================

    paymentDueDate: {
      type: Date,
      default: null,
    },

    // ============================================
    // Admission Workflow
    // ============================================

    admissionStatus: {
      type: String,
      enum: [
        "Applied",
        "Documents Pending",
        "Documents Verified",
        "Offer Letter",
        "Fee Paid",
        "Enrolled",
        "Rejected",
        "Cancelled",
      ],
      default: "Applied",
    },

    documentStatus: {
      type: String,
      enum: ["Pending", "Uploaded", "Verified", "Rejected"],
      default: "Pending",
    },

    enrollmentStatus: {
      type: String,
      enum: ["Pending", "Enrolled"],
      default: "Pending",
    },

    // ============================================
    // Invoice
    // ============================================

    invoiceNumber: {
      type: String,
      default: "",
      trim: true,
    },

    receiptNumber: {
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
    // Notes
    // ============================================

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    remarks: {
      type: String,
      default: "",
      trim: true,
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
        },

        description: {
          type: String,
          default: "",
          trim: true,
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
        },

        paymentDate: {
          type: Date,
          default: Date.now,
        },

        paymentMode: {
          type: String,
          enum: ["Cash", "Bank Transfer", "UPI", "Cheque", "Online"],
          default: "Bank Transfer",
        },

        transactionId: {
          type: String,
          default: "",
          trim: true,
        },

        remarks: {
          type: String,
          default: "",
          trim: true,
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
        },

        paymentDate: {
          type: Date,
          default: Date.now,
        },

        paymentMode: {
          type: String,
          enum: ["Cash", "Bank Transfer", "UPI", "Cheque"],
          default: "Bank Transfer",
        },

        transactionId: {
          type: String,
          default: "",
          trim: true,
        },

        remarks: {
          type: String,
          default: "",
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

/*
|--------------------------------------------------------------------------
| Duplicate Admission Block
|--------------------------------------------------------------------------
*/

admissionSchema.index(
  {
    student: 1,
    university: 1,
    course: 1,
  },
  {
    unique: true,
  },
);

/*
|--------------------------------------------------------------------------
| Dashboard Indexes
|--------------------------------------------------------------------------
*/

admissionSchema.index({
  counsellor: 1,
});

admissionSchema.index({
  university: 1,
});

admissionSchema.index({
  admissionStatus: 1,
});

admissionSchema.index({
  enrollmentStatus: 1,
});

admissionSchema.index({
  documentStatus: 1,
});

admissionSchema.index({
  universityPaymentStatus: 1,
});

admissionSchema.index({
  counsellorPaymentStatus: 1,
});

admissionSchema.index({
  admissionDate: -1,
});

admissionSchema.index({
  createdAt: -1,
});

/*
|--------------------------------------------------------------------------
| Auto Update Payment Dates
|--------------------------------------------------------------------------
*/

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
const Admission =
  mongoose.models.Admission || mongoose.model("Admission", admissionSchema);

export default Admission;
