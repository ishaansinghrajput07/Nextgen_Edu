import {
  MapPin,
  Star,
  IndianRupee,
  ShieldCheck,
  BookOpen,
  X,
  Trash2,
  GitCompareArrows,
  GraduationCap,
  CheckCircle2,
  Trophy,
} from "lucide-react";

import { useCompare } from "../context/CompareContext";

export default function CompareUniversities() {
  const {
    compareItems,
    removeFromCompare,
    clearCompare,
  } = useCompare();

  /*
   * ================================
   * HELPERS
   * ================================
   */

  // Get course count
  const getCourseCount = (university) => {
    if (Array.isArray(university?.courses)) {
      return university.courses.length;
    }

    return 0;
  };

  // Get course fees
  const getFees = (university) => {
    const courses = Array.isArray(university?.courses)
      ? university.courses
      : [];

    // Take fees from active course first
    const activeCourse = courses.find(
      (course) => course?.status === "Active"
    );

    if (
      activeCourse?.fees !== undefined &&
      activeCourse?.fees !== null
    ) {
      return `₹ ${Number(activeCourse.fees).toLocaleString("en-IN")}`;
    }

    // If no active course, check any course
    const firstCourseWithFees = courses.find(
      (course) =>
        course?.fees !== undefined &&
        course?.fees !== null
    );

    if (firstCourseWithFees) {
      return `₹ ${Number(
        firstCourseWithFees.fees
      ).toLocaleString("en-IN")}`;
    }

    // Fallback to average tuition fee
    if (
      university?.averageTuitionFee !== undefined &&
      university?.averageTuitionFee !== null
    ) {
      return `₹ ${Number(
        university.averageTuitionFee
      ).toLocaleString("en-IN")}`;
    }

    return "Not available";
  };

  // Get approvals from boolean fields
  const getApprovals = (university) => {
    const approvals = [];

    if (university?.ugcApproved === true) {
      approvals.push("UGC");
    }

    if (university?.aiuApproved === true) {
      approvals.push("AIU");
    }

    if (university?.naacVerified === true) {
      approvals.push("NAAC");
    }

    if (university?.nirfRanked === true) {
      approvals.push("NIRF");
    }

    if (approvals.length === 0) {
      return "Not available";
    }

    return approvals.join(", ");
  };

  // Backend has ranking, not rating
  const getRanking = (university) => {
    if (
      university?.ranking !== undefined &&
      university?.ranking !== null &&
      university?.ranking !== ""
    ) {
      return university.ranking;
    }

    return "Not available";
  };

  /*
   * ================================
   * EMPTY STATE
   * ================================
   */

  if (compareItems.length === 0) {
    return (
      <section className="relative min-h-[80vh] overflow-hidden bg-slate-50 pt-32 pb-20">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-200/40 blur-[120px]" />

        <div className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-cyan-200/30 blur-[120px]" />

        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-4xl items-center justify-center px-6">
          <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-[0_25px_70px_rgba(15,23,42,0.08)] md:p-16">
            <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-xl shadow-sky-200">
              <GitCompareArrows className="h-9 w-9 text-white" />
            </div>

            <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-bold text-sky-600">
              <GraduationCap className="h-4 w-4" />
              University Comparison
            </span>

            <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Compare Universities
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500 md:text-lg">
              Select universities to compare their location,
              ranking, fees, approvals and available courses
              side by side.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                "Compare Fees",
                "Check Ranking",
                "View Courses",
                "Check Approvals",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /*
   * ================================
   * COMPARISON FEATURES
   * ================================
   */

  const features = [
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      getValue: (university) => {
        const location =
          university?.location ||
          university?.city ||
          university?.state;

        return location || "Not available";
      },
    },

    {
      key: "ranking",
      label: "Ranking",
      icon: Trophy,
      getValue: (university) => {
        const ranking = getRanking(university);

        if (ranking === "Not available") {
          return (
            <span className="text-slate-400">
              Not available
            </span>
          );
        }

        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 font-bold text-amber-600">
            <Trophy className="h-4 w-4 text-amber-500" />
            Rank {ranking}
          </span>
        );
      },
    },

    {
      key: "fees",
      label: "Fees",
      icon: IndianRupee,
      getValue: (university) => {
        return getFees(university);
      },
    },

    {
      key: "approvals",
      label: "Approvals",
      icon: ShieldCheck,
      getValue: (university) => {
        const approvals = getApprovals(university);

        if (approvals === "Not available") {
          return (
            <span className="text-slate-400">
              Not available
            </span>
          );
        }

        return (
          <div className="flex flex-wrap justify-center gap-2">
            {approvals.split(", ").map((approval) => (
              <span
                key={approval}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {approval}
              </span>
            ))}
          </div>
        );
      },
    },

    {
      key: "courses",
      label: "Courses",
      icon: BookOpen,
      getValue: (university) => {
        const count = getCourseCount(university);

        return `${count} ${count === 1 ? "Course" : "Courses"}`;
      },
    },
  ];

  /*
   * ================================
   * UI
   * ================================
   */

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 pt-28 pb-20">
      {/* Background */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-sky-200/40 blur-[140px]" />

      <div className="pointer-events-none absolute right-[-180px] top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-200/30 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-[-200px] left-1/3 h-[450px] w-[450px] rounded-full bg-blue-100/50 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-600 shadow-sm">
                <GitCompareArrows className="h-4 w-4" />
                University Comparison
              </div>

              <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                Compare{" "}
                <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
                  Universities
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 md:text-lg">
                Compare universities side by side and make a
                confident decision based on fees, ranking,
                courses, approvals and location.
              </p>
            </div>

            {/* Selected + Clear */}
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Selected
                </p>

                <p className="mt-0.5 text-xl font-black text-slate-900">
                  {compareItems.length}

                  <span className="ml-1 text-sm font-semibold text-slate-400">
                    Universities
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={clearCompare}
                className="
                  group inline-flex items-center gap-2 rounded-2xl
                  border border-red-100 bg-white px-5 py-3.5
                  text-sm font-bold text-red-500 shadow-sm
                  transition-all duration-300
                  hover:border-red-200 hover:bg-red-50 hover:shadow-md
                "
              >
                <Trash2 className="h-4 w-4 transition-transform group-hover:scale-110" />
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.09)]">
          {/* Table Header */}
          <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                University Comparison
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review important details before choosing your
                university.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              Side-by-side comparison
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  {/* Compare By */}
                  <th className="sticky left-0 z-20 min-w-[190px] bg-slate-50 p-5 text-left sm:p-6">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Compare By
                    </span>
                  </th>

                  {/* Universities */}
                  {compareItems.map((university) => (
                    <th
                      key={university?._id}
                      className="min-w-[250px] border-l border-slate-100 bg-white p-5 text-center sm:p-6"
                    >
                      <div className="relative">
                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCompare(
                              university?._id
                            )
                          }
                          title="Remove university"
                          className="
                            absolute right-0 top-0 flex h-8 w-8
                            items-center justify-center rounded-full
                            border border-slate-200 bg-white
                            text-slate-400 transition
                            hover:border-red-200 hover:bg-red-50
                            hover:text-red-500
                          "
                        >
                          <X className="h-4 w-4" />
                        </button>

                        {/* Logo */}
                        <div className="mx-auto flex h-24 w-32 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-3 shadow-sm">
                          <img
                            src={university?.universityLogo}
                            alt={
                              university?.universityName ||
                              "University"
                            }
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        {/* Name */}
                        <h3 className="mt-4 text-base font-black leading-6 text-slate-900">
                          {university?.universityName ||
                            "University"}
                        </h3>

                        {/* Type */}
                        <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                          <GraduationCap className="h-3.5 w-3.5" />

                          {university?.universityType ||
                            "University"}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {features.map((feature, index) => {
                  const Icon = feature.icon;

                  return (
                    <tr
                      key={feature.key}
                      className={`
                        border-b border-slate-100
                        transition-colors hover:bg-slate-50/70
                        ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-slate-50/30"
                        }
                      `}
                    >
                      {/* Feature Name */}
                      <td className="sticky left-0 z-10 border-r border-slate-100 bg-inherit p-5 sm:p-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                            <Icon className="h-5 w-5" />
                          </div>

                          <div>
                            <p className="text-sm font-black text-slate-800">
                              {feature.label}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              University details
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Values */}
                      {compareItems.map((university) => (
                        <td
                          key={`${university?._id}-${feature.key}`}
                          className="border-l border-slate-100 p-5 text-center sm:p-6"
                        >
                          <div className="text-sm font-semibold text-slate-700">
                            {feature.getValue(university)}
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-7">
            <div className="flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Compare information to find the right fit for you.
              </div>

              <div className="font-semibold text-slate-400">
                {compareItems.length} universities selected
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}