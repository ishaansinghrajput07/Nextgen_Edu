import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

export default function BookCounsellingButton() {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="hidden lg:block"
    >
      <Link
        to="/contact"
        className="
          group
          relative
          overflow-hidden
          inline-flex
          items-center
          gap-3
          px-7
          h-14
          rounded-2xl
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
          text-white
          font-semibold
          shadow-[0_15px_35px_rgba(14,165,233,.35)]
          transition-all
          duration-300
          hover:shadow-[0_20px_45px_rgba(14,165,233,.45)]
        "
      >
        {/* Hover Overlay */}

        <span
          className="
            absolute
            inset-0
            bg-white/15
            translate-x-[-100%]
            group-hover:translate-x-0
            transition-transform
            duration-500
          "
        />

        {/* Icon */}

        <CalendarDays
          size={20}
          className="relative z-10"
        />

        {/* Text */}

        <span className="relative z-10 whitespace-nowrap">
          Book Free Counselling
        </span>

        {/* Arrow */}

        <ArrowRight
          size={18}
          className="
            relative
            z-10
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </Link>
    </motion.div>
  );
}