import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  X,
  ChevronDown,
} from "lucide-react";

// ============================================================
// STATUS OPTIONS
// ============================================================

const STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Interested",
  "Applied",
  "Document Pending",
  "Documents Pending",
  "Documents Verified",
  "Offer Letter",
  "Fee Paid",
  "Enrolled",
  "Rejected",
  "Cancelled",
  "Admission Cancelled",
  "Withdrawn",
];

// ============================================================
// SEARCH FILTER BAR
// ============================================================

const SearchFilterBar = ({
  search = "",
  onSearch,
  filters = {},
  onFilterChange,
  onReset,
  counsellorOptions = [],
  universityOptions = [],
  courseOptions = [],
}) => {
  // ============================================================
  // ACTIVE FILTER CHECK
  // ============================================================

  const hasActiveFilters =
    Boolean(search.trim()) ||
    filters.status !== "all" ||
    filters.counsellor !== "all" ||
    filters.university !== "all" ||
    filters.course !== "all";

  // ============================================================
  // SAFE ARRAY
  // ============================================================

  const safeCounsellors = Array.isArray(counsellorOptions)
    ? counsellorOptions
    : [];

  const safeUniversities = Array.isArray(universityOptions)
    ? universityOptions
    : [];

  const safeCourses = Array.isArray(courseOptions)
    ? courseOptions
    : [];

  // ============================================================
  // OBJECT / STRING LABEL HELPERS
  // ============================================================

  const getOptionValue = (option) => {
    if (!option) return "";

    if (typeof option === "string") {
      return option;
    }

    return option?._id || option?.id || option?.name || "";
  };

  const getOptionLabel = (option) => {
    if (!option) return "";

    if (typeof option === "string") {
      return option;
    }

    return (
      option?.name ||
      option?.universityName ||
      option?.courseName ||
      option?.title ||
      option?.fullName ||
      option?.employeeId ||
      ""
    );
  };

  // ============================================================
  // SEARCH CLEAR
  // ============================================================

  const clearSearch = () => {
    onSearch?.("");
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* ========================================================
          TOP SECTION
      ======================================================== */}

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Search */}

        <div className="relative w-full xl:max-w-xl">
          <Search
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              onSearch?.(event.target.value)
            }
            placeholder="Search student, email, phone, ID..."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
              title="Clear search"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter heading */}

        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <SlidersHorizontal size={17} />
          </div>

          <div>
            <p>Student Filters</p>

            <p className="text-xs font-normal text-slate-400">
              Filter admission records
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================
          FILTERS
      ======================================================== */}

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {/* ======================================================
            STATUS
        ====================================================== */}

        <div className="relative">
          <label
            htmlFor="student-status-filter"
            className="mb-1.5 block text-xs font-semibold text-slate-500"
          >
            Admission Status
          </label>

          <div className="relative">
            <select
              id="student-status-filter"
              value={filters.status || "all"}
              onChange={(event) =>
                onFilterChange?.(
                  "status",
                  event.target.value
                )
              }
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            >
              <option value="all">
                All Statuses
              </option>

              {STATUS_OPTIONS.map((status) => (
                <option
                  key={status}
                  value={status.toLowerCase()}
                >
                  {status}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {/* ======================================================
            COUNSELLOR
        ====================================================== */}

        <div className="relative">
          <label
            htmlFor="student-counsellor-filter"
            className="mb-1.5 block text-xs font-semibold text-slate-500"
          >
            Counsellor
          </label>

          <div className="relative">
            <select
              id="student-counsellor-filter"
              value={filters.counsellor || "all"}
              onChange={(event) =>
                onFilterChange?.(
                  "counsellor",
                  event.target.value
                )
              }
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            >
              <option value="all">
                All Counsellors
              </option>

              {safeCounsellors.map(
                (counsellor, index) => {
                  const value =
                    getOptionValue(counsellor);

                  const label =
                    getOptionLabel(counsellor);

                  if (!value || !label) {
                    return null;
                  }

                  return (
                    <option
                      key={`${value}-${index}`}
                      value={value}
                    >
                      {label}
                    </option>
                  );
                }
              )}
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {/* ======================================================
            UNIVERSITY
        ====================================================== */}

        <div className="relative">
          <label
            htmlFor="student-university-filter"
            className="mb-1.5 block text-xs font-semibold text-slate-500"
          >
            University
          </label>

          <div className="relative">
            <select
              id="student-university-filter"
              value={filters.university || "all"}
              onChange={(event) =>
                onFilterChange?.(
                  "university",
                  event.target.value
                )
              }
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            >
              <option value="all">
                All Universities
              </option>

              {safeUniversities.map(
                (university, index) => {
                  const value =
                    getOptionValue(university);

                  const label =
                    getOptionLabel(university);

                  if (!value || !label) {
                    return null;
                  }

                  return (
                    <option
                      key={`${value}-${index}`}
                      value={value}
                    >
                      {label}
                    </option>
                  );
                }
              )}
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {/* ======================================================
            COURSE
        ====================================================== */}

        <div className="relative">
          <label
            htmlFor="student-course-filter"
            className="mb-1.5 block text-xs font-semibold text-slate-500"
          >
            Course
          </label>

          <div className="relative">
            <select
              id="student-course-filter"
              value={filters.course || "all"}
              onChange={(event) =>
                onFilterChange?.(
                  "course",
                  event.target.value
                )
              }
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            >
              <option value="all">
                All Courses
              </option>

              {safeCourses.map((course, index) => {
                const value =
                  getOptionValue(course);

                const label =
                  getOptionLabel(course);

                if (!value || !label) {
                  return null;
                }

                return (
                  <option
                    key={`${value}-${index}`}
                    value={value}
                  >
                    {label}
                  </option>
                );
              })}
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* ========================================================
          ACTIVE FILTER FOOTER
      ======================================================== */}

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {search.trim() && (
            <span className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
              Search: {search.trim()}
            </span>
          )}

          {filters.status !== "all" && (
            <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold capitalize text-violet-700">
              Status: {filters.status}
            </span>
          )}

          {filters.counsellor !== "all" && (
            <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
              Counsellor selected
            </span>
          )}

          {filters.university !== "all" && (
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              University selected
            </span>
          )}

          {filters.course !== "all" && (
            <span className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700">
              Course selected
            </span>
          )}

          {!hasActiveFilters && (
            <span className="text-xs text-slate-400">
              No filters applied
            </span>
          )}
        </div>

        {/* Reset */}

        <button
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw size={15} />

          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilterBar;