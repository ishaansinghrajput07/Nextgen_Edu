import {
  CheckCircle2,
  Clock3,
  GraduationCap,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const CounsellorStudentStats = ({ students = [], loading = false }) => {
  // ============================================================
  // COUNSELLOR STUDENT STATS
  // ============================================================

  const totalStudents = students.length;

  const enrolledStudents = students.filter(
    (student) =>
      String(student?.admissionStatus || "").toLowerCase() ===
      "enrolled"
  ).length;

  const pendingStudents = students.filter((student) => {
    const status = String(
      student?.admissionStatus || ""
    ).toLowerCase();

    return [
      "new",
      "contacted",
      "interested",
      "applied",
      "document pending",
      "documents pending",
      "documents verified",
      "offer letter",
      "fee paid",
    ].includes(status);
  }).length;

  const completedStudents = students.filter((student) => {
    const status = String(
      student?.admissionStatus || ""
    ).toLowerCase();

    return ["rejected", "cancelled", "admission cancelled", "withdrawn"].includes(
      status
    );
  }).length;

  // ============================================================
  // STAT CARDS
  // ============================================================

  const statCards = [
    {
      title: "My Students",
      value: totalStudents,
      description: "Total assigned students",
      icon: Users,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
    },

    {
      title: "Enrolled",
      value: enrolledStudents,
      description: "Successfully enrolled",
      icon: GraduationCap,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },

    {
      title: "In Progress",
      value: pendingStudents,
      description: "Admission process active",
      icon: Clock3,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },

    {
      title: "Completed",
      value: completedStudents,
      description: "Rejected / cancelled / withdrawn",
      icon: CheckCircle2,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
    },
  ];

  // ============================================================
  // LOADING SKELETON
  // ============================================================

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="h-3 w-24 rounded bg-slate-200" />

                <div className="h-8 w-16 rounded bg-slate-200" />

                <div className="h-3 w-32 rounded bg-slate-100" />
              </div>

              <div className="h-11 w-11 rounded-2xl bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
            }}
            whileHover={{
              y: -3,
            }}
            className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              {/* ====================================================
                  CONTENT
              ==================================================== */}

              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-500">
                  {card.title}
                </p>

                <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                  {card.value}
                </p>

                <p className="mt-1 truncate text-xs text-slate-400">
                  {card.description}
                </p>
              </div>

              {/* ====================================================
                  ICON
              ==================================================== */}

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${card.iconBg} ${card.iconColor} transition-transform duration-200 group-hover:scale-105`}
              >
                <Icon size={22} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CounsellorStudentStats;