import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  GraduationCap,
  Building2,
  Award,
  Sparkles,
  CheckCircle2,
  Target,
  BookOpen,
  ShieldCheck,
  BriefcaseBusiness,
  Globe2,
  Users,
} from "lucide-react";

import student3 from "../../assets/hero/student3.png";

const features = [
  {
    text: "UG, PG & PhD Programs",
    icon: GraduationCap,
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    text: "Online & Distance Education",
    icon: Globe2,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    text: "Admission Guidance",
    icon: Building2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    text: "Scholarship & Course Support",
    icon: Award,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    text: "Student-Focused Guidance",
    icon: Users,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    text: "Professional Standards",
    icon: ShieldCheck,
    color: "text-teal-700",
    bg: "bg-teal-50",
  },
];

export default function AboutContent() {
  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        bg-white
        py-[30px]
      "
    >
      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative w-full px-[30px]">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
          className="w-full text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-slate-900" />

            <p
              className="
                text-[14px]
                font-[900]
                uppercase
                tracking-[0.18em]
                text-[#1a4d40]
              "
            >
              About NextGen Education Institute
            </p>

            <span className="h-px w-10 bg-slate-900" />
          </div>

          <h2
            className="
              text-[38px]
              font-[900]
              leading-[1.1]
              tracking-[-0.025em]
              text-slate-950
              sm:text-[46px]
              lg:text-[52px]
            "
          >
            Empowering Aspirations.
            <span
              className="
                block
                font-[900]
                text-[#131371]
              "
            >
              Guiding Futures.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-[15px]
              font-semibold
              leading-7
              text-slate-500
              sm:text-[16px]
            "
          >
            We help students and working professionals make informed
            educational decisions through reliable information, expert
            guidance and dedicated admission support.
          </p>
        </motion.div>

        {/* =====================================================
            MAIN CONTENT
            LEFT  = CONTENT
            RIGHT = IMAGE
        ====================================================== */}

        <div
          className="
            mt-10
            grid
            w-full
            items-center
            gap-10
            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-14
          "
        >

          {/* ===================================================
              LEFT — CONTENT
          =================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -45,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
            className="w-full min-w-0"
          >
            {/* LABEL */}

            <div className="mb-5 flex items-center gap-3">
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-50
                "
              >
                <Users className="h-4 w-4 text-slate-500" />
              </div>

              <p
                className="
                  text-[10px]
                  font-[900]
                  uppercase
                  tracking-[0.2em]
                text-[#1a4d40]
                "
              >
                More Than A Counsellor
              </p>
            </div>

            {/* HEADING */}

            <h3
              className="
                w-full
                text-[32px]
                font-[900]
                leading-[1.1]
                tracking-[-0.025em]
                text-slate-950
                sm:text-[40px]
                lg:text-[45px]
              "
            >
              Empowering aspirations,{" "}
              <span
                className="
                  font-[900]
                  text-[#131371]
                "
              >
                guiding futures.
              </span>
            </h3>

            {/* DESCRIPTION */}

            <p
              className="
                mt-5
                w-full
                text-[15px]
                font-semibold
                leading-7
                text-slate-500
              "
            >
              At{" "}
              <strong className="text-slate-900">
                NextGen Education Institute
              </strong>
              , we believe that choosing the right education is not just a
              decision — it is the foundation of a successful future.
            </p>

            <p
              className="
                mt-4
                w-full
                text-[15px]
                font-semibold
                leading-7
                text-slate-500
              "
            >
              With{" "}
              <strong className="text-slate-900">
                5+ years of experience
              </strong>{" "}
              in the education sector, we help students and working
              professionals navigate higher education with the right
              information, guidance and support.
            </p>

            <p
              className="
                mt-4
                w-full
                text-[15px]
                font-semibold
                leading-7
                text-slate-500
              "
            >
              We provide admission guidance for{" "}
              <strong className="text-slate-900">
                UG, PG, PhD, Online and Distance Education
              </strong>{" "}
              programs offered by recognized universities and institutions
              across India.
            </p>

            {/* =================================================
                HIGHLIGHTS
            ================================================== */}

            <div
              className="
                mt-7
                grid
                gap-x-6
                gap-y-4
                sm:grid-cols-2
              "
            >
              {features.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.text}
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: 0.2 + index * 0.07,
                    }}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <div className="relative shrink-0">
                      <div
                        className={`
                          absolute
                          inset-0
                          rounded-xl
                          ${item.bg}
                          opacity-0
                          blur-md
                          transition-opacity
                          duration-300
                          group-hover:opacity-100
                        `}
                      />

                      <div
                        className={`
                          relative
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          ${item.bg}
                          transition-all
                          duration-300
                          group-hover:scale-110
                        `}
                      >
                        <Icon
                          className={`
                            h-[18px]
                            w-[18px]
                            ${item.color}
                            transition-transform
                            duration-300
                            group-hover:scale-110
                          `}
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>

                    <span
                      className="
                        text-[13px]
                        font-[800]
                        leading-5
                        text-slate-700
                        transition-colors
                        duration-300
                        group-hover:text-slate-950
                      "
                    >
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* =================================================
                VISION / MISSION
            ================================================== */}

            <div
              className="
                mt-8
                grid
                gap-4
                sm:grid-cols-2
              "
            >
              {/* Vision */}

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  shadow-[0_15px_40px_rgba(15,23,42,0.04)]
                "
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-sky-50
                    "
                  >
                    <Target className="h-[18px] w-[18px] text-sky-600" />
                  </div>

                  <p
                    className="
                      text-[12px]
                      font-[900]
                      uppercase
                      tracking-[0.15em]
                      text-slate-900
                    "
                  >
                    Our Vision
                  </p>
                </div>

                <p
                  className="
                    mt-3
                    text-[12px]
                    font-semibold
                    leading-5
                    text-slate-500
                  "
                >
                  To become a trusted and accessible education guidance
                  platform, connecting students with the right academic
                  opportunities and helping them move confidently toward their
                  career goals.
                </p>
              </div>

              {/* Mission */}

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  shadow-[0_15px_40px_rgba(15,23,42,0.04)]
                "
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-violet-50
                    "
                  >
                    <BookOpen
                      className="
                        h-[18px]
                        w-[18px]
                        text-violet-600
                      "
                    />
                  </div>

                  <p
                    className="
                      text-[12px]
                      font-[900]
                      uppercase
                      tracking-[0.15em]
                      text-slate-900
                    "
                  >
                    Our Mission
                  </p>
                </div>

                <p
                  className="
                    mt-3
                    text-[12px]
                    font-semibold
                    leading-5
                    text-slate-500
                  "
                >
                  To simplify higher education through transparent guidance,
                  reliable information and dedicated student support.
                </p>
              </div>
            </div>

            {/* =================================================
                ORGANIZATION INFO
            ================================================== */}

            <div
              className="
                mt-6
                flex
                flex-wrap
                items-center
                gap-x-6
                gap-y-3
                border-t
                border-slate-100
                pt-5
              "
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-teal-600" />

                <span
                  className="
                    text-[12px]
                    font-[800]
                    text-slate-700
                  "
                >
                  ISO-Certified Organization
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-500" />

                <span
                  className="
                    text-[12px]
                    font-[800]
                    text-slate-700
                  "
                >
                  5+ Years Experience
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-violet-600" />

                <span
                  className="
                    text-[12px]
                    font-[800]
                    text-slate-700
                  "
                >
                  Registered in 2024
                </span>
              </div>
            </div>

            {/* =================================================
                BUTTONS
            ================================================== */}

            <motion.div
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
                delay: 0.9,
              }}
              className="
                mt-7
                flex
                flex-wrap
                gap-4
              "
            >
              {/* PRIMARY */}

              <Link
                to="/contact"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-xl
                  bg-yellow-400
                  px-5
                  py-3
                  text-[13px]
                  font-[900]
                  text-black
                  shadow-[0_10px_25px_rgba(250,204,21,0.25)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-yellow-300
                  hover:shadow-[0_14px_30px_rgba(250,204,21,0.35)]
                "
              >
                Get Free Counselling

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-white
                    transition-all
                    duration-300
                    group-hover:rotate-45
                  "
                >
                  <ArrowRight size={16} />
                </span>
              </Link>

              {/* SECONDARY */}

              <Link
                to="/universities"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-xl
                  bg-yellow-400
                  px-5
                  py-3
                  text-[13px]
                  font-[900]
                  text-black
                  shadow-[0_10px_25px_rgba(250,204,21,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-yellow-300
                  hover:shadow-[0_14px_30px_rgba(250,204,21,0.30)]
                "
              >
                <GraduationCap
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />

                Explore Universities
              </Link>
            </motion.div>
          </motion.div>

          {/* ===================================================
              RIGHT — IMAGE
          =================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 45,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="relative w-full"
          >
            {/* IMAGE */}

            <div
              className="
                relative
                h-[420px]
                w-full
                overflow-hidden
                rounded-[2rem]
                border
                border-slate-200
                bg-slate-50
                shadow-[0_25px_70px_rgba(15,23,42,0.10)]
                sm:h-[500px]
                lg:h-[560px]
              "
            >
              <img
                src={student3} alt="Student"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />

              {/* Bottom Overlay */}

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-32
                  bg-gradient-to-t
                  from-slate-950/70
                  to-transparent
                "
              />

              {/* Image Label */}

              <div className="absolute bottom-6 left-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-400" />

                  <p
                    className="
                      text-[11px]
                      font-[900]
                      uppercase
                      tracking-[0.2em]
                      text-white
                    "
                  >
                    NextGen Education
                  </p>
                </div>

                <p
                  className="
                    mt-1
                    text-[12px]
                    font-semibold
                    text-white/70
                  "
                >
                  Guiding students toward brighter futures
                </p>
              </div>
            </div>

            {/* Student Focused Badge */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.5,
                duration: 0.6,
              }}
              animate={{
                y: [0, -7, 0],
              }}
              className="
                absolute
                -bottom-6
                -left-3
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-[0_20px_50px_rgba(15,23,42,0.14)]
                sm:-left-6
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-teal-50
                  "
                >
                  <CheckCircle2
                    className="
                      h-5
                      w-5
                      text-teal-700
                    "
                  />
                </div>

                <div>
                  <p
                    className="
                      text-[13px]
                      font-[900]
                      text-slate-950
                    "
                  >
                    Student Focused
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      font-semibold
                      text-slate-500
                    "
                  >
                    Guidance you can trust
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Top Badge */}

            <motion.div
              animate={{
                y: [0, 6, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -right-2
                -top-5
                hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                shadow-[0_20px_50px_rgba(15,23,42,0.1)]
                sm:block
              "
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-teal-600
                    shadow-[0_0_12px_rgba(13,148,136,0.8)]
                  "
                />

                <span
                  className="
                    text-[11px]
                    font-[800]
                    text-slate-700
                  "
                >
                  Guiding futures with confidence
                </span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}