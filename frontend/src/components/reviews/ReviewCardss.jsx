import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahul Kumar",
    location: "Delhi",
    course: "MBA",
    university: "Amity University",
    rating: 5,
    review:
      "NextGen Education made my admission process very simple. The counsellor explained everything clearly and helped me choose the right university.",
    initials: "RK",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Jaipur",
    course: "BCA",
    university: "Manipal University",
    rating: 5,
    review:
      "I was confused about online degree options, but the NextGen team guided me from university selection to application submission.",
    initials: "PS",
  },
  {
    id: 3,
    name: "Aman Verma",
    location: "Lucknow",
    course: "MCA",
    university: "Lovely Professional University",
    rating: 5,
    review:
      "The counselling service was really helpful. I got all the information about fees, eligibility and admission process in one place.",
    initials: "AV",
  },
  {
    id: 4,
    name: "Sneha Singh",
    location: "Patna",
    course: "BBA",
    university: "Chandigarh University",
    rating: 5,
    review:
      "My admission experience was smooth and hassle-free. The counsellor was always available whenever I had any questions.",
    initials: "SS",
  },
  {
    id: 5,
    name: "Rohit Yadav",
    location: "Gurgaon",
    course: "MBA",
    university: "Jain University",
    rating: 5,
    review:
      "NextGen helped me compare different universities before making my final decision. Their guidance saved me a lot of time.",
    initials: "RY",
  },
  {
    id: 6,
    name: "Neha Kumari",
    location: "Bihar",
    course: "MCA",
    university: "Amity University",
    rating: 5,
    review:
      "The entire admission process was explained step by step. I especially liked the quick response from the counselling team.",
    initials: "NK",
  },
  {
    id: 7,
    name: "Arjun Mehta",
    location: "Mumbai",
    course: "B.Com",
    university: "Manipal University",
    rating: 5,
    review:
      "I received genuine guidance about courses and universities. The team helped me complete my application without any confusion.",
    initials: "AM",
  },
  {
    id: 8,
    name: "Anjali Gupta",
    location: "Noida",
    course: "BBA",
    university: "Lovely Professional University",
    rating: 5,
    review:
      "Very professional counselling experience. From choosing the course to submitting documents, everything was handled smoothly.",
    initials: "AG",
  },
];

export default function ReviewCards() {
  const [currentPage, setCurrentPage] = useState(0);

  // 8 reviews / 4 per page = 2 pages
  const cardsPerPage = 4;
  const totalPages = Math.ceil(reviews.length / cardsPerPage);

  // =========================
  // Auto Change
  // =========================
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalPages]);

  const startIndex = currentPage * cardsPerPage;
  const visibleReviews = reviews.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  // =========================
  // Previous
  // =========================
  const handlePrevious = () => {
    setCurrentPage(
      (prev) => (prev - 1 + totalPages) % totalPages
    );
  };

  // =========================
  // Next
  // =========================
  const handleNext = () => {
    setCurrentPage(
      (prev) => (prev + 1) % totalPages
    );
  };

  return (
    <section className="mt-10 bg-white">

      {/* =========================
          Heading
      ========================= */}
      <div className="mb-8 text-center">

        {/* Eyebrow */}
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-slate-200" />

          <span className="text-[13px] font-black uppercase tracking-[0.18em] text-[#1a4d40]">
            Student Reviews
          </span>

          <span className="h-px w-10 bg-slate-200" />
        </div>

        {/* Heading */}
        <h2 className="text-[34px] font-black leading-tight tracking-tight text-slate-950 md:text-[42px]">
          What Our Students{" "}
          <span className="text-[#131371]

">Say</span>
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-[14px] font-semibold leading-6 text-slate-500 md:text-[15px]">
          Hear from students across India who trusted NextGen Education
          for their university and admission journey.
        </p>
      </div>

      {/* =========================
          Cards
      ========================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.45 }}
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {visibleReviews.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              whileHover={{ y: -5 }}
              className="
                group
                flex
                min-h-[285px]
                flex-col
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                transition-all
                duration-300
                hover:border-teal-200
                hover:shadow-[0_16px_40px_rgba(15,23,42,0.09)]
              "
            >
              {/* Top */}
              <div className="flex items-start justify-between">

                {/* Avatar + Student */}
                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-teal-100
                      bg-teal-50
                      text-[13px]
                      font-black
                      text-teal-700
                    "
                  >
                    {student.initials}
                  </div>

                  <div>
                    <h3 className="text-[15px] font-black leading-tight text-slate-950">
                      {student.name}
                    </h3>

                    <p className="mt-1 text-[12px] font-semibold text-slate-400">
                      {student.location}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <Quote className="h-7 w-7 text-teal-100 transition-colors group-hover:text-teal-200" />
              </div>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-1">
                <div className="flex text-[14px] tracking-wide text-yellow-400">
                  {"★".repeat(student.rating)}
                </div>

                <span className="ml-1 text-[12px] font-bold text-slate-400">
                  {student.rating}.0
                </span>
              </div>

              {/* Review */}
              <p
                className="
                  mt-4
                  flex-1
                  text-[13px]
                  font-semibold
                  leading-6
                  text-slate-500
                "
              >
                “{student.review}”
              </p>

              {/* Course */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className="
                    rounded-lg
                    border
                    border-teal-100
                    bg-teal-50
                    px-2.5
                    py-1
                    text-[11px]
                    font-black
                    text-teal-700
                  "
                >
                  {student.course}
                </span>

                <span
                  className="
                    max-w-full
                    truncate
                    rounded-lg
                    border
                    border-slate-200
                    bg-slate-50
                    px-2.5
                    py-1
                    text-[11px]
                    font-bold
                    text-slate-500
                  "
                >
                  {student.university}
                </span>
              </div>

              {/* Bottom */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

                <div className="flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-teal-700" />

                  <span className="text-[11px] font-black text-teal-700">
                    Verified Student
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-slate-300">
                  NextGen
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* =========================
          Controls
      ========================= */}
      <div className="mt-7 flex items-center justify-center gap-4">

        {/* Previous */}
        <button
          type="button"
          onClick={handlePrevious}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-600
            transition-all
            duration-300
            hover:border-teal-200
            hover:bg-teal-50
            hover:text-teal-700
          "
          aria-label="Previous reviews"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentPage(index)}
              aria-label={`Go to review page ${index + 1}`}
              className={`
                h-2
                rounded-full
                transition-all
                duration-300
                ${
                  currentPage === index
                    ? "w-7 bg-teal-700"
                    : "w-2 bg-slate-200 hover:bg-teal-300"
                }
              `}
            />
          ))}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={handleNext}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-600
            transition-all
            duration-300
            hover:border-teal-200
            hover:bg-teal-50
            hover:text-teal-700
          "
          aria-label="Next reviews"
        >
          <ChevronRight size={18} />
        </button>

      </div>

    </section>
  );
}