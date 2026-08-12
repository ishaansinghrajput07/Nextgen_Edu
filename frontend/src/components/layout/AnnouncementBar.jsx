
import { motion } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import { announcements } from "./navData";

const AnnouncementBar = () => {
  const items = [...announcements, ...announcements];

  return (
    <div className="relative z-[60] overflow-hidden border-b border-sky-400/20 bg-gradient-to-r from-slate-950 via-sky-950 to-slate-950 text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-10 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute right-0 -top-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />

        <motion.div
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            top-0
            h-full
            w-32
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
            skew-x-12
          "
        />
      </div>

      <div className="relative flex h-11 items-center">

        {/* Latest Updates Badge */}
        <div
          className="
            relative
            z-20
            flex
            h-full
            shrink-0
            items-center
            gap-2
            border-r
            border-white/10
            bg-white/10
            px-4
            backdrop-blur-xl
            sm:px-6
          "
        >
          <div
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-yellow-300
              to-orange-400
              shadow-lg
              shadow-yellow-500/20
            "
          >
            <Sparkles className="h-3.5 w-3.5 text-slate-900" />
          </div>

          <span
            className="
              hidden
              text-[11px]
              font-black
              uppercase
              tracking-[0.18em]
              sm:block
            "
          >
            Latest Updates
          </span>

          <span
            className="
              text-[11px]
              font-black
              uppercase
              tracking-[0.15em]
              sm:hidden
            "
          >
            Updates
          </span>
        </div>

        {/* Fade on left */}
        <div className="pointer-events-none absolute left-[115px] z-10 h-full w-10 bg-gradient-to-r from-slate-950 to-transparent sm:left-[155px]" />

        {/* Marquee Area */}
        <div className="relative flex min-w-0 flex-1 overflow-hidden">

          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 26,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex w-max items-center whitespace-nowrap"
          >
            {items.map((item, index) => (
              <div
                key={`${item.text}-${index}`}
                className="
                  flex
                  items-center
                  gap-4
                  px-6
                  sm:px-8
                "
              >
                {/* Live dot */}
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                </span>

                <span className="text-xs font-semibold text-white/90 sm:text-sm">
                  {item.text}
                </span>

                <ChevronRight className="h-4 w-4 text-cyan-300/70" />
              </div>
            ))}
          </motion.div>

          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-slate-950 to-transparent" />
        </div>

        {/* Right Status */}
        <div
          className="
            relative
            z-20
            hidden
            h-full
            shrink-0
            items-center
            gap-2
            border-l
            border-white/10
            bg-white/5
            px-5
            backdrop-blur-xl
            lg:flex
          "
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

          <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
            Live
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;

