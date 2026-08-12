import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
} from "lucide-react";

import StudentRow from "./StudentRow";

const StudentTable = ({
  students = [],
  loading = false,
  search = "",
  sortField,
  sortOrder,
  onSort,
  onView,
  onEdit,
  onDelete,
}) => {
  // ============================================================
  // SORT ICON
  // ============================================================

  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return <ArrowUpDown size={15} className="text-slate-400" />;
    }

    return sortOrder === "asc" ? (
      <ArrowUp size={15} className="text-sky-600" />
    ) : (
      <ArrowDown size={15} className="text-sky-600" />
    );
  };

  // ============================================================
  // TABLE COLUMNS
  // ============================================================

  const columns = [
    {
      key: "studentName",
      label: "Student",
      sortable: true,
    },
    {
      key: "studentNumber",
      label: "Student ID",
      sortable: true,
    },
    {
      key: "university",
      label: "University",
      sortable: true,
    },
    {
      key: "course",
      label: "Course",
      sortable: true,
    },
    {
      key: "admissionStatus",
      label: "Status",
      sortable: true,
    },
    {
      key: "counsellor",
      label: "Counsellor",
      sortable: true,
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
    },
  ];

  return (
    <motion.div
      layout
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
    >
      {/* ========================================================
          TABLE WRAPPER
      ======================================================== */}

      <div className="w-full overflow-x-auto">
        <table className="min-w-[1200px] w-full">
          {/* ======================================================
              TABLE HEADER
          ====================================================== */}

          <thead className="border-b border-slate-200 bg-slate-50/80">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => onSort(column.key)}
                      className="inline-flex items-center gap-2 rounded-lg transition-colors hover:text-sky-600"
                    >
                      <span>{column.label}</span>

                      {renderSortIcon(column.key)}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* ======================================================
              TABLE BODY
          ====================================================== */}

          <tbody className="divide-y divide-slate-100 bg-white">
            {/* ====================================================
                LOADING SKELETON
            ==================================================== */}

            {loading &&
              Array.from({ length: 8 }).map((_, index) => (
                <tr
                  key={`student-skeleton-${index}`}
                  className="animate-pulse"
                >
                  {/* Student */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-slate-200" />

                      <div className="space-y-2">
                        <div className="h-4 w-40 rounded bg-slate-200" />
                        <div className="h-3 w-32 rounded bg-slate-100" />
                        <div className="h-3 w-24 rounded bg-slate-100" />
                      </div>
                    </div>
                  </td>

                  {/* Student ID */}
                  <td className="px-6 py-5">
                    <div className="h-7 w-28 rounded-lg bg-slate-200" />
                  </td>

                  {/* University */}
                  <td className="px-6 py-5">
                    <div className="h-4 w-36 rounded bg-slate-200" />
                  </td>

                  {/* Course */}
                  <td className="px-6 py-5">
                    <div className="space-y-2">
                      <div className="h-4 w-32 rounded bg-slate-200" />
                      <div className="h-3 w-20 rounded bg-slate-100" />
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <div className="h-8 w-28 rounded-full bg-slate-200" />
                  </td>

                  {/* Counsellor */}
                  <td className="px-6 py-5">
                    <div className="space-y-2">
                      <div className="h-4 w-32 rounded bg-slate-200" />
                      <div className="h-3 w-24 rounded bg-slate-100" />
                    </div>
                  </td>

                  {/* Created */}
                  <td className="px-6 py-5">
                    <div className="space-y-2">
                      <div className="h-4 w-24 rounded bg-slate-200" />
                      <div className="h-3 w-20 rounded bg-slate-100" />
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded-xl bg-slate-200" />
                      <div className="h-10 w-10 rounded-xl bg-slate-200" />
                      <div className="h-10 w-10 rounded-xl bg-slate-200" />
                    </div>
                  </td>
                </tr>
              ))}

            {/* ====================================================
                EMPTY STATE
            ==================================================== */}

            {!loading && students.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-16 text-center"
                >
                  <div className="mx-auto max-w-md">
                    {/* Icon */}
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
                          d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m8-9a4 4 0 100-8 4 4 0 000 8zm6-3v6m3-3h-6"
                        />
                      </svg>
                    </div>

                    {/* Title */}
                    <h3 className="mt-6 text-xl font-bold text-slate-900">
                      No Students Found
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {search
                        ? `No students matched "${search}".`
                        : "No student records are available."}
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {/* ====================================================
                STUDENT ROWS
            ==================================================== */}

            {!loading &&
              students.length > 0 &&
              students.map((student) => (
                <StudentRow
                  key={student?._id}
                  student={student}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default StudentTable;