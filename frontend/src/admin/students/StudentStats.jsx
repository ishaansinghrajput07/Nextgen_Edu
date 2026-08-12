import { motion } from "framer-motion";
import {
  GraduationCap,
  CheckCircle2,
  Clock3,
  WalletCards,
} from "lucide-react";

const StudentStats = ({ stats, loading }) => {
  const statCards = [
    {
      key: "totalStudents",
      title: "Total Students",
      value: stats?.totalStudents ?? 0,
      description: "All registered students",
      icon: GraduationCap,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
    },
    {
      key: "enrolled",
      title: "Enrolled",
      value: stats?.enrolled ?? 0,
      description: "Successfully enrolled",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      key: "pending",
      title: "Payment Pending",
      value: stats?.pending ?? 0,
      description: "Commission payment pending",
      icon: Clock3,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      key: "paid",
      title: "Commission Paid",
      value: stats?.paid ?? 0,
      description: "Commission marked paid",
      icon: WalletCards,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.06,
            }}
            whileHover={{
              y: -3,
            }}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-sky-200 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Icon */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${card.iconBg} ${card.iconColor} transition-transform duration-300 group-hover:scale-105`}
              >
                <Icon size={23} strokeWidth={2} />
              </div>

              {/* Value */}
              <div className="text-right">
                {loading ? (
                  <div className="ml-auto h-8 w-16 animate-pulse rounded-lg bg-slate-200" />
                ) : (
                  <p className="text-2xl font-black tracking-tight text-slate-900">
                    {Number(card.value).toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="mt-5">
              <h3 className="text-sm font-bold text-slate-900">
                {card.title}
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {card.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StudentStats;