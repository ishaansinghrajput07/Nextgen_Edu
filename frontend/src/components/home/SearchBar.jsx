import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <section className="pb-20">

      <div className="max-w-4xl mx-auto px-6">

        <div
          className="
          glass
          rounded-3xl
          p-4
          flex
          items-center
          gap-4
          "
        >

          <Search />

          <input
            type="text"
            placeholder="Search Courses, Universities..."
            className="
            w-full
            bg-transparent
            outline-none
            "
          />

          <button
            className="
            bg-cyan-500
            px-6
            py-3
            rounded-xl
            "
          >
            Search
          </button>

        </div>

      </div>

    </section>
  );
}