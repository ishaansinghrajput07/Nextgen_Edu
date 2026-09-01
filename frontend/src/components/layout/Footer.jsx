import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // NEW
  const [showTrust, setShowTrust] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#f8fcff] via-[#eef7ff] to-white border-t border-cyan-100">

      {/* Background Glow */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-0 w-80 h-80 rounded-full bg-cyan-200/30 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-200/20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-8">

        {/* Main Footer */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-7 pb-6">

          {/* ================= Company ================= */}

          <div>

            <h2 className="text-3xl font-extrabold text-cyan-600 mb-3">
              NextGen
            </h2>

            <p className="text-slate-600 leading-7 mb-4">
              Helping students discover the right universities,
              courses and career opportunities through trusted
              admission guidance.
            </p>

            <div className="space-y-2.5">

              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2
                  size={18}
                  className="text-emerald-500"
                />
                250+ Trusted Universities
              </div>

              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2
                  size={18}
                  className="text-emerald-500"
                />
                Free Expert Counselling
              </div>

              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2
                  size={18}
                  className="text-emerald-500"
                />
                15,000+ Students Guided
              </div>

            </div>

            {/* Social */}

            <div className="flex gap-3 mt-5">

              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube].map(
                (Icon, index) => (

                  <a
                    key={index}
                    href="#"
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-white
                      border
                      border-cyan-100
                      shadow-md
                      flex
                      items-center
                      justify-center
                      hover:bg-cyan-600
                      hover:text-white
                      hover:-translate-y-1
                      transition-all
                      duration-300
                    "
                  >
                    <Icon size={17} />
                  </a>

                )
              )}

            </div>

          </div>

          {/* ================= Quick Links ================= */}

          <div>

            <h3 className="text-xl font-bold mb-4">
              Quick Links
            </h3>

            <div className="space-y-3">

              {[
                ["Home", "/"],
                ["Universities", "/universities"],
                ["Courses", "/courses"],
                ["FAQs", "/#faqs"],
                ["Contact", "/contact"],
              ].map(([name, url]) => (

                <Link
                  key={name}
                  to={url}
                  className="
                    flex
                    items-center
                    gap-2
                    text-slate-600
                    hover:text-cyan-600
                    transition
                    group
                  "
                >
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition"
                  />

                  {name}

                </Link>

              ))}

            </div>

          </div>

          {/* ================= Support ================= */}

          <div>

            <h3 className="text-xl font-bold mb-4">
              Support
            </h3>

            <div className="space-y-3">

              <Link
                to="/terms-and-conditions"
                className="
                  flex
                  items-center
                  gap-3
                  text-slate-600
                  hover:text-cyan-600
                  transition
                "
              >
                <FileText size={18} />
                Terms & Conditions
              </Link>

              <Link
                to="/privacy-policy"
                className="
                  flex
                  items-center
                  gap-3
                  text-slate-600
                  hover:text-cyan-600
                  transition
                "
              >
                <ShieldCheck size={18} />
                Privacy Policy
              </Link>

              <Link
                to="/contact"
                className="
                  flex
                  items-center
                  gap-3
                  text-slate-600
                  hover:text-cyan-600
                  transition
                "
              >
                <HelpCircle size={18} />
                Contact Support
              </Link>

            </div>

          </div>
                    {/* ================= Contact ================= */}

          <div>

            <h3 className="text-xl font-bold mb-4">
              Get in Touch
            </h3>

            <div className="space-y-3">

              {/* Phone */}

              <div className="rounded-2xl bg-white/80 border border-cyan-100 p-4 shadow-md">

                <div className="flex gap-3">

                  <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                    <Phone size={18} className="text-cyan-600" />
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      Call Us
                    </h4>

                    <p className="text-xs text-slate-500">
                      Mon - Sat (9 AM - 7 PM)
                    </p>

                    <a
                      href="tel:+917983978462"
                      className="text-slate-700 hover:text-cyan-600 transition"
                    >
                      +91 79839 78462
                    </a>

                  </div>

                </div>

              </div>

              {/* Email */}

              <div className="rounded-2xl bg-white/80 border border-cyan-100 p-4 shadow-md">

                <div className="flex gap-3">

                  <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                    <Mail size={18} className="text-cyan-600" />
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      Email Us
                    </h4>

                    <p className="text-xs text-slate-500">
                      We'll reply within 24 hours
                    </p>

                    <a
                      href="mailto:info@nextgenedu.co"
                      className="text-slate-700 hover:text-cyan-600 transition"
                    >
                      info@nextgenedu.co
                    </a>

                  </div>

                </div>

              </div>

              {/* ================= Trust Card (Collapsible) ================= */}

              <div className="rounded-2xl overflow-hidden border border-cyan-200 shadow-lg">

                <button
                  onClick={() => setShowTrust(!showTrust)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-5
                    py-4
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    text-white
                    font-semibold
                  "
                >

                  <span>
                    Why Students Trust Us
                  </span>

                  <motion.div
                    animate={{
                      rotate: showTrust ? 180 : 0,
                    }}
                    transition={{
                      duration: .3,
                    }}
                  >
                    <ChevronDown size={20} />
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
                      transition={{
                        duration: .35,
                      }}
                      className="overflow-hidden bg-white"
                    >

                      <div className="p-5 space-y-3 text-sm text-slate-700">

                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-500" />
                          100% Free Counselling
                        </div>

                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-500" />
                          Verified Universities
                        </div>

                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-500" />
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

        {/* ================= Disclaimer ================= */}

        <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-cyan-100 shadow-md overflow-hidden">

          <button
            onClick={() => setShowDisclaimer(!showDisclaimer)}
            className="
              w-full
              flex
              items-center
              justify-between
              px-6
              py-4
              hover:bg-cyan-50
              transition
            "
          >

            <div className="flex items-center gap-3">

              <ShieldCheck
                size={20}
                className="text-cyan-600"
              />

              <span className="font-semibold text-slate-800">
                Read Disclaimer
              </span>

            </div>

            <motion.div
              animate={{
                rotate: showDisclaimer ? 180 : 0,
              }}
              transition={{
                duration: .3,
              }}
            >
              <ChevronDown size={20} />
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
                transition={{
                  duration: .35,
                }}
                className="overflow-hidden border-t border-cyan-100"
              >

                <div className="px-6 py-5">

                  <p className="text-sm leading-7 text-slate-600">

                    The information available on
                    <strong> NextGen Education </strong>
                    is provided for educational and informational
                    purposes only.

                    Students should verify admission requirements,
                    eligibility, fees, scholarships and other details
                    directly from the respective university before
                    taking admission.

                  </p>

                </div>

              </motion.div>

            )}

          </AnimatePresence>

        </div>
              {/* ================= Bottom Footer ================= */}

