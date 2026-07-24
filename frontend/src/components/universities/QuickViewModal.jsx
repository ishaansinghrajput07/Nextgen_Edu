import Modal from "../common/Modal";
import { Link } from "react-router-dom";

export default function QuickViewModal({ university, isOpen, onClose }) {
  if (!university) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-h-[80vh] overflow-y-auto">
        <img
          src={university.banner || university.image}
          alt={university.name}
          className="
          w-full
          h-56
          object-cover
          rounded-2xl
          "
        />

        <h2 className="text-3xl font-bold mt-6">{university.name}</h2>

        <p className="text-gray-400 mt-2">📍 {university.location}</p>

        <div className="flex gap-4 mt-4">
          <span>⭐ {university.rating}</span>

          <span>₹ {university.fees}</span>
        </div>

        {/* Overview */}

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Overview</h3>

          <p className="text-gray-300">{university.overview}</p>
        </div>

        {/* Approvals */}

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Approvals</h3>

          <div className="flex flex-wrap gap-2">
            {university.approvals?.map((approval) => (
              <span
                key={approval}
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-cyan-500/20
                  text-sm
                  "
              >
                {approval}
              </span>
            ))}
          </div>
        </div>

        {/* Courses */}

        {university.courses && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Popular Courses</h3>

            <div className="flex flex-wrap gap-2">
              {university.courses.map((course) => (
                <span
                  key={course}
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-purple-500/20
                    text-sm
                    "
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-4 mt-8">
          <Link
            to="/admission"
            className="
    bg-cyan-500
    py-3
    rounded-xl
    text-center
    hover:bg-cyan-600
    duration-300
    "
          >
            Apply Now
          </Link>

          <button
            className="
    border
    border-white/20
    py-3
    rounded-xl
    hover:bg-white/10
    duration-300
    "
          >
            Download Brochure
          </button>
        </div>
      </div>
    </Modal>
  );
}
