import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    websiteName: String,
    supportEmail: String,
    supportPhone: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Setting", settingSchema);