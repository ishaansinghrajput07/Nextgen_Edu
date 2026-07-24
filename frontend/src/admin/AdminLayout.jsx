import {
  LayoutDashboard,
  Users,
  UserCheck,
  GraduationCap,
  Settings,
  LogOut,
  UserPlus,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      navigate("/login");

      return;
    }

    if (user.role !== "Admin" && user.role !== "SuperAdmin") {
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    isActive
      ? `
flex
items-center
gap-3
p-3
rounded-2xl

bg-gradient-to-r
from-cyan-500
to-sky-500

text-white

shadow-lg
shadow-cyan-200

font-semibold

transition-all
duration-300
`
      : `
flex
items-center
gap-3

p-3

rounded-2xl

text-slate-600

hover:bg-cyan-50

hover:text-cyan-600

transition-all
duration-300
`;

  return (
    <div
      className="
relative
min-h-screen

flex

overflow-hidden

bg-gradient-to-br
from-sky-50
via-white
to-cyan-50

text-slate-800
"
    >
      {/* Background Glow */}

      <div
        className="
absolute
-top-44
-left-44

w-[520px]
h-[520px]

rounded-full

bg-cyan-200/30

blur-[120px]

pointer-events-none
"
      />

      <div
        className="
absolute

top-32
right-0

w-[420px]
h-[420px]

rounded-full

bg-blue-200/20

blur-[120px]

pointer-events-none
"
      />

      <div
        className="
absolute

bottom-0

left-1/2

-translate-x-1/2

w-[700px]

h-[320px]

rounded-full

bg-sky-100/40

blur-[120px]

pointer-events-none
"
      />

      {/* Grid Pattern */}

      <div
        className="
absolute

inset-0

opacity-[0.04]

[background-image:radial-gradient(#0284c7_1px,transparent_1px)]

[background-size:24px_24px]

pointer-events-none
"
      />

      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="
fixed
inset-0

bg-black/30

backdrop-blur-sm

z-40

lg:hidden
"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
fixed

lg:static

top-0
left-0

min-h-screen

w-72


bg-white/75
backdrop-blur-2xl

border
border-white/80

shadow-[0_30px_80px_rgba(14,165,233,.18)]





p-6


flex
flex-col


z-50


transition-transform
duration-300


overflow-y-auto


${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}

`}
      >
        {/* Mobile Header */}

        <div
          className="
flex
items-center
justify-between

mb-8

lg:hidden
"
        >
          <div>
            <h1
              className="
text-2xl
font-extrabold

bg-gradient-to-r
from-cyan-500
to-sky-600

bg-clip-text
text-transparent
"
            >
              NextGen
            </h1>

            <p
              className="
text-xs
text-slate-500
"
            >
              Admin Panel
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="
p-2

rounded-xl

hover:bg-cyan-50

text-slate-600
"
          >
            <X size={22} />
          </button>
        </div>

        {/* Desktop Logo */}

        <div
          className="
hidden
lg:block

mb-10
"
        >
          <h1
            className="
text-3xl

font-extrabold

bg-gradient-to-r
from-cyan-500
to-sky-600

bg-clip-text

text-transparent
"
          >
            NextGen
          </h1>

          <p
            className="
text-sm

text-slate-500

mt-1
"
          >
            Admin Dashboard
          </p>
        </div>
        {/* Navigation Menu */}

        <nav
          className="
flex
flex-col
gap-2
"
        >
          <NavLink
            to="/admin"
            end
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard size={18} />

            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/leads"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <Users size={18} />

            <span>Leads</span>
          </NavLink>

          <NavLink
            to="/admin/counsellors"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <UserCheck size={18} />

            <span>Counsellors</span>
          </NavLink>

          <NavLink
            to="/admin/universities"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <GraduationCap size={18} />

            <span>Universities</span>
          </NavLink>

          <NavLink
            to="/admin/reviews"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <MessageSquare size={18} />

            <span>Reviews</span>
          </NavLink>

          <NavLink
            to="/admin/students"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <UserPlus size={18} />

            <span>Students</span>
          </NavLink>

          <NavLink
  to="/admin/admissions"
  className={menuClass}
  onClick={() => setSidebarOpen(false)}
>
  <GraduationCap size={18} />

  <span>Admissions</span>
</NavLink>

          <NavLink
            to="/admin/settings"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >
            <Settings size={18} />

            <span>Settings</span>
          </NavLink>
        </nav>

        {/* Logout */}

        <div
          className="
mt-auto
pt-6
"
        >
          <button
            onClick={logout}
            className="
w-full

flex
items-center
justify-center

gap-2


p-3


rounded-2xl


bg-gradient-to-r

from-rose-500

to-red-500


text-white


font-medium


shadow-lg

shadow-red-200


hover:scale-[1.02]


transition-all
duration-300
"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}

      <div
        className="
flex-1

flex

flex-col

min-w-0
"
      >
        {/* Header */}

        <header
          className="
h-16
md:h-20


flex

items-center

justify-between


px-4
md:px-6
lg:px-8


bg-white/60

backdrop-blur-2xl

border
border-white/80

shadow-[0_15px_40px_rgba(14,165,233,.10)]

mx-4
mt-4

rounded-3xl











sticky

top-0


z-30

"
        >
          <div
            className="
flex

items-center

gap-4
"
          >
            {/* Mobile Menu Button */}

            <button
              onClick={() => setSidebarOpen(true)}
              className="
lg:hidden

p-2

rounded-xl

hover:bg-cyan-50

text-slate-700
"
            >
              <Menu size={24} />
            </button>

            <h2
              className="
text-lg

md:text-xl

lg:text-2xl

font-bold

text-slate-800
"
            >
              Admin Dashboard
            </h2>
          </div>

          {/* User Info */}

          <div
            className="
bg-gradient-to-r

from-cyan-50

to-sky-50


border

border-cyan-100


px-3

py-2


md:px-4


rounded-2xl


text-sm

md:text-base


text-cyan-700


font-medium


shadow-sm


whitespace-nowrap

"
          >
            {JSON.parse(localStorage.getItem("user"))?.name}

            <span>(</span>

            {JSON.parse(localStorage.getItem("user"))?.role}

            <span>)</span>
          </div>
        </header>
        {/* Page Content */}

        <main
          className="
relative
z-10

flex-1

overflow-y-auto

p-4
md:p-6
lg:p-8
"
        >
          <div
            className="
bg-white/40
backdrop-blur-xl
rounded-[32px]
p-4
md:p-6
border
border-white/70
shadow-[0_20px_60px_rgba(14,165,233,.08)]
"
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
