import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import logo from "../../assets/logo/NEXTGEN LOGO.png";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 shrink-0"
    >
      {/* Logo */}

      <motion.div
        whileHover={{
          rotate: -6,
          scale: 1.05,
        }}
        transition={{
          duration: 0.3,
        }}
        className="
          w-14
          h-14
          rounded-2xl
          bg-white
          shadow-lg
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >
        <img
          src={logo}
          alt="NextGenEdu"
          className="w-10 h-10 object-contain"
        />
      </motion.div>

      {/* Logo Text */}

      <div className="leading-tight">

        <h1
          className="
            text-2xl
            font-extrabold
            tracking-tight
            text-slate-900
          "
        >
          NextGen
          <span className="text-cyan-600">
            Edu
          </span>
        </h1>

        <p
          className="
            text-xs
            text-slate-500
            font-medium
            tracking-wide
          "
        >
          Career & Admission Experts
        </p>

      </div>
    </Link>
  );
}