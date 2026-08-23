import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  Crown,
  Shield,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { API_V1_URL, validateLoginResponse } from "../config/api";

const API_URL = `${API_V1_URL}/auth/login`;

export default function SuperAdminLogin() {
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

      if (user?.role !== "SuperAdmin") {
        toast.error(
          "This account does not have Super Admin access."
        );
        return;
      }

      login(user, token);

      toast.success("Super Admin login successful!");

      navigate("/superadmin", {
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
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center px-4 py-10">
      {/* Background */}

      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-violet-600/20 blur-[140px]" />

      <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-fuchsia-600/15 blur-[140px]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px]" />

      <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#a78bfa_1px,transparent_1px)] [background-size:24px_24px]" />

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}

        <div className="text-center mb-7">
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
            className="
              mx-auto
              h-16
              w-16
              rounded-2xl
              bg-gradient-to-br
              from-violet-500
              to-fuchsia-600
              text-white
              flex
              items-center
              justify-center
              shadow-xl
              shadow-violet-500/30
            "
          >
            <Crown size={30} />
          </motion.div>

          <h1 className="mt-5 text-3xl font-extrabold text-white">
            Super Admin
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Complete system administration access
          </p>
        </div>

        {/* Card */}

        <div
          className="
            bg-white/[0.07]
            backdrop-blur-2xl
            border
            border-white/10
            rounded-[28px]
            shadow-[0_30px_100px_rgba(0,0,0,0.35)]
            p-6
            sm:p-8
          "
        >
          {/* Security */}

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-violet-500/10 border border-violet-400/10 mb-7">
            <div className="h-9 w-9 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center">
              <Shield size={18} />
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                Restricted Access
              </p>

              <p className="text-xs text-slate-400">
                Authorized administrators only
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter super admin email"
                  autoComplete="email"
                  className="
                    w-full
                    h-13
                    rounded-xl
                    border
                    border-white/10
                    bg-black/20
                    pl-11
                    pr-4
                    text-sm
                    text-white
                    placeholder:text-slate-600
                    outline-none
                    transition
                    focus:border-violet-400/60
                    focus:bg-black/30
                    focus:ring-4
                    focus:ring-violet-500/10
                  "
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
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
                    border-white/10
                    bg-black/20
                    pl-11
                    pr-12
                    text-sm
                    text-white
                    placeholder:text-slate-600
                    outline-none
                    transition
                    focus:border-violet-400/60
                    focus:bg-black/30
                    focus:ring-4
                    focus:ring-violet-500/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-300"
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
                from-violet-500
                to-fuchsia-600
                text-white
                font-bold
                shadow-lg
                shadow-violet-500/20
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
                  <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Enter Control Panel
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          NextGen Education CRM • Restricted System
        </p>
      </motion.div>
    </div>
  );
}