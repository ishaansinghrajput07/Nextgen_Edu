import { motion } from "framer-motion";
import { CalendarCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BookCounsellingButton = ({ mobile = false }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={mobile ? "w-full" : "hidden md:block"}
    >
      <Link
        to="/book-counselling"
        className={`
          group
          relative
          overflow-hidden
          inline-flex
          items-center
          justify-center
          gap-2
          font-semibold
          transition-all
          duration-300

          ${
            mobile
              ? `
                w-full
                py-4
                rounded-2xl
                text-base
              `
              : `
                px-4
                py-2.5
                rounded-xl
                text-sm
                whitespace-nowrap
              `
          }

          bg-gradient-to-r
          from-sky-600
          via-cyan-500
          to-sky-500

          text-white
          shadow-lg
          shadow-sky-200/40
          hover:shadow-xl
          hover:shadow-sky-300/50
        `}
      >
        {/* Shine Effect */}
        <span
          className="
            absolute
            inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/25
            to-transparent
            group-hover:translate-x-full
            transition-transform
            duration-700
          "
        />

        {/* Icon */}
        <CalendarCheck
          className={mobile ? "relative z-10 h-5 w-5" : "relative z-10 h-4 w-4"}
        />

        {/* Text */}
        <span className="relative z-10">
          {mobile ? "Book Free Counselling" : "Free Counselling"}
        </span>

        {/* Arrow */}
        <ArrowRight
          className="
            relative
            z-10
            h-4
            w-4
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </Link>
    </motion.div>
  );
};

export default BookCounsellingButton;