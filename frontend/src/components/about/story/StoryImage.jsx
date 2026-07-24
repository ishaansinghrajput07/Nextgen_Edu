import { motion } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  Building2,
  BookOpen,
} from "lucide-react";

import storyImage from "../../../assets/hero/about mid.png";

export default function StoryImage() {
  return (
    <div className="relative flex items-center justify-center">

      {/* Glow */}
      <div className="absolute w-[620px] h-[620px] rounded-full bg-cyan-300/20 blur-[140px]" />

      {/* Ring */}
      <motion.div
        animate={{ rotate: 360 }}
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
          border-cyan-300/40
        "
      />

      {/* Ring 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 70,
          ease: "linear",
        }}
        className="
          absolute
          w-[390px]
          h-[390px]
          rounded-full
          border
          border-dashed
          border-sky-200
        "
      />

      {/* Main Image */}

      <motion.img
        src={storyImage}
        alt="NextGenEdu Story"
        initial={{
          opacity: 0,
          y: 40,
          scale: .92,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{ once: true }}
        transition={{
          duration: .8,
        }}
        whileHover={{
          scale: 1.03,
        }}
        className="
          relative
          z-20
          w-[620px]
          max-w-full
          object-contain
          drop-shadow-[0_30px_70px_rgba(8,145,178,.25)]
        "
      />

      {/* Floating Card */}

      <motion.div
        animate={{
          y: [-8, 8, -8],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="
          absolute
          top-10
          -left-5
          z-30
          bg-white
          rounded-2xl
          shadow-xl
          px-5
          py-4
          flex
          items-center
          gap-4
        "
      >
        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
          <Building2
            size={22}
            className="text-blue-600"
          />
        </div>

        <div>
          <h3 className="font-bold text-slate-900">
            250+
          </h3>

          <p className="text-xs text-slate-500">
            Universities
          </p>
        </div>
      </motion.div>

      {/* Floating Card */}

      <motion.div
        animate={{
          y: [8, -8, 8],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="
          absolute
          bottom-14
          -right-2
          z-30
          bg-white
          rounded-2xl
          shadow-xl
          px-5
          py-4
          flex
          items-center
          gap-4
        "
      >
        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
          <GraduationCap
            size={22}
            className="text-emerald-600"
          />
        </div>

        <div>
          <h3 className="font-bold text-slate-900">
            15K+
          </h3>

          <p className="text-xs text-slate-500">
            Students
          </p>
        </div>
      </motion.div>

      {/* Floating Icon */}

      <motion.div
        animate={{
          y: [-8, 10, -8],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="
          absolute
          top-20
          right-10
          w-14
          h-14
          rounded-full
          bg-cyan-500
          shadow-xl
          flex
          items-center
          justify-center
          z-30
        "
      >
        <Sparkles
          size={22}
          className="text-white"
        />
      </motion.div>

      {/* Floating Icon */}

      <motion.div
        animate={{
          y: [10, -10, 10],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="
          absolute
          left-10
          bottom-24
          w-14
          h-14
          rounded-full
          bg-white
          shadow-xl
          flex
          items-center
          justify-center
          z-30
        "
      >
        <BookOpen
          size={22}
          className="text-cyan-600"
        />
      </motion.div>

    </div>
  );
}