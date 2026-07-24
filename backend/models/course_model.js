import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },

    courseName: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    courseMode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      default: "Online",
    },

    duration: {
      type: String,
      required: true,
    },

    fees: {
      type: Number,
      required: true,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Course", courseSchema);
