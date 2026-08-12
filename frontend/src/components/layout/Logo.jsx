import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Logo = ({
  logo,
  name = "Your Brand",
  tagline = "Admission Guidance Experts",
}) => {
  return (
    <Link to="/" className="flex shrink-0 items-center">
      <motion.div
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="group flex items-center gap-3"
      >
        {/* ================================================= */}
        {/* LOGO IMAGE */}
        {/* ================================================= */}

        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-2xl bg-sky-400/30 blur-xl opacity-0 transition-all duration-500 group-hover:opacity-100" />

          {logo ? (
            <img
              src={logo}
              alt={name}
              className="relative z-10 h-full w-full object-contain"
            />
          ) : (
            <div className="relative z-10 flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-xl font-black text-white">
              {name.charAt(0)}
            </div>
          )}
        </motion.div>

        {/* ================================================= */}
        {/* BRAND TEXT */}
        {/* ================================================= */}

        <div className="flex flex-col leading-none">
          <motion.h1
            whileHover={{
              x: 2,
            }}
            className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl"
          >
            {name}
          </motion.h1>

          <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-sky-600">
            {tagline}
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default Logo;
