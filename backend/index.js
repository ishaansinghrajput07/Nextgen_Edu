import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import contactRoute from "./Routes/contact.js";
dotenv.config({});
import websiteRoute from "./Routes/website_routes.js";
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

const log = (message, details = "") => {
  const suffix = details ? ` ${details}` : "";
  console.log(`[api] ${message}${suffix}`);
};

app.use((req, res, next) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    log(
      `${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - startedAt}ms)`,
    );
  });

  next();
});

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
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;

app.get("/health", (req, res) => {
  const databaseReady = mongoose.connection.readyState === 1;

  return res.status(databaseReady ? 200 : 503).json({
    success: databaseReady,
    service: "nextgen-edu-api",
    database: databaseReady ? "connected" : "disconnected",
    uptime: Math.round(process.uptime()),
  });
});

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

app.use((req, res) => {
  console.warn(`[api] 404 ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: "API route not found",
    path: req.originalUrl,
  });
});

app.use((error, req, res, next) => {
  console.error(
    `[api] Unhandled error on ${req.method} ${req.originalUrl}: ${error.message}`,
  );

  if (res.headersSent) {
    return next(error);
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    message: "Internal server error",
  });
});

mongoose.connection.on("connected", () => {
  log("MongoDB connection: connected");
});

mongoose.connection.on("error", (err) => {
  console.error(`[api] MongoDB connection failed: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.warn("[api] MongoDB connection: disconnected");
});

const requiredEnvironment = ["MONGO_URI", "JWT_SECRET"];
const missingEnvironment = requiredEnvironment.filter(
  (key) => !process.env[key],
);

if (missingEnvironment.length > 0) {
  console.error(
    `[startup] Missing required environment variables: ${missingEnvironment.join(", ")}`,
  );
  console.error("[startup] Copy backend/.env.example to backend/.env and fill in the values.");
  process.exitCode = 1;
} else {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      log("MongoDB connection established");
      app.listen(PORT, "0.0.0.0", () => {
        log(`API listening on http://localhost:${PORT}`);
        log("Health check available at /health");
      });
    })
    .catch((error) => {
      console.error(`[startup] MongoDB connection failed: ${error.message}`);
      process.exitCode = 1;
    });
}
