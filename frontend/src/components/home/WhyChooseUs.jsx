import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import {
  GraduationCap,
  Users,
  Award,
  ShieldCheck,
  Star,
  ArrowRight,
  BadgeCheck,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Headphones,
} from "lucide-react";

/* ==========================================================
   STATS
========================================================== */

const stats = [
  {
    icon: GraduationCap,
    value: 250,
    suffix: "+",
    title: "University Partners",
    desc: "UGC Approved Universities",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    gradient: "from-blue-500 to-cyan-500",
  },

  {
    icon: Users,
    value: 30000,
    suffix: "+",
    title: "Students Guided",
    desc: "Across India",
    bg: "bg-green-50",
    iconColor: "text-green-600",
    gradient: "from-green-500 to-emerald-500",
  },

  {
    icon: TrendingUp,
    value: 98,
    suffix: "%",
    title: "Admission Success",
    desc: "Verified Counselling",
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
    gradient: "from-purple-500 to-fuchsia-500",
  },

  {
    icon: Star,
    value: 4.9,
    decimals: 1,
    suffix: "/5",
    title: "Student Rating",
    desc: "Trusted Experience",
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
    gradient: "from-amber-500 to-orange-500",
  },
];

/* ==========================================================
   FEATURE CARDS
========================================================== */

const features = [
  {
    icon: GraduationCap,
    title: "250+ University Partners",
    description:
      "Choose from India's leading UGC approved universities offering Online, Distance and Regular degree programs.",

    color: {
      bg: "bg-blue-50",
      icon: "text-blue-600",
      border: "group-hover:border-blue-300",
      glow: "group-hover:shadow-blue-200/60",
    },
  },

  {
    icon: Users,
    title: "Expert Admission Counsellors",
    description:
      "Receive personalized counselling from experienced education experts to choose the right university.",

    color: {
      bg: "bg-green-50",
      icon: "text-green-600",
      border: "group-hover:border-green-300",
      glow: "group-hover:shadow-green-200/60",
    },
  },

  {
    icon: Award,
    title: "Complete Admission Support",
    description:
      "Application, documentation, verification and admission confirmation—we assist throughout your journey.",

    color: {
      bg: "bg-amber-50",
      icon: "text-amber-600",
      border: "group-hover:border-amber-300",
      glow: "group-hover:shadow-amber-200/60",
    },
  },

  {
    icon: ShieldCheck,
    title: "Trusted by Thousands",
    description:
      "More than 30,000 students across India trust NextGenEdu for transparent admission guidance.",

    color: {
      bg: "bg-purple-50",
      icon: "text-purple-600",
      border: "group-hover:border-purple-300",
      glow: "group-hover:shadow-purple-200/60",
    },
  },
];

/* ==========================================================
   GOVERNMENT APPROVALS
========================================================== */

