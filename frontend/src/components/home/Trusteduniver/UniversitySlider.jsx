import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import UniversityCard from "./UniversityCard";
import { getTrustedUniversities } from "../../../services/universityService";

export default function UniversitySlider() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);

        const res = await getTrustedUniversities();

        setUniversities(res.universities || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Infinite Slider
  const sliderData =
    universities.length > 0
      ? [...universities, ...universities]
      : [];

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="h-10 w-10 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative mt-14 overflow-hidden">
      {/* Left Fade */}
      <div
        className="
absolute
left-0
top-0
z-20
h-full
w-24
bg-gradient-to-r
from-white
via-white/80
to-transparent
pointer-events-none
"
      />

      {/* Right Fade */}
      <div
        className="
absolute
right-0
top-0
z-20
h-full
w-24
bg-gradient-to-l
from-white
via-white/80
to-transparent
pointer-events-none
"
      />

      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-6 w-max"
      >
        {sliderData.map((item, index) => (
          <UniversityCard
            key={`${item._id}-${index}`}
            university={item}
          />
        ))}
      </motion.div>
    </div>
  );
}