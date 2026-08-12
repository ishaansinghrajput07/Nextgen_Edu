import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Star,
  GraduationCap,
  Building2,
  IndianRupee,
  CheckCircle2,
  ArrowRight,
  X,
  Heart,
  Phone,
  Mail,
  Send,
  BookOpen,
  BriefcaseBusiness,
  Award,
  CalendarDays,
  ShieldCheck,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";

import { submitLead } from "../services/contactService";

// =====================================================
// STATIC COLLEGE DATA
// Later this array can be replaced with API response.
// =====================================================

const colleges = [
  {
    id: 1,
    name: "Amity University",
    shortName: "Amity",
    city: "Noida",
    state: "Uttar Pradesh",
    type: "Private University",
    rating: 4.4,
    reviews: 1240,
    accreditation: "NAAC A+",
    established: "2005",
    fees: "₹1.20L - ₹4.80L / year",
    courses: [
      "B.Tech",
      "BCA",
      "MBA",
      "BBA",
      "MCA",
      "M.Tech",
    ],
    popularCourses: ["B.Tech CSE", "BCA", "MBA"],
    placement: "Excellent",
    description:
      "Amity University offers a wide range of undergraduate and postgraduate programmes with modern infrastructure, industry-oriented curriculum and strong academic support.",
    facilities: [
      "Modern classrooms",
      "Central library",
      "Computer labs",
      "Hostel",
      "Sports complex",
      "Placement cell",
    ],
    eligibility:
      "Eligibility depends on the selected course. Generally, candidates must have completed the required qualifying examination from a recognized board or university.",
    admissionProcess:
      "Students can register online, select their preferred programme, submit documents and complete the university admission process.",
  },

  {
    id: 2,
    name: "Lovely Professional University",
    shortName: "LPU",
    city: "Phagwara",
    state: "Punjab",
    type: "Private University",
    rating: 4.3,
    reviews: 1890,
    accreditation: "NAAC A++",
    established: "2005",
    fees: "₹90K - ₹3.50L / year",
    courses: [
      "B.Tech",
      "BCA",
      "MBA",
      "BBA",
      "MCA",
      "B.Sc",
    ],
    popularCourses: ["B.Tech CSE", "MBA", "BCA"],
    placement: "Excellent",
    description:
      "LPU is known for its large campus, diverse academic programmes, industry exposure and extensive student activities.",
    facilities: [
      "Large campus",
      "Hostels",
      "Labs",
      "Library",
      "Sports facilities",
      "Career services",
    ],
    eligibility:
      "Course-specific eligibility criteria apply. Students should verify the academic requirements for their selected programme.",
    admissionProcess:
      "Candidates can apply online, choose their programme, upload documents and proceed through the university admission process.",
  },

  {
    id: 3,
    name: "Manipal University Jaipur",
    shortName: "MUJ",
    city: "Jaipur",
    state: "Rajasthan",
    type: "Private University",
    rating: 4.5,
    reviews: 970,
    accreditation: "NAAC A+",
    established: "2011",
    fees: "₹1.50L - ₹4.20L / year",
    courses: [
      "B.Tech",
      "BCA",
      "MBA",
      "BBA",
      "MCA",
      "B.Des",
    ],
    popularCourses: ["B.Tech CSE", "BCA", "MBA"],
    placement: "Excellent",
    description:
      "Manipal University Jaipur provides technology-driven education with a focus on academics, innovation, research and professional development.",
    facilities: [
      "Smart classrooms",
      "Research labs",
      "Library",
      "Hostels",
      "Innovation centre",
      "Sports complex",
    ],
    eligibility:
      "Eligibility varies by programme and may include specific subjects, marks and entrance requirements.",
    admissionProcess:
      "Applicants can submit an online application and complete the required academic and document verification steps.",
  },

  {
    id: 4,
    name: "Sharda University",
    shortName: "Sharda",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    type: "Private University",
    rating: 4.2,
    reviews: 850,
    accreditation: "NAAC A+",
    established: "2009",
    fees: "₹1.00L - ₹3.20L / year",
    courses: [
      "B.Tech",
      "BCA",
      "MBA",
      "BBA",
      "MCA",
      "B.Com",
    ],
    popularCourses: ["B.Tech CSE", "BBA", "MBA"],
    placement: "Very Good",
    description:
      "Sharda University offers multidisciplinary programmes and focuses on academic learning, professional skills and campus development.",
    facilities: [
      "Digital classrooms",
      "Labs",
      "Library",
      "Hostel",
      "Medical facilities",
      "Sports",
    ],
    eligibility:
      "Programme-specific academic eligibility applies. Students should check the requirements before applying.",
    admissionProcess:
      "The admission process generally includes registration, programme selection, document submission and verification.",
  },

  {
    id: 5,
    name: "Chandigarh University",
    shortName: "CU",
    city: "Mohali",
    state: "Punjab",
    type: "Private University",
    rating: 4.4,
    reviews: 1560,
    accreditation: "NAAC A+",
    established: "2012",
    fees: "₹85K - ₹3.40L / year",
    courses: [
      "B.Tech",
      "BCA",
      "MBA",
      "BBA",
      "MCA",
      "B.Sc",
    ],
    popularCourses: ["B.Tech CSE", "MBA", "BCA"],
    placement: "Excellent",
    description:
      "Chandigarh University provides a broad selection of programmes with emphasis on industry exposure, technology and career development.",
    facilities: [
      "Technology labs",
      "Library",
      "Hostel",
      "Sports",
      "Innovation labs",
      "Career centre",
    ],
    eligibility:
      "Eligibility requirements differ according to the programme selected by the student.",
    admissionProcess:
      "Students can apply online and complete registration, documentation and programme-specific admission requirements.",
  },

  {
    id: 6,
    name: "Galgotias University",
    shortName: "GU",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    type: "Private University",
    rating: 4.1,
    reviews: 720,
    accreditation: "NAAC A+",
    established: "2011",
    fees: "₹80K - ₹2.80L / year",
    courses: [
      "B.Tech",
      "BCA",
      "MBA",
      "BBA",
      "MCA",
      "B.Com",
    ],
    popularCourses: ["B.Tech CSE", "BCA", "BBA"],
    placement: "Very Good",
    description:
      "Galgotias University provides undergraduate and postgraduate programmes across engineering, management, computer applications and other disciplines.",
    facilities: [
      "Computer labs",
      "Library",
      "Hostels",
      "Smart classrooms",
      "Sports",
      "Training centre",
    ],
    eligibility:
      "Students must satisfy the academic eligibility criteria prescribed for the selected programme.",
    admissionProcess:
      "Applicants can register online, select a programme, provide documents and complete the admission formalities.",
  },

  {
    id: 7,
    name: "Shoolini University",
    shortName: "Shoolini",
    city: "Solan",
    state: "Himachal Pradesh",
    type: "Private University",
    rating: 4.5,
    reviews: 640,
    accreditation: "NAAC A+",
    established: "2009",
    fees: "₹90K - ₹3.00L / year",
    courses: [
      "B.Tech",
      "BCA",
      "MBA",
      "BBA",
      "MCA",
      "B.Sc",
    ],
    popularCourses: ["B.Tech CSE", "MBA", "BCA"],
    placement: "Very Good",
    description:
      "Shoolini University focuses on research, innovation, entrepreneurship and professional education in a modern campus environment.",
    facilities: [
      "Research centres",
      "Laboratories",
      "Library",
      "Hostels",
      "Sports",
      "Innovation facilities",
    ],
    eligibility:
      "Eligibility is programme-specific and depends on the qualifying examination and other admission requirements.",
    admissionProcess:
      "Students can apply online and proceed through registration, documentation and university verification.",
  },

  {
    id: 8,
    name: "Graphic Era University",
    shortName: "GEU",
    city: "Dehradun",
    state: "Uttarakhand",
    type: "Private University",
    rating: 4.4,
    reviews: 910,
    accreditation: "NAAC A+",
    established: "2008",
    fees: "₹1.00L - ₹3.50L / year",
    courses: [
      "B.Tech",
      "BCA",
      "MBA",
      "BBA",
      "MCA",
      "B.Sc",
    ],
    popularCourses: ["B.Tech CSE", "BCA", "MBA"],
    placement: "Excellent",
    description:
      "Graphic Era University offers technology, management and other professional programmes with a focus on academics, innovation and placements.",
    facilities: [
      "Advanced labs",
      "Library",
      "Hostels",
      "Smart classrooms",
      "Sports",
      "Placement cell",
    ],
    eligibility:
      "Eligibility criteria vary according to the selected programme and admission route.",
    admissionProcess:
      "Candidates can submit their application online and complete the required documentation and verification process.",
  },
];

