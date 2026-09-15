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
  const hasFees =
    course?.fees !== null &&
    course?.fees !== undefined &&
    course?.fees !== "";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="
        group
        relative
        h-full
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-[0_8px_30px_rgba(15,23,42,0.05)]
        transition-all
        duration-300
        hover:border-teal-300
        hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)]
      "
    >
      {/* Soft Card Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-teal-100/60 blur-3xl transition-all duration-500 group-hover:bg-teal-200/70" />

      <div className="pointer-events-none absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-violet-100/50 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Top */}
        <div className="flex items-center justify-between gap-3">
          {/* University Logo */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            {course.university?.universityLogo ? (
              <img
                src={course.university.universityLogo}
                alt={course.university?.universityName || "University"}
                className="h-9 w-9 object-contain"
              />
            ) : (
              <GraduationCap
                size={25}
                className="text-teal-700"
              />
            )}
          </div>

          {/* Admission */}
          <span className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#131371]">
            Admission Open
          </span>
        </div>

        {/* Course Name */}
        <h3 className="mt-4 line-clamp-2 min-h-[44px] text-[17px] font-black leading-[1.3] text-slate-950">
          {course.courseName}
        </h3>

        {/* University */}
        <p className="mt-1 truncate text-xs font-semibold text-slate-500">
          {course.university?.universityName}
        </p>

        {/* Duration */}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50">
              <Clock3
                size={14}
                className="text-teal-700"
              />
            </div>

            <span className="text-xs font-semibold text-slate-500">
              Duration
            </span>
          </div>

          <span className="text-xs font-black text-slate-950">
            {course.duration || "N/A"}
          </span>
        </div>

        {/* Fees */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            Course Fees
          </span>

          {hasFees ? (
            <div className="flex items-center font-black text-[#131371]">
              <IndianRupee size={14} />

              <span className="text-sm">
                {Number(course.fees).toLocaleString("en-IN")}
              </span>
            </div>
          ) : (
            <span className="text-xs font-bold text-slate-500">
              Not available
            </span>
          )}
        </div>

        {/* Highlights */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-teal-100 bg-teal-50 px-2.5 py-1 text-[10px] font-black text-teal-700">
            ✓ UGC Approved
          </span>

          <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">
            ✓ Placement
          </span>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-slate-200" />

        {/* Buttons */}
        <div className="mt-auto grid grid-cols-2 gap-2.5">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onApply}
            className="
              group/btn
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-yellow-400
              px-3
              py-2.5
              text-[11px]
              font-black
              text-slate-950
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-yellow-300
            "
          >
            Apply Now

            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 text-white transition-transform duration-300 group-hover/btn:translate-x-0.5">
              <ArrowRight size={11} />
            </span>
          </motion.button>

          <Link
            to={`/courses/${course.slug}`}
            className="
              flex
              items-center
              justify-center
              gap-1.5
              rounded-xl
              border
              border-slate-200
              bg-white
              px-3
              py-2.5
              text-[11px]
              font-black
              text-slate-700
              transition-all
              duration-300
              hover:border-teal-200
              hover:bg-teal-50
              hover:text-teal-700
            "
          >
            Details
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Bottom Info */}
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1.5">
            <BadgeCheck
              size={15}
              className="text-emerald-600"
            />

            <span className="text-[11px] font-bold text-slate-600">
              Verified
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <GraduationCap
              size={15}
              className="text-teal-700"
            />

            <span className="text-[11px] font-black text-slate-700">
              {course.courseMode || "Online"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}