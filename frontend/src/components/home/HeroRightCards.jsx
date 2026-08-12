import { motion } from "framer-motion";
import { Building2, Users, BadgeCheck, Headphones } from "lucide-react";

const cards = [
  {
    icon: Building2,
    title: "250+",
    subtitle: "Universities",
    bg: "bg-blue-100",
    color: "text-blue-600",
  },

  {
    icon: Users,
    title: "15K+",
    subtitle: "Students",
    bg: "bg-purple-100",
    color: "text-purple-600",
  },

  {
    icon: BadgeCheck,
    title: "98%",
    subtitle: "Success",
    bg: "bg-cyan-100",
    color: "text-cyan-600",
  },

  {
    icon: Headphones,
    title: "24/7",
    subtitle: "Support",
    bg: "bg-green-100",
    color: "text-green-600",
  },
];

export default function HeroRightCards() {
  return (
    <div
      className="
hidden
2xl:flex
absolute
right-[-40px]
top-24
z-30
flex-col
gap-4
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
              delay: index * 0.12,
            }}
            whileHover={{
              x: -8,
              scale: 1.04,
            }}
            className="
w-[210px]
rounded-3xl
border
border-white/60
bg-white/80
backdrop-blur-xl
shadow-[0_15px_40px_rgba(15,23,42,.10)]
px-4
py-4
flex
items-center
gap-4
transition-all
duration-300
"
          >
            <div
              className={`
h-12
w-12
rounded-2xl
flex
items-center
justify-center
${card.bg}
`}
            >
              <Icon size={24} className={card.color} />
            </div>

            <div>
              <h3
                className="
text-2xl
font-black
text-slate-900
"
              >
                {card.title}
              </h3>

              <p
                className="
text-xs
font-semibold
text-slate-500
"
              >
                {card.subtitle}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
