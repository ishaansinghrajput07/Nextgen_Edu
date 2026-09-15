import UniversityCard from "./UniversityCard";
import { GraduationCap } from "lucide-react";
import { useCompare } from "../../context/CompareContext";

export default function UniversityGrid({
  universities = [],
  loading = false,
  columns = 3,
}) {
  const {
    compareItems,
    addToCompare,
    removeFromCompare,
  } = useCompare();

  // =====================================================
  // GRID
  // =====================================================

  const gridClass =
    columns === 4
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5";

  // =====================================================
  // COMPARE TOGGLE
  // =====================================================

  const handleCompareToggle = (
    university,
    isChecked
  ) => {
    if (isChecked) {
      addToCompare(university);
    } else {
      removeFromCompare(university._id);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className={gridClass}>
        {[...Array(columns * 2)].map((_, index) => (
          <div
            key={index}
            className="
              h-[380px]
              overflow-hidden
              rounded-[28px]
              border
              border-slate-200
              bg-white
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

  // =====================================================
  // EMPTY
  // =====================================================

  if (!universities.length) {
    return (
      <div
        className="
          rounded-[32px]
          border
          border-slate-200
          bg-white
          py-24
          text-center
          shadow-lg
        "
      >
        <div
          className="
            mx-auto
            flex
            h-24
            w-24
            items-center
            justify-center
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

  // =====================================================
  // UNIVERSITIES
  // =====================================================

  return (
    <div className={gridClass}>
      {universities.map((university) => (
        <UniversityCard
          key={university._id}
          university={university}
          onCompareToggle={handleCompareToggle}
          isCompared={compareItems.some(
            (item) =>
              item._id === university._id
          )}
        />
      ))}
    </div>
  );
}