import { Link } from "react-router-dom";
import { useCompare } from "../../context/CompareContext";
import nextLogo from "../../assets/logo/NEXTGEN LOGO.png";

import {
  MapPin,
  GraduationCap,
  IndianRupee,
  Building2,
  BadgeCheck,
  ArrowRight,
  GitCompareArrows,
} from "lucide-react";

export default function UniversityCard({ university }) {
  const { addToCompare, compareItems } = useCompare();

  const courses = university?.courses || [];

  const totalCourses = courses.length;

  const lowestFee =
    totalCourses > 0
      ? Math.min(...courses.map((course) => Number(course.fees) || 0))
      : 0;

  const alreadyAdded = compareItems.some(
    (item) => item._id === university._id
  );

  const compareData = {
    _id: university._id,
    name: university.universityName,
    image: university.universityLogo,
    banner: university.universityBanner,
    slug: university.slug,
    location: [university.city, university.state]
      .filter(Boolean)
      .join(", "),
    fees: lowestFee,
    courses,
  };

  const formatFee = (fee) => {
    if (!fee) return "N/A";

    return `₹${Number(fee).toLocaleString("en-IN")}`;
  };

  return (
    <article
      className="
      group
      relative
      overflow-hidden

      rounded-3xl

      border
      border-slate-200

      bg-white

      shadow-lg
      shadow-sky-100/40

      transition-all
      duration-300

      hover:-translate-y-2
      hover:border-sky-300
      hover:shadow-xl
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        -right-16
        -top-16

        h-40
        w-40

        rounded-full

        bg-sky-100

        blur-3xl
        "
      />

      <div
        className="
        absolute
        -left-16
        -bottom-16

        h-40
        w-40

        rounded-full

        bg-cyan-100

        blur-3xl
        "
      />

      <div className="relative z-10">

        {/* Banner */}

        <div className="relative h-24 overflow-hidden">

          <img
            src={
              university.universityBanner ||
              nextLogo
            }
            alt={university.universityName}
            className="
            h-full
            w-full
            object-cover

            transition-all
            duration-500

            group-hover:scale-105
            "
          />

          <div
            className="
            absolute
            inset-0

            bg-gradient-to-t
            from-[#0B1F57]/60
            via-[#1D4ED8]/10
            to-transparent
            "
          />
        </div>

        {/* Body */}

        <div className="p-4">
          {/* Header */}

<div className="flex items-start justify-between gap-3">

  {/* Logo + Info */}

  <div className="flex items-start gap-3 flex-1">

    <div
      className="
      h-14
      w-14

      rounded-2xl

      border
      border-slate-200

      bg-white

      flex
      items-center
      justify-center

      shadow-sm

      shrink-0
      "
    >
      <img
        src={
          university.universityLogo ||
          nextLogo
        }
        alt={university.universityName}
        className="
        h-10
        w-10
        object-contain
        "
      />
    </div>

    <div className="min-w-0 flex-1">

      <h2
        className="
        text-lg
        font-black
        leading-tight
        text-slate-900
        line-clamp-2
        "
      >
        {university.universityName}
      </h2>

      <div
        className="
        mt-2

        flex
        items-center
        gap-2

        text-slate-500
        "
      >
        <MapPin
          size={15}
          className="text-sky-600 shrink-0"
        />

        <span
          className="
          text-sm
          truncate
          "
        >
          {[university.city, university.state]
            .filter(Boolean)
            .join(", ")}
        </span>

      </div>

    </div>

  </div>

  {/* Admission */}

  <span
    className={`
    shrink-0

    rounded-full

    px-3
    py-1

    text-[11px]
    font-bold

    ${
      university.admissionOpen
        ? "bg-green-50 text-green-700"
        : "bg-red-50 text-red-700"
    }
    `}
  >
    {university.admissionOpen
      ? "Open"
      : "Closed"}
  </span>

</div>

{/* Small Divider */}

<div
  className="
  my-4

  h-px

  bg-slate-200
  "
/>

{/* ================= Details ================= */}

<div className="space-y-2">

  {/* Courses */}

  <div
    className="
    flex
    items-center
    justify-between

    rounded-xl

    bg-slate-50

    px-3
    py-2.5

    transition

    hover:bg-sky-50
    "
  >

    <div
      className="
      flex
      items-center
      gap-2
      "
    >

      <GraduationCap
        size={17}
        className="text-sky-600"
      />

      <span
        className="
        text-sm
        text-slate-600
        "
      >
        Courses
      </span>

    </div>

    <span
      className="
      text-sm
      font-bold
      text-slate-900
      "
    >
      {totalCourses}
    </span>

  </div>

  {/* Fees */}

  <div
    className="
    flex
    items-center
    justify-between

    rounded-xl

    bg-slate-50

    px-3
    py-2.5

    transition

    hover:bg-emerald-50
    "
  >

    <div
      className="
      flex
      items-center
      gap-2
      "
    >

      <IndianRupee
        size={17}
        className="text-emerald-600"
      />

      <span
        className="
        text-sm
        text-slate-600
        "
      >
        Starting Fee
      </span>

    </div>

    <span
      className="
      text-sm
      font-bold
      text-emerald-700
      "
    >
      {formatFee(lowestFee)}
    </span>

  </div>

</div>

{/* ================= Highlights ================= */}

<div
  className="
  mt-4

  flex
  flex-wrap
  gap-2
  "
>

  {university.ugcApproved && (

    <span
      className="
      rounded-full

      bg-sky-50

      px-3
      py-1

      text-xs
      font-semibold

      text-sky-700
      "
    >
      ✓ UGC Approved
    </span>

  )}

  {university.naacVerified && (

    <span
      className="
      rounded-full

      bg-emerald-50

      px-3
      py-1

      text-xs
      font-semibold

      text-emerald-700
      "
    >
      ✓ NAAC Accredited
    </span>

  )}

  {!university.ugcApproved &&
    !university.naacVerified && (

      <span
        className="
        rounded-full

        bg-slate-100

        px-3
        py-1

        text-xs
        font-semibold

        text-slate-700
        "
      >
        <Building2
          size={13}
          className="inline mr-1"
        />

        {university.universityType ||
          "University"}
      </span>

  )}

</div>

{/* Divider */}

<div
  className="
  my-4

  h-px

  bg-slate-200
  "
/>

{/* ================= Action Buttons ================= */}

<div className="grid grid-cols-2 gap-3">

  {/* View Details */}

  <Link
    to={`/universities/${university.slug}`}
    className="
    flex
    items-center
    justify-center
    gap-2

    rounded-xl

    bg-gradient-to-r
    from-sky-500
    to-cyan-600

    px-3
    py-3

    text-sm
    font-bold

    text-white

    shadow-md
    shadow-sky-200

    transition-all

    hover:shadow-lg
    "
  >
    Details

    <ArrowRight size={15} />
  </Link>

  {/* Compare */}

  <button
    type="button"
    disabled={alreadyAdded}
    onClick={() => addToCompare(compareData)}
    className={`
    flex
    items-center
    justify-center
    gap-2

    rounded-xl

    border

    px-3
    py-3

    text-sm
    font-bold

    transition-all

    ${
      alreadyAdded
        ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
        : "border-sky-200 bg-white text-sky-700 hover:bg-sky-50"
    }
    `}
  >
    <GitCompareArrows size={15} />

    Compare
  </button>

</div>

</div>

</div>

</article>
  );}