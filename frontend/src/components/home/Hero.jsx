import { motion } from "framer-motion";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";
import HeroFeatures from "./HeroFeatures";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50">

      {/* Blur Background */}
      <div className="absolute -top-44 -left-44 w-[520px] h-[520px] rounded-full bg-cyan-200/30 blur-[120px]" />

      <div className="absolute top-32 right-0 w-[420px] h-[420px] rounded-full bg-blue-200/20 blur-[120px]" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] rounded-full bg-sky-100/40 blur-[120px]" />

      {/* Small Grid Pattern */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.04]
        [background-image:radial-gradient(#0284c7_1px,transparent_1px)]
        [background-size:24px_24px]
      "
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-28">

        <div className="grid lg:grid-cols-2 gap-16 items-start min-h-[72vh]">

          {/* Left */}
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
            <HeroContent />
          </motion.div>

          {/* Right */}
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
            <HeroImage />
          </motion.div>

        </div>

        {/* Bottom Statistics */}
<HeroFeatures />
        <HeroStats />
       

      </div>

    </section>
  );
}