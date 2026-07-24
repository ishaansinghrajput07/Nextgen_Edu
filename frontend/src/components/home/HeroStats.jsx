import { motion } from "framer-motion";
import {
  GraduationCap,
  Building2,
  Award,
  Users,
} from "lucide-react";

const stats = [
  {
    icon: GraduationCap,
    title: "Course Selection",
    description:
      "Choose the right course as per your interest and career goals.",
    color: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Building2,
    title: "University Admission",
    description:
      "Get admission in top universities across India and abroad.",
    color: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Award,
    title: "Scholarship Assistance",
    description:
      "Find and apply for the best scholarships to support your education.",
    color: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: Users,
    title: "Documentation Support",
    description:
      "Complete guidance for documentation and application process.",
    color: "bg-violet-100",
    iconColor: "text-violet-600",
  },
];

export default function HeroStats() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mt-20 mb-12"
    >
     <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">

        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              transition={{ duration: 0.3 }}
              className="
                bg-white
                rounded-[28px]
                border
                border-slate-100
                shadow-[0_10px_35px_rgba(15,23,42,.08)]
                hover:shadow-[0_20px_45px_rgba(15,23,42,.12)]
                px-5 py-4
                h-[135px]
                flex
                items-start
                gap-5
                transition-all
                duration-300
              "
            >
              {/* Icon */}
              <div
                className={`
                  w-12
h-12
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                  ${item.color}
                `}
              >
                <Icon
                  size={24}
                  className={item.iconColor}
                />
              </div>

              {/* Content */}
             <div className="flex-1 min-w-0">

                <h3
  className="
    text-[17px]
    font-bold
    text-slate-900
    whitespace-nowrap
    leading-tight
  "
>
  {item.title}
</h3>

<p
  className="
    mt-2
    text-[14px]
    leading-5
    text-slate-500
  "
>
  {item.description}
</p>

              </div>
            </motion.div>
          );
        })}

      </div>
    </motion.section>
  );
}