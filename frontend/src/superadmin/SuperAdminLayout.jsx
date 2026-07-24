import {
  LayoutDashboard,
  UserPlus,
  Users,
  ClipboardList,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import axios from "axios";

export default function SuperAdminLayout() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        }
      );
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    `
    flex
    items-center
    gap-3
    p-3
    rounded-xl
    transition-all
    duration-200
    ${
      isActive
        ? "bg-cyan-500 text-white shadow-lg"
        : "hover:bg-white/10 text-gray-300"
    }
  `;

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="
          fixed
          inset-0
          bg-black/60
          z-40
          lg:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
        fixed
        lg:static
        top-0
        left-0
        h-screen
        w-72
        bg-gradient-to-b
        from-slate-900
        to-slate-950
        border-r
        border-white/10
        p-6
        z-50
        transform
        transition-transform
        duration-300

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
        `}
      >
        {/* Mobile Close */}

        <div
          className="
          flex
          justify-between
          items-center
          mb-8
          "
        >
          <h1
            className="
            text-2xl
            md:text-3xl
            font-bold
            "
          >
            Super Admin
          </h1>

          <button
            className="
            lg:hidden
            "
            onClick={() => setSidebarOpen(false)}
          >
            <X size={28} />
          </button>
        </div>

        <nav className="space-y-2">
          <NavLink
            to="/superadmin"
            end
            className={menuClass}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/superadmin/admins"
            className={menuClass}
          >
            <UserPlus size={20} />
            Manage Admins
          </NavLink>

          <NavLink
            to="/superadmin/counsellors"
            className={menuClass}
          >
            <Users size={20} />
            Counsellors
          </NavLink>

          <NavLink
            to="/superadmin/admin-performance"
            className={menuClass}
          >
            <BarChart3 size={20} />
            Admin Performance
          </NavLink>

          <NavLink
            to="/superadmin/activity-logs"
            className={menuClass}
          >
            <ClipboardList size={20} />
            Activity Logs
          </NavLink>
        </nav>

        <button
          onClick={logout}
          className="
          mt-10
          w-full
          bg-red-500
          hover:bg-red-600
          px-4
          py-3
          rounded-xl
          flex
          items-center
          justify-center
          gap-2
          transition
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Section */}

      <div
        className="
        flex-1
        flex
        flex-col
        min-w-0
        "
      >
        {/* Mobile Header */}

        <header
          className="
          lg:hidden
          flex
          items-center
          justify-between
          p-4
          border-b
          border-white/10
          bg-slate-900
          sticky
          top-0
          z-30
          "
        >
          <button
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={28} />
          </button>

          <h2
            className="
            text-xl
            font-bold
            "
          >
            Super Admin
          </h2>

          <div />
        </header>

        {/* Page Content */}

        <main
          className="
          flex-1
          overflow-y-auto
          p-4
          sm:p-6
          lg:p-8
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}