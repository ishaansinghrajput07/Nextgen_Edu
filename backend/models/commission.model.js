import mongoose from "mongoose";

const commissionSchema = new mongoose.Schema(
  {
    // ======================================================
    // Admission Reference
    // ======================================================

    admission: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Admission",

      required: true,

      index: true,
    },

    // ======================================================
    // Student Reference
    // ======================================================

    student: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Student",

      required: true,

      index: true,
    },

    // ======================================================
    // Counsellor Reference
    // ======================================================

    counsellor: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Counsellor",

      required: true,

      index: true,
    },

    // ======================================================
    // University Reference
    // ======================================================

    university: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "University",

      required: true,

      index: true,
    },

    // ======================================================
    // Course Reference
    // ======================================================

    course: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Course",

      required: true,

      index: true,
    },

    // ======================================================
    // Snapshot Data
    // ======================================================

    studentName: {
      type: String,

      default: "",
    },

    universityName: {
      type: String,

      default: "",
    },

    courseName: {
      type: String,

      default: "",
    },

    // ======================================================
    // Commission Details
    // ======================================================

    commissionType: {
      type: String,

      enum: ["Admission", "Renewal", "Other"],

      default: "Admission",
    },

    amount: {
      type: Number,

      required: true,

      default: 0,

      min: 0,
    },

    percentage: {
      type: Number,

      default: 0,
    },

    // ======================================================
    // Payment Status
    // ======================================================

    status: {
      type: String,

      enum: ["Pending", "Partial", "Paid", "Cancelled"],

      default: "Pending",

      index: true,
    },

    paidAmount: {
      type: Number,

      default: 0,
    },

    remainingAmount: {
      type: Number,

      default: 0,
    },

    paymentDate: {
      type: Date,

      default: null,
    },

    paymentMode: {
      type: String,

      enum: ["Cash", "Bank Transfer", "UPI", "Cheque", "Online"],

      default: "Bank Transfer",
    },

    transactionId: {
      type: String,

      default: "",
    },

    referenceNumber: {
      type: String,

      default: "",
    },

    remarks: {
      type: String,

      default: "",
    },

    // ======================================================
    // Payment History
    // ======================================================

    paymentHistory: [
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

          default: "Bank Transfer",
        },

        transactionId: {
          type: String,

          default: "",
        },

        referenceNumber: {
          type: String,

          default: "",
        },

        paidBy: {
          type: mongoose.Schema.Types.ObjectId,

          ref: "Auth",

          default: null,
        },

        remarks: {
          type: String,

          default: "",
        },
      },
    ],

    // ======================================================
    // Created By
    // ======================================================

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Auth",

      required: true,
    },
  },

  {
    timestamps: true,

    versionKey: false,
  },
);

// ======================================================
// Indexes
// ======================================================

commissionSchema.index({
  counsellor: 1,

  status: 1,
});

commissionSchema.index({
  university: 1,

  status: 1,
});

commissionSchema.index({
  createdAt: -1,
});

// ======================================================
// Export
// ======================================================

const Commission =
  mongoose.models.Commission || mongoose.model("Commission", commissionSchema);

export default Commission;
