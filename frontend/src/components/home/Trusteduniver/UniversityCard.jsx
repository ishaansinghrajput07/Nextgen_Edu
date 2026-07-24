import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function UniversityCard({
  university,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{
        duration: 0.3,
      }}
      className="flex-shrink-0"
    >
      <Link
        to={`/universities/${university.slug}`}
        className="
group
relative
block
w-[220px]
h-[125px]
rounded-3xl
border
border-slate-200
bg-white
shadow-[0_10px_35px_rgba(15,23,42,.08)]
hover:shadow-[0_20px_45px_rgba(15,23,42,.12)]
overflow-hidden
transition-all
duration-300
"
      >
        {/* Top Gradient */}

        <div
          className="
absolute
top-0
left-0
h-1
w-full
origin-left
scale-x-0
bg-gradient-to-r
from-cyan-500
via-blue-600
to-cyan-400
transition-transform
duration-500
group-hover:scale-x-100
"
        />

        {/* Hover Icon */}

        <div
          className="
absolute
right-3
top-3
flex
h-8
w-8
items-center
justify-center
rounded-full
bg-cyan-50
text-cyan-600
opacity-0
transition-all
duration-300
group-hover:opacity-100
group-hover:rotate-45
"
        >
          <ArrowUpRight size={18} />
        </div>

        {/* Logo */}

        <div
          className="
flex
h-[75px]
items-center
justify-center
px-6
pt-4
"
        >
          <img
            src={university.universityLogo}
            alt={university.universityName}
            className="
max-h-[55px]
max-w-[140px]
object-contain
transition-all
duration-300
group-hover:scale-110
"
          />
        </div>

        {/* Bottom */}

        <div
          className="
absolute
bottom-0
left-0
w-full
border-t
border-slate-100
bg-slate-50
px-3
py-2
"
        >
          <h3
            className="
truncate
text-center
text-[13px]
font-semibold
text-slate-700
transition-colors
duration-300
group-hover:text-cyan-600
"
          >
            {university.universityName}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}