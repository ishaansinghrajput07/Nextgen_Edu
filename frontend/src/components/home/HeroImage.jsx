import { motion } from "framer-motion";
import heroImage from "../../assets/hero/student.png";

export default function HeroImage() {
  return (
    <div className="relative flex items-center justify-center">

      {/* Background Glow */}
      <div className="absolute w-[650px] h-[650px] bg-cyan-300/20 blur-[140px] rounded-full" />

      {/* Rotating Decorative Ring */}
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
          border
          border-dashed
          border-cyan-300/40
        "
      />

      {/* Main Image */}
      <motion.img
        src={heroImage}
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
        transition={{
          duration: 0.8,
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
    </div>
  );
}