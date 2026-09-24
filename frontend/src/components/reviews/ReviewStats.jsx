import {
  Star,
  Users,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    icon: Star,
    title: "4.9/5",
    subtitle: "Average Student Rating",
    color: "bg-yellow-100 text-yellow-500",
    stars: true,
  },
  {
    icon: Users,
    title: "15,000+",
    subtitle: "Happy Students",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: GraduationCap,
    title: "250+",
    subtitle: "Top Universities",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: ShieldCheck,
    title: "98%",
    subtitle: "Admission Success Rate",
    color: "bg-emerald-100 text-emerald-600",
  },
];

export default function ReviewStats() {
  return (
    <section className="mt-10">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/70
                bg-white/80
                backdrop-blur-xl
                p-5
                shadow-[0_15px_40px_rgba(14,165,233,.12)]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-[0_25px_60px_rgba(14,165,233,.20)]
              "
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-cyan-50 opacity-0 transition duration-500 group-hover:opacity-100" />

              {/* Glow */}
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-300/20 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex items-center gap-4">

                {/* Icon */}

                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.color}`}
                >
                  <Icon size={28} />
                </div>

                {/* Content */}

                <div className="flex-1">

                  <h3 className="text-3xl font-black text-slate-900">
                    {item.title}
                  </h3>

                  {item.stars && (
                    <div className="mt-1 flex gap-1 text-sm text-yellow-400">
                      ★★★★★
                    </div>
                  )}

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.subtitle}
                  </p>

                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}