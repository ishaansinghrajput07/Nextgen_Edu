import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Trophy,
  UserCheck,
  MapPinned,
} from "lucide-react";

import CountUp from "../Stats/CountUp";
import { getWebsiteStats } from "../../../services/websiteService";

export default function StatsCards() {
  const [loading, setLoading] = useState(true);

  const [statsData, setStatsData] = useState({
    totalUniversities: 0,
    totalStudents: 0,
    admissionSuccessRate: 0,

    // Future Backend Fields
    totalCounsellors: 50,
    statesCovered: 15,
  });

  useEffect(() => {
    fetchWebsiteStats();
  }, []);

  const fetchWebsiteStats = async () => {
    try {
      setLoading(true);

      const res = await getWebsiteStats();

      if (res.success) {
        setStatsData((prev) => ({
          ...prev,

          totalUniversities:
            res.stats.totalUniversities || 0,

          totalStudents:
            res.stats.totalStudents || 0,

          admissionSuccessRate:
            res.stats.admissionSuccessRate || 95,

          // Future Ready
          totalCounsellors:
            res.stats.totalCounsellors ??
            prev.totalCounsellors,

          statesCovered:
            res.stats.statesCovered ??
            prev.statesCovered,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      id: 1,
      icon: Building2,
      number: statsData.totalUniversities,
      suffix: "+",
      title: "Partner Universities",
      subtitle: "Across India",

      iconBg:
        "from-blue-500 to-cyan-500",

      circle:
        "bg-blue-50",

      text:
        "text-blue-600",
    },

    {
      id: 2,
      icon: Users,
      number: statsData.totalStudents,
      suffix: "+",
      title: "Students Guided",
      subtitle: "Successfully",

      iconBg:
        "from-emerald-500 to-cyan-500",

      circle:
        "bg-emerald-50",

      text:
        "text-emerald-600",
    },

    {
      id: 3,
      icon: Trophy,
      number: statsData.admissionSuccessRate,
      suffix: "%",
      title: "Admission Success",
      subtitle: "Rate",

      iconBg:
        "from-violet-500 to-fuchsia-500",

      circle:
        "bg-violet-50",

      text:
        "text-violet-600",
    },

    {
      id: 4,
      icon: UserCheck,
      number: statsData.totalCounsellors,
      suffix: "+",
      title: "Expert Counsellors",
      subtitle: "Always Available",

      iconBg:
        "from-orange-500 to-amber-500",

      circle:
        "bg-orange-50",

      text:
        "text-orange-500",
    },

    {
      id: 5,
      icon: MapPinned,
      number: statsData.statesCovered,
      suffix: "+",
      title: "States Covered",
      subtitle: "Pan India Presence",

      iconBg:
        "from-blue-500 to-indigo-500",

      circle:
        "bg-sky-50",

      text:
        "text-blue-600",
    },
  ];
    return (
    <div
      className="
grid
grid-cols-2
lg:grid-cols-5
gap-6
"
    >
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.55,
              delay: index * 0.12,
            }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            className="
group
relative
overflow-hidden
rounded-[30px]
border
border-white/70
bg-white/90
backdrop-blur-xl
shadow-[0_15px_50px_rgba(15,23,42,.08)]
hover:shadow-[0_25px_60px_rgba(14,165,233,.18)]
transition-all
duration-500
"
          >
            {/* Glow */}

            <div
              className="
absolute
inset-0
opacity-0
group-hover:opacity-100
transition-all
duration-500
bg-gradient-to-br
from-sky-100/60
via-transparent
to-cyan-100/60
"
            />

            {/* Top Border */}

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

            <div
              className="
relative
z-10
flex
flex-col
items-center
justify-center
text-center
px-6
py-10
"
            >
              {/* Icon */}

              <div
                className={`
relative
w-20
h-20
rounded-full
flex
items-center
justify-center
mb-7
${item.circle}
`}
              >
                <div
                  className={`
absolute
inset-0
rounded-full
bg-gradient-to-br
${item.iconBg}
opacity-10
`}
                />

                <Icon
                  size={34}
                  className={item.text}
                  strokeWidth={2.3}
                />
              </div>

              {/* Number */}

              <h3
                className={`
text-5xl
font-black
tracking-tight
${item.text}
`}
              >
                {loading ? (
                  "--"
                ) : (
                  <>
                    <CountUp
                      end={item.number}
                    />

                    {item.suffix}
                  </>
                )}
              </h3>

              {/* Title */}

              <h4
                className="
mt-5
text-[20px]
font-bold
leading-snug
text-slate-900
"
              >
                {item.title}
              </h4>

              {/* Subtitle */}

              <p
                className="
mt-2
text-[15px]
text-slate-500
leading-6
"
              >
                {item.subtitle}
              </p>
            </div>

            {/* Bottom Hover Glow */}

            <div
              className="
absolute
-bottom-10
left-1/2
-translate-x-1/2
w-28
h-28
rounded-full
bg-cyan-300/30
blur-3xl
opacity-0
group-hover:opacity-100
transition-all
duration-500
"
            />
          </motion.div>
        );
      })}
          </div>
  );
}