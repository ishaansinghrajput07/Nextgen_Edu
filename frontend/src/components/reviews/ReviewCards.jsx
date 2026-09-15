import {
  Star,
  Quote,
  BadgeCheck,
  GraduationCap,
} from "lucide-react";

export default function ReviewCards({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-[0_12px_40px_rgba(15,23,42,0.05)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50">
          <GraduationCap
            className="text-teal-700"
            size={28}
          />
        </div>

        <h3 className="mt-5 text-2xl font-black text-slate-950">
          No Reviews Yet
        </h3>

        <p className="mt-2 text-[14px] font-semibold leading-6 text-slate-500">
          Be the first student to share your experience.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-10 bg-white">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((item) => (
          <div
            key={item._id}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-[0_8px_30px_rgba(15,23,42,0.05)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-teal-200
              hover:shadow-[0_16px_40px_rgba(15,23,42,0.09)]
            "
          >
            {/* Quote */}
            <Quote
              size={48}
              className="
                absolute
                right-5
                top-5
                text-teal-700/10
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />

            {/* Header */}
            <div className="relative z-10 flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-teal-50
                  text-[15px]
                  font-black
                  text-teal-700
                "
              >
                {item.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3 className="text-[16px] font-black text-slate-950">
                  {item.name}
                </h3>

                <div className="mt-1 flex items-center gap-1">
                  <BadgeCheck
                    size={13}
                    className="text-teal-700"
                  />

                  <span className="text-[11px] font-bold text-teal-700">
                    Verified Student
                  </span>
                </div>
              </div>
            </div>

            {/* Course */}
            <div
              className="
                relative
                z-10
                mt-4
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-teal-100
                bg-teal-50
                px-3
                py-1.5
              "
            >
              <GraduationCap
                size={15}
                className="text-teal-700"
              />

              <span className="text-[12px] font-black text-teal-700">
                {item.course}
              </span>
            </div>

            {/* Rating */}
            <div className="relative z-10 mt-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={
                    index < item.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  }
                />
              ))}
            </div>

            {/* Review */}
            <p className="relative z-10 mt-4 line-clamp-3 text-[14px] font-semibold leading-6 text-slate-500">
              "{item.review}"
            </p>

            {/* Footer */}
            <div className="relative z-10 mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
              <span className="text-[11px] font-bold text-slate-500">
                Student Review
              </span>

              <span className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-[10px] font-black text-teal-700">
                Approved
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}