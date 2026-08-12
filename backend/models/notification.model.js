import mongoose from "mongoose";


// ======================================================
// NOTIFICATION SCHEMA
// ======================================================

const notificationSchema = new mongoose.Schema(
  {

    // Notification Title
    title: {
      type: String,
      required: true,
      trim: true,
    },


    // Notification Message
    message: {
      type: String,
      required: true,
      trim: true,
    },


    // Receiver User ID
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "receiverModel",
    },


    // Receiver Type
    // Auth = Admin/SuperAdmin
    // Counsellor = Counsellor
    receiverModel: {
      type: String,
      enum: [
        "Auth",
        "Counsellor",
      ],
      default: "Auth",
    },


    // Notification Category
    type: {
      type: String,
      enum: [
        "System",
        "Lead",
        "Admission",
        "Payment",
        "Review",
        "Reminder",
        "Commission"
      ],
      default: "System",
    },


    // Frontend Icon Name
    icon: {
      type: String,
      default: "Bell",
    },


    // Frontend Navigation Link
    link: {
      type: String,
      default: "",
    },


    // Read Status
    isRead: {
      type: Boolean,
      default: false,
    },


    // Read Time
    readAt: {
      type: Date,
      default: null,
    },


    // Who created notification
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      default: null,
    },


  },
  {
    timestamps: true,
  }
);


// ======================================================
// INDEXES
// ======================================================


// Fast user notification loading
notificationSchema.index({
  receiver: 1,
  createdAt: -1,
});


// Fast unread count
notificationSchema.index({
  receiver: 1,
  isRead: 1,
});



const Notification =
  mongoose.models.Notification ||
  mongoose.model(
    "Notification",
    notificationSchema
  );


export default Notification;