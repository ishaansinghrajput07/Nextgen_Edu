import express from "express";
import {
  addCourse,
  getCoursesByUniversity,
  updateCourse,
  deleteCourse,
  getPublicCourses,
  getPublicCourseBySlug,
  getRelatedCourses
} from "../controller/course_controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/public", getPublicCourses);

router.get(
  "/public/related/:slug",
  getRelatedCourses
);

router.get("/public/:slug", getPublicCourseBySlug);

// Add Course
router.post("/add/:universityId", protect, addCourse);

// Get Courses By University
router.get("/university/:universityId", protect, getCoursesByUniversity);

// Update Course
router.put("/update/:courseId", protect, updateCourse);

// Delete Course
router.delete("/delete/:courseId", protect, deleteCourse);

export default router;