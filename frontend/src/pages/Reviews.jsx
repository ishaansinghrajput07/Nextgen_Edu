import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Components
import ReviewHero from "../components/reviews/ReviewHero";
import ReviewStats from "../components/reviews/ReviewStats";
import ReviewImage from "../components/reviews/ReviewImage";
import ReviewForm from "../components/reviews/ReviewForm";
import ReviewCards from "../components/reviews/ReviewCards";
import ReviewCTA from "../components/reviews/ReviewCTA";
import api from "../services/api";

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
      const res = await api.get("/../reviews");

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
      await api.post("/../reviews", formData);

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
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 py-24">

      {/* Blur Background */}

      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-300/20 blur-[140px]" />

      <div className="absolute -bottom-32 -right-32 h-[450px] w-[450px] rounded-full bg-sky-300/20 blur-[150px]" />

      {/* Dot Pattern */}

      <div className="absolute left-10 top-40 opacity-20">

        <div className="grid grid-cols-6 gap-2">

          {Array.from({ length: 36 }).map((_, index) => (
            <span
              key={index}
              className="h-2 w-2 rounded-full bg-sky-500"
            />
          ))}

        </div>

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Hero */}

        <ReviewHero />

        {/* Statistics */}

        <ReviewStats />

        {/* Image + Form Section */}

        <div className="mt-24 grid items-center gap-10 lg:grid-cols-2">
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