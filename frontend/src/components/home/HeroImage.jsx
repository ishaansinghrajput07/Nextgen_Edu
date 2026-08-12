import { motion, AnimatePresence } from "framer-motion";

export default function HeroImage({ slide }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Background Glow */}

      <div
        className="
        absolute
        w-[650px]
        h-[650px]
        rounded-full
        bg-cyan-300/20
        blur-[140px]
        "
      />

      {/* Rotating Ring */}

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
        border
        border-dashed
        border-cyan-300/40
        "
      />

      {/* Image Slider */}

      <AnimatePresence mode="wait">
        <motion.img
          key={slide.id}
          src={slide.image}
          alt="Students"
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -30,
            scale: 0.95,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
          relative
          z-10
          w-[720px]
          max-w-full
          -top-6
          h-auto
          object-contain
          drop-shadow-[0_25px_60px_rgba(37,99,235,.25)]
          "
        />
      </AnimatePresence>
    </div>
  );
}
