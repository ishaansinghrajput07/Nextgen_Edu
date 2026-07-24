import { useState, useEffect } from "react";

import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import BookCounsellingButton from "./BookCounsellingButton";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const current = window.scrollY;

      // Background Change
      setScrolled(current > 40);

      // Hide / Show Navbar
      if (current > lastScroll && current > 120) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <header
      className={`
fixed
top-0
left-0
w-full
z-50
transition-all
duration-500
translate-y-0

${
  scrolled
    ? "bg-white/90 backdrop-blur-2xl shadow-lg border-b border-slate-200"
    : "bg-white/80 backdrop-blur-xl border-b border-slate-100"
}
`}
    >
      <div
        className="
max-w-[1400px]
mx-auto
h-[88px]
px-6
lg:px-10

flex
items-center
justify-between
"
      >
        {/* Logo */}

        <Logo />

        {/* Desktop Menu */}

        <DesktopMenu />

        {/* Right Side */}

        <div className="flex items-center gap-4">

          <BookCounsellingButton />

          <button
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            className="
lg:hidden
w-11
h-11
rounded-xl
bg-slate-100
flex
items-center
justify-center
"
          >
            <span className="text-2xl">
              ☰
            </span>
          </button>

        </div>
      </div>

      <MobileMenu
  isOpen={mobileOpen}
  setIsOpen={setMobileOpen}
/>
    </header>
  );
}