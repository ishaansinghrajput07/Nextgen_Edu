import { motion } from "framer-motion";
import {
  Star,
  GraduationCap,
  Award,
} from "lucide-react";

const badges = [
  {
    id: 1,
    icon: Star,
    value: "4.9/5",
    label: "Student Rating",
    position:
      "top-8 left-8 lg:left-16",
  },

  {
    id: 2,
    icon: GraduationCap,
    value: "25K+",
    label: "Admissions",
    position:
      "-top-6 right-10 lg:right-20",
  },

  {
    id: 3,
    icon: Award,
    value: "150+",
    label: "Partner Universities",
    position:
      "bottom-8 right-8 lg:right-16",
  },
];

export default function FloatingBadges() {
  return (
    <>
      {badges.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`
absolute
${item.position}
hidden
lg:flex
items-center
gap-3
rounded-2xl
border
border-white/70
bg-white/90
backdrop-blur-xl
px-5
py-4
shadow-[0_15px_40px_rgba(15,23,42,.08)]
z-20
`}
          >
            <div
              className="
flex
items-center
justify-center
w-12
h-12
rounded-full
bg-gradient-to-br
from-blue-600
to-cyan-500
text-white
"
            >
              <Icon size={22} />
            </div>

            <div>
              <h4
                className="
text-xl
font-black
text-slate-900
"
              >
                {item.value}
              </h4>

              <p
                className="
text-sm
text-slate-500
"
              >
                {item.label}
              </p>
            </div>
          </motion.div>
        );
      })}
    </>
  );
}