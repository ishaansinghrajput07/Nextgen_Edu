import { motion } from "framer-motion";

import AboutContent from "./AboutContent";
import AboutImage from "./AboutImage";
import AboutRightCards from "./AboutRightCards";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50">

      {/* ================= Background Blur ================= */}

      <div className="absolute -top-44 -left-44 w-[520px] h-[520px] rounded-full bg-cyan-300/30 blur-[120px]" />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sky-200/30 blur-[140px]" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-cyan-100/40 blur-[120px]" />

      {/* ================= Grid Pattern ================= */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.05]
          [background-image:radial-gradient(#0ea5e9_1px,transparent_1px)]
          [background-size:26px_26px]
        "
      />

      {/* ================= Decorative Shapes ================= */}

      <motion.div
        animate={{
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
          hidden
          lg:block
          absolute
          top-36
          left-20
          w-6
          h-6
          rounded-full
          bg-cyan-400/30
        "
      />

      <motion.div
        animate={{
          y: [20, -20, 20],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="
          hidden
          lg:block
          absolute
          bottom-36
          right-24
          w-5
          h-5
          rounded-full
          bg-blue-400/30
        "
      />

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          hidden
          xl:block
          absolute
          top-44
          right-[42%]
          w-10
          h-10
          rounded-xl
          border-2
          border-cyan-300
        "
      />

      {/* ================= Main Container ================= */}

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-28 pb-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}

          <motion.div
            initial={{
              opacity: 0,
              x: -70,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: .8,
            }}
          >
            <AboutContent />
          </motion.div>

          {/* Right Image */}

          <motion.div
            initial={{
              opacity: 0,
              x: 70,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: .8,
              delay: .2,
            }}
            className="relative flex items-center justify-center"
          >

            {/* Hero Illustration */}

            <AboutImage />

            {/* Floating Cards */}

           

          </motion.div>

        </div>
 <AboutRightCards />
      </div>

    </section>
  );
}