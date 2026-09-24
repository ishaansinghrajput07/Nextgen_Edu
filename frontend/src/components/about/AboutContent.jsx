import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  BadgeCheck,
  Sparkles,
  GraduationCap,
  Building2,
  Users,
  Award,
} from "lucide-react";

const features = [
  "Expert Career Counselling",
  "250+ UGC Approved Universities",
  "Scholarship Assistance",
  "100% Admission Support",
];

const stats = [
  {
    icon: Building2,
    value: "250+",
    label: "Partner Universities",
  },
  {
    icon: Users,
    value: "15K+",
    label: "Students Guided",
  },
  {
    icon: Award,
    value: "98%",
    label: "Success Rate",
  },
];

export default function AboutContent() {
  return (
    <div className="relative max-w-2xl">

      {/* Badge */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .6 }}
        className="
          inline-flex
          items-center
          gap-3
          rounded-full
          border
          border-cyan-200
          bg-white
          px-6
          py-3
          shadow-lg
        "
      >
        <BadgeCheck
          size={20}
          className="text-cyan-600"
        />

        <span className="font-semibold text-slate-700">
          About NextGenEdu
        </span>
      </motion.div>

      {/* Heading */}

      <motion.h1
        initial={{
          opacity: 0,
          y: 35,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: .2,
          duration: .8,
        }}
       className="
mt-3
text-3xl
md:text-4xl
xl:text-5xl
font-extrabold
leading-tight
text-slate-900
"
      >
        Empowering Students For A

       

        <span
          className="
            bg-gradient-to-r
            from-blue-700
            via-cyan-600
            to-sky-500
            bg-clip-text
            text-transparent
          "
        >
          Brighter Future
        </span>
      </motion.h1>

      {/* Line */}

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 170 }}
        transition={{
          delay: .5,
        }}
        className="
          mt-5
          h-1
          rounded-full
          bg-gradient-to-r
          from-blue-600
          to-cyan-400
        "
      />

      {/* Description */}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: .45,
        }}
        className="
mt-3
text-[15px]
leading-6
text-slate-600
max-w-lg
"
      >
       At <strong>NextGenEdu</strong>, we help students choose the right university,
course and career path through expert counselling, admission guidance and
scholarship support across India.
      </motion.p>

      {/* Feature List */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: .6,
        }}
       className="
mt-4
grid
grid-cols-2
gap-2
"
      >
        {features.map((item) => (

          <div
            key={item}
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                w-8
                h-8
                rounded-xl
                bg-cyan-100
                flex
                items-center
                justify-center
              "
            >
              <Sparkles
                size={16}
                className="text-cyan-600"
              />
            </div>

            <span className="font-medium text-slate-700">
              {item}
            </span>

          </div>

        ))}
      </motion.div>

      Stats

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: .75,
        }}
        className="
          mt-6
          flex
          flex-wrap
          gap-6
        "
      >
        {stats.map((item) => {

          const Icon = item.icon;

          return (

            <div key={item.label}>

              <div className="flex items-center gap-2">

                <Icon
                  size={20}
                  className="text-cyan-600"
                />

                <h3 className="text-3xl font-bold text-slate-900">
                  {item.value}
                </h3>

              </div>

              <p className="mt-1 text-sm text-slate-500">
                {item.label}
              </p>

            </div>

          );

        })}
      </motion.div>

      {/* Buttons */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: .9,
        }}
        className="
          mt-6
          flex
          flex-wrap
          gap-4
        "
      >

        <Link
          to="/contact"
          className="
            group
            inline-flex
            items-center
            gap-3
            rounded-3xl
            bg-cyan-600
            px-8 py-4
            font-semibold
            text-white
            shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-cyan-700
          "
        >
          Get Free Counselling

          <ArrowRight
            size={20}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />

        </Link>

        <Link
          to="/universities"
          className="
            inline-flex
            items-center
            gap-3
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-8
            py-4
            font-semibold
            text-slate-700
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          <GraduationCap size={20} />

          Explore Universities

        </Link>

      </motion.div>

    </div>
  );
}