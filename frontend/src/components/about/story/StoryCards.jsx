import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  Handshake,
  Globe2,
} from "lucide-react";

const cards = [
  {
    icon: Users,
    title: "Expert Counsellors",
    description:
      "Experienced counsellors who understand your goals and guide you at every step.",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Transparent",
    description:
      "We believe in honest guidance, transparent processes and student success.",
    color: "text-cyan-600",
    bg: "bg-cyan-100",
  },
  {
    icon: Handshake,
    title: "End-to-End Support",
    description:
      "From course selection to admission and documentation, we support you fully.",
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    icon: Globe2,
    title: "Wide University Network",
    description:
      "Strong connections with top universities across India and around the world.",
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
];

export default function StoryCards() {
  return (
    <section className="mt-14">

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card, index) => {

          const Icon = card.icon;

          return (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: .55,
                delay: index * .12,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                group
                bg-white
                rounded-3xl
                border
                border-slate-100
                shadow-[0_15px_40px_rgba(15,23,42,.07)]
                hover:shadow-[0_20px_50px_rgba(6,182,212,.16)]
                transition-all
                duration-500
                p-7
                h-full
              "
            >

              {/* Icon */}

              <div
                className={`
                  w-16
                  h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  ${card.bg}
                `}
              >

                <Icon
                  size={30}
                  className={`
                    ${card.color}
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:rotate-6
                  `}
                />

              </div>

              {/* Title */}

              <h3
                className="
                  mt-6
                  text-xl
                  font-bold
                  text-slate-900
                "
              >
                {card.title}
              </h3>

              {/* Description */}

              <p
                className="
                  mt-3
                  text-[15px]
                  leading-7
                  text-slate-600
                "
              >
                {card.description}
              </p>

            </motion.div>

          );

        })}

      </div>

    </section>
  );
}