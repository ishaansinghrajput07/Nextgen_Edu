export default function SearchBar({
  value,
  onChange,
}) {
  return (
    <input
      type="text"
      placeholder="Search University..."
      value={value}
      onChange={onChange}
      className="
      w-full
      p-4
      rounded-xl
      bg-[#111827]
      border
      border-white/10
      "
    />
  );
}