import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    universityName: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    universityLogo: {
      type: String,
      default: "",
    },

    universityBanner: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    ranking: {
      type: String,
      default: "",
    },

    establishedYear: {
      type: Number,
      default: null,
    },

    universityType: {
      type: String,
      enum: ["Government", "Private", "Semi Government"],
      default: "Private",
    },

    naacVerified: {
      type: Boolean,
      default: false,
    },

    ugcApproved: {
      type: Boolean,
      default: false,
    },

    aiuApproved: {
      type: Boolean,
      default: false,
    },

    nirfRanked: {
      type: Boolean,
      default: false,
    },

    accreditation: {
      type: String,
      default: "",
    },

    eligibility: {
      type: String,
      default: "",
    },

    admissionProcess: {
      type: String,
      default: "",
    },

    admissionOpen: {
      type: Boolean,
      default: true,
    },

    applicationFee: {
      type: Number,
      default: 0,
    },

    averageTuitionFee: {
      type: Number,
      default: 0,
    },

    placementPercentage: {
      type: Number,
      default: 0,
    },

    highestPackage: {
      type: Number,
      default: 0,
    },

    averagePackage: {
      type: Number,
      default: 0,
    },

    hostelAvailable: {
      type: Boolean,
      default: false,
    },

    scholarshipAvailable: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Hidden"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("University", universitySchema);
