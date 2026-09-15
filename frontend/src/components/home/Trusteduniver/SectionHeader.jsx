import { motion } from "framer-motion";

export default function SectionHeader() {
  return (
    <section className="w-full bg-white px-[30px] pt-[45px] pb-0">
      <div className="w-full mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="w-full text-center"
        >
          {/* Subtitle with Lines */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-slate-400" />

            <p className="text-[14px] font-[900] uppercase tracking-[0.18em] text-[#1a4d40]">
              Trusted Network
            </p>

            <span className="h-px w-10 bg-slate-400" />
          </div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-[38px] font-[900] leading-[1.1] tracking-[-0.025em] text-slate-950 sm:text-[46px] lg:text-[52px]"
          >
            A Network You Can Trust.
            <span className="block font-[900] text-[#131371]">
              A Future You Can Build.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-5 max-w-3xl text-[15px] font-semibold leading-7 text-slate-500 sm:text-[16px]"
          >
            We collaborate with India's leading universities to deliver
            trusted admission guidance, scholarship opportunities, personalized
            counselling, and a seamless enrollment experience that helps every
            student build a brighter future.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}