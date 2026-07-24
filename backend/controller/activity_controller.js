import Activity from "../models/activity.model.js";

// Save Activity
export const saveActivity = async (req, res) => {
  try {
    const { action, by } = req.body;

    const activity = await Activity.create({
      action,
      by,
    });

    return res.status(201).json({
      success: true,
      message: "Activity Saved",
      activity,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Activities
export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      activities,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
