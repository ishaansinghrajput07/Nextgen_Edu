import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Clock3,
  IndianRupee,
  ArrowRight,
  BadgeCheck,
  GraduationCap,
} from "lucide-react";

export default function CourseCard({ course, onApply }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-4
      shadow-lg
      shadow-sky-100/40
      transition
      hover:border-sky-300
      hover:shadow-xl
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        -right-16
        -top-16
        h-40
        w-40
        rounded-full
        bg-sky-100
        blur-3xl
        "
      />

      <div
        className="
        absolute
        -bottom-16
        -left-16
        h-40
        w-40
        rounded-full
        bg-cyan-100
        blur-3xl
        "
      />

      <div
        className="
        relative
        z-10
        "
      >
        {/* University Logo */}

        <div
          className="
          flex
          items-center
          justify-between
          "
        >
          <div
            className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
            "
          >
            <img
              src={
                course.university?.universityLogo ||
                "https://via.placeholder.com/80"
              }
              alt={course.university?.universityName}
              className="
              h-10
              w-10
              object-contain
              "
            />
          </div>

          <span
            className="
            rounded-full
            bg-green-50
            px-3
            py-1
            text-xs
            font-bold
            text-green-700
            "
          >
            Admission Open
          </span>
        </div>

        {/* Course Name */}

        <h3
          className="
          mt-3
          line-clamp-2
          text-lg
          font-black
          leading-tight
          text-slate-900
          "
        >
          {course.courseName}
        </h3>

        {/* University */}

        <p
          className="
          mt-1
          truncate
          text-xs
          text-slate-500
          "
        >
          {course.university?.universityName}
        </p>

        {/* Details */}

        <div
          className="
          mt-3
          space-y-2
          "
        >
          <div
            className="
            flex
            items-center
            justify-between
            rounded-xl
            bg-slate-50
            px-3
            py-2
            "
          >
            <div
              className="
              flex
              items-center
              gap-2
              "
            >
              <Clock3
                size={16}
                className="
                text-sky-600
                "
              />

              <span
                className="
                text-xs
                text-slate-600
                "
              >
                Duration
              </span>
            </div>

            <span
              className="
              text-sm
              font-bold
              text-slate-800
              "
            >
              {course.duration}
            </span>
          </div>

          <div
            className="
            flex
            items-center
            justify-between
            "
          >
            <span
              className="
              text-sm
              text-slate-500
              "
            >
              Fees
            </span>

            <div
              className="
              flex
              items-center
              font-black
              text-sky-600
              "
            >
              <IndianRupee size={16} />

              {Number(course.fees || 0).toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        {/* Highlights */}

        <div
          className="
          mt-3
          flex
          flex-wrap
          gap-2
          "
        >
          <span
            className="
            rounded-full
            bg-sky-50
            px-3
            py-1
            text-xs
            font-semibold
            text-sky-700
            "
          >
            ✓ UGC Approved
          </span>

          <span
            className="
            rounded-full
            bg-emerald-50
            px-3
            py-1
            text-xs
            font-semibold
            text-emerald-700
            "
          >
            ✓ Placement
          </span>
        </div>

        {/* Divider */}

        <div
          className="
          my-3
          h-px
          bg-slate-200
          "
        />

        {/* Action Buttons */}

        <div
          className="
          grid
          grid-cols-2
          gap-3
          "
        >
          {/* Apply */}

          <motion.button
            whileTap={{
              scale: 0.96,
            }}
            onClick={onApply}
            className="
            flex
            items-center
            justify-center
            gap-1
            rounded-xl
            bg-gradient-to-r
            from-sky-500
            to-cyan-600
            px-3
            py-2.5
            text-xs
            font-bold
            text-white
            shadow-md
            shadow-sky-200
            transition
            hover:shadow-lg
            "
          >
            Apply Now
            <ArrowRight size={14} />
          </motion.button>

          {/* Details */}

          <Link
            to={`/courses/${course.slug}`}
            className="
            flex
            items-center
            justify-center
            gap-1
            rounded-xl
            border
            border-sky-200
            bg-white
            px-3
            py-3
            text-xs
            font-bold
            text-sky-700
            transition
            hover:bg-sky-50
            "
          >
            Details
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Footer */}

        <div
          className="
          mt-3
          flex
          items-center
          justify-between
          border-t
          border-slate-100
          pt-3
          "
        >
          <div
            className="
            flex
            items-center
            gap-1
            "
          >
            <BadgeCheck
              size={16}
              className="
              text-emerald-500
              "
            />

            <span
              className="
              text-xs
              font-medium
              text-slate-600
              "
            >
              Verified
            </span>
          </div>

          <div
            className="
            flex
            items-center
            gap-1
            "
          >
            <GraduationCap
              size={16}
              className="
              text-sky-600
              "
            />

            <span
              className="
    text-sm
    font-bold
    text-slate-800
    "
            >
              {course.courseMode || "Online"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
