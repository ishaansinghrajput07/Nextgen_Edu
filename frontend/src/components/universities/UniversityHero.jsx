import { Link } from "react-router-dom";
import {
  Home,
  ChevronRight,
  Search,
  Building2,
  GraduationCap,
  Trophy,
  MapPin,
} from "lucide-react";

import  home from "../../assets/logo/home.png"
export default function UniversityHero({
  search,
  setSearch,
  totalUniversities = 0,
}) {
  return (
    <section
      className="
      relative
      overflow-hidden

      bg-gradient-to-br
      from-sky-50
      via-white
      to-cyan-50
      "
    >
      {/* ================= Blur Background ================= */}

      {/* <div
        className="
        absolute
        -top-44
        -left-44

        w-[520px]
        h-[520px]

        rounded-full

        bg-cyan-200/30

        blur-[120px]
        "
      /> */}

      {/* <div
        className="
        absolute
        top-32
        right-0

        w-[420px]
        h-[420px]

        rounded-full

        bg-blue-200/20

        blur-[120px]
        "
      /> */}

      {/* <div
        className="
        absolute
        bottom-0
        left-1/2

        -translate-x-1/2

        w-[700px]
        h-[320px]

        rounded-full

        bg-sky-100/40

        blur-[120px]
        "
      /> */}

      {/* Grid Pattern */}

      <div
        className="
        absolute
        inset-0

        opacity-[0.04]

        [background-image:radial-gradient(#0284c7_1px,transparent_1px)]
        [background-size:24px_24px]
        "
      />

      <div
        className="
        relative
        z-10

        max-w-[1400px]

        mx-auto

        px-6
        lg:px-10

        pt-28
        pb-16
        "
      >
        <div
          className="
          grid

          lg:grid-cols-2

          gap-14

          items-center
          "
        >
          {/* ================= LEFT ================= */}

          <div>
            {/* Breadcrumb */}

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Home size={15} />

              <Link
                to="/"
                className="transition hover:text-cyan-600"
              >
                Home
              </Link>

              <ChevronRight size={15} />

              <span className="font-semibold text-cyan-600">
                Universities
              </span>
            </div>

            {/* Heading */}

            <h1
              className="
              mt-5

              text-4xl
              lg:text-5xl

              font-black

              leading-tight

              text-slate-900
              "
            >
              Find Your

              <span
                className="
                block

                bg-gradient-to-r

                from-cyan-600
                via-blue-600
                to-indigo-600

                bg-clip-text

                text-transparent
                "
              >
                Dream University
              </span>
            </h1>

            {/* Description */}

            <p
              className="
              mt-5

              max-w-xl

              text-lg

              leading-8

              text-slate-600
              "
            >
              Compare India's top universities with verified information,
              affordable fees, placements, scholarships and expert admission
              guidance — all in one platform.
            </p>
                      {/* ================= Search Box ================= */}

          <div
            className="
            mt-7

            flex

            rounded-2xl

            bg-white

            p-2

            shadow-xl

            border
            border-slate-100
            "
          >

            <div
              className="
              flex-1

              flex
              items-center

              gap-3

              px-4
              "
            >

              <Search
                size={20}
                className="text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search university..."
                className="
                w-full

                bg-transparent

                outline-none

                text-slate-700
                "
              />

            </div>

            <button
              className="
              rounded-xl

              bg-gradient-to-r
              from-cyan-500
              to-blue-600

              px-7

              text-white

              font-semibold

              transition-all

              hover:shadow-lg
              "
            >
              Search
            </button>

          </div>

          {/* ================= Small Stats ================= */}

          <div
            className="
            mt-8

            grid

            grid-cols-2
            lg:grid-cols-4

            gap-3
            "
          >

            {/* Universities */}

            <div
              className="
              flex
              items-center

              gap-3

              rounded-2xl

              bg-white/70

              backdrop-blur-xl

              border
              border-white/60

              px-4
              py-3

              shadow-md
              "
            >

              <div
                className="
                flex

                h-11
                w-11

                items-center
                justify-center

                rounded-xl

                bg-cyan-100
                "
              >

                <Building2
                  size={20}
                  className="text-cyan-700"
                />

              </div>

              <div>

                <h3 className="text-lg font-black text-slate-900">
                  {totalUniversities}+
                </h3>

                <p className="text-xs text-slate-600">
                  Universities
                </p>

              </div>

            </div>

            {/* Courses */}

            <div
              className="
              flex
              items-center

              gap-3

              rounded-2xl

              bg-white/70

              backdrop-blur-xl

              border
              border-white/60

              px-4
              py-3

              shadow-md
              "
            >

              <div
                className="
                flex

                h-11
                w-11

                items-center
                justify-center

                rounded-xl

                bg-blue-100
                "
              >

                <GraduationCap
                  size={20}
                  className="text-blue-700"
                />

              </div>

              <div>

                <h3 className="text-lg font-black text-slate-900">
                  1500+
                </h3>

                <p className="text-xs text-slate-600">
                  Courses
                </p>

              </div>

            </div>
                        {/* Placement */}

            <div
              className="
              flex
              items-center

              gap-3

              rounded-2xl

              bg-white/70

              backdrop-blur-xl

              border
              border-white/60

              px-4
              py-3

              shadow-md
              "
            >

              <div
                className="
                flex

                h-11
                w-11

                items-center
                justify-center

                rounded-xl

                bg-amber-100
                "
              >

                <Trophy
                  size={20}
                  className="text-amber-600"
                />

              </div>

              <div>

                <h3 className="text-lg font-black text-slate-900">
                  98%
                </h3>

                <p className="text-xs text-slate-600">
                  Placement
                </p>

              </div>

            </div>

            {/* Cities */}

            <div
              className="
              flex
              items-center

              gap-3

              rounded-2xl

              bg-white/70

              backdrop-blur-xl

              border
              border-white/60

              px-4
              py-3

              shadow-md
              "
            >

              <div
                className="
                flex

                h-11
                w-11

                items-center
                justify-center

                rounded-xl

                bg-emerald-100
                "
              >

                <MapPin
                  size={20}
                  className="text-emerald-600"
                />

              </div>

              <div>

                <h3 className="text-lg font-black text-slate-900">
                  50+
                </h3>

                <p className="text-xs text-slate-600">
                  Cities
                </p>

              </div>

            </div>

          </div>

          {/* ================= Feature Pills ================= */}

          <div className="mt-8 flex flex-wrap gap-3">

            {[
              "🎓 NAAC Accredited",
              "🏛 UGC Approved",
              "💼 Placement Support",
            ].map((item) => (

              <span
                key={item}
                className="
                rounded-full

                bg-white/80

                backdrop-blur-xl

                border
                border-slate-200

                px-4
                py-2

                text-sm

                font-medium

                text-slate-700

                shadow-sm
                "
              >
                {item}
              </span>

            ))}

          </div>

        </div>
      



{/* ================= RIGHT SIDE ================= */}

<div className="relative flex justify-center items-center">

  {/* Main Glow */}
  {/* <div
    className="
    absolute
    w-[560px]
    h-[560px]
    rounded-full
   bg-cyan-200/40
blur-[140px]
    "
  /> */}

  {/* Second Glow */}
  {/* <div
    className="
    absolute
    right-8
    top-20

    w-[360px]
    h-[360px]

    rounded-full

    bg-sky-300/30
blur-[110px]
    "
  /> */}



{/* White Glow */}
{/* <div
  className="
  absolute
  z-0

  h-[460px]
  w-[460px]

  rounded-full

  bg-white/90

  blur-[90px]
  "
/> */}

{/* Soft Cyan Glow */}
{/* <div
  className="
  absolute
  z-0

  h-[380px]
  w-[380px]

  rounded-full

  bg-cyan-300/40

  blur-[100px]
  "
/> */}

{/* Bottom Light */}
{/* <div
  className="
  absolute
  bottom-8

  h-16
  w-72

  rounded-full

  bg-cyan-400/25

  blur-3xl
  "
/> */}



  {/* Hero Image */}

  <img
    src={home}
    alt="University"

    className="
relative
z-10

w-full
max-w-[620px]

object-contain

drop-shadow-[0_35px_70px_rgba(6,182,212,0.28)]

transition-all
duration-500

hover:scale-[1.02]
"
  />

  {/* Admissions Card */}

  <div
    className="
    absolute

    top-10
    right-0

    z-20

    rounded-3xl

    bg-white

    px-6
    py-5

    shadow-2xl

    border
    border-slate-100
    "
  >

    <p className="text-sm text-slate-500">
      Admissions
    </p>

    <h3 className="text-2xl font-black text-slate-900">
      Open 2026
    </h3>

  </div>

  {/* Trusted Platform */}

  <div
    className="
    absolute

    left-0
    bottom-16

    z-20

    rounded-3xl

    bg-white

    px-6
    py-5

    shadow-2xl

    border
    border-slate-100
    "
  >

    <div className="flex items-center gap-4">

      <div
        className="
        h-14
        w-14

        rounded-2xl

        bg-gradient-to-r
        from-cyan-500
        to-blue-600

        flex
        items-center
        justify-center

        text-white
        text-2xl
        "
      >
        🎓
      </div>

      <div>

        <p className="text-xs text-slate-500">
          Trusted Platform
        </p>

        <h3 className="text-lg font-bold text-slate-900">
          50,000+ Students
        </h3>

      </div>

    </div>

  </div>

  {/* Approved */}

  <div
    className="
    absolute

    right-6
    bottom-2

    z-20

    rounded-3xl

    bg-white

    px-6
    py-5

    shadow-2xl

    border
    border-slate-100
    "
  >

    <div className="flex items-center gap-4">

      <div
        className="
        h-12
        w-12

        rounded-full

        bg-green-100

        flex
        items-center
        justify-center

        text-xl
        "
      >
        ✅
      </div>

      <div>

        <p className="text-xs text-slate-500">
          Approved By
        </p>

        <h4 className="font-bold text-slate-900">
          UGC • AICTE • NAAC
        </h4>

      </div>

    </div>

  </div>

</div>

      </div>
      </div>

    </section>
  );
}