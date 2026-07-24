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
} from "lucide-react";

export default function AddCounsellor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    designation: "",
    department: "",
    role: "Counsellor",
    monthlyLeadTarget: "",
    monthlyAdmissionTarget: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/counsellor/addcounsellor",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Counsellor Added Successfully");
        navigate("/admin/counsellors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-100">

      {/* Background Blur */}

      <div className="absolute -top-44 -left-44 h-[420px] w-[420px] rounded-full bg-cyan-300/30 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-sky-300/30 blur-[150px]" />

      <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/20 blur-[120px]" />

      {/* Dot Pattern */}

      <div className="absolute inset-0 bg-[radial-gradient(#7dd3fc_1px,transparent_1px)] [background-size:26px_26px] opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        {/* Heading */}

        <div className="mb-12">

          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 backdrop-blur-xl px-5 py-2 shadow-md">

            <ShieldCheck className="h-5 w-5 text-sky-600" />

            <span className="font-semibold text-sky-700">
              Admin Dashboard
            </span>

          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight text-slate-900">

            Add New

            <span className="block bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">

              Counsellor

            </span>

          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">

            Create new counsellor accounts, assign departments, monthly
            targets and manage your team from one premium dashboard.

          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT SIDE */}

          <div className="rounded-[36px] border border-white/70 bg-white/70 backdrop-blur-2xl p-10 shadow-[0_30px_80px_rgba(14,165,233,.18)]">

            <h2 className="text-3xl font-bold text-slate-900">

              Why Add Counsellor?

            </h2>

            <p className="mt-5 leading-8 text-slate-600">

              Easily manage your education counsellors with secure login,
              performance tracking and monthly targets.

            </p>

            <div className="mt-10 space-y-5">
                            <div className="flex items-center gap-5 rounded-3xl border border-sky-100 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100">

                  <CheckCircle2 className="h-7 w-7 text-cyan-600" />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">
                    Secure Management
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Create and manage counsellor accounts securely.
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-5 rounded-3xl border border-sky-100 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100">

                  <Target className="h-7 w-7 text-sky-600" />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">
                    Monthly Targets
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Assign monthly lead and admission targets.
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-5 rounded-3xl border border-sky-100 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">

                  <GraduationCap className="h-7 w-7 text-emerald-600" />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">
                    Education CRM
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Professional dashboard for education management.
                  </p>

                </div>

              </div>

            </div>

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

          {/* RIGHT SIDE */}

          <div className="rounded-[36px] border border-white/70 bg-white/80 backdrop-blur-2xl shadow-[0_30px_80px_rgba(14,165,233,.18)]">

            <form
              onSubmit={handleSubmit}
              className="p-10"
            >

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

              <div className="grid gap-6 md:grid-cols-2">
                            {/* Name */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Counsellor Name
                </label>

                <div className="relative">

                  <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-500" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-sky-100 bg-white py-4 pl-14 pr-5 shadow-sm outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  />

                </div>

              </div>

              {/* Email */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <div className="relative">

                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-500" />

                  <input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-sky-100 bg-white py-4 pl-14 pr-5 shadow-sm outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  />

                </div>

              </div>

              {/* Phone */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>

                <div className="relative">

                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-500" />

                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="9876543210"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-sky-100 bg-white py-4 pl-14 pr-5 shadow-sm outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="relative">

                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-500" />

                  <input
                    type="password"
                    name="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-sky-100 bg-white py-4 pl-14 pr-5 shadow-sm outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  />

                </div>

              </div>
                            {/* Designation */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Designation
                </label>

                <div className="relative">

                  <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-500" />

                  <input
                    type="text"
                    name="designation"
                    placeholder="Senior Counsellor"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-sky-100 bg-white py-4 pl-14 pr-5 shadow-sm outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  />

                </div>

              </div>

              {/* Department */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Department
                </label>

                <div className="relative">

                  <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-500" />

                  <input
                    type="text"
                    name="department"
                    placeholder="Admission Department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-sky-100 bg-white py-4 pl-14 pr-5 shadow-sm outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  />

                </div>

              </div>

            </div>

            {/* Role */}

            <div className="mt-6">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Select Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-2xl border border-sky-100 bg-white px-5 py-4 shadow-sm outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
              >
                <option value="Counsellor">Counsellor</option>
                <option value="Senior Counsellor">Senior Counsellor</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>

            </div>

            {/* Targets */}

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Monthly Lead Target
                </label>

                <div className="relative">

                  <Target className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-500" />

                  <input
                    type="number"
                    name="monthlyLeadTarget"
                    placeholder="100"
                    value={formData.monthlyLeadTarget}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-sky-100 bg-white py-4 pl-14 pr-5 shadow-sm outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  />

                </div>

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Monthly Admission Target
                </label>

                <div className="relative">

                  <GraduationCap className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-500" />

                  <input
                    type="number"
                    name="monthlyAdmissionTarget"
                    placeholder="30"
                    value={formData.monthlyAdmissionTarget}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-sky-100 bg-white py-4 pl-14 pr-5 shadow-sm outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  />

                </div>

              </div>

            </div>
                        {/* Submit Button */}

            <button
              type="submit"
              className="group mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 py-4 text-lg font-bold text-white shadow-[0_20px_40px_rgba(14,165,233,.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(14,165,233,.45)]"
            >
              <ShieldCheck className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />

              Save Counsellor

            </button>

            {/* Bottom Info */}

            <div className="mt-8 rounded-3xl border border-sky-100 bg-gradient-to-r from-sky-50 to-cyan-50 p-5">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100">

                  <CheckCircle2 className="h-6 w-6 text-cyan-600" />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">

                    Quick Information

                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">

                    After creating the counsellor account, the employee can log
                    in using the registered email and password. Monthly lead and
                    admission targets can be updated anytime from the admin
                    dashboard.

                  </p>

                </div>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>

  </div>

);
}
           