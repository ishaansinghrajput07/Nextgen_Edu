import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronDown,
  ChevronRight,
  Search,
  Phone,
  GraduationCap,
  Mail,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import nextLogo from "../../assets/logo/NEXTGEN LOGO.png";

import BookCounsellingButton from "./BookCounsellingButton";

const MobileMenu = ({
  open,
  setOpen,
  navLinks = [],
  expandedMenu,
  setExpandedMenu,
}) => {
  const location = useLocation();

  // ==========================================
  // LOCK BODY SCROLL
  // ==========================================

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ==========================================
  // CLOSE EXPANDED MENU ON ROUTE CHANGE
  // ==========================================

  useEffect(() => {
    setExpandedMenu(null);
  }, [location.pathname, setExpandedMenu]);

  // ==========================================
  // TOGGLE MENU
  // ==========================================

  const toggleMenu = (title) => {
    setExpandedMenu(expandedMenu === title ? null : title);
  };

  // ==========================================
  // CLOSE MENU
  // ==========================================

  const closeMenu = () => {
    setOpen(false);
    setExpandedMenu(null);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ==========================================
              OVERLAY
          ========================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="
              fixed
              inset-0
              z-40
              bg-slate-950/50
              backdrop-blur-md
              xl:hidden
            "
          />

          {/* ==========================================
              DRAWER
          ========================================== */}

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 30,
            }}
            className="
              fixed
              right-0
              top-0
              z-50
              h-screen
              w-full
              max-w-md
              bg-white
              shadow-2xl
              flex
              flex-col
              overflow-hidden
              xl:hidden
            "
          >
            {/* ==========================================
                HEADER
            ========================================== */}

            <div
              className="
                relative
                flex
                items-center
                justify-between
                px-5
                py-4
                border-b
                border-slate-100
                bg-white
              "
            >
              <Link
                to="/"
                onClick={closeMenu}
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    h-11
                    w-11
                    rounded-xl
                    bg-sky-50
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                  "
                >
                  <img
                    src={nextLogo}
                    alt="NextGenEdu"
                    className="h-10 w-auto object-contain"
                  />
                </div>

                <div>
                  <h2
                    className="
                      text-lg
                      font-black
                      leading-none
                      text-slate-900
                    "
                  >
                    NextGenEdu
                  </h2>

                  <p
                    className="
                      mt-1
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      text-sky-600
                      font-bold
                    "
                  >
                    Admission Experts
                  </p>
                </div>
              </Link>

              <button
                onClick={closeMenu}
                aria-label="Close menu"
                className="
                  h-11
                  w-11
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-700
                  flex
                  items-center
                  justify-center
                  transition-all
                  hover:bg-slate-50
                  hover:border-sky-200
                  hover:text-sky-600
                "
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* ==========================================
                SEARCH
            ========================================== */}

            <div className="px-5 pt-5">
              <div
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3.5
                  transition-all
                  focus-within:border-sky-300
                  focus-within:bg-white
                  focus-within:shadow-lg
                  focus-within:shadow-sky-100
                "
              >
                <Search
                  className="
                    h-5
                    w-5
                    shrink-0
                    text-slate-400
                    group-focus-within:text-sky-500
                  "
                />

                <input
                  type="text"
                  placeholder="Search Colleges, Courses..."
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-sm
                    text-slate-800
                    placeholder:text-slate-400
                  "
                />
              </div>
            </div>

            {/* ==========================================
                MENU CONTENT
            ========================================== */}

            <div
              className="
                flex-1
                overflow-y-auto
                px-5
                py-6
                scrollbar-thin
                scrollbar-thumb-slate-200
              "
            >
              <div className="space-y-3">
                {navLinks.map((item) => {
                  if (!item.megaMenu) {
                    return (
                      <Link
                        key={item.title}
                        to={item.path}
                        onClick={closeMenu}
                        className="
                          group
                          flex
                          items-center
                          justify-between
                          rounded-2xl
                          border
                          border-slate-100
                          bg-slate-50
                          px-5
                          py-4
                          font-semibold
                          text-slate-700
                          transition-all
                          hover:border-sky-100
                          hover:bg-sky-50
                          hover:text-sky-700
                        "
                      >
                        <span>{item.title}</span>

                        <ChevronRight
                          className="
                            h-5
                            w-5
                            text-slate-400
                            transition-transform
                            group-hover:translate-x-1
                            group-hover:text-sky-500
                          "
                        />
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={item.title}
                      className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                      "
                    >
                      {/* Mega Menu Header */}

                      <button
                        onClick={() => toggleMenu(item.title)}
                        className="
                          w-full
                          flex
                          items-center
                          justify-between
                          px-5
                          py-4
                          font-bold
                          text-slate-800
                          transition-all
                          hover:bg-slate-50
                        "
                      >
                        <span>{item.title}</span>

                        <motion.div
                          animate={{
                            rotate:
                              expandedMenu === item.title ? 180 : 0,
                          }}
                        >
                          <ChevronDown
                            className="
                              h-5
                              w-5
                              text-slate-500
                            "
                          />
                        </motion.div>
                      </button>

                      {/* Mega Menu Content */}

                      <AnimatePresence initial={false}>
                        {expandedMenu === item.title && (
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0,
                            }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                            }}
                            transition={{
                              duration: 0.25,
                            }}
                            className="
                              overflow-hidden
                              bg-slate-50
                              border-t
                              border-slate-100
                            "
                          >
                            <div className="p-3 space-y-5">
                              {item.sections?.map((section) => (
                                <div key={section.title}>
                                  <p
                                    className="
                                      px-2
                                      mb-2
                                      text-[11px]
                                      uppercase
                                      tracking-wider
                                      font-extrabold
                                      text-sky-600
                                    "
                                  >
                                    {section.title}
                                  </p>

                                  <div className="space-y-2">
                                    {section.items?.map((sub) => (
                                      <Link
                                        key={sub.title}
                                        to={sub.path}
                                        onClick={closeMenu}
                                        className="
                                          group
                                          flex
                                          gap-3
                                          rounded-xl
                                          bg-white
                                          border
                                          border-slate-100
                                          p-3
                                          transition-all
                                          hover:border-sky-200
                                          hover:shadow-md
                                        "
                                      >
                                        <div
                                          className="
                                            h-10
                                            w-10
                                            shrink-0
                                            rounded-xl
                                            bg-sky-50
                                            flex
                                            items-center
                                            justify-center
                                            group-hover:bg-sky-100
                                          "
                                        >
                                          <GraduationCap
                                            className="
                                              h-5
                                              w-5
                                              text-sky-600
                                            "
                                          />
                                        </div>

                                        <div className="min-w-0">
                                          <h4
                                            className="
                                              text-sm
                                              font-bold
                                              text-slate-800
                                              group-hover:text-sky-600
                                            "
                                          >
                                            {sub.title}
                                          </h4>

                                          {sub.description && (
                                            <p
                                              className="
                                                mt-1
                                                text-xs
                                                leading-5
                                                text-slate-500
                                              "
                                            >
                                              {sub.description}
                                            </p>
                                          )}
                                        </div>

                                        <ArrowUpRight
                                          className="
                                            ml-auto
                                            h-4
                                            w-4
                                            shrink-0
                                            text-slate-300
                                            group-hover:text-sky-500
                                          "
                                        />
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* ==========================================
                  COUNSELLING CTA
              ========================================== */}

              <div
                className="
                  relative
                  overflow-hidden
                  mt-8
                  rounded-3xl
                  bg-gradient-to-br
                  from-sky-600
                  via-sky-600
                  to-cyan-500
                  p-5
                  text-white
                  shadow-xl
                  shadow-sky-200
                "
              >
                {/* Decorative blur */}

                <div
                  className="
                    absolute
                    -right-10
                    -top-10
                    h-32
                    w-32
                    rounded-full
                    bg-white/10
                    blur-2xl
                  "
                />

                <div className="relative">
                  <div
                    className="
                      mb-3
                      inline-flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/15
                      backdrop-blur
                    "
                  >
                    <GraduationCap className="h-5 w-5" />
                  </div>

                  <h3 className="text-xl font-black">
                    Find Your Dream College
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/85">
                    Get personalized admission guidance from
                    our experienced counsellors.
                  </p>

                  <div className="mt-5">
                    <BookCounsellingButton mobile />
                  </div>
                </div>
              </div>

              {/* ==========================================
                  CONTACT SUPPORT
              ========================================== */}

              <div className="mt-6">
                <p
                  className="
                    mb-3
                    px-1
                    text-xs
                    font-extrabold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                >
                  Need Help?
                </p>

                <div className="space-y-2">
                  {/* Call */}

                  <a
                    href="tel:+919217381363"
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-slate-100
                      bg-white
                      p-3
                      transition-all
                      hover:border-sky-200
                      hover:bg-sky-50
                    "
                  >
                    <div
                      className="
                        h-10
                        w-10
                        shrink-0
                        rounded-xl
                        bg-sky-50
                        flex
                        items-center
                        justify-center
                        group-hover:bg-sky-100
                      "
                    >
                      <Phone className="h-5 w-5 text-sky-600" />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-400">
                        Call Us
                      </p>

                      <p className="text-sm font-bold text-slate-800">
                        +91 92173 81363
                      </p>
                    </div>
                  </a>

                  {/* WhatsApp */}

                  <a
                    href="https://wa.me/919217381365"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-slate-100
                      bg-white
                      p-3
                      transition-all
                      hover:border-emerald-200
                      hover:bg-emerald-50
                    "
                  >
                    <div
                      className="
                        h-10
                        w-10
                        shrink-0
                        rounded-xl
                        bg-emerald-50
                        flex
                        items-center
                        justify-center
                        group-hover:bg-emerald-100
                      "
                    >
                      <MessageCircle className="h-5 w-5 text-emerald-600" />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-400">
                        WhatsApp
                      </p>

                      <p className="text-sm font-bold text-slate-800">
                        +91 92173 81365
                      </p>
                    </div>

                    <ArrowUpRight
                      className="
                        ml-auto
                        h-4
                        w-4
                        text-slate-300
                        group-hover:text-emerald-500
                      "
                    />
                  </a>

                  {/* Email */}

                  <a
                    href="mailto:Support@nextgenedu.co"
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-slate-100
                      bg-white
                      p-3
                      transition-all
                      hover:border-violet-200
                      hover:bg-violet-50
                    "
                  >
                    <div
                      className="
                        h-10
                        w-10
                        shrink-0
                        rounded-xl
                        bg-violet-50
                        flex
                        items-center
                        justify-center
                        group-hover:bg-violet-100
                      "
                    >
                      <Mail className="h-5 w-5 text-violet-600" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-slate-400">
                        Email Support
                      </p>

                      <p className="text-sm font-bold text-slate-800 truncate">
                        Support@nextgenedu.co
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* ==========================================
                BOTTOM BAR
            ========================================== */}

            <div
              className="
                border-t
                border-slate-100
                bg-white
                px-5
                py-4
              "
            >
              <div className="flex items-center justify-center gap-2">
                <div
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-emerald-500
                    animate-pulse
                  "
                />

                <span
                  className="
                    text-xs
                    font-semibold
                    text-slate-500
                  "
                >
                  Admission support available
                </span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;