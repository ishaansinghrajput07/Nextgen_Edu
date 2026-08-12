
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Link } from "react-router-dom";

import nextLogo from "../../assets/logo/NEXTGEN LOGO.png";

import { navLinks } from "./navData";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import LoginDropdown from "./LoginDropdown";
import BookCounsellingButton from "./BookCounsellingButton";

import TopBar from "./TopBar";
import AnnouncementBar from "./AnnouncementBar";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* ================= TOP BAR ================= */}

      <TopBar />

      {/* ================= ANNOUNCEMENT BAR ================= */}

      <AnnouncementBar />

      {/* ================= MAIN NAVBAR ================= */}

      <motion.header
        initial={{
          y: -40,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className={`
          sticky
          top-0
          z-50
          w-full
          transition-all
          duration-300

          ${
            scrolled
              ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.08)] border-b border-slate-200"
              : "bg-white border-b border-slate-100"
          }
        `}
      >
        <div
          className="
            mx-auto
            max-w-[1400px]
            px-3
            sm:px-5
            lg:px-6
          "
        >
          <div
            className="
              flex
              h-16
              items-center
              justify-between
              gap-4
            "
          >
            {/* ================= LEFT BRAND ================= */}

            <Link
              to="/"
              className="
                flex
                shrink-0
                items-center
                gap-2.5
                group
              "
            >
              <motion.img
                src={nextLogo}
                alt="NextGenEdu"
                whileHover={{
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="
                  h-10
                  w-auto
                  object-contain
                "
              />

              <div className="flex flex-col">
                <h2
                  className="
                    text-lg
                    font-extrabold
                    leading-none
                    tracking-tight
                    text-slate-900
                    transition-colors
                    group-hover:text-sky-600
                    xl:text-xl
                  "
                >
                  NextGen
                  <span className="text-sky-600">Edu</span>
                </h2>

                <p
                  className="
                    mt-1
                    hidden
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-500
                    xl:block
                  "
                >
                  Career & Admission Experts
                </p>
              </div>
            </Link>

            {/* ================= CENTER MENU ================= */}

            <div
              className="
                hidden
                flex-1
                justify-center
                xl:flex
              "
            >
              <DesktopMenu navLinks={navLinks} />
            </div>

            {/* ================= RIGHT ACTIONS ================= */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
              "
            >
              {/* Login */}

              <div className="hidden lg:block">
                <LoginDropdown />
              </div>

              {/* Counselling */}

              <div className="hidden md:block">
                <BookCounsellingButton />
              </div>

              {/* Mobile Menu Button */}

              <motion.button
                whileTap={{
                  scale: 0.94,
                }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={
                  mobileOpen
                    ? "Close menu"
                    : "Open menu"
                }
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-700
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-sky-200
                  hover:bg-sky-50
                  hover:text-sky-600
                  xl:hidden
                "
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}

        {mobileOpen && (
          <MobileMenu
            open={mobileOpen}
            setOpen={setMobileOpen}
            navLinks={navLinks}
            expandedMenu={expandedMenu}
            setExpandedMenu={setExpandedMenu}
          />
        )}
      </motion.header>
    </>
  );
};

export default Navbar;

