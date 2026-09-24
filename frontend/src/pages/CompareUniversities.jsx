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
} from "lucide-react";

import { useCompare } from "../context/CompareContext";

export default function CompareUniversities() {
  const {
    compareItems,
    removeFromCompare,
    clearCompare,
  } = useCompare();

  // =====================================================
  // EMPTY STATE
  // =====================================================

  if (compareItems.length === 0) {
    return (
      <section className="relative min-h-[80vh] overflow-hidden bg-slate-50 pt-32 pb-20">
        {/* Background Glow */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-200/40 blur-[120px]" />
        <div className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-cyan-200/30 blur-[120px]" />

        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-4xl items-center justify-center px-6">
          <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-[0_25px_70px_rgba(15,23,42,0.08)] md:p-16">
            {/* Icon */}
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
              Select universities to compare their location, ratings,
              fees, approvals and available courses side by side.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                "Compare Fees",
                "Check Ratings",
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

  // =====================================================
  // FEATURE CONFIG
  // =====================================================

  const features = [
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      getValue: (u) => u.location || "Not available",
    },
    {
      key: "rating",
      label: "Rating",
      icon: Star,
      getValue: (u) => (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 font-bold text-amber-600">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          {u.rating || "N/A"}
        </span>
      ),
    },
    {
      key: "fees",
      label: "Fees",
      icon: IndianRupee,
      getValue: (u) =>
        u.fees !== undefined && u.fees !== null
          ? `₹ ${Number(u.fees).toLocaleString("en-IN")}`
          : "Not available",
    },
    {
      key: "approvals",
      label: "Approvals",
      icon: ShieldCheck,
      getValue: (u) =>
        u.approvals?.length
          ? u.approvals.join(", ")
          : "Not available",
    },
    {
      key: "courses",
      label: "Courses",
      icon: BookOpen,
      getValue: (u) =>
        `${u.courses?.length || 0} Courses`,
    },
  ];

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 pt-28 pb-20">
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-sky-200/40 blur-[140px]" />

      <div className="pointer-events-none absolute right-[-180px] top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-200/30 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-[-200px] left-1/3 h-[450px] w-[450px] rounded-full bg-blue-100/50 blur-[130px]" />

      {/* =================================================
          CONTAINER
      ================================================= */}

      <div className="relative z-10 mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              {/* Badge */}
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
                confident decision based on fees, ratings, courses,
                approvals and location.
              </p>
            </div>

            {/* Right Actions */}
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
                onClick={clearCompare}
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-red-100
                  bg-white
                  px-5
                  py-3.5
                  text-sm
                  font-bold
                  text-red-500
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-red-200
                  hover:bg-red-50
                  hover:shadow-md
                "
              >
                <Trash2 className="h-4 w-4 transition-transform group-hover:scale-110" />
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            COMPARISON CARD
        ================================================= */}

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.09)]">

          {/* Top Bar */}
          <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                University Comparison
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review important details before choosing your university.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              Side-by-side comparison
            </div>
          </div>

          {/* =================================================
              TABLE WRAPPER
          ================================================= */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse">

              {/* =================================================
                  TABLE HEADER
              ================================================= */}

              <thead>
                <tr className="border-b border-slate-100">

                  {/* Feature Column */}
                  <th className="sticky left-0 z-20 min-w-[190px] bg-slate-50 p-5 text-left sm:p-6">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Compare By
                    </span>
                  </th>

                  {/* Universities */}
                  {compareItems.map((university) => (
                    <th
                      key={university._id}
                      className="min-w-[250px] border-l border-slate-100 bg-white p-5 text-center sm:p-6"
                    >
                      <div className="relative">

                        {/* Remove */}
                        <button
                          onClick={() =>
                            removeFromCompare(university._id)
                          }
                          title="Remove university"
                          className="
                            absolute
                            right-0
                            top-0
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-slate-200
                            bg-white
                            text-slate-400
                            transition
                            hover:border-red-200
                            hover:bg-red-50
                            hover:text-red-500
                          "
                        >
                          <X className="h-4 w-4" />
                        </button>

                        {/* University Image */}
                        <div className="mx-auto flex h-24 w-32 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-3 shadow-sm">
                          <img
                            src={university.image}
                            alt={university.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        {/* Name */}
                        <h3 className="mt-4 text-base font-black leading-6 text-slate-900">
                          {university.name}
                        </h3>

                        <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                          <GraduationCap className="h-3.5 w-3.5" />
                          University
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* =================================================
                  TABLE BODY
              ================================================= */}

              <tbody>

                {features.map((feature, index) => {
                  const Icon = feature.icon;

                  return (
                    <tr
                      key={feature.key}
                      className={`
                        border-b
                        border-slate-100
                        transition-colors
                        hover:bg-slate-50/70
                        ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-slate-50/30"
                        }
                      `}
                    >

                      {/* Feature */}
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
                          key={university._id}
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

          {/* =================================================
              FOOTER
          ================================================= */}

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