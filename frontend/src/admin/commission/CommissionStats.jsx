import {
  IndianRupee,
  CheckCircle,
  Clock,
} from "lucide-react";

const CommissionStats = ({ stats, loading }) => {
  const cards = [
    {
      title: "Total Commission",
      value: Number(stats?.totalCommission || 0),
      icon: IndianRupee,
      type: "currency",
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      title: "Paid Commission",
      value: Number(stats?.paidCommission || 0),
      icon: CheckCircle,
      type: "currency",
      iconClass: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Commission",
      value: Number(stats?.pendingCommission || 0),
      icon: Clock,
      type: "currency",
      iconClass: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              bg-white
              border border-gray-100
              rounded-2xl
              p-5
              shadow-sm
              hover:shadow-md
              transition
            "
          >
            <div className="flex items-center justify-between">
              <div
                className={`
                  w-11 h-11
                  rounded-xl
                  flex items-center justify-center
                  ${card.iconClass}
                `}
              >
                <Icon size={21} />
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">
                {card.title}
              </p>

              {loading ? (
                <div
                  className="
                    h-8 w-28 mt-2
                    bg-gray-200
                    rounded-lg
                    animate-pulse
                  "
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-800 mt-1">
                  ₹ {Number(card.value).toLocaleString("en-IN")}
                </h2>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommissionStats;