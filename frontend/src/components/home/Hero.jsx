import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import HeroContent from "./HeroContent";
import { heroSlides } from "./heroData";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  // ================= AUTO SLIDE =================
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 40000);

    return () => clearTimeout(timer);
  }, [activeSlide]);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        min-h-[620px]
        sm:min-h-[680px]
        lg:h-[calc(100vh-80px)]
        lg:min-h-[600px]
        xl:min-h-[620px]
        bg-slate-900
      "
    >
      {/* ================= BACKGROUND ================= */}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{
            opacity: 0,
            scale: 1.05,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="absolute inset-0"
        >
          <div
            className="
              h-full
              w-full
              bg-cover
              bg-center
              bg-no-repeat
            "
            style={{
              backgroundImage: `url(${currentSlide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ================= PREMIUM OVERLAY ================= */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#081a34]/90
          via-[#0d2746]/55
          to-transparent
        "
      />

      <div className="absolute inset-0 bg-black/5" />

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-24
          bg-gradient-to-t
          from-black/35
          to-transparent
        "
      />

      {/* ================= CONTENT ================= */}

      <div
        className="
          relative
          z-20
          flex
          h-full
          w-full
          items-center
          px-[30px]
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{
              opacity: 0,
              x: -60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -30,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              w-full
              max-w-4xl
              py-16
              sm:py-20
              lg:py-10
            "
          >
            <HeroContent slide={currentSlide} />
          </motion.div>
        </AnimatePresence>

        {/* ================= DOTS ================= */}

        <div
          className="
            absolute
            bottom-5
            left-1/2
            z-30
            flex
            -translate-x-1/2
            items-center
            gap-2.5
            sm:bottom-6
            sm:gap-3
          "
        >
          {heroSlides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveSlide(index)}
              className={`
                rounded-full
                transition-all
                duration-300
                ${
                  activeSlide === index
                    ? "h-2.5 w-9 bg-cyan-400 sm:w-10"
                    : "h-2.5 w-2.5 bg-white/50 hover:bg-white"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}