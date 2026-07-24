import Course from "../models/course_model.js";
import University from "../models/university.model.js";
import Activity from "../models/activity.model.js";
// ==============================
// Add Course
// ==============================
export const addCourse = async (req, res) => {
  try {
    const { universityId } = req.params;

    const { courseName, duration, fees, status, courseMode } = req.body;

    if (!courseName || !duration || !fees) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const university = await University.findById(universityId);

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    const slug = `${university.universityName}-${courseName}`
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const course = await Course.create({
      university: universityId,
      courseName,
      slug,
      duration,
      fees,
      courseMode,
      status,
    });

    console.log(req.body);

    await Activity.create({
      action: `Added Course ${course.courseName}`,
      by: req.user.name,
    });

    return res.status(201).json({
      success: true,
      message: "Course Added Successfully",
      course,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getPublicCourseBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const course = await Course.findOne({
      slug,
      status: "Active",
    }).populate({
      path: "university",
      select: "universityName slug universityLogo universityBanner",
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Related Courses
// ==============================

export const getRelatedCourses = async (req, res) => {
  try {
    const { slug } = req.params;

    const currentCourse = await Course.findOne({ slug });

    if (!currentCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const relatedCourses = await Course.find({
      university: currentCourse.university,
      _id: { $ne: currentCourse._id },
      status: "Active",
    })
      .populate(
        "university",
        "universityName slug universityLogo universityBanner",
      )
      .limit(4);

    res.status(200).json({
      success: true,
      courses: relatedCourses,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Get Courses By University
// ==============================
export const getCoursesByUniversity = async (req, res) => {
  try {
    const { universityId } = req.params;

    const courses = await Course.find({
      university: universityId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Update Course
// ==============================
export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const { courseName, duration, fees, status } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Get University
    const university = await University.findById(course.university);

    // Update Slug
    const slug = `${university.universityName}-${courseName}`
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    course.courseName = courseName;
    course.slug = slug;
    course.duration = duration;
    course.fees = fees;
    course.status = status;

    await course.save();

    await Activity.create({
      action: `Updated Course ${course.courseName}`,
      by: req.user.name,
    });

    return res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      course,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Delete Course
// ==============================

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Course Name Save
    const courseName = course.courseName;

    // Delete Course
    await Course.findByIdAndDelete(courseId);

    // Activity Log
    await Activity.create({
      action: `Deleted Course ${courseName}`,
      by: req.user.name,
    });

    return res.status(200).json({
      success: true,
      message: "Course Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getPublicCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      status: "Active",
    })
      .populate({
        path: "university",
        select: "universityName slug universityLogo universityBanner",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
