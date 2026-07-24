import Contact from "../models/Contact.model.js";

export const getCounsellorDashboard = async (req, res) => {
  try {
    const counsellorId = req.user._id;

    const totalLeads = await Contact.countDocuments({
      counsellor: counsellorId,
    });

    const newLeads = await Contact.countDocuments({
      counsellor: counsellorId,
      status: "New",
    });

    const contactedLeads = await Contact.countDocuments({
      counsellor: counsellorId,
      status: "Contacted",
    });

    const interestedLeads = await Contact.countDocuments({
      counsellor: counsellorId,
      status: "Interested",
    });

    const followUpLeads = await Contact.countDocuments({
      counsellor: counsellorId,
      status: "Follow Up",
    });

    const convertedLeads = await Contact.countDocuments({
      counsellor: counsellorId,
      status: "Converted",
    });

    const closedLeads = await Contact.countDocuments({
      counsellor: counsellorId,
      status: "Closed",
    });

    const conversionRate =
      totalLeads > 0
        ? Math.round((convertedLeads / totalLeads) * 100)
        : 0;

    return res.status(200).json({
      success: true,
      stats: {
        totalLeads,
        newLeads,
        contactedLeads,
        interestedLeads,
        followUpLeads,
        convertedLeads,
        closedLeads,
        conversionRate,
      },
    });
  } catch (error) {
    console.log("COUNSELLOR DASHBOARD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};