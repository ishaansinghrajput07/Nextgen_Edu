import { Star } from "lucide-react";

export default function ReviewHero() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        px-6
        py-10
        shadow-[0_12px_40px_rgba(15,23,42,0.06)]
        md:px-10
        lg:py-12
      "
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-slate-300" />

          <span className="inline-flex items-center gap-2 text-[14px] font-black uppercase tracking-[0.18em] text-teal-700">
            <Star
              size={15}
              className="fill-yellow-400 text-yellow-400"
            />
            Student Reviews
          </span>

          <span className="h-px w-10 bg-slate-300" />
        </div>

        {/* Heading */}
        <h2
          className="
            mt-4
            text-[38px]
            font-black
            leading-[1.12]
            tracking-tight
            text-slate-950
            md:text-[46px]
            lg:text-[52px]
          "
        >
          Student{" "}
          <span className="text-teal-700">
            Success Stories.
          </span>
        </h2>

        {/* Subtitle */}
        <p
          className="
            mx-auto
            mt-4
            max-w-2xl
            text-[15px]
            font-semibold
            leading-7
            text-slate-500
            md:text-[16px]
          "
        >
          Discover how thousands of students secured admissions in
          India's top universities through expert counselling,
          personalized guidance, and a seamless admission process.
        </p>
      </div>
    </div>
  );
}