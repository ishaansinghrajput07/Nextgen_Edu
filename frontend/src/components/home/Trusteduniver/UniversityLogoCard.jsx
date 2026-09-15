import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function UniversityLogoCard({ university }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="shrink-0"
    >
      <Link
        to={`/universities/${university?.slug}`}
        className="group flex h-[84px] w-[195px] shrink-0 items-center justify-center rounded-2xl border border-gray-200/90 bg-white px-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-gray-300 hover:shadow-md sm:h-[90px] sm:w-[215px]"
      >
        <img
          src={university?.universityLogo}
          alt={university?.universityName}
          loading="lazy"
          className="max-h-14 max-w-[170px] object-contain opacity-85 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 sm:max-h-16 sm:max-w-[185px]"
        />
      </Link>
    </motion.div>
  );
}