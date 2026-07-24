import { useEffect, useMemo, useState } from "react";

import UniversityHero from "../components/universities/UniversityHero";
import UniversityFilters from "../components/universities/UniversityFilters";
import UniversityGrid from "../components/universities/UniversityGrid";

import { getApprovedUniversities } from "../services/universityService";

export default function Universities() {
  const [universities, setUniversities] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedCourse, setSelectedCourse] = useState("");

  const [selectedType, setSelectedType] = useState("");

  const [minRating, setMinRating] = useState("");

  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const universitiesPerPage = 6;

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);

      const response = await getApprovedUniversities();

      console.log(response);

      setUniversities(response.universities || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearch("");

    setSelectedCourse("");

    setSelectedType("");

    setMinRating("");

    setSortBy("");

    setCurrentPage(1);
  };

  const filteredUniversities = useMemo(() => {
    let data = [...universities];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      data = data.filter((university) => {
        const universityName = university.universityName?.toLowerCase() || "";

        const city = university.city?.toLowerCase() || "";

        const state = university.state?.toLowerCase() || "";

        return (
          universityName.includes(keyword) ||
          city.includes(keyword) ||
          state.includes(keyword)
        );
      });
    }

    // ================= Course =================

    if (selectedCourse) {
      data = data.filter((university) =>
        university.courses?.some(
          (course) => course.courseName === selectedCourse,
        ),
      );
    }

    // ================= University Type =================

    if (selectedType) {
      data = data.filter(
        (university) => university.universityType === selectedType,
      );
    }

    // ================= Rating =================

    if (minRating) {
      data = data.filter(
        (university) => Number(university.ranking || 0) >= Number(minRating),
      );
    }

    // ================= Sorting =================

    if (sortBy === "rating") {
      data.sort((a, b) => Number(b.ranking || 0) - Number(a.ranking || 0));
    }

    if (sortBy === "fees-low") {
      data.sort((a, b) => {
        const feeA = a.courses?.length
          ? Math.min(...a.courses.map((course) => Number(course.fees) || 0))
          : 0;

        const feeB = b.courses?.length
          ? Math.min(...b.courses.map((course) => Number(course.fees) || 0))
          : 0;

        return feeA - feeB;
      });
    }

    if (sortBy === "fees-high") {
      data.sort((a, b) => {
        const feeA = a.courses?.length
          ? Math.min(...a.courses.map((course) => Number(course.fees) || 0))
          : 0;

        const feeB = b.courses?.length
          ? Math.min(...b.courses.map((course) => Number(course.fees) || 0))
          : 0;

        return feeB - feeA;
      });
    }

    if (sortBy === "name") {
      data.sort((a, b) => a.universityName.localeCompare(b.universityName));
    }

    return data;
  }, [universities, search, selectedCourse, selectedType, minRating, sortBy]);

  // ================= Pagination =================

  const totalPages = Math.ceil(
    filteredUniversities.length / universitiesPerPage,
  );

  const indexOfLastUniversity = currentPage * universitiesPerPage;

  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;

  const currentUniversities = filteredUniversities.slice(
    indexOfFirstUniversity,

    indexOfLastUniversity,
  );

  return (
    <main className="bg-slate-50">
      {/* ================= Hero ================= */}

      <UniversityHero
        search={search}
        setSearch={setSearch}
        totalUniversities={filteredUniversities.length}
      />

      {/* ================= Content ================= */}

      <section className="max-w-[1500px] mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Filters */}

          <UniversityFilters
            search={search}
            setSearch={setSearch}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            minRating={minRating}
            setMinRating={setMinRating}
            sortBy={sortBy}
            setSortBy={setSortBy}
            resetFilters={resetFilters}
          />

          {/* Right Side */}

          <div>
            {/* Top Bar */}

            <div
              className="
              flex
              flex-col
              md:flex-row

              md:items-center
              md:justify-between

              gap-4

              mb-8
              "
            >
              <div>
                <h2
                  className="
                  text-3xl
                  font-bold

                  text-slate-900
                  "
                >
                  Universities
                </h2>

                <p className="mt-2 text-slate-500">
                  Showing
                  <span className="font-semibold text-blue-600">
                    {" "}
                    {currentUniversities.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-800">
                    {filteredUniversities.length}
                  </span>{" "}
                  Universities
                </p>
              </div>
            </div>

            {/* Grid */}

            <UniversityGrid
              universities={currentUniversities}
              loading={loading}
              columns={3}
            />

            {/* Pagination */}

            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-3">
                {Array.from(
                  { length: totalPages },

                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`
                      h-11
                      w-11

                      rounded-xl

                      font-semibold

                      transition-all

                      ${
                        currentPage === index + 1
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                          : "bg-white border border-slate-200 text-slate-700 hover:border-blue-500"
                      }
                      `}
                    >
                      {index + 1}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
