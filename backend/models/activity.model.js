import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },

    by: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Activity =
  mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity;
