import {
  Star,
  GraduationCap,
  BadgeCheck,
  Users,
} from "lucide-react";

import review from "../../assets/logo/review.png";

export default function ReviewImage() {
  return (
    <div className="relative flex justify-center">
      <div className="relative flex w-full items-center justify-center">
        {/* Image */}
        <img
          src={review}
          alt="Students"
          className="
            relative
            z-10
            w-full
            max-w-[700px]
            object-contain
            transition-transform
            duration-500
            hover:scale-[1.02]
          "
        />

        {/* Rating Card */}
        <div
          className="
            absolute
            left-0
            top-4
            z-20
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            shadow-[0_12px_35px_rgba(15,23,42,0.08)]
            transition-all
            duration-300
            hover:-translate-y-1
          "
        >
          <div className="flex items-center gap-2">
            <Star
              className="fill-yellow-400 text-yellow-400"
              size={18}
            />

            <h4 className="text-[13px] font-black text-slate-950">
              4.9 Rating
            </h4>
          </div>

          <p className="mt-1.5 text-[12px] font-semibold text-slate-500">
            Based on 15,000+ Reviews
          </p>
        </div>

        {/* University Card */}
        <div
          className="
            absolute
            right-0
            top-10
            z-20
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-[0_12px_35px_rgba(15,23,42,0.08)]
            transition-all
            duration-300
            hover:-translate-y-1
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                border-teal-100
                bg-teal-50
              "
            >
              <GraduationCap
                className="text-teal-700"
                size={24}
              />
            </div>

            <div>
              <h3 className="text-2xl font-black leading-none text-slate-950">
                250+
              </h3>

              <p className="mt-1 text-[12px] font-semibold text-slate-500">
                Universities
              </p>
            </div>
          </div>
        </div>

        {/* Verified Card */}
        <div
          className="
            absolute
            bottom-20
            left-0
            z-20
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            shadow-[0_12px_35px_rgba(15,23,42,0.08)]
            transition-all
            duration-300
            hover:-translate-y-1
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-teal-100
                bg-teal-50
              "
            >
              <BadgeCheck
                className="text-teal-700"
                size={23}
              />
            </div>

            <div>
              <h4 className="text-[13px] font-black text-slate-950">
                Verified
              </h4>

              <p className="mt-1 text-[12px] font-semibold text-slate-500">
                Trusted Platform
              </p>
            </div>
          </div>
        </div>

        {/* Students Card */}
        <div
          className="
            absolute
            bottom-8
            right-0
            z-20
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-4
            py-4
            shadow-[0_12px_35px_rgba(15,23,42,0.08)]
            transition-all
            duration-300
            hover:-translate-y-1
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                border-teal-100
                bg-teal-50
              "
            >
              <Users
                className="text-teal-700"
                size={23}
              />
            </div>

            <div>
              <h3 className="text-2xl font-black leading-none text-slate-950">
                15,000+
              </h3>

              <p className="mt-1 text-[12px] font-semibold text-slate-500">
                Students Guided
              </p>
            </div>
          </div>
        </div>

        {/* Small Decorative Element */}
        <div className="absolute right-16 top-16 h-3 w-3 rounded-full bg-teal-400" />

        <div className="absolute bottom-24 left-1/2 h-2.5 w-2.5 rounded-full bg-yellow-400" />

        <div className="absolute right-5 top-1/2 h-12 w-12 rounded-full border border-teal-100" />

        <div className="absolute left-8 top-1/2 h-14 w-14 rounded-full border border-slate-100" />
      </div>
    </div>
  );
}