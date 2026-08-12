import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import CounsellorStudentStats from "../students/CounsellorStudentStats";
import CounsellorSearchFilterBar from "../students/CounsellorSearchFilterBar";
import CounsellorStudentTable from "../students/CounsellorStudentTable";
import CounsellorStudentDetailsDrawer from "../students/CounsellorStudentDetailsDrawer";

const BASE_URL =
  "http://localhost:8000/api/v1/student";

const PAGE_SIZE = 10;

const initialFilters = {
  status: "all",
  university: "all",
  course: "all",
};

const CounsellorStudents = () => {
  // ============================================================
  // AUTH
  // ============================================================

  const token = localStorage.getItem("token");

  const user = useMemo(() => {
    try {
      const storedUser =
        localStorage.getItem("user");

      return storedUser
        ? JSON.parse(storedUser)
        : null;
    } catch (error) {
      console.error(
        "USER PARSE ERROR:",
        error
      );

      return null;
    }
  }, []);

  // ============================================================
  // AUTH HEADERS
  // ============================================================

  const authHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  // ============================================================
  // MAIN STATES
  // ============================================================

  const [students, setStudents] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [tableLoading, setTableLoading] =
    useState(false);

  // ============================================================
  // SEARCH + FILTER
  // ============================================================

  const [search, setSearch] =
    useState("");

  const [filters, setFilters] =
    useState(initialFilters);

  // ============================================================
  // PAGINATION
  // ============================================================

  const [currentPage, setCurrentPage] =
    useState(1);

  // ============================================================
  // SORTING
  // ============================================================

  const [sortField, setSortField] =
    useState("createdAt");

  const [sortOrder, setSortOrder] =
    useState("desc");

  // ============================================================
  // DRAWER
  // ============================================================

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [studentLoading, setStudentLoading] =
    useState(false);

  // ============================================================
  // REFRESH
  // ============================================================

  const [refreshKey, setRefreshKey] =
    useState(0);

  // ============================================================
  // FETCH STUDENTS
  // ============================================================

  const fetchStudents = useCallback(
    async () => {
      try {
        setLoading(true);
        setTableLoading(true);

        const { data } = await axios.get(
          BASE_URL,
          {
            headers: authHeaders,
          }
        );

        console.log(
          "COUNSELLOR STUDENTS API:",
          data
        );

        const list =
          data?.students ||
          data?.data?.students ||
          data?.data ||
          [];

        setStudents(
          Array.isArray(list)
            ? list
            : []
        );
      } catch (error) {
        console.error(
          "FETCH COUNSELLOR STUDENTS ERROR:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Unable to fetch students"
        );
      } finally {
        setLoading(false);
        setTableLoading(false);
      }
    },
    [authHeaders]
  );

  // ============================================================
  // GET SINGLE STUDENT
  // ============================================================

  const fetchStudentById = useCallback(
    async (studentId) => {
      if (!studentId) return;

      try {
        setStudentLoading(true);

        const { data } =
          await axios.get(
            `${BASE_URL}/${studentId}`,
            {
              headers: authHeaders,
            }
          );

        const student =
          data?.student ||
          data?.data ||
          data;

        setSelectedStudent(student);
        setDrawerOpen(true);
      } catch (error) {
        console.error(
          "FETCH STUDENT DETAILS ERROR:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Unable to load student details"
        );
      } finally {
        setStudentLoading(false);
      }
    },
    [authHeaders]
  );

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents, refreshKey]);

  // ============================================================
  // GET CURRENT COUNSELLOR ID
  // ============================================================

  const counsellorId = useMemo(() => {
    return (
      user?._id ||
      user?.id ||
      user?.counsellorId ||
      user?.counsellor?._id ||
      null
    );
  }, [user]);

  // ============================================================
  // COUNSELLOR STUDENTS
  // ============================================================

  const counsellorStudents =
    useMemo(() => {
      /*
       * Backend should ideally return only the
       * logged-in counsellor's students.
       *
       * This frontend safety filter handles
       * populated counsellor objects too.
       */

      if (!counsellorId) {
        return students;
      }

      return students.filter(
        (student) => {
          const studentCounsellor =
            student?.counsellor;

          if (!studentCounsellor) {
            return false;
          }

          if (
            typeof studentCounsellor ===
            "string"
          ) {
            return (
              studentCounsellor ===
              counsellorId
            );
          }

          return (
            studentCounsellor?._id ===
            counsellorId
          );
        }
      );
    }, [students, counsellorId]);

  // ============================================================
  // SEARCH + FILTER
  // ============================================================

  const filteredStudents = useMemo(() => {
    let data = [
      ...counsellorStudents,
    ];

    // ----------------------------------------------------------
    // SEARCH
    // ----------------------------------------------------------

    if (search.trim()) {
      const keyword =
        search
          .toLowerCase()
          .trim();

      data = data.filter(
        (student) => {
          const universityName =
            typeof student?.university ===
            "object"
              ? student?.university?.name
              : student?.university;

          const courseName =
            typeof student?.course ===
            "object"
              ? student?.course?.name
              : student?.course;

          return (
            student?.studentName
              ?.toLowerCase()
              .includes(keyword) ||

            student?.email
              ?.toLowerCase()
              .includes(keyword) ||

            student?.phoneNumber
              ?.toLowerCase()
              .includes(keyword) ||

            student?.studentNumber
              ?.toLowerCase()
              .includes(keyword) ||

            student?.leadId
              ?.toLowerCase()
              .includes(keyword) ||

            universityName
              ?.toLowerCase()
              .includes(keyword) ||

            courseName
              ?.toLowerCase()
              .includes(keyword)
          );
        }
      );
    }

    // ----------------------------------------------------------
    // STATUS
    // ----------------------------------------------------------

    if (
      filters.status !== "all"
    ) {
      data = data.filter(
        (student) =>
          String(
            student?.admissionStatus ||
              ""
          ).toLowerCase() ===
          String(
            filters.status
          ).toLowerCase()
      );
    }

    // ----------------------------------------------------------
    // UNIVERSITY
    // ----------------------------------------------------------

    if (
      filters.university !==
      "all"
    ) {
      data = data.filter(
        (student) => {
          const universityName =
            typeof student?.university ===
            "object"
              ? student?.university?.name
              : student?.university;

          return (
            universityName ===
            filters.university
          );
        }
      );
    }

    // ----------------------------------------------------------
    // COURSE
    // ----------------------------------------------------------

    if (
      filters.course !== "all"
    ) {
      data = data.filter(
        (student) => {
          const courseName =
            typeof student?.course ===
            "object"
              ? student?.course?.name
              : student?.course;

          return (
            courseName ===
            filters.course
          );
        }
      );
    }

    return data;
  }, [
    counsellorStudents,
    search,
    filters,
  ]);

  // ============================================================
  // SORTING
  // ============================================================

  const sortedStudents = useMemo(() => {
    const list = [
      ...filteredStudents,
    ];

    list.sort((a, b) => {
      let valueA =
        a?.[sortField];

      let valueB =
        b?.[sortField];

      // --------------------------------------------------------
      // OBJECT VALUES
      // --------------------------------------------------------

      if (
        typeof valueA ===
        "object" &&
        valueA !== null
      ) {
        valueA =
          valueA?.name ||
          valueA?.title ||
          "";
      }

      if (
        typeof valueB ===
        "object" &&
        valueB !== null
      ) {
        valueB =
          valueB?.name ||
          valueB?.title ||
          "";
      }

      // --------------------------------------------------------
      // EMPTY VALUES
      // --------------------------------------------------------

      if (
        valueA === undefined ||
        valueA === null
      ) {
        valueA = "";
      }

      if (
        valueB === undefined ||
        valueB === null
      ) {
        valueB = "";
      }

      // --------------------------------------------------------
      // DATE SORTING
      // --------------------------------------------------------

      if (
        sortField ===
          "createdAt" ||
        sortField ===
          "updatedAt"
      ) {
        valueA =
          new Date(
            valueA
          ).getTime() || 0;

        valueB =
          new Date(
            valueB
          ).getTime() || 0;

        return sortOrder ===
          "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      // --------------------------------------------------------
      // NUMBER SORTING
      // --------------------------------------------------------

      if (
        typeof valueA ===
          "number" &&
        typeof valueB ===
          "number"
      ) {
        return sortOrder ===
          "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      // --------------------------------------------------------
      // STRING SORTING
      // --------------------------------------------------------

      valueA = String(
        valueA
      ).toLowerCase();

      valueB = String(
        valueB
      ).toLowerCase();

      if (
        sortOrder === "asc"
      ) {
        return valueA.localeCompare(
          valueB
        );
      }

      return valueB.localeCompare(
        valueA
      );
    });

    return list;
  }, [
    filteredStudents,
    sortField,
    sortOrder,
  ]);

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalStudents =
    sortedStudents.length;

  const totalPages = Math.max(
    1,
    Math.ceil(
      totalStudents /
        PAGE_SIZE
    )
  );

  const paginatedStudents =
    useMemo(() => {
      const start =
        (currentPage - 1) *
        PAGE_SIZE;

      const end =
        start + PAGE_SIZE;

      return sortedStudents.slice(
        start,
        end
      );
    }, [
      sortedStudents,
      currentPage,
    ]);

  // ============================================================
  // RESET PAGE
  // ============================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    filters,
  ]);

  // ============================================================
  // PAGE SAFETY
  // ============================================================

  useEffect(() => {
    if (
      currentPage >
      totalPages
    ) {
      setCurrentPage(
        totalPages
      );
    }
  }, [
    currentPage,
    totalPages,
  ]);

  // ============================================================
  // FILTER OPTIONS
  // ============================================================

  const universityOptions =
    useMemo(() => {
      return [
        ...new Set(
          counsellorStudents
            .map(
              (student) =>
                typeof student?.university ===
                "object"
                  ? student?.university?.name
                  : student?.university
            )
            .filter(Boolean)
        ),
      ];
    }, [
      counsellorStudents,
    ]);

  const courseOptions =
    useMemo(() => {
      return [
        ...new Set(
          counsellorStudents
            .map(
              (student) =>
                typeof student?.course ===
                "object"
                  ? student?.course?.name
                  : student?.course
            )
            .filter(Boolean)
        ),
      ];
    }, [
      counsellorStudents,
    ]);

  // ============================================================
  // SEARCH HANDLER
  // ============================================================

  const handleSearchChange =
    useCallback((value) => {
      setSearch(value);
    }, []);

  // ============================================================
  // FILTER HANDLER
  // ============================================================

  const handleFilterChange =
    useCallback(
      (key, value) => {
        setFilters(
          (prev) => ({
            ...prev,
            [key]: value,
          })
        );
      },
      []
    );

  // ============================================================
  // RESET FILTERS
  // ============================================================

  const handleResetFilters =
    useCallback(() => {
      setSearch("");

      setFilters(
        initialFilters
      );

      setCurrentPage(1);

      toast.success(
        "Filters cleared"
      );
    }, []);

  // ============================================================
  // SORT HANDLER
  // ============================================================

  const handleSort =
    useCallback(
      (field) => {
        if (
          sortField === field
        ) {
          setSortOrder(
            (prev) =>
              prev === "asc"
                ? "desc"
                : "asc"
          );

          return;
        }

        setSortField(field);
        setSortOrder("asc");
      },
      [sortField]
    );

  // ============================================================
  // VIEW STUDENT
  // ============================================================

  const handleViewStudent =
    useCallback(
      (student) => {
        if (
          !student?._id
        ) {
          return;
        }

        fetchStudentById(
          student._id
        );
      },
      [fetchStudentById]
    );

  // ============================================================
  // CLOSE DRAWER
  // ============================================================

  const closeDrawer =
    useCallback(() => {
      setDrawerOpen(false);
    }, []);

  // ============================================================
  // PAGINATION
  // ============================================================

  const goToPage =
    useCallback(
      (page) => {
        if (
          page < 1 ||
          page > totalPages
        ) {
          return;
        }

        setCurrentPage(page);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
      [totalPages]
    );

  const nextPage =
    useCallback(() => {
      goToPage(
        currentPage + 1
      );
    }, [
      currentPage,
      goToPage,
    ]);

  const previousPage =
    useCallback(() => {
      goToPage(
        currentPage - 1
      );
    }, [
      currentPage,
      goToPage,
    ]);

  // ============================================================
  // REFRESH
  // ============================================================

  const refreshData =
    useCallback(() => {
      setRefreshKey(
        (prev) => prev + 1
      );
    }, []);

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-50">
      <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 xl:p-8"
      >
        {/* ======================================================
            PAGE HEADER
        ====================================================== */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                <span className="text-lg font-black">
                  S
                </span>
              </div>

              <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">
                  My Students
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your assigned
                  students and track
                  their admission journey.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={refreshData}
            className="rounded-xl border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-sky-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md"
          >
            Refresh Students
          </button>
        </div>

        {/* ======================================================
            STATS
        ====================================================== */}

        <CounsellorStudentStats
          students={
            counsellorStudents
          }
          loading={loading}
        />

        {/* ======================================================
            SEARCH + FILTER
        ====================================================== */}

        <CounsellorSearchFilterBar
          search={search}
          onSearch={
            handleSearchChange
          }
          filters={filters}
          onFilterChange={
            handleFilterChange
          }
          onReset={
            handleResetFilters
          }
          universityOptions={
            universityOptions
          }
          courseOptions={
            courseOptions
          }
        />

        {/* ======================================================
            TABLE
        ====================================================== */}

        <CounsellorStudentTable
          students={
            paginatedStudents
          }
          loading={
            tableLoading
          }
          search={search}
          sortField={
            sortField
          }
          sortOrder={
            sortOrder
          }
          onSort={
            handleSort
          }
          onView={
            handleViewStudent
          }
        />

        {/* ======================================================
            EMPTY STATE
        ====================================================== */}

        {!tableLoading &&
          totalStudents === 0 && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                <span className="text-3xl">
                  🎓
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                No Students Found
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
                {search ||
                filters.status !==
                  "all" ||
                filters.university !==
                  "all" ||
                filters.course !==
                  "all"
                  ? "No students match your current search or filters."
                  : "You currently don't have any students assigned to you."}
              </p>

              {(search ||
                filters.status !==
                  "all" ||
                filters.university !==
                  "all" ||
                filters.course !==
                  "all") && (
                <button
                  type="button"
                  onClick={
                    handleResetFilters
                  }
                  className="mt-8 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Reset Filters
                </button>
              )}
            </motion.div>
          )}

        {/* ======================================================
            PAGINATION
        ====================================================== */}

        {totalStudents > 0 && (
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-600">
              Showing{" "}
              <span className="font-semibold">
                {(currentPage - 1) *
                    PAGE_SIZE +
                  1}
              </span>{" "}
              to{" "}
              <span className="font-semibold">
                {Math.min(
                  currentPage *
                    PAGE_SIZE,
                  totalStudents
                )}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900">
                {totalStudents}
              </span>{" "}
              students
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={
                  previousPage
                }
                disabled={
                  currentPage ===
                  1
                }
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <span className="rounded-xl bg-sky-50 px-5 py-2 text-sm font-semibold text-sky-700">
                {currentPage} /{" "}
                {totalPages}
              </span>

              <button
                type="button"
                onClick={
                  nextPage
                }
                disabled={
                  currentPage ===
                  totalPages
                }
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ======================================================
            STUDENT DETAILS DRAWER
        ====================================================== */}

        <CounsellorStudentDetailsDrawer
          open={drawerOpen}
          loading={
            studentLoading
          }
          student={
            selectedStudent
          }
          onClose={
            closeDrawer
          }
        />
      </motion.div>
    </div>
  );
};

export default CounsellorStudents;