
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
  IndianRupee,
  Lightbulb,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  "All",
  "Technology",
  "Medical",
  "Management",
  "Commerce",
  "Law",
  "Science",
  "Government",
  "Design",
  "Education",
  "Media",
];

const careers = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    category: "Technology",
    icon: "💻",
    shortDescription:
      "Design, develop, test and maintain software applications and digital products.",
    education: "B.Tech / B.E. / BCA / MCA",
    duration: "3–4+ Years",
    demand: "Very High",
    salary: "₹4L – ₹20L+",
    skills: [
      "Programming",
      "Data Structures",
      "Problem Solving",
      "Databases",
      "Git & GitHub",
      "Communication",
    ],
    roles: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Software Engineer",
      "Application Developer",
    ],
    exams: ["JEE Main", "JEE Advanced", "CUET", "GATE"],
    courses: [
      "B.Tech Computer Science",
      "BCA",
      "MCA",
      "M.Tech Computer Science",
    ],
    roadmap: [
      "Complete Class 12 with relevant subjects",
      "Choose a computer science or IT degree",
      "Learn programming and core CS concepts",
      "Build projects and gain internship experience",
      "Prepare for technical interviews",
      "Start an entry-level technology role",
      "Specialize in a high-demand technology area",
    ],
    pros: [
      "Strong demand across industries",
      "Multiple career specializations",
      "Remote and global opportunities",
      "Good scope for freelancing and entrepreneurship",
    ],
    cons: [
      "Technology changes rapidly",
      "Continuous learning is required",
      "Competitive entry-level market",
    ],
    suitableFor:
      "Students who enjoy technology, logical thinking, problem solving and building digital products.",
  },
  {
    id: "doctor",
    title: "Doctor",
    category: "Medical",
    icon: "🩺",
    shortDescription:
      "Diagnose, treat and help prevent diseases while providing patient-centered healthcare.",
    education: "MBBS + Specialization",
    duration: "5.5+ Years",
    demand: "Very High",
    salary: "₹6L – ₹30L+",
    skills: [
      "Clinical Knowledge",
      "Communication",
      "Decision Making",
      "Patient Care",
      "Observation",
      "Discipline",
    ],
    roles: [
      "General Physician",
      "Medical Officer",
      "Surgeon",
      "Specialist",
      "Hospital Administrator",
    ],
    exams: ["NEET UG", "NEET PG", "INI-CET"],
    courses: ["MBBS", "MD", "MS", "Diploma Specializations"],
    roadmap: [
      "Complete Class 12 with PCB",
      "Prepare for NEET UG",
      "Complete MBBS",
      "Complete internship",
      "Choose specialization",
      "Complete postgraduate medical education",
      "Build clinical or academic experience",
    ],
    pros: [
      "Highly respected profession",
      "Strong long-term demand",
      "Multiple specialization options",
      "Opportunity to directly help people",
    ],
    cons: [
      "Long education period",
      "Highly competitive entrance process",
      "Demanding working hours",
      "High responsibility",
    ],
    suitableFor:
      "Students interested in biology, healthcare, science and helping people through medical care.",
  },
  {
    id: "chartered-accountant",
    title: "Chartered Accountant",
    category: "Commerce",
    icon: "📊",
    shortDescription:
      "Work with accounting, taxation, auditing, financial reporting and business advisory.",
    education: "CA Qualification",
    duration: "Variable",
    demand: "High",
    salary: "₹6L – ₹25L+",
    skills: [
      "Accounting",
      "Taxation",
      "Financial Analysis",
      "Auditing",
      "Excel",
      "Communication",
    ],
    roles: [
      "Chartered Accountant",
      "Tax Consultant",
      "Auditor",
      "Financial Analyst",
      "Finance Manager",
    ],
    exams: ["CA Foundation", "CA Intermediate", "CA Final"],
    courses: [
      "B.Com",
      "CA",
      "M.Com",
      "Finance Certifications",
    ],
    roadmap: [
      "Complete Class 12",
      "Register for CA pathway",
      "Clear Foundation requirements",
      "Complete Intermediate level",
      "Complete practical training",
      "Clear CA Final",
      "Begin professional practice or corporate career",
    ],
    pros: [
      "Strong professional reputation",
      "Multiple finance career paths",
      "Corporate and independent practice opportunities",
      "Long-term earning potential",
    ],
    cons: [
      "Highly competitive qualification",
      "Requires consistent preparation",
      "Multiple examination stages",
    ],
    suitableFor:
      "Students who enjoy numbers, finance, accounting, business and analytical work.",
  },
  {
    id: "lawyer",
    title: "Lawyer",
    category: "Law",
    icon: "⚖️",
    shortDescription:
      "Advise clients, interpret laws, prepare legal documents and represent people or organizations.",
    education: "LLB / BA LLB / BBA LLB",
    duration: "3–5 Years",
    demand: "High",
    salary: "₹3L – ₹20L+",
    skills: [
      "Legal Research",
      "Communication",
      "Argumentation",
      "Writing",
      "Critical Thinking",
      "Negotiation",
    ],
    roles: [
      "Advocate",
      "Corporate Lawyer",
      "Legal Consultant",
      "Legal Advisor",
      "Compliance Specialist",
    ],
    exams: ["CLAT", "AILET", "State Law Entrance Exams"],
    courses: [
      "BA LLB",
      "BBA LLB",
      "LLB",
      "LLM",
    ],
    roadmap: [
      "Complete Class 12 or graduation",
      "Prepare for law entrance exams where applicable",
      "Complete law degree",
      "Develop legal research and drafting skills",
      "Complete required practical training",
      "Start legal practice or corporate career",
      "Specialize in a legal domain",
    ],
    pros: [
      "Wide range of specializations",
      "Corporate and litigation opportunities",
      "Strong scope for independent practice",
      "Transferable analytical skills",
    ],
    cons: [
      "Career growth can take time",
      "Strong competition",
      "Requires excellent communication and research skills",
    ],
    suitableFor:
      "Students who enjoy reading, argumentation, writing, current affairs and analytical thinking.",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Technology",
    icon: "📈",
    shortDescription:
      "Use data, statistics and machine learning to solve business and real-world problems.",
    education: "B.Tech / B.Sc / MCA / Relevant Degree",
    duration: "3–6+ Years",
    demand: "Very High",
    salary: "₹6L – ₹30L+",
    skills: [
      "Python",
      "Statistics",
      "Machine Learning",
      "SQL",
      "Data Visualization",
      "Problem Solving",
    ],
    roles: [
      "Data Scientist",
      "Data Analyst",
      "ML Engineer",
      "Business Analyst",
      "AI Engineer",
    ],
    exams: ["JEE Main", "CUET", "GATE"],
    courses: [
      "B.Tech CSE",
      "B.Sc Data Science",
      "MCA",
      "M.Sc Data Science",
    ],
    roadmap: [
      "Build mathematics and statistics fundamentals",
      "Learn programming, especially Python",
      "Learn SQL and data handling",
      "Study statistics and machine learning",
      "Build data projects",
      "Complete internships",
      "Specialize in AI, ML or analytics",
    ],
    pros: [
      "Fast-growing technology field",
      "Strong demand for analytical skills",
      "Multiple industry applications",
      "International opportunities",
    ],
    cons: [
      "Requires strong quantitative skills",
      "Tools and technologies evolve quickly",
      "Entry-level competition can be high",
    ],
    suitableFor:
      "Students who enjoy mathematics, programming, statistics, analytical thinking and technology.",
  },
  {
    id: "civil-services",
    title: "Civil Services Officer",
    category: "Government",
    icon: "🏛️",
    shortDescription:
      "Serve in public administration, policy implementation and governance through government services.",
    education: "Graduation in Any Recognized Discipline",
    duration: "3–4+ Years",
    demand: "Competitive",
    salary: "Varies by Service & Level",
    skills: [
      "General Awareness",
      "Communication",
      "Leadership",
      "Decision Making",
      "Analytical Thinking",
      "Administration",
    ],
    roles: [
      "IAS",
      "IPS",
      "IFS",
      "State Civil Services",
      "Administrative Officer",
    ],
    exams: ["UPSC Civil Services", "State PSC Exams"],
    courses: [
      "Any Recognized Bachelor's Degree",
      "Public Administration",
      "Political Science",
      "History",
    ],
    roadmap: [
      "Complete graduation",
      "Understand examination pattern",
      "Build current affairs knowledge",
      "Prepare General Studies",
      "Practice answer writing",
      "Clear preliminary examination",
      "Clear mains and interview stages",
    ],
    pros: [
      "Public service opportunity",
      "High responsibility and impact",
      "Career stability",
      "Diverse administrative roles",
    ],
    cons: [
      "Extremely competitive",
      "Long preparation cycle",
      "Requires consistent study discipline",
    ],
    suitableFor:
      "Students interested in governance, current affairs, administration, public service and leadership.",
  },
];

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
      <Icon className="h-5 w-5" />
    </div>
    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
      {label}
    </p>
    <p className="mt-1 text-lg font-extrabold text-slate-900">{value}</p>
  </div>
);

