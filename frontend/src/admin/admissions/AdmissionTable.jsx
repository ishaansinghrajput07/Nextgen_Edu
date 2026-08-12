
import {
  Eye,
  Loader2,
  GraduationCap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const AdmissionTable = ({ admissions, loading }) => {
  const navigate = useNavigate();

  console.log(
    "AdmissionTable admissions:",
    admissions,
  );

  console.log(
    "Length:",
    admissions?.length,
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-50 text-blue-700 border-blue-100";

      case "Documents Pending":
        return "bg-amber-50 text-amber-700 border-amber-100";

      case "Documents Verified":
        return "bg-violet-50 text-violet-700 border-violet-100";

      case "Offer Letter":
        return "bg-indigo-50 text-indigo-700 border-indigo-100";

      case "Fee Paid":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";

      case "Enrolled":
        return "bg-green-50 text-green-700 border-green-100";

      case "Rejected":
        return "bg-red-50 text-red-700 border-red-100";

      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  if (loading) {
    return (
      <div
        className="
          bg-white/75
          backdrop-blur-2xl
          border
          border-white/80
          rounded-3xl
          shadow-[0_15px_50px_rgba(14,165,233,.08)]
          min-h-[300px]
          flex
          items-center
          justify-center
        "
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="
              h-12
              w-12
              rounded-2xl
              bg-cyan-50
              flex
              items-center
              justify-center
            "
          >
            <Loader2
              size={24}
              className="
                text-cyan-600
                animate-spin
              "
            />
          </div>

          <p className="text-slate-500 text-sm">
            Loading admissions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        bg-white/75
        backdrop-blur-2xl
        border
        border-white/80
        rounded-3xl
        shadow-[0_15px_50px_rgba(14,165,233,.08)]
        overflow-hidden
      "
    >
      {/* Desktop Table */}

      <div
        className="
          hidden
          md:block
          overflow-x-auto
        "
      >
        <table className="w-full text-left">
          <thead>
            <tr
              className="
                border-b
                border-slate-100
                bg-slate-50/70
                text-slate-500
                text-sm
              "
            >
              <th className="px-6 py-4 font-semibold">
                Student
              </th>

              <th className="px-6 py-4 font-semibold">
                University
              </th>

              <th className="px-6 py-4 font-semibold">
                Course
              </th>

              <th className="px-6 py-4 font-semibold">
                Status
              </th>

              <th className="px-6 py-4 font-semibold">
                Fee
              </th>

              <th className="px-6 py-4 font-semibold">
                Commission
              </th>

              <th className="px-6 py-4 font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {admissions?.length > 0 ? (
              admissions.map((admission) => (
                <tr
                  key={admission._id}
                  className="
                    border-b
                    border-slate-100
                    hover:bg-cyan-50/40
                    transition-all
                    duration-200
                  "
                >
                  {/* Student */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          h-11
                          w-11
                          rounded-2xl
                          bg-cyan-50
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                      >
                        <GraduationCap
                          className="text-cyan-600"
                          size={20}
                        />
                      </div>

                      <div>
                        <p
                          className="
                            text-slate-800
                            font-semibold
                          "
                        >
                          {admission.studentName}
                        </p>

                        <p
                          className="
                            text-slate-400
                            text-sm
                            mt-0.5
                          "
                        >
                          {admission.studentPhone}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* University */}

                  <td
                    className="
                      px-6
                      py-5
                      text-slate-700
                      font-medium
                    "
                  >
                    {admission.universityName}
                  </td>

                  {/* Course */}

                  <td
                    className="
                      px-6
                      py-5
                      text-slate-600
                    "
                  >
                    {admission.courseName}
                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">
                    <span
                      className={`
                        inline-flex
                        items-center
                        px-3
                        py-1.5
                        rounded-full
                        border
                        text-xs
                        font-semibold
                        whitespace-nowrap
                        ${getStatusStyle(
                          admission.admissionStatus,
                        )}
                      `}
                    >
                      {admission.admissionStatus}
                    </span>
                  </td>

                  {/* Fee */}

                  <td
                    className="
                      px-6
                      py-5
                      text-slate-700
                      font-semibold
                    "
                  >
                    ₹
                    {admission.netFee?.toLocaleString() ||
                      0}
                  </td>

                  {/* Commission */}

                  <td
                    className="
                      px-6
                      py-5
                      text-cyan-600
                      font-bold
                    "
                  >
                    ₹
                    {admission.counsellorCommissionAmount?.toLocaleString() ||
                      0}
                  </td>

                  {/* Action */}

                  <td className="px-6 py-5">
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/admissions/${admission._id}`,
                        )
                      }
                      className="
                        h-10
                        w-10
                        rounded-xl
                        bg-cyan-50
                        text-cyan-600
                        flex
                        items-center
                        justify-center
                        hover:bg-cyan-100
                        hover:text-cyan-700
                        transition-all
                        duration-200
                      "
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="
                    text-center
                    py-14
                    text-slate-400
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className="
                        h-14
                        w-14
                        rounded-2xl
                        bg-cyan-50
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <GraduationCap
                        size={26}
                        className="text-cyan-600"
                      />
                    </div>

                    <p
                      className="
                        text-slate-700
                        font-semibold
                      "
                    >
                      No admissions found
                    </p>

                    <p className="text-sm text-slate-400">
                      Admission records will appear here.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div
        className="
          md:hidden
          p-4
          space-y-4
        "
      >
        {admissions?.length > 0 ? (
          admissions.map((admission) => (
            <div
              key={admission._id}
              className="
                bg-white
                rounded-2xl
                p-4
                border
                border-slate-200
                shadow-sm
              "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                    h-11
                    w-11
                    rounded-xl
                    bg-cyan-50
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <GraduationCap
                    size={20}
                    className="text-cyan-600"
                  />
                </div>

                <div className="min-w-0">
                  <h3
                    className="
                      text-slate-800
                      font-semibold
                    "
                  >
                    {admission.studentName}
                  </h3>

                  <p
                    className="
                      text-slate-500
                      text-sm
                      mt-1
                    "
                  >
                    {admission.universityName}
                  </p>

                  <p
                    className="
                      text-slate-400
                      text-sm
                      mt-1
                    "
                  >
                    {admission.courseName}
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mt-4
                "
              >
                <span
                  className={`
                    px-3
                    py-1.5
                    rounded-full
                    border
                    text-xs
                    font-semibold
                    ${getStatusStyle(
                      admission.admissionStatus,
                    )}
                  `}
                >
                  {admission.admissionStatus}
                </span>

                <span
                  className="
                    text-cyan-600
                    font-bold
                  "
                >
                  ₹
                  {admission.netFee?.toLocaleString() ||
                    0}
                </span>
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/admin/admissions/${admission._id}`,
                  )
                }
                className="
                  mt-4
                  w-full
                  py-2.5
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-sky-500
                  text-white
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  shadow-md
                  shadow-cyan-100
                "
              >
                <Eye size={17} />

                View Details
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div
              className="
                h-14
                w-14
                mx-auto
                rounded-2xl
                bg-cyan-50
                flex
                items-center
                justify-center
              "
            >
              <GraduationCap
                size={26}
                className="text-cyan-600"
              />
            </div>

            <p
              className="
                mt-3
                text-slate-700
                font-semibold
              "
            >
              No admissions found
            </p>

            <p
              className="
                text-sm
                text-slate-400
                mt-1
              "
            >
              Admission records will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionTable;
