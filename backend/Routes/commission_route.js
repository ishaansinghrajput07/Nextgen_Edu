import express from "express";

import {
  getMyCommission,
  getAdminCommissionReport,
  updateCommissionPayment,
  getCounsellorCommissionDashboard,
  getCommissionHistory,
  exportCommissionReport,
  addCommissionPayment,
  createCommission,
  deleteCommissionPayment,
} from "../controller/commission_controller.js";

import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// ======================================================
// COUNSELLOR
// ======================================================

// My Commission
router.get("/my", protect, authorize("Counsellor"), getMyCommission);

// Counsellor Dashboard
router.get(
  "/dashboard",
  protect,
  authorize("Counsellor"),
  getCounsellorCommissionDashboard,
);

// Add Commission Payment
router.post(
  "/payment/:id",
  protect,
  authorize("Admin", "SuperAdmin"),
  addCommissionPayment,
);

// ======================================================
// ADMIN
// ======================================================

// Admin Report
router.get(
  "/admin/report",
  protect,
  authorize("Admin", "SuperAdmin"),
  getAdminCommissionReport,
);

// Commission History
router.get(
  "/history",
  protect,
  authorize("Admin", "SuperAdmin", "Counsellor"),
  getCommissionHistory,
);

// Export Report
router.get(
  "/export",
  protect,
  authorize("Admin", "SuperAdmin"),
  exportCommissionReport,
);

// Update existing payment
router.put(
  "/payment/:id/:paymentId",
  protect,
  authorize("Admin", "SuperAdmin"),
  updateCommissionPayment,
);

// Create Commission
router.post(
  "/create",
  protect,
  authorize("Admin", "SuperAdmin"),
  createCommission,
);

router.delete(
  "/payment/:id/:paymentId",
  protect,
  authorize("Admin", "SuperAdmin"),
  deleteCommissionPayment,
);

export default router;
