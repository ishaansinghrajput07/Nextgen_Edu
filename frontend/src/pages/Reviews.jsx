import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Components
import ReviewHero from "../components/reviews/ReviewHero";
import ReviewStats from "../components/reviews/ReviewStats";
import ReviewImage from "../components/reviews/ReviewImage";
import ReviewForm from "../components/reviews/ReviewForm";
import ReviewCards from "../components/reviews/ReviewCards";
import ReviewCTA from "../components/reviews/ReviewCTA";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    review: "",
    rating: 5,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  // ===========================
  // Fetch Reviews
  // ===========================

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/reviews"
      );

      setReviews(res.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // Submit Review
  // ===========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/api/reviews",
        formData
      );

      toast.success("Review Submitted Successfully ❤️");

      setFormData({
        name: "",
        course: "",
        review: "",
        rating: 5,
      });

      fetchReviews();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  return (
    <section className="bg-white px-[30px] py-[45px]">
      <div className="relative z-10 mx-auto max-w-[1500px]">

        {/* Hero */}
        <ReviewHero />

        {/* Statistics */}
        <ReviewStats />

        {/* Image + Form Section */}
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
          
          {/* Left Side Image */}
          <ReviewImage />

          {/* Right Side Form */}
          <ReviewForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />

        </div>

        {/* Student Reviews */}
        <ReviewCards reviews={reviews} />

        {/* Call To Action */}
        <ReviewCTA />

      </div>
    </section>
  );
}