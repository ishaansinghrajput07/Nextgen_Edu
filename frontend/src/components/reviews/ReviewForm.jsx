import { User, GraduationCap, MessageSquare, Star } from "lucide-react";

export default function ReviewForm({
  formData,
  setFormData,
  handleSubmit,
}) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[40px]
        border
        border-white/70
        bg-white/80
        backdrop-blur-2xl
        p-6 lg:p-7
        shadow-[0_30px_80px_rgba(14,165,233,.15)]
      "
    >
      {/* Background Glow */}

      <div className="absolute -top-24 -right-20 h-60 w-60 rounded-full bg-cyan-300/20 blur-[120px]" />

      <div className="absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-sky-300/20 blur-[120px]" />

      <div className="relative z-10">
        {/* Heading */}

        <span className="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
          Student Feedback
        </span>

        <h2 className="mt-3 text-3xl lg:text-[34px] font-black text-slate-900 leading-tight">
          Share Your Experience
        </h2>

       <p className="mt-2 text-[15px] leading-6 text-slate-600">
          Your review helps thousands of students choose the right university
          and inspires others to achieve their career goals.
        </p>

        {/* Form */}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Name */}

          <div className="relative">
            <User
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-sky-500"
            />

            <input
              type="text"
              required
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="
                h-[54px]
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                pl-14
                pr-5
                text-slate-800
                outline-none
                transition-all
                focus:border-sky-500
                focus:ring-4
                focus:ring-sky-100
              "
            />
          </div>

          {/* Course */}

          <div className="relative">
            <GraduationCap
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-sky-500"
            />

            <input
              type="text"
              required
              placeholder="Course Name"
              value={formData.course}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  course: e.target.value,
                })
              }
              className="
                h-16
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                pl-14
                pr-5
                text-slate-800
                outline-none
                transition-all
                focus:border-sky-500
                focus:ring-4
                focus:ring-sky-100
              "
            />
          </div>

          {/* Review */}

          <div className="relative">
            <MessageSquare
              size={20}
              className="absolute left-5 top-6 text-sky-500"
            />

            <textarea
              rows={4}
              required
              placeholder="Write your experience..."
              value={formData.review}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  review: e.target.value,
                })
              }
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                pl-14
                pr-5
                pt-4
                pb-4
                text-slate-800
                outline-none
                transition-all
                resize-none
                focus:border-sky-500
                focus:ring-4
                focus:ring-sky-100
              "
            />
          </div>

          {/* Rating */}

          <div>
            <label className="font-semibold text-slate-800">
              Rate Your Experience
            </label>

            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      rating: star,
                    })
                  }
                  className="
                    transition-all
                    duration-300
                    hover:scale-125
                  "
                >
                  <Star
                    size={30}
                    className={
                      star <= formData.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-300"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Button */}

          <button
            type="submit"
            className="
              group
              flex
              h-14
              w-full
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-sky-500
              to-cyan-500
              text-base
              font-bold
              text-white
              shadow-[0_20px_40px_rgba(14,165,233,.30)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_25px_60px_rgba(14,165,233,.45)]
            "
          >
            Submit Review

            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}