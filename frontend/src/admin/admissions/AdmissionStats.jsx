
import {
  GraduationCap,
  FileText,
  CheckCircle,
  Clock,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

const AdmissionStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Admissions",
      value: stats?.totalAdmissions || 0,
      icon: GraduationCap,
      color: "from-cyan-500 to-sky-500",
      iconBg: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },

    {
      title: "Applied",
      value: stats?.applied || 0,
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },

    {
      title: "Documents Pending",
      value: stats?.documentsPending || 0,
      icon: Clock,
      color: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },

    {
      title: "Enrolled",
      value: stats?.enrolled || 0,
      icon: CheckCircle,
      color: "from-emerald-500 to-green-500",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },

    {
      title: "Fee Paid",
      value: stats?.feePaid || 0,
      icon: TrendingUp,
      color: "from-violet-500 to-purple-500",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },

    {
      title: "Total Commission",
      value: `₹ ${stats?.totalCommission?.toLocaleString() || 0}`,
      icon: IndianRupee,
      color: "from-sky-500 to-cyan-500",
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-6
        gap-5
      "
    >
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="
              relative
              overflow-hidden
              rounded-3xl
              bg-white/75
              backdrop-blur-2xl
              border
              border-white/80
              p-5
              shadow-[0_20px_60px_rgba(14,165,233,.10)]
              hover:-translate-y-1
              hover:shadow-[0_25px_65px_rgba(14,165,233,.15)]
              transition-all
              duration-300
            "
          >
            {/* Background Glow */}

            <div
              className={`
                absolute
                -top-10
                -right-10
                w-28
                h-28
                rounded-full
                blur-3xl
                bg-gradient-to-r
                ${card.color}
                opacity-15
                pointer-events-none
              `}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`
                    h-12
                    w-12
                    rounded-2xl
                    ${card.iconBg}
                    flex
                    items-center
                    justify-center
                  `}
                >
                  <Icon
                    size={22}
                    className={card.iconColor}
                  />
                </div>
              </div>

              <p
                className="
                  text-sm
                  text-slate-500
                  font-medium
                "
              >
                {card.title}
              </p>

              <p
                className="
                  text-2xl
                  sm:text-3xl
                  font-extrabold
                  text-slate-800
                  mt-2
                "
              >
                {card.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdmissionStats;
