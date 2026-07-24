import { motion } from "framer-motion";

const positions = {
  "top-left":
    "top-6 -left-8 lg:-left-14",

  "top-right":
    "top-12 -right-8 lg:-right-14",

  "bottom-left":
    "bottom-16 -left-6 lg:-left-10",

  "bottom-right":
    "bottom-4 right-0 lg:-right-10",
};

export default function HeroFloatingCards({
  icon: Icon,
  title,
  subtitle,
  position,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: {
          duration: 0.5,
        },
        scale: {
          duration: 0.5,
        },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.05,
      }}
      className={`
        absolute
        ${positions[position]}
        w-52
        rounded-3xl
        border
        border-white/60
        bg-white/80
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(15,23,42,0.12)]
        p-5
        z-20
      `}
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-cyan-500
            to-blue-600
            text-white
            shadow-lg
          "
        >
          <Icon size={28} />
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}