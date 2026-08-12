import {
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const CounsellorSearchFilterBar = ({
  search,
  onSearch,
  filters,
  onFilterChange,
  onReset,
  counsellorOptions = [],
  universityOptions = [],
  courseOptions = [],
}) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* ============================================================
          HEADER
      ============================================================ */}

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <SlidersHorizontal size={20} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">
              Search & Filters
            </h2>

            <p className="text-xs text-slate-500">
              Find and filter your student records
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
        >
          <RotateCcw size={16} />
          Reset Filters
        </button>
      </div>

      {/* ============================================================
          SEARCH
      ============================================================ */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Search Students
        </label>

        <div className="relative">
          <Search
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by student name, email, phone, lead ID..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
          />
        </div>
      </div>

      {/* ============================================================
          FILTERS
      ============================================================ */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* STATUS */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Admission Status
          </label>

          <div className="relative">
            <Filter
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={filters?.status || "all"}
              onChange={(e) =>
                onFilterChange("status", e.target.value)
              }
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-sm font-medium text-slate-700 outline-none transition-all focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
            >
              <option value="all">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Interested">Interested</option>
              <option value="Applied">Applied</option>
              <option value="Document Pending">
                Document Pending
              </option>
              <option value="Documents Pending">
                Documents Pending
              </option>
              <option value="Documents Verified">
                Documents Verified
              </option>
              <option value="Offer Letter">Offer Letter</option>
              <option value="Fee Paid">Fee Paid</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Rejected">Rejected</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Admission Cancelled">
                Admission Cancelled
              </option>
              <option value="Withdrawn">Withdrawn</option>
            </select>
          </div>
        </div>

        {/* COUNSELLOR */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Counsellor
          </label>

          <select
            value={filters?.counsellor || "all"}
            onChange={(e) =>
              onFilterChange("counsellor", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
          >
            <option value="all">All Counsellors</option>

            {counsellorOptions.map((counsellor) => (
              <option
                key={
                  typeof counsellor === "object"
                    ? counsellor._id
                    : counsellor
                }
                value={
                  typeof counsellor === "object"
                    ? counsellor._id
                    : counsellor
                }
              >
                {typeof counsellor === "object"
                  ? counsellor.name
                  : counsellor}
              </option>
            ))}
          </select>
        </div>

        {/* UNIVERSITY */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            University
          </label>

          <select
            value={filters?.university || "all"}
            onChange={(e) =>
              onFilterChange("university", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
          >
            <option value="all">All Universities</option>

            {universityOptions.map((university) => (
              <option
                key={
                  typeof university === "object"
                    ? university._id
                    : university
                }
                value={
                  typeof university === "object"
                    ? university._id
                    : university
                }
              >
                {typeof university === "object"
                  ? university.name
                  : university}
              </option>
            ))}
          </select>
        </div>

        {/* COURSE */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Course
          </label>

          <select
            value={filters?.course || "all"}
            onChange={(e) =>
              onFilterChange("course", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
          >
            <option value="all">All Courses</option>

            {courseOptions.map((course) => (
              <option
                key={
                  typeof course === "object"
                    ? course._id
                    : course
                }
                value={
                  typeof course === "object"
                    ? course._id
                    : course
                }
              >
                {typeof course === "object"
                  ? course.name
                  : course}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CounsellorSearchFilterBar;