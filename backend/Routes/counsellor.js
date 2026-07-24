import express from "express";

import {
  addCounsellor,
  getAllCounsellors,
  getSingleCounsellor,
  updateCounsellor,
  deleteCounsellor,
  changeCounsellorStatus,
} from "../controller/counsellor_controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Add Counsellor
router.post(
  "/addcounsellor",
  protect,
  authorize("SuperAdmin", "Admin"),
  addCounsellor
);

// Get All Counsellors
router.get(
  "/allcounsellor",
  protect,
  authorize("SuperAdmin", "Admin"),
  getAllCounsellors
);

// Get Single Counsellor
router.get(
  "/counsellor/:id",
  protect,
  authorize("SuperAdmin", "Admin"),
  getSingleCounsellor
);

// Update Counsellor
router.put(
  "/update/counsellor/:id",
  protect,
  authorize("SuperAdmin", "Admin"),
  updateCounsellor
);

// Delete Counsellor
router.delete(
  "/delete/counsellor/:id",
  protect,
  authorize("SuperAdmin", "Admin"),
  deleteCounsellor
);

// Change Counsellor Status
router.patch(
  "/change-status/:id",
  protect,
  authorize("SuperAdmin", "Admin"),
  changeCounsellorStatus
);

export default router;