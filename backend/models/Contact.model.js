import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    // ============================================
    // Lead Number
    // ============================================

    leadNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    // ============================================
    // Basic Lead Information
    // ============================================

    leadName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
  type: String,
  default: "",
  trim: true,
},

    normalizedPhoneNumber: {
      type: String,
      sparse: true,
      unique: true,
      index: true,
      trim: true,
    },

    qualification: {
      type: String,
      default: "",
      trim: true,
    },

    interestedCourse: {
      type: String,
      default: "",
      trim: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================
    // Lead Source
    // ============================================

    source: {
      type: String,

      enum: [
        "Website",
        "Manual",
        "Google",
        "Facebook",
        "Instagram",
        "WhatsApp",
        "Referral",
        "Walk In",
        "Home Page",
        "Contact Form",
        "Other",
      ],

      default: "Website",
    },

    // ============================================
    // Lead Status Pipeline
    // ============================================

    status: {
      type: String,

      enum: [
        "New",
        "Contacted",
        "Interested",
        "Follow Up",
        "Converted",
        "Closed",
        "Enrolled",
      ],

      default: "New",
    },

    // ============================================
    // Counsellor Assignment
    // ============================================

    counsellor: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Counsellor",

      default: null,
    },

    contactedBy: {
      type: String,

      default: "",

      trim: true,
    },

    contactedAt: {
      type: Date,

      default: null,
    },

    // ============================================
    // Admission Basic Information
    // ============================================

    university: {
      type: String,

      default: "",

      trim: true,
    },

    country: {
      type: String,

      default: "",

      trim: true,
    },

    intake: {
      type: String,

      default: "",

      trim: true,
    },

    // ============================================
    // Student Enrollment
    // ============================================

    enrollmentStatus: {
      type: String,

      enum: ["Not Enrolled", "Enrolled"],

      default: "Not Enrolled",
    },

    enrollment: {
      university: {
        type: String,

        default: "",

        trim: true,
      },

      course: {
        type: String,

        default: "",

        trim: true,
      },

      joiningDate: {
        type: Date,

        default: null,
      },

      tuitionFee: {
        type: Number,

        default: 0,
      },
    },
    // ============================================
    // Commission Management
    // ============================================

    commission: {
      collegePercentage: {
        type: Number,

        default: 0,
      },

      totalCommission: {
        type: Number,

        default: 0,
      },

      counsellorPercentage: {
        type: Number,

        default: 0,
      },

      counsellorAmount: {
        type: Number,

        default: 0,
      },

      paymentStatus: {
        type: String,

        enum: ["Pending", "Paid"],

        default: "Pending",
      },

      paymentDate: {
        type: Date,

        default: null,
      },
    },

    // ============================================
    // Application Status
    // ============================================

    applicationStatus: {
      type: String,

      enum: [
        "Not Applied",

        "Applied",

        "Offer Letter",

        "Fee Paid",

        "Documents Pending",

        "Documents Verified",

        "Enrolled",

        "Rejected",

        "Cancelled",

        "Withdrawn",
      ],

      default: "Not Applied",
    },

    tuitionFee: {
      type: Number,
      default: 0,
    },

    commissionPercent: {
      type: Number,
      default: 0,
    },

    commissionAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Partial", "Paid", "Cancelled"],
      default: "Pending",
    },

    paymentDate: {
      type: Date,
      default: null,
    },

    // ============================================
    // Notes
    // ============================================

    notes: {
      type: String,

      default: "",

      trim: true,
    },

    // ============================================
    // Follow Ups
    // ============================================

    followUps: [
      {
        text: {
          type: String,

          default: "",

          trim: true,
        },

        date: {
          type: Date,

          default: Date.now,
        },
      },
    ],

    // ============================================
    // Activity Timeline
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

        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // ============================================
    // Status History
    // ============================================

    statusHistory: [
      {
        status: {
          type: String,

          enum: [
            "New",

            "Contacted",

            "Interested",

            "Follow Up",

            "Converted",

            "Closed",

            "Enrolled",
          ],
        },

        date: {
          type: Date,

          default: Date.now,
        },
      },
    ],

    // ============================================
    // Assignment History
    // ============================================

    assignmentHistory: [
      {
        counsellor: {
          type: mongoose.Schema.Types.ObjectId,

          ref: "Counsellor",

          default: null,
        },

        counsellorName: {
          type: String,

          default: "",
        },

        date: {
          type: Date,

          default: Date.now,
        },
      },
    ],
  },

  {
    timestamps: true,
  },
);

// ============================================
// Indexes
// ============================================

contactSchema.pre("validate", function () {
  if (this.phoneNumber) {
    this.normalizedPhoneNumber = String(this.phoneNumber).replace(/\D/g, "");
  }
});

contactSchema.index({
  phoneNumber: 1,
});

contactSchema.index({
  email: 1,
});

contactSchema.index({
  status: 1,
});

contactSchema.index({
  counsellor: 1,
});

contactSchema.index({
  interestedCourse: 1,
});

contactSchema.index({
  counsellor: 1,

  status: 1,
});

// ============================================
// Model Export
// ============================================

const Contact =
  mongoose.models.Contact ||
  mongoose.model(
    "Contact",

    contactSchema,
  );

export default Contact;