const SectionTitle = ({ icon: Icon, eyebrow, title, description }) => (
  <div className="mb-8">
    <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
      <Icon className="h-4 w-4" />
      {eyebrow}
    </div>

    <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
      {title}
    </h2>

    {description && (
      <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
        {description}
      </p>
    )}
  </div>
);

export default function CareerResearch() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedCareer, setSelectedCareer] = useState(null);

  const filteredCareers = useMemo(() => {
    const query = search.toLowerCase().trim();

    return careers.filter((career) => {
      const matchesCategory =
        category === "All" || career.category === category;

      const matchesSearch =
        !query ||
        career.title.toLowerCase().includes(query) ||
        career.category.toLowerCase().includes(query) ||
        career.shortDescription.toLowerCase().includes(query) ||
        career.skills.some((skill) =>
          skill.toLowerCase().includes(query),
        );

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-180px] top-[-160px] h-[450px] w-[450px] rounded-full bg-cyan-200/30 blur-[120px]" />
        <div className="absolute right-[-180px] top-[35%] h-[450px] w-[450px] rounded-full bg-blue-200/25 blur-[120px]" />
      </div>

      {/* HERO */}
      <section className="relative pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[38px] border border-sky-100 bg-gradient-to-br from-sky-700 via-blue-700 to-indigo-800 px-7 py-14 text-white shadow-2xl md:px-14 md:py-20"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl" />

            <div className="relative z-10 max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Career Research & Discovery
              </span>

              <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Explore Careers.
                <br />
                <span className="text-cyan-200">
                  Understand Your Future.
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/80 md:text-lg">
                Research career options, understand the education required,
                discover essential skills, explore career paths and make a
                more informed decision about your future.
              </p>

              {/* Search */}
              <div className="mt-9 flex max-w-3xl flex-col gap-3 rounded-2xl bg-white p-2 shadow-xl sm:flex-row">
                <div className="flex flex-1 items-center gap-3 px-4">
                  <Search className="h-5 w-5 text-slate-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search careers, skills or fields..."
                    className="w-full bg-transparent py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>

                <button
                  onClick={() => {
                    document
                      .getElementById("career-results")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-xl bg-sky-600 px-6 py-3 font-bold text-white transition hover:bg-sky-700"
                >
                  Explore Careers
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section id="career-results" className="pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            icon={Target}
            eyebrow="Explore By Field"
            title="Find a career that matches your interests"
            description="Browse career opportunities across major education and professional fields."
          />

          <div className="flex gap-3 overflow-x-auto pb-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-bold transition ${
                  category === item
                    ? "border-sky-600 bg-sky-600 text-white shadow-lg shadow-sky-200"
                    : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER CARDS */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          {filteredCareers.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <Search className="mx-auto h-12 w-12 text-slate-300" />

              <h3 className="mt-5 text-2xl font-black">
                No career found
              </h3>

              <p className="mt-2 text-slate-500">
                Try another career, skill or category.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCareers.map((career, index) => (
                <motion.article
                  key={career.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -7 }}
                  className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:shadow-2xl"
                >
                  <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-7">
                    <div className="flex items-start justify-between">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                        {career.icon}
                      </div>

                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                        {career.demand} Demand
                      </span>
                    </div>

                    <p className="mt-6 text-xs font-bold uppercase tracking-widest text-sky-600">
                      {career.category}
                    </p>

                    <h3 className="mt-2 text-2xl font-black">
                      {career.title}
                    </h3>

                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                      {career.shortDescription}
                    </p>
                  </div>

                  <div className="p-7">
                    <div className="grid grid-cols-2 gap-3">
                      <StatCard
                        icon={GraduationCap}
                        label="Education"
                        value={career.education}
                      />

                      <StatCard
                        icon={Clock3}
                        label="Duration"
                        value={career.duration}
                      />

                      <StatCard
                        icon={IndianRupee}
                        label="Indicative Salary"
                        value={career.salary}
                      />

                      <StatCard
                        icon={TrendingUp}
                        label="Demand"
                        value={career.demand}
                      />
                    </div>

                    <button
                      onClick={() => setSelectedCareer(career)}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-sky-600"
                    >
                      View Career Research
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY RESEARCH */}
      <section className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            icon={Lightbulb}
            eyebrow="Make Better Decisions"
            title="Why career research matters"
            description="A career decision becomes stronger when you understand the complete journey before choosing a course or university."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                Target,
                "Know Your Direction",
                "Understand what a career actually involves before committing to it.",
              ],
              [
                BookOpen,
                "Understand Education",
                "Identify degrees, courses and qualifications needed to enter the field.",
              ],
              [
                BriefcaseBusiness,
                "Explore Opportunities",
                "Understand job roles, industries and possible career progression.",
              ],
              [
                ShieldCheck,
                "Plan With Confidence",
                "Compare pathways and make decisions based on your goals and strengths.",
              ],
            ].map(([Icon, title, text]) => (
              <div
                key={title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-lg font-black">{title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-[35px] bg-gradient-to-r from-sky-600 to-blue-700 p-8 text-white shadow-2xl md:p-14">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-cyan-100">
                  <Users className="h-4 w-4" />
                  Need Personal Guidance?
                </div>

                <h2 className="mt-3 text-3xl font-black md:text-4xl">
                  Still confused about your career?
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-white/80">
                  Talk to an education counsellor and get guidance based on
                  your interests, academic background and career goals.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-white px-6 py-4 font-extrabold text-sky-700 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                Talk to a Counsellor
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DETAIL MODAL */}
      {selectedCareer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[30px] bg-white shadow-2xl"
          >
            <button
              onClick={() => setSelectedCareer(null)}
              className="sticky right-5 top-5 z-20 ml-auto mr-5 mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
            >
              <XCircle className="h-5 w-5" />
            </button>

            <div className="px-7 pb-10 md:px-10">
              {/* DETAIL HERO */}
              <div className="rounded-[25px] bg-gradient-to-br from-sky-600 to-blue-700 p-7 text-white md:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white text-4xl shadow-lg">
                    {selectedCareer.icon}
                  </div>

                  <div>
                    <span className="text-sm font-bold uppercase tracking-widest text-cyan-100">
                      {selectedCareer.category}
                    </span>

                    <h2 className="mt-2 text-3xl font-black md:text-4xl">
                      {selectedCareer.title}
                    </h2>

                    <p className="mt-3 max-w-3xl text-white/80">
                      {selectedCareer.shortDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* QUICK INFO */}
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  icon={GraduationCap}
                  label="Education"
                  value={selectedCareer.education}
                />

                <StatCard
                  icon={Clock3}
                  label="Duration"
                  value={selectedCareer.duration}
                />

                <StatCard
                  icon={IndianRupee}
                  label="Indicative Salary"
                  value={selectedCareer.salary}
                />

                <StatCard
                  icon={TrendingUp}
                  label="Demand"
                  value={selectedCareer.demand}
                />
              </div>

              {/* OVERVIEW */}
              <div className="mt-10">
                <SectionTitle
                  icon={BriefcaseBusiness}
                  eyebrow="Career Overview"
                  title={`What does a ${selectedCareer.title} do?`}
                />

                <p className="max-w-4xl text-base leading-8 text-slate-600">
                  A {selectedCareer.title} works in the{" "}
                  {selectedCareer.category.toLowerCase()} field and develops
                  professional expertise through education, practical
                  experience and continuous learning. The exact role,
                  responsibilities and earning potential can vary based on
                  specialization, experience, location, organization and
                  individual skills.
                </p>
              </div>

              {/* SKILLS */}
              <div className="mt-12">
                <SectionTitle
                  icon={Sparkles}
                  eyebrow="Skills"
                  title="Skills you should develop"
                />

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {selectedCareer.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                      <span className="font-semibold text-slate-700">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* EDUCATION */}
              <div className="mt-12 grid gap-8 lg:grid-cols-2">
                <div>
                  <SectionTitle
                    icon={BookOpen}
                    eyebrow="Education"
                    title="Recommended courses"
                  />

                  <div className="space-y-3">
                    {selectedCareer.courses.map((course) => (
                      <div
                        key={course}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4"
                      >
                        <GraduationCap className="h-5 w-5 text-sky-600" />
                        <span className="font-semibold">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <SectionTitle
                    icon={Award}
                    eyebrow="Entrance Exams"
                    title="Relevant exams"
                  />

                  <div className="space-y-3">
                    {selectedCareer.exams.map((exam) => (
                      <div
                        key={exam}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4"
                      >
                        <Award className="h-5 w-5 text-violet-600" />
                        <span className="font-semibold">{exam}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ROLES */}
              <div className="mt-12">
                <SectionTitle
                  icon={BriefcaseBusiness}
                  eyebrow="Career Opportunities"
                  title="Possible job roles"
                />

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {selectedCareer.roles.map((role) => (
                    <div
                      key={role}
                      className="rounded-2xl border border-slate-200 bg-white p-4 font-semibold shadow-sm"
                    >
                      {role}
                    </div>
                  ))}
                </div>
              </div>

              {/* ROADMAP */}
              <div className="mt-12">
                <SectionTitle
                  icon={TrendingUp}
                  eyebrow="Career Roadmap"
                  title="A practical path to get started"
                />

                <div className="relative ml-3 border-l-2 border-sky-100 pl-8">
                  {selectedCareer.roadmap.map((step, index) => (
                    <div key={step} className="relative pb-7 last:pb-0">
                      <div className="absolute -left-[43px] flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-xs font-black text-white ring-4 ring-sky-50">
                        {index + 1}
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="font-semibold text-slate-700">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PROS / CONS */}
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-7">
                  <h3 className="flex items-center gap-2 text-xl font-black text-emerald-800">
                    <CheckCircle2 className="h-5 w-5" />
                    Advantages
                  </h3>

                  <div className="mt-5 space-y-3">
                    {selectedCareer.pros.map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-emerald-900"
                      >
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-rose-100 bg-rose-50 p-7">
                  <h3 className="flex items-center gap-2 text-xl font-black text-rose-800">
                    <XCircle className="h-5 w-5" />
                    Challenges
                  </h3>

                  <div className="mt-5 space-y-3">
                    {selectedCareer.cons.map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-rose-900"
                      >
                        <XCircle className="mt-1 h-4 w-4 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SUITABLE FOR */}
              <div className="mt-10 rounded-3xl bg-slate-900 p-7 text-white">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Users className="h-6 w-6 text-cyan-300" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black">
                      Who should consider this career?
                    </h3>

                    <p className="mt-2 leading-7 text-white/70">
                      {selectedCareer.suitableFor}
                    </p>
                  </div>
                </div>
              </div>

              {/* MODAL CTA */}
              <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-3xl bg-gradient-to-r from-sky-50 to-blue-50 p-6 sm:flex-row">
                <div>
                  <h3 className="text-lg font-black">
                    Need help choosing this career?
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    Speak with a counsellor before selecting your course.
                  </p>
                </div>

                <Link
                  to="/contact"
                  onClick={() => setSelectedCareer(null)}
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-bold text-white transition hover:bg-sky-700"
                >
                  Talk to a Counsellor
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}

