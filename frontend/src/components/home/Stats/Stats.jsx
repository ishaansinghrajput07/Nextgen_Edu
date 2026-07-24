import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  BarChart3,
} from "lucide-react";

import SectionHeader from "./SectionHeader";
import StatsCard from "./StatsCard";
import { getWebsiteStats } from "../../../services/websiteService";

export default function Stats() {
  const [loading, setLoading] = useState(true);

  const [statsData, setStatsData] = useState({
    totalUniversities: 0,
    totalCourses: 0,
    totalStudents: 0,
    admissionSuccessRate: 95,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const res = await getWebsiteStats();

      if (res.success) {
        setStatsData(res.stats);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      icon: GraduationCap,
      number: statsData.totalUniversities,
      label: "Partner Universities",
      description:
        "Top government & private universities connected with our admission platform.",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      lineColor: "bg-blue-500",
      isPercentage: false,
    },

    {
      icon: BookOpen,
      number: statsData.totalCourses,
      label: "Courses Available",
      description:
        "UG, PG & Professional courses with expert career guidance.",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      lineColor: "bg-green-500",
      isPercentage: false,
    },

    {
      icon: Users,
      number: statsData.totalStudents,
      label: "Students Counselled",
      description:
        "Thousands of students successfully guided towards their dream careers.",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      lineColor: "bg-violet-500",
      isPercentage: false,
    },

    {
      icon: Award,
      number: statsData.admissionSuccessRate,
      label: "Admission Success Rate",
      description:
        "Consistently achieving excellent admission results every year.",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      lineColor: "bg-orange-500",
      isPercentage: true,
    },
  ];

  return (
    <section
      className="
relative
overflow-hidden
py-24
bg-gradient-to-br
from-[#edf8ff]
via-[#f8fcff]
to-[#eaf7ff]
"
    >
      {/* Left Glow */}

      <div
        className="
absolute
-top-40
-left-40
w-[420px]
h-[420px]
rounded-full
bg-cyan-300/20
blur-[140px]
"
      />

      {/* Right Glow */}

      <div
        className="
absolute
-bottom-32
-right-32
w-[420px]
h-[420px]
rounded-full
bg-blue-300/20
blur-[140px]
"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}

        <SectionHeader />

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <StatsCard
              key={item.label}
              delay={index * 0.12}
              loading={loading}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}