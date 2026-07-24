import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  UserCheck,
  LibraryBig,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "College Guidance",
    desc: "Find the best universities based on your interests and career goals.",
    benefits: [
      "250+ Universities",
      "Personal Guidance",
      "Admission Support",
    ],
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: BookOpen,
    title: "Course Selection",
    desc: "Choose the right course with expert recommendations and career planning.",
    benefits: [
      "Career Matching",
      "Top Courses",
      "Future Planning",
    ],
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: UserCheck,
    title: "Expert Mentorship",
    desc: "Talk directly with experienced counsellors before making decisions.",
    benefits: [
      "1-on-1 Mentors",
      "Career Advice",
      "Free Counselling",
    ],
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: LibraryBig,
    title: "Learning Resources",
    desc: "Access study materials, notes, guides and preparation resources.",
    benefits: [
      "Study Material",
      "Career Guides",
      "Latest Updates",
    ],
    color: "from-emerald-500 to-green-500",
  },
];

const stats = [
  { number: "250+", label: "Universities" },
  { number: "15K+", label: "Students Guided" },
  { number: "98%", label: "Success Rate" },
  { number: "Free", label: "Counselling" },
];

export default function WhatWeOffer() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-[#f8fcff] via-[#eef7ff] to-[#f8fcff]">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-cyan-200/30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex px-5 py-2 rounded-full bg-cyan-100 text-cyan-700 font-semibold text-sm mb-5">
            What We Offer
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Everything You Need For
            <span className="block text-cyan-600">
              Successful Admission
            </span>
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-slate-600">
            From selecting the right university to receiving your admission
            confirmation, we provide complete guidance under one roof.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * .1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white/70 backdrop-blur-xl border border-cyan-100 p-6 text-center shadow-lg"
            >
              <h3 className="text-3xl font-bold text-cyan-600">
                {item.number}
              </h3>

              <p className="mt-2 text-slate-600 font-medium">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
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
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  bg-white/75
                  backdrop-blur-xl
                  border
                  border-cyan-100
                  shadow-lg
                  hover:shadow-cyan-200/50
                  transition-all
                  duration-300
                  p-7
                "
              >
                {/* Hover Gradient */}
                <div
                  className={`
                    absolute
                    inset-x-0
                    top-0
                    h-1
                    bg-gradient-to-r
                    ${item.color}
                  `}
                />

                {/* Icon */}
                <div
                  className={`
                    w-16
                    h-16
                    rounded-2xl
                    bg-gradient-to-r
                    ${item.color}
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
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-6 mb-5">
                  {item.desc}
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {item.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500 flex-shrink-0"
                      />

                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Learn More */}
                <button
                  className="
                    flex
                    items-center
                    gap-2
                    font-semibold
                    text-cyan-600
                    group-hover:gap-4
                    transition-all
                    duration-300
                  "
                >
                  Learn More

                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                {/* Glow */}
                <div
                  className="
                    absolute
                    -bottom-16
                    -right-16
                    w-40
                    h-40
                    rounded-full
                    bg-cyan-100/30
                    blur-3xl
                    opacity-0
                    group-hover:opacity-100
                    transition
                    duration-500
                  "
                />
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="
            mt-20
            rounded-[32px]
            bg-gradient-to-r
            from-cyan-600
            via-sky-600
            to-blue-700
            p-10
            text-center
            text-white
            shadow-2xl
          "
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to Start Your Admission Journey?
          </h3>

          <p className="max-w-2xl mx-auto text-cyan-100 mb-8">
            Our admission experts are here to help you choose the right
            university, complete your application, and achieve your career
            goals with confidence.
          </p>

          <button
            className="
              bg-white
              text-cyan-700
              font-semibold
              px-8
              py-4
              rounded-full
              shadow-lg
              hover:scale-105
              transition-all
              duration-300
            "
          >
            Get Free Counselling
          </button>
        </motion.div>

      </div>
    </section>
  );
}
       