import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import StudentStats from "../admin/students/StudentStats";
import SearchFilterBar from "../admin/students/SearchFilterBar";
import StudentTable from "../admin/students/StudentTable";
import StudentDetailsDrawer from "../admin/students/StudentDetailsDrawer";
import StudentEditModal from "../admin/students/StudentEditModal";
import StudentDeleteModal from "../admin/students/StudentDeleteModal";

const BASE_URL = "http://localhost:8000/api/v1/student";

const PAGE_SIZE = 10;

const initialFilters = {
  status: "all",
  counsellor: "all",
  university: "all",
  course: "all",
};

const Students = () => {
  // ============================================================
  // AUTH
  // ============================================================

  const token = localStorage.getItem("token");

  const authHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  // ============================================================
  // STUDENTS
  // ============================================================

  const [students, setStudents] = useState([]);

  const [totalStudents, setTotalStudents] = useState(0);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  const [tableLoading, setTableLoading] = useState(false);

  // ============================================================
  // STATS
  // ============================================================

  const [stats, setStats] = useState(null);

  const [statsLoading, setStatsLoading] = useState(true);

  // ============================================================
  // SEARCH + FILTER
  // ============================================================

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState(initialFilters);

  // ============================================================
  // PAGINATION
  // ============================================================

  const [currentPage, setCurrentPage] = useState(1);

  // ============================================================
  // SORTING
  // ============================================================

  const [sortField, setSortField] = useState("createdAt");

  const [sortOrder, setSortOrder] = useState("desc");

  // ============================================================
  // STUDENT DETAILS DRAWER
  // ============================================================

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [studentLoading, setStudentLoading] = useState(false);

  // ============================================================
  // EDIT MODAL
  // ============================================================

  const [editOpen, setEditOpen] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

  const [updateLoading, setUpdateLoading] = useState(false);

  // ============================================================
  // DELETE MODAL
  // ============================================================

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteStudent, setDeleteStudent] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  // ============================================================
  // FETCH STUDENT STATS
  // ============================================================

  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);

      const { data } = await axios.get(`${BASE_URL}/stats`, {
        headers: authHeaders,
      });

      setStats(data?.stats || {});
    } catch (error) {
      console.error("FETCH STUDENT STATS ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to load student statistics"
      );
    } finally {
      setStatsLoading(false);
    }
  }, [authHeaders]);

  // ============================================================
  // FETCH STUDENTS
  // ============================================================

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setTableLoading(true);

      const params = {
        page: currentPage,
        limit: PAGE_SIZE,
      };

      // -----------------------------
      // SEARCH
      // -----------------------------

      if (search.trim()) {
        params.search = search.trim();
      }

      // -----------------------------
      // ADMISSION STATUS
      // -----------------------------

      if (filters.status !== "all") {
        params.admissionStatus = filters.status;
      }

      // -----------------------------
      // COUNSELLOR
      // -----------------------------

      if (filters.counsellor !== "all") {
        params.counsellor = filters.counsellor;
      }

      const { data } = await axios.get(BASE_URL, {
        headers: authHeaders,
        params,
      });

      console.log("STUDENTS API RESPONSE:", data);

      const list = Array.isArray(data?.students)
        ? data.students
        : [];

      setStudents(list);

      setTotalStudents(
        Number(data?.total || 0)
      );

      setTotalPages(
        Math.max(Number(data?.totalPages || 1), 1)
      );
    } catch (error) {
      console.error("FETCH STUDENTS ERROR:", error);

      setStudents([]);

      toast.error(
        error?.response?.data?.message ||
          "Unable to fetch students"
      );
    } finally {
      setLoading(false);
      setTableLoading(false);
    }
  }, [
    authHeaders,
    currentPage,
    filters.counsellor,
    filters.status,
    search,
  ]);

  // ============================================================
  // GET SINGLE STUDENT
  // ============================================================

  const fetchStudentById = useCallback(
    async (studentId) => {
      if (!studentId) return;

      try {
        setStudentLoading(true);

        const { data } = await axios.get(
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
          "FETCH SINGLE STUDENT ERROR:",
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
  // UPDATE STUDENT
  // ============================================================

  const updateStudent = useCallback(
    async (studentId, payload) => {
      if (!studentId) return;

      try {
        setUpdateLoading(true);

        const { data } = await axios.put(
          `${BASE_URL}/${studentId}`,
          payload,
          {
            headers: {
              ...authHeaders,
              "Content-Type": "application/json",
            },
          }
        );

        const updatedStudent =
          data?.student ||
          data?.data ||
          data;

        // ----------------------------------------
        // Update current table immediately
        // ----------------------------------------

        setStudents((prev) =>
          prev.map((student) =>
            student?._id === studentId
              ? updatedStudent
              : student
          )
        );

        // ----------------------------------------
        // Update drawer if same student
        // ----------------------------------------

        if (
          selectedStudent?._id === studentId
        ) {
          setSelectedStudent(updatedStudent);
        }

        setEditOpen(false);

        setEditingStudent(null);

        toast.success(
          data?.message ||
            "Student updated successfully"
        );

        // Refresh stats because admission/payment
        // fields may have changed.
        fetchStats();

        // Refresh list to keep API data authoritative.
        fetchStudents();

        return updatedStudent;
      } catch (error) {
        console.error(
          "UPDATE STUDENT ERROR:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to update student"
        );

        throw error;
      } finally {
        setUpdateLoading(false);
      }
    },
    [
      authHeaders,
      fetchStats,
      fetchStudents,
      selectedStudent,
    ]
  );

  // ============================================================
  // DELETE STUDENT
  // ============================================================

  const deleteStudentById = useCallback(async () => {
    if (!deleteStudent?._id) return;

    try {
      setDeleteLoading(true);

      await axios.delete(
        `${BASE_URL}/${deleteStudent._id}`,
        {
          headers: authHeaders,
        }
      );

      // ----------------------------------------
      // Remove from current list immediately
      // ----------------------------------------

      setStudents((prev) =>
        prev.filter(
          (student) =>
            student?._id !== deleteStudent._id
        )
      );

      // ----------------------------------------
      // Close drawer if same student
      // ----------------------------------------

      if (
        selectedStudent?._id ===
        deleteStudent._id
      ) {
        setSelectedStudent(null);

        setDrawerOpen(false);
      }

      toast.success(
        "Student deleted successfully"
      );

      setDeleteOpen(false);

      setDeleteStudent(null);

      // ----------------------------------------
      // Refresh stats
      // ----------------------------------------

      await fetchStats();

      // ----------------------------------------
      // Refresh current page
      // ----------------------------------------

      await fetchStudents();
    } catch (error) {
      console.error(
        "DELETE STUDENT ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to delete student"
      );
    } finally {
      setDeleteLoading(false);
    }
  }, [
    authHeaders,
    deleteStudent,
    fetchStats,
    fetchStudents,
    selectedStudent,
  ]);

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // ============================================================
  // FETCH STUDENTS WHEN QUERY CHANGES
  // ============================================================

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // ============================================================
  // TABLE ACTIONS
  // ============================================================

  const handleViewStudent = useCallback(
    (student) => {
      if (!student?._id) return;

      fetchStudentById(student._id);
    },
    [fetchStudentById]
  );

  const handleEditStudent = useCallback(
    (student) => {
      if (!student?._id) return;

      setEditingStudent(student);

      setEditOpen(true);
    },
    []
  );

  const handleDeleteClick = useCallback(
    (student) => {
      if (!student?._id) return;

      setDeleteStudent(student);

      setDeleteOpen(true);
    },
    []
  );

  // ============================================================
  // DRAWER
  // ============================================================

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  // ============================================================
  // EDIT MODAL
  // ============================================================

  const closeEditModal = useCallback(() => {
    setEditOpen(false);

    setEditingStudent(null);
  }, []);

  // ============================================================
  // DELETE MODAL
  // ============================================================

  const closeDeleteModal = useCallback(() => {
    setDeleteOpen(false);

    setDeleteStudent(null);
  }, []);

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearchChange = useCallback(
    (value) => {
      setSearch(value);

      setCurrentPage(1);
    },
    []
  );

  // ============================================================
  // FILTER
  // ============================================================

  const handleFilterChange = useCallback(
    (key, value) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));

      setCurrentPage(1);
    },
    []
  );

  // ============================================================
  // RESET FILTERS
  // ============================================================

  const handleResetFilters = useCallback(() => {
    setSearch("");

    setFilters(initialFilters);

    setCurrentPage(1);

    toast.success("Filters cleared");
  }, []);

  // ============================================================
  // SORT
  // ============================================================

  const handleSort = useCallback(
    (field) => {
      if (sortField === field) {
        setSortOrder((prev) =>
          prev === "asc" ? "desc" : "asc"
        );

        return;
      }

      setSortField(field);

      setSortOrder("asc");
    },
    [sortField]
  );

  // ============================================================
  // CLIENT-SIDE SORT
  // ============================================================

  const sortedStudents = useMemo(() => {
    const list = [...students];

    list.sort((a, b) => {
      let valueA = a?.[sortField];

      let valueB = b?.[sortField];

      // ----------------------------------------
      // Handle populated fields
      // ----------------------------------------

      if (sortField === "counsellor") {
        valueA =
          typeof valueA === "object"
            ? valueA?.name
            : valueA;

        valueB =
          typeof valueB === "object"
            ? valueB?.name
            : valueB;
      }

      if (sortField === "university") {
        valueA =
          typeof valueA === "object"
            ? valueA?.name
            : valueA;

        valueB =
          typeof valueB === "object"
            ? valueB?.name
            : valueB;
      }

      if (sortField === "course") {
        valueA =
          typeof valueA === "object"
            ? valueA?.name
            : valueA;

        valueB =
          typeof valueB === "object"
            ? valueB?.name
            : valueB;
      }

      // ----------------------------------------
      // Null safety
      // ----------------------------------------

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

      // ----------------------------------------
      // Date sorting
      // ----------------------------------------

      if (
        sortField === "createdAt" ||
        sortField === "updatedAt"
      ) {
        const dateA =
          new Date(valueA).getTime();

        const dateB =
          new Date(valueB).getTime();

        if (
          sortOrder === "asc"
        ) {
          return dateA - dateB;
        }

        return dateB - dateA;
      }

      // ----------------------------------------
      // Number sorting
      // ----------------------------------------

      if (
        typeof valueA === "number" &&
        typeof valueB === "number"
      ) {
        return sortOrder === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      // ----------------------------------------
      // String sorting
      // ----------------------------------------

      const stringA =
        String(valueA).toLowerCase();

      const stringB =
        String(valueB).toLowerCase();

      const comparison =
        stringA.localeCompare(stringB);

      return sortOrder === "asc"
        ? comparison
        : -comparison;
    });

    return list;
  }, [
    students,
    sortField,
    sortOrder,
  ]);

  // ============================================================
  // FILTER OPTIONS
  // ============================================================

  const counsellorOptions = useMemo(() => {
    const map = new Map();

    students.forEach((student) => {
      const counsellor =
        student?.counsellor;

      if (
        counsellor &&
        typeof counsellor === "object" &&
        counsellor?._id
      ) {
        map.set(
          counsellor._id,
          counsellor.name ||
            counsellor.email ||
            "Unknown Counsellor"
        );
      }
    });

    return Array.from(map.entries()).map(
      ([value, label]) => ({
        value,
        label,
      })
    );
  }, [students]);

  // ============================================================
  // UNIVERSITY OPTIONS
  // ============================================================

  const universityOptions = useMemo(() => {
    const map = new Map();

    students.forEach((student) => {
      const university =
        student?.university;

      if (
        university &&
        typeof university === "object" &&
        university?._id
      ) {
        map.set(
          university._id,
          university.name ||
            "Unknown University"
        );
      }
    });

    return Array.from(map.entries()).map(
      ([value, label]) => ({
        value,
        label,
      })
    );
  }, [students]);

  // ============================================================
  // COURSE OPTIONS
  // ============================================================

  const courseOptions = useMemo(() => {
    const map = new Map();

    students.forEach((student) => {
      const course =
        student?.course;

      if (
        course &&
        typeof course === "object" &&
        course?._id
      ) {
        map.set(
          course._id,
          course.name ||
            "Unknown Course"
        );
      }
    });

    return Array.from(map.entries()).map(
      ([value, label]) => ({
        value,
        label,
      })
    );
  }, [students]);

  // ============================================================
  // PAGINATION
  // ============================================================

  const previousPage = useCallback(() => {
    if (currentPage <= 1) return;

    setCurrentPage((prev) => prev - 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const nextPage = useCallback(() => {
    if (currentPage >= totalPages) {
      return;
    }

    setCurrentPage((prev) => prev + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage, totalPages]);

  const goToPage = useCallback(
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

  // ============================================================
  // PAGE RANGE
  // ============================================================

  const pageNumbers = useMemo(() => {
    const pages = [];

    const maxVisiblePages = 5;

    let start = Math.max(
      1,
      currentPage -
        Math.floor(maxVisiblePages / 2)
    );

    let end = Math.min(
      totalPages,
      start + maxVisiblePages - 1
    );

    if (
      end - start + 1 <
      maxVisiblePages
    ) {
      start = Math.max(
        1,
        end - maxVisiblePages + 1
      );
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  // ============================================================
  // DISPLAY RANGE
  // ============================================================

  const showingFrom =
    totalStudents === 0
      ? 0
      : (currentPage - 1) *
          PAGE_SIZE +
        1;

  const showingTo =
    totalStudents === 0
      ? 0
      : Math.min(
          currentPage * PAGE_SIZE,
          totalStudents
        );

  // ============================================================
  // RENDER
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
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Student Management
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Manage converted leads, student
              admissions, documents, timelines
              and student records from one
              centralized CRM dashboard.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              fetchStudents();
              fetchStats();
            }}
            disabled={loading}
            className="rounded-xl border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-sky-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Refreshing..."
              : "Refresh Data"}
          </button>
        </div>

        {/* ======================================================
            STATS
        ====================================================== */}

        <StudentStats
          loading={statsLoading}
          stats={stats}
        />

        {/* ======================================================
            SEARCH + FILTER
        ====================================================== */}

        <SearchFilterBar
          search={search}
          onSearch={handleSearchChange}
          filters={filters}
          onFilterChange={
            handleFilterChange
          }
          onReset={handleResetFilters}
          counsellorOptions={
            counsellorOptions
          }
          universityOptions={
            universityOptions
          }
          courseOptions={
            courseOptions
          }
        />

        {/* ======================================================
            STUDENT TABLE
        ====================================================== */}

        <StudentTable
          students={sortedStudents}
          loading={tableLoading}
          search={search}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          onView={handleViewStudent}
          onEdit={handleEditStudent}
          onDelete={handleDeleteClick}
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
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-sky-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5V4H2v16h5m10 0v-4a3 3 0 00-3-3H10a3 3 0 00-3 3v4m10 0H7"
                  />
                </svg>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                No Students Found
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
                {search
                  ? `No students matched "${search}".`
                  : "No student records match your current filters."}
              </p>

              {(search ||
                filters.status !== "all" ||
                filters.counsellor !==
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
                  className="mt-8 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-700"
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
                {showingFrom}
              </span>{" "}
              to{" "}
              <span className="font-semibold">
                {showingTo}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900">
                {totalStudents}
              </span>{" "}
              students
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={previousPage}
                disabled={
                  currentPage === 1 ||
                  tableLoading
                }
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() =>
                    goToPage(page)
                  }
                  disabled={tableLoading}
                  className={`min-w-10 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    currentPage === page
                      ? "bg-sky-600 text-white shadow-sm"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={nextPage}
                disabled={
                  currentPage ===
                    totalPages ||
                  tableLoading
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

        <StudentDetailsDrawer
          open={drawerOpen}
          loading={studentLoading}
          student={selectedStudent}
          onClose={closeDrawer}
          onEdit={() => {
            if (!selectedStudent) return;

            setEditingStudent(
              selectedStudent
            );

            setEditOpen(true);
          }}
        />

        {/* ======================================================
            EDIT MODAL
        ====================================================== */}

        <StudentEditModal
          open={editOpen}
          loading={updateLoading}
          student={editingStudent}
          onClose={closeEditModal}
          onSave={updateStudent}
        />

        {/* ======================================================
            DELETE MODAL
        ====================================================== */}

        <StudentDeleteModal
          open={deleteOpen}
          loading={deleteLoading}
          student={deleteStudent}
          onClose={closeDeleteModal}
          onConfirm={deleteStudentById}
        />
      </motion.div>
    </div>
  );
};

export default Students;