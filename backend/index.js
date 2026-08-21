import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import contactRoute from "./Routes/contact.js";
dotenv.config({});
import websiteRoute from "./Routes/website_routes.js";
import connectDB from "./util/db.js";
import universityRoute from "./Routes/university.js";

import dashboardRoute from "./Routes/dashboard.js";
import studentRoute from "./Routes/student.js";
import courseRoute from "./Routes/course_routes.js";
import authRoutes from "./Routes/auth_routes.js";
import counsellorRoute from "./Routes/counsellor.js";
import superadminRoute from "./Routes/SuperAdminDashboard.js";
import activityRoutes from "./Routes/activity_routes.js";
import reviewRoutes from "./Routes/review_route.js";
import admissionRoutes from "./Routes/admission_routes.js";
import notificationRoute from "./Routes/notification_routes.js";
import emailRoute from "./Routes/email_route.js";
import commissionRoutes from "./Routes/commission_route.js";

const app = express();

// middleware
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  }),
);

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://nextgenedu.co",
  "https://www.nextgenedu.co",
  ...(process.env.FRONTEND_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/university", universityRoute);
app.use("/api/v1/counsellor", counsellorRoute);
app.use("/api/v1/activity", activityRoutes);
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/api/v1/superadmin", superadminRoute);
app.use("/api/v1/student", studentRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/website", websiteRoute);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/v1/notification", notificationRoute);
app.use("/api/v1/email", emailRoute);
app.use("/api/commissions", commissionRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`listening port ${PORT}`);
});
