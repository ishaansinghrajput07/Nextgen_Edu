import React from "react";

import {
  Activity,
  User,
  Clock,
  CheckCircle,
  FileText,
  IndianRupee,
  GraduationCap,
} from "lucide-react";

const AdmissionActivity = ({ admission }) => {
  if (!admission) return null;

  const { timeline = [] } = admission;

  const getIcon = (title = "") => {
    const text = title.toLowerCase();

    if (text.includes("payment")) {
      return <IndianRupee size={18} />;
    }

    if (text.includes("document")) {
      return <FileText size={18} />;
    }

    if (text.includes("verified")) {
      return <CheckCircle size={18} />;
    }

    if (text.includes("admission")) {
      return <GraduationCap size={18} />;
    }

    return <Activity size={18} />;
  };

  return (
    <div className="space-y-5">

      {/* =========================================
          HEADER
      ========================================= */}

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-[28px]
          shadow-[0_20px_60px_rgba(14,165,233,0.08)]
          p-5
          sm:p-6
        "
      >
        <div className="flex items-center gap-4">

          <div
            className="
              h-12
              w-12
              sm:h-14
              sm:w-14
              shrink-0
              rounded-2xl
              bg-cyan-50
              border
              border-cyan-100
              text-cyan-600
              flex
              items-center
              justify-center
            "
          >
            <Activity
              size={24}
              strokeWidth={2}
            />
          </div>

          <div className="min-w-0">
            <h2
              className="
                text-xl
                sm:text-2xl
                font-bold
                text-slate-800
              "
            >
              Admission Activity
            </h2>

            <p
              className="
                text-sm
                text-slate-500
                mt-1
              "
            >
              Complete admission history and activity timeline
            </p>
          </div>
        </div>
      </div>

      {/* =========================================
          TIMELINE CARD
      ========================================= */}

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-[28px]
          shadow-[0_20px_60px_rgba(14,165,233,0.08)]
          p-5
          sm:p-6
          lg:p-8
        "
      >
        {timeline.length === 0 ? (
          /* =====================================
             EMPTY STATE
          ===================================== */

          <div className="py-14 text-center">

            <div
              className="
                mx-auto
                h-16
                w-16
                rounded-2xl
                bg-cyan-50
                border
                border-cyan-100
                text-cyan-600
                flex
                items-center
                justify-center
                mb-4
              "
            >
              <Activity size={30} />
            </div>

            <h3
              className="
                text-lg
                font-semibold
                text-slate-700
              "
            >
              No Activity Found
            </h3>

            <p
              className="
                text-sm
                text-slate-500
                mt-1
              "
            >
              Admission activity will appear here.
            </p>
          </div>
        ) : (
          /* =====================================
             TIMELINE
          ===================================== */

          <div className="relative">

            {/* Vertical Timeline Line */}

            <div
              className="
                absolute
                left-[19px]
                top-5
                bottom-5
                w-px
                bg-gradient-to-b
                from-cyan-200
                via-slate-200
                to-transparent
              "
            />

            <div className="space-y-6">

              {[...timeline]
                .reverse()
                .map((item, index) => (
                  <div
                    key={item._id || index}
                    className="
                      relative
                      flex
                      items-start
                      gap-4
                      sm:gap-5
                    "
                  >

                    {/* =================================
                        TIMELINE ICON
                    ================================= */}

                    <div
                      className="
                        relative
                        z-10
                        h-10
                        w-10
                        shrink-0
                        rounded-full
                        bg-cyan-50
                        border
                        border-cyan-100
                        text-cyan-600
                        flex
                        items-center
                        justify-center
                        ring-4
                        ring-white
                        shadow-sm
                      "
                    >
                      {getIcon(item.title)}
                    </div>

                    {/* =================================
                        ACTIVITY CONTENT
                    ================================= */}

                    <div
                      className="
                        flex-1
                        min-w-0
                        bg-slate-50/70
                        border
                        border-slate-200
                        rounded-2xl
                        p-4
                        sm:p-5
                        hover:bg-white
                        hover:border-cyan-200
                        hover:shadow-[0_10px_30px_rgba(14,165,233,0.08)]
                        transition-all
                        duration-300
                      "
                    >

                      {/* Title + Date */}

                      <div
                        className="
                          flex
                          flex-col
                          sm:flex-row
                          sm:items-start
                          sm:justify-between
                          gap-3
                        "
                      >

                        <div className="min-w-0">
                          <h3
                            className="
                              text-base
                              sm:text-lg
                              font-bold
                              text-slate-800
                              break-words
                            "
                          >
                            {item.title || "Activity"}
                          </h3>
                        </div>

                        {item.date && (
                          <div
                            className="
                              flex
                              items-center
                              gap-1.5
                              w-fit
                              shrink-0
                              px-3
                              py-1.5
                              rounded-xl
                              bg-white
                              border
                              border-slate-200
                              text-xs
                              text-slate-500
                            "
                          >
                            <Clock
                              size={14}
                              className="text-cyan-500"
                            />

                            <span>
                              {new Date(
                                item.date,
                              ).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Description */}

                      {item.description && (
                        <p
                          className="
                            mt-2
                            text-sm
                            text-slate-600
                            leading-6
                          "
                        >
                          {item.description}
                        </p>
                      )}

                      {/* Created By */}

                      {item.createdBy && (
                        <div
                          className="
                            mt-4
                            pt-3
                            border-t
                            border-slate-200
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <div
                            className="
                              h-7
                              w-7
                              rounded-lg
                              bg-cyan-50
                              border
                              border-cyan-100
                              text-cyan-600
                              flex
                              items-center
                              justify-center
                            "
                          >
                            <User size={14} />
                          </div>

                          <span
                            className="
                              text-xs
                              font-medium
                              text-slate-500
                            "
                          >
                            Action performed by user
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionActivity;