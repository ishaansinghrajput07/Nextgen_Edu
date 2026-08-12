
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import UniversityHero from "../components/universities/UniversityHero";
import UniversityFilters from "../components/universities/UniversityFilters";
import UniversityGrid from "../components/universities/UniversityGrid";

import { getApprovedUniversities } from "../services/universityService";

export default function Universities() {
  const location = useLocation();

  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // Existing Filters
  // ===============================

  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const universitiesPerPage = 6;

  // ============================================================
  // Fetch Universities
  // ============================================================

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);

      const response = await getApprovedUniversities();

      console.log("Universities API Response:", response);

      setUniversities(response?.universities || []);
    } catch (error) {
      console.error("Failed to fetch universities:", error);

      setUniversities([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // Navbar Filter
  // ============================================================

  const navbarFilter = useMemo(() => {
    const pathname = location.pathname;

    if (!pathname.startsWith("/universities/type/")) {
      return "";
    }

    return pathname.split("/universities/type/")[1]?.toLowerCase() || "";
  }, [location.pathname]);

  // ============================================================
  // Navbar Filter Title
  // ============================================================

  const navbarFilterTitle = useMemo(() => {
    const titles = {
      government: "Government Universities",
      private: "Private Universities",
      online: "Online Universities",
      distance: "Distance Universities",
      naac: "NAAC Accredited Universities",
      ugc: "UGC Approved Universities",
      top: "Top Ranked Universities",
    };

    return titles[navbarFilter] || "Universities";
  }, [navbarFilter]);

  // ============================================================
  // Reset All Filters
  // ============================================================

  const resetFilters = () => {
    setSearch("");
    setSelectedCourse("");
    setSelectedType("");
    setMinRating("");
    setSortBy("");
    setCurrentPage(1);
  };

  // ============================================================
  // Main Filtering
  // ============================================================

  const filteredUniversities = useMemo(() => {
    let data = [...universities];

    // ==========================================================
    // Navbar Category Filter
    // ==========================================================

    if (navbarFilter === "government") {
      data = data.filter(
        (university) =>
          university.universityType?.toLowerCase() === "government",
      );
    }

    if (navbarFilter === "private") {
      data = data.filter(
        (university) =>
          university.universityType?.toLowerCase() === "private",
      );
    }

    // ----------------------------------------------------------
    // Online Universities
    // Based on courseMode
    // ----------------------------------------------------------

    if (navbarFilter === "online") {
      data = data.filter((university) =>
        university.courses?.some(
          (course) => course.courseMode?.toLowerCase() === "online",
        ),
      );
    }

    // ----------------------------------------------------------
    // Distance Universities
    // Based on courseMode
    // ----------------------------------------------------------

    if (navbarFilter === "distance") {
      data = data.filter((university) =>
        university.courses?.some(
          (course) => course.courseMode?.toLowerCase() === "distance",
        ),
      );
    }

    // ----------------------------------------------------------
    // NAAC
    // ----------------------------------------------------------

    if (navbarFilter === "naac") {
      data = data.filter(
        (university) => university.naacVerified === true,
      );
    }

    // ----------------------------------------------------------
    // UGC
    // ----------------------------------------------------------

    if (navbarFilter === "ugc") {
      data = data.filter(
        (university) => university.ugcApproved === true,
      );
    }

    // ----------------------------------------------------------
    // Top Ranked
    // ----------------------------------------------------------

    if (navbarFilter === "top") {
      data = data.filter((university) => {
        const ranking = Number(university.ranking);

        return !Number.isNaN(ranking) && ranking > 0;
      });

      // Better ranking first
      data.sort(
        (a, b) =>
          Number(a.ranking || 999999) -
          Number(b.ranking || 999999),
      );
    }

    // ==========================================================
    // Search
    // ==========================================================

    if (search.trim()) {
      const keyword = search.toLowerCase().trim();

      data = data.filter((university) => {
        const universityName =
          university.universityName?.toLowerCase() || "";

        const city = university.city?.toLowerCase() || "";

        const state = university.state?.toLowerCase() || "";

        const country = university.country?.toLowerCase() || "";

        return (
          universityName.includes(keyword) ||
          city.includes(keyword) ||
          state.includes(keyword) ||
          country.includes(keyword)
        );
      });
    }

    // ==========================================================
    // Course Filter
    // ==========================================================

    if (selectedCourse) {
      data = data.filter((university) =>
        university.courses?.some(
          (course) =>
            course.courseName?.toLowerCase() ===
            selectedCourse.toLowerCase(),
        ),
      );
    }

    // ==========================================================
    // University Type Filter
    // ==========================================================

    if (selectedType) {
      data = data.filter(
        (university) =>
          university.universityType?.toLowerCase() ===
          selectedType.toLowerCase(),
      );
    }

    // ==========================================================
    // Rating / Ranking Filter
    // ==========================================================

    if (minRating) {
      data = data.filter(
        (university) =>
          Number(university.ranking || 0) >=
          Number(minRating),
      );
    }

    // ==========================================================
    // Sorting
    // ==========================================================

    if (sortBy === "rating") {
      data.sort(
        (a, b) =>
          Number(b.ranking || 0) -
          Number(a.ranking || 0),
      );
    }

    // ==========================================================
    // Fees Low → High
    // ==========================================================

    if (sortBy === "fees-low") {
      data.sort((a, b) => {
        const feeA = a.courses?.length
          ? Math.min(
              ...a.courses.map(
                (course) => Number(course.fees) || 0,
              ),
            )
          : 0;

        const feeB = b.courses?.length
          ? Math.min(
              ...b.courses.map(
                (course) => Number(course.fees) || 0,
              ),
            )
          : 0;

        return feeA - feeB;
      });
    }

    // ==========================================================
    // Fees High → Low
    // ==========================================================

    if (sortBy === "fees-high") {
      data.sort((a, b) => {
        const feeA = a.courses?.length
          ? Math.min(
              ...a.courses.map(
                (course) => Number(course.fees) || 0,
              ),
            )
          : 0;

        const feeB = b.courses?.length
          ? Math.min(
              ...b.courses.map(
                (course) => Number(course.fees) || 0,
              ),
            )
          : 0;

        return feeB - feeA;
      });
    }

    // ==========================================================
    // Name
    // ==========================================================

    if (sortBy === "name") {
      data.sort((a, b) =>
        (a.universityName || "").localeCompare(
          b.universityName || "",
        ),
      );
    }

    return data;
  }, [
    universities,
    navbarFilter,
    search,
    selectedCourse,
    selectedType,
    minRating,
    sortBy,
  ]);

  // ============================================================
  // Reset Pagination When Filters Change
  // ============================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    navbarFilter,
    search,
    selectedCourse,
    selectedType,
    minRating,
    sortBy,
  ]);

  // ============================================================
  // Pagination
  // ============================================================

  const totalPages = Math.ceil(
    filteredUniversities.length / universitiesPerPage,
  );

  const indexOfLastUniversity =
    currentPage * universitiesPerPage;

  const indexOfFirstUniversity =
    indexOfLastUniversity - universitiesPerPage;

  const currentUniversities =
    filteredUniversities.slice(
      indexOfFirstUniversity,
      indexOfLastUniversity,
    );

  // ============================================================
  // Page Heading
  // ============================================================

  const pageTitle =
    navbarFilter ? navbarFilterTitle : "Universities";

  // ============================================================
  // Render
  // ============================================================

  return (
    <>
      {/* ======================================================
          HERO
      ====================================================== */}

      <UniversityHero
        search={search}
        setSearch={setSearch}
        totalUniversities={filteredUniversities.length}
      />

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <section className="max-w-[1500px] mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* ==================================================
              FILTERS
          ================================================== */}

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

          {/* ==================================================
              RIGHT SIDE
          ================================================== */}

          <div>
            {/* =================================================
                TOP BAR
            ================================================= */}

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
                  {pageTitle}
                </h2>

                <p className="mt-2 text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-blue-600">
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

            {/* =================================================
                UNIVERSITY GRID
            ================================================= */}

            <UniversityGrid
              universities={currentUniversities}
              loading={loading}
              columns={3}
            />

            {/* =================================================
                PAGINATION
            ================================================= */}

            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-3">
                {Array.from(
                  { length: totalPages },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setCurrentPage(index + 1)
                      }
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
    </>
  );
}
