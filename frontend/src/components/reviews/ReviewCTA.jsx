import { ArrowRight, PhoneCall } from "lucide-react";

export default function ReviewCTA() {
  return (
    <section className="mt-12 bg-white">
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-slate-950
          px-6
          py-10
          text-white
          md:px-10
          md:py-12
        "
      >
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Icon */}
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-white/10
              bg-white/5
            "
          >
            <PhoneCall
              size={22}
              className="text-teal-400"
            />
          </div>

          {/* Heading */}
          <h2 className="mt-5 text-[30px] font-black leading-tight tracking-tight text-white md:text-4xl">
            Start Your{" "}
            <span className="text-teal-400">
              Dream Career
            </span>{" "}
            Today.
          </h2>

          {/* Description */}
          <p className="mt-3 max-w-xl text-[15px] font-semibold leading-7 text-slate-400">
            Get expert counselling and secure admission in India's top
            universities with personalized guidance.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              className="
                group
                flex
                items-center
                gap-3
                rounded-xl
                bg-yellow-400
                px-5
                py-3
                text-[13px]
                font-black
                text-slate-950
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-yellow-300
              "
            >
              Book Free Counselling

              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-950
                  text-white
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                <ArrowRight size={14} />
              </span>
            </button>

            <button
              className="
                rounded-xl
                border
                border-white/15
                bg-white/5
                px-5
                py-3
                text-[13px]
                font-black
                text-white
                transition-all
                duration-300
                hover:border-teal-400/40
                hover:bg-white/10
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