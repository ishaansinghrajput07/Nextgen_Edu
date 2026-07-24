import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Universities",
    path: "/universities",
  },
  {
    name: "Courses",
    path: "/courses",
  },
  {
    name: "Success Stories",
    path: "/success-stories",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const services = [
  {
    name: "Free Counselling",
    path: "/free-counselling",
  },
  {
    name: "Admission Process",
    path: "/admission-process",
  },
  {
    name: "How To Apply",
    path: "/how-to-apply",
  },
  {
    name: "Eligibility",
    path: "/eligibility-criteria",
  },
];

export default function DesktopMenu() {
  const [open, setOpen] = useState(false);

const navClass = ({ isActive }) =>
  isActive
    ? "relative font-semibold transition-all duration-300 pb-1 text-cyan-600"
    : "relative font-semibold transition-all duration-300 pb-1 text-black hover:text-cyan-600";

  return (
   <nav
  className="
hidden
lg:flex
items-center
gap-10
relative
z-[200]
"
>
    
      {/* Normal Menu */}

      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={navClass}
        >
          {({ isActive }) => (
            <>
              {item.name}

              <motion.div
                layoutId="navbar"
                className={`
absolute
left-0
bottom-1
h-[3px]
rounded-full
bg-cyan-500
${
  isActive
    ? "w-full"
    : "w-0"
}
`}
              />
            </>
          )}
        </NavLink>
      ))}

      {/* Services Dropdown */}

      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          className="
flex
items-center
gap-1
font-semibold
text-black
hover:text-cyan-600
transition
"
        >
          Services

          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>

          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 15,
              }}
              transition={{
                duration: .25,
              }}
              className="
absolute
top-12
left-1/2
-translate-x-1/2
w-72
rounded-3xl
bg-white
shadow-[0_20px_60px_rgba(15,23,42,.12)]
border
border-slate-100
overflow-hidden
"
            >
              {services.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className="
block
px-6
py-4
text-slate-700
hover:bg-cyan-50
hover:text-cyan-600
transition
font-medium
"
                >
                  {item.name}
                </NavLink>
              ))}
            </motion.div>
          )}

        </AnimatePresence>

      </div>

    </nav>
  );
}