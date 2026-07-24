import express from "express";

import {
  registerSuperAdmin,
  login,
  createAdmin,
  getProfile,
  getAllAdmins,
  deleteAdmin,
  changePassword,
  logout,
  adminPerformance
} from "../controller/auth_controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

// First Time Only
router.post(
  "/register-super-admin",
  registerSuperAdmin
);

// Login
router.post("/login", login);

// Profile
router.get(
  "/profile",
  protect,
  getProfile
);

// Create Admin
router.post(
  "/create-admin",
  protect,
  authorize("SuperAdmin"),
  createAdmin
);

// Get All Admins
router.get(
  "/all-admins",
  protect,
  authorize("SuperAdmin"),
  getAllAdmins
);

// Delete Admin
router.delete(
  "/:id",
  protect,
  authorize("SuperAdmin"),
  deleteAdmin
);

// Change Password
router.put(
  "/change-password",
  protect,
  changePassword
);


router.get(
  "/admin-performance",
  protect,
  authorize("SuperAdmin"),
  adminPerformance
);



//logout

router.post("/logout", protect, logout);

export default router;