import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  GraduationCap,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import UniversityGrid from "../universities/UniversityGrid";
import { getApprovedUniversities } from "../../services/universityService";

export default function UniversitiesSection() {

  const [universities, setUniversities] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {

      setLoading(true);

      const response =
        await getApprovedUniversities();

      setUniversities(
        response.universities || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const featuredUniversities =
    useMemo(() => {
      return universities.slice(0, 8);
    }, [universities]);

  return (

    <section
      className="
      relative
      overflow-hidden

      py-16
      lg:py-12

      bg-gradient-to-b
      from-[#f9fcff]
      via-white
      to-[#f8fbff]
      "
    >

      {/* ================= Soft Glow ================= */}

      <div
        className="
        absolute

        -top-52
        -left-52

        h-[650px]
        w-[650px]

        rounded-full

        bg-cyan-200/30

        blur-[180px]
        "
      />

      <div
        className="
        absolute

        bottom-0
        right-0

        h-[550px]
        w-[550px]

        rounded-full

        bg-sky-200/30

        blur-[180px]
        "
      />

      {/* ================= Premium Dot Pattern ================= */}

      <div
        className="
        absolute
        inset-0

        opacity-[0.04]

        [background-image:radial-gradient(#06b6d4_1px,transparent_1px)]

        [background-size:28px_28px]
        "
      />

      {/* ================= Container ================= */}

      <div
        className="
        relative
        z-10

        max-w-[1450px]

        mx-auto

        px-5
        lg:px-8
        "
      >

        {/* ================= Header ================= */}

        <motion.div

          initial={{
            opacity: 0,
            y: 50,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
          }}

          transition={{
            duration: .8,
          }}

          className="
          flex
          flex-col

          lg:flex-row

          lg:items-end
          lg:justify-between

          gap-8

          mb-10
          "
        >

          {/* Left */}

          <div className="max-w-3xl">

            <div
              className="
              inline-flex

              items-center

              gap-2

              rounded-full

              border
              border-cyan-200

              bg-cyan-50

              px-5
              py-2

              text-cyan-700

              font-semibold
              "
            >

              <Sparkles size={18} />

              Featured Universities

            </div>

            <h2
              className="
              mt-4

              text-4xl
              lg:text-5xl

              font-black

              leading-tight

              text-slate-900
              "
            >

              Find Your

              <span
                className="
                block

                bg-gradient-to-r

                from-cyan-600
                via-blue-600
                to-indigo-600

                bg-clip-text
                text-transparent
                "
              >

                Dream University

              </span>

            </h2>

            <p
              className="
              mt-4

              max-w-2xl

              text-lg

              leading-8

              text-slate-600
              "
            >

              Explore India's leading universities with verified
              information, affordable tuition fees, admission support,
              placement insights and expert counselling — all in one
              trusted platform.

            </p>

          </div>

          {/* Right */}

          <div
            className="
            flex
            flex-col

            items-start
            lg:items-end

            gap-5
            "
          >

            <div
              className="
              flex

              items-center

              gap-3

              rounded-2xl

              border
              border-slate-200

              bg-white/90

              backdrop-blur-xl

              px-5
              py-4

              shadow-lg
              "
            >

              <div
                className="
                flex

                h-12
                w-12

                items-center
                justify-center

                rounded-2xl

                bg-cyan-100
                "
              >

                <GraduationCap
                  size={24}
                  className="text-cyan-700"
                />

              </div>

              <div>

                <p className="text-xs text-slate-500">

                  Available Universities

                </p>

                <h3 className="text-3xl font-black text-slate-900">

                  {universities.length}+

                </h3>

              </div>

            </div>

            <Link
              to="/universities"
              className="
              inline-flex

              items-center

              gap-3

              rounded-2xl

              bg-gradient-to-r
              from-cyan-600
              to-blue-600

              px-7
              py-4

              text-white

              font-semibold

              shadow-xl

              transition-all

              duration-300

              hover:scale-[1.04]
              hover:shadow-cyan-300/50
              "
            >

              View All Universities

              <ArrowRight size={20} />

            </Link>

          </div>

        </motion.div>
                {/* ================= Universities Grid ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="
          relative

          overflow-hidden

          rounded-[36px]

          border
          border-cyan-100

          bg-white/80

          backdrop-blur-xl

          p-4
          md:p-5

          shadow-[0_30px_80px_rgba(14,165,233,0.08)]
          "
        >

          {/* Top Glow */}

          <div
            className="
            absolute

            -top-28
            -right-24

            h-80
            w-80

            rounded-full

            bg-cyan-100/60

            blur-3xl
            "
          />

          {/* Bottom Glow */}

          <div
            className="
            absolute

            -bottom-28
            -left-24

            h-80
            w-80

            rounded-full

            bg-blue-100/60

            blur-3xl
            "
          />

          {/* Grid */}

          <div className="relative z-10">

            <UniversityGrid
              universities={featuredUniversities}
              loading={loading}
              columns={4}
            />

          </div>

        </motion.div>

        {/* ================= Small Bottom Text ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: .8,
            delay: .3,
          }}
          className="
          mt-8

          text-center
          "
        >

          <p
            className="
            text-slate-500

            text-sm
            md:text-base
            "
          >

            Trusted by thousands of students across India for verified
            university information, admission guidance and career support.

          </p>

        </motion.div>

      </div>

    </section>

  );

}