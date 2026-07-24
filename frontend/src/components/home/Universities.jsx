import {
  Search,
  MapPin,
  GraduationCap,
  RotateCcw,
} from "lucide-react";

export default function UniversityFilters({
  search,
  setSearch,
  location,
  setLocation,
  course,
  setCourse,
  universities,
  courses,
}) {
  const locations = [
    ...new Set(
      universities
        .map((u) =>
          [u.city, u.state, u.country]
            .filter(Boolean)
            .join(", ")
        )
        .filter(Boolean)
    ),
  ];

  return (
    <div
     className="
  relative
  mb-14
  overflow-hidden
  transition-all
  duration-500
  hover:shadow-cyan-500/20
  hover:shadow-2xl
"
    >
      {/* Background Blur */}

      <div
        className="
          absolute
          -top-16
          -right-16
          h-52
          w-52
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-16
          -left-16
          h-52
          w-52
          rounded-full
          bg-blue-600/10
          blur-3xl
        "
      />

      <div className="relative z-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Find Your Dream University
          </h2>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
  Search universities by name, location or course.
</p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

          {/* Search */}

          <div className="relative">
            <Search
              size={20}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search University..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
  w-full
  rounded-2xl
  bg-white
  dark:bg-white/5
  border
  border-gray-200
  dark:border-white/10
  pl-12
  pr-4
  py-4
  text-gray-900
  dark:text-white
  placeholder:text-gray-500
  dark:placeholder:text-gray-400
  focus:border-cyan-400
  focus:ring-2
  focus:ring-cyan-400/20
  outline-none
  transition
"
            />
          </div>

          {/* Location */}

         <div className="relative">
  <button
    onClick={() => setLocationOpen(!locationOpen)}
    className="
      w-full
      rounded-2xl
      bg-white
      dark:bg-slate-800
      border
      border-gray-200
      dark:border-white/10
      px-4
      py-4
      flex
      justify-between
      items-center
    "
  >
    <span>{location || "All Locations"}</span>
    <ChevronDown size={18} />
  </button>

  {locationOpen && (
    <div
      className="
        absolute
        top-full
        left-0
        mt-2
        w-full
        rounded-2xl
        bg-white
        dark:bg-slate-800
        border
        border-gray-200
        dark:border-white/10
        shadow-2xl
        overflow-hidden
        z-50
      "
    >
      <button
        onClick={() => {
          setLocation("");
          setLocationOpen(false);
        }}
        className="
block
w-full
px-4
py-3
text-left
text-gray-700
dark:text-white
bg-white
dark:bg-slate-800
hover:bg-cyan-500
hover:text-white
transition
"
      >
        All Locations
      </button>

      {locations.map((loc) => (
        <button
          key={loc}
          onClick={() => {
            setLocation(loc);
            setLocationOpen(false);
          }}
          className="
block
w-full
px-4
py-3
text-left
text-gray-700
dark:text-white
bg-white
dark:bg-slate-800
hover:bg-cyan-500
hover:text-white
transition
"
        >
          {loc}
        </button>
      ))}
    </div>
  )}
</div>
                    {/* Clear Filters */}

          <div className="flex items-center">
            <button
              onClick={() => {
                setSearch("");
                setLocation("");
                setCourse("");
              }}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-cyan-500
                hover:bg-cyan-400
                py-4
                font-semibold
                transition
                shadow-lg
                shadow-cyan-500/20
              "
            >
              <RotateCcw size={20} />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Bottom Section */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          {/* Active Filters */}

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Active Filters
            </h3>

            <div className="flex flex-wrap gap-3">

              {search && (
                <span
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-cyan-500/20
                    border
                    border-cyan-500/30
                    text-cyan-300
                    text-sm
                  "
                >
                  🔍 {search}
                </span>
              )}

              {location && (
                <span
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-blue-500/20
                    border
                    border-blue-500/30
                    text-blue-300
                    text-sm
                  "
                >
                  📍 {location}
                </span>
              )}

              {course && (
                <span
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-green-500/20
                    border
                    border-green-500/30
                    text-green-300
                    text-sm
                  "
                >
                  🎓 {course}
                </span>
              )}

              {!search && !location && !course && (
                <span className="text-gray-600 dark:text-gray-500">
                  No filters selected.
                </span>
              )}
            </div>
          </div>

          {/* Statistics */}

          <div
            className="
              rounded-2xl
              border
              border-gray-200
dark:border-white/10
bg-white
dark:bg-white/5
shadow-lg
dark:shadow-none
              p-6
            "
          >
            <h3 className="text-lg font-semibold mb-6">
              University Statistics
            </h3>

            <div className="grid grid-cols-2 gap-6">

              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Universities
                </p>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-cyan-400 mt-2">
                  {universities.length}
                </h2>
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  Courses
                </p>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-green-400 mt-2">
                  {courses.length}
                </h2>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )}