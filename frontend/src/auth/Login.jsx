
import { motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        {
          email: email.trim(),
          password,
        },
        {
          withCredentials: true,
        }
      );

      const { token, user } = res.data;

      login(user, token);

      if (user.role === "SuperAdmin") {
        navigate("/superadmin", { replace: true });
      } else if (user.role === "Admin") {
        navigate("/admin", { replace: true });
      } else if (user.role === "Counsellor") {
        navigate("/counsellor", { replace: true });
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-cyan-200/40 blur-[130px]" />

      <div className="absolute -bottom-48 -right-40 w-[560px] h-[560px] rounded-full bg-sky-200/40 blur-[140px]" />

      <div
        className="
          absolute
          inset-0
          opacity-[0.035]
          [background-image:radial-gradient(#0284c7_1px,transparent_1px)]
          [background-size:24px_24px]
        "
      />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-6xl">

          <div
            className="
              bg-white/80
              backdrop-blur-2xl
              border
              border-white
              rounded-[32px]
              shadow-[0_30px_100px_rgba(15,23,42,0.10)]
              overflow-hidden
            "
          >
            <div className="grid lg:grid-cols-2">

              {/* =================================================
                  LEFT BRANDING
              ================================================= */}

              <div
                className="
                  hidden
                  lg:flex
                  relative
                  overflow-hidden
                  bg-gradient-to-br
                  from-cyan-600
                  via-sky-600
                  to-blue-700
                  p-12
                  xl:p-16
                  text-white
                "
              >
                {/* Decorative circles */}

                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />

                <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white/10" />

                <div className="absolute top-1/2 right-10 w-20 h-20 rounded-full bg-white/5 blur-xl" />

                <div className="relative z-10 flex flex-col justify-between w-full">

                  {/* Brand */}

                  <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="
                        h-12
                        w-12
                        rounded-2xl
                        bg-white/15
                        backdrop-blur-md
                        border
                        border-white/20
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <GraduationCap size={27} />
                    </div>

                    <div>
                      <p className="text-xl font-bold">
                        NextGen Education
                      </p>

                      <p className="text-xs text-cyan-100">
                        Education CRM
                      </p>
                    </div>
                  </motion.div>

                  {/* Main Content */}

                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15,
                    }}
                    className="my-auto py-16"
                  >
                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-1.5
                        rounded-full
                        bg-white/10
                        border
                        border-white/15
                        text-xs
                        font-medium
                        text-cyan-50
                        mb-6
                      "
                    >
                      <Sparkles size={14} />
                      Smart Education Management
                    </div>

                    <h1
                      className="
                        text-4xl
                        xl:text-5xl
                        font-extrabold
                        leading-tight
                        tracking-tight
                      "
                    >
                      Manage Students.
                      <br />
                      Manage Success.
                    </h1>

                    <p
                      className="
                        mt-6
                        max-w-md
                        text-cyan-50
                        leading-7
                        text-sm
                        xl:text-base
                      "
                    >
                      A powerful platform to manage admissions,
                      counsellors, students, leads and university
                      relationships from one intelligent workspace.
                    </p>

                    {/* Features */}

                    <div className="mt-9 space-y-4">

                      <Feature
                        icon={ShieldCheck}
                        title="Secure CRM Access"
                        description="Role-based access for your team"
                      />

                      <Feature
                        icon={Users}
                        title="Centralized Management"
                        description="Leads, students and admissions in one place"
                      />

                      <Feature
                        icon={GraduationCap}
                        title="Admission Management"
                        description="Track every student's journey"
                      />

                    </div>
                  </motion.div>

                  {/* Footer */}

                  <p className="text-xs text-cyan-100/80">
                    © {new Date().getFullYear()} NextGen Education CRM
                  </p>
                </div>
              </div>

              {/* =================================================
                  RIGHT LOGIN
              ================================================= */}

              <div className="p-6 sm:p-10 lg:p-12 xl:p-16 flex items-center">
                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full max-w-md mx-auto"
                >

                  {/* Mobile Logo */}

                  <div className="lg:hidden flex items-center gap-3 mb-10">
                    <div
                      className="
                        h-12
                        w-12
                        rounded-2xl
                        bg-gradient-to-br
                        from-cyan-500
                        to-blue-600
                        text-white
                        flex
                        items-center
                        justify-center
                        shadow-lg
                        shadow-cyan-500/20
                      "
                    >
                      <GraduationCap size={27} />
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-800">
                        NextGen Education
                      </h2>

                      <p className="text-xs text-slate-500">
                        Education CRM
                      </p>
                    </div>
                  </div>

                  {/* Heading */}

                  <div className="mb-8">
                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-1.5
                        rounded-full
                        bg-cyan-50
                        border
                        border-cyan-100
                        text-cyan-700
                        text-xs
                        font-semibold
                        mb-4
                      "
                    >
                      <Lock size={13} />
                      Secure Login
                    </div>

                    <h2
                      className="
                        text-3xl
                        sm:text-4xl
                        font-extrabold
                        tracking-tight
                        text-slate-800
                      "
                    >
                      Welcome back
                    </h2>

                    <p className="text-sm text-slate-500 mt-2">
                      Sign in to continue to your CRM dashboard.
                    </p>
                  </div>

                  {/* Form */}

                  <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                  >

                    {/* Email */}

                    <div>
                      <label
                        className="
                          block
                          text-sm
                          font-semibold
                          text-slate-700
                          mb-2
                        "
                      >
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail
                          size={19}
                          className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                          "
                        />

                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          className="
                            w-full
                            h-14
                            pl-12
                            pr-4
                            rounded-2xl
                            bg-slate-50
                            border
                            border-slate-200
                            text-slate-800
                            placeholder:text-slate-400
                            outline-none
                            transition-all
                            duration-200
                            focus:bg-white
                            focus:border-cyan-400
                            focus:ring-4
                            focus:ring-cyan-500/10
                          "
                          required
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    {/* Password */}

                    <div>
                      <label
                        className="
                          block
                          text-sm
                          font-semibold
                          text-slate-700
                          mb-2
                        "
                      >
                        Password
                      </label>

                      <div className="relative">
                        <Lock
                          size={19}
                          className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                          "
                        />

                        <input
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) =>
                            setPassword(e.target.value)
                          }
                          className="
                            w-full
                            h-14
                            pl-12
                            pr-4
                            rounded-2xl
                            bg-slate-50
                            border
                            border-slate-200
                            text-slate-800
                            placeholder:text-slate-400
                            outline-none
                            transition-all
                            duration-200
                            focus:bg-white
                            focus:border-cyan-400
                            focus:ring-4
                            focus:ring-cyan-500/10
                          "
                          required
                          autoComplete="current-password"
                        />
                      </div>
                    </div>

                    {/* Login Button */}

                    <motion.button
                      whileHover={{
                        scale: loading ? 1 : 1.01,
                      }}
                      whileTap={{
                        scale: loading ? 1 : 0.98,
                      }}
                      disabled={loading}
                      type="submit"
                      className="
                        group
                        w-full
                        h-14
                        rounded-2xl
                        bg-gradient-to-r
                        from-cyan-500
                        to-blue-600
                        text-white
                        font-bold
                        shadow-[0_12px_30px_rgba(6,182,212,0.25)]
                        hover:shadow-[0_16px_35px_rgba(6,182,212,0.32)]
                        transition-all
                        duration-300
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
                          <span
                            className="
                              h-5
                              w-5
                              rounded-full
                              border-2
                              border-white/30
                              border-t-white
                              animate-spin
                            "
                          />

                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In

                          <ArrowRight
                            size={19}
                            className="
                              transition-transform
                              duration-300
                              group-hover:translate-x-1
                            "
                          />
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Security Note */}

                  <div
                    className="
                      mt-8
                      flex
                      items-start
                      gap-3
                      p-4
                      rounded-2xl
                      bg-slate-50
                      border
                      border-slate-100
                    "
                  >
                    <div
                      className="
                        h-9
                        w-9
                        rounded-xl
                        bg-emerald-50
                        text-emerald-600
                        flex
                        items-center
                        justify-center
                        shrink-0
                      "
                    >
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Secure access
                      </p>

                      <p className="text-xs text-slate-500 mt-0.5 leading-5">
                        Your account is protected with secure
                        authentication and role-based access.
                      </p>
                    </div>
                  </div>

                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom text */}

          <p className="text-center text-xs text-slate-400 mt-6">
            Authorized users only • NextGen Education CRM
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   FEATURE COMPONENT
============================================================ */

function Feature({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="
          h-10
          w-10
          rounded-xl
          bg-white/10
          border
          border-white/10
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        <Icon size={18} />
      </div>

      <div>
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="text-xs text-cyan-100/75 mt-0.5">
          {description}
        </p>
      </div>
    </div>
  );
}
