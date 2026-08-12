import {
  Building2,
  GraduationCap,
  ClipboardCheck,
  Award,
  BookOpen,
  Users,
  Landmark,
  Laptop,
  School,
  BriefcaseBusiness,
  Globe2,
  Library,
  ShieldCheck,
} from "lucide-react";

// ======================================================
// ANNOUNCEMENTS
// ======================================================

export const announcements = [
  {
    id: 1,
    text: "Admissions Open 2026 • Apply Now for Top Indian Universities",
  },
  {
    id: 2,
    text: "Get FREE Career Counselling from Expert Admission Consultants",
  },
  {
    id: 3,
    text: "UG • PG • Diploma • PhD Admissions Across India",
  },
];

// ======================================================
// NAVIGATION
// ======================================================

export const navLinks = [
  // ======================================================
  // HOME
  // ======================================================

  {
    title: "Home",
    path: "/",
  },

  // ======================================================
  // UNIVERSITIES
  // ======================================================

  {
    title: "Universities",
    megaMenu: true,

    sections: [
      {
        title: "Browse Universities",

        items: [
          {
            title: "All Universities",
            path: "/universities",
            icon: Building2,
            description:
              "Browse all partner universities across India.",
          },

          {
            title: "Government Universities",
            path: "/universities/type/government",
            icon: Landmark,
            description:
              "Explore Central & State Government Universities.",
          },

          {
            title: "Private Universities",
            path: "/universities/type/private",
            icon: Building2,
            description:
              "Discover India's leading private universities.",
          },

          {
            title: "Online Universities",
            path: "/universities/type/online",
            icon: Laptop,
            description:
              "Explore universities offering online programs.",
          },
        ],
      },

      {
        title: "Popular Categories",

        items: [
          {
            title: "Distance Universities",
            path: "/universities/type/distance",
            icon: Globe2,
            description:
              "Explore universities offering distance programs.",
          },

          {
            title: "NAAC Accredited",
            path: "/universities/type/naac",
            icon: Award,
            description:
              "Highly rated NAAC accredited institutions.",
          },

          {
            title: "UGC Approved",
            path: "/universities/type/ugc",
            icon: ShieldCheck,
            description:
              "Recognized by the University Grants Commission.",
          },

          {
            title: "Top Ranked Universities",
            path: "/universities/type/top",
            icon: School,
            description:
              "Explore top ranked universities.",
          },
        ],
      },
    ],
  },

  // ======================================================
  // COURSES
  // ======================================================

  {
    title: "Courses",
    megaMenu: true,

    sections: [
      {
        title: "Course Categories",

        items: [
          {
            title: "Diploma Courses",
            path: "/courses",
            icon: GraduationCap,
            description:
              "Career-oriented diploma programs.",
          },

          {
            title: "Undergraduate (UG)",
            path: "/courses",
            icon: GraduationCap,
            description:
              "B.Tech, BBA, BCA, BA, B.Com, B.Sc and more.",
          },

          {
            title: "Postgraduate (PG)",
            path: "/courses",
            icon: GraduationCap,
            description:
              "MBA, MCA, M.Tech, MA, M.Com and more.",
          },

          {
            title: "PhD Programs",
            path: "/phd",
            icon: Library,
            description:
              "Doctoral & research degree programs.",
          },
        ],
      },

      {
        title: "Professional Programs",

        items: [
          {
            title: "Engineering",
            path: "/courses",
            icon: BriefcaseBusiness,
            description:
              "Engineering & Technology programs.",
          },

          {
            title: "Management",
            path: "/courses",
            icon: Users,
            description:
              "Business, MBA & management studies.",
          },

          {
            title: "Medical & Healthcare",
            path: "/courses",
            icon: Award,
            description:
              "Medical, Nursing & Allied Health courses.",
          },

          {
            title: "Law & Legal Studies",
            path: "/courses",
            icon: BookOpen,
            description:
              "LLB, LLM & legal education programs.",
          },
        ],
      },
    ],
  },

  // ======================================================
  // ADMISSIONS
  // ======================================================

  {
    title: "Admissions",
    megaMenu: true,

    sections: [
      {
        title: "Admission Support",

        items: [
          {
            title: "Admission Process",
            path: "/admission-process",
            icon: ClipboardCheck,
            description:
              "Complete step-by-step admission guidance.",
          },

          {
            title: "Eligibility Criteria",
            path: "/eligibility-criteria",
            icon: Award,
            description:
              "Check course-wise eligibility requirements.",
          },

          {
            title: "Documents Required",
            path: "/admission-process",
            icon: BookOpen,
            description:
              "Prepare all required admission documents.",
          },

          {
            title: "How to Apply",
            path: "/how-to-apply",
            icon: GraduationCap,
            description:
              "Easy online application process explained.",
          },
        ],
      },

      {
        title: "Admission Assistance",

        items: [
          {
            title: "Application Tracking",
            path: "/admission-process",
            icon: ClipboardCheck,
            description:
              "Track your admission application status.",
          },

          {
            title: "Counselling Support",
            path: "/contact",
            icon: Users,
            description:
              "Talk with our expert admission counsellors.",
          },

          {
            title: "Document Verification",
            path: "/admission-process",
            icon: ShieldCheck,
            description:
              "Get your documents verified before admission.",
          },

          {
            title: "Admission FAQs",
            path: "/admission-faq",
            icon: BookOpen,
            description:
              "Frequently asked admission questions.",
          },
        ],
      },
    ],
  },

  // ======================================================
  // RESEARCH
  // ======================================================

  {
    title: "Research",
    megaMenu: true,

    sections: [
      {
        title: "Compare & Research",

        items: [
          {
            title: "University Comparison",
            path: "/compare",
            icon: Building2,
            description:
              "Compare universities, rankings & approvals.",
          },

          {
            title: "Course Comparison",
            path: "/compare",
            icon: GraduationCap,
            description:
              "Compare course duration, fees & career scope.",
          },

          {
            title: "Career Research",
            path: "/career-research",
            icon: BriefcaseBusiness,
            description:
              "Explore career opportunities after graduation.",
          },

          {
            title: "Education Trends",
            path: "/education-trends",
            icon: Globe2,
            description:
              "Latest education insights & industry trends.",
          },
        ],
      },
    ],
  },

  // ======================================================
  // RESOURCES
  // ======================================================

  {
    title: "Resources",
    megaMenu: true,

    sections: [
      {
        title: "Student Resources",

        items: [
          {
            title: "College Guide",
            path: "/college-guide",
            icon: BookOpen,
            description:
              "Complete guide to choosing the right university.",
          },

          {
            title: "Career Advice",
            path: "/career-advice",
            icon: Users,
            description:
              "Expert career planning & counselling articles.",
          },

          {
            title: "Blogs & Articles",
            path: "/blogs",
            icon: Library,
            description:
              "Latest admission news, tips & educational blogs.",
          },

          {
            title: "FAQs",
            path: "/faqs",
            icon: ClipboardCheck,
            description:
              "Answers to commonly asked student questions.",
          },
        ],
      },
    ],
  },

  // ======================================================
  // ABOUT
  // ======================================================

  {
    title: "About",
    path: "/about",
  },

  // ======================================================
  // CONTACT
  // ======================================================

  {
    title: "Contact",
    path: "/contact",
  },
];