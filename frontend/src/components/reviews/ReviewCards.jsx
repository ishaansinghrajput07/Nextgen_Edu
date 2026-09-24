import {
  Star,
  Quote,
  BadgeCheck,
  GraduationCap,
} from "lucide-react";

export default function ReviewCards({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-16 rounded-[28px] border border-dashed border-sky-200 bg-white/70 p-12 text-center backdrop-blur-xl">
        <GraduationCap
          className="mx-auto text-sky-500"
          size={52}
        />

        <h3 className="mt-5 text-2xl font-bold text-slate-900">
          No Reviews Yet
        </h3>

        <p className="mt-2 text-slate-500">
          Be the first student to share your experience.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-16">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((item) => (
          <div
            key={item._id}
            className="
              group
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-white/70
              bg-white/85
              backdrop-blur-xl
              p-5
              shadow-[0_15px_45px_rgba(14,165,233,.12)]
              transition-all
              duration-500
              hover:-translate-y-2
              hover:shadow-[0_25px_70px_rgba(14,165,233,.18)]
            "
          >
            {/* Glow */}

            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-cyan-300/20 blur-[80px] opacity-0 transition duration-500 group-hover:opacity-100" />

            {/* Quote */}

            <Quote
              size={55}
              className="absolute right-5 top-5 text-sky-500/10 transition duration-500 group-hover:scale-110"
            />

            {/* Header */}

            <div className="relative z-10 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 text-lg font-bold text-white">
                {item.name?.charAt(0).toUpperCase()}
              </div>

              <div>

                <h3 className="text-lg font-bold text-slate-900">
                  {item.name}
                </h3>

                <div className="mt-1 flex items-center gap-1">

                  <BadgeCheck
                    size={14}
                    className="text-emerald-500"
                  />

                  <span className="text-xs font-medium text-emerald-600">
                    Verified Student
                  </span>

                </div>

              </div>

            </div>

            {/* Course */}

            <div className="relative z-10 mt-4 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1.5">

              <GraduationCap
                size={16}
                className="text-sky-600"
              />

              <span className="text-sm font-semibold text-sky-700">
                {item.course}
              </span>

            </div>

            {/* Rating */}

            <div className="relative z-10 mt-4 flex gap-1">

              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={17}
                  className={
                    index < item.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  }
                />
              ))}

            </div>

            {/* Review */}

            <p className="relative z-10 mt-4 line-clamp-3 text-[15px] leading-6 text-slate-600">
              "{item.review}"
            </p>

            {/* Footer */}

            <div className="relative z-10 mt-5 flex items-center justify-between border-t border-slate-200 pt-4">

              <span className="text-xs font-medium text-slate-500">
                Student Review
              </span>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700">
                Approved
              </span>

            </div>

          </div>
        ))}
      </div>
    </section>
  );
}