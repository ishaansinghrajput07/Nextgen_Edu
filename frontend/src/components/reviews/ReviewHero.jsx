import { Star } from "lucide-react";

export default function ReviewHero() {
  return (
    <div className="relative overflow-hidden rounded-[40px] border border-white/70 bg-gradient-to-br from-sky-50 via-white to-cyan-50 px-8 py-12 lg:py-8 shadow-[0_30px_80px_rgba(14,165,233,.12)]">

      {/* Blur Circle */}
      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-[120px]" />

      <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-sky-300/20 blur-[130px]" />

      {/* Dot Pattern */}
      <div className="absolute left-10 top-14 opacity-20">

        <div className="grid grid-cols-6 gap-2">

          {Array.from({ length: 36 }).map((_, i) => (

            <span
              key={i}
              className="h-2 w-2 rounded-full bg-sky-500"
            />

          ))}

        </div>

      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">

        {/* Badge */}

        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 shadow-lg">

          <Star
            className="fill-yellow-400 text-yellow-400"
            size={18}
          />

          <span className="font-semibold text-sky-700">

            Trusted by 15,000+ Students

          </span>

        </div>

        {/* Heading */}

        <h2 className="mt-5 text-4xl md:text-5xl font-black leading-tight text-slate-900">

          Student{" "}

          <span className="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">

            Success Stories

          </span>

        </h2>

        {/* Subtitle */}

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">

          Discover how thousands of students secured admissions in
          India's top universities through expert counselling,
          personalized guidance, and a seamless admission process.

        </p>

      </div>
    </div>
  );
}