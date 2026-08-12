import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Eye,
} from "lucide-react";

import CounsellorStudentRow from "./CounsellorStudentRow";

const CounsellorStudentTable = ({
  students,
  loading,
  search,
  sortField,
  sortOrder,
  onSort,
  onView,
}) => {
  // ============================================================
  // SORT ICON
  // ============================================================

  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return null;
    }

    return sortOrder === "asc" ? (
      <ArrowUp size={15} />
    ) : (
      <ArrowDown size={15} />
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

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <motion.div
      layout
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
    >
      {/* ========================================================
          RESPONSIVE TABLE WRAPPER
      ======================================================== */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse">
          {/* ====================================================
              TABLE HEAD
          ==================================================== */}

          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => onSort(column.key)}
                      className="flex items-center gap-2 transition-colors hover:text-sky-600"
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

          {/* ====================================================
              TABLE BODY
          ==================================================== */}

          <tbody className="divide-y divide-slate-100 bg-white">
            {/* ==================================================
                LOADING SKELETON
            ================================================== */}

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

                    <div className="mt-2 h-3 w-24 rounded bg-slate-100" />
                  </td>

                  {/* Course */}
                  <td className="px-6 py-5">
                    <div className="h-4 w-32 rounded bg-slate-200" />

                    <div className="mt-2 h-3 w-20 rounded bg-slate-100" />
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <div className="h-8 w-28 rounded-full bg-slate-200" />
                  </td>

                  {/* Created */}
                  <td className="px-6 py-5">
                    <div className="h-4 w-24 rounded bg-slate-200" />

                    <div className="mt-2 h-3 w-28 rounded bg-slate-100" />
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="h-10 w-10 rounded-xl bg-slate-200" />
                  </td>
                </tr>
              ))}

            {/* ==================================================
                EMPTY STATE
            ================================================== */}

            {!loading && students.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-16 text-center"
                >
                  <div className="mx-auto max-w-md">
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
                          d="M18 20a6 6 0 00-12 0m9-10a3 3 0 11-6 0 3 3 0 016 0zm3 10h3m-1.5-1.5V20"
                        />
                      </svg>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-slate-900">
                      No Students Found
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {search
                        ? `No students matched "${search}".`
                        : "No student records are currently assigned to you."}
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {/* ==================================================
                STUDENT ROWS
            ================================================== */}

            {!loading &&
              students.length > 0 &&
              students.map((student) => (
                <CounsellorStudentRow
                  key={student?._id}
                  student={student}
                  onView={onView}
                />
              ))}
          </tbody>
        </table>
      </div>

      {/* ========================================================
          MOBILE / TABLE HINT
      ======================================================== */}

      {!loading && students.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-6 py-3">
          <p className="text-xs text-slate-500">
            Showing student admission records
          </p>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Eye size={14} />
            <span>View details</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CounsellorStudentTable;