// =====================================================
// COMPONENT
// =====================================================

const CollegeGuide = () => {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const [selectedCollege, setSelectedCollege] = useState(null);
  const [showEnquiry, setShowEnquiry] = useState(false);

  const [shortlisted, setShortlisted] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    interestedCourse: "",
    message: "",
  });

  // ===================================================
  // FILTER OPTIONS
  // ===================================================

  const states = useMemo(
    () => ["All", ...new Set(colleges.map((college) => college.state))],
    [],
  );

  const types = useMemo(
    () => ["All", ...new Set(colleges.map((college) => college.type))],
    [],
  );

  const courses = useMemo(() => {
    const allCourses = colleges.flatMap((college) => college.courses);
    return ["All", ...new Set(allCourses)];
  }, []);

  // ===================================================
  // FILTERED COLLEGES
  // ===================================================

  const filteredColleges = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    const result = colleges.filter((college) => {
      const matchesSearch =
        !keyword ||
        college.name.toLowerCase().includes(keyword) ||
        college.city.toLowerCase().includes(keyword) ||
        college.state.toLowerCase().includes(keyword) ||
        college.courses.some((course) =>
          course.toLowerCase().includes(keyword),
        );

      const matchesState =
        stateFilter === "All" || college.state === stateFilter;

      const matchesType = typeFilter === "All" || college.type === typeFilter;

      const matchesCourse =
        courseFilter === "All" || college.courses.includes(courseFilter);

      return matchesSearch && matchesState && matchesType && matchesCourse;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      if (sortBy === "reviews") {
        return b.reviews - a.reviews;
      }

      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });
  }, [search, stateFilter, typeFilter, courseFilter, sortBy]);

  // ===================================================
  // SHORTLIST
  // ===================================================

  const toggleShortlist = (college) => {
    setShortlisted((prev) => {
      const exists = prev.includes(college.id);

      if (exists) {
        toast.success("Removed from shortlist");
        return prev.filter((id) => id !== college.id);
      }

      toast.success("Added to shortlist");
      return [...prev, college.id];
    });
  };

  // ===================================================
  // OPEN ENQUIRY
  // ===================================================

  const openEnquiry = (college, course = "") => {
    setSelectedCollege(college);

    setFormData({
      username: "",
      email: "",
      phoneNumber: "",
      interestedCourse: course || college?.popularCourses?.[0] || "",
      message: `I want admission guidance for ${college?.name || ""}.`,
    });

    setShowEnquiry(true);
  };

  // ===================================================
  // FORM CHANGE
  // ===================================================

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

  // ===================================================
  // SUBMIT ENQUIRY
  // ===================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
      formData.phoneNumber.length !== 10 ||
      !formData.interestedCourse.trim()
    ) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    try {
      setLoading(true);

      await submitLead({
        ...formData,
        username: formData.username.trim(),
        email: formData.email.toLowerCase().trim(),
        source: selectedCollege?.name || "College Guide",
      });

      toast.success("Your enquiry has been submitted successfully.");

      setShowEnquiry(false);

      setFormData({
        username: "",
        email: "",
        phoneNumber: "",
        interestedCourse: "",
        message: "",
      });
    } catch (error) {
      console.error("COLLEGE GUIDE ENQUIRY ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to submit enquiry. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />
        <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-cyan-100 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-black uppercase tracking-wider text-sky-700">
              <GraduationCap className="h-4 w-4" />
              NextGen College Guide
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Find the right{" "}
              <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                college
              </span>{" "}
              for your future.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Explore colleges, compare courses, understand fees and get
              personalised admission guidance from NextGen counsellors.
            </p>

            {/* SEARCH */}

            <div className="mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search college, city, state or course..."
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm font-medium text-slate-800 shadow-lg shadow-slate-200/50 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById("college-results")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-sky-600 px-7 text-sm font-black text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-700"
              >
                Search Colleges
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Verified information
              </span>

              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-sky-500" />
                Admission guidance
              </span>

              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-rose-500" />
                Shortlist colleges
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =================================================
          MAIN
      ================================================= */}

      <main
        id="college-results"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        {/* FILTER BAR */}

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-sky-600" />

            <h2 className="font-black text-slate-900">Find your college</h2>

            <span className="ml-auto rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-700">
              {filteredColleges.length} colleges
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {/* STATE */}

            <div className="relative">
              <select
                value={stateFilter}
                onChange={(event) => setStateFilter(event.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state === "All" ? "All States" : state}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            {/* TYPE */}

            <div className="relative">
              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type === "All" ? "All University Types" : type}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            {/* COURSE */}

            <div className="relative">
              <select
                value={courseFilter}
                onChange={(event) => setCourseFilter(event.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
              >
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course === "All" ? "All Courses" : course}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            {/* SORT */}

            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
              >
                <option value="rating">Sort: Highest Rated</option>
                <option value="reviews">Sort: Most Reviewed</option>
                <option value="name">Sort: Name</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        {/* =================================================
            RESULT HEADER
        ================================================= */}

        <div className="mb-5 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600">
              Explore colleges
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-900">
              Recommended Colleges
            </h2>
          </div>

          {shortlisted.length > 0 && (
            <div className="inline-flex items-center gap-2 self-start rounded-xl border border-rose-100 bg-rose-50 px-4 py-2 text-xs font-black text-rose-600">
              <Heart className="h-4 w-4 fill-current" />
              {shortlisted.length} shortlisted
            </div>
          )}
        </div>

        {/* =================================================
            COLLEGE GRID
        ================================================= */}

        {filteredColleges.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <Search className="h-7 w-7 text-slate-400" />
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-900">
              No colleges found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Try changing your search or filters to find more colleges.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStateFilter("All");
                setTypeFilter("All");
                setCourseFilter("All");
              }}
              className="mt-5 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-sky-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredColleges.map((college, index) => {
              const isShortlisted = shortlisted.includes(college.id);

              return (
                <motion.article
                  key={college.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.04, 0.2),
                  }}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-200/60"
                >
                  {/* CARD TOP */}

                  <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-sky-600 shadow-sm ring-1 ring-slate-100">
                        <Building2 className="h-7 w-7" />
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleShortlist(college)}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                          isShortlisted
                            ? "border-rose-200 bg-rose-50 text-rose-500"
                            : "border-slate-200 bg-white text-slate-400 hover:border-rose-200 hover:text-rose-500"
                        }`}
                        aria-label="Shortlist college"
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            isShortlisted ? "fill-current" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <div className="mt-5">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-600">
                          {college.accreditation}
                        </span>

                        <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-sky-600">
                          {college.type.replace(" University", "")}
                        </span>
                      </div>

                      <h3 className="mt-3 line-clamp-2 text-xl font-black text-slate-900">
                        {college.name}
                      </h3>

                      <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-slate-500">
                        <MapPin className="h-4 w-4 text-sky-500" />
                        {college.city}, {college.state}
                      </div>
                    </div>
                  </div>

                  {/* CARD BODY */}

                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-amber-50 p-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                          <Star className="h-4 w-4 fill-current" />
                          Rating
                        </div>

                        <p className="mt-1 text-lg font-black text-slate-900">
                          {college.rating}
                          <span className="ml-1 text-xs font-semibold text-slate-400">
                            ({college.reviews})
                          </span>
                        </p>
                      </div>

                      <div className="rounded-2xl bg-sky-50 p-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600">
                          <IndianRupee className="h-4 w-4" />
                          Fees
                        </div>

                        <p className="mt-1 line-clamp-1 text-sm font-black text-slate-900">
                          {college.fees}
                        </p>
                      </div>
                    </div>

                    {/* COURSES */}

                    <div className="mt-5">
                      <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Popular courses
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {college.popularCourses.map((course) => (
                          <span
                            key={course}
                            className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-600"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* PLACEMENT */}

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <BriefcaseBusiness className="h-4 w-4 text-emerald-500" />
                        Placement
                      </div>

                      <span className="text-xs font-black text-emerald-600">
                        {college.placement}
                      </span>
                    </div>

                    {/* ACTIONS */}

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedCollege(college)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-black text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                      >
                        View Details
                      </button>

                      <button
                        type="button"
                        onClick={() => openEnquiry(college)}
                        className="rounded-xl bg-sky-600 px-3 py-3 text-xs font-black text-white shadow-md shadow-sky-500/20 transition hover:bg-sky-700"
                      >
                        Get Guidance
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* =================================================
            GUIDANCE CTA
        ================================================= */}

        <section className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 p-8 text-white shadow-xl shadow-sky-500/20 sm:p-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white/80">
                <ShieldCheck className="h-5 w-5" />
                Need personalised guidance?
              </div>

              <h2 className="text-2xl font-black sm:text-3xl">
                Not sure which college is right for you?
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/80 sm:text-base">
                Tell us your course, academic background and preferences. Our
                counsellors can help you shortlist suitable college options.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedCollege(null);

                setFormData({
                  username: "",
                  email: "",
                  phoneNumber: "",
                  interestedCourse: "",
                  message: "I need guidance for selecting a college.",
                });

                setShowEnquiry(true);
              }}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-black text-sky-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Talk to a Counsellor
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>

      {/* =================================================
          COLLEGE DETAILS MODAL
      ================================================= */}

      <AnimatePresence>
        {selectedCollege && !showEnquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            onClick={() => setSelectedCollege(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            >
              {/* HEADER */}

              <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 p-5 backdrop-blur sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                      <Building2 className="h-7 w-7" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-xl font-black text-slate-900 sm:text-2xl">
                        {selectedCollege.name}
                      </h2>

                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        <MapPin className="h-4 w-4" />
                        {selectedCollege.city}, {selectedCollege.state}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCollege(null)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* CONTENT */}

              <div className="space-y-6 p-5 sm:p-7">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-amber-50 p-4">
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <p className="mt-2 text-xs font-bold text-slate-500">
                      Rating
                    </p>
                    <p className="mt-1 text-lg font-black text-slate-900">
                      {selectedCollege.rating}/5
                    </p>
                  </div>

                  <div className="rounded-2xl bg-sky-50 p-4">
                    <Award className="h-5 w-5 text-sky-600" />
                    <p className="mt-2 text-xs font-bold text-slate-500">
                      Accreditation
                    </p>
                    <p className="mt-1 text-lg font-black text-slate-900">
                      {selectedCollege.accreditation}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <CalendarDays className="h-5 w-5 text-emerald-600" />
                    <p className="mt-2 text-xs font-bold text-slate-500">
                      Established
                    </p>
                    <p className="mt-1 text-lg font-black text-slate-900">
                      {selectedCollege.established}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    About the college
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {selectedCollege.description}
                  </p>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-lg font-black text-slate-900">
                    <BookOpen className="h-5 w-5 text-sky-600" />
                    Courses
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedCollege.courses.map((course) => (
                      <span
                        key={course}
                        className="rounded-xl bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                      <IndianRupee className="h-5 w-5 text-sky-600" />
                      Approximate Fees
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {selectedCollege.fees}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                      <BriefcaseBusiness className="h-5 w-5 text-emerald-600" />
                      Placement
                    </div>

                    <p className="mt-3 text-sm font-bold text-emerald-600">
                      {selectedCollege.placement}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Eligibility
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {selectedCollege.eligibility}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Admission Process
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {selectedCollege.admissionProcess}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Campus Facilities
                  </h3>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {selectedCollege.facilities.map((facility) => (
                      <div
                        key={facility}
                        className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-600"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                        {facility}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openEnquiry(selectedCollege)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-700"
                >
                  Get Admission Guidance
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================
          ENQUIRY MODAL
      ================================================= */}

      <AnimatePresence>
        {showEnquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            onClick={() => !loading && setShowEnquiry(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            >
              <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 p-5 backdrop-blur sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-sky-700">
                      <GraduationCap className="h-3.5 w-3.5" />
                      Admission Guidance
                    </div>

                    <h2 className="mt-3 text-2xl font-black text-slate-900">
                      Talk to a Counsellor
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {selectedCollege
                        ? `Get guidance for ${selectedCollege.name}`
                        : "Tell us what you are looking for."}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setShowEnquiry(false)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
                {/* NAME */}

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-50"
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                    Email Address *
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-50"
                    />
                  </div>
                </div>

                {/* PHONE */}

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                    Phone Number *
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
                      placeholder="10 digit mobile number"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-50"
                    />
                  </div>
                </div>

                {/* COURSE */}

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                    Interested Course *
                  </label>

                  <input
                    type="text"
                    name="interestedCourse"
                    value={formData.interestedCourse}
                    onChange={handleChange}
                    placeholder="e.g. B.Tech CSE"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-50"
                  />
                </div>

                {/* MESSAGE */}

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                    Message
                  </label>

                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what guidance you need..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-50"
                  />
                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Enquiry
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] leading-5 text-slate-400">
                  Our admission counsellor will contact you regarding your
                  enquiry.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollegeGuide;
