import { motion } from "framer-motion";
import {
  Eye,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  CalendarDays,
} from "lucide-react";

// ============================================================
// STATUS STYLES
// ============================================================

const statusStyles = {
  new: "bg-sky-100 text-sky-700 border-sky-200",

  contacted: "bg-blue-100 text-blue-700 border-blue-200",

  interested: "bg-indigo-100 text-indigo-700 border-indigo-200",

  applied: "bg-violet-100 text-violet-700 border-violet-200",

  "document pending":
    "bg-amber-100 text-amber-700 border-amber-200",

  "documents pending":
    "bg-amber-100 text-amber-700 border-amber-200",

  "documents verified":
    "bg-cyan-100 text-cyan-700 border-cyan-200",

  "offer letter":
    "bg-purple-100 text-purple-700 border-purple-200",

  "fee paid":
    "bg-emerald-100 text-emerald-700 border-emerald-200",

  enrolled:
    "bg-green-100 text-green-700 border-green-200",

  rejected:
    "bg-red-100 text-red-700 border-red-200",

  cancelled:
    "bg-red-100 text-red-700 border-red-200",

  "admission cancelled":
    "bg-red-100 text-red-700 border-red-200",

  withdrawn:
    "bg-slate-200 text-slate-700 border-slate-300",
};

// ============================================================
// STATUS CLASS
// ============================================================

const getStatusClass = (status) => {
  if (!status) {
    return "bg-slate-100 text-slate-700 border-slate-200";
  }

  const normalizedStatus = String(status)
    .toLowerCase()
    .trim();

  return (
    statusStyles[normalizedStatus] ||
    "bg-slate-100 text-slate-700 border-slate-200"
  );
};

// ============================================================
// FORMAT DATE
// ============================================================

const formatDate = (date) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ============================================================
// INITIALS
// ============================================================

const getInitials = (name) => {
  if (!name) return "?";

  return String(name)
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

// ============================================================
// GET UNIVERSITY NAME
// ============================================================

const getUniversityName = (university) => {
  if (!university) return "-";

  if (typeof university === "object") {
    return (
      university?.name ||
      university?.universityName ||
      university?.title ||
      "-"
    );
  }

  return university;
};

// ============================================================
// GET COURSE NAME
// ============================================================

const getCourseName = (course) => {
  if (!course) return "-";

  if (typeof course === "object") {
    return (
      course?.name ||
      course?.courseName ||
      course?.title ||
      "-"
    );
  }

  return course;
};

// ============================================================
// GET COUNSELLOR NAME
// ============================================================

const getCounsellorName = (counsellor) => {
  if (!counsellor) return "-";

  if (typeof counsellor === "object") {
    return (
      counsellor?.name ||
      counsellor?.fullName ||
      "-"
    );
  }

  return counsellor;
};

// ============================================================
// COMPONENT
// ============================================================

const CounsellorStudentRow = ({
  student,
  onView,
}) => {
  const universityName = getUniversityName(
    student?.university
  );

  const courseName = getCourseName(
    student?.course
  );

  const counsellorName = getCounsellorName(
    student?.counsellor
  );

  const status =
    student?.admissionStatus || "New";

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        backgroundColor: "#f8fafc",
      }}
      transition={{
        duration: 0.2,
      }}
      className="transition-colors"
    >
      {/* ======================================================
          STUDENT
      ====================================================== */}

      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          {/* Avatar */}

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 text-sm font-bold text-white shadow-sm">
            {getInitials(student?.studentName)}
          </div>

          {/* Student Information */}

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-900">
              {student?.studentName || "-"}
            </h3>

            {/* Email */}

            <div className="mt-1 flex items-center gap-2">
              <Mail
                size={13}
                className="shrink-0 text-slate-400"
              />

              <span className="max-w-[220px] truncate text-xs text-slate-500">
                {student?.email || "-"}
              </span>
            </div>

            {/* Phone */}

            <div className="mt-1 flex items-center gap-2">
              <Phone
                size={13}
                className="shrink-0 text-slate-400"
              />

              <span className="text-xs text-slate-500">
                {student?.phoneNumber || "-"}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* ======================================================
          STUDENT ID
      ====================================================== */}

      <td className="px-6 py-5">
        <span className="inline-flex rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
          {student?.studentNumber || "-"}
        </span>
      </td>

      {/* ======================================================
          UNIVERSITY
      ====================================================== */}

      <td className="px-6 py-5">
        <div className="flex max-w-[220px] items-start gap-2">
          <GraduationCap
            size={17}
            className="mt-0.5 shrink-0 text-sky-600"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {universityName}
            </p>

            {student?.country && (
              <p className="mt-1 truncate text-xs text-slate-500">
                {student.country}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* ======================================================
          COURSE
      ====================================================== */}

      <td className="px-6 py-5">
        <div className="max-w-[220px]">
          <div className="flex items-start gap-2">
            <BookOpen
              size={16}
              className="mt-0.5 shrink-0 text-indigo-500"
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                {courseName}
              </p>

              {student?.intake && (
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  Intake: {student.intake}
                </p>
              )}
            </div>
          </div>
        </div>
      </td>

      {/* ======================================================
          STATUS
      ====================================================== */}

      <td className="px-6 py-5">
        <span
          className={`inline-flex max-w-[180px] items-center rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${getStatusClass(
            status
          )}`}
        >
          {status}
        </span>
      </td>

      {/* ======================================================
          CREATED DATE
      ====================================================== */}

      <td className="px-6 py-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CalendarDays
              size={14}
              className="text-slate-400"
            />

            <p className="text-sm font-medium text-slate-800">
              {formatDate(student?.createdAt)}
            </p>
          </div>

          {student?.updatedAt && (
            <p className="pl-6 text-xs text-slate-500">
              Updated {formatDate(student.updatedAt)}
            </p>
          )}
        </div>
      </td>

      {/* ======================================================
          ACTIONS
      ====================================================== */}

      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          {/* VIEW */}

          <button
            type="button"
            onClick={() => onView(student)}
            className="group rounded-xl border border-sky-200 bg-sky-50 p-2.5 text-sky-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-100 hover:shadow-md"
            title="View Student"
            aria-label={`View ${
              student?.studentName || "student"
            }`}
          >
            <Eye
              size={18}
              className="transition-transform duration-200 group-hover:scale-110"
            />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default CounsellorStudentRow;