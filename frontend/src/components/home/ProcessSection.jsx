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
    iconBg: "bg-blue-50",
    iconBorder: "border-blue-100",
    iconColor: "text-blue-600",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Free Counselling",
    desc: "Connect with expert counsellors for personalized admission guidance.",
    iconBg: "bg-violet-50",
    iconBorder: "border-violet-100",
    iconColor: "text-violet-600",
  },
  {
    number: "03",
    icon: FileText,
    title: "Submit Application",
    desc: "Fill out your application and upload all required documents easily.",
    iconBg: "bg-orange-50",
    iconBorder: "border-orange-100",
    iconColor: "text-orange-600",
  },
  {
    number: "04",
    icon: BadgeCheck,
    title: "Admission Confirmed",
    desc: "Receive your confirmation and begin your academic journey confidently.",
    iconBg: "bg-emerald-50",
    iconBorder: "border-emerald-100",
    iconColor: "text-emerald-600",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-white px-[30px] py-[45px]">
      <div className="mx-auto max-w-[1500px]">

        {/* =========================
            Heading
        ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          {/* Eyebrow */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-slate-200" />

            <span className="text-[13px] font-black uppercase tracking-[0.18em] text-[#1a4d40]">
              Admission Process
            </span>

            <span className="h-px w-10 bg-slate-200" />
          </div>

          {/* Heading */}
          <h2 className="text-[38px] font-black leading-tight tracking-tight text-slate-950 md:text-[46px] lg:text-[52px]">
            Your Admission{" "}
            <span className="text-[#131371]">Journey</span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl text-[15px] font-semibold leading-7 text-slate-500 md:text-[16px]">
            Complete your admission in just four simple steps with expert
            guidance from our experienced counselling team.
          </p>
        </motion.div>

        {/* =========================
            Process Cards
        ========================= */}
        <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Desktop Timeline Line */}
          <div className="absolute left-[12%] right-[12%] top-[34px] hidden h-px bg-slate-200 lg:block" />

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
                whileHover={{ y: -6 }}
                className="
                  group
                  relative
                  z-10
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  text-center
                  shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                  transition-all
                  duration-300
                  hover:border-slate-300
                  hover:shadow-[0_16px_40px_rgba(15,23,42,0.09)]
                "
              >

                {/* Step Number */}
                <span
                  className="
                    absolute
                    right-5
                    top-5
                    text-[11px]
                    font-black
                    tracking-widest
                    text-slate-300
                  "
                >
                  STEP {step.number}
                </span>

                {/* =========================
                    Icon
                ========================= */}
                <div
                  className={`
                    mx-auto
                    mb-5
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    ${step.iconBg}
                    ${step.iconBorder}
                    transition-all
                    duration-300
                    group-hover:scale-105
                  `}
                >
                  <Icon
                    className={`
                      h-8
                      w-8
                      ${step.iconColor}
                    `}
                  />
                </div>

                {/* Title */}
                <h3
                  className="
                    mb-2
                    text-[18px]
                    font-black
                    leading-tight
                    tracking-tight
                    text-slate-950
                  "
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    text-[14px]
                    font-semibold
                    leading-6
                    text-slate-500
                  "
                >
                  {step.desc}
                </p>

                {/* Bottom Accent */}
                <div
                  className="
                    mx-auto
                    mt-4
                    h-1
                    w-8
                    rounded-full
                    bg-slate-200
                    transition-all
                    duration-300
                    group-hover:w-12
                    group-hover:bg-teal-700
                  "
                />
              </motion.div>
            );
          })}
        </div>

        {/* =========================
            CTA
        ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <button
            className="
              inline-flex
              items-center
              gap-3
              rounded-xl
              bg-yellow-400
              px-7
              py-3.5
              text-[14px]
              font-black
              text-black
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-yellow-300
              hover:shadow-md
            "
          >
            Start Your Admission Journey

            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-slate-950
                text-sm
                text-white
              "
            >
              →
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}