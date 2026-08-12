import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
  Lightbulb,
  Mail,
  Phone,
  FlaskConical,
  FileText,
  Users,
  Trophy,
  IndianRupee,
  Send,
  Microscope,
  Building2,
  Globe2,
  BriefcaseBusiness,
} from "lucide-react";

const specializations = [
  "Computer Science & Engineering",
  "Management",
  "Commerce",
  "Education",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Biotechnology",
  "Life Sciences",
  "Engineering",
  "Social Sciences",
  "Humanities",
];

const researchAreas = [
  {
    icon: Microscope,
    title: "Advanced Research",
    description:
      "Develop new knowledge, methodologies and innovative solutions through structured academic research.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Discovery",
    description:
      "Work on emerging problems and contribute original ideas to your chosen field of study.",
  },
  {
    icon: FlaskConical,
    title: "Experimental Research",
    description:
      "Design experiments, analyze findings and validate research hypotheses using scientific methods.",
  },
  {
    icon: Globe2,
    title: "Global Research",
    description:
      "Explore international research opportunities, conferences, publications and collaborations.",
  },
];

const admissionSteps = [
  {
    number: "01",
    title: "Check Eligibility",
    description:
      "Review the academic qualification and subject-specific eligibility requirements.",
  },
  {
    number: "02",
    title: "Submit Application",
    description:
      "Complete the university application form with academic and personal details.",
  },
  {
    number: "03",
    title: "Entrance Examination",
    description:
      "Appear for the required university, national or institutional PhD entrance examination.",
  },
  {
    number: "04",
    title: "Research Proposal",
    description:
      "Prepare and present a research proposal based on your intended research area.",
  },
  {
    number: "05",
    title: "Interview",
    description:
      "Attend the research interview with the university's faculty or doctoral committee.",
  },
  {
    number: "06",
    title: "Admission & Research",
    description:
      "Complete admission formalities and begin your doctoral research journey.",
  },
];

const faqs = [
  {
    question: "What is a PhD?",
    answer:
      "A PhD, or Doctor of Philosophy, is the highest academic research degree generally awarded by universities. It involves conducting original research that contributes new knowledge to a specific field.",
  },
  {
    question: "How long does a PhD take?",
    answer:
      "The duration varies by university, discipline and research progress. In India, a PhD commonly takes around 3 to 6 years, depending on the programme requirements and research work.",
  },
  {
    question: "What is the eligibility for PhD admission?",
    answer:
      "Eligibility depends on the university and subject. Generally, candidates need a relevant postgraduate degree with the required minimum marks or CGPA. Some institutions may also accept candidates through specific integrated or national pathways.",
  },
  {
    question: "Is an entrance examination required?",
    answer:
      "Many universities conduct their own entrance examination or consider national-level examinations. Candidates may also need to appear for a research interview or presentation.",
  },
  {
    question: "Do I need a research proposal?",
    answer:
      "Many PhD programmes require candidates to submit or present a research proposal. The exact format and requirements depend on the university and department.",
  },
  {
    question: "What can I do after completing a PhD?",
    answer:
      "PhD graduates can pursue careers in universities, research institutions, R&D organizations, government organizations, technology companies, consulting, industry and other specialized professional fields.",
  },
];

