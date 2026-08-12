// routes/counsellor.route.js

import express from "express";

import {
  // ======================================================
  // ADMIN / SUPER ADMIN
  // ======================================================

  createCounsellor,
  getAllCounsellors,
  getSingleCounsellor,
  updateCounsellor,
  deleteCounsellor,
  updateCounsellorStatus,
  resetCounsellorPassword,
  assignLeadsToCounsellor,
  removeAssignedLeads,

  // ======================================================
  // PERFORMANCE
  // ======================================================

  getCounsellorPerformance,
  getMonthlyPerformance,
  getCounsellorActivityTimeline,

  // ======================================================
  // REPORTS
  // ======================================================

  getCounsellorDashboardReport,
  getCounsellorLeadStatusReport,
  getUniversityWisePerformanceReport,

  // ======================================================
  // COUNSELLOR SELF
  // ======================================================

  getCounsellorDashboard,
  getRecentLeads,
  getRecentStudents,
  getRecentActivities,
  getTodaysFollowUps,

  getMyLeads,
  getCounsellorLead,
  updateCounsellorLead,

  getCounsellorProfile,
  updateCounsellorProfile,

  changeCounsellorPassword,
} from "../controller/counsellor_controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// ======================================================
// ADMIN / SUPER ADMIN ROUTES
// ======================================================

// ------------------------------------------------------
// Create Counsellor
// ------------------------------------------------------

router.post(
  "/admin/create",
  protect,
  authorize("Admin", "SuperAdmin"),
  createCounsellor,
);

// ------------------------------------------------------
// Get All Counsellors
// ------------------------------------------------------

router.get(
  "/admin/allcounsellor",
  protect,
  authorize("Admin", "SuperAdmin"),
  getAllCounsellors,
);

// ------------------------------------------------------
// Get Single Counsellor
// ------------------------------------------------------

router.get(
  "/admin/:id",
  protect,
  authorize("Admin", "SuperAdmin"),
  getSingleCounsellor,
);


// ------------------------------------------------------
// Assign Leads
// ------------------------------------------------------

router.put(
  "/admin/assign-leads",
  protect,
  authorize("Admin", "SuperAdmin"),
  assignLeadsToCounsellor,
);

// ------------------------------------------------------
// Update Counsellor
// ------------------------------------------------------

router.put(
  "/admin/:id",
  protect,
  authorize("Admin", "SuperAdmin"),
  updateCounsellor,
);

// ------------------------------------------------------
// Delete Counsellor
// ------------------------------------------------------

router.delete(
  "/admin/:id",
  protect,
  authorize("Admin", "SuperAdmin"),
  deleteCounsellor,
);

// ------------------------------------------------------
// Activate / Deactivate Counsellor
// ------------------------------------------------------

router.put(
  "/admin/:id/status",
  protect,
  authorize("Admin", "SuperAdmin"),
  updateCounsellorStatus,
);

// ------------------------------------------------------
// Reset Counsellor Password
// ------------------------------------------------------

router.put(
  "/admin/:id/reset-password",
  protect,
  authorize("Admin", "SuperAdmin"),
  resetCounsellorPassword,
);


// ------------------------------------------------------
// Remove Assigned Leads
// ------------------------------------------------------

router.put(
  "/admin/remove-leads",
  protect,
  authorize("Admin", "SuperAdmin"),
  removeAssignedLeads,
);

// ======================================================
// PERFORMANCE ROUTES
// ======================================================

// ------------------------------------------------------
// Performance Summary
// ------------------------------------------------------

router.get(
  "/admin/:id/performance",
  protect,
  authorize("Admin", "SuperAdmin"),
  getCounsellorPerformance,
);

// ------------------------------------------------------
// Monthly Performance
// ------------------------------------------------------

router.get(
  "/admin/:id/monthly-performance",
  protect,
  authorize("Admin", "SuperAdmin"),
  getMonthlyPerformance,
);

// ------------------------------------------------------
// Activity Timeline
// ------------------------------------------------------

router.get(
  "/admin/:id/activity-timeline",
  protect,
  authorize("Admin", "SuperAdmin"),
  getCounsellorActivityTimeline,
);

// ======================================================
// REPORT ROUTES
// ======================================================

// ------------------------------------------------------
// Dashboard Report
// ------------------------------------------------------

router.get(
  "/admin/:id/dashboard-report",
  protect,
  authorize("Admin", "SuperAdmin"),
  getCounsellorDashboardReport,
);

// ------------------------------------------------------
// Lead Status Report
// ------------------------------------------------------

router.get(
  "/admin/:id/lead-status-report",
  protect,
  authorize("Admin", "SuperAdmin"),
  getCounsellorLeadStatusReport,
);

// ------------------------------------------------------
// University-wise Performance Report
// ------------------------------------------------------

router.get(
  "/admin/:id/university-report",
  protect,
  authorize("Admin", "SuperAdmin"),
  getUniversityWisePerformanceReport,
);

// ======================================================
// COUNSELLOR SELF ROUTES
// ======================================================

// From this point onward:
// protect + Counsellor authorization
// will automatically apply to all routes below.

router.use(protect);
router.use(authorize("Counsellor"));

// ======================================================
// PART 1
// COUNSELLOR DASHBOARD
// ======================================================

router.get(
  "/dashboard",
  getCounsellorDashboard,
);

// ======================================================
// DASHBOARD WIDGETS
// ======================================================

// Recent Leads
router.get(
  "/recent-leads",
  getRecentLeads,
);

// Recent Students
router.get(
  "/recent-students",
  getRecentStudents,
);

// Recent Activities
router.get(
  "/recent-activities",
  getRecentActivities,
);

// Today's Follow Ups
router.get(
  "/todays-followups",
  getTodaysFollowUps,
);

// ======================================================
// MY LEADS
// ======================================================

// Get My Leads
router.get(
  "/leads",
  getMyLeads,
);

// Get Single Lead
router.get(
  "/leads/:id",
  getCounsellorLead,
);

// Update My Lead
router.put(
  "/leads/:id",
  updateCounsellorLead,
);

// ======================================================
// COUNSELLOR PROFILE
// ======================================================

// Get Profile
router.get(
  "/profile",
  getCounsellorProfile,
);

// Update Profile
router.put(
  "/profile",
  updateCounsellorProfile,
);

// ======================================================
// CHANGE PASSWORD
// ======================================================

router.put(
  "/change-password",
  changeCounsellorPassword,
);

export default router;