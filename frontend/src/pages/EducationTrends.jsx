
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Laptop2,
  Lightbulb,
  LineChart,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  BookOpen,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const trends = [
  {
    icon: BrainCircuit,
    number: "01",
    title: "AI-Powered Education",
    short:
      "Artificial Intelligence is becoming an important part of teaching, learning and academic support.",
    description:
      "AI is changing how students learn, research and receive academic support. Universities are increasingly exploring generative AI for personalized learning, tutoring, feedback, research assistance and administrative workflows.",
    points: [
      "Personalized learning assistance",
      "AI-supported research and writing",
      "Intelligent tutoring systems",
      "Faster academic feedback",
      "AI literacy and responsible AI use",
    ],
    gradient: "from-cyan-500 to-blue-600",
  },

  {
    icon: Laptop2,
    number: "02",
    title: "Online & Hybrid Learning",
    short:
      "Flexible learning models are giving students more control over when and where they study.",
    description:
      "Digital education is moving beyond simply recording classroom lectures. Modern institutions are combining face-to-face teaching with online resources, virtual classrooms, digital assessments and flexible learning experiences.",
    points: [
      "Online degree programs",
      "Hybrid classrooms",
      "Virtual learning resources",
      "Recorded lectures and digital libraries",
      "Flexible study schedules",
    ],
    gradient: "from-blue-500 to-indigo-600",
  },

  {
    icon: Target,
    number: "03",
    title: "Skills-First Education",
    short:
      "Students are increasingly expected to graduate with practical, industry-relevant skills.",
    description:
      "A degree remains valuable, but employability increasingly depends on what students can actually do. Universities and learners are placing greater emphasis on practical skills, projects, certifications and real-world experience.",
    points: [
      "Industry-ready technical skills",
      "Project-based learning",
      "Professional certifications",
      "Problem-solving abilities",
      "Practical exposure",
    ],
    gradient: "from-violet-500 to-purple-600",
  },

  {
    icon: BriefcaseBusiness,
    number: "04",
    title: "Career-Focused Education",
    short:
      "Education is becoming more closely connected with career outcomes and employability.",
    description:
      "Students increasingly evaluate programs not only by academic reputation but also by career pathways, internships, placement opportunities, industry exposure and the skills a course can provide.",
    points: [
      "Placement-oriented programs",
      "Internships and live projects",
      "Industry interaction",
      "Career counselling",
      "Professional development",
    ],
    gradient: "from-emerald-500 to-teal-600",
  },

  {
    icon: Globe2,
    number: "05",
    title: "Global Education Opportunities",
    short:
      "Students are exploring universities, courses and career opportunities beyond their home regions.",
    description:
      "International education continues to provide opportunities for students seeking global exposure, specialized programs, research environments and international career experiences.",
    points: [
      "International universities",
      "Study-abroad pathways",
      "Global research opportunities",
      "International exposure",
      "Cross-cultural learning",
    ],
    gradient: "from-sky-500 to-cyan-600",
  },

  {
    icon: Rocket,
    number: "06",
    title: "Lifelong & Continuous Learning",
    short:
      "Learning is increasingly becoming a continuous process rather than something that ends with graduation.",
    description:
      "Fast-changing technologies and evolving job requirements mean professionals often need to update their knowledge throughout their careers. Short courses, certifications and online learning make continuous upskilling more accessible.",
    points: [
      "Professional upskilling",
      "Short-term certifications",
      "Micro-learning",
      "Online professional courses",
      "Career transitions",
    ],
    gradient: "from-orange-500 to-red-500",
  },
];

const futureSkills = [
  {
    icon: BrainCircuit,
    title: "AI & Data Literacy",
    text: "Understanding AI, data and emerging digital technologies.",
  },
  {
    icon: Lightbulb,
    title: "Creative Thinking",
    text: "Generating ideas and solving unfamiliar problems.",
  },
  {
    icon: Users,
    title: "Collaboration",
    text: "Working effectively with people, teams and technology.",
  },
  {
    icon: LineChart,
    title: "Analytical Thinking",
    text: "Using information and evidence to make better decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Adaptability",
    text: "Learning quickly as technology and careers evolve.",
  },
  {
    icon: Award,
    title: "Professional Skills",
    text: "Communication, leadership and workplace readiness.",
  },
];

const insights = [
  {
    value: "AI",
    title: "Technology + Human Skills",
    description:
      "Future-ready education needs both technological capability and strong human skills.",
  },
  {
    value: "Skills",
    title: "Learning Beyond Degrees",
    description:
      "Projects, certifications, internships and practical experience increasingly complement formal qualifications.",
  },
  {
    value: "Global",
    title: "Connected Opportunities",
    description:
      "Students can increasingly access learning, research and career opportunities across geographic boundaries.",
  },
  {
    value: "Future",
    title: "Continuous Adaptation",
    description:
      "Learning throughout a career is becoming increasingly important as technology and job requirements change.",
  },
];

