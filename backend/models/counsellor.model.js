import mongoose from "mongoose";

const counsellorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    designation: {
      type: String,
      default: "Counsellor",
    },

    department: {
      type: String,
      default: "Admissions",
    },

    role: {
      type: String,
      enum: ["Admin", "Manager", "Senior Counsellor", "Counsellor"],
      default: "Counsellor",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    // Targets
    monthlyLeadTarget: {
      type: Number,
      default: 0,
    },

    monthlyAdmissionTarget: {
      type: Number,
      default: 0,
    },

    // Performance Snapshot
    totalLeads: {
      type: Number,
      default: 0,
    },

    convertedLeads: {
      type: Number,
      default: 0,
    },

    conversionRate: {
      type: Number,
      default: 0,
    },

    totalCommission: {
      type: Number,
      default: 0,
    },

    paidCommission: {
      type: Number,
      default: 0,
    },

    pendingCommission: {
      type: Number,
      default: 0,
    },

    joiningDate: {
      type: Date,
      default: Date.now,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      default: "",
    },

    permissions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Counsellor =
  mongoose.models.Counsellor || mongoose.model("Counsellor", counsellorSchema);

export default Counsellor;
