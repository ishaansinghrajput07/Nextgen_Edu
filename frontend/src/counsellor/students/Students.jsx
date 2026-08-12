import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import SearchFilterBar from "./SearchFilterBar";
import StudentTable from "./StudentTable";
import StudentDetailsDrawer from "./StudentDetailsDrawer";
import StudentEditModal from "./StudentEditModal";

const BASE_URL = "http://localhost:8000/api/v1/student";

const PAGE_SIZE = 10;

const initialFilters = {
  status: "all",
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

  const [loading, setLoading] = useState(true);

  const [tableLoading, setTableLoading] = useState(false);

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
  // DETAILS DRAWER
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
  // REFRESH
  // ============================================================

  const [refreshKey, setRefreshKey] = useState(0);

  // ============================================================
  // FETCH STUDENTS
  // ============================================================

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setTableLoading(true);

      const { data } = await axios.get(BASE_URL, {
        headers: authHeaders,
      });

      console.log("COUNSELLOR STUDENTS API:", data);

      const list =
        data?.students ||
        data?.data?.students ||
        data?.data ||
        [];

      setStudents(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error("FETCH COUNSELLOR STUDENTS ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to fetch students"
      );
    } finally {
      setLoading(false);
      setTableLoading(false);
    }
  }, [authHeaders]);

  // ============================================================
  // FETCH SINGLE STUDENT
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
          data?.data?.student ||
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
          data?.data?.student ||
          data?.data ||
          data;

        // Update local table immediately
        setStudents((prev) =>
          prev.map((student) =>
            student?._id === studentId
              ? updatedStudent
              : student
          )
        );

        // Update drawer if same student
        if (selectedStudent?._id === studentId) {
          setSelectedStudent(updatedStudent);
        }

        setEditOpen(false);
        setEditingStudent(null);

        toast.success(
          "Student updated successfully"
        );

        setRefreshKey((prev) => prev + 1);

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
    [authHeaders, selectedStudent]
  );

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // ============================================================
  // REFRESH AFTER UPDATE
  // ============================================================

  useEffect(() => {
    if (refreshKey === 0) return;

    fetchStudents();
  }, [refreshKey, fetchStudents]);

  // ============================================================
  // SEARCH + FILTER
  // ============================================================

  const filteredStudents = useMemo(() => {
    let data = [...students];

    // ========================================================
    // SEARCH
    // ========================================================

    if (search.trim()) {
      const keyword = search
        .toLowerCase()
        .trim();

      data = data.filter((student) => {
        const universityName =
          typeof student?.university === "object"
            ? student?.university?.name
            : student?.university;

        const courseName =
          typeof student?.course === "object"
            ? student?.course?.name
            : student?.course;

        const counsellorName =
          typeof student?.counsellor === "object"
            ? student?.counsellor?.name
            : student?.counsellor;

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
            .includes(keyword) ||
          counsellorName
            ?.toLowerCase()
            .includes(keyword)
        );
      });
    }

    // ========================================================
    // STATUS
    // ========================================================

    if (filters.status !== "all") {
      data = data.filter(
        (student) =>
          student?.admissionStatus
            ?.toLowerCase() ===
          filters.status.toLowerCase()
      );
    }

    // ========================================================
    // UNIVERSITY
    // ========================================================

    if (filters.university !== "all") {
      data = data.filter((student) => {
        const universityName =
          typeof student?.university === "object"
            ? student?.university?.name
            : student?.university;

        return universityName === filters.university;
      });
    }

    // ========================================================
    // COURSE
    // ========================================================

    if (filters.course !== "all") {
      data = data.filter((student) => {
        const courseName =
          typeof student?.course === "object"
            ? student?.course?.name
            : student?.course;

        return courseName === filters.course;
      });
    }

    return data;
  }, [students, search, filters]);

  // ============================================================
  // SORTING
  // ============================================================

  const sortedStudents = useMemo(() => {
    const list = [...filteredStudents];

    list.sort((a, b) => {
      let valueA = a?.[sortField];
      let valueB = b?.[sortField];

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
      // OBJECT VALUES
      // --------------------------------------------------------

      if (
        typeof valueA === "object" &&
        typeof valueB === "object"
      ) {
        valueA =
          valueA?.name ||
          valueA?.title ||
          "";

        valueB =
          valueB?.name ||
          valueB?.title ||
          "";
      }

      // --------------------------------------------------------
      // DATE
      // --------------------------------------------------------

      if (
        sortField === "createdAt" ||
        sortField === "updatedAt" ||
        sortField === "paymentDate"
      ) {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();

        if (Number.isNaN(valueA)) valueA = 0;
        if (Number.isNaN(valueB)) valueB = 0;

        return sortOrder === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      // --------------------------------------------------------
      // NUMBER
      // --------------------------------------------------------

      if (
        typeof valueA === "number" &&
        typeof valueB === "number"
      ) {
        return sortOrder === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      // --------------------------------------------------------
      // STRING
      // --------------------------------------------------------

      valueA = String(valueA).toLowerCase();
      valueB = String(valueB).toLowerCase();

      if (sortOrder === "asc") {
        return valueA.localeCompare(valueB);
      }

      return valueB.localeCompare(valueA);
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

  const totalStudents = sortedStudents.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalStudents / PAGE_SIZE)
  );

  const paginatedStudents = useMemo(() => {
    const start =
      (currentPage - 1) * PAGE_SIZE;

    const end = start + PAGE_SIZE;

    return sortedStudents.slice(start, end);
  }, [sortedStudents, currentPage]);

  // ============================================================
  // RESET PAGE
  // ============================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters]);

  // ============================================================
  // PAGE SAFETY
  // ============================================================

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // ============================================================
  // FILTER OPTIONS
  // ============================================================

  const universityOptions = useMemo(() => {
    return [
      ...new Set(
        students
          .map((student) =>
            typeof student?.university === "object"
              ? student?.university?.name
              : student?.university
          )
          .filter(Boolean)
      ),
    ];
  }, [students]);

  const courseOptions = useMemo(() => {
    return [
      ...new Set(
        students
          .map((student) =>
            typeof student?.course === "object"
              ? student?.course?.name
              : student?.course
          )
          .filter(Boolean)
      ),
    ];
  }, [students]);

  // ============================================================
  // SEARCH HANDLER
  // ============================================================

  const handleSearchChange = useCallback(
    (value) => {
      setSearch(value);
    },
    []
  );

  // ============================================================
  // FILTER HANDLER
  // ============================================================

  const handleFilterChange = useCallback(
    (key, value) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
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
  // VIEW
  // ============================================================

  const handleViewStudent = useCallback(
    (student) => {
      if (!student?._id) return;

      fetchStudentById(student._id);
    },
    [fetchStudentById]
  );

  // ============================================================
  // EDIT
  // ============================================================

  const handleEditStudent = useCallback(
    (student) => {
      if (!student?._id) return;

      setEditingStudent(student);
      setEditOpen(true);
    },
    []
  );

  // ============================================================
  // CLOSE DRAWER
  // ============================================================

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  // ============================================================
  // CLOSE EDIT
  // ============================================================

  const closeEditModal = useCallback(() => {
    setEditOpen(false);
    setEditingStudent(null);
  }, []);

  // ============================================================
  // PAGINATION
  // ============================================================

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

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const previousPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

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
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              My Students
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your assigned students, admission
              progress, documents and follow-ups.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchStudents}
            className="rounded-xl border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-sky-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-lg"
          >
            Refresh Data
          </button>
        </div>

        {/* ======================================================
            SEARCH + FILTER
        ====================================================== */}

        <SearchFilterBar
          search={search}
          onSearch={handleSearchChange}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          universityOptions={universityOptions}
          courseOptions={courseOptions}
        />

        {/* ======================================================
            TABLE
        ====================================================== */}

        <StudentTable
          students={paginatedStudents}
          loading={tableLoading}
          search={search}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          onView={handleViewStudent}
          onEdit={handleEditStudent}
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
                No students are currently assigned to
                you or no records match your search
                and filters.
              </p>

              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-8 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-700"
              >
                Reset Filters
              </button>
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
                  currentPage * PAGE_SIZE,
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
                onClick={previousPage}
                disabled={currentPage === 1}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <span className="rounded-xl bg-sky-50 px-5 py-2 text-sm font-semibold text-sky-700">
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={nextPage}
                disabled={
                  currentPage === totalPages
                }
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ======================================================
            DETAILS DRAWER
        ====================================================== */}

        <StudentDetailsDrawer
          open={drawerOpen}
          loading={studentLoading}
          student={selectedStudent}
          onClose={closeDrawer}
          onEdit={() => {
            if (!selectedStudent) return;

            setEditingStudent(selectedStudent);
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
      </motion.div>
    </div>
  );
};

export default Students;