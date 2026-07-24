import { motion } from "framer-motion";
import {
  Building2,
  Users,
  BadgeCheck,
  Headphones,
} from "lucide-react";

const cards = [
  {
    icon: Building2,
    title: "250+",
    subtitle: "Partner Universities",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Users,
    title: "15,000+",
    subtitle: "Students Guided",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: BadgeCheck,
    title: "98%",
    subtitle: "Admission Success",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    icon: Headphones,
    title: "Free",
    subtitle: "Counselling Support",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
];

export default function HeroRightCards() {
  return (
    <div
      className="
        hidden
        xl:flex
        flex-col
        gap-5
        absolute
        top-20
        -right-8
        z-30
      "
    >
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
            }}
            whileHover={{
              x: -8,
              scale: 1.03,
            }}
            className="
              w-[250px]
              bg-[#E3F9FE]
              backdrop-blur-xl
              rounded-3xl
              border
              border-[#E3F9FE]
              shadow-[0_15px_40px_rgba(15,23,42,.08)]
              px-5
              py-5
              flex
              items-center
              gap-4
              cursor-pointer
              transition-all
              duration-300
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
                ${card.iconBg}
              `}
            >
              <Icon
                size={26}
                className={card.iconColor}
              />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                {card.title}
              </h3>

              <p className="mt-1 text-[15px] text-slate-500">
                {card.subtitle}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}