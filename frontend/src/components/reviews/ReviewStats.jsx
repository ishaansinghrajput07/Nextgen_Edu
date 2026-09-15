import {
  Star,
  Users,
  GraduationCap,
  ShieldCheck,
  
} from "lucide-react";
import { motion } from "framer-motion";
const stats = [
  {
    icon: Star,
    title: "4.9/5",
    subtitle: "Average Student Rating",
    stars: true,
  },
  {
    icon: Users,
    title: "15,000+",
    subtitle: "Happy Students",
  },
  {
    icon: GraduationCap,
    title: "250+",
    subtitle: "Top Universities",
  },
  {
    icon: ShieldCheck,
    title: "98%",
    subtitle: "Admission Success Rate",
  },
];

export default function ReviewStats() {
  return (
    <section className="mt-10 bg-white">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

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
                relative
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                transition-all
                duration-300
                hover:border-teal-200
                hover:shadow-[0_16px_40px_rgba(15,23,42,0.09)]
              "
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
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
                    className={
                      item.stars
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-teal-700"
                    }
                  />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3 className="text-[28px] font-black leading-tight tracking-tight text-slate-950">
                    {item.title}
                  </h3>

                  {item.stars && (
                    <div className="mt-1 flex gap-0.5 text-[13px] text-yellow-400">
                      ★★★★★
                    </div>
                  )}

                  <p className="mt-1.5 text-[13px] font-semibold leading-5 text-slate-500">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-4 h-px w-8 bg-teal-200 transition-all duration-300 group-hover:w-12 group-hover:bg-teal-700" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}