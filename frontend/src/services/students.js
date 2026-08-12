// ============================================================
// DATE FORMAT
// ============================================================

export const formatDate = (date) => {
  if (!date) return "-";

  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "-";
  }
};

// ============================================================
// DATE & TIME FORMAT
// ============================================================

export const formatDateTime = (date) => {
  if (!date) return "-";

  try {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "-";
  }
};

// ============================================================
// CURRENCY
// ============================================================

export const formatCurrency = (amount = 0) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
};

// ============================================================
// NUMBER FORMAT
// ============================================================

export const formatNumber = (number = 0) => {
  return new Intl.NumberFormat("en-IN").format(Number(number) || 0);
};

// ============================================================
// CAPITALIZE
// ============================================================

export const capitalize = (text = "") => {
  if (!text) return "-";

  return text
    .toString()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// ============================================================
// INITIALS
// ============================================================

export const getInitials = (name = "") => {
  if (!name) return "S";

  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};

// ============================================================
// ADMISSION STATUS BADGE
// ============================================================

export const getAdmissionStatusClasses = (status) => {
  switch (status) {
    case "Enrolled":
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";

    case "Pending":
      return "bg-amber-100 text-amber-700 border border-amber-200";

    case "Rejected":
      return "bg-red-100 text-red-700 border border-red-200";

    default:
      return "bg-slate-100 text-slate-700 border border-slate-200";
  }
};

// ============================================================
// PAYMENT STATUS BADGE
// ============================================================

export const getPaymentStatusClasses = (status) => {
  switch (status) {
    case "Paid":
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";

    case "Pending":
      return "bg-amber-100 text-amber-700 border border-amber-200";

    case "Failed":
      return "bg-red-100 text-red-700 border border-red-200";

    default:
      return "bg-slate-100 text-slate-700 border border-slate-200";
  }
};

// ============================================================
// LEAD STATUS BADGE
// ============================================================

export const getLeadStatusClasses = (status) => {
  switch (status) {
    case "Converted":
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";

    case "New":
      return "bg-sky-100 text-sky-700 border border-sky-200";

    case "Follow Up":
      return "bg-violet-100 text-violet-700 border border-violet-200";

    case "Lost":
      return "bg-red-100 text-red-700 border border-red-200";

    default:
      return "bg-slate-100 text-slate-700 border border-slate-200";
  }
};

// ============================================================
// EMPTY VALUE
// ============================================================

export const valueOrDash = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "-";
  }

  return value;
};

// ============================================================
// SEARCH HELPER
// ============================================================

export const searchStudent = (student, keyword) => {
  if (!keyword) return true;

  const query = keyword.toLowerCase();

  return (
    student?.studentName?.toLowerCase().includes(query) ||
    student?.studentNumber?.toLowerCase().includes(query) ||
    student?.email?.toLowerCase().includes(query) ||
    student?.phoneNumber?.toLowerCase().includes(query) ||
    student?.university?.toLowerCase().includes(query) ||
    student?.course?.toLowerCase().includes(query)
  );
};

// ============================================================
// SORT
// ============================================================

export const sortStudents = (
  students = [],
  field,
  direction = "asc"
) => {
  return [...students].sort((a, b) => {
    const first = a[field] ?? "";
    const second = b[field] ?? "";

    if (direction === "asc") {
      return first > second ? 1 : -1;
    }

    return first < second ? 1 : -1;
  });
};