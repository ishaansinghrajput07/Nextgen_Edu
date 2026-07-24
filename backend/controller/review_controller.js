import Review from "../models/review.model.js";

// Add Review
export const addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      message: "Review Submitted Successfully",
      review,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// Get Approved Reviews
export const getApprovedReviews = async (req, res) => {

  try {

    const reviews = await Review.find({
      status: "Approved",
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      reviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// Get All Reviews (Admin)

export const getAllReviews = async (req, res) => {

  try {

    const reviews = await Review.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      reviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// Approve Review

export const approveReview = async (req, res) => {

  try {

    const review = await Review.findById(req.params.id);

    if (!review) {

      return res.status(404).json({
        success: false,
        message: "Review not found",
      });

    }

    review.status = "Approved";

    await review.save();

    res.json({
      success: true,
      message: "Review Approved",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// Delete Review

export const deleteReview = async (req, res) => {

  try {

    await Review.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Review Deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};