import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import nextLogo from "../../assets/logo/NEXTGEN LOGO.png";

import {
  Phone,
  Mail,
  ShieldCheck,
  FileText,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import NEXTGEN from "../../assets/logo/NEXTGEN LOGO.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showTrust, setShowTrust] = useState(false);

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "#",
      label: "Facebook",
      className: "bg-[#1877F2] text-white hover:bg-[#166fe5]",
    },
    {
      icon: FaInstagram,
      href: "#",
      label: "Instagram",
      className:
        "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white",
    },
    {
      icon: FaLinkedinIn,
      href: "#",
      label: "LinkedIn",
      className: "bg-[#0A66C2] text-white hover:bg-[#095aa8]",
    },
    {
      icon: FaYoutube,
      href: "#",
      label: "YouTube",
      className: "bg-[#FF0000] text-white hover:bg-[#e60000]",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-cyan-100 bg-gradient-to-b from-[#f8fcff] via-[#eef7ff] to-white">
      {/* ================= BACKGROUND GLOW ================= */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-[30px] py-[30px]">
        {/* ================= MAIN FOOTER ================= */}
        <div className="grid gap-8 pb-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* ================= COMPANY ================= */}
         {/* ================= COMPANY ================= */}
<div>
  {/* ================= BRAND ================= */}
  <Link
    to="/"
    className="group inline-flex items-center gap-2.5"
  >
    <motion.img
      src={nextLogo}
      alt="NextGenEdu"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="h-12 w-auto object-contain"
    />

    <div className="flex flex-col">
      <h2
        className="
          text-xl
          font-extrabold
          leading-none
          tracking-tight
          text-slate-900
          transition-colors
          duration-300
          group-hover:text-sky-600
          sm:text-2xl
        "
      >
        NextGen
        <span className="text-sky-600">Edu</span>
      </h2>

      <p
        className="
          mt-1
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.12em]
          text-slate-500
        "
      >
        Career & Admission Experts
      </p>
    </div>
  </Link>

  {/* Description */}
  <p className="mt-5 max-w-sm text-[14px] font-semibold leading-6 text-slate-600">
    Helping students discover the right universities, courses and
    career opportunities through trusted admission guidance.
  </p>

  {/* Trust Points */}
  <div className="mt-5 space-y-3">
    <div className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-700">
      <CheckCircle2
        size={17}
        className="shrink-0 text-emerald-500"
      />
      250+ Trusted Universities
    </div>

    <div className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-700">
      <CheckCircle2
        size={17}
        className="shrink-0 text-blue-500"
      />
      Free Expert Counselling
    </div>

    <div className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-700">
      <CheckCircle2
        size={17}
        className="shrink-0 text-violet-500"
      />
      15,000+ Students Guided
    </div>
  </div>

  {/* Social Icons */}
  <div className="mt-6 flex items-center gap-2.5">
    {socialLinks.map(({ icon: Icon, href, label, className }) => (
      <a
        key={label}
        href={href}
        aria-label={label}
        className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${className}`}
      >
        <Icon size={15} />
      </a>
    ))}
  </div>
</div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h3 className="text-[16px] font-black text-slate-950">
              Quick Links
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                to="/"
                className="group flex items-center gap-2.5 text-[13px] font-semibold text-slate-600 transition-colors hover:text-cyan-600"
              >
                <ArrowRight
                  size={14}
                  className="text-blue-500 transition-transform duration-300 group-hover:translate-x-1"
                />
                Home
              </Link>

              <Link
                to="/universities"
                className="group flex items-center gap-2.5 text-[13px] font-semibold text-slate-600 transition-colors hover:text-cyan-600"
              >
                <ArrowRight
                  size={14}
                  className="text-violet-500 transition-transform duration-300 group-hover:translate-x-1"
                />
                Universities
              </Link>

              <Link
                to="/courses"
                className="group flex items-center gap-2.5 text-[13px] font-semibold text-slate-600 transition-colors hover:text-cyan-600"
              >
                <ArrowRight
                  size={14}
                  className="text-emerald-500 transition-transform duration-300 group-hover:translate-x-1"
                />
                Courses
              </Link>

              <Link
                to="/#faqs"
                className="group flex items-center gap-2.5 text-[13px] font-semibold text-slate-600 transition-colors hover:text-cyan-600"
              >
                <ArrowRight
                  size={14}
                  className="text-orange-500 transition-transform duration-300 group-hover:translate-x-1"
                />
                FAQs
              </Link>

              <Link
                to="/contact"
                className="group flex items-center gap-2.5 text-[13px] font-semibold text-slate-600 transition-colors hover:text-cyan-600"
              >
                <ArrowRight
                  size={14}
                  className="text-pink-500 transition-transform duration-300 group-hover:translate-x-1"
                />
                Contact
              </Link>
            </div>
          </div>

          {/* ================= SUPPORT ================= */}
          <div>
            <h3 className="text-[16px] font-black text-slate-950">Support</h3>

            <div className="mt-5 space-y-3.5">
              <Link
                to="/terms-and-conditions"
                className="flex items-center gap-3 text-[13px] font-semibold text-slate-600 transition-colors hover:text-cyan-600"
              >
                <FileText size={17} className="shrink-0 text-blue-600" />
                Terms & Conditions
              </Link>

              <Link
                to="/privacy-policy"
                className="flex items-center gap-3 text-[13px] font-semibold text-slate-600 transition-colors hover:text-cyan-600"
              >
                <ShieldCheck size={17} className="shrink-0 text-emerald-600" />
                Privacy Policy
              </Link>

              <Link
                to="/contact"
                className="flex items-center gap-3 text-[13px] font-semibold text-slate-600 transition-colors hover:text-cyan-600"
              >
                <HelpCircle size={17} className="shrink-0 text-orange-500" />
                Contact Support
              </Link>
            </div>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h3 className="text-[16px] font-black text-slate-950">
              Get in Touch
            </h3>

            <div className="mt-5 space-y-3">
              {/* Phone */}
              <div className="rounded-2xl border border-cyan-100 bg-white/80 p-3.5 shadow-md backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                    <Phone size={17} className="text-emerald-600" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-[13px] font-black text-slate-950">
                      Call Us
                    </h4>

                    <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                      Mon - Sat (9 AM - 7 PM)
                    </p>

                    <a
                      href="tel:+919217381365"
                      className="mt-0.5 block text-[13px] font-bold text-slate-700 transition-colors hover:text-cyan-600"
                    >
                      +91 92173 81365
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-cyan-100 bg-white/80 p-3.5 shadow-md backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50">
                    <Mail size={17} className="text-violet-600" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-[13px] font-black text-slate-950">
                      Email Us
                    </h4>

                    <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                      We'll reply within 24 hours
                    </p>

                    <a
                      href="mailto:Support@nextgenedu.co"
                      className="mt-0.5 block break-all text-[13px] font-bold text-slate-700 transition-colors hover:text-cyan-600"
                    >
                      Support@nextgenedu.co
                    </a>
                  </div>
                </div>
              </div>

              {/* ================= TRUST CARD ================= */}
              <div className="overflow-hidden rounded-2xl border border-cyan-200 bg-white/80 shadow-md backdrop-blur-sm">
                <button
                  onClick={() => setShowTrust(!showTrust)}
                  className="flex w-full items-center justify-between gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3.5 text-left text-white transition-all hover:from-cyan-600 hover:to-blue-700"
                >
                  <span className="text-[13px] font-black">
                    Why Students Trust Us
                  </span>

                  <motion.div
                    animate={{
                      rotate: showTrust ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={17} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {showTrust && (
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
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2.5 px-4 py-3.5">
                        <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                          <CheckCircle2
                            size={15}
                            className="text-emerald-500"
                          />
                          100% Free Counselling
                        </div>

                        <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                          <CheckCircle2 size={15} className="text-blue-500" />
                          Verified Universities
                        </div>

                        <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                          <CheckCircle2 size={15} className="text-violet-500" />
                          End-to-End Admission Support
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DISCLAIMER ================= */}
        <div className="overflow-hidden rounded-2xl border border-cyan-100 bg-white/70 shadow-md backdrop-blur-xl">
          <button
            onClick={() => setShowDisclaimer(!showDisclaimer)}
            className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors hover:bg-cyan-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100">
                <ShieldCheck size={17} className="text-cyan-600" />
              </div>

              <span className="text-[13px] font-black text-slate-800">
                Read Disclaimer
              </span>
            </div>

            <motion.div
              animate={{
                rotate: showDisclaimer ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={18} className="text-blue-600" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showDisclaimer && (
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
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-cyan-100"
              >
                <div className="px-5 py-4">
                  <p className="text-[12px] font-medium leading-6 text-slate-600">
                    The information available on
                    <strong className="font-black text-slate-700">
                      {" "}
                      NextGen Education{" "}
                    </strong>
                    is provided for educational and informational purposes only.
                    Students should verify admission requirements, eligibility,
                    fees, scholarships and other details directly from the
                    respective university before taking admission.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= BOTTOM FOOTER ================= */}
        <div className="mt-6 border-t border-cyan-100 pt-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-[12px] font-semibold text-slate-600">
                © {currentYear}{" "}
                <span className="font-black text-cyan-600">PimsInfotech</span>.
                All rights reserved.
              </p>

              <p className="mt-1 text-[11px] font-medium text-slate-500">
                Designed & developed by{" "}
                <span className="font-bold text-slate-700">
                  PimsInfotech Pvt Ltd.
                </span>
              </p>
            </div>

            {/* Bottom Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link
                to="/terms-and-conditions"
                className="text-[12px] font-semibold text-slate-600 transition-colors hover:text-cyan-600"
              >
                Terms
              </Link>

              <Link
                to="/privacy-policy"
                className="text-[12px] font-semibold text-slate-600 transition-colors hover:text-cyan-600"
              >
                Privacy
              </Link>

              <Link
                to="/contact"
                className="text-[12px] font-semibold text-slate-600 transition-colors hover:text-cyan-600"
              >
                Contact
              </Link>

              <Link
                to="/#faqs"
                className="text-[12px] font-semibold text-slate-600 transition-colors hover:text-cyan-600"
              >
                FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
