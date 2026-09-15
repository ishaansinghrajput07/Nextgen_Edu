import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  MessageCircle,
} from "lucide-react";


import NEXTGENlogo from "../../assets/logo/NEXTGEN LOGO.png";

const faqs = [
  {
    question: "Is counselling completely free?",
    answer:
      "Yes. We provide 100% free admission counselling to help you choose the right university, course, and career path.",
  },
  {
    question: "How can I apply for admission?",
    answer:
      "Simply submit your enquiry, connect with our admission expert, select your university, upload the required documents, and complete your application.",
  },
  {
    question: "Which universities are available?",
    answer:
      "We partner with top UGC-approved universities across India offering Online, Distance, and Regular degree programs.",
  },
  {
    question: "Do you provide placement guidance?",
    answer:
      "Absolutely! Our experts help you choose career-oriented programs and universities with excellent placement opportunities.",
  },
  {
    question: "Can I apply from anywhere in India?",
    answer:
      "Yes. The complete admission process is online, so you can apply from anywhere in India without visiting the campus.",
  },
  {
    question: "Are the degrees UGC approved?",
    answer:
      "Yes. All universities listed on our platform are approved by UGC and other relevant regulatory bodies.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white px-[30px] py-[45px]">
      <div className="mx-auto max-w-[1500px]">

        {/* =========================
            Heading
        ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          {/* Eyebrow */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-slate-200" />

            <span className="inline-flex items-center gap-2 text-[13px] font-black uppercase tracking-[0.18em] text-[#1a4d40]">
              <HelpCircle size={16} />
              Frequently Asked Questions
            </span>

            <span className="h-px w-10 bg-slate-200" />
          </div>

          {/* Heading */}
          <h2 className="text-[38px] font-black leading-tight tracking-tight text-slate-950 md:text-[46px] lg:text-[52px]">
            Have Questions?
            <span className="block 

text-[#131371]">
              We've Got Answers
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl text-[15px] font-semibold leading-7 text-slate-500 md:text-[16px]">
            Find answers to the most common questions about admissions,
            counselling, universities, eligibility, and the application
            process.
          </p>
        </motion.div>

        {/* =========================
            FAQ Grid
        ========================= */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.4,
                }}
                className="
                  group
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                  transition-all
                  duration-300
                  hover:border-teal-200
                  hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]
                "
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4
                    px-5
                    py-4
                    text-left
                  "
                >
                  <div className="flex min-w-0 items-center gap-4">

                    {/* Number */}
                    <div
                      className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        text-[12px]
                        font-black
                        transition-all
                        duration-300
                        ${
                          index === 0
                            ? "border-blue-100 bg-blue-50 text-blue-600"
                            : index === 1
                            ? "border-violet-100 bg-violet-50 text-violet-600"
                            : index === 2
                            ? "border-orange-100 bg-orange-50 text-orange-600"
                            : index === 3
                            ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                            : index === 4
                            ? "border-rose-100 bg-rose-50 text-rose-600"
                            : "border-teal-100 bg-teal-50 text-teal-700"
                        }
                      `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Question Text */}
                    <h3
                      className={`
                        text-[15px]
                        font-black
                        leading-6
                        tracking-tight
                        transition-colors
                        duration-300
                        md:text-[16px]
                        ${
                          isOpen
                            ? "text-teal-700"
                            : "text-slate-950 group-hover:text-teal-700"
                        }
                      `}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  {/* Arrow */}
                  <ChevronDown
                    className={`
                      h-5
                      w-5
                      shrink-0
                      text-teal-700
                      transition-transform
                      duration-300
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pl-20">
                        <div className="border-t border-slate-100 pt-4">
                          <p className="text-[14px] font-semibold leading-6 text-slate-500">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* =========================
            Bottom CTA
        ========================= */}
        <motion.div
  initial={{ opacity: 0, y: 35 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.3 }}
  className="
    mt-10
    rounded-3xl
    bg-slate-950
    px-6
    py-7
    shadow-[0_16px_50px_rgba(15,23,42,0.12)]
    md:px-8
  "
>
  <div
    className="
      flex
      flex-col
      items-center
      gap-6
      md:flex-row
      md:items-center
      md:justify-between
    "
  >
    {/* =========================
        Company Logo
    ========================= */}
    <div className="flex shrink-0 items-center justify-center">
      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          border
          border-slate-800
          bg-white
          p-2
        "
      >
        <img
          src={NEXTGENlogo}
          alt="Company Logo"
          className="h-full w-full object-contain"
        />
      </div>
    </div>

    {/* =========================
        Text
    ========================= */}
    <div className="min-w-0 flex-1 text-center md:text-left">
      <h3
        className="
          text-[24px]
          font-black
          leading-tight
          tracking-tight
          text-white
          md:text-[28px]
        "
      >
        Still Have Questions?
      </h3>

      <p
        className="
          mt-2
          max-w-3xl
          text-[13px]
          font-semibold
          leading-6
          text-slate-400
          md:text-[14px]
        "
      >
        Our admission experts are available to guide you through
        university selection, eligibility, fees, scholarships, and the
        complete admission process.
      </p>
    </div>

    {/* =========================
        CTA Button
    ========================= */}
    <div className="shrink-0">
      <button
        type="button"
        className="
          inline-flex
          items-center
          gap-3
          whitespace-nowrap
          rounded-xl
          bg-yellow-400
          px-6
          py-3
          text-[13px]
          font-black
          text-black
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-yellow-300
          hover:shadow-md
        "
      >
        Talk to an Expert

        <span
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            bg-slate-950
            text-sm
            text-white
          "
        >
          →
        </span>
      </button>
    </div>
  </div>
</motion.div>

      </div>
    </section>
  );
}