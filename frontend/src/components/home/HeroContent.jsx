import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  PhoneCall,
  MessageCircle,
  CheckCircle2,
  Star,
} from "lucide-react";

const features = [
  "100% Free Career Counselling",
  "250+ UGC Approved Universities",
  "Scholarship Assistance",
  "Admission Support till Enrollment",
];

export default function HeroContent() {
  return (
    <div className="relative max-w-2xl">

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-3 rounded-full border border-cyan-200 bg-cyan-50 px-6 py-3 shadow-md"
      >
        <BadgeCheck size={20} className="text-cyan-600" />

        <span className="font-semibold text-slate-700">
          Trusted by 15,000+ Students
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-6 text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-slate-900"
      >
        Your Dream College

        <span className="block">
          Starts with the Right
        </span>

        <span className="bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-400 bg-clip-text text-transparent">
           Counsellor
        </span>
      </motion.h1>

      {/* Gradient Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 170 }}
        transition={{ delay: 0.6 }}
        className="mt-4 h-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
      />

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-5 max-w-xl text-base lg:text-lg leading-7 text-slate-600"
      >
        Get personalized admission guidance for Undergraduate,
        Postgraduate, Diploma and Online Degree Programs.
        Our experienced counsellors help you choose the right
        university, the right course and build a successful career.
      </motion.p>

      {/* Rating + Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="mt-6 flex flex-wrap items-center gap-6"
      >
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              fill="#FBBF24"
              stroke="#FBBF24"
            />
          ))}

          <span className="font-semibold text-slate-700">
            4.9/5 Rating
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900">
            250+
          </h3>

          <p className="text-sm text-slate-500">
            Partner Universities
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900">
            98%
          </h3>

          <p className="text-sm text-slate-500">
            Admission Success
          </p>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6 flex flex-wrap gap-3"
      >
        <Link
          to="/contact"
          className="group inline-flex items-center gap-3 rounded-2xl bg-cyan-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-700"
        >
          Get Free Counselling

          <ArrowRight
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

        <a
          href="tel:+919999999999"
          className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <PhoneCall size={20} />

          Call Now
        </a>

        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 rounded-2xl bg-green-500 px-7 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-green-600"
        >
          <MessageCircle size={20} />

          WhatsApp
        </a>
      </motion.div>

    

    </div>
  );
}