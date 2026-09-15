import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import ApplyNowModal from "../components/universities/ApplyNowModal";

import {
  ArrowLeft,
  MapPin,
  Globe,
  Building2,
  BadgeCheck,
  GraduationCap,
  TrendingUp,
  IndianRupee,
  Award,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

import { getUniversityBySlug } from "../services/universityService";

export default function UniversityDetails() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  /* =========================================================
     REMEMBER WHERE USER CAME FROM
  ========================================================= */

  useEffect(() => {
    /*
      Save the current details URL.

      Browser history itself will remember the previous page,
      so Back button can return exactly where user came from.
    */
    sessionStorage.setItem(
      "lastUniversityDetailsPage",
      location.pathname
    );
  }, [location.pathname]);

  /* =========================================================
     FETCH UNIVERSITY
  ========================================================= */

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getUniversityBySlug(slug);

        if (res?.university) {
          setUniversity(res.university);
        } else {
          setError("University not found.");
        }
      } catch (err) {
        console.log(err);
        setError("University not found.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchUniversity();
    }
  }, [slug]);

  /* =========================================================
     BACK TO PREVIOUS PAGE
  ========================================================= */

  const handleBack = () => {
    /*
      If there is browser history available,
      go exactly to the page from which the user came.
    */
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    /*
      Direct URL fallback.
    */
    navigate("/universities");
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center bg-white px-[30px] py-[30px]">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-[5px] border-slate-200 border-t-teal-700" />

          <h2 className="mt-6 text-2xl font-bold text-slate-950">
            Loading University...
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please wait while we fetch university details.
          </p>
        </div>
      </section>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !university) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center bg-white px-[30px] py-[30px]">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <Building2 size={30} />
          </div>

          <h2 className="mt-6 text-3xl font-black text-slate-950">
            University Not Found
          </h2>

          <p className="mt-4 leading-7 text-slate-500">
            We couldn't find the university you're looking for.
          </p>

          <button
            type="button"
            onClick={handleBack}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-7 py-3.5 font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </section>
    );
  }

  /* =========================================================
     DATA
  ========================================================= */

  const courses = university.courses || [];

  const validFees = courses
    .map((course) => Number(course.fees || 0))
    .filter((fee) => fee > 0);

  const lowestFee =
    validFees.length > 0 ? Math.min(...validFees) : 0;

  const locationText = [
    university.city,
    university.state,
    university.country,
  ]
    .filter(Boolean)
    .join(", ");

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <section className="min-h-screen w-full bg-white px-[30px] py-[30px]">
      {/* =====================================================
          MAIN CONTENT
          IMPORTANT:
          No max-width / mx-auto here.
          This gives exact 30px viewport spacing.
      ====================================================== */}

      <div className="w-full">
        {/* ===================================================
            TOP NAVIGATION
        ==================================================== */}

        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="hidden text-sm text-slate-400 sm:block">
            University Details
          </div>
        </div>

        {/* ===================================================
            HERO
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
        >
          <div className="relative min-h-[500px] overflow-hidden">
            {/* Banner */}

            <img
              src={
                university.universityBanner ||
                "/university-placeholder.jpg"
              }
              alt={university.universityName}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-slate-950/55" />

            <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-transparent" />

            {/* Back */}

            <button
              type="button"
              onClick={handleBack}
              className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-slate-950/45 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-slate-950/70"
            >
              <ArrowLeft size={17} />
              Back
            </button>

            {/* Hero Content */}

            <div className="absolute inset-x-6 bottom-7 z-10">
              <div className="flex flex-col gap-7 lg:flex-row lg:items-end">
                {/* Logo */}

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/70 bg-white p-4 shadow-2xl"
                >
                  <img
                    src={
                      university.universityLogo || "/logo.png"
                    }
                    alt={university.universityName}
                    className="h-full w-full object-contain"
                  />
                </motion.div>

                {/* University Information */}

                <div className="min-w-0 flex-1 text-white">
                  {university.ranking && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-950 shadow-lg">
                      <Award size={16} />
                      Ranked #{university.ranking}
                    </div>
                  )}

                  <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                    {university.universityName}
                  </h1>

                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/90">
                    {locationText && (
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={17}
                          className="text-teal-300"
                        />

                        <span>{locationText}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Building2
                        size={17}
                        className="text-teal-300"
                      />

                      <span>
                        {university.universityType ||
                          "University"}
                      </span>
                    </div>
                  </div>

                  {/* Approval Badges */}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {university.ugcApproved && (
                      <ApprovalBadge
                        icon={<BadgeCheck size={15} />}
                        text="UGC Approved"
                      />
                    )}

                    {university.naacVerified && (
                      <ApprovalBadge
                        icon={<BadgeCheck size={15} />}
                        text="NAAC Accredited"
                      />
                    )}

                    {university.aiuApproved && (
                      <ApprovalBadge
                        icon={<BadgeCheck size={15} />}
                        text="AIU Approved"
                      />
                    )}

                    {university.nirfRanked && (
                      <ApprovalBadge
                        icon={<Award size={15} />}
                        text="NIRF Ranked"
                      />
                    )}
                  </div>
                </div>

                {/* Desktop Apply Card */}

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="hidden w-[320px] shrink-0 lg:block"
                >
                  <div className="rounded-2xl bg-white p-6 shadow-2xl">
                    <div className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-sm font-bold text-green-700">
                      ● Admissions Open 2026
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-slate-950">
                      Start Your Admission
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Apply now and get expert guidance for your
                      admission journey.
                    </p>

                    <button
                      type="button"
                      onClick={() => setApplyModalOpen(true)}
                      className="mt-5 w-full rounded-xl bg-yellow-400 py-3.5 font-bold text-slate-950 transition hover:bg-yellow-300"
                    >
                      Apply Now
                    </button>

                    {university.website && (
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3.5 font-semibold text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                      >
                        <Globe size={17} />
                        Official Website
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* =================================================
              STATS
          ================================================== */}

          <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<GraduationCap size={24} />}
              iconBg="bg-teal-50"
              iconColor="text-teal-700"
              label="Total Courses"
              value={`${courses.length}+`}
            />

            <StatCard
              icon={<IndianRupee size={24} />}
              iconBg="bg-green-50"
              iconColor="text-green-600"
              label="Lowest Fee"
              value={
                lowestFee > 0
                  ? `₹${lowestFee.toLocaleString("en-IN")}`
                  : "N/A"
              }
            />

            <StatCard
              icon={<TrendingUp size={24} />}
              iconBg="bg-amber-50"
              iconColor="text-amber-600"
              label="Placement Rate"
              value={`${university.placementPercentage || 0}%`}
            />

            <StatCard
              icon={<Award size={24} />}
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
              label="Highest Package"
              value={`₹${university.highestPackage || 0} LPA`}
            />
          </div>
        </motion.div>

        {/* ===================================================
            ABOUT + QUICK INFORMATION
        ==================================================== */}

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* About */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9"
          >
            <span className="inline-flex rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
              About University
            </span>

            <h2 className="mt-5 text-3xl font-black text-slate-950 sm:text-4xl">
              Know Your University
            </h2>

            <p className="mt-5 whitespace-pre-line text-[16px] leading-8 text-slate-500">
              {university.description ||
                "No description available for this university."}
            </p>
          </motion.div>

          {/* Quick Information */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
                  Overview
                </p>

                <h3 className="mt-1 text-2xl font-black text-slate-950">
                  Quick Information
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <Building2 size={22} />
              </div>
            </div>

            <div className="mt-6">
              <InfoRow
                label="University Type"
                value={university.universityType}
              />

              <InfoRow
                label="Established"
                value={university.establishedYear}
              />

              <InfoRow
                label="Country"
                value={university.country}
              />

              <InfoRow
                label="State"
                value={university.state}
              />

              <InfoRow
                label="City"
                value={university.city}
              />

              <div className="flex items-center justify-between gap-4 pt-4">
                <span className="text-sm text-slate-500">
                  Admission
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    university.admissionOpen
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {university.admissionOpen
                    ? "Open"
                    : "Closed"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===================================================
            AVAILABLE COURSES
        ==================================================== */}

        <section className="mt-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
                Programs Offered
              </span>

              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
                Available Courses
              </h2>

              <p className="mt-2 text-slate-500">
                Explore courses, duration, fees and admission
                options.
              </p>
            </div>

            <div className="text-sm font-semibold text-slate-500">
              {courses.length} Programs Available
            </div>
          </div>

          {courses.length > 0 ? (
            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course, index) => (
                <motion.div
                  key={course._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        course.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {course.status || "Available"}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <GraduationCap size={21} />
                    </div>
                  </div>

                  <h3 className="mt-5 text-2xl font-black text-slate-950">
                    {course.courseName}
                  </h3>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-sm text-slate-500">
                        Duration
                      </span>

                      <span className="text-sm font-bold text-slate-950">
                        {course.duration || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Course Fee
                      </span>

                      <span className="font-black text-green-600">
                        {course.fees
                          ? `₹${Number(
                              course.fees
                            ).toLocaleString("en-IN")}`
                          : "Contact Us"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCourse(course.courseName);
                      setApplyModalOpen(true);
                    }}
                    className="mt-7 w-full rounded-xl bg-teal-700 py-3.5 font-bold text-white transition hover:bg-teal-800"
                  >
                    Apply for this Course
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="mt-7 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
              <GraduationCap
                size={42}
                className="mx-auto text-slate-400"
              />

              <p className="mt-4 font-semibold text-slate-500">
                No Courses Available
              </p>
            </div>
          )}
        </section>

        {/* ===================================================
            PLACEMENT HIGHLIGHTS
        ==================================================== */}

        <section className="mt-10">
          <div>
            <span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
              Career Opportunities
            </span>

            <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
              Placement Highlights
            </h2>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            <HighlightCard
              icon={<TrendingUp size={26} />}
              iconBg="bg-green-50"
              iconColor="text-green-600"
              label="Placement Rate"
              value={`${university.placementPercentage || 0}%`}
            />

            <HighlightCard
              icon={<Award size={26} />}
              iconBg="bg-amber-50"
              iconColor="text-amber-600"
              label="Highest Package"
              value={`₹${university.highestPackage || 0} LPA`}
            />

            <HighlightCard
              icon={<IndianRupee size={26} />}
              iconBg="bg-teal-50"
              iconColor="text-teal-700"
              label="Average Package"
              value={`₹${university.averagePackage || 0} LPA`}
            />
          </div>
        </section>

        {/* ===================================================
            CAMPUS FACILITIES
        ==================================================== */}

        <section className="mt-10">
          <div>
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
              Student Experience
            </span>

            <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
              Campus Facilities
            </h2>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            <FacilityCard
              icon={<Building2 size={25} />}
              iconBg="bg-teal-50"
              iconColor="text-teal-700"
              title="Hostel Facility"
              description={
                university.hostelAvailable
                  ? "Available for students."
                  : "Currently unavailable."
              }
            />

            <FacilityCard
              icon={<GraduationCap size={25} />}
              iconBg="bg-green-50"
              iconColor="text-green-600"
              title="Scholarship"
              description={
                university.scholarshipAvailable
                  ? "Scholarships available."
                  : "Information unavailable."
              }
            />

            <FacilityCard
              icon={<Award size={25} />}
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
              title="Accreditation"
              description="UGC, NAAC & AICTE Approved"
            />
          </div>
        </section>

        {/* ===================================================
            ELIGIBILITY + ADMISSION
        ==================================================== */}

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <CheckCircle2 size={22} />
              </div>

              <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
                Eligibility Criteria
              </h2>
            </div>

            <p className="mt-5 whitespace-pre-line text-[16px] leading-8 text-slate-500">
              {university.eligibility ||
                "Eligibility information not available."}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-700">
                <GraduationCap size={22} />
              </div>

              <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
                Admission Process
              </h2>
            </div>

            <p className="mt-5 whitespace-pre-line text-[16px] leading-8 text-slate-500">
              {university.admissionProcess ||
                "Admission process information not available."}
            </p>
          </div>
        </section>

        {/* ===================================================
            CONTACT INFORMATION
        ==================================================== */}

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
                Get In Touch
              </span>

              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
                Contact Information
              </h2>
            </div>

            {university.website && (
              <a
                href={university.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800"
              >
                Visit Official Website
                <ExternalLink size={16} />
              </a>
            )}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <ContactCard
              icon={<MapPin size={21} />}
              title="Location"
              value={
                [university.city, university.state]
                  .filter(Boolean)
                  .join(", ") || "Not Available"
              }
            />

            <ContactCard
              icon={<Globe size={21} />}
              title="Website"
              value={
                university.website
                  ? "Official website available"
                  : "Not Available"
              }
            />

            <ContactCard
              icon={<Building2 size={21} />}
              title="Contact"
              value={
                university.phoneNumber ||
                university.email ||
                "Not Available"
              }
            />
          </div>
        </section>

        {/* ===================================================
            FINAL CTA
        ==================================================== */}

        <section className="mt-10 overflow-hidden rounded-[32px] bg-slate-950 px-7 py-12 sm:px-10 lg:px-14">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full bg-teal-700/20 px-4 py-2 text-sm font-semibold text-teal-300">
                Start Your Journey
              </span>

              <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
                Ready to start your admission journey?
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Apply now and get expert counselling, admission
                support and personalised guidance.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setApplyModalOpen(true)}
              className="shrink-0 rounded-xl bg-yellow-400 px-8 py-4 font-bold text-slate-950 shadow-lg transition hover:bg-yellow-300"
            >
              Apply Now
            </button>
          </div>
        </section>
      </div>

      {/* ===================================================
          APPLY MODAL
      ==================================================== */}

      <ApplyNowModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        university={university}
        course={selectedCourse}
      />
    </section>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-slate-500">{label}</p>

        <h3 className="mt-1 truncate text-2xl font-black text-slate-950">
          {value}
        </h3>
      </div>
    </div>
  );
}

/* =========================================================
   APPROVAL BADGE
========================================================= */

function ApprovalBadge({ icon, text }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm">
      {icon}
      {text}
    </div>
  );
}

/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="max-w-[60%] text-right text-sm font-bold text-slate-950">
        {value || "N/A"}
      </span>
    </div>
  );
}

/* =========================================================
   HIGHLIGHT CARD
========================================================= */

function HighlightCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-500">{label}</p>

        <h3 className="mt-1 text-2xl font-black text-slate-950">
          {value}
        </h3>
      </div>
    </div>
  );
}

/* =========================================================
   FACILITY CARD
========================================================= */

function FacilityCard({
  icon,
  iconBg,
  iconColor,
  title,
  description,
}) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-950">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   CONTACT CARD
========================================================= */

function ContactCard({ icon, title, value }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {title}
        </p>

        <p className="mt-1 break-words text-sm font-semibold leading-6 text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}