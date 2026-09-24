import { ArrowRight, PhoneCall } from "lucide-react";

export default function ReviewCTA() {
  return (
    <section className="mt-16">
      <div
        className="
          relative
          overflow-hidden
          rounded-[32px]
          bg-gradient-to-r
          from-sky-600
          via-cyan-500
          to-blue-600
          px-6
          py-10
          text-white
          shadow-[0_25px_70px_rgba(14,165,233,.25)]
        "
      >
        {/* Background Glow */}

        <div className="absolute -top-16 -left-16 h-44 w-44 rounded-full bg-white/10 blur-[90px]" />

        <div className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-white/10 blur-[90px]" />

        {/* Decorative */}

        <div className="absolute right-10 top-10 h-3 w-3 rounded-full bg-white/50" />

        <div className="absolute left-16 bottom-10 h-2 w-2 rounded-full bg-white/40" />

        <div className="relative z-10 flex flex-col items-center text-center">

          {/* Icon */}

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-xl border border-white/20">

            <PhoneCall size={28} />

          </div>

          {/* Heading */}

          <h2 className="mt-5 text-3xl font-black md:text-4xl">
            Start Your Dream Career Today
          </h2>

          {/* Description */}

          <p className="mt-3 max-w-xl text-[15px] leading-7 text-sky-100">
            Get expert counselling and secure admission in India's top
            universities with personalized guidance.
          </p>

          {/* Buttons */}

          <div className="mt-7 flex flex-wrap justify-center gap-4">

            <button
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-white
                px-6
                py-3
                font-semibold
                text-sky-700
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              Book Free Counselling

              <ArrowRight size={18} />

            </button>

            <button
              className="
                rounded-xl
                border
                border-white/30
                bg-white/10
                px-6
                py-3
                font-semibold
                backdrop-blur-xl
                transition-all
                duration-300
                hover:bg-white/20
              "
            >
              Explore Universities
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}