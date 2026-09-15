import {
  User,
  GraduationCap,
  MessageSquare,
  Star,
  ArrowRight,
} from "lucide-react";

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
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-[0_12px_40px_rgba(15,23,42,0.06)]
        lg:p-7
      "
    >
      <div className="relative z-10">
        {/* Heading */}
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-slate-300" />

          <span className="text-[13px] font-black uppercase tracking-[0.16em] text-teal-700">
            Student Feedback
          </span>

          <span className="h-px w-8 bg-slate-300" />
        </div>

        <h2 className="mt-4 text-[30px] font-black leading-tight tracking-tight text-slate-950 lg:text-[34px]">
          Share Your Experience.
        </h2>

        <p className="mt-3 text-[15px] font-semibold leading-7 text-slate-500">
          Your review helps thousands of students choose the right
          university and inspires others to achieve their career goals.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          {/* Name */}
          <div className="relative">
            <User
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-teal-700
              "
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
                h-[52px]
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                pl-12
                pr-4
                text-[14px]
                font-semibold
                text-slate-800
                outline-none
                placeholder:text-slate-400
                transition-all
                focus:border-teal-500
                focus:ring-4
                focus:ring-teal-50
              "
            />
          </div>

          {/* Course */}
          <div className="relative">
            <GraduationCap
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-teal-700
              "
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
                h-[52px]
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                pl-12
                pr-4
                text-[14px]
                font-semibold
                text-slate-800
                outline-none
                placeholder:text-slate-400
                transition-all
                focus:border-teal-500
                focus:ring-4
                focus:ring-teal-50
              "
            />
          </div>

          {/* Review */}
          <div className="relative">
            <MessageSquare
              size={18}
              className="absolute left-4 top-4 text-teal-700"
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
                resize-none
                rounded-xl
                border
                border-slate-200
                bg-white
                pl-12
                pr-4
                pt-4
                text-[14px]
                font-semibold
                leading-6
                text-slate-800
                outline-none
                placeholder:text-slate-400
                transition-all
                focus:border-teal-500
                focus:ring-4
                focus:ring-teal-50
              "
            />
          </div>

          {/* Rating */}
          <div>
            <label className="text-[13px] font-black text-slate-950">
              Rate Your Experience
            </label>

            <div className="mt-2 flex gap-1.5">
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
                    transition-transform
                    duration-200
                    hover:scale-110
                  "
                >
                  <Star
                    size={26}
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

          {/* Submit */}
          <button
            type="submit"
            className="
              group
              mt-1
              flex
              h-[52px]
              w-full
              items-center
              justify-center
              gap-3
              rounded-xl
              bg-yellow-400
              text-[13px]
              font-black
              text-slate-950
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-yellow-300
            "
          >
            Submit Review

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
        </form>
      </div>
    </div>
  );
}