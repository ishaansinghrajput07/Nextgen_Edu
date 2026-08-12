import { motion } from "framer-motion";
import {
  Eye,
  Pencil,
  Trash2,
  Mail,
  Phone,
  GraduationCap,
  UserRound,
  CalendarDays,
} from "lucide-react";

// ============================================================
// STATUS STYLES
// ============================================================

const statusStyles = {
  new: "bg-sky-50 text-sky-700 border-sky-200",
  contacted: "bg-blue-50 text-blue-700 border-blue-200",
  interested: "bg-violet-50 text-violet-700 border-violet-200",
  applied: "bg-indigo-50 text-indigo-700 border-indigo-200",

  "document pending":
    "bg-amber-50 text-amber-700 border-amber-200",

  "documents pending":
    "bg-amber-50 text-amber-700 border-amber-200",

  "documents verified":
    "bg-cyan-50 text-cyan-700 border-cyan-200",

  "offer letter":
    "bg-purple-50 text-purple-700 border-purple-200",

  "fee paid":
    "bg-emerald-50 text-emerald-700 border-emerald-200",

  enrolled:
    "bg-green-50 text-green-700 border-green-200",

  rejected:
    "bg-red-50 text-red-700 border-red-200",

  cancelled:
    "bg-red-50 text-red-700 border-red-200",

  "admission cancelled":
    "bg-red-50 text-red-700 border-red-200",

  withdrawn:
    "bg-slate-100 text-slate-700 border-slate-200",
};

// ============================================================
// STATUS CLASS
// ============================================================

const getStatusClass = (status) => {
  if (!status) {
    return "bg-slate-100 text-slate-700 border-slate-200";
  }

  return (
    statusStyles[String(status).toLowerCase()] ||
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
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

// ============================================================
// SAFE DISPLAY HELPERS
// ============================================================

// University API future mein object ya string dono bhej sakti hai.
// Isliye dono handle kar rahe hain.

const getUniversityName = (university) => {
  if (!university) return "-";

  if (typeof university === "string") {
    return university;
  }

  return (
    university?.name ||
    university?.universityName ||
    university?.title ||
    "-"
  );
};

// ============================================================
// COURSE NAME
// ============================================================

const getCourseName = (course) => {
  if (!course) return "-";

  if (typeof course === "string") {
    return course;
  }

  return (
    course?.name ||
    course?.courseName ||
    course?.title ||
    "-"
  );
};

// ============================================================
// COUNSELLOR NAME
// ============================================================

const getCounsellorName = (counsellor) => {
  if (!counsellor) return "-";

  if (typeof counsellor === "string") {
    return counsellor;
  }

  return (
    counsellor?.name ||
    counsellor?.fullName ||
    counsellor?.employeeId ||
    "-"
  );
};

// ============================================================
// COUNSELLOR EMAIL
// ============================================================

const getCounsellorEmail = (counsellor) => {
  if (!counsellor || typeof counsellor === "string") {
    return "";
  }

  return counsellor?.email || "";
};

// ============================================================
// STUDENT ROW
// ============================================================

const StudentRow = ({
  student,
  onView,
  onEdit,
  onDelete,
}) => {
  const studentName = student?.studentName || "-";

  const universityName = getUniversityName(
    student?.university
  );

  const courseName = getCourseName(
    student?.course
  );

  const counsellorName = getCounsellorName(
    student?.counsellor
  );

  const counsellorEmail = getCounsellorEmail(
    student?.counsellor
  );

  const admissionStatus =
    student?.admissionStatus || "New";

  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{
        backgroundColor: "#f8fafc",
      }}
      transition={{
        duration: 0.2,
      }}
      className="transition-colors"
    >
      {/* ========================================================
          STUDENT
      ======================================================== */}

      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          {/* Avatar */}

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 text-sm font-bold text-white shadow-sm">
            {getInitials(studentName)}
          </div>

          {/* Student information */}

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-900">
              {studentName}
            </h3>

            {/* Email */}

            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <Mail
                size={13}
                className="shrink-0"
              />

              <span className="max-w-[190px] truncate">
                {student?.email || "-"}
              </span>
            </div>

            {/* Phone */}

            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <Phone
                size={13}
                className="shrink-0"
              />

              <span>
                {student?.phoneNumber || "-"}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* ========================================================
          STUDENT NUMBER
      ======================================================== */}

      <td className="px-6 py-5">
        <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700">
          {student?.studentNumber || "-"}
        </span>
      </td>

      {/* ========================================================
          UNIVERSITY
      ======================================================== */}

      <td className="px-6 py-5">
        <div className="flex max-w-[220px] items-start gap-2">
          <GraduationCap
            size={17}
            className="mt-0.5 shrink-0 text-sky-600"
          />

          <div className="min-w-0">
            <p
              className="truncate text-sm font-semibold text-slate-800"
              title={universityName}
            >
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

      {/* ========================================================
          COURSE
      ======================================================== */}

      <td className="px-6 py-5">
        <div className="max-w-[220px]">
          <p
            className="truncate text-sm font-semibold text-slate-800"
            title={courseName}
          >
            {courseName}
          </p>

          {student?.intake && (
            <p className="mt-1 text-xs text-slate-500">
              Intake: {student.intake}
            </p>
          )}
        </div>
      </td>

      {/* ========================================================
          ADMISSION STATUS
      ======================================================== */}

      <td className="px-6 py-5">
        <span
          className={`inline-flex whitespace-nowrap items-center rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${getStatusClass(
            admissionStatus
          )}`}
        >
          {admissionStatus}
        </span>
      </td>

      {/* ========================================================
          COUNSELLOR
      ======================================================== */}

      <td className="px-6 py-5">
        <div className="flex items-start gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <UserRound size={15} />
          </div>

          <div className="min-w-0">
            <p
              className="truncate text-sm font-semibold text-slate-800"
              title={counsellorName}
            >
              {counsellorName}
            </p>

            {counsellorEmail && (
              <p
                className="mt-1 max-w-[150px] truncate text-xs text-slate-500"
                title={counsellorEmail}
              >
                {counsellorEmail}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* ========================================================
          CREATED DATE
      ======================================================== */}

      <td className="px-6 py-5">
        <div className="flex items-start gap-2">
          <CalendarDays
            size={15}
            className="mt-0.5 shrink-0 text-slate-400"
          />

          <div>
            <p className="whitespace-nowrap text-sm font-medium text-slate-800">
              {formatDate(student?.createdAt)}
            </p>

            {student?.updatedAt && (
              <p className="mt-1 whitespace-nowrap text-xs text-slate-500">
                Updated {formatDate(student.updatedAt)}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* ========================================================
          ACTIONS
      ======================================================== */}

      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          {/* VIEW */}

          <button
            type="button"
            onClick={() => onView?.(student)}
            className="rounded-xl border border-sky-200 bg-sky-50 p-2.5 text-sky-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300"
            title="View Student"
            aria-label={`View ${studentName}`}
          >
            <Eye size={18} />
          </button>

          {/* EDIT */}

          <button
            type="button"
            onClick={() => onEdit?.(student)}
            className="rounded-xl border border-amber-200 bg-amber-50 p-2.5 text-amber-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300"
            title="Edit Student"
            aria-label={`Edit ${studentName}`}
          >
            <Pencil size={18} />
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={() => onDelete?.(student)}
            className="rounded-xl border border-red-200 bg-red-50 p-2.5 text-red-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
            title="Delete Student"
            aria-label={`Delete ${studentName}`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default StudentRow;