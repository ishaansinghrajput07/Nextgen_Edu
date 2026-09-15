import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import UniversitySlider from "./UniversitySlider";

export default function TrustedUniversities() {
  return (
    <section className="w-full bg-white py-[45px] px-[30px] overflow-hidden">
      <div className="w-full mx-auto max-w-7xl">
        {/* Section Header */}
        <SectionHeader />

       
       <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.7, delay: 0.2 }}
  className="mt-[20px]"
>
  <UniversitySlider />
</motion.div>
      </div>
    </section>
  );
}