export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <input
      type="text"
      placeholder="Search University..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="
      w-full
      p-4
      rounded-2xl
      bg-black/20
      border
      border-white/10
      "
    />
  );
}