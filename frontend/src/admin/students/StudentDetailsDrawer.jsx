import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Pencil,
  Mail,
  Phone,
  GraduationCap,
  UserRound,
  Hash,
  MapPin,
  CalendarDays,
  Wallet,
  Percent,
  IndianRupee,
  FileText,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

/* ============================================================
   HELPERS
============================================================ */

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

const formatDateTime = (date) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatCurrency = (amount) => {
  const value = Number(amount);

  if (Number.isNaN(value)) {
    return "₹0";
  }

  return `₹${value.toLocaleString("en-IN")}`;
};

const getInitials = (name) => {
  if (!name) return "?";

  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

const getStatusStyle = (status) => {
  const value = String(status || "").toLowerCase();

  if (
    value === "enrolled" ||
    value === "fee paid" ||
    value === "documents verified"
  ) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (
    value === "rejected" ||
    value === "cancelled" ||
    value === "admission cancelled" ||
    value === "withdrawn"
  ) {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (
    value === "document pending" ||
    value === "documents pending" ||
    value === "pending"
  ) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (value === "applied" || value === "offer letter") {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  return "border-sky-200 bg-sky-50 text-sky-700";
};

const getPaymentStyle = (status) => {
  switch (String(status || "").toLowerCase()) {
    case "paid":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "partial":
      return "border-amber-200 bg-amber-50 text-amber-700";

    default:
      return "border-red-200 bg-red-50 text-red-700";
  }
};

/* ============================================================
   INFO ITEM
============================================================ */

const InfoItem = ({ icon: Icon, label, value, children }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm ring-1 ring-slate-200">
          <Icon size={17} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          {children || (
            <p className="mt-1 break-words text-sm font-semibold text-slate-800">
              {value || "-"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   SECTION HEADER
============================================================ */

const SectionHeader = ({ icon: Icon, title, description }) => {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
        <Icon size={18} />
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>

        {description && (
          <p className="mt-0.5 text-xs text-slate-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   MAIN COMPONENT
============================================================ */

const StudentDetailsDrawer = ({
  open,
  loading,
  student,
  onClose,
  onEdit,
}) => {
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
              stiffness: 320,
              damping: 32,
            }}
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-2xl flex-col overflow-hidden border-l border-slate-200 bg-white shadow-2xl"
          >
            {/* ====================================================
                HEADER
            ==================================================== */}

            <div className="shrink-0 border-b border-slate-200 bg-white">
              <div className="flex items-center justify-between px-5 py-4 sm:px-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                    Student Profile
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-900">
                    Student Details
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {student && !loading && (
                    <button
                      type="button"
                      onClick={onEdit}
                      className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-sm font-semibold text-amber-700 transition hover:-translate-y-0.5 hover:bg-amber-100 hover:shadow-sm"
                    >
                      <Pencil size={16} />
                      <span className="hidden sm:inline">
                        Edit
                      </span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                    aria-label="Close student details"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* ====================================================
                CONTENT
            ==================================================== */}

            <div className="flex-1 overflow-y-auto">
              {/* ==================================================
                  LOADING
              ================================================== */}

              {loading && (
                <div className="space-y-6 p-5 sm:p-6">
                  <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-slate-200" />

                      <div className="flex-1 space-y-3">
                        <div className="h-5 w-48 rounded bg-slate-200" />
                        <div className="h-4 w-32 rounded bg-slate-100" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-20 animate-pulse rounded-2xl bg-slate-100"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ==================================================
                  EMPTY
              ================================================== */}

              {!loading && !student && (
                <div className="flex min-h-[500px] items-center justify-center p-8 text-center">
                  <div>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <UserRound size={28} />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                      Student Not Found
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Unable to load the selected student.
                    </p>
                  </div>
                </div>
              )}

              {/* ==================================================
                  STUDENT DATA
              ================================================== */}

              {!loading && student && (
                <div className="space-y-6 p-5 sm:p-6">
                  {/* ==================================================
                      PROFILE HERO
                  ================================================== */}

                  <section className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 items-center gap-4">
                        {student?.profileImage ? (
                          <img
                            src={student.profileImage}
                            alt={student?.studentName || "Student"}
                            className="h-16 w-16 shrink-0 rounded-2xl border border-white object-cover shadow-sm"
                          />
                        ) : (
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-lg font-black text-white shadow-lg">
                            {getInitials(student?.studentName)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <h3 className="truncate text-xl font-black text-slate-900">
                            {student?.studentName || "-"}
                          </h3>

                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                              <Hash size={13} />

                              {student?.studentNumber || "-"}
                            </span>

                            {student?.lead?.leadId && (
                              <>
                                <span className="text-slate-300">
                                  •
                                </span>

                                <span className="text-xs font-medium text-slate-500">
                                  Lead: {student.lead.leadId}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                          student?.admissionStatus
                        )}`}
                      >
                        {student?.admissionStatus || "New"}
                      </span>
                    </div>
                  </section>

                  {/* ==================================================
                      CONTACT INFORMATION
                  ================================================== */}

                  <section>
                    <SectionHeader
                      icon={UserRound}
                      title="Contact Information"
                      description="Student contact and assigned counsellor details."
                    />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <InfoItem
                        icon={Mail}
                        label="Email"
                        value={student?.email}
                      />

                      <InfoItem
                        icon={Phone}
                        label="Phone"
                        value={student?.phoneNumber}
                      />

                      <InfoItem
                        icon={UserRound}
                        label="Counsellor"
                        value={
                          typeof student?.counsellor === "object"
                            ? student?.counsellor?.name
                            : student?.counsellor
                        }
                      />

                      <InfoItem
                        icon={Hash}
                        label="Employee ID"
                        value={student?.counsellor?.employeeId}
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
                      description="University, course and intake information."
                    />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <InfoItem
                        icon={GraduationCap}
                        label="University"
                        value={
                          typeof student?.university === "object"
                            ? student?.university?.name
                            : student?.university
                        }
                      />

                      <InfoItem
                        icon={GraduationCap}
                        label="Course"
                        value={
                          typeof student?.course === "object"
                            ? student?.course?.name
                            : student?.course
                        }
                      />

                      <InfoItem
                        icon={MapPin}
                        label="Country"
                        value={student?.country}
                      />

                      <InfoItem
                        icon={CalendarDays}
                        label="Intake"
                        value={student?.intake}
                      />

                      <InfoItem
                        icon={CalendarDays}
                        label="Created"
                        value={formatDate(student?.createdAt)}
                      />

                      <InfoItem
                        icon={Clock3}
                        label="Last Updated"
                        value={formatDate(student?.updatedAt)}
                      />
                    </div>
                  </section>

                  {/* ==================================================
                      FINANCIAL INFORMATION
                  ================================================== */}

                  <section>
                    <SectionHeader
                      icon={Wallet}
                      title="Financial Information"
                      description="Tuition, commission and payment status."
                    />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <InfoItem
                        icon={IndianRupee}
                        label="Tuition Fee"
                        value={formatCurrency(student?.tuitionFee)}
                      />

                      <InfoItem
                        icon={Percent}
                        label="Commission"
                        value={`${Number(
                          student?.commissionPercent || 0
                        )}%`}
                      />

                      <InfoItem
                        icon={IndianRupee}
                        label="Commission Amount"
                        value={formatCurrency(
                          student?.commissionAmount
                        )}
                      />

                      <InfoItem
                        icon={Wallet}
                        label="Payment Status"
                      >
                        <span
                          className={`mt-1 inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold capitalize ${getPaymentStyle(
                            student?.paymentStatus
                          )}`}
                        >
                          {student?.paymentStatus || "Pending"}
                        </span>
                      </InfoItem>

                      <InfoItem
                        icon={CalendarDays}
                        label="Payment Date"
                        value={formatDate(student?.paymentDate)}
                      />
                    </div>
                  </section>

                  {/* ==================================================
                      NOTES
                  ================================================== */}

                  {student?.notes && (
                    <section>
                      <SectionHeader
                        icon={FileText}
                        title="Notes"
                        description="Internal notes related to this student."
                      />

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                          {student.notes}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* ==================================================
                      DOCUMENTS
                  ================================================== */}

                  <section>
                    <SectionHeader
                      icon={FileText}
                      title="Documents"
                      description="Documents uploaded for the student's admission."
                    />

                    {Array.isArray(student?.documents) &&
                    student.documents.length > 0 ? (
                      <div className="space-y-3">
                        {student.documents.map((document, index) => (
                          <div
                            key={
                              document?._id ||
                              `${document?.name || "document"}-${index}`
                            }
                            className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                                <FileText size={18} />
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-800">
                                  {document?.name || "Document"}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  Uploaded{" "}
                                  {formatDate(
                                    document?.uploadedAt
                                  )}
                                </p>
                              </div>
                            </div>

                            {document?.url && (
                              <a
                                href={document.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-sky-600 transition hover:bg-sky-100"
                                title="Open document"
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                        <FileText
                          size={24}
                          className="mx-auto text-slate-400"
                        />

                        <p className="mt-2 text-sm font-semibold text-slate-600">
                          No documents uploaded
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Documents will appear here once uploaded.
                        </p>
                      </div>
                    )}
                  </section>

                  {/* ==================================================
                      TIMELINE
                  ================================================== */}

                  <section>
                    <SectionHeader
                      icon={Clock3}
                      title="Student Timeline"
                      description="Recent activities and student progress."
                    />

                    {Array.isArray(student?.timeline) &&
                    student.timeline.length > 0 ? (
                      <div className="relative ml-2 space-y-5 border-l border-slate-200 pl-6">
                        {[...student.timeline]
                          .reverse()
                          .map((item, index) => (
                            <div
                              key={
                                item?._id ||
                                `${item?.title || "timeline"}-${index}`
                              }
                              className="relative"
                            >
                              <div className="absolute -left-[33px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-sky-500">
                                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                              </div>

                              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                  <div>
                                    <h4 className="text-sm font-bold text-slate-900">
                                      {item?.title ||
                                        "Student Activity"}
                                    </h4>

                                    {item?.description && (
                                      <p className="mt-1 text-sm leading-5 text-slate-600">
                                        {item.description}
                                      </p>
                                    )}
                                  </div>

                                  <span className="shrink-0 text-xs font-medium text-slate-400">
                                    {formatDateTime(item?.date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                        <Clock3
                          size={24}
                          className="mx-auto text-slate-400"
                        />

                        <p className="mt-2 text-sm font-semibold text-slate-600">
                          No timeline activity
                        </p>
                      </div>
                    )}
                  </section>

                  {/* ==================================================
                      STATUS FOOTER
                  ================================================== */}

                  <section className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 to-cyan-50 p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm">
                        {student?.admissionStatus === "Enrolled" ? (
                          <CheckCircle2 size={20} />
                        ) : (
                          <AlertCircle size={20} />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Current Admission Status
                        </p>

                        <p className="mt-1 text-sm text-slate-600">
                          {student?.admissionStatus ||
                            "New"}
                        </p>

                        {student?.updatedAt && (
                          <p className="mt-2 text-xs text-slate-400">
                            Last updated{" "}
                            {formatDateTime(student.updatedAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </div>

            {/* ====================================================
                FOOTER
            ==================================================== */}

            {!loading && student && (
              <div className="shrink-0 border-t border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="hidden text-xs text-slate-400 sm:block">
                    Student ID: {student?._id || "-"}
                  </p>

                  <div className="ml-auto flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      onClick={onEdit}
                      className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 hover:shadow-md"
                    >
                      <Pencil size={16} />
                      Edit Student
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default StudentDetailsDrawer;