import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import HeroContent from "./HeroContent";
import { heroSlides } from "./heroData";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section
      className="
        relative
        overflow-hidden
        min-h-[720px]
        sm:min-h-[760px]
        lg:h-[92vh]
        lg:min-h-[720px]
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
          h-32
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
          mx-auto
          w-full
          max-w-[1450px]
          px-4
          sm:px-6
          lg:px-10
        "
      >
        <div
  className="
    flex
    min-h-[720px]
    items-start
    pt-32
    pb-28

    sm:min-h-[760px]
    sm:pt-28
    sm:pb-28

    lg:h-full
    lg:min-h-0
    lg:items-center
    lg:translate-y-[3px]
    lg:pt-0
    lg:pb-0
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
              "
            >
              <HeroContent slide={currentSlide} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= DOTS ================= */}

        <div
          className="
            absolute
            bottom-7
            left-1/2
            z-30
            flex
            -translate-x-1/2
            items-center
            gap-2.5
            sm:bottom-8
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
