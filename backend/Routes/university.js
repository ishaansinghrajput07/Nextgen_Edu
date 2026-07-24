import express from "express";

import {
  addUniversity,
  getAllUniversities,
  getSingleUniversity,
  updateUniversity,
  deleteUniversity,
  approveUniversity,
  hideUniversity,
  searchUniversity,
  getApprovedUniversities,
  getUniversityBySlug,
  getTrustedUniversities
} from "../controller/university_controller.js";

import upload from "../middleware/multer.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();


// ===============================
// PUBLIC ROUTES
// ===============================

// Website -> All Approved Universities
router.get("/public", getApprovedUniversities);

// Website -> Single University By Slug
router.get("/public/:slug", getUniversityBySlug);


router.get(
   "/trusted",
   getTrustedUniversities
);

// ===============================
// ADMIN ROUTES
// ===============================

// Search University
router.get(
  "/search",
  protect,
  authorize("Admin", "Counsellor"),
  searchUniversity
);

// Get All Universities
router.get(
  "/alluniversity",
  protect,
  authorize("Admin", "Counsellor"),
  getAllUniversities
);

// Get Single University
router.get(
  "/:id",
  protect,
  authorize("Admin", "Counsellor"),
  getSingleUniversity
);

// Add University
router.post(
  "/add",
  protect,
  authorize("Admin"),
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  addUniversity
);

// Update University
router.put(
  "/update/:id",
  protect,
  authorize("Admin"),
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateUniversity
);

// Delete University
router.delete(
  "/delete/:id",
  protect,
  authorize("Admin"),
  deleteUniversity
);

// Approve University
router.patch(
  "/approve/:id",
  protect,
  authorize("Admin"),
  approveUniversity
);

// Hide University
router.patch(
  "/hide/:id",
  protect,
  authorize("Admin"),
  hideUniversity
);

export default router;