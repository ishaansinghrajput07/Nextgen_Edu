import express from "express";
import {
  getSuperAdminDashboard,
} from "../controller/SuperAdminDashboard.js";

import {getSettings,updateSettings,updateAdminProfile} from "../controller/settings_Controller.js"


import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorize("SuperAdmin"),
  getSuperAdminDashboard
);



router.get(
  "/",
  protect,
  authorize("SuperAdmin", "Admin"),
  getSettings
);

router.put(
  "/",
  protect,
  authorize("SuperAdmin", "Admin"),
  updateSettings
);



router.put(
  "/admin-profile",
  protect,
  authorize("SuperAdmin", "Admin"),
  updateAdminProfile
);
export default router;