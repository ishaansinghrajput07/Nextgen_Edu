import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  MessageCircle,
} from "lucide-react";

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
    <section
      className="
        relative
        overflow-hidden
        py-24
        bg-gradient-to-b
        from-[#f8fcff]
        via-[#eef7ff]
        to-[#f8fcff]
      "
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-cyan-200/30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-100 text-cyan-700 font-semibold text-sm mb-5">
            <HelpCircle size={16} />
            Frequently Asked Questions
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Have Questions?
            <span className="block text-cyan-600">
              We've Got Answers
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-lg text-slate-600">
            Find answers to the most common questions about admissions,
            counselling, universities, eligibility, and the application process.
          </p>
        </motion.div>

        {/* FAQ Cards */}
        <div className="space-y-5">
                    {faqs.map((faq, index) => (
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
                rounded-3xl
                bg-white/75
                backdrop-blur-xl
                border
                border-cyan-100
                shadow-lg
                hover:border-cyan-300
                hover:shadow-cyan-100/60
                transition-all
                duration-300
              "
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="
                  w-full
                  px-7
                  py-6
                  flex
                  items-center
                  justify-between
                  text-left
                "
              >
                <div className="flex items-center gap-5">

                  {/* Number */}
                  <div
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-600
                      text-white
                      font-bold
                      flex
                      items-center
                      justify-center
                      shadow-md
                      flex-shrink-0
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Question */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-cyan-600 transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronDown
                  className={`w-6 h-6 text-cyan-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Animated Answer */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="px-7 pb-7 pl-[96px]">
                      <div className="border-t border-slate-200 pt-5">
                        <p className="text-slate-600 leading-7">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="
            mt-16
            rounded-[32px]
            bg-gradient-to-r
            from-cyan-600
            via-sky-600
            to-blue-700
            p-10
            text-center
            shadow-2xl
          "
        >
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          </div>

          <h3 className="text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h3>

          <p className="max-w-2xl mx-auto text-cyan-100 mb-8">
            Our admission experts are available to guide you through university
            selection, eligibility, fees, scholarships, and the complete
            admission process.
          </p>

          <button
            className="
              inline-flex
              items-center
              gap-2
              bg-white
              text-cyan-700
              font-semibold
              px-8
              py-4
              rounded-full
              shadow-lg
              hover:scale-105
              hover:shadow-xl
              transition-all
              duration-300
            "
          >
            <MessageCircle size={20} />
            Talk to an Expert
          </button>
        </motion.div>

      </div>
    </section>
  );
}
      