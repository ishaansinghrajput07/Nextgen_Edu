import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ArrowRight,
} from "lucide-react";

export default function StoryContent() {
  return (
    <div className="max-w-2xl">

      {/* Badge */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .5 }}
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-sky-200
          bg-white
          px-5
          py-2.5
          shadow-md
        "
      >
        <BookOpen
          size={18}
          className="text-cyan-600"
        />

        <span className="text-sm font-semibold text-slate-700">
          Our Story
        </span>

      </motion.div>

      {/* Heading */}

      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: .15,
          duration: .6,
        }}
        className="
          mt-6
          text-4xl
          xl:text-5xl
          font-extrabold
          leading-tight
          text-slate-900
        "
      >
        Guiding Students

        <span
          className="
            bg-gradient-to-r
            from-blue-700
            via-cyan-600
            to-sky-500
            bg-clip-text
            text-transparent
          "
        >
          {" "}Since 2020
        </span>

      </motion.h2>

      {/* Description */}

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: .3,
        }}
        className="
          mt-6
          text-lg
          leading-8
          text-slate-600
        "
      >
      About NextGen Education Institute
      Empowering Aspirations. Guiding Futures.
      At NextGen Education Institute, we believe that choosing the right education is not just a decision — it is the foundation of a successful future.
      With 5+ years of experience in the education sector, we help students and working professionals navigate the journey of higher education with the right information, guidance, and support. We provide admission guidance for UG, PG, PhD, Online and Distance Education programs offered by recognized universities and institutions across India.
      Our organization was formally registered in 2024, building on years of experience and a strong commitment to serving students in the field of higher education.
      From choosing the right course and university to understanding eligibility, admission procedures, and enrollment, our aim is to make the entire process simple, transparent, and student-focused.
      With an ISO-certified organization and a commitment to professional standards, we continue to build a trusted platform where students can make informed educational decisions with confidence.
      Our Vision
      To become a trusted and accessible education guidance platform, connecting students with the right academic opportunities and helping them move confidently toward their career goals.
      Our Mission
      To simplify higher education through transparent guidance, reliable information, and dedicated student support.
      </motion.p>

      {/* CTA */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: .45,
        }}
        className="mt-8"
      >

        <Link
          to="/contact"
          className="
            inline-flex
            items-center
            gap-3
            rounded-2xl
            bg-cyan-600
            px-7
            py-3.5
            font-semibold
            text-white
            shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-cyan-700
          "
        >
          Get Free Counselling

          <ArrowRight size={18} />

        </Link>

      </motion.div>

    </div>
  );
}