export default function EducationTrends() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @keyframes floatOrb {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -18px, 0);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: .35;
          }
          50% {
            opacity: .65;
          }
        }

        .trend-orb {
          animation: floatOrb 7s ease-in-out infinite;
        }

        .trend-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }
      `}</style>

      <main className="relative overflow-hidden bg-white">

        {/* =========================================
            BACKGROUND
        ========================================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="trend-orb absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-cyan-300/20 blur-[120px]" />

          <div
            className="trend-orb absolute -right-40 top-[500px] h-[500px] w-[500px] rounded-full bg-violet-300/20 blur-[130px]"
            style={{ animationDelay: "1.5s" }}
          />

          <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        {/* =========================================
            HERO
        ========================================= */}

        <section className="relative px-6 pb-20 pt-36 lg:pt-40">
          <div className="relative z-10 mx-auto max-w-7xl">

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-5xl text-center"
            >
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-5 py-2.5 text-sm font-bold text-cyan-700 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Education Trends & Research
              </div>

              <h1 className="text-5xl font-black tracking-tight text-slate-950 md:text-6xl lg:text-7xl">
                Understanding the
                <span className="block bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Future of Education
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
                Explore the major trends shaping modern education, student
                learning, career preparation and the future of higher
                education.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
                  AI & Technology
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
                  Future Skills
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
                  Career Readiness
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
                  Global Education
                </span>
              </div>
            </motion.div>

            {/* Hero insight card */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mx-auto mt-14 max-w-5xl"
            >
              <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] md:p-12">

                <div className="trend-glow absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

                <div className="relative grid gap-8 md:grid-cols-[auto_1fr] md:items-center">

                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20">
                    <GraduationCap className="h-10 w-10" />
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                      The Big Picture
                    </p>

                    <h2 className="text-2xl font-black md:text-3xl">
                      Education is moving from
                      <span className="text-cyan-300">
                        {" "}degree-only thinking
                      </span>
                      {" "}towards continuous, skills-focused learning.
                    </h2>

                    <p className="mt-4 leading-7 text-slate-300">
                      Technology is changing how students learn, while
                      employers are increasingly looking for a combination of
                      technical capability and human skills.
                    </p>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================
            TREND INTRO
        ========================================= */}

        <section className="relative px-6 py-20">
          <div className="mx-auto max-w-7xl">

            <div className="mb-14 max-w-3xl">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600">
                Key Trends
              </span>

              <h2 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">
                What's changing in education?
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                From artificial intelligence to career-focused learning,
                these trends are influencing how institutions design
                programs and how students prepare for their future.
              </p>
            </div>

            <div className="grid gap-7 lg:grid-cols-2">
              {trends.map((trend, index) => {
                const Icon = trend.icon;

                return (
                  <motion.article
                    key={trend.number}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.08,
                    }}
                    whileHover={{ y: -7 }}
                    className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_15px_45px_rgba(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)] md:p-8"
                  >

                    <div
                      className={`absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br ${trend.gradient} opacity-[0.07] blur-2xl transition-opacity duration-300 group-hover:opacity-[0.14]`}
                    />

                    <div className="relative">

                      <div className="flex items-start justify-between gap-5">

                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${trend.gradient} text-white shadow-lg`}
                        >
                          <Icon className="h-7 w-7" />
                        </div>

                        <span className="text-5xl font-black text-slate-100">
                          {trend.number}
                        </span>

                      </div>

                      <h3 className="mt-7 text-2xl font-black text-slate-900">
                        {trend.title}
                      </h3>

                      <p className="mt-3 font-semibold leading-7 text-slate-700">
                        {trend.short}
                      </p>

                      <p className="mt-4 leading-7 text-slate-500">
                        {trend.description}
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {trend.points.map((point) => (
                          <div
                            key={point}
                            className="flex gap-2 text-sm text-slate-600"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================
            FUTURE SKILLS
        ========================================= */}

        <section className="relative bg-slate-950 px-6 py-24 text-white">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:50px_50px]" />

          <div className="relative mx-auto max-w-7xl">

            <div className="mx-auto mb-14 max-w-3xl text-center">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
                Future-Ready Skills
              </span>

              <h2 className="mt-4 text-4xl font-black md:text-5xl">
                What should students learn?
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-400">
                Future careers will require more than technical knowledge.
                Students need a balanced combination of technology skills,
                analytical ability and strong human capabilities.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {futureSkills.map((skill, index) => {
                const Icon = skill.icon;

                return (
                  <motion.div
                    key={skill.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.07,
                    }}
                    whileHover={{ y: -5 }}
                    className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-white/[0.07]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-5 text-lg font-black">
                      {skill.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {skill.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================
            KEY INSIGHTS
        ========================================= */}

        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-7xl">

            <div className="mb-12">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600">
                Research Takeaways
              </span>

              <h2 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">
                What these trends mean for students
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {insights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                  }}
                  className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"
                >
                  <div className="text-4xl font-black text-cyan-600">
                    {item.value}
                  </div>

                  <h3 className="mt-5 text-lg font-black text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================
            STUDENT DECISION SECTION
        ========================================= */}

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl">

            <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-cyan-600 via-blue-600 to-violet-700 p-8 text-white shadow-[0_30px_80px_rgba(37,99,235,0.22)] md:p-12 lg:p-16">

              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

              <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">

                <div className="max-w-3xl">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                    <BookOpen className="h-4 w-4" />
                    Make an informed decision
                  </div>

                  <h2 className="text-4xl font-black leading-tight md:text-5xl">
                    Trends change.
                    <br />
                    Your career plan shouldn't be random.
                  </h2>

                  <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
                    Choose courses and universities by looking beyond a
                    degree title. Consider skills, career opportunities,
                    industry exposure, learning format and your long-term
                    goals.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/contact")}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 font-black text-blue-700 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  Talk to a Counsellor
                  <ArrowRight className="h-5 w-5" />
                </button>

              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            FINAL NOTE
        ========================================= */}

        <section className="border-t border-slate-100 bg-slate-50 px-6 py-12">
          <div className="mx-auto max-w-4xl text-center">

            <p className="text-sm leading-7 text-slate-500">
              Education trends evolve continuously. Students should evaluate
              current course information, university requirements, career
              pathways and official institutional information before making
              admission decisions.
            </p>

          </div>
        </section>

      </main>
    </>
  );
}

