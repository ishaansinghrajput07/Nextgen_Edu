import express from "express";

import {
  saveActivity,
  getAllActivities,
} from "../controller/activity_controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Save Activity
router.post(
  "/save",
  protect,
  saveActivity
);

// Get All Activities
router.get(
  "/all",
  protect,
  getAllActivities
);

export default router;