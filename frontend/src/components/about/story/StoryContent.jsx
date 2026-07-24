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
        NextGenEdu was founded with a simple mission —
        to make quality education accessible and admission
        guidance transparent for every student.

        Over the years, we have helped thousands of
        students achieve their academic dreams by
        connecting them with trusted universities,
        experienced counsellors and complete admission
        support.
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