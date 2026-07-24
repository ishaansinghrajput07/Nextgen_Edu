import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  Building2,
  Award,
} from "lucide-react";

const stats = [
  {
    icon: CalendarDays,
    value: "5+",
    label: "Years of Excellence",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: Users,
    value: "15K+",
    label: "Students Guided",
    color: "text-cyan-600",
    bg: "bg-cyan-100",
  },
  {
    icon: Building2,
    value: "250+",
    label: "Partner Universities",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    icon: Award,
    value: "98%",
    label: "Admission Success",
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
];

export default function StoryStats() {
  return (
    <section className="mt-16">

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
          duration: .7,
        }}
        className="
          relative
          overflow-hidden
          rounded-[32px]
          bg-gradient-to-r
          from-sky-50
          via-white
          to-cyan-50
          border
          border-cyan-100
          shadow-[0_20px_60px_rgba(6,182,212,.10)]
          px-8
          py-8
        "
      >

        {/* Blur */}

        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-cyan-200/30 blur-[90px]" />

        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-sky-200/30 blur-[90px]" />

        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={index}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                }}
                transition={{
                  duration: .3,
                }}
                className="
                  bg-white/80
                  backdrop-blur-xl
                  rounded-2xl
                  border
                  border-white
                  shadow-lg
                  px-5
                  py-5
                  flex
                  items-center
                  gap-4
                "
              >

                {/* Icon */}

                <div
                  className={`
                    w-14
                    h-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    ${item.bg}
                  `}
                >

                  <Icon
                    size={28}
                    className={item.color}
                  />

                </div>

                {/* Text */}

                <div>

                  <h3 className="text-3xl font-bold text-slate-900">
                    {item.value}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {item.label}
                  </p>

                </div>

              </motion.div>

            );

          })}

        </div>

      </motion.div>

    </section>
  );
}