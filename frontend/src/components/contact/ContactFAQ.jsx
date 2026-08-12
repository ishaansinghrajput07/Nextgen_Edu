import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircleQuestion } from "lucide-react";

const ContactFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How can I get admission guidance?",
      answer:
        "You can fill out the contact form or talk with one of our counsellors. Our admission experts will guide you about courses, universities, eligibility, fees and the complete admission process.",
    },
    {
      question: "Do you help in selecting the right university?",
      answer:
        "Yes. Our counsellors consider your academic profile, career goals, preferred course, location and budget to help you shortlist suitable university options.",
    },
    {
      question: "Can I apply for multiple courses?",
      answer:
        "Yes, you can explore multiple courses and compare different options. Our counsellors can help you understand the eligibility, fees, career scope and admission requirements for each course.",
    },
    {
      question: "What documents are required for admission?",
      answer:
        "Generally, academic certificates and mark sheets, identity proof, photographs and other university-specific documents may be required. The exact requirements depend on the course and university.",
    },
    {
      question: "How long does the admission process take?",
      answer:
        "The timeline varies depending on the university, course and document verification process. Our counsellors help you complete each step and keep you informed throughout the admission journey.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* ================= SOFT BACKGROUND ================= */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />

      {/* ================= CONTAINER ================= */}

      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* ================= HEADING ================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-14"
        >
          {/* Badge */}

          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-100
              bg-cyan-50
              px-4
              py-2
              text-xs
              font-bold
              uppercase
              tracking-[0.16em]
              text-cyan-700
            "
          >
            <MessageCircleQuestion className="h-4 w-4" />
            Admission Help
          </div>

          {/* Heading */}

          <h2
            className="
              text-3xl
              font-black
              tracking-tight
              text-slate-900
              sm:text-4xl
              lg:text-5xl
            "
          >
            Frequently Asked{" "}
            <span
              className="
                bg-gradient-to-r
                from-cyan-600
                via-sky-600
                to-blue-600
                bg-clip-text
                text-transparent
              "
            >
              Questions
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-7
              text-slate-500
              sm:text-base
            "
          >
            Find answers to common questions about admissions, universities,
            courses and counselling.
          </p>
        </motion.div>

        {/* ================= FAQ LIST ================= */}

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                }}
                className={`
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-white
                  transition-all
                  duration-300
                  ${
                    isOpen
                      ? "border-cyan-200 shadow-lg shadow-cyan-100/50"
                      : "border-slate-200 shadow-sm hover:border-cyan-200 hover:shadow-md"
                  }
                `}
              >
                {/* ================= QUESTION ================= */}

                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4
                    px-4
                    py-5
                    text-left
                    sm:px-6
                    sm:py-6
                  "
                >
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    {/* Number */}

                    <span
                      className={`
                        hidden
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        text-xs
                        font-black
                        sm:flex
                        ${
                          isOpen
                            ? "bg-cyan-600 text-white"
                            : "bg-cyan-50 text-cyan-700"
                        }
                      `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}

                    <span
                      className={`
                        min-w-0
                        text-sm
                        font-bold
                        leading-6
                        sm:text-base
                        lg:text-lg
                        ${
                          isOpen
                            ? "text-cyan-700"
                            : "text-slate-800"
                        }
                      `}
                    >
                      {item.question}
                    </span>
                  </div>

                  {/* Plus / Minus */}

                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      ${
                        isOpen
                          ? "bg-cyan-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }
                    `}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </motion.div>
                </button>

                {/* ================= ANSWER ================= */}

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
                        ease: "easeInOut",
                      }}
                    >
                      <div className="px-4 pb-6 sm:px-6 sm:pb-7">
                        <div
                          className="
                            border-l-2
                            border-cyan-500
                            pl-4
                            sm:ml-[52px]
                            sm:pl-5
                          "
                        >
                          <p
                            className="
                              break-words
                              text-sm
                              leading-7
                              text-slate-600
                              sm:text-[15px]
                            "
                          >
                            {item.answer}
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

        {/* ================= BOTTOM CTA ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            mt-10
            rounded-3xl
            border
            border-cyan-100
            bg-gradient-to-r
            from-cyan-50
            via-white
            to-sky-50
            p-6
            text-center
            shadow-sm
            sm:mt-12
            sm:p-8
          "
        >
          <h3
            className="
              text-lg
              font-bold
              text-slate-900
              sm:text-xl
            "
          >
            Still have questions?
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Our admission counsellors are here to help you.
          </p>

          <a
            href="/contact"
            className="
              mt-5
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-cyan-600
              px-6
              py-3
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-cyan-600/20
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-cyan-700
            "
          >
            Talk to a Counsellor
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFAQ;