import { useEffect, useState } from "react";
import api from "../services/api";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const token = localStorage.getItem("token");

  const getReviews = async () => {
    try {
      const res = await api.get("/../reviews/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReviews(res.data.reviews);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const approveReview = async (id) => {
    try {
      await api.put(
        `/../reviews/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      getReviews();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const rejectReview = async (id) => {
    try {
      await api.delete(`/../reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getReviews();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Reviews</h1>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="
            glass
            p-6
            rounded-3xl
            "
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold">{review.name}</h3>

                <p>{review.course}</p>
              </div>

              <div className="text-yellow-400 text-xl">
                {"★".repeat(review.rating)}
              </div>
            </div>

            <p className="mt-4">{review.review}</p>

            <p className="mt-4 text-sm">
              Status : <span className="font-semibold">{review.status}</span>
            </p>

            <div className="flex gap-3 mt-5">
              {review.status === "Pending" && (
                <button
                  onClick={() => approveReview(review._id)}
                  className="
                  bg-green-500
                  px-4
                  py-2
                  rounded-xl
                  hover:bg-green-600
                  "
                >
                  Approve
                </button>
              )}

              <button
                onClick={() => rejectReview(review._id)}
                className="
                bg-red-500
                px-4
                py-2
                rounded-xl
                hover:bg-red-600
                "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