const approvals = [
  {
    icon: ShieldCheck,
    title: "UGC Approved",
    desc: "Recognized by University Grants Commission",
    bg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },

  {
    icon: Award,
    title: "NAAC Accredited",
    desc: "Quality Assured Institutions",
    bg: "bg-green-100",
    iconColor: "text-green-600",
  },

  {
    icon: GraduationCap,
    title: "AICTE Approved",
    desc: "Technical Education Recognition",
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },

  {
    icon: BadgeCheck,
    title: "NIRF Ranked",
    desc: "India's Top Ranked Universities",
    bg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
];

/* ==========================================================
   TRUST POINTS
========================================================== */

const trustPoints = [
  "100% Transparent Admission Process",
  "No Hidden Charges",
  "Dedicated Admission Counsellor",
  "Scholarship Guidance",
  "Instant Application Support",
  "Career Assistance",
];

/* ==========================================================
   ANIMATION VARIANTS
========================================================== */

const containerVariants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function WhyChooseUs() {
  const navigate = useNavigate();

  /* =========================================================
   STATISTICS
========================================================= */

  const statsData = [
    {
      icon: GraduationCap,
      value: "250+",
      label: "University Partners",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Users,
      value: "30K+",
      label: "Students Guided",
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: Star,
      value: "4.9★",
      label: "Student Rating",
      bg: "bg-amber-50",
      iconColor: "text-amber-500",
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Success Rate",
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  /* =========================================================
   FEATURES
========================================================= */

  const featuresData = [
    {
      icon: GraduationCap,
      title: "250+ University Partners",
      description:
        "Choose from India's leading UGC-approved universities offering online and distance education programs.",
      color: "blue",
    },
    {
      icon: Users,
      title: "Expert Counsellors",
      description:
        "Dedicated admission experts guide you from course selection to successful enrollment.",
      color: "green",
    },
    {
      icon: Award,
      title: "Complete Admission Support",
      description:
        "Application, documentation, verification and admission confirmation—all handled for you.",
      color: "amber",
    },
    {
      icon: ShieldCheck,
      title: "Trusted by Students",
      description:
        "Thousands of students across India trust NextGenEdu for higher education guidance.",
      color: "purple",
    },
  ];

  /* =========================================================
   TRUST BADGES
========================================================= */

  const badgesData = [
    {
      icon: ShieldCheck,
      title: "UGC Approved",
      bg: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      icon: Award,
      title: "NAAC Accredited",
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: GraduationCap,
      title: "AICTE Recognized",
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Star,
      title: "Top Rated Guidance",
      bg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  /* =========================================================
   FRAMER MOTION
========================================================= */

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },

    show: {
      opacity: 1,
      y: 0,
      scale: 1,

      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50 to-cyan-50 py-28">

  {/* ================= Background Blur ================= */}

  <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-cyan-300/20 blur-[160px]" />

  <div className="absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-blue-300/20 blur-[170px]" />

  <div className="absolute bottom-0 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-sky-300/20 blur-[160px]" />

  {/* Grid Pattern */}

  <div
    className="
      absolute
      inset-0
      opacity-[0.05]
      [background-image:radial-gradient(#0ea5e9_1px,transparent_1px)]
      [background-size:28px_28px]
    "
  />

  <div className="relative z-10 mx-auto max-w-7xl px-6">

    {/* ================= Heading ================= */}

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >

      {/* Top Badge */}

      <div
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-cyan-200
          bg-white
          px-6
          py-3
          shadow-lg
        "
      >
        <Star
          size={18}
          className="fill-cyan-500 text-cyan-500"
        />

        <span className="font-semibold text-cyan-700">
          Trusted by 30,000+ Students Across India
        </span>
      </div>

      {/* Main Heading */}

      <h2
        className="
          mt-8
          text-4xl
          font-black
          leading-tight
          text-slate-900
          md:text-5xl
          lg:text-6xl
        "
      >
        Why Choose

        <span
          className="
            bg-gradient-to-r
            from-cyan-600
            via-sky-600
            to-blue-600
            bg-clip-text
            text-transparent
          "
        >
          NextGenEdu
        </span>
      </h2>

      {/* Description */}

      <p
        className="
          mx-auto
          mt-7
          max-w-3xl
          text-sm
          leading-6
          text-slate-600
        "
      >
        We simplify university admissions through expert counselling,
        verified university partnerships, transparent guidance and
        complete admission support—helping students achieve their
        academic and career goals with confidence.
      </p>

    </motion.div>

    {/* Space */}

    <div className="mt-20" />
    {/* =========================================================
    PREMIUM STATISTICS
========================================================= */}

<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="grid gap-7 md:grid-cols-2 xl:grid-cols-4"
>
  {statsData.map((stat) => {
    const Icon = stat.icon;

    return (
      <motion.div
        key={stat.label}
        variants={cardVariants}
        whileHover={{
          y: -12,
          scale: 1.03,
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          group
          relative
          overflow-hidden
          rounded-[34px]
          border
          border-slate-200/70
          bg-white/90
          p-5
          backdrop-blur-xl
          shadow-[0_20px_60px_rgba(15,23,42,.08)]
          transition-all
          duration-500
          hover:border-cyan-300
          hover:shadow-[0_30px_70px_rgba(14,165,233,.18)]
          min-h-[100px]
        "
      >

        {/* Hover Background */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-cyan-50
            via-white
            to-blue-50
            opacity-0
            transition-all
            duration-500
            group-hover:opacity-100
          "
        />

        {/* Animated Top Border */}

        <div
          className="
            absolute
            top-0
            left-0
            h-1
            w-0
            bg-gradient-to-r
            from-cyan-500
            via-blue-500
            to-cyan-500
            transition-all
            duration-500
            group-hover:w-full
          "
        />

        <div className="relative flex items-center gap-5">

          {/* Icon */}

          <div
            className={`
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-[20px]
              ${stat.bg}
              shadow-inner
            `}
          >
            <Icon
              size={28}
              className={stat.iconColor}
            />
          </div>

          {/* Text */}

          <div>

            <h3
              className={`
                text-3xl
                font-black
                leading-none
                ${stat.iconColor}
              `}
            >
              {stat.value}
            </h3>

            <p
              className="
                mt-1
                text-sm
                font-semibold
                text-slate-700
              "
            >
              {stat.label}
            </p>

          </div>

        </div>

        {/* Floating Glow */}

        <div
          className="
            absolute
            -right-12
            -top-12
            h-32
            w-32
            rounded-full
            bg-cyan-300/20
            blur-3xl
            opacity-0
            transition-all
            duration-700
            group-hover:opacity-100
          "
        />

      </motion.div>
    );
  })}
</motion.div>

<div className="mt-24" />
{/* =========================================================
    PREMIUM FEATURE CARDS
========================================================= */}

<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="grid gap-8 md:grid-cols-2 xl:grid-cols-4"
>
  {featuresData.map((feature) => {
    const Icon = feature.icon;

    const colors = {
      blue: {
        bg: "bg-blue-50",
        icon: "text-blue-600",
        arrow: "bg-blue-100 text-blue-600",
      },
      green: {
        bg: "bg-green-50",
        icon: "text-green-600",
        arrow: "bg-green-100 text-green-600",
      },
      amber: {
        bg: "bg-amber-50",
        icon: "text-amber-600",
        arrow: "bg-amber-100 text-amber-600",
      },
      purple: {
        bg: "bg-purple-50",
        icon: "text-purple-600",
        arrow: "bg-purple-100 text-purple-600",
      },
    };

    const c = colors[feature.color];

    return (
      <motion.div
        key={feature.title}
        variants={cardVariants}
        whileHover={{
          y: -14,
          scale: 1.03,
        }}
        transition={{ duration: 0.35 }}
        className="
          group
          relative
          overflow-hidden
          rounded-[34px]
          border
          border-slate-200
          bg-white/95
          p-4
          backdrop-blur-xl
          shadow-[0_20px_60px_rgba(15,23,42,.08)]
          transition-all
          duration-500
          hover:border-cyan-300
          hover:shadow-[0_35px_80px_rgba(14,165,233,.18)]
          flex
          items-center
          gap-4
          min-h-[110px]
        "
      >
        {/* Hover Gradient */}

        <div
          className="
            absolute
            inset-0
            opacity-0
            transition-all
            duration-500
            group-hover:opacity-100
            bg-gradient-to-br
            from-cyan-50
            via-white
            to-blue-50
          "
        />

        {/* Animated Top Border */}

        <div
          className="
            absolute
            top-0
            left-0
            h-1
            w-0
            bg-gradient-to-r
            from-cyan-500
            via-blue-500
            to-cyan-500
            transition-all
            duration-500
            group-hover:w-full
          "
        />

        {/* Icon */}

        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.08,
          }}
          className={`
            relative
            flex
            h-16
            w-16
            flex-shrink-0
            items-center
            justify-center
            rounded-[20px]
            ${c.bg}
            shadow-inner
          `}
        >
          <Icon
            size={32}
            className={c.icon}
          />
        </motion.div>

        {/* Content */}

        <div className="relative flex-1">
          {/* Title */}

          <h3
            className="
              text-base
              font-black
              leading-snug
              text-slate-900
            "
          >
            {feature.title}
          </h3>

          {/* Description */}

          <p
            className="
              mt-1
              text-[12px]
              leading-5
              text-slate-600
            "
          >
            {feature.description}
          </p>
        </div>

        {/* Floating Glow */}

        <div
          className="
            absolute
            -right-16
            -top-16
            h-40
            w-40
            rounded-full
            bg-cyan-300/10
            blur-3xl
            opacity-0
            transition-all
            duration-700
            group-hover:opacity-100
          "
        />
      </motion.div>
    );
  })}
</motion.div>

<div className="mt-24" />
{/* =========================================================
    TRUST & ACCREDITATION
========================================================= */}



<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="
    rounded-[40px]
    border
    border-slate-200
    bg-white/90
    p-10
    backdrop-blur-xl
    shadow-[0_25px_70px_rgba(15,23,42,.08)]
  "
>

  {/* Heading */}

  <div className="text-center">

    <span
      className="
        inline-flex
        items-center
        rounded-full
        bg-cyan-100
        px-5
        py-2
        text-sm
        font-semibold
        text-cyan-700
      "
    >
      Trusted & Recognized
    </span>

    <h2
      className="
        mt-5
        text-4xl
        md:text-5xl
        font-black
        text-slate-900
      "
    >
      Government Approved Universities
    </h2>

    <p
      className="
        mx-auto
        mt-5
        max-w-3xl
        text-lg
        leading-8
        text-slate-600
      "
    >
      Every university listed on NextGenEdu is verified by
      government authorities to ensure students receive
      recognized, valuable and career-oriented degrees.
    </p>

  </div>

  {/* Cards */}

  <div
  className="
    mt-14
    grid
    grid-cols-2
    md:grid-cols-2
    lg:grid-cols-4
    gap-6
    max-w-5xl
    mx-auto
  "
>

    {badgesData.map((badge) => {

      const Icon = badge.icon;

      return (

        <motion.div
          key={badge.title}
          whileHover={{
            y: -8,
            scale: 1.05,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            group
            relative
            overflow-hidden
            rounded-[20px]
            border
            border-slate-200
            bg-slate-50
            p-4
            text-left
            transition-all
            duration-500
            hover:border-cyan-300
            hover:bg-white
            hover:shadow-[0_15px_40px_rgba(14,165,233,.12)]
            flex
            items-center
            gap-3
            min-h-[80px]
          "
        >

          {/* Glow */}

          <div
            className="
              absolute
              inset-0
              opacity-0
              transition-all
              duration-500
              group-hover:opacity-100
              bg-gradient-to-br
              from-cyan-50
              via-white
              to-blue-50
            "
          />

          {/* Icon */}

          <div
            className={`
              relative
              flex
              h-14
              w-14
              flex-shrink-0
              items-center
              justify-center
              rounded-2xl
              ${badge.bg}
            `}
          >
            <Icon
              size={24}
              className={badge.iconColor}
            />
          </div>

          {/* Content */}

          <div className="relative flex-1">
            {/* Title */}

            <h3
              className="
                text-sm
                font-black
                text-slate-900
              "
            >
              {badge.title}
            </h3>

            {/* Description */}

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-slate-600
              "
            >
              Verified & recognized
            </p>
          </div>

        </motion.div>

      );

    })}

  </div>





  {/* Bottom Statistics */}

  <div className="mt-16 grid gap-8 md:grid-cols-4 text-center">

    <div>
      <h3 className="text-5xl font-black text-cyan-600">
        250+
      </h3>

      <p className="mt-2 text-slate-600">
        Universities
      </p>
    </div>

    <div>
      <h3 className="text-5xl font-black text-green-600">
        30K+
      </h3>

      <p className="mt-2 text-slate-600">
        Students Guided
      </p>
    </div>

    <div>
      <h3 className="text-5xl font-black text-blue-600">
        98%
      </h3>

      <p className="mt-2 text-slate-600">
        Success Rate
      </p>
    </div>

    <div>
      <h3 className="text-5xl font-black text-amber-500">
        24×7
      </h3>

      <p className="mt-2 text-slate-600">
        Expert Support
      </p>
    </div>

  </div>

</motion.div>

<div className="mt-24" />
{/* =========================================================
    PREMIUM CTA SECTION
========================================================= */}

<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="
    relative
    overflow-hidden
    rounded-[42px]
    bg-gradient-to-r
    from-cyan-600
    via-sky-600
    to-blue-700
    px-8
    py-12
    md:px-12
    shadow-[0_35px_90px_rgba(8,145,178,.35)]
  "
>

  {/* Background Glow */}

  <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

  <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-300/20 blur-[130px]" />

  <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-300/20 blur-[140px]" />

  {/* Grid Pattern */}

  <div
    className="
      absolute
      inset-0
      opacity-10
      [background-image:radial-gradient(white_1px,transparent_1px)]
      [background-size:28px_28px]
    "
  />

  <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2">

    {/* Left Side */}

    <div>

      <span
        className="
          inline-flex
          items-center
          rounded-full
          bg-white/20
          px-4
          py-1
          text-xs
          font-semibold
          text-white
          backdrop-blur-xl
        "
      >
        🎓 Admissions Open 2026
      </span>

      <h2
        className="
          mt-4
          text-2xl
          font-black
          leading-tight
          text-white
          md:text-4xl
        "
      >
        Your Dream
        <br />
        University Starts
        <br />
        Here.
      </h2>

      <p
        className="
          mt-4
          max-w-xl
          text-sm
          leading-6
          text-cyan-100
        "
      >
        Get expert counselling, verified university admission,
        scholarship guidance and complete admission support
        from India's trusted education platform.
      </p>

      {/* Buttons */}

      <div className="mt-6 flex flex-wrap gap-3">

        <button
          onClick={() => navigate("/contact")}
          className="
            rounded-xl
            bg-white
            px-6
            py-2
            text-sm
            font-bold
            text-cyan-700
            shadow-xl
            transition-all
            duration-300
            hover:scale-105
          "
        >
          Apply Now
        </button>

        <button
          onClick={() => navigate("/contact")}
          className="
            rounded-xl
            border
            border-white/30
            bg-white/10
            px-6
            py-2
            text-sm
            font-bold
            text-white
            backdrop-blur-xl
            transition-all
            duration-300
            hover:bg-white/20
          "
        >
          Talk to Counsellor
        </button>

      </div>

    </div>

    {/* Right Glass Card */}

    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="
        rounded-[34px]
        border
        border-white/30
        bg-gradient-to-br
        from-cyan-500/40
        to-blue-600/40
        p-6
        backdrop-blur-2xl
      "
    >

      <div className="space-y-4">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-cyan-400">

            <GraduationCap
              size={24}
              className="text-cyan-700"
            />

          </div>

          <div>

            <h3 className="text-lg font-black text-white">
              250+
            </h3>

            <p className="text-sm text-white/90">
              University Partners
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-300 to-blue-400">

            <Users
              size={24}
              className="text-blue-700"
            />

          </div>

          <div>

            <h3 className="text-lg font-black text-white">
              30K+
            </h3>

            <p className="text-sm text-white/90">
              Students Guided
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-300 to-green-400">

            <ShieldCheck
              size={24}
              className="text-green-700"
            />

          </div>

          <div>

            <h3 className="text-lg font-black text-white">
              98%
            </h3>

            <p className="text-sm text-white/90">
              Admission Success
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-300 to-purple-400">

            <Headphones
              size={24}
              className="text-purple-700"
            />

          </div>

          <div>

            <h3 className="text-lg font-black text-white">
              24×7
            </h3>

            <p className="text-sm text-white/90">
              Expert Support
            </p>

          </div>

        </div>

      </div>

    </motion.div>

  </div>

</motion.div>

<div className="mt-24" />




{/* =========================================================
    FINAL TRUST BAR
========================================================= */}

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="
    relative
    overflow-hidden
    rounded-[40px]
    bg-gradient-to-r
    from-slate-900
    via-cyan-900
    to-blue-900
    p-10
    md:p-14
    shadow-[0_30px_80px_rgba(2,132,199,.30)]
  "
>

  {/* Glow */}

  <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-[130px]" />

  <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-blue-500/20 blur-[140px]" />

  {/* Grid */}

  <div className="relative z-10 grid gap-10 lg:grid-cols-2 items-center">

    {/* Left */}

    <div>

      <span
        className="
          inline-flex
          rounded-full
          bg-white/10
          border
          border-white/20
          px-5
          py-2
          text-sm
          font-semibold
          text-cyan-100
          backdrop-blur-xl
        "
      >
        🚀 India's Trusted Education Platform
      </span>

      <h2
        className="
          mt-6
          text-4xl
          md:text-5xl
          font-black
          leading-tight
          text-white
        "
      >
        Your Success
        <br />
        Is Our Mission
      </h2>

      <p
        className="
          mt-6
          max-w-xl
          text-lg
          leading-8
          text-cyan-100
        "
      >
        Join thousands of students who have successfully secured
        admission to India's top universities through NextGenEdu.
      </p>

    </div>

    {/* Right Stats */}

    <div className="grid grid-cols-2 gap-6">

      <div className="rounded-3xl bg-white/10 p-6 text-center backdrop-blur-xl">

        <h3 className="text-5xl font-black text-white">
          250+
        </h3>

        <p className="mt-2 text-cyan-100">
          Universities
        </p>

      </div>

      <div className="rounded-3xl bg-white/10 p-6 text-center backdrop-blur-xl">

        <h3 className="text-5xl font-black text-white">
          30K+
        </h3>

        <p className="mt-2 text-cyan-100">
          Students
        </p>

      </div>

      <div className="rounded-3xl bg-white/10 p-6 text-center backdrop-blur-xl">

        <h3 className="text-5xl font-black text-white">
          98%
        </h3>

        <p className="mt-2 text-cyan-100">
          Success
        </p>

      </div>

      <div className="rounded-3xl bg-white/10 p-6 text-center backdrop-blur-xl">

        <h3 className="text-5xl font-black text-white">
          24×7
        </h3>

        <p className="mt-2 text-cyan-100">
          Support
        </p>

      </div>

    </div>

  </div>

</motion.div>

</div>
</section>
  );}