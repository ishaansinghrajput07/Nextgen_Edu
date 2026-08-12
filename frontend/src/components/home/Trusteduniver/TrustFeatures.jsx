import { motion } from "framer-motion";
import {
  BadgeCheck,
  GraduationCap,
  Landmark,
  Award,
  Wallet,
  Briefcase,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: Landmark,
    title: "AICTE Approved Universities",
  },

  {
    id: 2,
    icon: Award,
    title: "NAAC Accredited Institutions",
  },

  {
    id: 3,
    icon: GraduationCap,
    title: "UGC Recognized Programs",
  },

  {
    id: 4,
    icon: Wallet,
    title: "Scholarship Assistance",
  },

  {
    id: 5,
    icon: BadgeCheck,
    title: "Admission Guidance",
  },

  {
    id: 6,
    icon: Briefcase,
    title: "Career Counselling",
  },

  {
    id: 7,
    icon: ShieldCheck,
    title: "100% Transparent Process",
  },

  {
    id: 8,
    icon: Sparkles,
    title: "End-to-End Support",
  },
];

export default function TrustFeatures() {
  return (
    <div className="mt-20">
      {/* Heading */}

      <motion.div
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
          duration: 0.6,
        }}
        className="text-center"
      >
        <h3
          className="
text-3xl
md:text-4xl
font-black
tracking-tight
text-slate-900
"
        >
          Why Students Trust NextGen
        </h3>

        <p
          className="
mt-4
max-w-3xl
mx-auto
text-slate-600
leading-8
"
        >
          We simplify the admission journey through trusted university
          partnerships, transparent counselling and personalized career
          guidance for every student.
        </p>
      </motion.div>

      {/* Feature Pills */}

      <div
        className="
mt-12
flex
flex-wrap
justify-center
gap-5
"
      >
        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
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
                duration: 0.45,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -5,
                scale: 1.03,
              }}
              className="
group
relative
overflow-hidden
rounded-full
border
border-sky-100
bg-white
px-6
py-4
shadow-[0_10px_30px_rgba(15,23,42,.06)]
hover:shadow-[0_18px_40px_rgba(14,165,233,.15)]
transition-all
duration-300
"
            >
              {/* Hover Glow */}

              <div
                className="
absolute
inset-0
opacity-0
group-hover:opacity-100
transition-all
duration-300
bg-gradient-to-r
from-sky-50
via-white
to-cyan-50
"
              />

              <div className="relative flex items-center gap-3">
                <div
                  className="
flex
items-center
justify-center
w-11
h-11
rounded-full
bg-gradient-to-br
from-blue-600
to-cyan-500
text-white
shadow-lg
"
                >
                  <Icon size={20} />
                </div>

                <span
                  className="
font-semibold
text-slate-700
group-hover:text-sky-700
transition-colors
duration-300
"
                >
                  {item.title}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}