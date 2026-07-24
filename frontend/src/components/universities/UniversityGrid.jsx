import UniversityCard from "./UniversityCard";
import { GraduationCap } from "lucide-react";

export default function UniversityGrid({
  universities = [],
  loading = false,
  columns = 3, // default 3 columns
}) {
  // ================= Grid Layout =================

  const gridClass =
  columns === 4
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5";

  // ================= Loading =================

  if (loading) {
    return (
      <div className={gridClass}>
        {[...Array(columns * 2)].map((_, index) => (
          <div
            key={index}
            className="
              h-[380px]
              rounded-[28px]
              bg-white
              border
              border-slate-200
              overflow-hidden
              animate-pulse
            "

          >
            <div className="h-40 bg-slate-200" />

            <div className="p-5">
              <div className="h-5 w-40 rounded bg-slate-200" />

              <div className="mt-4 h-4 w-28 rounded bg-slate-200" />

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="h-20 rounded-2xl bg-slate-200" />
                <div className="h-20 rounded-2xl bg-slate-200" />
                <div className="h-20 rounded-2xl bg-slate-200" />
              </div>

              <div className="mt-6 h-12 rounded-2xl bg-slate-200" />

              <div className="mt-6 flex gap-2">
                <div className="h-8 w-20 rounded-full bg-slate-200" />
                <div className="h-8 w-20 rounded-full bg-slate-200" />
              </div>

              <div className="mt-6 h-12 rounded-2xl bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ================= Empty =================

  if (!universities.length) {
    return (
      <div
        className="
        py-24
        text-center
        rounded-[32px]
        bg-white
        border
        border-slate-200
        shadow-lg
      "
      >
        <div
          className="
          mx-auto
          flex
          items-center
          justify-center
          h-24
          w-24
          rounded-full
          bg-blue-50
        "
        >
          <GraduationCap
            size={44}
            className="text-blue-600"
          />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-slate-900">
          No Universities Found
        </h2>

        <p className="mt-3 text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  // ================= Cards =================

  return (
    <div className={gridClass}>
      {universities.map((university) => (
        <UniversityCard
          key={university._id}
          university={university}
        />
      ))}
    </div>
  );
}