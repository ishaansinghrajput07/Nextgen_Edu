import { motion } from "framer-motion";

import StoryImage from "./StoryImage";
import StoryContent from "./StoryContent";
import StoryCards from "./StoryCards";
import StoryStats from "./StoryStats";

export default function StorySection() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-sky-50 via-white to-cyan-50">

      {/* Left Blur */}
      <div className="absolute -left-40 top-20 w-[420px] h-[420px] rounded-full bg-cyan-200/25 blur-[120px]" />

      {/* Right Blur */}
      <div className="absolute right-0 top-0 w-[480px] h-[480px] rounded-full bg-sky-200/20 blur-[140px]" />

      {/* Bottom Blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full bg-cyan-100/30 blur-[120px]" />

      {/* Dot Pattern */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          [background-image:radial-gradient(#0284c7_1px,transparent_1px)]
          [background-size:22px_22px]
        "
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Image */}
          <motion.div
            initial={{
              opacity: 0,
              x: -60,
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
            <StoryImage />
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{
              opacity: 0,
              x: 60,
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
          >
            <StoryContent />
          </motion.div>

        </div>

        {/* Feature Cards */}
        <StoryCards />

        {/* Bottom Statistics */}
        <StoryStats />

      </div>

    </section>
  );
}