import { motion } from "framer-motion";
import {
  GraduationCap,
  MessageCircle,
  FileText,
  BadgeCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: GraduationCap,
    title: "Choose University",
    desc: "Explore and compare top universities that match your career goals.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Free Counselling",
    desc: "Connect with expert counsellors for personalized admission guidance.",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    number: "03",
    icon: FileText,
    title: "Submit Application",
    desc: "Fill out your application and upload all required documents easily.",
    color: "from-orange-500 to-amber-500",
  },
  {
    number: "04",
    icon: BadgeCheck,
    title: "Admission Confirmed",
    desc: "Receive your confirmation and begin your academic journey confidently.",
    color: "from-emerald-500 to-green-500",
  },
];

export default function ProcessSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        py-24
        bg-gradient-to-b
        from-[#f8fcff]
        via-[#eef7ff]
        to-[#f8fcff]
      "
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-20 w-80 h-80 bg-cyan-200/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 blur-3xl rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center mb-12"
        >

          <span
            className="
            inline-flex
            items-center
            px-5
            py-2
            rounded-full
            bg-cyan-100
            text-cyan-700
            font-semibold
            text-sm
            mb-5
            "
          >
            Admission Process
          </span>

          <h2
            className="
            text-4xl
            md:text-5xl
            font-extrabold
            text-slate-900
            "
          >
            Your Admission Journey
          </h2>

          <p
            className="
            mt-5
            text-lg
            text-slate-600
            max-w-2xl
            mx-auto
            "
          >
            Complete your admission in just four simple steps with expert
            guidance from our experienced counselling team.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Timeline Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="
                  relative
                  z-10
                  rounded-3xl
                  bg-white/80
                  backdrop-blur-xl
                  border
                  border-white/60
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-300
                  p-8
                  text-center
                  group
                "
              >
                {/* Step Number */}
                <span
                  className="
                    absolute
                    top-5
                    right-5
                    text-xs
                    font-bold
                    text-slate-300
                    tracking-widest
                  "
                >
                  STEP {step.number}
                </span>

                {/* Icon */}
                <div
                  className={`
                    w-16
                    h-16
                    mx-auto
                    rounded-2xl
                    bg-gradient-to-r
                    ${step.color}
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    mb-6
                    transition-transform
                    duration-300
                    group-hover:rotate-6
                    group-hover:scale-110
                  `}
                >
                 <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-6">
                  {step.desc}
                </p>

                {/* Bottom Line */}
                <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-24 transition-all duration-300"></div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <button
            className="
              px-10
              py-4
              rounded-full
              bg-gradient-to-r
              from-cyan-600
              to-blue-600
              text-white
              font-semibold
              shadow-xl
              hover:scale-105
              hover:shadow-cyan-300/40
              transition-all
              duration-300
            "
          >
            Start Your Admission Journey →
          </button>
        </motion.div>

      </div>
    </section>
  );
}
      