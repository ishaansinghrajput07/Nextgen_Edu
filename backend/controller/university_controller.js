import University from "../models/university.model.js";
import slugify from "slugify";
// Add University
import getDataUri from "../util/Datauri.js";
import cloudinary from "../util/Cloudinary.js";
import Activity from "../models/activity.model.js";
console.log(getDataUri);
export const addUniversity = async (req, res) => {
  try {
    const {
      universityName,
      location,
      country,
      state,
      city,
      website,
      email,
      phoneNumber,
      description,
      ranking,
      establishedYear,
      universityType,
      naacVerified,
      ugcApproved,
      aiuApproved,
      nirfRanked,
      applicationFee,
      averageTuitionFee,
      placementPercentage,
      highestPackage,
      averagePackage,
      hostelAvailable,
      scholarshipAvailable,
      status,
      eligibility,
      admissionProcess,
    } = req.body;

    if (!universityName) {
      return res.status(400).json({
        success: false,
        message: "University Name is required",
      });
    }

    let universityLogo = "";
    let universityBanner = "";

    // Logo Upload
    if (req.files?.logo?.[0]) {
      const fileUri = getDataUri(req.files.logo[0]);

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      universityLogo = cloudResponse.secure_url;
    }

    // Banner Upload
    if (req.files?.banner?.[0]) {
      const fileUri = getDataUri(req.files.banner[0]);

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      universityBanner = cloudResponse.secure_url;
    }

    const university = await University.create({
      universityName,
      slug: slugify(universityName, {
        lower: true,
        strict: true,
      }),
      universityLogo,
      universityBanner,
      location,
      country,
      state,
      city,
      website,
      email,
      phoneNumber,
      description,
      ranking,
      establishedYear,
      universityType,
      naacVerified,
      ugcApproved,
      aiuApproved,
      nirfRanked,
      applicationFee,
      averageTuitionFee,
      placementPercentage,
      highestPackage,
      averagePackage,
      hostelAvailable,
      scholarshipAvailable,
      status,
      eligibility,
      admissionProcess,
    });

    await Activity.create({
      action: `Added University ${university.universityName}`,
      by: req.user.name,
    });

    return res.status(201).json({
      success: true,
      message: "University Added Successfully",
      university,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Universities
export const getAllUniversities = async (req, res) => {
  try {
    const universities = await University.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "university",
          as: "courses",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      count: universities.length,
      universities,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Single University
export const getSingleUniversity = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    return res.status(200).json({
      success: true,
      university,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getTrustedUniversities = async (req, res) => {
  try {
    const universities = await University.find(
      {
        status: "Approved",
      },
      {
        universityName: 1,
        universityLogo: 1,
        slug: 1,
      },
    ).sort({
      universityName: 1,
    });

    res.status(200).json({
      success: true,
      universities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update University
export const updateUniversity = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    console.log(req.body);
    console.log(req.files);

    // Logo Upload
    if (req.files?.logo?.[0]) {
      const fileUri = getDataUri(req.files.logo[0]);

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      university.universityLogo = cloudResponse.secure_url;
    }

    // Banner Upload
    if (req.files?.banner?.[0]) {
      const fileUri = getDataUri(req.files.banner[0]);

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      university.universityBanner = cloudResponse.secure_url;
    }

    // Remove null string values
    if (req.body.establishedYear === "null") {
      delete req.body.establishedYear;
    }

    if (req.body.averageTuitionFee === "null") {
      delete req.body.averageTuitionFee;
    }

    // Convert boolean strings
    if (req.body.naacVerified) {
      req.body.naacVerified = req.body.naacVerified === "true";
    }

    if (req.body.ugcApproved) {
      req.body.ugcApproved = req.body.ugcApproved === "true";
    }

    if (req.body.aiuApproved) {
      req.body.aiuApproved = req.body.aiuApproved === "true";
    }

    if (req.body.nirfRanked) {
      req.body.nirfRanked = req.body.nirfRanked === "true";
    }

    if (req.body.admissionOpen) {
      req.body.admissionOpen = req.body.admissionOpen === "true";
    }

    if (req.body.hostelAvailable) {
      req.body.hostelAvailable = req.body.hostelAvailable === "true";
    }

    if (req.body.scholarshipAvailable) {
      req.body.scholarshipAvailable = req.body.scholarshipAvailable === "true";
    }

    if (req.body.universityName) {
      req.body.slug = slugify(req.body.universityName, {
        lower: true,
        strict: true,
      });
    }

    Object.assign(university, req.body);

    await university.save();

    await Activity.create({
      action: `Updated University ${university.universityName}`,
      by: req.user.name,
    });

    return res.status(200).json({
      success: true,

      message: "University Updated",

      university,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};
// Delete University
export const deleteUniversity = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    // Store University Name
    const universityName = university.universityName;

    // Delete Logo
    if (university.universityLogo) {
      const logoPublicId = university.universityLogo
        .split("/")
        .pop()
        .split(".")[0];

      await cloudinary.uploader.destroy(logoPublicId);
    }

    // Delete Banner
    if (university.universityBanner) {
      const bannerPublicId = university.universityBanner
        .split("/")
        .pop()
        .split(".")[0];

      await cloudinary.uploader.destroy(bannerPublicId);
    }

    // Delete University
    await university.deleteOne();

    // Activity Log
    await Activity.create({
      action: `Deleted University ${universityName}`,
      by: req.user.name,
    });

    return res.status(200).json({
      success: true,
      message: "University deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Change Status
export const approveUniversity = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    university.status = "Approved";

    await university.save();

    await Activity.create({
      action: `Approved University ${university.universityName}`,
      by: req.user.name,
    });

    return res.status(200).json({
      success: true,
      message: "University Approved",
      university,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const hideUniversity = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    university.status = "Hidden";

    await university.save();

    await Activity.create({
      action: `Hidden University ${university.universityName}`,
      by: req.user.name,
    });

    return res.status(200).json({
      success: true,
      message: "University Hidden",
      university,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Search University
export const searchUniversity = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const universities = await University.find({
      universityName: {
        $regex: keyword,
        $options: "i",
      },
    });

    return res.status(200).json({
      success: true,
      universities,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Public - Approved Universities
// ===============================

export const getApprovedUniversities = async (req, res) => {
  try {
    const universities = await University.aggregate([
      {
        $match: {
          status: "Approved",
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "university",
          as: "courses",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      universities,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Public - Single University
// ===============================
export const getUniversityBySlug = async (req, res) => {
  try {
    const university = await University.aggregate([
      {
        $match: {
          slug: req.params.slug,
          status: "Approved",
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "university",
          as: "courses",
        },
      },
    ]);

    if (!university.length) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    res.status(200).json({
      success: true,
      university: university[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
