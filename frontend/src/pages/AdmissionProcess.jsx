
import {
  GraduationCap,
  FileText,
  Send,
  CheckCircle,
  BookOpen,
  Mail,
  Users,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const programs = [
  {
    icon: GraduationCap,
    title: "Undergraduate Courses",
    description: "B.A, B.Com, BBA and other undergraduate programs.",
    color: "from-cyan-500 to-sky-500",
  },
  {
    icon: BookOpen,
    title: "Postgraduate Courses",
    description: "MBA, MCA, M.Com and other postgraduate programs.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: FileText,
    title: "Diploma Programs",
    description: "Career-focused diploma programs for skill development.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: AwardIcon,
    title: "Certification Courses",
    description: "Professional certification programs for career growth.",
    color: "from-orange-500 to-amber-500",
  },
];

const admissionSteps = [
  {
    number: "01",
    icon: Send,
    title: "Choose Your Program",
    description:
      "Visit our website and select the program that matches your academic interests and career goals.",
  },
  {
    number: "02",
    icon: Mail,
    title: "Get the Admission Form",
    description:
      "Obtain the admission form and submit it through the prescribed process or mentioned communication channel.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Submit Required Documents",
    description:
      "Attach required documents including mark sheets, academic records, birth proof, residence proof and certificates.",
  },
  {
    number: "04",
    icon: Users,
    title: "Complete Application Formalities",
    description:
      "Submit six passport-size photographs along with the demand draft for the first installment of fees, wherever applicable.",
  },
  {
    number: "05",
    icon: BookOpen,
    title: "Get Counselling Support",
    description:
      "For assistance, visit the university office and connect with an education counsellor for guidance.",
  },
];

function AwardIcon(props) {
  return <ShieldCheck {...props} />;
}

export default function AdmissionProcess() {
  const navigate = useNavigate();
  return (
    <>
      <style>{`
        @keyframes admissionGlow {
          0%, 100% {
            box-shadow:
              0 0 20px rgba(6, 182, 212, 0.08),
              0 0 50px rgba(59, 130, 246, 0.04);
          }

          50% {
            box-shadow:
              0 0 30px rgba(6, 182, 212, 0.14),
              0 0 70px rgba(168, 85, 247, 0.08);
          }
        }

        .admission-glow {
          animation: admissionGlow 4s ease-in-out infinite;
        }

        .admission-grid {
          background-image:
            linear-gradient(
              rgba(14, 165, 233, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(14, 165, 233, 0.035) 1px,
              transparent 1px
            );
          background-size: 42px 42px;
        }
      `}</style>

      <section className="relative overflow-hidden pt-28 pb-24">
        {/* Background Glow */}
        <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[130px]" />

        <div className="absolute top-[35%] -right-40 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[140px]" />

        <div className="admission-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">

          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="
              admission-glow
              relative
              overflow-hidden
              rounded-[38px]
              border border-slate-200/80
              bg-white/80
              px-6
              py-14
              text-center
              backdrop-blur-2xl
              md:px-14
              md:py-20
            "
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/80 via-white to-violet-50/70" />

            <div className="relative z-10">
              <div
                className="
                  mx-auto mb-6
                  inline-flex items-center gap-2
                  rounded-full
                  border border-cyan-200
                  bg-cyan-50
                  px-4 py-2
                  text-sm font-bold
                  text-cyan-700
                "
              >
                <Sparkles className="h-4 w-4" />
                Simple & Student-Friendly
              </div>

              <h1
                className="
                  text-4xl
                  font-black
                  tracking-tight
                  text-slate-900
                  md:text-6xl
                "
              >
                Admission Process
              </h1>

              <p
                className="
                  mx-auto
                  mt-6
                  max-w-3xl
                  text-base
                  leading-8
                  md:text-lg
                "
                style={{ color: "var(--text-secondary)" }}
              >
                We offer admissions to a wide range of undergraduate,
                postgraduate, diploma, and certification programs designed
                to help students build strong careers.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  Guided Admission
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                  <ShieldCheck className="h-4 w-4 text-cyan-500" />
                  Counselling Support
                </span>
              </div>
            </div>
          </motion.div>

          {/* PROGRAMS */}
          <section className="mt-20">
            <div className="mb-10 text-center">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                Explore Programs
              </span>

              <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
                Choose the Right Program
              </h2>

              <p
                className="mx-auto mt-4 max-w-2xl text-base leading-7"
                style={{ color: "var(--text-secondary)" }}
              >
                Explore different academic and professional programs
                available through our education network.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {programs.map((program, index) => {
                const Icon = program.icon;

                return (
                  <motion.div
                    key={program.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    whileHover={{ y: -8 }}
                    className="
                      group
                      rounded-3xl
                      border border-slate-200
                      bg-white
                      p-7
                      shadow-sm
                      transition-shadow
                      hover:shadow-xl
                    "
                  >
                    <div
                      className={`
                        mb-6
                        flex h-14 w-14
                        items-center justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        ${program.color}
                        text-white
                        shadow-lg
                      `}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900">
                      {program.title}
                    </h3>

                    <p
                      className="mt-3 text-sm leading-6"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {program.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-sm font-bold text-cyan-600">
                      Explore opportunities
                      <ArrowRight
                        className="
                          h-4 w-4
                          transition-transform
                          group-hover:translate-x-1
                        "
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ADMISSION STEPS */}
          <section className="mt-24">
            <div className="mb-12 text-center">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                Step-by-Step
              </span>

              <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
                How the Admission Process Works
              </h2>

              <p
                className="mx-auto mt-4 max-w-2xl text-base leading-7"
                style={{ color: "var(--text-secondary)" }}
              >
                Follow these simple steps to move from program selection
                to admission with proper guidance at every stage.
              </p>
            </div>

            <div className="relative">
              {/* Desktop connector */}
              <div className="absolute left-[9%] right-[9%] top-12 hidden h-px bg-gradient-to-r from-cyan-200 via-violet-200 to-cyan-200 lg:block" />

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                {admissionSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                      }}
                      className="
                        relative
                        rounded-3xl
                        border border-slate-200
                        bg-white
                        p-6
                        text-center
                        shadow-sm
                        transition-all
                        duration-300
                        hover:-translate-y-2
                        hover:shadow-xl
                      "
                    >
                      <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
                        <Icon className="h-7 w-7" />
                      </div>

                      <div className="mt-5 text-xs font-black tracking-[0.2em] text-cyan-600">
                        STEP {step.number}
                      </div>

                      <h3 className="mt-3 text-lg font-extrabold text-slate-900">
                        {step.title}
                      </h3>

                      <p
                        className="mt-3 text-sm leading-6"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {step.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* DOCUMENTS */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              mt-24
              rounded-[34px]
              border border-slate-200
              bg-white
              p-8
              shadow-sm
              md:p-12
            "
          >
            <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                  <FileText className="h-7 w-7" />
                </div>

                <h2 className="text-3xl font-black text-slate-900">
                  Keep Your Documents Ready
                </h2>

                <p
                  className="mt-4 leading-7"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Having your academic and supporting documents ready
                  can make the admission process smoother and faster.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Academic Mark Sheets",
                  "Academic Records",
                  "Birth Proof",
                  "Residence Proof",
                  "Required Certificates",
                  "Passport-size Photographs",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border border-slate-100
                      bg-slate-50
                      px-4 py-4
                    "
                  >
                    <CheckCircle className="h-5 w-5 shrink-0 text-emerald-500" />

                    <span className="text-sm font-semibold text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* COUNSELLING CTA */}
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              relative
              mt-20
              overflow-hidden
              rounded-[36px]
              bg-gradient-to-br
              from-sky-600
              via-cyan-600
              to-blue-700
              px-7 py-12
              text-white
              shadow-2xl
              md:px-14
              md:py-14
            "
          >
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-4 flex items-center gap-2 text-sm font-bold text-cyan-100">
                  <Users className="h-5 w-5" />
                  Need Guidance?
                </div>

                <h2 className="text-3xl font-black md:text-4xl">
                  Confused About Your Admission?
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-white/80">
                  Connect with an education counsellor and get personalized
                  guidance about programs, universities, eligibility and
                  the admission process.
                </p>
              </div>

             <button
  className="
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-2xl
    bg-white
    px-6 py-4
    font-extrabold
    text-sky-700
    shadow-lg
    transition
    hover:-translate-y-1
    hover:shadow-xl
  "
  onClick={() => navigate("/contact")}
>
  Talk to a Counsellor
  <ArrowRight className="h-5 w-5" />
</button>
            </div>
          </motion.section>

          {/* IMPORTANT NOTE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              mt-16
              rounded-3xl
              border border-amber-200
              bg-amber-50
              p-7
              text-center
              md:p-9
            "
          >
            <h2 className="text-2xl font-black text-slate-900">
              Important Note
            </h2>

            <p
              className="mx-auto mt-3 max-w-3xl leading-7"
              style={{ color: "var(--text-secondary)" }}
            >
              The application process is simple and fully online,
              allowing students to apply from anywhere. Admission
              requirements and procedures may vary depending on the
              university and program.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
