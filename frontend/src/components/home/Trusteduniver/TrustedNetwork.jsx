import { motion } from "framer-motion";

import SectionHeader from "./SectionHeader";
import StatsCards from "./StatsCards";
import LogoMarquee from "./LogoMarquee";
import TrustFeatures from "./TrustFeatures";
import CTASection from "./CTASection";

export default function TrustedNetwork() {
  return (
    <section
      className="
relative
overflow-hidden
py-28
bg-gradient-to-b
from-white
via-sky-50/60
to-white
"
    >
      {/* ================================
          Background Decoration
      ================================= */}

      {/* Top Left Glow */}

      <div
        className="
absolute
-top-40
-left-40
w-[500px]
h-[500px]
rounded-full
bg-cyan-200/30
blur-[130px]
pointer-events-none
"
      />

      {/* Bottom Right Glow */}

      <div
        className="
absolute
-bottom-40
-right-40
w-[500px]
h-[500px]
rounded-full
bg-blue-200/30
blur-[130px]
pointer-events-none
"
      />

      {/* Small Glow */}

      <div
        className="
absolute
top-40
right-1/3
w-40
h-40
rounded-full
bg-sky-300/20
blur-[90px]
pointer-events-none
"
      />

      {/* Dot Grid */}

      <div
        className="
absolute
inset-0
opacity-[0.035]
pointer-events-none
[background-image:radial-gradient(#0ea5e9_1px,transparent_1px)]
[background-size:24px_24px]
"
      />

      {/* Top Gradient Line */}

      <div
        className="
absolute
top-0
left-0
w-full
h-px
bg-gradient-to-r
from-transparent
via-cyan-300
to-transparent
opacity-60
"
      />

      {/* Bottom Gradient Line */}

      <div
        className="
absolute
bottom-0
left-0
w-full
h-px
bg-gradient-to-r
from-transparent
via-blue-300
to-transparent
opacity-60
"
      />

      {/* Floating Light */}

      <motion.div
        animate={{
          y: [-10, 15, -10],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
        }}
        className="
absolute
left-20
top-40
w-4
h-4
rounded-full
bg-cyan-400
shadow-[0_0_35px_10px_rgba(34,211,238,.45)]
"
      />

      <motion.div
        animate={{
          y: [15, -15, 15],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        className="
absolute
right-20
top-24
w-3
h-3
rounded-full
bg-blue-500
shadow-[0_0_30px_8px_rgba(59,130,246,.45)]
"
      />

      {/* ================================
            Content
      ================================= */}

      <div
        className="
relative
z-10
max-w-[1400px]
mx-auto
px-6
lg:px-10
"
      >
        {/* Heading */}

        <SectionHeader />

        {/* Stats */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
          className="mt-16"
        >
          <StatsCards />
        </motion.div>

        {/* Logo Marquee */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.25,
          }}
          className="mt-16"
        >
          <LogoMarquee />
        </motion.div>

        {/* Trust Features */}

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
            duration: 0.7,
            delay: 0.35,
          }}
          className="mt-14"
        >
          <TrustFeatures />
        </motion.div>

        {/* CTA */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
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
            delay: 0.45,
          }}
          className="mt-16"
        >
          <CTASection />
        </motion.div>
      </div>
    </section>
  );
}