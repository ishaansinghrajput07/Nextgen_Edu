export default function FilterPanel({
  rating,
  setRating,
  course,
  setCourse,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="glass p-6 rounded-3xl">
      <h3 className="text-2xl font-bold mb-6">Filters</h3>

      {/* Rating */}

      <div className="mb-5">
        <label className="block mb-2">Rating</label>

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="
          w-full
          p-3
          rounded-xl
          bg-black/20
          "
        >
          <option value="">All Ratings</option>

          <option value="4.5">4.5+</option>

          <option value="4.7">4.7+</option>

          <option value="4.8">4.8+</option>
        </select>
      </div>

      {/* Course */}

      <div className="mb-5">
        <label className="block mb-2">Course</label>

        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="
          w-full
          p-3
          rounded-xl
          bg-black/20
          "
        >
          <option value="">All Courses</option>

          <option value="MBA">MBA</option>

          <option value="BBA">BBA</option>

          <option value="BCA">BCA</option>

          <option value="MCA">MCA</option>
        </select>
      </div>

      {/* Sorting */}

      <div>
        <label className="block mb-2">Sort By</label>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="
          w-full
          p-3
          rounded-xl
          bg-black/20
          "
        >
          <option value="">Default</option>

          <option value="rating">Highest Rating</option>

          <option value="fees">Lowest Fees</option>
        </select>
      </div>
    </div>
  );
}
