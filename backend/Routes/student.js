import express from "express";

import {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  getStudentStats,
} from "../controller/student_controller.js";


import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";


const router = express.Router();



// ==========================================
// CREATE STUDENT
// Admin + Counsellor
// ==========================================

router.post(
  "/",
  protect,
  authorize("Admin", "counsellor"),
  createStudent
);



// ==========================================
// GET ALL STUDENTS
// Admin + Counsellor
// ==========================================

router.get(
  "/",
  protect,
  authorize("Admin", "counsellor"),
  getAllStudents
);



// ==========================================
// STUDENT STATS
// Admin Only
// ==========================================

router.get(
  "/stats",
  protect,
  authorize("Admin"),
  getStudentStats
);



// ==========================================
// GET SINGLE STUDENT
// Admin + Counsellor
// ==========================================

router.get(
  "/:id",
  protect,
  authorize("Admin", "counsellor"),
  getSingleStudent
);



// ==========================================
// UPDATE STUDENT
// Admin + Counsellor
// ==========================================

router.put(
  "/:id",
  protect,
  authorize("Admin", "counsellor"),
  updateStudent
);



// ==========================================
// DELETE STUDENT
// Admin Only
// ==========================================

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteStudent
);



export default router;