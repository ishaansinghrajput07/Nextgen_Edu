import express from "express";

import {
  createAdmission,
  getAllAdmissions,
  getSingleAdmission,
  updateAdmission,
  deleteAdmission,
  getAdmissionStats,
} from "../controller/admission_controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// =====================================================
// Admission Routes
// =====================================================

// =====================================================
// Create New Admission
// POST /api/admissions
// =====================================================

router.post(
  "/",
  protect,
  authorize("SuperAdmin", "Admin", "Counsellor"),
  createAdmission
);

// =====================================================
// Get All Admissions
// GET /api/admissions
// =====================================================

router.get(
  "/",
  protect,
  authorize("SuperAdmin", "Admin", "Counsellor"),
  getAllAdmissions
);

// =====================================================
// Admission Dashboard Stats
// GET /api/admissions/stats
// =====================================================

router.get(
  "/stats",
  protect,
  authorize("SuperAdmin", "Admin"),
  getAdmissionStats
);

// =====================================================
// Get Single Admission
// GET /api/admissions/:id
// =====================================================

router.get(
  "/:id",
  protect,
  authorize("SuperAdmin", "Admin", "Counsellor"),
  getSingleAdmission
);

// =====================================================
// Update Admission
// PUT /api/admissions/:id
// =====================================================

router.put(
  "/:id",
  protect,
  authorize("SuperAdmin", "Admin", "Counsellor"),
  updateAdmission
);

// =====================================================
// Delete Admission
// DELETE /api/admissions/:id
// =====================================================

router.delete(
  "/:id",
  protect,
  authorize("SuperAdmin", "Admin"),
  deleteAdmission
);

export default router;