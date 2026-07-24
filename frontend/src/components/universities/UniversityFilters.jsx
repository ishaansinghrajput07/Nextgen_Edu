import {
  Search,
  GraduationCap,
  IndianRupee,
  Star,
  Building2,
  RotateCcw,
  Filter,
} from "lucide-react";

export default function UniversityFilters({
  search,
  setSearch,

  selectedCourse,
  setSelectedCourse,

  selectedType,
  setSelectedType,

  sortBy,
  setSortBy,

  minRating,
  setMinRating,

  resetFilters,
}) {

  return (

    <aside
      className="
      sticky
      top-24

      overflow-hidden

      rounded-[28px]

      bg-white/90
      backdrop-blur-xl

      border
      border-blue-100

      shadow-xl
      "
    >

      {/* Header */}

      <div
        className="
        bg-gradient-to-r
        from-[#2563EB]
        to-[#06B6D4]

        px-6
        py-5

        text-white
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
            h-12
            w-12

            rounded-2xl

            bg-white/20

            flex
            items-center
            justify-center
            "
          >

            <Filter size={22} />

          </div>

          <div>

            <h2 className="text-xl font-bold">
              Filters
            </h2>

            <p className="text-sm text-blue-100">
              Find Your Best University
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-6 space-y-6">

        {/* Search */}

        <div>

          <label
            className="
            mb-2
            flex
            items-center
            gap-2

            text-sm
            font-semibold
            text-slate-700
            "
          >

            <Search
              size={16}
              className="text-blue-600"
            />

            Search

          </label>

          <div className="relative">

            <Search
              size={18}
              className="
              absolute

              left-4
              top-1/2

              -translate-y-1/2

              text-slate-400
              "
            />

            <input
              type="text"

              value={search}

              onChange={(e)=>
                setSearch(e.target.value)
              }

              placeholder="University Name"

              className="
              w-full

              rounded-2xl

              border
              border-slate-200

              bg-slate-50

              pl-11
              pr-4
              py-3

              outline-none

              transition

              focus:border-blue-500
              focus:bg-white
              "
            />

          </div>

        </div>


        {/* Course */}

        <div>

          <label
            className="
            mb-2

            flex
            items-center
            gap-2

            text-sm
            font-semibold
            text-slate-700
            "
          >

            <GraduationCap
              size={16}
              className="text-blue-600"
            />

            Course

          </label>

          <select
            value={selectedCourse}
            onChange={(e) =>
              setSelectedCourse(e.target.value)
            }
            className="
            w-full

            rounded-2xl

            border
            border-slate-200

            bg-slate-50

            px-4
            py-3

            outline-none

            transition

            focus:border-blue-500
            focus:bg-white
            "
          >

            <option value="">
              All Courses
            </option>

            <option value="MBA">
              MBA
            </option>

            <option value="BBA">
              BBA
            </option>

            <option value="BCA">
              BCA
            </option>

            <option value="MCA">
              MCA
            </option>

            <option value="M.Tech">
              M.Tech
            </option>

            <option value="B.Tech">
              B.Tech
            </option>

          </select>

        </div>

        {/* University Type */}

        <div>

          <label
            className="
            mb-2

            flex
            items-center
            gap-2

            text-sm
            font-semibold
            text-slate-700
            "
          >

            <Building2
              size={16}
              className="text-blue-600"
            />

            University Type

          </label>

          <select
            value={selectedType}
            onChange={(e) =>
              setSelectedType(e.target.value)
            }
            className="
            w-full

            rounded-2xl

            border
            border-slate-200

            bg-slate-50

            px-4
            py-3

            outline-none

            transition

            focus:border-blue-500
            focus:bg-white
            "
          >

            <option value="">
              All Types
            </option>

            <option value="Private">
              Private
            </option>

            <option value="Government">
              Government
            </option>

            <option value="Deemed">
              Deemed
            </option>

            <option value="Autonomous">
              Autonomous
            </option>

          </select>

        </div>

        {/* Minimum Rating */}

        <div>

          <label
            className="
            mb-2

            flex
            items-center
            gap-2

            text-sm
            font-semibold
            text-slate-700
            "
          >

            <Star
              size={16}
              className="text-yellow-500"
            />

            Minimum Rating

          </label>

          <select
            value={minRating}
            onChange={(e) =>
              setMinRating(e.target.value)
            }
            className="
            w-full

            rounded-2xl

            border
            border-slate-200

            bg-slate-50

            px-4
            py-3

            outline-none

            transition

            focus:border-blue-500
            focus:bg-white
            "
          >

            <option value="">
              All Ratings
            </option>

            <option value="4">
              ⭐ 4.0+
            </option>

            <option value="4.5">
              ⭐ 4.5+
            </option>

            <option value="4.8">
              ⭐ 4.8+
            </option>

          </select>

        </div>

   

        {/* Sort By */}

        <div>

          <label
            className="
            mb-2

            flex
            items-center
            gap-2

            text-sm
            font-semibold
            text-slate-700
            "
          >

            <IndianRupee
              size={16}
              className="text-green-600"
            />

            Sort Results

          </label>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="
            w-full

            rounded-2xl

            border
            border-slate-200

            bg-slate-50

            px-4
            py-3

            outline-none

            transition-all

            focus:border-blue-500
            focus:bg-white
            "
          >

            <option value="">
              Default
            </option>

            <option value="rating">
              Highest Rating
            </option>

            <option value="fees-low">
              Lowest Fees
            </option>

            <option value="fees-high">
              Highest Fees
            </option>

            <option value="name">
              A - Z
            </option>

          </select>

        </div>

        {/* Quick Filters */}

        <div>

          <h3
            className="
            mb-3

            text-sm
            font-semibold
            text-slate-700
            "
          >
            Quick Filters
          </h3>

          <div className="flex flex-wrap gap-2">

            <button
              type="button"
              className="
              rounded-full

              border
              border-blue-200

              bg-blue-50

              px-4
              py-2

              text-xs
              font-medium
              text-blue-700

              hover:bg-blue-600
              hover:text-white

              transition
              "
            >
              NAAC
            </button>

            <button
              type="button"
              className="
              rounded-full

              border
              border-green-200

              bg-green-50

              px-4
              py-2

              text-xs
              font-medium
              text-green-700

              hover:bg-green-600
              hover:text-white

              transition
              "
            >
              UGC
            </button>

            <button
              type="button"
              className="
              rounded-full

              border
              border-purple-200

              bg-purple-50

              px-4
              py-2

              text-xs
              font-medium
              text-purple-700

              hover:bg-purple-600
              hover:text-white

              transition
              "
            >
              Hostel
            </button>

            <button
              type="button"
              className="
              rounded-full

              border
              border-amber-200

              bg-amber-50

              px-4
              py-2

              text-xs
              font-medium
              text-amber-700

              hover:bg-amber-500
              hover:text-white

              transition
              "
            >
              Scholarship
            </button>

          </div>

        </div>

        {/* Reset Button */}

        <button
          type="button"
          onClick={resetFilters}
          className="
          w-full

          mt-2

          flex
          items-center
          justify-center
          gap-2

          rounded-2xl

          bg-gradient-to-r
          from-[#2563EB]
          to-[#06B6D4]

          py-3

          text-white
          font-semibold

          shadow-lg

          transition-all
          duration-300

          hover:scale-[1.02]
          hover:shadow-xl
          "
        >

          <RotateCcw size={18} />

          Reset Filters

        </button>

      </div>

    </aside>

  );

}