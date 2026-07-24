import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const features = [
  "100% Free Career Counselling",
  "250+ UGC Approved Universities",
  "Scholarship Assistance",
  "Admission Support till Enrollment",
];

export default function HeroFeatures() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="
mt-6
grid
grid-cols-2
lg:grid-cols-4
gap-4
"
    >
      {features.map((item) => (
        <div
          key={item}
          className="
flex
items-center
justify-center
gap-3
rounded-2xl
bg-white
border
border-slate-200
px-5
py-4
shadow-md
hover:shadow-xl
transition-all
duration-300
"
        >
          <CheckCircle2
            size={20}
            className="text-cyan-600 shrink-0"
          />

          <span className="text-sm font-semibold text-slate-700 text-center">
            {item}
          </span>
        </div>
      ))}
    </motion.div>
  );
}