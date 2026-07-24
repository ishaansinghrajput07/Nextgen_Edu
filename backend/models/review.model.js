import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    review: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 5,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Review", reviewSchema);
