import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

import Email from "../models/email.model.js";

// =====================================================
// EMAIL TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASSWORD,
  },
});

// =====================================================
// VERIFY EMAIL CONFIGURATION
// =====================================================

transporter.verify((error, success) => {
  if (error) {
    console.log("EMAIL CONFIG ERROR:", error);
  } else {
    console.log("EMAIL SERVER READY");
  }
});

// =====================================================
// SEND EMAIL
// Core Function
// =====================================================

export const sendEmail = async ({
  receiver,

  subject,

  message,

  type = "System",

  sentBy = null,
}) => {
  try {
    const emailRecord = await Email.create({
      receiver,

      subject,

      message,

      type,

      status: "Pending",

      sentBy,
    });

    // Send Mail

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: receiver,

      subject,

      html: `

<div style="
font-family:Arial;
padding:20px;
">

<h2>
${subject}
</h2>


<p>
${message}
</p>


<br/>

<p>
NextGen Education Team
</p>

</div>

`,
    });

    // Update Status

    emailRecord.status = "Sent";

    emailRecord.sentAt = new Date();

    await emailRecord.save();

    return emailRecord;
  } catch (error) {
    console.log("SEND EMAIL ERROR:", error);

    console.log("Receiver:", receiver);

    console.log("Subject:", subject);

    console.log("Type:", type);

    if (receiver) {
      await Email.create({
        receiver,

        subject,

        message,

        type,

        status: "Failed",

        errorMessage: error.message,

        sentBy,
      });
    }

    return null;
  }
};

// =====================================================
// API SEND EMAIL
// =====================================================

export const sendEmailController = async (req, res) => {
  try {
    const {
      receiver,

      subject,

      message,

      type,
    } = req.body;

    if (!receiver || !subject || !message) {
      return res.status(400).json({
        success: false,

        message: "Receiver, subject and message required",
      });
    }

    const email = await sendEmail({
      receiver,

      subject,

      message,

      type,

      sentBy: req.user?._id,
    });

    if (!email) {
      return res.status(500).json({
        success: false,

        message: "Email sending failed",
      });
    }

    return res.status(200).json({
      success: true,

      message: "Email sent successfully",

      email,
    });
  } catch (error) {
    console.log("EMAIL CONTROLLER ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

// =====================================================
// BULK EMAIL
// =====================================================

export const sendBulkEmail = async (req, res) => {
  try {
    const {
      receivers = [],

      subject,

      message,

      type,
    } = req.body;

    if (!receivers.length) {
      return res.status(400).json({
        success: false,

        message: "Receivers required",
      });
    }

    const result = [];

    for (const receiver of receivers) {
      const email = await sendEmail({
        receiver,

        subject,

        message,

        type,

        sentBy: req.user?._id,
      });

      if (email) {
        result.push(email);
      }
    }

    return res.status(200).json({
      success: true,

      message: "Bulk email completed",

      count: result.length,

      emails: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

// =====================================================
// ADMISSION EMAIL
// =====================================================

export const sendAdmissionEmail = async ({
  email,

  studentName,

  course,
}) => {
  return await sendEmail({
    receiver: email,

    subject: "Admission Confirmed",

    message: `
Hello ${studentName},

Your admission has been successfully confirmed.

Course:
${course}


Thank you for choosing NextGen Education.

`,

    type: "Admission",
  });
};

// =====================================================
// WELCOME EMAIL
// =====================================================

export const sendWelcomeEmail = async ({
  email,

  name,
}) => {
  return await sendEmail({
    receiver: email,

    subject: "Welcome To NextGen Education",

    message: `
Hello ${name},

Welcome to NextGen Education.

We are happy to have you with us.

`,

    type: "Welcome",
  });
};

// =====================================================
// EMAIL HISTORY
// =====================================================

export const getEmailHistory = async (req, res) => {
  try {
    const emails = await Email.find()

      .sort({
        createdAt: -1,
      })

      .limit(100);

    return res.status(200).json({
      success: true,

      count: emails.length,

      emails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};
