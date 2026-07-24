import express from "express";

import {
  addReview,
  getApprovedReviews,
  getAllReviews,
  approveReview,
  deleteReview,
} from "../controller/review_controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.post("/", addReview);
router.get("/", getApprovedReviews);

// Admin / SuperAdmin Only
router.get(
  "/admin",
  protect,
  authorize("SuperAdmin", "Admin"),
  getAllReviews
);

router.put(
  "/approve/:id",
  protect,
  authorize("SuperAdmin", "Admin"),
  approveReview
);

router.delete(
  "/:id",
  protect,
  authorize("SuperAdmin", "Admin"),
  deleteReview
);

export default router;