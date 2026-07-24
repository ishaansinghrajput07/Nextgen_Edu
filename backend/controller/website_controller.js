import University from "../models/university.model.js";
import Course from "../models/course_model.js";
import Contact from "../models/Contact.model.js";

// =========================================
// Website Statistics
// GET /api/v1/website/stats
// =========================================
export const getWebsiteStats = async (req, res) => {
  try {
    const [totalUniversities, totalCourses, totalStudents] = await Promise.all([
      University.countDocuments({
        status: "Approved",
      }),

      Course.countDocuments({
        status: "Active",
      }),

      Contact.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUniversities,
        totalCourses,
        totalStudents,
        admissionSuccessRate: 95,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch website statistics.",
    });
  }
};
