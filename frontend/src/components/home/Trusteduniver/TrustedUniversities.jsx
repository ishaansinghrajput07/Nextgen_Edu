import { motion } from "framer-motion";

import SectionHeader from "./SectionHeader";
import UniversitySlider from "./UniversitySlider";

export default function TrustedUniversities() {
  return (
    <section
      className="
relative
overflow-hidden
py-24
bg-gradient-to-br
from-white
via-sky-50
to-cyan-50
"
    >
      {/* Background Blur */}

      <div
        className="
absolute
-top-40
-left-40
w-[420px]
h-[420px]
rounded-full
bg-cyan-200/30
blur-[120px]
"
      />

      <div
        className="
absolute
bottom-0
right-0
w-[420px]
h-[420px]
rounded-full
bg-blue-200/20
blur-[120px]
"
      />

      {/* Grid */}

      <div
        className="
absolute
inset-0
opacity-[0.03]
[background-image:radial-gradient(#0284c7_1px,transparent_1px)]
[background-size:22px_22px]
"
      />

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
        <SectionHeader />

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
            duration: .8,
            delay: .2,
          }}
          className="mt-16"
        >
          <UniversitySlider />
        </motion.div>
      </div>
    </section>
  );
}