export default function PhD() {
  const [openFaq, setOpenFaq] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "PhD",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("PhD Enquiry:", formData);

    alert("Thank you! Our counselling team will contact you shortly.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "PhD",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-sky-950 via-slate-900 to-cyan-950">

        {/* Background Glow */}

        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[130px]" />

        <div className="absolute top-20 right-0 h-[450px] w-[450px] rounded-full bg-sky-500/20 blur-[130px]" />

        <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[120px]" />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.08]
            [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]
            [background-size:50px_50px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">

          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">

            {/* LEFT */}

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >

              <div
                className="
                  mb-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-cyan-400/20
                  bg-cyan-400/10
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-cyan-300
                  backdrop-blur-md
                "
              >
                <GraduationCap size={18} />

                Doctoral Education
              </div>

              <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">

                Pursue Your{" "}

                <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent">
                  PhD
                </span>

                <br />

                Build Knowledge. Create Impact.
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Explore PhD opportunities with leading universities and
                institutions. Get personalized guidance for university
                selection, eligibility, applications, research areas,
                entrance examinations and doctoral admissions.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                <a
                  href="#enquiry"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-sky-500
                    px-7
                    py-4
                    font-bold
                    text-white
                    shadow-xl
                    shadow-cyan-500/20
                    transition
                    hover:-translate-y-1
                  "
                >
                  Get PhD Counselling

                  <ArrowRight size={19} />
                </a>

                <a
                  href="#phd-overview"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-white/15
                    bg-white/5
                    px-7
                    py-4
                    font-bold
                    text-white
                    backdrop-blur-md
                    transition
                    hover:bg-white/10
                  "
                >
                  Explore PhD Details

                  <BookOpen size={18} />
                </a>

              </div>

            </motion.div>

            {/* RIGHT CARD */}

            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >

              <div
                className="
                  rounded-[32px]
                  border
                  border-white/10
                  bg-white/[0.07]
                  p-6
                  shadow-2xl
                  backdrop-blur-2xl
                  sm:p-8
                "
              >

                <div className="mb-7 flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
                    <GraduationCap size={28} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">
                      Doctoral Programme
                    </p>

                    <h3 className="text-xl font-bold text-white">
                      PhD Admission
                    </h3>
                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <HeroInfo
                    icon={Clock3}
                    title="Duration"
                    value="3–6 Years"
                  />

                  <HeroInfo
                    icon={BookOpen}
                    title="Research"
                    value="Original Work"
                  />

                  <HeroInfo
                    icon={Users}
                    title="Guidance"
                    value="Expert Support"
                  />

                  <HeroInfo
                    icon={Trophy}
                    title="Degree"
                    value="Doctoral"
                  />

                </div>

                <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">

                  <div className="flex gap-3">

                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-cyan-300"
                      size={19}
                    />

                    <p className="text-sm leading-6 text-slate-300">
                      Get step-by-step guidance from choosing the right
                      research area to completing your PhD admission process.
                    </p>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================================
          QUICK INFO
      ========================================================= */}

      <section className="relative z-20 -mt-8 px-6 lg:px-10">

        <div className="mx-auto grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <QuickCard
            icon={Clock3}
            title="Duration"
            value="3–6 Years"
          />

          <QuickCard
            icon={GraduationCap}
            title="Qualification"
            value="Postgraduate Degree"
          />

          <QuickCard
            icon={FileText}
            title="Admission"
            value="Entrance / Interview"
          />

          <QuickCard
            icon={IndianRupee}
            title="Fees"
            value="University Specific"
          />

        </div>

      </section>

      {/* =========================================================
          OVERVIEW
      ========================================================= */}

      <section
        id="phd-overview"
        className="px-6 py-24 lg:px-10"
      >

        <div className="mx-auto max-w-[1200px]">

          <SectionTitle
            eyebrow="PhD Overview"
            title="Everything You Need To Know About PhD"
            description="Understand the doctoral journey before you take your next academic step."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-2">

            <InfoCard
              icon={GraduationCap}
              title="What is a PhD?"
            >
              A PhD, or Doctor of Philosophy, is an advanced research degree
              focused on producing original knowledge in a particular field.
              Doctoral candidates investigate a research problem, conduct
              detailed academic work and contribute meaningful findings to
              their discipline.
            </InfoCard>

            <InfoCard
              icon={Microscope}
              title="What does a PhD involve?"
            >
              A doctoral programme generally involves coursework, literature
              review, research methodology, proposal development, data
              collection, analysis, thesis writing, publication and a final
              thesis defence or viva-voce, depending on the university.
            </InfoCard>

          </div>

        </div>

      </section>

      {/* =========================================================
          ELIGIBILITY
      ========================================================= */}

      <section className="bg-white px-6 py-24 lg:px-10">

        <div className="mx-auto max-w-[1200px]">

          <SectionTitle
            eyebrow="Eligibility"
            title="Who Can Apply For a PhD?"
            description="Eligibility requirements can vary between universities and disciplines."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-2">

            <div
              className="
                rounded-[28px]
                border
                border-slate-200
                bg-slate-50
                p-7
                sm:p-9
              "
            >

              <h3 className="text-2xl font-bold text-slate-900">
                Common Eligibility Requirements
              </h3>

              <div className="mt-7 space-y-4">

                {[
                  "Relevant postgraduate degree from a recognized institution.",
                  "Required minimum percentage or CGPA as specified by the university.",
                  "Relevant academic or subject background for the selected research area.",
                  "Qualification in an entrance examination where applicable.",
                  "Research proposal or statement of purpose where required.",
                  "Successful performance in the interview or research presentation.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3"
                  >
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-cyan-600"
                      size={20}
                    />

                    <p className="text-sm leading-6 text-slate-600">
                      {item}
                    </p>
                  </div>
                ))}

              </div>

            </div>

            <div
              className="
                rounded-[28px]
                bg-gradient-to-br
                from-sky-950
                via-slate-900
                to-cyan-950
                p-7
                text-white
                shadow-2xl
                sm:p-9
              "
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
                <FileText size={27} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Important Note
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                PhD eligibility is not identical across all universities.
                Some institutions may have additional requirements related to
                entrance examinations, NET/JRF qualification, research
                experience, publications, subject background or interviews.
              </p>

              <a
                href="#enquiry"
                className="
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-cyan-500
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-cyan-400
                "
              >
                Check My Eligibility

                <ArrowRight size={17} />
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          SPECIALIZATIONS
      ========================================================= */}

      <section className="px-6 py-24 lg:px-10">

        <div className="mx-auto max-w-[1200px]">

          <SectionTitle
            eyebrow="Specializations"
            title="Popular PhD Research Areas"
            description="Choose a research direction aligned with your academic background and long-term goals."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {specializations.map((item, index) => (
              <motion.div
                key={item}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.03,
                }}
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  shadow-sm
                  transition
                  hover:-translate-y-1
                  hover:border-cyan-200
                  hover:shadow-xl
                "
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 transition group-hover:bg-cyan-500 group-hover:text-white">
                    <GraduationCap size={19} />
                  </div>

                  <span className="font-semibold text-slate-800">
                    {item}
                  </span>

                </div>

              </motion.div>
            ))}

          </div>

        </div>

      </section>

      {/* =========================================================
          RESEARCH AREAS
      ========================================================= */}

      <section className="bg-slate-950 px-6 py-24 lg:px-10">

        <div className="mx-auto max-w-[1200px]">

          <SectionTitle
            dark
            eyebrow="Research Journey"
            title="Build Expertise Through Research"
            description="A PhD gives you the opportunity to investigate meaningful problems and contribute original knowledge."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {researchAreas.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    rounded-[26px]
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-6
                    backdrop-blur-xl
                    transition
                    hover:-translate-y-1
                    hover:bg-white/[0.07]
                  "
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* =========================================================
          ADMISSION PROCESS
      ========================================================= */}

      <section className="px-6 py-24 lg:px-10">

        <div className="mx-auto max-w-[1200px]">

          <SectionTitle
            eyebrow="Admission Process"
            title="Your PhD Journey, Step by Step"
            description="Understand the typical stages involved in doctoral admission."
          />

          <div className="relative mt-16">

            <div className="absolute left-6 top-6 hidden h-[calc(100%-48px)] w-px bg-gradient-to-b from-cyan-400 via-sky-200 to-transparent md:block" />

            <div className="space-y-7">

              {admissionSteps.map((step) => (
                <div
                  key={step.number}
                  className="relative flex gap-5 md:gap-8"
                >

                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-cyan-500
                      to-sky-600
                      text-sm
                      font-black
                      text-white
                      shadow-lg
                      shadow-cyan-500/20
                    "
                  >
                    {step.number}
                  </div>

                  <div
                    className="
                      flex-1
                      rounded-[24px]
                      border
                      border-slate-200
                      bg-white
                      p-5
                      shadow-sm
                      sm:p-6
                    "
                  >

                    <h3 className="text-lg font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          FEES + CAREER
      ========================================================= */}

      <section className="bg-white px-6 py-24 lg:px-10">

        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-2">

          <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-7 sm:p-9">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
              <IndianRupee size={26} />
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-900">
              PhD Fees
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              PhD fees vary significantly depending on the university,
              discipline, research facilities, programme structure and
              institution type.
            </p>

            <div className="mt-6 space-y-3">

              {[
                "Tuition and programme fees",
                "Registration and examination fees",
                "Research or laboratory charges",
                "Thesis and evaluation charges",
                "Other university-specific charges",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-700"
                >
                  <CheckCircle2
                    size={18}
                    className="text-cyan-600"
                  />

                  {item}
                </div>
              ))}

            </div>

          </div>

          <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-7 sm:p-9">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
              <BriefcaseBusiness size={26} />
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-900">
              Career Opportunities After PhD
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              A PhD can open opportunities across academia, research,
              industry, technology, government and specialized professional
              roles.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              {[
                "University Professor",
                "Research Scientist",
                "R&D Specialist",
                "Industry Researcher",
                "Government Research",
                "Academic Consultant",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  {item}
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          WHY NEXTGEN
      ========================================================= */}

      <section className="px-6 py-24 lg:px-10">

        <div
          className="
            mx-auto
            max-w-[1200px]
            overflow-hidden
            rounded-[36px]
            bg-gradient-to-br
            from-sky-950
            via-slate-900
            to-cyan-950
            p-8
            shadow-2xl
            sm:p-12
          "
        >

          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                Why NextGenEdu
              </span>

              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                Get Guidance For Every Step Of Your PhD Journey
              </h2>

              <p className="mt-5 leading-7 text-slate-300">
                From selecting universities and research areas to preparing
                your application, our counselling support helps you make
                informed academic decisions.
              </p>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {[
                {
                  icon: Building2,
                  title: "University Selection",
                },
                {
                  icon: Users,
                  title: "Personalized Counselling",
                },
                {
                  icon: FileText,
                  title: "Application Guidance",
                },
                {
                  icon: Trophy,
                  title: "Admission Support",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      p-5
                    "
                  >

                    <Icon
                      size={23}
                      className="text-cyan-300"
                    />

                    <h3 className="mt-4 font-bold text-white">
                      {item.title}
                    </h3>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          FAQ
      ========================================================= */}

      <section className="bg-slate-50 px-6 py-24 lg:px-10">

        <div className="mx-auto max-w-[900px]">

          <SectionTitle
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Quick answers to common questions about PhD programmes and admissions."
          />

          <div className="mt-12 space-y-4">

            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                  "
                >

                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-5
                      px-5
                      py-5
                      text-left
                    "
                  >

                    <span className="font-bold text-slate-800">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={19}
                      className={`shrink-0 text-cyan-600 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />

                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 px-5 pb-5 pt-4">

                      <p className="text-sm leading-7 text-slate-600">
                        {faq.answer}
                      </p>

                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* =========================================================
          CONTACT / ENQUIRY
      ========================================================= */}

      <section
        id="enquiry"
        className="relative overflow-hidden bg-gradient-to-br from-sky-950 via-slate-900 to-cyan-950 px-6 py-24 lg:px-10"
      >

        <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-[130px]" />

        <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[130px]" />

        <div className="relative z-10 mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.85fr_1.15fr]">

          {/* LEFT */}

          <div className="text-white">

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
              Start Your Journey
            </span>

            <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
              Planning Your PhD?
              <br />
              Let's Talk.
            </h2>

            <p className="mt-6 max-w-lg leading-7 text-slate-300">
              Share your details with us and our counselling team will help
              you understand suitable PhD opportunities, universities,
              eligibility and admission requirements.
            </p>

            <div className="mt-8 space-y-4">

              <ContactPoint
                icon={Phone}
                text="Talk to an admission counsellor"
              />

              <ContactPoint
                icon={Mail}
                text="Get personalized admission guidance"
              />

              <ContactPoint
                icon={GraduationCap}
                text="Explore suitable PhD opportunities"
              />

            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="
              rounded-[30px]
              border
              border-white/10
              bg-white/[0.07]
              p-6
              shadow-2xl
              backdrop-blur-2xl
              sm:p-8
            "
          >

            <div className="mb-7">

              <h3 className="text-2xl font-black text-white">
                Get PhD Counselling
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Fill in your details and we'll get in touch.
              </p>

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <InputField
                label="Full Name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />

              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              <InputField
                label="Phone Number"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />

              <InputField
                label="Interested Programme"
                name="course"
                value={formData.course}
                onChange={handleChange}
              />

            </div>

            <div className="mt-5">

              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Message
              </label>

              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your academic background or PhD interest..."
                className="
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/20
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-slate-500
                  focus:border-cyan-400
                "
              />

            </div>

            <button
              type="submit"
              className="
                mt-6
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-sky-500
                px-6
                py-4
                font-bold
                text-white
                shadow-xl
                shadow-cyan-500/20
                transition
                hover:-translate-y-0.5
              "
            >
              Submit Enquiry

              <Send size={18} />
            </button>

            <p className="mt-4 text-center text-xs text-slate-500">
              Your information will only be used for admission counselling.
            </p>

          </form>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function HeroInfo({ icon: Icon, title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
      <Icon size={20} className="text-cyan-300" />

      <p className="mt-3 text-xs text-slate-400">
        {title}
      </p>

      <p className="mt-1 font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function QuickCard({ icon: Icon, title, value }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-xl
        shadow-slate-900/5
      "
    >
      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
          <Icon size={21} />
        </div>

        <div>

          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-1 font-bold text-slate-900">
            {value}
          </p>

        </div>

      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
  dark = false,
}) {
  return (
    <div className="max-w-3xl">

      <span
        className={`text-sm font-bold uppercase tracking-[0.18em] ${
          dark ? "text-cyan-300" : "text-cyan-600"
        }`}
      >
        {eyebrow}
      </span>

      <h2
        className={`mt-3 text-3xl font-black sm:text-4xl ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>

      <p
        className={`mt-4 leading-7 ${
          dark ? "text-slate-400" : "text-slate-600"
        }`}
      >
        {description}
      </p>

    </div>
  );
}

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-7 sm:p-9">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
        <Icon size={27} />
      </div>

      <h3 className="mt-6 text-2xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600">
        {children}
      </p>

    </div>
  );
}

function ContactPoint({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
        <Icon size={19} />
      </div>

      <span className="text-sm text-slate-300">
        {text}
      </span>

    </div>
  );
}

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-black/20
          px-4
          py-3.5
          text-sm
          text-white
          outline-none
          placeholder:text-slate-500
          focus:border-cyan-400
        "
      />

    </div>
  );
}