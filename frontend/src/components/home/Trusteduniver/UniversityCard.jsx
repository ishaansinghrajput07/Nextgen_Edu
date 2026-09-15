import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function UniversityCard({
  university,
  onCompareToggle,
  isCompared = false,
}) {
  const [checked, setChecked] =
    useState(isCompared);

  useEffect(() => {
    setChecked(isCompared);
  }, [isCompared]);

  const handleCompareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newChecked = !checked;

    /*
     * Parent ko COMPLETE university object milega.
     */
    if (onCompareToggle) {
      onCompareToggle(
        university,
        newChecked
      );
    }

    /*
     * Context ke according state update.
     */
    if (!newChecked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  /*
   * Ye sirf CARD DISPLAY ke liye hai.
   * Complete `university` object remove nahi hota.
   */
  const courseCount = Array.isArray(
    university?.courses
  )
    ? university.courses.length
    : university?.coursesCount || 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="
        group
        relative
        flex
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
      "
    >

      {/* COMPARE */}
      <button
        type="button"
        onClick={handleCompareClick}
        className={`
          absolute
          right-3
          top-3
          z-10
          flex
          items-center
          gap-1.5
          rounded-md
          px-2
          py-1
          text-xs
          font-semibold
          transition-all

          ${
            checked
              ? "bg-amber-400 text-slate-900"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }
        `}
      >
        <span
          className={`
            flex
            h-3.5
            w-3.5
            items-center
            justify-center
            rounded
            border

            ${
              checked
                ? "border-slate-900 bg-slate-900 text-amber-400"
                : "border-slate-400 bg-white"
            }
          `}
        >
          {checked && (
            <Check
              size={10}
              strokeWidth={3}
            />
          )}
        </span>

        Compare
      </button>

      {/* LOGO */}
      <div className="flex h-32 w-full items-center justify-center bg-white p-5">
        <img
          src={university?.universityLogo}
          alt={
            university?.universityName ||
            "University"
          }
          loading="lazy"
          className="
            max-h-16
            max-w-[160px]
            object-contain
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />
      </div>

      {/* DIVIDER */}
      <div className="h-px w-full bg-slate-100" />

      {/* CONTENT */}
      <div className="flex flex-1 flex-col items-center justify-between p-5 text-center">

        <div>

          {/* COURSES */}
          <p className="text-base font-extrabold text-slate-900">
            {courseCount > 0
              ? `${courseCount} Courses`
              : "Courses Available"}
          </p>

          {/* NAME */}
          <h3
            className="
              mt-1
              flex
              min-h-[40px]
              items-center
              justify-center
              line-clamp-2
              text-sm
              font-semibold
              text-slate-600
            "
          >
            {university?.universityName}
          </h3>

        </div>

        {/* KNOW MORE */}
        <Link
          to={`/universities/${university?.slug}`}
          className="
            mt-4
            inline-block
            text-sm
            font-bold
            !text-blue-600
            transition-colors
            duration-200
            hover:!text-blue-700
            hover:underline
          "
        >
          Know More
        </Link>

      </div>
    </motion.div>
  );
}