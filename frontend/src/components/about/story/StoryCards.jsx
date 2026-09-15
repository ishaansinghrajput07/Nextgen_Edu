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
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Transparent",
    description:
      "We believe in honest guidance, transparent processes and student success.",
  },
  {
    icon: Handshake,
    title: "End-to-End Support",
    description:
      "From course selection to admission and documentation, we support you fully.",
  },
  {
    icon: Globe2,
    title: "Wide University Network",
    description:
      "Strong connections with top universities across India and around the world.",
  },
];

export default function StoryCards() {
  return (
    <section className="bg-white py-[30px]">
      <div className="mx-auto w-full max-w-[1500px] px-[30px]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={index}
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
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -6,
                }}
                className="
                  group
                  h-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                  transition-all
                  duration-300
                  hover:border-teal-200
                  hover:shadow-[0_16px_40px_rgba(15,23,42,0.09)]
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-teal-100
                    bg-teal-50
                  "
                >
                  <Icon
                    size={27}
                    strokeWidth={2}
                    className="
                      text-teal-700
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />
                </div>

                {/* Title */}
                <h3
                  className="
                    mt-5
                    text-[18px]
                    font-black
                    leading-tight
                    tracking-tight
                    text-slate-950
                  "
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-3
                    text-[15px]
                    font-semibold
                    leading-7
                    text-slate-500
                  "
                >
                  {card.description}
                </p>

                {/* Small Accent */}
                <div
                  className="
                    mt-5
                    h-px
                    w-10
                    bg-teal-200
                    transition-all
                    duration-300
                    group-hover:w-16
                    group-hover:bg-teal-700
                  "
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}