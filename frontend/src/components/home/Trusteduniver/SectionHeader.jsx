import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function SectionHeader() {
  return (
    <div
      className="
relative
max-w-5xl
mx-auto
text-center
"
    >
      {/* Trusted Badge */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
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
inline-flex
items-center
gap-2
rounded-full
border
border-sky-200
bg-white/90
backdrop-blur-xl
px-6
py-3
shadow-[0_10px_30px_rgba(14,165,233,.12)]
"
      >
        <div
          className="
flex
items-center
justify-center
w-7
h-7
rounded-full
bg-gradient-to-br
from-blue-600
to-cyan-500
text-white
"
        >
          <ShieldCheck size={16} />
        </div>

        <span
          className="
text-sm
font-bold
tracking-[0.18em]
uppercase
text-blue-700
"
        >
          Trusted Network
        </span>
      </motion.div>

      {/* Heading */}

      <motion.h2
        initial={{
          opacity: 0,
          y: 35,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.15,
          duration: 0.7,
        }}
        className="
mt-8
text-4xl
leading-tight
font-black
tracking-tight
text-slate-900
sm:text-5xl
lg:text-6xl
"
      >
        A Network You Can Trust,
        <br />

        <span
          className="
bg-gradient-to-r
from-blue-700
via-sky-600
to-cyan-500
bg-clip-text
text-transparent
"
        >
          A Future You Can Build
        </span>
      </motion.h2>

      {/* Decorative Line */}

      <motion.div
        initial={{
          width: 0,
          opacity: 0,
        }}
        whileInView={{
          width: 170,
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.35,
          duration: 0.6,
        }}
        className="
mx-auto
mt-8
flex
items-center
justify-center
gap-3
"
      >
        <div
          className="
h-[2px]
w-full
rounded-full
bg-gradient-to-r
from-transparent
to-cyan-500
"
        />

        <div
          className="
flex
items-center
justify-center
w-10
h-10
rounded-full
bg-white
border
border-sky-200
shadow-lg
"
        >
          <ShieldCheck
            size={18}
            className="text-sky-600"
          />
        </div>

        <div
          className="
h-[2px]
w-full
rounded-full
bg-gradient-to-l
from-transparent
to-cyan-500
"
        />
      </motion.div>

      {/* Description */}

      <motion.p
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.45,
          duration: 0.7,
        }}
        className="
mx-auto
mt-8
max-w-3xl
text-lg
leading-9
text-slate-600
md:text-xl
"
      >
        We collaborate with India's leading universities to deliver
        trusted admission guidance, scholarship opportunities,
        personalized counselling, and a seamless enrollment
        experience that helps every student build a brighter future.
      </motion.p>
    </div>
  );
}