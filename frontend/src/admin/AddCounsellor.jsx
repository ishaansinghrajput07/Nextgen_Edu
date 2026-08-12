import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
  User,
  Mail,
  Phone,
  Lock,
  Building2,
  Briefcase,
  Target,
  ShieldCheck,
  GraduationCap,
  CheckCircle2,
  CalendarDays,
  FileText,
  Hash,
  Image,
} from "lucide-react";

export default function AddCounsellor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    employeeId: "",
    designation: "Counsellor",
    department: "Admissions",
    role: "Counsellor",
    monthlyLeadTarget: "",
    monthlyAdmissionTarget: "",
    joiningDate: "",
    notes: "",
    permissions: [],
    profileImage: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  // ============================================================
  // HANDLE INPUT
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // VALIDATION
  // ============================================================

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter counsellor name");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter email address");
      return false;
    }

    if (!formData.phoneNumber.trim()) {
      toast.error("Please enter phone number");
      return false;
    }

    if (!formData.password) {
      toast.error("Please enter password");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );
      return false;
    }

    if (!formData.employeeId.trim()) {
      toast.error("Please enter employee ID");
      return false;
    }

    return true;
  };

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name: formData.name.trim(),

        email: formData.email.trim(),

        phoneNumber: formData.phoneNumber.trim(),

        password: formData.password,

        employeeId: formData.employeeId.trim(),

        designation: formData.designation.trim(),

        department: formData.department.trim(),

        role: formData.role,

        monthlyLeadTarget:
          Number(formData.monthlyLeadTarget) || 0,

        monthlyAdmissionTarget:
          Number(formData.monthlyAdmissionTarget) || 0,

        joiningDate:
          formData.joiningDate || null,

        notes: formData.notes.trim(),

        permissions: formData.permissions || [],

        profileImage:
          formData.profileImage.trim() || "",
      };

      console.log(
        "CREATE COUNSELLOR PAYLOAD:",
        payload
      );

      // ========================================================
      // CREATE COUNSELLOR API
      // ========================================================

      const response = await axios.post(
        "http://localhost:8000/api/v1/counsellor/admin/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "CREATE COUNSELLOR RESPONSE:",
        response.data
      );

      if (response.data?.success) {
        toast.success(
          response.data?.message ||
            "Counsellor Added Successfully"
        );

        navigate("/admin/counsellors");
      } else {
        toast.error(
          response.data?.message ||
            "Unable to create counsellor"
        );
      }
    } catch (error) {
      console.error(
        "CREATE COUNSELLOR ERROR:",
        error
      );

      console.error(
        "ERROR RESPONSE:",
        error?.response?.data
      );

      if (error?.response?.status === 401) {
        toast.error(
          "Authentication failed. Please login again."
        );
      } else if (
        error?.response?.status === 403
      ) {
        toast.error(
          "You don't have permission to create counsellor."
        );
      } else if (
        error?.response?.status === 409
      ) {
        toast.error(
          error?.response?.data?.message ||
            "Email or employee ID already exists."
        );
      } else {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong while creating counsellor."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // INPUT CLASS
  // ============================================================

  const inputClass =
    "w-full rounded-2xl border border-sky-100 bg-white py-4 pl-14 pr-5 text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100";

  const simpleInputClass =
    "w-full rounded-2xl border border-sky-100 bg-white px-5 py-4 text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100";

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-100">

      {/* ========================================================
          BACKGROUND
      ======================================================== */}

      <div className="absolute -left-44 -top-44 h-[420px] w-[420px] rounded-full bg-cyan-300/30 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-sky-300/30 blur-[150px]" />

      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/20 blur-[120px]" />

      <div className="absolute inset-0 bg-[radial-gradient(#7dd3fc_1px,transparent_1px)] opacity-20 [background-size:26px_26px]" />

      {/* ========================================================
          MAIN
      ======================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="mb-10">

          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-5 py-2 shadow-md backdrop-blur-xl">

            <ShieldCheck className="h-5 w-5 text-sky-600" />

            <span className="font-semibold text-sky-700">
              Admin Dashboard
            </span>

          </div>

          <h1 className="mt-6 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">

            Add New

            <span className="block bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Counsellor
            </span>

          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Create new counsellor accounts, assign departments,
            monthly targets and manage your education counselling
            team from one premium dashboard.
          </p>
        </div>

        {/* ======================================================
            GRID
        ====================================================== */}

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">

          {/* ====================================================
              LEFT SIDE
          ==================================================== */}

          <div className="rounded-[36px] border border-white/70 bg-white/70 p-7 shadow-[0_30px_80px_rgba(14,165,233,.18)] backdrop-blur-2xl sm:p-10">

            <h2 className="text-3xl font-bold text-slate-900">
              Why Add Counsellor?
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Easily manage your education counsellors with
              secure login, performance tracking, monthly
              targets and admission management.
            </p>

            {/* FEATURES */}

            <div className="mt-10 space-y-5">

              {/* Secure */}

              <div className="flex items-center gap-5 rounded-3xl border border-sky-100 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-100">
                  <CheckCircle2 className="h-7 w-7 text-cyan-600" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Secure Management
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Create and manage counsellor accounts
                    securely.
                  </p>
                </div>
              </div>

              {/* Targets */}

              <div className="flex items-center gap-5 rounded-3xl border border-sky-100 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-100">
                  <Target className="h-7 w-7 text-sky-600" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Monthly Targets
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Assign monthly lead and admission
                    targets.
                  </p>
                </div>
              </div>

              {/* CRM */}

              <div className="flex items-center gap-5 rounded-3xl border border-sky-100 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100">
                  <GraduationCap className="h-7 w-7 text-emerald-600" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Education CRM
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Professional dashboard for education
                    management.
                  </p>
                </div>
              </div>

              {/* Employee */}

              <div className="flex items-center gap-5 rounded-3xl border border-sky-100 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100">
                  <Hash className="h-7 w-7 text-violet-600" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Employee Management
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Track staff using unique employee IDs
                    and joining information.
                  </p>
                </div>
              </div>
            </div>

            {/* SUMMARY CARDS */}

            <div className="mt-10 grid grid-cols-2 gap-5">

              <div className="rounded-3xl bg-gradient-to-br from-cyan-500 to-sky-500 p-6 text-white shadow-xl">
                <h2 className="text-3xl font-black">
                  100+
                </h2>

                <p className="mt-2 text-sm text-cyan-100">
                  Monthly Leads
                </p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-500 p-6 text-white shadow-xl">
                <h2 className="text-3xl font-black">
                  24/7
                </h2>

                <p className="mt-2 text-sm text-blue-100">
                  Team Support
                </p>
              </div>

            </div>
          </div>

          {/* ====================================================
              RIGHT SIDE
          ==================================================== */}

          <div className="rounded-[36px] border border-white/70 bg-white/80 shadow-[0_30px_80px_rgba(14,165,233,.18)] backdrop-blur-2xl">

            <form
              onSubmit={handleSubmit}
              className="p-7 sm:p-10"
            >

              {/* FORM HEADER */}

              <div className="mb-8">

                <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">

                  <ShieldCheck className="h-4 w-4" />

                  New Staff Registration
                </span>

                <h2 className="mt-5 text-3xl font-bold text-slate-900">
                  Counsellor Details
                </h2>

                <p className="mt-2 text-slate-500">
                  Fill all required details below.
                </p>
              </div>

              {/* ==================================================
                  BASIC INFORMATION
              ================================================== */}

              <div className="mb-8">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100">
                    <User className="h-5 w-5 text-sky-600" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      Basic Information
                    </h3>

                    <p className="text-xs text-slate-500">
                      Personal and login details
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">

                  {/* NAME */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Counsellor Name
                    </label>

                    <div className="relative">

                      <User className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-500" />

                      <input
                        type="text"
                        name="name"
                        placeholder="Enter Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />

                    </div>
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email Address
                    </label>

                    <div className="relative">

                      <Mail className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-500" />

                      <input
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />

                    </div>
                  </div>

                  {/* PHONE */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Phone Number
                    </label>

                    <div className="relative">

                      <Phone className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-500" />

                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="9876543210"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />

                    </div>
                  </div>

                  {/* PASSWORD */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Password
                    </label>

                    <div className="relative">

                      <Lock className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-500" />

                      <input
                        type="password"
                        name="password"
                        placeholder="Minimum 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />

                    </div>
                  </div>

                </div>
              </div>

              {/* ==================================================
                  EMPLOYEE INFORMATION
              ================================================== */}

              <div className="mb-8">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                    <Briefcase className="h-5 w-5 text-violet-600" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      Employee Information
                    </h3>

                    <p className="text-xs text-slate-500">
                      Staff identity and organization
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">

                  {/* EMPLOYEE ID */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Employee ID
                    </label>

                    <div className="relative">

                      <Hash className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-500" />

                      <input
                        type="text"
                        name="employeeId"
                        placeholder="EMP001"
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />

                    </div>
                  </div>

                  {/* DESIGNATION */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Designation
                    </label>

                    <div className="relative">

                      <Briefcase className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-500" />

                      <input
                        type="text"
                        name="designation"
                        placeholder="Senior Counsellor"
                        value={formData.designation}
                        onChange={handleChange}
                        className={inputClass}
                      />

                    </div>
                  </div>

                  {/* DEPARTMENT */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Department
                    </label>

                    <div className="relative">

                      <Building2 className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-500" />

                      <input
                        type="text"
                        name="department"
                        placeholder="Admissions"
                        value={formData.department}
                        onChange={handleChange}
                        className={inputClass}
                      />

                    </div>
                  </div>

                  {/* JOINING DATE */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Joining Date
                    </label>

                    <div className="relative">

                      <CalendarDays className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-500" />

                      <input
                        type="date"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleChange}
                        className={inputClass}
                      />

                    </div>
                  </div>

                </div>
              </div>

              {/* ==================================================
                  ROLE
              ================================================== */}

              <div className="mb-8">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Select Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={simpleInputClass}
                >
                  <option value="Counsellor">
                    Counsellor
                  </option>

                  <option value="Senior Counsellor">
                    Senior Counsellor
                  </option>

                  <option value="Manager">
                    Manager
                  </option>

                  <option value="Admin">
                    Admin
                  </option>
                </select>

                <p className="mt-2 text-xs text-slate-400">
                  Access permissions are controlled by the
                  backend according to the selected role.
                </p>

              </div>

              {/* ==================================================
                  TARGETS
              ================================================== */}

              <div className="mb-8">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                    <Target className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      Monthly Targets
                    </h3>

                    <p className="text-xs text-slate-500">
                      Set performance targets
                    </p>
                  </div>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                  {/* LEAD TARGET */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Monthly Lead Target
                    </label>

                    <div className="relative">

                      <Target className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-500" />

                      <input
                        type="number"
                        min="0"
                        name="monthlyLeadTarget"
                        placeholder="100"
                        value={
                          formData.monthlyLeadTarget
                        }
                        onChange={handleChange}
                        className={inputClass}
                      />

                    </div>
                  </div>

                  {/* ADMISSION TARGET */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Monthly Admission Target
                    </label>

                    <div className="relative">

                      <GraduationCap className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-500" />

                      <input
                        type="number"
                        min="0"
                        name="monthlyAdmissionTarget"
                        placeholder="20"
                        value={
                          formData.monthlyAdmissionTarget
                        }
                        onChange={handleChange}
                        className={inputClass}
                      />

                    </div>
                  </div>

                </div>
              </div>

              {/* ==================================================
                  PROFILE IMAGE
              ================================================== */}

              <div className="mb-8">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Profile Image URL
                </label>

                <div className="relative">

                  <Image className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-500" />

                  <input
                    type="text"
                    name="profileImage"
                    placeholder="https://example.com/profile.jpg"
                    value={formData.profileImage}
                    onChange={handleChange}
                    className={inputClass}
                  />

                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Optional. Leave empty if profile image is
                  not available.
                </p>

              </div>

              {/* ==================================================
                  NOTES
              ================================================== */}

              <div className="mb-8">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Notes
                </label>

                <div className="relative">

                  <FileText className="absolute left-5 top-5 h-5 w-5 text-sky-500" />

                  <textarea
                    name="notes"
                    rows={4}
                    placeholder="New counsellor"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full resize-none rounded-2xl border border-sky-100 bg-white py-4 pl-14 pr-5 text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  />

                </div>

              </div>

              {/* ==================================================
                  PERMISSIONS
              ================================================== */}

              <div className="mb-8 rounded-3xl border border-sky-100 bg-sky-50/70 p-5">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">

                    <ShieldCheck className="h-5 w-5 text-sky-600" />

                  </div>

                  <div>

                    <h3 className="font-bold text-slate-800">
                      Permissions
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Default permissions will be controlled
                      by the backend according to the counsellor
                      role. Currently no custom permissions are
                      being assigned from this form.
                    </p>

                  </div>

                </div>

              </div>

              {/* ==================================================
                  SUBMIT
              ================================================== */}

              <button
                type="submit"
                disabled={submitting}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 py-4 text-lg font-bold text-white shadow-[0_20px_40px_rgba(14,165,233,.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(14,165,233,.45)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >

                {submitting ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                    Creating Counsellor...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />

                    Save Counsellor
                  </>
                )}

              </button>

              {/* ==================================================
                  QUICK INFO
              ================================================== */}

              <div className="mt-8 rounded-3xl border border-sky-100 bg-gradient-to-r from-sky-50 to-cyan-50 p-5">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-100">

                    <CheckCircle2 className="h-6 w-6 text-cyan-600" />

                  </div>

                  <div>

                    <h3 className="font-bold text-slate-800">
                      Quick Information
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      After creating the counsellor account,
                      the employee can log in using the registered
                      email and password. Monthly lead and
                      admission targets can be updated anytime
                      from the admin dashboard.
                    </p>

                  </div>

                </div>

              </div>

            </form>
          </div>
        </div>

        {/* ======================================================
            FOOTER INFO
        ====================================================== */}

        <div className="mt-8 rounded-3xl border border-white/70 bg-white/60 p-5 text-center shadow-sm backdrop-blur-xl">

          <p className="text-sm text-slate-500">
            NextGen Education CRM • Counsellor Management
          </p>

        </div>

      </div>
    </div>
  );
}