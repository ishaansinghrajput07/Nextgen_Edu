import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  GraduationCap,
  HeartPulse,
  IndianRupee,
  Landmark,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Scale,
  Send,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import { submitLead } from "../services/leadService";

const CareerAdvice = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    interestedCourse: "",
    message: "",
  });

  // =====================================================
  // STREAMS
  // =====================================================

  const streams = [
    {
      title: "Science",
      description:
        "Explore engineering, medical, technology, research and other science-focused careers.",
      icon: Rocket,
      color: "sky",
      careers: ["Engineering", "Medical", "Research", "IT"],
    },
    {
      title: "Commerce",
      description:
        "Build your career in finance, accounting, business, banking and management.",
      icon: IndianRupee,
      color: "emerald",
      careers: ["CA", "Finance", "Banking", "Management"],
    },
    {
      title: "Arts & Humanities",
      description:
        "Discover opportunities in law, civil services, psychology, media and social sciences.",
      icon: Landmark,
      color: "violet",
      careers: ["Law", "UPSC", "Psychology", "Media"],
    },
    {
      title: "Computer & IT",
      description:
        "Start a future-ready career in software development, AI, data and cybersecurity.",
      icon: Code2,
      color: "cyan",
      careers: ["Software", "AI/ML", "Data Science", "Cybersecurity"],
    },
  ];

  // =====================================================
  // CAREER OPTIONS
  // =====================================================

  const careers = [
    {
      title: "Engineering",
      icon: Rocket,
      description:
        "Build products, systems and technologies that solve real-world problems.",
      courses: "B.Tech, B.E., M.Tech",
      scope: "Technology, Core Engineering, Research",
    },
    {
      title: "Medical & Healthcare",
      icon: HeartPulse,
      description:
        "Make a meaningful impact through healthcare, medicine and allied sciences.",
      courses: "MBBS, BDS, B.Pharm, Nursing",
      scope: "Hospitals, Clinics, Research, Healthcare",
    },
    {
      title: "Management",
      icon: BriefcaseBusiness,
      description:
        "Develop leadership, business and strategic decision-making skills.",
      courses: "BBA, MBA, PGDM",
      scope: "Marketing, HR, Finance, Operations",
    },
    {
      title: "Law",
      icon: Scale,
      description:
        "Build a career in legal practice, corporate law, judiciary and public service.",
      courses: "LLB, BA LLB, BBA LLB",
      scope: "Legal Practice, Corporate, Judiciary",
    },
    {
      title: "Computer Science",
      icon: Code2,
      description:
        "Enter the fast-growing world of software, AI, cloud and digital technology.",
      courses: "BCA, B.Tech CSE, MCA",
      scope: "Software, AI, Cloud, Cybersecurity",
    },
    {
      title: "Government Services",
      icon: Landmark,
      description:
        "Prepare for competitive examinations and build a career in public service.",
      courses: "Graduation + Competitive Exams",
      scope: "UPSC, SSC, Banking, Railways",
    },
  ];

  // =====================================================
  // ROADMAP
  // =====================================================

  const roadmap = [
    {
      number: "01",
      title: "Understand Yourself",
      description:
        "Identify your interests, strengths, academic performance and career preferences.",
    },
    {
      number: "02",
      title: "Explore Career Options",
      description:
        "Compare different career paths, courses, eligibility requirements and future opportunities.",
    },
    {
      number: "03",
      title: "Choose the Right Course",
      description:
        "Select a course that matches your goals, interests, budget and long-term career plan.",
    },
    {
      number: "04",
      title: "Find the Right University",
      description:
        "Compare universities based on academics, fees, location, facilities and career opportunities.",
    },
    {
      number: "05",
      title: "Plan Your Career",
      description:
        "Create a practical roadmap for skills, internships, higher studies and future employment.",
    },
  ];

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "phoneNumber") {
      const phone = value.replace(/\D/g, "").slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        phoneNumber: phone,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.interestedCourse.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (formData.phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);

      await submitLead({
        username: formData.username.trim(),
        email: formData.email.toLowerCase().trim(),
        phoneNumber: formData.phoneNumber,
        interestedCourse: formData.interestedCourse.trim(),
        message: formData.message.trim(),
        source: "Career Advice",
      });

      toast.success("Career advice request submitted successfully.");

      setFormData({
        username: "",
        email: "",
        phoneNumber: "",
        interestedCourse: "",
        message: "",
      });
    } catch (error) {
      console.error("CAREER ADVICE ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to submit your request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 py-20 sm:py-24 lg:py-28">
        {/* Background shapes */}

        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* LEFT */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-sky-700 shadow-sm">
                <Sparkles className="h-4 w-4" />

                Career Guidance
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Build a Career That
                <span className="block bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  Matches Your Future
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Confused about what to study or which career to choose? Get
                personalized guidance to discover suitable courses,
                universities and career opportunities.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#career-advice-form"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Get Career Advice

                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>

                <a
                  href="#career-options"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-black text-slate-700 shadow-sm transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                >
                  Explore Careers
                </a>
              </div>

              {/* TRUST */}

              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Personalized Guidance
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Course Selection
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  University Guidance
                </div>
              </div>
            </motion.div>

            {/* RIGHT */}

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-sky-100 sm:p-7">
                <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-cyan-500 p-7 text-white sm:p-9">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                    <Target className="h-7 w-7" />
                  </div>

                  <h2 className="mt-7 text-2xl font-black sm:text-3xl">
                    Not sure which career is right for you?
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                    Our counsellors can help you understand your strengths,
                    explore suitable careers and choose the right educational
                    path.
                  </p>

                  <div className="mt-7 space-y-3">
                    {[
                      "Understand your interests",
                      "Explore career opportunities",
                      "Compare courses and universities",
                      "Create your education roadmap",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3"
                      >
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-white" />
                        <span className="text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
            <Lightbulb className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Your Career. Your Choice.{" "}
            <span className="text-sky-600">Our Guidance.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
            Choosing a career is an important decision. The right guidance can
            help you understand your options, avoid confusion and make an
            informed decision based on your interests, abilities and goals.
          </p>
        </div>
      </section>

      {/* =====================================================
          STREAMS
      ===================================================== */}

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-sky-600">
              Explore By Stream
            </span>

            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              Find Opportunities Based on Your Interest
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Explore popular career directions based on your academic stream
              and interests.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {streams.map((stream, index) => {
              const Icon = stream.icon;

              return (
                <motion.div
                  key={stream.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                  }}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 transition group-hover:bg-sky-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-xl font-black text-slate-950">
                    {stream.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {stream.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {stream.careers.map((career) => (
                      <span
                        key={career}
                        className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CAREER OPTIONS
      ===================================================== */}

      <section id="career-options" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="text-sm font-black uppercase tracking-[0.2em] text-sky-600">
                Career Paths
              </span>

              <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                Popular Career Opportunities
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-600">
              Explore some of the most popular career directions and understand
              the courses and opportunities associated with them.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {careers.map((career, index) => {
              const Icon = career.icon;

              return (
                <motion.div
                  key={career.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                  }}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 text-sky-600">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-emerald-700">
                      High Opportunity
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-black text-slate-950">
                    {career.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {career.description}
                  </p>

                  <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                        Popular Courses
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {career.courses}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                        Career Scope
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {career.scope}
                      </p>
                    </div>
                  </div>

                  <a
                    href="#career-advice-form"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-black text-sky-600 transition hover:text-sky-700"
                  >
                    Get guidance

                    <ChevronRight className="h-4 w-4" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          ROADMAP
      ===================================================== */}

      <section className="bg-gradient-to-br from-sky-50 via-white to-cyan-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-sky-600">
              Career Roadmap
            </span>

            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              From Confusion to Career Clarity
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Follow a simple process to make better education and career
              decisions.
            </p>
          </div>

          <div className="relative mt-14">
            <div className="absolute left-6 top-6 hidden h-[calc(100%-48px)] w-px bg-sky-200 md:block" />

            <div className="space-y-7">
              {roadmap.map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                  }}
                  className="relative flex gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:gap-7"
                >
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 text-sm font-black text-white shadow-lg shadow-sky-500/20">
                    {item.number}
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-950 sm:text-xl">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY NEXTGEN
      ===================================================== */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="text-sm font-black uppercase tracking-[0.2em] text-sky-600">
                Why NextGen
              </span>

              <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                Guidance That Starts With You
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                Every student has different goals, interests and circumstances.
                Our counselling approach focuses on understanding your needs
                before suggesting courses or universities.
              </p>

              <a
                href="#career-advice-form"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-700"
              >
                Talk to a Counsellor

                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Users,
                  title: "Personalized Guidance",
                  text: "Advice based on your interests, academic profile and goals.",
                },
                {
                  icon: GraduationCap,
                  title: "Course Guidance",
                  text: "Understand suitable courses, eligibility and career scope.",
                },
                {
                  icon: Landmark,
                  title: "University Selection",
                  text: "Compare universities based on your priorities and requirements.",
                },
                {
                  icon: Target,
                  title: "Career Planning",
                  text: "Create a practical path from education to your desired career.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CAREER ADVICE FORM
      ===================================================== */}

      <section
        id="career-advice-form"
        className="scroll-mt-24 bg-slate-50 py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl lg:grid-cols-[0.8fr_1.2fr]">
            {/* FORM INTRO */}

            <div className="bg-gradient-to-br from-sky-600 to-cyan-500 p-7 text-white sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <GraduationCap className="h-7 w-7" />
              </div>

              <h2 className="mt-7 text-3xl font-black">
                Get Personalized Career Advice
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/80">
                Tell us about yourself and what you want to achieve. Our
                counsellors will help you explore suitable career and education
                options.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Career direction guidance",
                  "Course recommendations",
                  "University selection",
                  "Admission guidance",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0" />

                    <span className="text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="max-h-[760px] overflow-y-auto p-6 sm:p-10"
            >
              <div className="mb-7">
                <h3 className="text-2xl font-black text-slate-950">
                  Tell Us About Your Goals
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Fill in your details and our team will get in touch with
                  you.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* NAME */}

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                    />
                  </div>
                </div>

                {/* PHONE */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      maxLength={10}
                      inputMode="numeric"
                      placeholder="10-digit mobile number"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                    />
                  </div>
                </div>

                {/* COURSE */}

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Interested Course / Career
                  </label>

                  <input
                    type="text"
                    name="interestedCourse"
                    value={formData.interestedCourse}
                    onChange={handleChange}
                    placeholder="Example: B.Tech CSE, MBA, MBBS, Government Jobs..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                  />
                </div>

                {/* MESSAGE */}

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    What do you need help with?
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your education, interests or career goal..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 px-6 py-4 text-sm font-black text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />

                    Get Career Advice
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                Your information will be used only to contact you regarding
                career and admission guidance.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-600 px-6 py-12 text-center text-white shadow-2xl shadow-sky-200 sm:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <Rocket className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-3xl font-black sm:text-4xl">
            Your Future Starts With the Right Decision
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
            Don't let career confusion stop you. Talk to a NextGen counsellor
            and take the first step toward a clearer future.
          </p>

          <a
            href="#career-advice-form"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-black text-sky-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
          >
            Talk to a Counsellor

            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default CareerAdvice;