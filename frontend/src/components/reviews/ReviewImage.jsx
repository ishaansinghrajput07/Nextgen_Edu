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

      {/* Background Glow */}

      <div className="absolute -top-10 left-10 h-60 w-60 rounded-full bg-cyan-300/20 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-300/20 blur-[140px]" />

      {/* Main Container */}

      <div className="relative flex items-center justify-center">

        {/* Image */}

        <img
          src={review}
          alt="Students"
          className="
            relative
            z-10
            w-full
           max-w-[700px] lg:max-w-[760px]
            object-contain
            transition-all
            duration-700
            hover:scale-105
          "
        />

        {/* Rating Card */}

        <div
          className="
            absolute
           left-1
-top-16
            z-20
            rounded-3xl
            border
            border-white/70
            bg-white/90
            px-5
            py-4
            shadow-2xl
            backdrop-blur-xl
            transition
            duration-500
            hover:-translate-y-2
          "
        >

          <div className="flex items-center gap-2">

            <Star
              className="fill-yellow-400 text-yellow-400"
              size={20}
            />

            <h4 className="font-bold text-slate-900">

              4.9 Rating

            </h4>

          </div>

          <p className="mt-2 text-sm text-slate-500">

            Based on 15,000+ Reviews

          </p>

        </div>

        {/* University Card */}

        <div
          className="
            absolute
            -right-6
-top-25
            z-20
            rounded-3xl
            border
            border-white/70
            bg-white/90
            p-5
            shadow-2xl
            backdrop-blur-xl
            transition
            duration-500
            hover:-translate-y-2
          "
        >

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100">

              <GraduationCap
                className="text-sky-600"
                size={28}
              />

            </div>

            <div>

              <h3 className="text-3xl font-black">

                250+

              </h3>

              <p className="text-sm text-slate-500">

                Universities

              </p>

            </div>

          </div>

        </div>
                {/* Verified Card */}

        <div
          className="
            absolute
            -left-14
bottom-32
            z-20
            rounded-3xl
            border
            border-white/70
            bg-white/90
            px-5
            py-4
            backdrop-blur-xl
            shadow-2xl
            transition-all
            duration-500
            hover:-translate-y-2
            hover:shadow-cyan-200/60
          "
        >
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">

              <BadgeCheck
                className="text-emerald-500"
                size={26}
              />

            </div>

            <div>

              <h4 className="font-bold text-slate-900">
                Verified
              </h4>

              <p className="text-sm text-slate-500">
                Trusted Platform
              </p>

            </div>

          </div>
        </div>

        {/* Students Card */}

        <div
          className="
            absolute
            -right-10
          bottom-20

            z-20
            rounded-3xl
            border
            border-white/70
            bg-white/90
            px-6
            py-5
            backdrop-blur-xl
            shadow-2xl
            transition-all
            duration-500
            hover:-translate-y-2
            hover:shadow-cyan-200/60
          "
        >
          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100">

              <Users
                className="text-sky-600"
                size={25}
              />

            </div>

            <div>

              <h3 className="text-3xl font-black text-slate-700">
                15,000+
              </h3>

              <p className="text-sm text-slate-300">
                Students Guided
              </p>

            </div>

          </div>

        </div>

        {/* Decorative Elements */}

        <div className="absolute top-20 right-24 h-4 w-4 rounded-full bg-cyan-400 animate-pulse" />

        <div className="absolute bottom-32 left-1/2 h-3 w-3 rounded-full bg-sky-500 animate-ping" />

        <div className="absolute top-1/2 right-8 h-16 w-16 rounded-full border border-cyan-300/40" />

        <div className="absolute left-10 top-1/2 h-20 w-20 rounded-full bg-sky-300/20 blur-2xl" />

        <div className="absolute right-0 bottom-20 h-24 w-24 rounded-full bg-cyan-300/20 blur-3xl" />

      </div>

    </div>
  );
}