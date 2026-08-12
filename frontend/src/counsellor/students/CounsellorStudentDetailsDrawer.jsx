import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  GraduationCap,
  IndianRupee,
  Mail,
  MapPin,
  Phone,
  UserRound,
  X,
} from "lucide-react";

// ============================================================
// STATUS COLORS
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

const getStatusClass = (status) => {
  if (!status) {
    return "bg-slate-100 text-slate-700 border-slate-200";
  }

  return (
    statusStyles[String(status).toLowerCase().trim()] ||
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
// FORMAT CURRENCY
// ============================================================

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || amount === "") {
    return "₹0";
  }

  return Number(amount).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
};

// ============================================================
// GET OBJECT NAME
// ============================================================

const getName = (value, fallback = "-") => {
  if (!value) return fallback;

  if (typeof value === "object") {
    return (
      value?.name ||
      value?.universityName ||
      value?.courseName ||
      value?.title ||
      fallback
    );
  }

  return value;
};

// ============================================================
// INFO ITEM
// ============================================================

const InfoItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-center gap-2">
        <Icon
          size={16}
          className="text-sky-600"
        />

        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
      </div>

      <p className="mt-2 break-words text-sm font-semibold text-slate-800">
        {value || "-"}
      </p>
    </div>
  );
};

// ============================================================
// SECTION HEADER
// ============================================================

