import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export default function SectionHeader() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
max-w-3xl
mx-auto
text-center
mb-12
"
    >
      {/* Badge */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.2,
          duration: 0.4,
        }}
        className="
inline-flex
items-center
gap-2
px-4
py-2
rounded-full
bg-cyan-100
border
border-cyan-200
text-cyan-700
font-semibold
text-sm
shadow-sm
"
      >
        <BarChart3 size={16} />

        OUR IMPACT
      </motion.div>

      {/* Heading */}

      <h2
        className="
mt-5
text-3xl
md:text-4xl
lg:text-5xl
font-black
leading-tight
tracking-tight
text-slate-900
"
      >
        Numbers That

        <span
          className="
block
mt-1
bg-gradient-to-r
from-cyan-600
via-blue-600
to-indigo-600
bg-clip-text
text-transparent
"
        >
          Define Our Success
        </span>
      </h2>

      {/* Line */}

      <motion.div
        initial={{
          width: 0,
        }}
        whileInView={{
          width: 90,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.3,
          duration: 0.5,
        }}
        className="
h-1
mx-auto
mt-5
rounded-full
bg-gradient-to-r
from-cyan-500
via-blue-500
to-indigo-500
"
      />

      {/* Description */}

      <p
        className="
mt-5
max-w-2xl
mx-auto
text-[15px]
leading-7
text-slate-600
"
      >
        We connect students with India's leading universities through expert
        counselling, scholarship guidance and a seamless admission experience.
      </p>
    </motion.div>
  );
}