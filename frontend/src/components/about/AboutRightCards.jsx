import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Award,
  Clock3,
} from "lucide-react";

const cards = [
  {
    icon: Building2,
    title: "250+",
    subtitle: "Partner Universities",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: Users,
    title: "15K+",
    subtitle: "Students Guided",
    color: "text-cyan-600",
    bg: "bg-cyan-100",
  },
  {
    icon: Award,
    title: "98%",
    subtitle: "Admission Success",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    icon: Clock3,
    title: "5+",
    subtitle: "Years Experience",
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
];

export default function AboutRightCards() {
  return (
    <section className="mt-14">

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card, index) => {

          const Icon = card.icon;

          return (

            <motion.div
              key={index}
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
                delay: index * 0.15,
              }}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              className="
                group
                bg-white
                rounded-3xl
                border
                border-slate-100
                shadow-[0_10px_30px_rgba(15,23,42,.08)]
                hover:border-cyan-200
                hover:shadow-[0_18px_40px_rgba(6,182,212,.15)]
                transition-all
                duration-300
                px-5
                py-5
              "
            >

              <div className="flex items-center gap-4">

                {/* Icon */}

                <div
                  className={`
                    w-14
                    h-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                    ${card.bg}
                  `}
                >
                  <Icon
                    size={26}
                    className={`
                      ${card.color}
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:rotate-6
                    `}
                  />
                </div>

                {/* Content */}

                <div className="flex-1 min-w-0">

                  <h3 className="text-2xl font-bold text-slate-900">
                    {card.title}
                  </h3>

                  <p className="mt-1 text-[14px] leading-5 text-slate-500">
                    {card.subtitle}
                  </p>

                </div>

              </div>

            </motion.div>

          );

        })}

      </div>

    </section>
  );
}