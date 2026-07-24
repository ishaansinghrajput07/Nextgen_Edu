import { motion } from "framer-motion";
import CountUp from "./CountUp";

export default function StatsCard({
  icon: Icon,
  number,
  label,
  description,
  iconBg,
  iconColor,
  lineColor,
  isPercentage = false,
  delay = 0,
}) {
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
        duration: 0.5,
        delay,
      }}
      whileHover={{
        y: -6,
      }}
      className="
group
relative
overflow-hidden
rounded-2xl
border
border-slate-200
bg-white/90
backdrop-blur-xl
shadow-md
hover:shadow-xl
transition-all
duration-300
p-4
"
    >
      {/* Top Accent */}

      <div
        className={`
absolute
top-0
left-0
w-full
h-[3px]
${lineColor}
scale-x-0
origin-left
group-hover:scale-x-100
transition-transform
duration-500
`}
      />

      {/* Content */}

      <div className="flex items-center gap-4">
        {/* Icon */}

        <div
          className={`
w-14
h-14
rounded-xl
flex
items-center
justify-center
shadow-sm
flex-shrink-0
${iconBg}
`}
        >
          <Icon
            size={28}
            className={iconColor}
            strokeWidth={2.2}
          />
        </div>

        {/* Right Side */}

        <div className="flex-1 min-w-0">
          <h3
            className="
text-3xl
font-black
leading-none
text-slate-900
"
          >
            <CountUp end={number} />

            {isPercentage ? "%" : "+"}
          </h3>

          <h4
            className="
mt-1
text-[17px]
font-bold
text-slate-800
truncate
"
          >
            {label}
          </h4>

          <p
            className="
mt-1
text-[13px]
leading-5
text-slate-500
line-clamp-2
"
          >
            {description}
          </p>
        </div>
      </div>

      {/* Bottom */}

      <div className="mt-4 flex items-center justify-between">
        <div
          className={`
w-12
h-[3px]
rounded-full
${lineColor}
`}
        />

        <div
          className="
text-slate-300
group-hover:text-cyan-500
transition
duration-300
"
        >
          →
        </div>
      </div>
    </motion.div>
  );
}