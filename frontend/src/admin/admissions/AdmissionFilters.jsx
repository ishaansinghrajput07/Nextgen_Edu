
import { Filter, RotateCcw } from "lucide-react";

const AdmissionFilters = ({ filters, setFilters }) => {
  const handleChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      admissionStatus: "",
      university: "",
      counsellor: "",
    });
  };

  return (
    <div
      className="
        bg-white/75
        backdrop-blur-2xl
        border
        border-white/80
        rounded-3xl
        shadow-[0_15px_45px_rgba(14,165,233,.08)]
        p-5
        sm:p-6
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          gap-3
          mb-5
        "
      >
        <div
          className="
            h-11
            w-11
            rounded-2xl
            bg-cyan-50
            flex
            items-center
            justify-center
          "
        >
          <Filter
            className="text-cyan-600"
            size={21}
          />
        </div>

        <div>
          <h2
            className="
              text-lg
              font-bold
              text-slate-800
            "
          >
            Filter Admissions
          </h2>

          <p
            className="
              text-xs
              text-slate-500
              mt-0.5
            "
          >
            Filter admission records
          </p>
        </div>
      </div>

      {/* Filters */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-4
        "
      >
        {/* Status */}

        <select
          value={filters.admissionStatus}
          onChange={(e) =>
            handleChange(
              "admissionStatus",
              e.target.value,
            )
          }
          className="
            w-full
            bg-slate-50
            border
            border-slate-200
            text-slate-700
            rounded-xl
            px-4
            py-3
            outline-none
            focus:border-cyan-400
            focus:ring-4
            focus:ring-cyan-50
            transition-all
          "
        >
          <option value="">
            All Status
          </option>

          <option value="Applied">
            Applied
          </option>

          <option value="Documents Pending">
            Documents Pending
          </option>

          <option value="Documents Verified">
            Documents Verified
          </option>

          <option value="Offer Letter">
            Offer Letter
          </option>

          <option value="Fee Paid">
            Fee Paid
          </option>

          <option value="Enrolled">
            Enrolled
          </option>
        </select>

        {/* University */}

        <input
          value={filters.university}
          onChange={(e) =>
            handleChange(
              "university",
              e.target.value,
            )
          }
          placeholder="University ID"
          className="
            w-full
            bg-slate-50
            border
            border-slate-200
            text-slate-700
            placeholder:text-slate-400
            rounded-xl
            px-4
            py-3
            outline-none
            focus:border-cyan-400
            focus:ring-4
            focus:ring-cyan-50
            transition-all
          "
        />

        {/* Counsellor */}

        <input
          value={filters.counsellor}
          onChange={(e) =>
            handleChange(
              "counsellor",
              e.target.value,
            )
          }
          placeholder="Counsellor ID"
          className="
            w-full
            bg-slate-50
            border
            border-slate-200
            text-slate-700
            placeholder:text-slate-400
            rounded-xl
            px-4
            py-3
            outline-none
            focus:border-cyan-400
            focus:ring-4
            focus:ring-cyan-50
            transition-all
          "
        />

        {/* Reset */}

        <button
          onClick={resetFilters}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-slate-100
            border
            border-slate-200
            text-slate-600
            font-semibold
            hover:bg-cyan-50
            hover:text-cyan-600
            hover:border-cyan-200
            transition-all
            duration-300
          "
        >
          <RotateCcw size={18} />

          Reset
        </button>
      </div>
    </div>
  );
};

export default AdmissionFilters;
