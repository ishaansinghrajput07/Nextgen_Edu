import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  Users,
  ShieldCheck,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { API_V1_URL, validateLoginResponse } from "../config/api";

const API_URL = `${API_V1_URL}/auth/login`;

export default function CounsellorLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        API_URL,
        {
          email: email.trim(),
          password,
        },
        {
          withCredentials: true,
        }
      );

      validateLoginResponse(data);

      const { user, token } = data;

      if (user?.role !== "Counsellor") {
        toast.error("This account is not a counsellor account.");
        return;
      }

      login(user, token);

      toast.success("Welcome back!");

      navigate("/counsellor", {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex items-center justify-center px-4 py-10">
      {/* Background */}

      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-cyan-200/40 blur-[110px]" />

      <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-sky-200/40 blur-[110px]" />

      <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px]" />

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Brand */}

        <div className="text-center mb-7">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white flex items-center justify-center shadow-xl shadow-cyan-500/20">
            <Users size={30} />
          </div>

          <h1 className="mt-5 text-3xl font-extrabold text-slate-900">
            Counsellor Login
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Access your student counselling dashboard
          </p>
        </div>

        {/* Card */}

        <div className="bg-white border border-slate-200 rounded-[28px] shadow-[0_25px_70px_rgba(15,23,42,0.10)] p-6 sm:p-8">
          {/* Portal badge */}

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-cyan-50 border border-cyan-100 mb-7">
            <div className="h-9 w-9 rounded-xl bg-cyan-500 text-white flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">
                Counsellor Portal
              </p>

              <p className="text-xs text-slate-500">
                Secure staff access
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="
                    w-full
                    h-13
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    pl-11
                    pr-4
                    text-sm
                    text-slate-800
                    outline-none
                    transition
                    focus:border-cyan-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-cyan-500/10
                  "
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="
                    w-full
                    h-13
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    pl-11
                    pr-12
                    text-sm
                    text-slate-800
                    outline-none
                    transition
                    focus:border-cyan-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-cyan-500/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
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
            </div>

            {/* Login */}

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="
                w-full
                h-13
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-sky-600
                text-white
                font-bold
                shadow-lg
                shadow-cyan-500/20
                hover:shadow-xl
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          NextGen Education CRM • Counsellor Portal
        </p>
      </motion.div>
    </div>
  );
}