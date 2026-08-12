import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  RefreshCcw,
  CreditCard,
  IndianRupee,
} from "lucide-react";

import commissionApi from "../../services/commissionApi";
import CommissionPaymentModal from "../commission/CommissionPaymentModal";
import CommissionPaymentHistory from "../commission/CommissionPaymentHistory";

const CommissionDetails = () => {
  const { counsellorId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [commissions, setCommissions] = useState([]);
  const [pagination, setPagination] = useState(null);

  // Payment modal
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCommission, setSelectedCommission] =
    useState(null);

  // =====================================================
  // FETCH COMMISSION HISTORY
  // =====================================================

  const fetchCommissionHistory = async () => {
    try {
      setLoading(true);

      const response =
        await commissionApi.getCommissionHistory({
          counsellor: counsellorId,
          page: 1,
          limit: 100,
        });

      setCommissions(
        response?.commissions || []
      );

      setPagination(
        response?.pagination || null
      );
    } catch (error) {
      console.error(
        "Commission history error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load commission details."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    if (counsellorId) {
      fetchCommissionHistory();
    }
  }, [counsellorId]);

  // =====================================================
  // OPEN PAYMENT MODAL
  // =====================================================

  const handlePayment = (commission) => {
    if (!commission?._id) {
      toast.error(
        "Commission ID not found."
      );
      return;
    }

    setSelectedCommission(commission);
    setShowPayment(true);
  };

  // =====================================================
  // CLOSE PAYMENT MODAL
  // =====================================================

  const handleClosePayment = () => {
    setShowPayment(false);
    setSelectedCommission(null);
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";

      case "Partial":
        return "bg-yellow-100 text-yellow-700";

      case "Pending":
      default:
        return "bg-red-100 text-red-700";
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          {/* BACK */}

          <button
            onClick={() => navigate(-1)}
            className="
              p-2
              rounded-xl
              bg-gray-100
              text-gray-700
              hover:bg-gray-200
              transition
            "
            title="Back"
          >
            <ArrowLeft size={20} />
          </button>

          {/* TITLE */}

          <div>
            <h1 className="
              text-2xl
              font-bold
              text-gray-800
            ">
              Commission Details
            </h1>

            <p className="
              text-sm
              text-gray-500
              mt-1
            ">
              Counsellor commission and payment history
            </p>
          </div>

        </div>

        {/* REFRESH */}

        <button
          onClick={fetchCommissionHistory}
          disabled={loading}
          className="
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-xl
            bg-blue-600
            text-white
            hover:bg-blue-700
            disabled:opacity-60
            transition
          "
        >
          <RefreshCcw
            size={17}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>

      </div>

      {/* =================================================
          SUMMARY
      ================================================= */}

      {!loading && commissions.length > 0 && (
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4
        ">

          {/* TOTAL */}

          <div className="
            bg-white
            border
            border-gray-100
            rounded-2xl
            p-5
            shadow-sm
          ">
            <div className="
              flex
              items-center
              justify-between
            ">
              <div>
                <p className="
                  text-sm
                  text-gray-500
                ">
                  Total Commission
                </p>

                <h2 className="
                  mt-1
                  text-xl
                  font-bold
                  text-gray-800
                ">
                  ₹
                  {commissions
                    .reduce(
                      (sum, item) =>
                        sum +
                        Number(
                          item.amount || 0
                        ),
                      0
                    )
                    .toLocaleString("en-IN")}
                </h2>
              </div>

              <div className="
                w-11
                h-11
                rounded-xl
                bg-blue-100
                text-blue-600
                flex
                items-center
                justify-center
              ">
                <IndianRupee size={20} />
              </div>
            </div>
          </div>

          {/* PAID */}

          <div className="
            bg-white
            border
            border-gray-100
            rounded-2xl
            p-5
            shadow-sm
          ">
            <div className="
              flex
              items-center
              justify-between
            ">
              <div>
                <p className="
                  text-sm
                  text-gray-500
                ">
                  Total Paid
                </p>

                <h2 className="
                  mt-1
                  text-xl
                  font-bold
                  text-green-600
                ">
                  ₹
                  {commissions
                    .reduce(
                      (sum, item) =>
                        sum +
                        Number(
                          item.paidAmount || 0
                        ),
                      0
                    )
                    .toLocaleString("en-IN")}
                </h2>
              </div>

              <div className="
                w-11
                h-11
                rounded-xl
                bg-green-100
                text-green-600
                flex
                items-center
                justify-center
              ">
                <CreditCard size={20} />
              </div>
            </div>
          </div>

          {/* REMAINING */}

          <div className="
            bg-white
            border
            border-gray-100
            rounded-2xl
            p-5
            shadow-sm
          ">
            <div className="
              flex
              items-center
              justify-between
            ">
              <div>
                <p className="
                  text-sm
                  text-gray-500
                ">
                  Remaining
                </p>

                <h2 className="
                  mt-1
                  text-xl
                  font-bold
                  text-orange-600
                ">
                  ₹
                  {commissions
                    .reduce(
                      (sum, item) =>
                        sum +
                        Number(
                          item.remainingAmount ??
                            Math.max(
                              Number(
                                item.amount || 0
                              ) -
                                Number(
                                  item.paidAmount ||
                                    0
                                ),
                              0
                            )
                        ),
                      0
                    )
                    .toLocaleString("en-IN")}
                </h2>
              </div>

              <div className="
                w-11
                h-11
                rounded-xl
                bg-orange-100
                text-orange-600
                flex
                items-center
                justify-center
              ">
                <IndianRupee size={20} />
              </div>
            </div>
          </div>

          {/* RECORDS */}

          <div className="
            bg-white
            border
            border-gray-100
            rounded-2xl
            p-5
            shadow-sm
          ">
            <p className="
              text-sm
              text-gray-500
            ">
              Commission Records
            </p>

            <h2 className="
              mt-1
              text-xl
              font-bold
              text-purple-600
            ">
              {commissions.length}
            </h2>
          </div>

        </div>
      )}

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="
        bg-white
        rounded-2xl
        border
        border-gray-100
        shadow-sm
        overflow-hidden
      ">

        {/* TABLE HEADER */}

        <div className="
          p-5
          border-b
          flex
          items-center
          justify-between
        ">
          <div>
            <h2 className="
              text-lg
              font-semibold
              text-gray-800
            ">
              Commission Records
            </h2>

            <p className="
              text-sm
              text-gray-500
              mt-1
            ">
              Individual commission and payment details
            </p>
          </div>

          <span className="
            text-sm
            text-gray-500
          ">
            Total: {commissions.length}
          </span>
        </div>

        <div className="overflow-x-auto">

          <table className="
            w-full
            text-sm
          ">

            {/* =================================================
                THEAD
            ================================================= */}

            <thead>
              <tr className="
                bg-gray-50
                border-b
                text-gray-600
              ">

                <th className="
                  px-5
                  py-3
                  text-left
                  whitespace-nowrap
                ">
                  Student
                </th>

                <th className="
                  px-5
                  py-3
                  text-left
                  whitespace-nowrap
                ">
                  University
                </th>

                <th className="
                  px-5
                  py-3
                  text-left
                  whitespace-nowrap
                ">
                  Course
                </th>

                <th className="
                  px-5
                  py-3
                  text-right
                  whitespace-nowrap
                ">
                  Commission
                </th>

                <th className="
                  px-5
                  py-3
                  text-right
                  whitespace-nowrap
                ">
                  Paid
                </th>

                <th className="
                  px-5
                  py-3
                  text-right
                  whitespace-nowrap
                ">
                  Remaining
                </th>

                <th className="
                  px-5
                  py-3
                  text-center
                  whitespace-nowrap
                ">
                  Status
                </th>

                <th className="
                  px-5
                  py-3
                  text-center
                  whitespace-nowrap
                ">
                  Action
                </th>

              </tr>
            </thead>

            {/* =================================================
                TBODY
            ================================================= */}

            <tbody>

              {/* LOADING */}

              {loading ? (

                [...Array(5)].map(
                  (_, index) => (
                    <tr key={index}>

                      <td
                        colSpan="8"
                        className="px-5 py-5"
                      >
                        <div className="
                          h-7
                          bg-gray-200
                          rounded-lg
                          animate-pulse
                        " />
                      </td>

                    </tr>
                  )
                )

              ) : commissions.length === 0 ? (

                /* EMPTY */

                <tr>

                  <td
                    colSpan="8"
                    className="
                      py-12
                      text-center
                      text-gray-500
                    "
                  >
                    No commission records found.
                  </td>

                </tr>

              ) : (

                /* DATA */

                commissions.map((item) => {

                  const total =
                    Number(
                      item.amount || 0
                    );

                  const paid =
                    Number(
                      item.paidAmount || 0
                    );

                  const remaining =
                    Number(
                      item.remainingAmount ??
                        Math.max(
                          total - paid,
                          0
                        )
                    );

                  const status =
                    item.status || "Pending";

                  return (
                    <tr
                      key={item._id}
                      className="
                        border-b
                        hover:bg-gray-50
                        transition
                      "
                    >

                      {/* STUDENT */}

                      <td className="
                        px-5
                        py-4
                      ">
                        <p className="
                          font-medium
                          text-gray-800
                        ">
                          {item.student?.studentName ||
                            item.studentName ||
                            "N/A"}
                        </p>

                        <p className="
                          text-xs
                          text-gray-500
                          mt-1
                        ">
                          {item.student?.phoneNumber ||
                            "-"}
                        </p>
                      </td>

                      {/* UNIVERSITY */}

                      <td className="
                        px-5
                        py-4
                        text-gray-700
                      ">
                        {item.university?.universityName ||
                          item.universityName ||
                          "-"}
                      </td>

                      {/* COURSE */}

                      <td className="
                        px-5
                        py-4
                        text-gray-700
                      ">
                        {item.course?.courseName ||
                          item.courseName ||
                          "-"}
                      </td>

                      {/* TOTAL */}

                      <td className="
                        px-5
                        py-4
                        text-right
                        font-semibold
                        text-gray-800
                      ">
                        ₹
                        {total.toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      {/* PAID */}

                      <td className="
                        px-5
                        py-4
                        text-right
                        font-medium
                        text-green-600
                      ">
                        ₹
                        {paid.toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      {/* REMAINING */}

                      <td className="
                        px-5
                        py-4
                        text-right
                        font-medium
                        text-orange-600
                      ">
                        ₹
                        {remaining.toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      {/* STATUS */}

                      <td className="
                        px-5
                        py-4
                        text-center
                      ">
                        <span
                          className={`
                            inline-flex
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                            ${getStatusStyle(status)}
                          `}
                        >
                          {status}
                        </span>
                      </td>

                      {/* ACTION */}

                      <td className="
                        px-5
                        py-4
                        text-center
                      ">

                        {remaining > 0 ? (

                          <button
                            type="button"
                            onClick={() =>
                              handlePayment(item)
                            }
                            className="
                              inline-flex
                              items-center
                              justify-center
                              gap-2
                              px-3
                              py-2
                              rounded-lg
                              bg-blue-50
                              text-blue-600
                              hover:bg-blue-100
                              transition
                              font-medium
                            "
                            title="Add Payment"
                          >
                            <CreditCard size={17} />

                            Pay
                          </button>

                        ) : (

                          <span className="
                            text-xs
                            font-medium
                            text-green-600
                          ">
                            Fully Paid
                          </span>

                        )}

                      </td>

                    </tr>
                  );
                })

              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
    PAYMENT HISTORY
================================================= */}

{commissions.map((item) => (
  <div
    key={`payment-history-${item._id}`}
    className="px-5 pb-5"
  >
    <CommissionPaymentHistory
      commission={item}
      refresh={fetchCommissionHistory}
    />
  </div>
))}

        {/* =================================================
            PAGINATION INFO
        ================================================= */}

        {pagination && (
          <div className="
            px-5
            py-4
            border-t
            bg-gray-50
            text-sm
            text-gray-500
          ">
            Showing{" "}
            <span className="
              font-medium
              text-gray-700
            ">
              {commissions.length}
            </span>{" "}
            commission records
          </div>
        )}

      </div>

      {/* =================================================
          PAYMENT MODAL
      ================================================= */}

      <CommissionPaymentModal
        isOpen={showPayment}

        onClose={handleClosePayment}

        commissionId={
          selectedCommission?._id
        }

        refresh={fetchCommissionHistory}
      />

    </div>
  );
};

export default CommissionDetails;