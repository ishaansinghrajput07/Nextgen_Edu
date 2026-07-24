import mongoose from "mongoose";


const emailSchema = new mongoose.Schema(
  {

    receiver: {
      type: String,
      required: true,
    },


    subject: {
      type: String,
      required: true,
    },


    message: {
      type: String,
      required: true,
    },


    type: {
      type: String,
      enum: [
        "Welcome",
        "Admission",
        "Payment",
        "Notification",
        "System",
        "Lead"
      ],
      default: "System",
    },


    status: {
      type: String,
      enum: [
        "Pending",
        "Sent",
        "Failed",
      ],
      default: "Pending",
    },


    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      default: null,
    },


    sentAt: {
      type: Date,
      default: null,
    },


    errorMessage: {
      type: String,
      default: "",
    },


  },
  {
    timestamps:true,
  }
);



const Email =
mongoose.models.Email ||
mongoose.model(
  "Email",
  emailSchema
);


export default Email;