const SectionHeader = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
        <Icon size={18} />
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>

        {description && (
          <p className="mt-0.5 text-xs text-slate-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

// ============================================================
// COMPONENT
// ============================================================

const CounsellorStudentDetailsDrawer = ({
  open,
  loading = false,
  student,
  onClose,
  onEdit,
}) => {
  const universityName = getName(
    student?.university
  );

  const courseName = getName(
    student?.course
  );

  const counsellorName = getName(
    student?.counsellor
  );

  const status =
    student?.admissionStatus || "New";

  const documents = Array.isArray(
    student?.documents
  )
    ? student.documents
    : [];

  const timeline = Array.isArray(
    student?.timeline
  )
    ? [...student.timeline].sort(
        (a, b) =>
          new Date(b?.date || 0) -
          new Date(a?.date || 0)
      )
    : [];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ======================================================
              BACKDROP
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm"
          />

          {/* ======================================================
              DRAWER
          ====================================================== */}

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl"
          >
            {/* ====================================================
                HEADER
            ==================================================== */}

            <div className="shrink-0 border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 text-sm font-bold text-white">
                    {student?.studentName
                      ? student.studentName
                          .split(/\s+/)
                          .map((word) => word[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()
                      : "?"}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-bold text-slate-900">
                      {student?.studentName ||
                        "Student Details"}
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {student?.studentNumber ||
                        "Student Profile"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close drawer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Status */}

              {student && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${getStatusClass(
                      status
                    )}`}
                  >
                    {status}
                  </span>

                  {student?.paymentStatus && (
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      Payment:{" "}
                      {student.paymentStatus}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* ====================================================
                CONTENT
            ==================================================== */}

            <div className="min-h-0 flex-1 overflow-y-auto">
              {loading ? (
                /* ==================================================
                   LOADING
                ================================================== */

                <div className="space-y-6 p-5 sm:p-6">
                  {Array.from({
                    length: 5,
                  }).map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse space-y-3"
                    >
                      <div className="h-5 w-40 rounded bg-slate-200" />

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="h-20 rounded-2xl bg-slate-100" />
                        <div className="h-20 rounded-2xl bg-slate-100" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : !student ? (
                /* ==================================================
                   NO STUDENT
                ================================================== */

                <div className="flex h-full items-center justify-center p-8 text-center">
                  <div>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <UserRound size={28} />
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                      No Student Selected
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Student details are not
                      available.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-7 p-5 sm:p-6">
                  {/* ==================================================
                      PERSONAL INFORMATION
                  ================================================== */}

                  <section>
                    <SectionHeader
                      icon={UserRound}
                      title="Personal Information"
                      description="Student contact details"
                    />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <InfoItem
                        icon={UserRound}
                        label="Student Name"
                        value={
                          student.studentName
                        }
                      />

                      <InfoItem
                        icon={Mail}
                        label="Email"
                        value={
                          student.email || "-"
                        }
                      />

                      <InfoItem
                        icon={Phone}
                        label="Phone"
                        value={
                          student.phoneNumber ||
                          "-"
                        }
                      />

                      <InfoItem
                        icon={FileText}
                        label="Student Number"
                        value={
                          student.studentNumber ||
                          "-"
                        }
                      />
                    </div>
                  </section>

                  {/* ==================================================
                      ADMISSION INFORMATION
                  ================================================== */}

                  <section>
                    <SectionHeader
                      icon={GraduationCap}
                      title="Admission Information"
                      description="University and course details"
                    />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <InfoItem
                        icon={GraduationCap}
                        label="University"
                        value={universityName}
                      />

                      <InfoItem
                        icon={BookOpen}
                        label="Course"
                        value={courseName}
                      />

                      <InfoItem
                        icon={MapPin}
                        label="Country"
                        value={
                          student.country || "-"
                        }
                      />

                      <InfoItem
                        icon={CalendarDays}
                        label="Intake"
                        value={
                          student.intake || "-"
                        }
                      />

                      <InfoItem
                        icon={UserRound}
                        label="Counsellor"
                        value={counsellorName}
                      />

                      <InfoItem
                        icon={CalendarDays}
                        label="Created"
                        value={formatDate(
                          student.createdAt
                        )}
                      />
                    </div>
                  </section>

                  {/* ==================================================
                      FEES
                  ================================================== */}

                  <section>
                    <SectionHeader
                      icon={IndianRupee}
                      title="Fees & Commission"
                      description="Student financial information"
                    />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <InfoItem
                        icon={IndianRupee}
                        label="Tuition Fee"
                        value={formatCurrency(
                          student.tuitionFee
                        )}
                      />

                      <InfoItem
                        icon={IndianRupee}
                        label="Commission"
                        value={`${student.commissionPercent || 0}%`}
                      />

                      <InfoItem
                        icon={IndianRupee}
                        label="Commission Amount"
                        value={formatCurrency(
                          student.commissionAmount
                        )}
                      />

                      <InfoItem
                        icon={CreditCard}
                        label="Payment Status"
                        value={
                          student.paymentStatus ||
                          "Pending"
                        }
                      />

                      <InfoItem
                        icon={CalendarDays}
                        label="Payment Date"
                        value={formatDate(
                          student.paymentDate
                        )}
                      />
                    </div>
                  </section>

                  {/* ==================================================
                      DOCUMENTS
                  ================================================== */}

                  <section>
                    <SectionHeader
                      icon={FileText}
                      title="Documents"
                      description={`${documents.length} document${
                        documents.length === 1
                          ? ""
                          : "s"
                      } uploaded`}
                    />

                    {documents.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                        <FileText
                          size={24}
                          className="mx-auto text-slate-400"
                        />

                        <p className="mt-2 text-sm font-semibold text-slate-700">
                          No documents uploaded
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Documents will appear
                          here after upload.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {documents.map(
                          (document, index) => (
                            <div
                              key={
                                document?._id ||
                                `${document?.name}-${index}`
                              }
                              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                            >
                              <div className="flex min-w-0 items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                                  <FileText
                                    size={18}
                                  />
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-slate-800">
                                    {document?.name ||
                                      "Document"}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-400">
                                    {formatDate(
                                      document?.uploadedAt
                                    )}
                                  </p>
                                </div>
                              </div>

                              {document?.url && (
                                <a
                                  href={
                                    document.url
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                  className="shrink-0 rounded-lg bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-600 transition hover:bg-sky-100"
                                >
                                  View
                                </a>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </section>

                  {/* ==================================================
                      NOTES
                  ================================================== */}

                  <section>
                    <SectionHeader
                      icon={FileText}
                      title="Notes"
                      description="Student-related notes"
                    />

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                        {student.notes ||
                          "No notes available."}
                      </p>
                    </div>
                  </section>

                  {/* ==================================================
                      TIMELINE
                  ================================================== */}

                  <section>
                    <SectionHeader
                      icon={Clock3}
                      title="Admission Timeline"
                      description="Student activity history"
                    />

                    {timeline.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                        <Clock3
                          size={24}
                          className="mx-auto text-slate-400"
                        />

                        <p className="mt-2 text-sm font-semibold text-slate-700">
                          No timeline activity
                        </p>
                      </div>
                    ) : (
                      <div className="relative space-y-5 pl-7">
                        {/* Vertical line */}

                        <div className="absolute bottom-2 left-[9px] top-2 w-px bg-slate-200" />

                        {timeline.map(
                          (item, index) => (
                            <div
                              key={
                                item?._id ||
                                `${item?.title}-${index}`
                              }
                              className="relative"
                            >
                              {/* Dot */}

                              <div className="absolute -left-7 top-1 flex h-[19px] w-[19px] items-center justify-center rounded-full border-4 border-white bg-sky-500 shadow-sm">
                                <CheckCircle2
                                  size={10}
                                  className="text-white"
                                />
                              </div>

                              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                  <h4 className="text-sm font-bold text-slate-800">
                                    {item?.title ||
                                      "Activity"}
                                  </h4>

                                  <span className="text-xs text-slate-400">
                                    {formatDate(
                                      item?.date
                                    )}
                                  </span>
                                </div>

                                {item?.description && (
                                  <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {
                                      item.description
                                    }
                                  </p>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </section>
                </div>
              )}
            </div>

            {/* ====================================================
                FOOTER
            ==================================================== */}

            {!loading && student && (
              <div className="shrink-0 border-t border-slate-200 bg-white p-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Close
                  </button>

                  {onEdit && (
                    <button
                      type="button"
                      onClick={() =>
                        onEdit(student)
                      }
                      className="flex-1 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 hover:shadow-md"
                    >
                      Update Student
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CounsellorStudentDetailsDrawer;