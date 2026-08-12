import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Users,
  ShieldCheck,
  Crown,
} from "lucide-react";
import { Link } from "react-router-dom";

const LoginDropdown = () => {
  const [open, setOpen] = useState(false);

  const loginOptions = [
    {
      title: "Counsellor Login",
      path: "/counsellor-login",
      icon: Users,
      desc: "Manage student enquiries & counselling",
      color: "from-sky-500 to-cyan-500",
    },
    {
      title: "Admin Login",
      path: "/admin-login",
      icon: ShieldCheck,
      desc: "Admissions & website management",
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Super Admin",
      path: "/super-admin-login",
      icon: Crown,
      desc: "Complete system access & control",
      color: "from-violet-500 to-fuchsia-500",
    },
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* LOGIN BUTTON */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-2.5
          text-sm
          font-bold
          text-slate-700
          shadow-sm
          transition-all
          duration-300
          hover:border-sky-300
          hover:bg-sky-50
          hover:text-sky-600
        "
      >
        <span>Login</span>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      {/* DROPDOWN */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.97,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              absolute
              right-0
              top-[calc(100%+8px)]
              z-[100]
              w-[340px]
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-[0_25px_70px_rgba(15,23,42,0.16)]
            "
          >
            {/* HEADER */}

            <div
              className="
                relative
                overflow-hidden
                bg-gradient-to-r
                from-sky-600
                via-cyan-500
                to-sky-500
                px-5
                py-5
                text-white
              "
            >
              {/* Decorative blur */}

              <div
                className="
                  absolute
                  -right-8
                  -top-8
                  h-24
                  w-24
                  rounded-full
                  bg-white/20
                  blur-2xl
                "
              />

              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                  NextGen Education CRM
                </p>

                <h3 className="mt-1 text-lg font-black">
                  Staff Login Portal
                </h3>

                <p className="mt-1 text-xs text-white/85">
                  Choose your account to continue
                </p>
              </div>
            </div>

            {/* OPTIONS */}

            <div className="p-3">
              {loginOptions.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="
                      group
                      flex
                      items-center
                      gap-4
                      rounded-xl
                      p-3
                      transition-all
                      duration-300
                      hover:bg-slate-50
                    "
                  >
                    {/* ICON */}

                    <div
                      className={`
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        ${item.color}
                        text-white
                        shadow-lg
                        transition-transform
                        duration-300
                        group-hover:scale-105
                      `}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* TEXT */}

                    <div className="min-w-0 flex-1">
                      <h4
                        className="
                          text-sm
                          font-bold
                          text-slate-800
                          transition-colors
                          group-hover:text-sky-600
                        "
                      >
                        {item.title}
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {item.desc}
                      </p>
                    </div>

                    {/* ARROW */}

                    <div
                      className="
                        text-slate-300
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:text-sky-500
                      "
                    >
                      →
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* FOOTER */}

            <div className="border-t border-slate-100 bg-slate-50 px-5 py-3">
              <p className="text-center text-[11px] text-slate-400">
                Secure access for authorized staff only
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginDropdown;