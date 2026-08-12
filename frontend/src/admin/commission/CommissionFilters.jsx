import { Search, Filter, RotateCcw } from "lucide-react";

const CommissionFilters = ({ filters, setFilters }) => {
  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  // =====================================================
  // RESET FILTER
  // =====================================================

  const resetFilters = () => {
    setFilters({});
  };

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      border
      border-gray-100
      p-5
    "
    >
      <div
        className="
        flex
        items-center
        gap-2
        mb-5
      "
      >
        <Filter size={20} className="text-blue-600" />

        <h2
          className="
          text-lg
          font-semibold
          text-gray-800
        "
        >
          Commission Filters
        </h2>
      </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-5
        gap-4
      "
      >
        {/* Search Counsellor */}

        <div
          className="
          relative
        "
        >
          <Search
            size={18}
            className="
              absolute
              left-3
              top-3
              text-gray-400
            "
          />

          <input
            type="text"
            name="search"
            value={filters.search || ""}
            onChange={handleChange}
            placeholder="Search counsellor...
            "
            className="
              w-full
              pl-10
              pr-3
              py-2.5
              rounded-xl
              border
              border-gray-200
              focus:ring-2
              focus:ring-blue-400
              outline-none
            "
          />
        </div>

        {/* Payment Status */}

        <select
          name="paymentStatus"
          value={filters.paymentStatus || ""}
          onChange={handleChange}
          className="
            px-3
            py-2.5
            rounded-xl
            border
            border-gray-200
            outline-none
            focus:ring-2
            focus:ring-blue-400
          "
        >
          <option value="">All Payments</option>

          <option value="Paid">Paid</option>

          <option value="Pending">Pending</option>

          <option value="Partial">Partial</option>
        </select>

        {/* From Date */}

        <input
          type="date"
          name="fromDate"
          value={filters.fromDate || ""}
          onChange={handleChange}
          className="
            px-3
            py-2.5
            rounded-xl
            border
            border-gray-200
            outline-none
            focus:ring-2
            focus:ring-blue-400
          "
        />

        {/* To Date */}

        <input
          type="date"
          name="toDate"
          value={filters.toDate || ""}
          onChange={handleChange}
          className="
            px-3
            py-2.5
            rounded-xl
            border
            border-gray-200
            outline-none
            focus:ring-2
            focus:ring-blue-400
          "
        />

        {/* Reset Button */}

        <button
          onClick={resetFilters}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gray-100
            hover:bg-gray-200
            text-gray-700
            transition
          "
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default CommissionFilters;
