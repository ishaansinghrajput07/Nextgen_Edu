
import {
  CheckCircle,
  GraduationCap,
  BookOpen,
  Award,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Info,
} from "lucide-react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function EligibilityCriteria() {
  const ugRequirements = [
    "Passed Class XII or equivalent examination",
    "Minimum 50% aggregate marks",
    "Qualification from a recognized board",
    "Meet the specific eligibility requirements of the selected university",
  ];

  const pgRequirements = [
    "Completed a Bachelor's degree",
    "Degree must be from a recognized university",
    "Meet the minimum percentage or CGPA required by the university",
    "Fulfil course-specific eligibility requirements",
  ];

  return (
    <>
      <style>{`
        @keyframes eligibilityGlow {
          0%, 100% {
            box-shadow:
              0 0 20px rgba(14, 165, 233, 0.08),
              0 0 45px rgba(34, 211, 238, 0.04);
          }

          50% {
            box-shadow:
              0 0 30px rgba(34, 211, 238, 0.15),
              0 0 70px rgba(168, 85, 247, 0.08);
          }
        }

        .eligibility-glow {
          animation: eligibilityGlow 4s ease-in-out infinite;
        }
      `}</style>

      <section className="relative overflow-hidden bg-slate-50 pt-28 pb-20">

        {/* =====================================================
            BACKGROUND
        ===================================================== */}

        <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-cyan-200/30 blur-[140px]" />

        <div className="pointer-events-none absolute -right-40 top-[500px] h-[500px] w-[500px] rounded-full bg-violet-200/25 blur-[140px]" />

        <div className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-sky-100/50 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          {/* =====================================================
              HERO
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="
              eligibility-glow
              relative
              overflow-hidden
              rounded-[2.5rem]
              border
              border-slate-200
              bg-white
              px-6
              py-14
              text-center
              shadow-[0_25px_80px_rgba(15,23,42,0.08)]
              md:px-12
              md:py-20
            "
          >

            {/* Hero Glow */}
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-[100px]" />

            <div className="relative z-10">

              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-xl shadow-cyan-200">
                <GraduationCap className="h-8 w-8" />
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-600">
                <Sparkles className="h-4 w-4" />
                Admission Eligibility Guide
              </span>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                Eligibility{" "}
                <span className="bg-gradient-to-r from-cyan-500 via-sky-600 to-violet-600 bg-clip-text text-transparent">
                  Criteria
                </span>
              </h1>

              <p
                className="mx-auto mt-6 max-w-3xl text-base leading-8 sm:text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                Understand the basic academic requirements for
                Undergraduate and Postgraduate admissions and make sure
                you meet the eligibility criteria before applying.
              </p>

              {/* Hero Stats */}

              <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <GraduationCap className="mx-auto mb-2 h-5 w-5 text-cyan-500" />
                  <p className="text-sm font-bold text-slate-700">
                    Undergraduate
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <BookOpen className="mx-auto mb-2 h-5 w-5 text-violet-500" />
                  <p className="text-sm font-bold text-slate-700">
                    Postgraduate
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <ShieldCheck className="mx-auto mb-2 h-5 w-5 text-emerald-500" />
                  <p className="text-sm font-bold text-slate-700">
                    Verified Guidance
                  </p>
                </div>

              </div>

            </div>
          </motion.div>

          {/* =====================================================
              SECTION HEADING
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <span className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600">
              Who Can Apply?
            </span>

            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              Check Your Academic Eligibility
            </h2>

            <p
              className="mx-auto mt-4 max-w-2xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Review the general requirements for the level of study
              you are planning to pursue.
            </p>
          </motion.div>

          {/* =====================================================
              UG + PG CARDS
          ===================================================== */}

          <div className="mt-10 grid gap-7 lg:grid-cols-2">

            {/* =================================================
                UG CARD
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="
                group
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-slate-200
                bg-white
                p-7
                shadow-[0_20px_60px_rgba(15,23,42,0.07)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]
                md:p-9
              "
            >

              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-100/60 blur-[70px]" />

              <div className="relative z-10">

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-200">
                      <GraduationCap className="h-7 w-7" />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-cyan-500">
                        Level 01
                      </p>

                      <h3 className="mt-1 text-2xl font-black text-slate-900">
                        Undergraduate
                      </h3>
                    </div>

                  </div>

                  <span className="hidden rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-600 sm:block">
                    UG
                  </span>

                </div>

                <p
                  className="mt-6 leading-7"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Students who have completed their senior secondary
                  education can explore Undergraduate programmes.
                </p>

                <div className="mt-7 space-y-4">

                  {ugRequirements.map((requirement) => (
                    <div
                      key={requirement}
                      className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5"
                    >
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

                      <span className="text-sm font-semibold leading-6 text-slate-700">
                        {requirement}
                      </span>
                    </div>
                  ))}

                </div>

                <div className="mt-7 flex items-center gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4">
                  <Award className="h-5 w-5 shrink-0 text-cyan-600" />

                  <p className="text-sm font-semibold text-cyan-700">
                    General minimum: 50% aggregate in Class XII
                  </p>
                </div>

              </div>
            </motion.div>

            {/* =================================================
                PG CARD
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="
                group
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-slate-200
                bg-white
                p-7
                shadow-[0_20px_60px_rgba(15,23,42,0.07)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]
                md:p-9
              "
            >

              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-100/60 blur-[70px]" />

              <div className="relative z-10">

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-200">
                      <BookOpen className="h-7 w-7" />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-violet-500">
                        Level 02
                      </p>

                      <h3 className="mt-1 text-2xl font-black text-slate-900">
                        Postgraduate
                      </h3>
                    </div>

                  </div>

                  <span className="hidden rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-600 sm:block">
                    PG
                  </span>

                </div>

                <p
                  className="mt-6 leading-7"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Graduates can explore advanced programmes designed
                  to develop specialized knowledge and professional
                  expertise.
                </p>

                <div className="mt-7 space-y-4">

                  {pgRequirements.map((requirement) => (
                    <div
                      key={requirement}
                      className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5"
                    >
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

                      <span className="text-sm font-semibold leading-6 text-slate-700">
                        {requirement}
                      </span>
                    </div>
                  ))}

                </div>

                <div className="mt-7 flex items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50/70 p-4">
                  <Award className="h-5 w-5 shrink-0 text-violet-600" />

                  <p className="text-sm font-semibold text-violet-700">
                    A recognized Bachelor's degree is required
                  </p>
                </div>

              </div>
            </motion.div>

          </div>

          {/* =====================================================
              IMPORTANT NOTE
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              mt-10
              rounded-[2rem]
              border
              border-amber-200
              bg-gradient-to-r
              from-amber-50
              to-orange-50
              p-6
              md:p-8
            "
          >

            <div className="flex flex-col gap-5 md:flex-row md:items-start">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <Info className="h-6 w-6" />
              </div>

              <div>

                <h3 className="text-xl font-black text-slate-900">
                  Important Information
                </h3>

                <p
                  className="mt-2 leading-7"
                  style={{ color: "var(--text-secondary)" }}
                >
                  The eligibility criteria mentioned above are general
                  guidelines. Requirements may vary depending on the
                  course, university, specialization, entrance
                  examination and applicable admission regulations.
                  Always verify the specific requirements before
                  submitting your application.
                </p>

              </div>

            </div>

          </motion.div>

          {/* =====================================================
              CTA
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              relative
              mt-12
              overflow-hidden
              rounded-[2rem]
              bg-gradient-to-r
              from-sky-600
              via-cyan-500
              to-blue-600
              p-8
              text-white
              shadow-[0_25px_70px_rgba(14,165,233,0.25)]
              md:p-10
            "
          >

            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div className="max-w-2xl">

                <p className="text-sm font-bold uppercase tracking-wider text-white/80">
                  Need Help?
                </p>

                <h2 className="mt-2 text-2xl font-black md:text-3xl">
                  Not sure if you're eligible?
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/85 md:text-base">
                  Our admission counsellors can help you understand
                  course requirements and find suitable universities.
                </p>

              </div>

              <Link
                to="/registration-form"
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-white
                  px-6
                  py-3.5
                  text-sm
                  font-black
                  text-sky-600
                  shadow-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-2xl
                "
              >
                Get Admission Guidance
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

          </motion.div>

        </div>
      </section>
    </>
  );
}

