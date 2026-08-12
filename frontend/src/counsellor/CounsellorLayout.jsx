import axios from "axios";
import {
  LayoutDashboard,
  Users,
  PhoneCall,
  GraduationCap,
  IndianRupee,
  UserCircle,
  LogOut,
  ChevronRight,
  Menu,
  X,
  CircleUserRound,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
export default function CounsellorLayout() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const user =
    JSON.parse(localStorage.getItem("counsellor")) ||
    JSON.parse(localStorage.getItem("user")) ||
    {};

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/v1/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("counsellor");

      toast.success("Logout Successfully");

      navigate("/login");
    } catch (error) {
      console.log(error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("counsellor");

      navigate("/login");
    }
  };

  const navigation = [
    {
      name: "Dashboard",
      path: "/counsellor",
      icon: LayoutDashboard,
    },
    {
      name: "My Leads",
      path: "/counsellor/leads",
      icon: Users,
    },
    {
      name: "Follow Ups",
      path: "/counsellor/follow-ups",
      icon: PhoneCall,
    },
    {
      name: "Students",
      path: "/counsellor/students",
      icon: GraduationCap,
    },
    {
      name: "Commission",
      path: "/counsellor/commission",
      icon: IndianRupee,
    },
    {
      name: "Profile",
      path: "/counsellor/profile",
      icon: UserCircle,
    },
  ];

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* =====================================================
          MOBILE HEADER
      ===================================================== */}

      <header
        className="
          lg:hidden
          fixed
          top-0
          left-0
          right-0
          z-40
          h-16
          bg-white
          border-b
          border-slate-200
          flex
          items-center
          justify-between
          px-4
        "
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="
              h-10
              w-10
              rounded-xl
              bg-slate-100
              text-slate-700
              flex
              items-center
              justify-center
              hover:bg-slate-200
              transition
            "
          >
            <Menu size={21} />
          </button>

          <div>
            <p className="text-sm font-bold text-slate-900">Counsellor Panel</p>

            <p className="text-[11px] text-slate-400">Education CRM</p>
          </div>
        </div>

        <div
          className="
            h-9
            w-9
            rounded-xl
            bg-cyan-50
            text-cyan-600
            flex
            items-center
            justify-center
          "
        >
          <CircleUserRound size={20} />
        </div>
      </header>

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {mobileOpen && (
        <div
          onClick={closeMobileSidebar}
          className="
            fixed
            inset-0
            bg-slate-950/40
            backdrop-blur-sm
            z-40
            lg:hidden
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          top-0
          bottom-0
          left-0
          z-50
          w-[280px]
          bg-white
          border-r
          border-slate-200
          flex
          flex-col
          transition-transform
          duration-300
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ===================================================
            LOGO
        =================================================== */}

        <div
          className="
            h-20
            px-6
            border-b
            border-slate-100
            flex
            items-center
            justify-between
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                h-11
                w-11
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
              <GraduationCap size={23} />
            </div>

            <div>
              <Link
                to="/counsellor/commission"
                className="
    flex items-center gap-3
    px-4 py-3
    rounded-xl
    text-slate-600
    hover:bg-cyan-50
    hover:text-cyan-600
    transition
  "
              >
                Commission
              </Link>

              <p className="text-[11px] text-slate-400">Education CRM</p>
            </div>
          </div>

          <button
            onClick={closeMobileSidebar}
            className="
              lg:hidden
              h-9
              w-9
              rounded-xl
              bg-slate-100
              text-slate-600
              flex
              items-center
              justify-center
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* ===================================================
            USER PROFILE
        =================================================== */}

        <div className="px-4 pt-5">
          <div
            className="
              rounded-2xl
              bg-gradient-to-r
              from-slate-900
              to-slate-800
              p-4
              text-white
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  h-11
                  w-11
                  rounded-xl
                  bg-white/10
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                "
              >
                <CircleUserRound size={23} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">
                  {user?.name || "Counsellor"}
                </p>

                <p className="text-[11px] text-slate-400 truncate">
                  {user?.designation || "Admissions Counsellor"}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-400
                "
              />

              <span className="text-[11px] text-slate-300">Active</span>
            </div>
          </div>
        </div>

        {/* ===================================================
            NAVIGATION
        =================================================== */}

        <div className="px-4 pt-6">
          <p
            className="
              px-3
              mb-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-slate-400
            "
          >
            Main Menu
          </p>
        </div>

        <nav className="flex-1 px-4 overflow-y-auto">
          <div className="space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/counsellor"}
                  onClick={closeMobileSidebar}
                  className={({ isActive }) =>
                    `
                      group
                      flex
                      items-center
                      gap-3
                      px-3.5
                      py-3
                      rounded-xl
                      text-sm
                      font-medium
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? `
                            bg-cyan-50
                            text-cyan-700
                            shadow-sm
                          `
                          : `
                            text-slate-600
                            hover:bg-slate-50
                            hover:text-slate-900
                          `
                      }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`
                          h-9
                          w-9
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          transition
                          ${
                            isActive
                              ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                              : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                          }
                        `}
                      >
                        <Icon size={18} />
                      </div>

                      <span className="flex-1">{item.name}</span>

                      <ChevronRight
                        size={16}
                        className={`
                          transition
                          ${
                            isActive
                              ? "opacity-100 text-cyan-500 translate-x-0"
                              : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                          }
                        `}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* ===================================================
            LOGOUT
        =================================================== */}

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={logout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-3.5
              py-3
              rounded-xl
              text-sm
              font-medium
              text-red-600
              hover:bg-red-50
              transition
            "
          >
            <div
              className="
                h-9
                w-9
                rounded-xl
                bg-red-50
                flex
                items-center
                justify-center
              "
            >
              <LogOut size={18} />
            </div>

            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main
        className="
          min-h-screen
          lg:ml-[280px]
          pt-16
          lg:pt-0
        "
      >
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
