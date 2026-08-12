import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

import { getTrustedUniversities } from "../../../services/universityService";

export default function LogoMarquee() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);

      const res = await getTrustedUniversities();

      if (res.success) {
        setUniversities(res.universities || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Duplicate for Infinite Marquee

  const sliderData =
    universities.length > 0
      ? [...universities, ...universities]
      : [];

  if (loading) {
    return (
      <div className="mt-12">
        <div
          className="
rounded-[32px]
border
border-slate-200
bg-white/80
backdrop-blur-xl
shadow-[0_20px_50px_rgba(15,23,42,.06)]
p-10
"
        >
          <div className="flex justify-center">
            <div
              className="
h-12
w-12
rounded-full
border-4
border-cyan-500
border-t-transparent
animate-spin
"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      {/* Header */}

      <div className="text-center mb-10">
        <div
          className="
inline-flex
items-center
gap-2
rounded-full
border
border-sky-200
bg-sky-50
px-5
py-2
"
        >
          <ShieldCheck
            size={16}
            className="text-sky-600"
          />

          <span
            className="
text-sm
font-bold
tracking-widest
uppercase
text-sky-700
"
          >
            Trusted Partners
          </span>
        </div>

        <h3
          className="
mt-6
text-3xl
md:text-4xl
font-black
tracking-tight
text-slate-900
"
        >
          Trusted by Leading Universities
        </h3>

        <p
          className="
mt-4
max-w-2xl
mx-auto
text-slate-600
leading-7
"
        >
          We proudly collaborate with India's top universities to
          provide trusted admissions, scholarships and career guidance.
        </p>
      </div>

      {/* Marquee Container starts here */}
            {/* Marquee */}

      <div
        className="
relative
overflow-hidden
rounded-[34px]
border
border-slate-200
bg-white/80
backdrop-blur-2xl
shadow-[0_25px_60px_rgba(15,23,42,.08)]
py-10
"
      >
        {/* Background Glow */}

        <div
          className="
absolute
-top-24
-left-24
w-72
h-72
rounded-full
bg-cyan-200/30
blur-[100px]
pointer-events-none
"
        />

        <div
          className="
absolute
-bottom-24
-right-24
w-72
h-72
rounded-full
bg-blue-200/30
blur-[100px]
pointer-events-none
"
        />

        {/* Left Fade */}

        <div
          className="
absolute
left-0
top-0
z-20
h-full
w-32
bg-gradient-to-r
from-white
via-white/90
to-transparent
pointer-events-none
"
        />

        {/* Right Fade */}

        <div
          className="
absolute
right-0
top-0
z-20
h-full
w-32
bg-gradient-to-l
from-white
via-white/90
to-transparent
pointer-events-none
"
        />

        {/* Logos */}

        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
flex
items-center
gap-8
w-max
px-6
"
        >
          {sliderData.map((item, index) => (
            <Link
              key={`${item._id}-${index}`}
              to={`/universities/${item.slug}`}
              className="group"
            >
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
relative
flex
items-center
justify-center
w-[210px]
h-[120px]
rounded-[28px]
border
border-slate-200
bg-white
shadow-[0_12px_30px_rgba(15,23,42,.06)]
hover:shadow-[0_20px_45px_rgba(14,165,233,.15)]
transition-all
duration-500
overflow-hidden
"
              >
                {/* Hover Gradient */}

                <div
                  className="
absolute
top-0
left-0
h-1
w-full
origin-left
scale-x-0
group-hover:scale-x-100
transition-transform
duration-500
bg-gradient-to-r
from-blue-600
via-cyan-500
to-sky-400
"
                />

                {/* Logo */}

                <img
                  src={item.universityLogo}
                  alt={item.universityName}
                  className="
max-h-[60px]
max-w-[150px]
object-contain
transition-all
duration-500
group-hover:scale-110
"
                />

                {/* University Name */}

                <div
                  className="
absolute
bottom-0
left-0
w-full
border-t
border-slate-100
bg-slate-50/80
backdrop-blur-md
px-4
py-2
"
                >
                  <p
                    className="
truncate
text-center
text-[13px]
font-semibold
text-slate-700
group-hover:text-sky-600
transition-colors
duration-300
"
                  >
                    {item.universityName}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
          </div>
  );
}