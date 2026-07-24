import { motion } from "framer-motion";

export default function SectionHeader() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
      }}
      className="
max-w-3xl
mx-auto
text-center
"
    >
      {/* Badge */}

      <div
        className="
inline-flex
items-center
rounded-full
bg-cyan-50
border
border-cyan-200
px-5
py-2
mb-5
"
      >
        <span
          className="
text-sm
font-semibold
tracking-wide
uppercase
text-cyan-700
"
        >
          Trusted Network
        </span>
      </div>

      {/* Heading */}

      <h2
        className="
text-4xl
md:text-5xl
font-extrabold
leading-tight
tracking-tight
text-slate-900
"
      >
        Trusted by
        <span
          className="
block
mt-1
bg-gradient-to-r
from-blue-700
via-cyan-600
to-cyan-400
bg-clip-text
text-transparent
"
        >
          Top Universities
        </span>
      </h2>

      {/* Gradient Line */}

      <motion.div
        initial={{
          width: 0,
        }}
        whileInView={{
          width: 130,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.3,
          duration: 0.6,
        }}
        className="
h-1
mx-auto
mt-5
rounded-full
bg-gradient-to-r
from-blue-600
to-cyan-400
"
      />

      {/* Description */}

      <p
        className="
mt-6
text-lg
leading-8
text-slate-600
max-w-2xl
mx-auto
"
      >
        We collaborate with India's leading universities to provide trusted
        admission guidance, expert counselling, scholarship support and a
        seamless enrollment experience for every student.
      </p>
    </motion.div>
  );
}
