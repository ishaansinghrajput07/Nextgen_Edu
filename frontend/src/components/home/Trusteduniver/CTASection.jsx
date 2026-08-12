import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export default function CTASection() {
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
relative
overflow-hidden
rounded-[36px]
border
border-sky-100
bg-gradient-to-br
from-white
via-sky-50
to-cyan-50
shadow-[0_25px_70px_rgba(14,165,233,.12)]
"
    >
      {/* Background Glow */}

      <div
        className="
absolute
-top-24
-left-24
w-72
h-72
rounded-full
bg-cyan-300/20
blur-[110px]
pointer-events-none
"
      />

      <div
        className="
absolute
-bottom-24
-right-24
w-72
h-72
rounded-full
bg-blue-300/20
blur-[110px]
pointer-events-none
"
      />

      {/* Grid */}

      <div
        className="
absolute
inset-0
opacity-[0.03]
[background-image:radial-gradient(#0284c7_1px,transparent_1px)]
[background-size:22px_22px]
"
      />

      <div
        className="
relative
z-10
px-8
py-16
lg:px-20
text-center
"
      >
        {/* Icon */}

        <div
          className="
mx-auto
flex
items-center
justify-center
w-20
h-20
rounded-full
bg-gradient-to-br
from-blue-600
to-cyan-500
shadow-[0_15px_40px_rgba(14,165,233,.35)]
"
        >
          <GraduationCap
            size={38}
            className="text-white"
          />
        </div>

        {/* Heading */}

        <h2
          className="
mt-8
text-4xl
lg:text-5xl
font-black
tracking-tight
text-slate-900
leading-tight
"
        >
          Ready to Start Your

          <span
            className="
block
mt-2
bg-gradient-to-r
from-blue-700
via-cyan-600
to-sky-500
bg-clip-text
text-transparent
"
          >
            Admission Journey?
          </span>
        </h2>

        {/* Description */}

        <p
          className="
mt-6
max-w-3xl
mx-auto
text-lg
leading-8
text-slate-600
"
        >
          Discover India's top universities, explore thousands of
          career-focused programs, compare courses, apply for
          scholarships and receive one-to-one expert counselling—
          all from one trusted platform.
        </p>

        {/* Buttons */}

        <div
          className="
mt-10
flex
flex-col
sm:flex-row
justify-center
gap-5
"
        >
          {/* Primary */}

          <Link
            to="/universities"
            className="
group
inline-flex
items-center
justify-center
gap-3
rounded-full
bg-gradient-to-r
from-blue-600
to-cyan-500
px-8
py-4
font-semibold
text-white
shadow-[0_15px_35px_rgba(14,165,233,.35)]
transition-all
duration-300
hover:scale-105
"
          >
            Explore Universities

            <ArrowRight
              size={20}
              className="
transition-transform
duration-300
group-hover:translate-x-1
"
            />
          </Link>

          {/* Secondary */}

          <Link
            to="/contact"
            className="
group
inline-flex
items-center
justify-center
gap-3
rounded-full
border
border-sky-200
bg-white
px-8
py-4
font-semibold
text-slate-700
shadow-md
transition-all
duration-300
hover:border-cyan-400
hover:text-cyan-600
hover:shadow-xl
"
          >
            <MessageCircle size={20} />

            Talk to Counsellor
          </Link>
        </div>

        {/* Bottom Text */}

        <p
          className="
mt-8
text-sm
text-slate-500
"
        >
          🎓 Trusted by students across India • Expert Guidance •
          Scholarship Support • 100% Transparent Admission Process
        </p>
      </div>
    </motion.div>
  );
}