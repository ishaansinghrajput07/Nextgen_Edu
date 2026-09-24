import { motion } from "framer-motion";
import {
  GraduationCap,
  Building2,
  BookOpen,
  Sparkles,
} from "lucide-react";

import heroImage from "../../assets/hero/about.png";

export default function AboutImage() {
  return (
    <div className="relative flex justify-center items-center">

      {/* ================= Background Glow ================= */}

      <div className="absolute w-[650px] h-[650px] rounded-full bg-cyan-300/20 blur-[140px]" />

      <div className="absolute w-[420px] h-[420px] rounded-full bg-sky-200/30 blur-[120px]" />

      {/* ================= Rotating Ring ================= */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 45,
          ease: "linear",
        }}
        className="
          absolute
          w-[520px]
          h-[520px]
          rounded-full
          border-2
          border-dashed
          border-cyan-300/50
        "
      />

      {/* ================= Second Ring ================= */}

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          repeat: Infinity,
          duration: 65,
          ease: "linear",
        }}
        className="
          absolute
          w-[400px]
          h-[400px]
          rounded-full
          border
          border-dashed
          border-sky-200
        "
      />

      {/* ================= Floating Graduation ================= */}

      <motion.div
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="
          absolute
          left-0
          top-12
          z-30
          w-16
          h-16
          rounded-2xl
          bg-white
          shadow-xl
          flex
          items-center
          justify-center
        "
      >
        <GraduationCap
          size={28}
          className="text-cyan-600"
        />
      </motion.div>

      {/* ================= Floating Building ================= */}

      <motion.div
        animate={{
          y: [10, -10, 10],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="
          absolute
          right-2
          top-28
          z-30
          w-16
          h-16
          rounded-2xl
          bg-white
          shadow-xl
          flex
          items-center
          justify-center
        "
      >
        <Building2
          size={28}
          className="text-blue-600"
        />
      </motion.div>

      {/* ================= Floating Book ================= */}

      <motion.div
        animate={{
          y: [-8, 12, -8],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="
          absolute
          left-12
          bottom-10
          z-30
          w-16
          h-16
          rounded-2xl
          bg-white
          shadow-xl
          flex
          items-center
          justify-center
        "
      >
        <BookOpen
          size={28}
          className="text-emerald-600"
        />
      </motion.div>

      {/* ================= Floating Sparkle ================= */}

      <motion.div
        animate={{
          y: [8, -8, 8],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="
          absolute
          right-8
          bottom-16
          z-30
          w-14
          h-14
          rounded-full
          bg-cyan-500
          shadow-xl
          flex
          items-center
          justify-center
        "
      >
        <Sparkles
          size={22}
          className="text-white"
        />
      </motion.div>

      {/* ================= Main Image ================= */}

      <motion.img
        src={heroImage}
        alt="NextGenEdu"
        initial={{
          opacity: 0,
          y: 40,
          scale: .9,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: .8,
        }}
        whileHover={{
          scale: 1.02,
        }}
        className="
          relative
          z-20
          w-[700px]
          max-w-full
          h-auto
          object-contain
          drop-shadow-[0_30px_70px_rgba(8,145,178,.25)]
        "
      />

      {/* ================= Bottom Glass Card ================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: .8,
        }}
        className="
absolute
-bottom-16
left-1/3
-translate-x-1/2
w-[320px]
rounded-3xl
bg-white/80
backdrop-blur-xl
border
border-white
shadow-[0_20px_40px_rgba(15,23,42,.08)]
px-5
py-4
z-30
"
      >
        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-3xl font-bold text-slate-900">
              15K+
            </h3>

            <p className="text-sm text-slate-500">
              Students Guided
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center">

            <GraduationCap
              size={28}
              className="text-cyan-600"
            />

          </div>

        </div>

      </motion.div>

    </div>
  );
}