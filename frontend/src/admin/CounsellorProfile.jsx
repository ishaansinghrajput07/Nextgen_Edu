
import {
  ArrowLeft,
  Mail,
  Phone,
  Users,
  CheckCircle,
  Clock,
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  X,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

export default function CounsellorProfile() {
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const [counsellor, setCounsellor] = useState(null);
  const [assignedLeads, setAssignedLeads] = useState([]);

  // ============================================================
  // RESET PASSWORD STATES
  // ============================================================

  const [resetPasswordOpen, setResetPasswordOpen] =
    useState(false);

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [resettingPassword, setResettingPassword] =
    useState(false);

  // ============================================================
  // FETCH COUNSELLOR DATA
  // ============================================================

  useEffect(() => {
    const fetchData = async () => {
      try {
        const counsellorRes = await axios.get(
          `http://localhost:8000/api/v1/counsellor/admin/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCounsellor(
          counsellorRes.data?.counsellor ||
            counsellorRes.data?.data ||
            null,
        );

        const contactRes = await axios.get(
          "http://localhost:8000/api/v1/contact",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const contacts =
          contactRes.data?.leads ||
          contactRes.data?.data?.leads ||
          contactRes.data?.data ||
          [];

        const assigned = Array.isArray(contacts)
          ? contacts.filter((item) => {
              const counsellorId =
                typeof item?.counsellor === "object"
                  ? item?.counsellor?._id
                  : item?.counsellor;

              return counsellorId === id;
            })
          : [];

        setAssignedLeads(assigned);
      } catch (error) {
        console.error(
          "FETCH COUNSELLOR PROFILE ERROR:",
          error,
        );

        toast.error(
          error?.response?.data?.message ||
            "Unable to load counsellor",
        );
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, token]);

  // ============================================================
  // RESET PASSWORD
  // ============================================================

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword.trim()) {
      toast.error("Please enter new password");
      return;
    }

    if (newPassword.length < 6) {
      toast.error(
        "Password must be at least 6 characters",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setResettingPassword(true);

      const res = await axios.put(
        `http://localhost:8000/api/v1/counsellor/admin/${id}/reset-password`,
        {
          password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data?.success) {
        toast.success(
          "Counsellor password reset successfully",
        );

        setNewPassword("");
        setConfirmPassword("");
        setResetPasswordOpen(false);
      } else {
        toast.error(
          res.data?.message ||
            "Unable to reset password",
        );
      }
    } catch (error) {
      console.error(
        "RESET COUNSELLOR PASSWORD ERROR:",
        error,
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to reset password",
      );
    } finally {
      setResettingPassword(false);
    }
  };

  // ============================================================
  // PASSWORD MODAL CLOSE
  // ============================================================

  const closeResetPasswordModal = () => {
    if (resettingPassword) return;

    setResetPasswordOpen(false);
    setNewPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // ============================================================
  // STATS
  // ============================================================

  const convertedLeads = assignedLeads.filter(
    (lead) =>
      String(lead?.status || "").toLowerCase() ===
      "converted",
  ).length;

  const pendingLeads = assignedLeads.filter(
    (lead) =>
      String(lead?.status || "").toLowerCase() ===
        "pending" ||
      String(lead?.status || "").toLowerCase() ===
        "follow up",
  ).length;

  // ============================================================
  // LOADING
  // ============================================================

  if (!counsellor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-cyan-50">
        <div className="rounded-3xl border border-white bg-white/80 p-10 text-center shadow-xl backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100">
            <UserRound className="text-sky-600" size={30} />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-700">
            Counsellor Not Found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The requested counsellor could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen space-y-8 overflow-hidden">
      {/* ========================================================
          BACKGROUND
      ======================================================== */}

      <div className="pointer-events-none absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-cyan-200/40 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-blue-200/30 blur-[120px]" />

      {/* ========================================================
          BACK BUTTON
      ======================================================== */}

      <Link
        to="/admin/counsellors"
        className="relative z-10 inline-flex items-center gap-2 rounded-2xl border border-white bg-white/80 px-5 py-3 font-semibold text-cyan-600 shadow-sm backdrop-blur-xl transition hover:bg-cyan-50"
      >
        <ArrowLeft size={18} />
        Back to Counsellors
      </Link>

      {/* ========================================================
          PROFILE HEADER
      ======================================================== */}

      <div className="relative z-10 rounded-[36px] border border-white bg-white/80 p-8 shadow-[0_30px_80px_rgba(14,165,233,.15)] backdrop-blur-2xl">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          {/* Avatar */}

          <div className="flex h-24 w-24 items-center justify-center rounded-[30px] bg-gradient-to-br from-cyan-500 to-sky-600 shadow-xl shadow-cyan-200">
            <UserRound
              size={45}
              className="text-white"
            />
          </div>

          <div className="flex-1">
            <h1 className="bg-gradient-to-r from-cyan-500 to-sky-600 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
              {counsellor.name}
            </h1>

            <p className="mt-2 text-slate-500">
              {counsellor.designation ||
                "Professional Admission Counsellor"}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  counsellor.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {counsellor.status || "Active"}
              </span>

              {counsellor.role && (
                <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
                  {counsellor.role}
                </span>
              )}
            </div>
          </div>

          {/* RESET PASSWORD BUTTON */}

          <button
            type="button"
            onClick={() =>
              setResetPasswordOpen(true)
            }
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-950 px-5 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <LockKeyhole size={18} />

            Reset Password
          </button>
        </div>

        {/* ======================================================
            STATS
        ====================================================== */}

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {/* Assigned Leads */}

          <div className="flex items-center gap-4 rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100">
              <Users className="text-cyan-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Leads
              </p>

              <h3 className="text-3xl font-bold text-slate-800">
                {assignedLeads.length}
              </h3>
            </div>
          </div>

          {/* Converted */}

          <div className="flex items-center gap-4 rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
              <CheckCircle className="text-emerald-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Converted
              </p>

              <h3 className="text-3xl font-bold text-slate-800">
                {convertedLeads}
              </h3>
            </div>
          </div>

          {/* Pending */}

          <div className="flex items-center gap-4 rounded-3xl border border-yellow-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100">
              <Clock className="text-yellow-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <h3 className="text-3xl font-bold text-slate-800">
                {pendingLeads}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          COUNSELLOR INFORMATION
      ======================================================== */}

      <div className="relative z-10 rounded-[36px] border border-white bg-white/80 p-8 shadow-[0_25px_70px_rgba(14,165,233,.12)] backdrop-blur-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Counsellor Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Account and employment details
            </p>
          </div>

          <div className="hidden rounded-2xl bg-cyan-100 p-3 sm:block">
            <ShieldCheck
              className="text-cyan-600"
              size={22}
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Email */}

          <div className="rounded-3xl border border-sky-100 bg-sky-50 p-5">
            <div className="mb-3 flex items-center gap-3">
              <Mail
                size={22}
                className="text-cyan-600"
              />

              <span className="text-sm text-slate-500">
                Email
              </span>
            </div>

            <p className="break-all font-semibold text-slate-800">
              {counsellor.email || "-"}
            </p>
          </div>

          {/* Phone */}

          <div className="rounded-3xl border border-cyan-100 bg-cyan-50 p-5">
            <div className="mb-3 flex items-center gap-3">
              <Phone
                size={22}
                className="text-cyan-600"
              />

              <span className="text-sm text-slate-500">
                Phone Number
              </span>
            </div>

            <p className="font-semibold text-slate-800">
              {counsellor.phoneNumber || "-"}
            </p>
          </div>

          {/* Employee ID */}

          <div className="rounded-3xl border border-slate-100 bg-white p-5">
            <p className="mb-2 text-sm text-slate-500">
              Employee ID
            </p>

            <p className="font-semibold text-slate-800">
              {counsellor.employeeId || "-"}
            </p>
          </div>

          {/* Designation */}

          <div className="rounded-3xl border border-slate-100 bg-white p-5">
            <p className="mb-2 text-sm text-slate-500">
              Designation
            </p>

            <p className="font-semibold text-slate-800">
              {counsellor.designation || "-"}
            </p>
          </div>

          {/* Department */}

          <div className="rounded-3xl border border-slate-100 bg-white p-5">
            <p className="mb-2 text-sm text-slate-500">
              Department
            </p>

            <p className="font-semibold text-slate-800">
              {counsellor.department || "-"}
            </p>
          </div>

          {/* Role */}

          <div className="rounded-3xl border border-slate-100 bg-white p-5">
            <p className="mb-2 text-sm text-slate-500">
              Role
            </p>

            <p className="font-semibold text-cyan-600">
              {counsellor.role || "Counsellor"}
            </p>
          </div>

          {/* Joining Date */}

          <div className="rounded-3xl border border-slate-100 bg-white p-5">
            <p className="mb-2 text-sm text-slate-500">
              Joining Date
            </p>

            <p className="font-semibold text-slate-800">
              {counsellor.joiningDate
                ? new Date(
                    counsellor.joiningDate,
                  ).toLocaleDateString("en-IN")
                : "-"}
            </p>
          </div>

          {/* Monthly Lead Target */}

          <div className="rounded-3xl border border-slate-100 bg-white p-5">
            <p className="mb-2 text-sm text-slate-500">
              Monthly Lead Target
            </p>

            <p className="font-semibold text-slate-800">
              {counsellor.monthlyLeadTarget ??
                0}
            </p>
          </div>

          {/* Monthly Admission Target */}

          <div className="rounded-3xl border border-slate-100 bg-white p-5">
            <p className="mb-2 text-sm text-slate-500">
              Monthly Admission Target
            </p>

            <p className="font-semibold text-slate-800">
              {counsellor.monthlyAdmissionTarget ??
                0}
            </p>
          </div>

          {/* Login Email */}

          <div className="rounded-3xl border border-slate-100 bg-white p-5">
            <p className="mb-2 text-sm text-slate-500">
              Login Email
            </p>

            <p className="break-all font-semibold text-cyan-600">
              {counsellor.email || "-"}
            </p>
          </div>

          {/* Password */}

          <div className="rounded-3xl border border-slate-100 bg-white p-5">
            <p className="mb-2 text-sm text-slate-500">
              Password
            </p>

            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold tracking-widest text-slate-700">
                ••••••••••
              </p>

              <button
                type="button"
                onClick={() =>
                  setResetPasswordOpen(true)
                }
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-600"
              >
                <LockKeyhole size={14} />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          ASSIGNED LEADS
      ======================================================== */}

      <div className="relative z-10 rounded-[36px] border border-white bg-white/80 p-6 shadow-[0_25px_80px_rgba(14,165,233,.12)] backdrop-blur-2xl md:p-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Assigned Leads
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage all student enquiries
            </p>
          </div>

          <span className="w-fit rounded-full bg-cyan-100 px-5 py-2 text-sm font-semibold text-cyan-700">
            {assignedLeads.length} Leads
          </span>
        </div>

        <div className="space-y-4">
          {assignedLeads.length > 0 ? (
            assignedLeads.map((lead) => (
              <div
                key={lead._id}
                className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  {/* Student Info */}

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-lg font-bold text-white">
                      {(
                        lead.leadName ||
                        lead.name ||
                        "L"
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        {lead.leadName ||
                          lead.name ||
                          "-"}
                      </h3>

                      <p className="text-sm text-slate-500">
                        Student Enquiry
                      </p>
                    </div>
                  </div>

                  {/* Status */}

                  <span
                    className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                      lead.status ===
                      "Converted"
                        ? "bg-emerald-100 text-emerald-700"
                        : lead.status ===
                            "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {lead.status || "Pending"}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Course */}

                  <div className="rounded-2xl bg-sky-50 p-4">
                    <p className="mb-1 text-xs text-slate-500">
                      Interested Course
                    </p>

                    <p className="font-semibold text-slate-700">
                      {lead.interestedCourse ||
                        lead.course ||
                        "-"}
                    </p>
                  </div>

                  {/* Phone */}

                  <div className="rounded-2xl bg-cyan-50 p-4">
                    <p className="mb-1 text-xs text-slate-500">
                      Phone Number
                    </p>

                    <p className="font-semibold text-slate-700">
                      {lead.phoneNumber ||
                        lead.phone ||
                        "-"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-100 bg-white p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100">
                <Users
                  size={32}
                  className="text-cyan-600"
                />
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-700">
                No Leads Assigned
              </h3>

              <p className="mt-2 text-slate-500">
                Assigned student enquiries will
                appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          RESET PASSWORD MODAL
      ======================================================== */}

      {resetPasswordOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeResetPasswordModal();
            }
          }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-[30px] bg-white shadow-2xl">
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-sky-50 to-cyan-50 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100">
                  <LockKeyhole
                    className="text-cyan-600"
                    size={21}
                  />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Reset Password
                  </h2>

                  <p className="text-xs text-slate-500">
                    {counsellor.name}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeResetPasswordModal}
                disabled={resettingPassword}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-white hover:text-slate-700 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}

            <form
              onSubmit={handleResetPassword}
              className="p-6"
            >
              {/* Warning */}

              <div className="mb-6 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-amber-600"
                  />

                  <p className="text-sm leading-6 text-amber-800">
                    Set a new password for this
                    counsellor. The old password
                    will no longer work.
                  </p>
                </div>
              </div>

              {/* New Password */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  New Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value,
                      )
                    }
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev,
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-600"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Minimum 6 characters
                </p>
              </div>

              {/* Confirm Password */}

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Confirm Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value,
                      )
                    }
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev,
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Buttons */}

              <div className="mt-7 flex gap-3">
                <button
                  type="button"
                  onClick={closeResetPasswordModal}
                  disabled={resettingPassword}
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={resettingPassword}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {resettingPassword ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      Update Password
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
