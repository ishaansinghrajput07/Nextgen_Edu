import React from "react";
import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  UploadCloud,
} from "lucide-react";

const AdmissionDocuments = ({ admission }) => {
  if (!admission) return null;

  const { documentStatus = "Pending", documents = [] } = admission;

  const statusConfig = {
    Pending: {
      icon: Clock,
      style: "bg-yellow-50 text-yellow-700 border border-yellow-100",
    },

    Uploaded: {
      icon: UploadCloud,
      style: "bg-sky-50 text-sky-700 border border-sky-100",
    },

    Verified: {
      icon: CheckCircle,
      style: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    },

    Rejected: {
      icon: XCircle,
      style: "bg-red-50 text-red-700 border border-red-100",
    },
  };

  const currentStatus =
    statusConfig[documentStatus] || statusConfig.Pending;

  const StatusIcon = currentStatus.icon;

  return (
    <div className="space-y-6">
      {/* ===========================
          DOCUMENT STATUS CARD
      =========================== */}

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          shadow-[0_10px_35px_rgba(15,23,42,0.06)]
          p-5
          sm:p-6
        "
      >
        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                h-12
                w-12
                sm:h-14
                sm:w-14
                rounded-2xl
                bg-cyan-50
                text-cyan-600
                border
                border-cyan-100
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <FileText size={24} />
            </div>

            <div>
              <h3
                className="
                  text-lg
                  sm:text-xl
                  font-bold
                  text-slate-800
                "
              >
                Document Status
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Admission documents verification
              </p>
            </div>
          </div>

          <div
            className={`
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              font-semibold
              text-sm
              w-fit
              ${currentStatus.style}
            `}
          >
            <StatusIcon size={17} />

            {documentStatus}
          </div>
        </div>
      </div>

      {/* ===========================
          DOCUMENT LIST
      =========================== */}

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          shadow-[0_10px_35px_rgba(15,23,42,0.06)]
          p-5
          sm:p-6
        "
      >
        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            mb-6
          "
        >
          <div>
            <h3
              className="
                text-lg
                sm:text-xl
                font-bold
                text-slate-800
              "
            >
              Required Documents
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Manage admission document submissions
            </p>
          </div>

          <button
            className="
              flex
              items-center
              justify-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-sky-500
              text-white
              font-semibold
              shadow-md
              shadow-cyan-100
              hover:from-cyan-600
              hover:to-sky-600
              transition-all
              duration-300
              w-full
              sm:w-auto
            "
          >
            <UploadCloud size={18} />
            Upload
          </button>
        </div>

        {documents.length === 0 ? (
          <div
            className="
              text-center
              py-12
              border
              border-dashed
              border-slate-200
              rounded-2xl
              bg-slate-50/50
            "
          >
            <div
              className="
                mx-auto
                h-14
                w-14
                rounded-2xl
                bg-cyan-50
                text-cyan-600
                border
                border-cyan-100
                flex
                items-center
                justify-center
                mb-4
              "
            >
              <FileText size={26} />
            </div>

            <h4 className="font-semibold text-slate-700">
              No Documents Found
            </h4>

            <p className="text-sm text-slate-500 mt-1">
              No documents uploaded yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-4
                  border
                  border-slate-200
                  rounded-2xl
                  p-4
                  bg-white
                  hover:border-cyan-200
                  hover:shadow-sm
                  transition-all
                  duration-300
                "
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className="
                      h-11
                      w-11
                      rounded-xl
                      bg-slate-50
                      border
                      border-slate-200
                      text-cyan-600
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <FileText size={21} />
                  </div>

                  <div className="min-w-0">
                    <h4
                      className="
                        font-semibold
                        text-slate-800
                        truncate
                      "
                    >
                      {doc.name || "Document"}
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                      {doc.uploadedAt
                        ? new Date(
                            doc.uploadedAt,
                          ).toLocaleDateString()
                        : "Not uploaded"}
                    </p>
                  </div>
                </div>

                <span
                  className={`
                    px-3
                    py-1.5
                    rounded-full
                    text-xs
                    sm:text-sm
                    font-semibold
                    w-fit
                    ${
                      statusConfig[doc.status]?.style ||
                      statusConfig.Pending.style
                    }
                  `}
                >
                  {doc.status || "Pending"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===========================
          DOCUMENT CHECKLIST
      =========================== */}

      <div
        className="
          bg-white
          border
          border-cyan-100
          rounded-2xl
          shadow-[0_10px_35px_rgba(14,165,233,0.08)]
          p-5
          sm:p-6
        "
      >
        <div className="flex items-center gap-3 mb-5">
          <div
            className="
              h-11
              w-11
              rounded-xl
              bg-cyan-50
              text-cyan-600
              border
              border-cyan-100
              flex
              items-center
              justify-center
            "
          >
            <CheckCircle size={21} />
          </div>

          <div>
            <h3
              className="
                text-lg
                sm:text-xl
                font-bold
                text-slate-800
              "
            >
              Document Checklist
            </h3>

            <p className="text-sm text-slate-500">
              Documents generally required for admission
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            className="
              flex
              items-center
              gap-3
              p-3
              rounded-xl
              bg-slate-50
              border
              border-slate-100
              text-sm
              text-slate-700
            "
          >
            <CheckCircle
              size={17}
              className="text-cyan-500 shrink-0"
            />
            Passport / ID Proof
          </div>

          <div
            className="
              flex
              items-center
              gap-3
              p-3
              rounded-xl
              bg-slate-50
              border
              border-slate-100
              text-sm
              text-slate-700
            "
          >
            <CheckCircle
              size={17}
              className="text-cyan-500 shrink-0"
            />
            Academic Certificates
          </div>

          <div
            className="
              flex
              items-center
              gap-3
              p-3
              rounded-xl
              bg-slate-50
              border
              border-slate-100
              text-sm
              text-slate-700
            "
          >
            <CheckCircle
              size={17}
              className="text-cyan-500 shrink-0"
            />
            Mark Sheets
          </div>

          <div
            className="
              flex
              items-center
              gap-3
              p-3
              rounded-xl
              bg-slate-50
              border
              border-slate-100
              text-sm
              text-slate-700
            "
          >
            <CheckCircle
              size={17}
              className="text-cyan-500 shrink-0"
            />
            Passport Size Photos
          </div>

          <div
            className="
              flex
              items-center
              gap-3
              p-3
              rounded-xl
              bg-slate-50
              border
              border-slate-100
              text-sm
              text-slate-700
              sm:col-span-2
            "
          >
            <CheckCircle
              size={17}
              className="text-cyan-500 shrink-0"
            />
            Other Required Documents
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionDocuments;