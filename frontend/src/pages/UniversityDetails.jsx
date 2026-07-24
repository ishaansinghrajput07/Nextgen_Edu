import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  ExternalLink,
} from "lucide-react";

import { getUniversityBySlug } from "../services/universityService";

export default function UniversityDetails() {
  const { slug } = useParams();

  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setLoading(true);

        const res = await getUniversityBySlug(slug);

        setUniversity(res.university);
      } catch (err) {
        console.log(err);
        setError("University not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [slug]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-cyan-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full border-[6px] border-cyan-200 border-t-cyan-600 animate-spin" />

          <h2 className="mt-6 text-2xl font-bold text-slate-800">
            Loading University...
          </h2>

          <p className="mt-2 text-slate-500">
            Please wait while we fetch university details.
          </p>
        </div>
      </section>
    );
  }

  if (error || !university) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-cyan-50">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-lg">
          <h2 className="text-4xl font-black text-slate-900">
            University Not Found
          </h2>

          <p className="mt-4 text-slate-500">
            We couldn't find the university you're looking for.
          </p>

          <Link
            to="/universities"
            className="
              inline-flex
              items-center
              gap-2
              mt-8
              px-8
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              text-white
              font-semibold
              shadow-xl
              hover:scale-105
              transition
            "
          >
            <ArrowLeft size={18} />
            Back to Universities
          </Link>
        </div>
      </section>
    );
  }

  const courses = university.courses || [];

  const lowestFee =
    courses.length > 0 ? Math.min(...courses.map((course) => course.fees)) : 0;

  return (
    <section
      className="
      relative
      overflow-hidden
      bg-gradient-to-br
      from-sky-50
      via-white
      to-cyan-50
      min-h-screen
    "
    >
      {/* ================= Background Blur ================= */}

      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-cyan-200/30 blur-[120px]" />

      <div className="absolute top-40 right-0 w-[420px] h-[420px] rounded-full bg-blue-200/20 blur-[120px]" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] rounded-full bg-sky-100/40 blur-[120px]" />

      {/* Grid Pattern */}

      <div
        className="
        absolute
        inset-0
        opacity-[0.04]
        [background-image:radial-gradient(#0284c7_1px,transparent_1px)]
        [background-size:24px_24px]
      "
      />

      {/* ================= Main Container ================= */}

      <div className="relative z-10 max-w-[1450px] mx-auto px-6 lg:px-10 pt-24 pb-20">
        {/* Hero Section */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            relative
            overflow-hidden
            rounded-[36px]
            border
            border-white/70
            bg-white/70
            backdrop-blur-xl
            shadow-[0_25px_80px_rgba(15,23,42,.08)]
          "
        >
          {/* ================= Banner ================= */}

          <div className="relative h-[430px] overflow-hidden">
            {/* Banner Image */}

            <img
              src={university.universityBanner || "/university-placeholder.jpg"}
              alt={university.universityName}
              className="
                h-full
                w-full
                object-cover
              "
            />

            {/* Overlay */}

            <div
              className="
                absolute
                inset-0

                bg-gradient-to-r
                from-slate-900/50
                via-slate-900/40
                to-cyan-900/25
              "
            />

            <div
              className="
                absolute
                inset-0

                bg-gradient-to-t
                from-white
                via-transparent
                to-transparent
              "
            />

            {/* ================= University Information ================= */}

            <div
              className="
    absolute
    left-8
    bottom-10
    z-20
    right-8
  "
            >
              <div
                className="
      flex
      flex-col
      gap-8
      lg:flex-row
      lg:items-end
    "
              >
                {/* University Logo */}

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  className="
        flex
        h-36
        w-36
        items-center
        justify-center
        rounded-[30px]
        border
        border-white/70
        bg-white
        p-5
        shadow-2xl
      "
                >
                  <img
                    src={university.universityLogo || "/logo.png"}
                    alt={university.universityName}
                    className="
          h-full
          w-full
          object-contain
        "
                  />
                </motion.div>

                {/* University Details */}

                <div className="flex-1 text-white drop-shadow-lg">
                  {/* Ranking */}

                  {university.ranking && (
                    <div
                      className="
            inline-flex
            items-center
            gap-2
            rounded-full
           bg-white/90
border-white
text-amber-700
            px-4
            py-2
            text-sm
            font-semibold
            
          "
                    >
                      🏆 Ranked #{university.ranking}
                    </div>
                  )}

                  {/* University Name */}

                  <h1
                    className="
          mt-5
          text-4xl
          md:text-5xl
          lg:text-6xl
          font-black
          leading-tight
          text-black
        "
                  >
                    {university.universityName}
                  </h1>

                  {/* Location */}

                  <div
                    className="
          mt-5
          flex
          flex-wrap
          gap-6
         text-black
drop-shadow-md
        "
                  >
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-cyan-300" />

                      <span>
                        {[university.city, university.state, university.country]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Building2 size={18} className="text-blue-300" />

                      <span>{university.universityType}</span>
                    </div>
                  </div>

                  {/* Approval Badges */}

                  <div className="mt-6 flex flex-wrap gap-3">
                    {university.ugcApproved && (
                      <div
                        className="
flex
items-center
gap-2
rounded-full
bg-white/90
border
border-white
px-4
py-2
text-sm
font-bold
text-green-700
shadow-lg
"
                      >
                        <BadgeCheck size={18} />
                        UGC Approved
                      </div>
                    )}

                    {university.naacVerified && (
                      <div
                        className="
              flex
              items-center
              gap-2
              rounded-full
             
              px-4
              py-2
             bg-white/90
border-white
text-cyan-700
              font-semibold
              text-cyan-200
            "
                      >
                        <BadgeCheck size={18} />
                        NAAC Accredited
                      </div>
                    )}

                    {university.aiuApproved && (
                      <div
                        className="
              flex
              items-center
              gap-2
              rounded-full
              bg-purple-500/20
              border
              border-purple-300/30
              px-4
              py-2
              text-sm
              font-semibold
              text-purple-200
            "
                      >
                        <BadgeCheck size={18} />
                        AIU Approved
                      </div>
                    )}

                    {university.nirfRanked && (
                      <div
                        className="
              rounded-full
              bg-white/90
border-white
text-purple-700
              px-4
              py-2
               text-sm           
              font-semibold
             
            "
                      >
                        ⭐ NIRF Ranked
                      </div>
                    )}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="hidden lg:block w-[360px]"
                >
                  <div
                    className="

      rounded-[28px]



      bg-white/95



      p-7



      shadow-2xl



      backdrop-blur-xl

    "
                  >
                    <div
                      className="

        inline-flex



        rounded-full



        bg-green-100



        px-4

        py-2



        text-sm

        font-bold



        text-green-700

      "
                    >
                      🟢 Admissions Open 2026
                    </div>

                    <p className="mt-5 text-lg text-slate-600">
                      Apply now and secure your future!
                    </p>

                    <button
                      onClick={() => setApplyModalOpen(true)}
                      className="

          mt-6



          w-full



          rounded-2xl



          bg-gradient-to-r

          from-cyan-500

          to-blue-600



          py-4



          font-bold



          text-white

        "
                    >
                      Apply Now →
                    </button>

                    {university.website && (
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noreferrer"
                        className="

            mt-4



            flex



            items-center

            justify-center



            gap-2



            rounded-2xl



            border



            py-4



            font-semibold



            text-slate-700

          "
                      >
                        <Globe size={18} />
                        Visit Official Website
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Back Button */}

            <Link
              to="/universities"
              className="
                absolute
                left-8
                top-8

                inline-flex
                items-center
                gap-2

                rounded-2xl

                border
                border-white/30

                bg-white/40

                px-5
                py-3

                text-white

                backdrop-blur-xl

                transition

                hover:bg-white/30
              "
            >
              <ArrowLeft size={18} />
              Back to Universities
            </Link>
          </div>

        {/* ================= Premium Stats Cards ================= */}

<div className="pt-8 px-6 pb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {/* Total Courses */}

            <div
              className="
flex
items-center
gap-4
rounded-3xl
bg-white/90
backdrop-blur-xl
border
border-white
p-5
shadow-lg
"
            >
              <div
                className="
flex
h-14
w-14
shrink-0
items-center
justify-center
rounded-2xl
bg-cyan-100
"
              >
                <GraduationCap className="text-cyan-600" size={26} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Total Courses</p>

                <h3
                  className="
text-2xl
font-black
text-slate-900
"
                >
                  {courses.length}+
                </h3>
              </div>
            </div>

            {/* Lowest Fee */}

            <div
              className="
flex
items-center
gap-4
rounded-3xl
bg-white/90
backdrop-blur-xl
border
border-white
p-5
shadow-lg
"
            >
              <div
                className="
flex
h-14
w-14
shrink-0
items-center
justify-center
rounded-2xl
bg-green-100
"
              >
                <IndianRupee className="text-green-600" size={26} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Lowest Fee</p>

                <h3
                  className="
text-2xl
font-black
text-slate-900
"
                >
                  ₹{lowestFee.toLocaleString()}
                </h3>
              </div>
            </div>

            {/* Placement Rate */}

            <div
              className="
flex
items-center
gap-4
rounded-3xl
bg-white/90
backdrop-blur-xl
border
border-white
p-5
shadow-lg
"
            >
              <div
                className="
flex
h-14
w-14
shrink-0
items-center
justify-center
rounded-2xl
bg-amber-100
"
              >
                <TrendingUp className="text-amber-600" size={26} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Placement Rate</p>

                <h3
                  className="
text-2xl
font-black
text-slate-900
"
                >
                  {university.placementPercentage || 0}%
                </h3>
              </div>
            </div>

            {/* Highest Package */}

            <div
              className="
flex
items-center
gap-4
rounded-3xl
bg-white/90
backdrop-blur-xl
border
border-white
p-5
shadow-lg
"
            >
              <div
                className="
flex
h-14
w-14
shrink-0
items-center
justify-center
rounded-2xl
bg-purple-100
"
              >
                <Award className="text-purple-600" size={26} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Highest Package</p>

                <h3
                  className="
text-2xl
font-black
text-slate-900
"
                >
                  ₹{university.highestPackage || 0} LPA
                </h3>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* About + Quick Information */}
        {/* ========================================================= */}

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {/* ================= About University ================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div
              className="
                relative
                overflow-hidden

                rounded-[32px]

                border
                border-white/70

                bg-white/80

                backdrop-blur-xl

                p-8
                lg:p-10

                shadow-[0_20px_60px_rgba(15,23,42,.06)]
              "
            >
              {/* Glow */}

              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-200/30 blur-[100px]" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
                  🏛 About University
                </div>

                <h2 className="mt-5 text-4xl font-black text-slate-900">
                  Know Your University
                </h2>

                <p className="mt-6 leading-9 text-[17px] text-slate-600 whitespace-pre-line">
                  {university.description ||
                    "No description available for this university."}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ================= Quick Information ================= */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="
                rounded-[32px]

                border
                border-white/70

                bg-white/80

                backdrop-blur-xl

                p-8

                shadow-[0_20px_60px_rgba(15,23,42,.06)]
              "
            >
              <h3 className="text-3xl font-black text-slate-900">
                Quick Information
              </h3>

              <div className="mt-8 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">University Type</span>

                  <span className="font-bold text-slate-900">
                    {university.universityType || "N/A"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Established</span>

                  <span className="font-bold text-slate-900">
                    {university.establishedYear || "N/A"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Country</span>

                  <span className="font-bold text-slate-900">
                    {university.country || "N/A"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">State</span>

                  <span className="font-bold text-slate-900">
                    {university.state || "N/A"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">City</span>

                  <span className="font-bold text-slate-900">
                    {university.city || "N/A"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Admission</span>

                  <span
                    className={`font-bold ${
                      university.admissionOpen
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {university.admissionOpen ? "Open" : "Closed"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* Premium Information Cards */}
        {/* ========================================================= */}

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Courses */}

          <div
            className="
flex
items-center
gap-4
rounded-[28px]
border
border-white
bg-white/80
backdrop-blur-xl
p-5
shadow-lg
"
          >
            <div
              className="
flex
h-14
w-14
shrink-0
items-center
justify-center
rounded-2xl
bg-cyan-100
"
            >
              <GraduationCap className="text-cyan-600" size={28} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Total Courses</p>

              <h3
                className="
text-3xl
font-black
text-slate-900
"
              >
                {courses.length}+
              </h3>
            </div>
          </div>

          {/* Fee */}

          <div
            className="
flex
items-center
gap-4
rounded-[28px]
border
border-white
bg-white/80
backdrop-blur-xl
p-5
shadow-lg
"
          >
            <div
              className="
flex
h-14
w-14
shrink-0
items-center
justify-center
rounded-2xl
bg-green-100
"
            >
              <IndianRupee className="text-green-600" size={28} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Starting Fee</p>

              <h3
                className="
text-2xl
font-black
text-slate-900
"
              >
                ₹{lowestFee.toLocaleString()}
              </h3>
            </div>
          </div>

          {/* Placement */}

          <div
            className="
flex
items-center
gap-4
rounded-[28px]
border
border-white
bg-white/80
backdrop-blur-xl
p-5
shadow-lg
"
          >
            <div
              className="
flex
h-14
w-14
shrink-0
items-center
justify-center
rounded-2xl
bg-amber-100
"
            >
              <TrendingUp className="text-amber-600" size={28} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Placement Rate</p>

              <h3
                className="
text-3xl
font-black
text-slate-900
"
              >
                {university.placementPercentage || 0}%
              </h3>
            </div>
          </div>

          {/* Package */}

          <div
            className="
flex
items-center
gap-4
rounded-[28px]
border
border-white
bg-white/80
backdrop-blur-xl
p-5
shadow-lg
"
          >
            <div
              className="
flex
h-14
w-14
shrink-0
items-center
justify-center
rounded-2xl
bg-violet-100
"
            >
              <Award className="text-violet-600" size={28} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Highest Package</p>

              <h3
                className="
text-2xl
font-black
text-slate-900
"
              >
                ₹{university.highestPackage || 0} LPA
              </h3>
            </div>
          </div>
        </div>
        {/* ========================================================= */}
        {/* Available Courses */}
        {/* ========================================================= */}

        <div className="mt-20">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
              🎓 Programs Offered
            </span>

            <h2 className="mt-4 text-5xl font-black text-slate-900">
              Available Courses
            </h2>
          </div>

          {courses.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="
                  group

                  rounded-[30px]

                  border
                  border-white

                  bg-white/85

                  backdrop-blur-xl

                  p-7

                  shadow-lg

                  transition-all
                  duration-300

                  hover:-translate-y-2
                  hover:shadow-2xl
                "
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold

                      ${
                        course.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                    >
                      {course.status}
                    </span>

                    <GraduationCap className="text-cyan-600" size={22} />
                  </div>

                  <h3 className="mt-5 text-2xl font-black text-slate-900">
                    {course.courseName}
                  </h3>

                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Duration</span>

                      <span className="font-bold text-slate-900">
                        {course.duration}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Course Fee</span>

                      <span className="font-black text-green-600">
                        ₹{course.fees?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCourse(course.courseName);
                      setApplyModalOpen(true);
                    }}
                    className="
                    mt-7
                    w-full

                    rounded-2xl

                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600

                    py-3

                    font-bold
                    text-white
                  "
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-lg">
              No Courses Available
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* Placement Highlights */}
        {/* ========================================================= */}

        <div className="mt-20">
          <h2 className="text-4xl font-black text-slate-900">
            Placement Highlights
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Placement Rate */}

            <div
              className="
      flex
      items-center
      gap-5
      rounded-3xl
      bg-white
      p-5
      shadow-lg
    "
            >
              <div
                className="
        flex
        h-14
        w-14
        shrink-0
        items-center
        justify-center
        rounded-2xl
        bg-green-100
      "
              >
                <TrendingUp size={30} className="text-green-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Placement Rate</p>

                <h3
                  className="
          text-3xl
          font-black
          text-slate-900
        "
                >
                  {university.placementPercentage || 0}%
                </h3>
              </div>
            </div>

            {/* Highest Package */}

            <div
              className="
      flex
      items-center
      gap-5
      rounded-3xl
      bg-white
      p-5
      shadow-lg
    "
            >
              <div
                className="
        flex
        h-14
        w-14
        shrink-0
        items-center
        justify-center
        rounded-2xl
        bg-amber-100
      "
              >
                <Award size={30} className="text-amber-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Highest Package</p>

                <h3
                  className="
          text-3xl
          font-black
          text-slate-900
        "
                >
                  ₹{university.highestPackage || 0}
                </h3>
              </div>
            </div>

            {/* Average Package */}

            <div
              className="
      flex
      items-center
      gap-5
      rounded-3xl
      bg-white
      p-5
      shadow-lg
    "
            >
              <div
                className="
        flex
        h-14
        w-14
        shrink-0
        items-center
        justify-center
        rounded-2xl
        bg-cyan-100
      "
              >
                <IndianRupee size={30} className="text-cyan-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Average Package</p>

                <h3
                  className="
          text-3xl
          font-black
          text-slate-900
        "
                >
                  ₹{university.averagePackage || 0}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Facilities */}
        {/* ========================================================= */}

        <div className="mt-20">
          <h2 className="text-4xl font-black text-slate-900">
            Campus Facilities
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Hostel */}

            <div
              className="
flex
items-center
gap-5
rounded-3xl
bg-white
p-5
shadow-lg
"
            >
              <div
                className="
flex
h-14
w-14
shrink-0
items-center
justify-center
rounded-2xl
bg-cyan-100
"
              >
                <Building2 size={30} className="text-cyan-600" />
              </div>

              <div>
                <h3
                  className="
text-xl
font-bold
text-slate-900
"
                >
                  Hostel Facility
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {university.hostelAvailable
                    ? "Available for students."
                    : "Currently unavailable."}
                </p>
              </div>
            </div>

            {/* Scholarship */}

            <div
              className="
flex
items-center
gap-5
rounded-3xl
bg-white
p-5
shadow-lg
"
            >
              <div
                className="
flex
h-14
w-14
shrink-0
items-center
justify-center
rounded-2xl
bg-green-100
"
              >
                <GraduationCap size={30} className="text-green-600" />
              </div>

              <div>
                <h3
                  className="
text-xl
font-bold
text-slate-900
"
                >
                  Scholarship
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {university.scholarshipAvailable
                    ? "Scholarships available."
                    : "Information unavailable."}
                </p>
              </div>
            </div>

            {/* Accreditation */}

            <div
              className="
flex
items-center
gap-5
rounded-3xl
bg-white
p-5
shadow-lg
"
            >
              <div
                className="
flex
h-14
w-14
shrink-0
items-center
justify-center
rounded-2xl
bg-purple-100
"
              >
                <Award size={30} className="text-purple-600" />
              </div>

              <div>
                <h3
                  className="
text-xl
font-bold
text-slate-900
"
                >
                  Accreditation
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  UGC, NAAC & AICTE Approved
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Eligibility & Admission */}
        {/* ========================================================= */}

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[32px] bg-white p-8 shadow-lg">
            <h2 className="text-3xl font-black text-slate-900">
              Eligibility Criteria
            </h2>

            <p className="mt-5 leading-8 text-slate-600 whitespace-pre-line">
              {university.eligibility ||
                "Eligibility information not available."}
            </p>
          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-lg">
            <h2 className="text-3xl font-black text-slate-900">
              Admission Process
            </h2>

            <p className="mt-5 leading-8 text-slate-600 whitespace-pre-line">
              {university.admissionProcess ||
                "Admission process information not available."}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Contact */}
        {/* ========================================================= */}

        <div className="mt-20 rounded-[32px] bg-white p-10 shadow-xl">
          <h2 className="text-4xl font-black text-slate-900">
            Contact Information
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="font-bold text-slate-900">Contact Details</h4>

              <div className="mt-5 space-y-4 text-slate-600">
                <p>Email: {university.email || "Not Available"}</p>

                <p>Phone: {university.phoneNumber || "Not Available"}</p>

                <p>
                  Location:{" "}
                  {[university.city, university.state]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900">Official Website</h4>

              <p className="mt-4 text-slate-600">
                Visit official website for latest updates.
              </p>

              {university.website && (
                <a
                  href={university.website}
                  target="_blank"
                  rel="noreferrer"
                  className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2

                  rounded-2xl

                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600

                  px-6
                  py-3

                  font-bold
                  text-white
                "
                >
                  <Globe size={18} />
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Final CTA */}
        {/* ========================================================= */}

        <div className="mt-20">
          <div
            className="
            relative
            overflow-hidden

            rounded-[40px]

            bg-gradient-to-r
            from-cyan-500
            via-sky-500
            to-blue-600

            p-12

            text-center

            shadow-[0_30px_80px_rgba(14,165,233,.25)]
          "
          >
            <h2 className="text-5xl font-black text-white">
              Ready To Start Your Journey?
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-cyan-50 text-lg">
              Apply today and get expert counselling, admission support and
              career guidance.
            </p>

            <button
              onClick={() => setApplyModalOpen(true)}
              className="
              mt-8

              rounded-2xl

              bg-white

              px-8
              py-4

              font-bold

              text-cyan-700

              shadow-xl
            "
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      <ApplyNowModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        university={university}
        course={selectedCourse}
      />
    </section>
  );
}
