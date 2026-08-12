import { motion } from "framer-motion";

import SectionHeader from "./SectionHeader";
import UniversitySlider from "./UniversitySlider";

export default function TrustedUniversities() {
return ( <section
   className="
     relative
     overflow-hidden
     bg-white
     py-20
     lg:py-28
   "
 >
{/* Background Glow */}


  <div
    className="
      pointer-events-none
      absolute
      -top-40
      -left-40
      h-[420px]
      w-[420px]
      rounded-full
      bg-cyan-200/30
      blur-[120px]
    "
  />

  <div
    className="
      pointer-events-none
      absolute
      bottom-0
      right-0
      h-[420px]
      w-[420px]
      rounded-full
      bg-blue-200/20
      blur-[120px]
    "
  />

  {/* Background Grid */}

  <div
    className="
      pointer-events-none
      absolute
      inset-0
      opacity-[0.03]
      [background-image:radial-gradient(#0284c7_1px,transparent_1px)]
      [background-size:22px_22px]
    "
  />

  {/* Content */}

  <div
    className="
      relative
      z-10
      mx-auto
      max-w-[1400px]
      px-6
      lg:px-10
    "
  >
    {/* Section Header */}

    <SectionHeader />

    {/* University Slider */}

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
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        delay: 0.2,
      }}
      className="
        mt-12
        sm:mt-14
        lg:mt-16
      "
    >
      <UniversitySlider />
    </motion.div>
  </div>
</section>


);
}