<div
  className="
    border-t
    border-cyan-100
    mt-6
    pt-5

    flex
    flex-col
    lg:flex-row

    items-center
    justify-between

    gap-5
  "
>

  {/* Left */}

  <div className="flex-1">

    <p className="text-slate-600 text-sm">
      © {currentYear}
      <span className="font-semibold text-cyan-600">
        {" "}NextGen Education
      </span>
      . All Rights Reserved.
    </p>

    <p className="text-xs text-slate-500 mt-1">
      Designed & Developed by
      <span className="font-semibold text-slate-700">
        {" "}PimsInfotech Pvt Ltd.
      </span>
    </p>

  </div>

  {/* Center Links */}

  <div
    className="
      flex
      flex-wrap
      items-center
      justify-center
      gap-8
      flex-1
    "
  >

    <Link
      to="/terms-and-conditions"
      className="text-sm text-slate-600 hover:text-cyan-600 transition"
    >
      Terms
    </Link>

    <Link
      to="/privacy-policy"
      className="text-sm text-slate-600 hover:text-cyan-600 transition"
    >
      Privacy
    </Link>

    <Link
      to="/contact"
      className="text-sm text-slate-600 hover:text-cyan-600 transition"
    >
      Contact
    </Link>

    <Link
      to="/#faqs"
      className="text-sm text-slate-600 hover:text-cyan-600 transition"
    >
      FAQs
    </Link>

  </div>

  {/* Right Space */}

  <div
    className="
      flex-1
      flex
      justify-end
      min-w-[170px]
    "
  >

    {/* WhatsApp Button yaha aayega */}

  </div>

</div>
      </div>

    </footer>

  );
}