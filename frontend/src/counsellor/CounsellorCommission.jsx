import { useCallback, useEffect, useState } from "react";
import {
  RefreshCcw,
  IndianRupee,
  Clock3,
  CheckCircle2,
  History,
  CalendarDays,
  CreditCard,
  ReceiptText,
} from "lucide-react";
import toast from "react-hot-toast";
import commissionApi from "../services/commissionApi";

const CounsellorCommission = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [summary, setSummary] = useState({
    totalCommission: 0,
    paidCommission: 0,
    pendingCommission: 0,
  });

  const [commissions, setCommissions] = useState([]);

  // =====================================================
  // FETCH COMMISSION
  // =====================================================

  const fetchCommission = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await commissionApi.getMyCommission();

      console.log("COUNSELLOR COMMISSION RESPONSE:", response);

      const commissionList = Array.isArray(response?.commissions)
        ? response.commissions
        : [];

      // =====================================================
      // CALCULATE SUMMARY FROM COMMISSION RECORDS
      // =====================================================

      const totalCommission = commissionList.reduce(
        (total, item) => total + Number(item?.amount || 0),
        0,
      );

      const paidCommission = commissionList.reduce(
        (total, item) => total + Number(item?.paidAmount || 0),
        0,
      );

      const pendingCommission = commissionList.reduce(
        (total, item) =>
          total +
          Number(
            item?.remainingAmount ??
              Math.max(
                Number(item?.amount || 0) - Number(item?.paidAmount || 0),
                0,
              ),
          ),
        0,
      );

      setSummary({
        totalCommission,
        paidCommission,
        pendingCommission,
      });

      setCommissions(commissionList);

      console.log("COUNSELLOR CALCULATED SUMMARY:", {
        totalCommission,
        paidCommission,
        pendingCommission,
      });
    } catch (error) {
      console.error(
        "COUNSELLOR COMMISSION ERROR:",
        error?.response?.data || error?.message,
      );

      toast.error(
        error?.response?.data?.message || "Failed to load commission data.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCommission();
  }, [fetchCommission]);

  // =====================================================
  // FORMAT MONEY
  // =====================================================

  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString("en-IN");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="h-10 w-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="text-slate-500 font-medium mt-4">
            Loading commission...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            My Commission
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Track your earned, paid and pending commission
          </p>
        </div>

        <button
          onClick={() => fetchCommission(true)}
          disabled={refreshing}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            px-4
            py-2.5
            rounded-xl
            bg-slate-900
            text-white
            text-sm
            font-medium
            hover:bg-slate-800
            transition
            disabled:opacity-50
          "
        >
          <RefreshCcw size={17} className={refreshing ? "animate-spin" : ""} />

          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <CommissionStatCard
          title="Total Commission"
          value={commissions.reduce(
            (total, item) => total + Number(item?.amount || 0),
            0,
          )}
          icon={IndianRupee}
          iconClass="bg-blue-50 text-blue-600"
          valueClass="text-slate-900"
          formatMoney={formatMoney}
        />

        <CommissionStatCard
          title="Paid Commission"
          value={commissions.reduce(
            (total, item) => total + Number(item?.paidAmount || 0),
            0,
          )}
          icon={CheckCircle2}
          iconClass="bg-emerald-50 text-emerald-600"
          valueClass="text-emerald-600"
          formatMoney={formatMoney}
        />

        <CommissionStatCard
          title="Pending Commission"
          value={commissions.reduce(
            (total, item) =>
              total +
              Number(
                item?.remainingAmount ??
                  Math.max(
                    Number(item?.amount || 0) - Number(item?.paidAmount || 0),
                    0,
                  ),
              ),
            0,
          )}
          icon={Clock3}
          iconClass="bg-amber-50 text-amber-600"
          valueClass="text-amber-600"
          formatMoney={formatMoney}
        />
      </div>

      {/* =====================================================
          COMMISSION LIST
      ===================================================== */}

      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Commission Details
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Commission generated from your admissions
            </p>
          </div>
        </div>

        {commissions.length === 0 ? (
          <EmptyCommission />
        ) : (
          <div className="divide-y divide-slate-100">
            {commissions.map((item, index) => (
              <CommissionItem
                key={item?._id || index}
                item={item}
                formatMoney={formatMoney}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

// =========================================================
// STAT CARD
// =========================================================

const CommissionStatCard = ({
  title,
  value,
  icon: Icon,
  iconClass,
  valueClass,
  formatMoney,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-100
        shadow-sm
        p-5
        hover:shadow-md
        transition
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>

          <h2 className={`text-3xl font-bold mt-2 ${valueClass}`}>
            ₹{formatMoney(value)}
          </h2>
        </div>

        <div
          className={`
            h-12
            w-12
            rounded-2xl
            flex
            items-center
            justify-center
            ${iconClass}
          `}
        >
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
};

// =========================================================
// COMMISSION ITEM
// =========================================================

const CommissionItem = ({ item, formatMoney }) => {
  const commissionAmount = Number(item?.amount || 0);

  const paidAmount = Number(item?.paidAmount || 0);

  const pendingAmount = Number(
    item?.remainingAmount ?? Math.max(commissionAmount - paidAmount, 0),
  );

  const status = item?.status || "Pending";

  // =======================================================
  // STATUS CLASS
  // =======================================================

  const getStatusClass = () => {
    const value = status.toLowerCase();

    if (value === "paid") {
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }

    if (value === "partial") {
      return "bg-amber-50 text-amber-700 border-amber-100";
    }

    return "bg-red-50 text-red-700 border-red-100";
  };

  return (
    <div className="p-5 md:p-6">
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-5
          gap-5
          items-start
        "
      >
        {/* =================================================
            STUDENT / UNIVERSITY / COURSE
        ================================================= */}

        <div className="lg:col-span-2 min-w-0">
          <p className="text-xs text-slate-400 uppercase tracking-wide">
            Student
          </p>

          <h3 className="font-semibold text-slate-900 mt-1 truncate">
            {item?.studentName ||
              item?.student?.studentName ||
              "Unknown Student"}
          </h3>

          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
            <p className="text-sm text-slate-500">
              University:{" "}
              <span className="font-medium text-slate-700">
                {item?.universityName ||
                  item?.university?.universityName ||
                  "Not available"}
              </span>
            </p>
          </div>

          <p className="text-sm text-slate-500 mt-1">
            Course:{" "}
            <span className="font-medium text-slate-700">
              {item?.courseName || item?.course?.courseName || "Not available"}
            </span>
          </p>
        </div>

        {/* =================================================
            COMMISSION
        ================================================= */}

        <div>
          <p className="text-xs text-slate-400">Commission</p>

          <p className="font-bold text-slate-900 mt-1">
            ₹{formatMoney(commissionAmount)}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {item?.percentage || 0}% commission
          </p>
        </div>

        {/* =================================================
            PAID
        ================================================= */}

        <div>
          <p className="text-xs text-slate-400">Paid</p>

          <p className="font-bold text-emerald-600 mt-1">
            ₹{formatMoney(paidAmount)}
          </p>
        </div>

        {/* =================================================
            PENDING
        ================================================= */}

        <div>
          <p className="text-xs text-slate-400">Pending</p>

          <p className="font-bold text-amber-600 mt-1">
            ₹{formatMoney(pendingAmount)}
          </p>

          <div className="lg:text-right mt-2">
            <span
              className={`
                inline-flex
                items-center
                rounded-full
                border
                px-3
                py-1.5
                text-xs
                font-semibold
                ${getStatusClass()}
              `}
            >
              {status}
            </span>
          </div>
        </div>

        {/* =================================================
            PAYMENT HISTORY
        ================================================= */}

        <div className="lg:col-span-5 pt-5 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="
                h-10
                w-10
                rounded-xl
                bg-blue-50
                text-blue-600
                flex
                items-center
                justify-center
              "
            >
              <History size={19} />
            </div>

            <div>
              <h4 className="font-semibold text-slate-900">Payment History</h4>

              <p className="text-xs text-slate-400 mt-0.5">
                Payments received against this commission
              </p>
            </div>
          </div>

          {Array.isArray(item?.paymentHistory) &&
          item.paymentHistory.length > 0 ? (
            <div className="space-y-3">
              {item.paymentHistory.map((payment, index) => (
                <PaymentHistoryItem
                  key={payment?._id || index}
                  payment={payment}
                  formatMoney={formatMoney}
                />
              ))}
            </div>
          ) : (
            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-slate-200
                bg-slate-50
                p-6
                text-center
              "
            >
              <ReceiptText size={26} className="mx-auto text-slate-400" />

              <p className="mt-2 text-sm font-semibold text-slate-600">
                No payment history
              </p>

              <p className="text-xs text-slate-400 mt-1">
                No commission payment has been recorded yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// =========================================================
// PAYMENT HISTORY ITEM
// =========================================================

const PaymentHistoryItem = ({ payment, formatMoney }) => {
  const amount = Number(
    payment?.amount || payment?.paidAmount || payment?.paymentAmount || 0,
  );

  const paymentMode = payment?.paymentMode || payment?.mode || "Not specified";

  const transactionId =
    payment?.transactionId || payment?.referenceNumber || "";

  const remarks = payment?.remarks || "";

  const paymentDate = payment?.paymentDate || payment?.createdAt || null;

  const formattedDate = paymentDate
    ? new Date(paymentDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Date not available";

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-100
        bg-slate-50/70
        p-4
        hover:bg-slate-50
        transition
      "
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* LEFT */}

        <div className="flex items-center gap-3">
          <div
            className="
              h-10
              w-10
              rounded-xl
              bg-emerald-50
              text-emerald-600
              flex
              items-center
              justify-center
            "
          >
            <IndianRupee size={18} />
          </div>

          <div>
            <p className="font-bold text-slate-900">₹{formatMoney(amount)}</p>

            <div className="flex flex-wrap items-center gap-3 mt-1">
              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                <CreditCard size={13} />
                {paymentMode}
              </span>

              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                <CalendarDays size={13} />
                {formattedDate}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="md:text-right">
          {transactionId && (
            <>
              <p className="text-xs text-slate-400">Transaction ID</p>

              <p className="text-sm font-medium text-slate-700 break-all mt-1">
                {transactionId}
              </p>
            </>
          )}

          {remarks && <p className="text-xs text-slate-500 mt-2">{remarks}</p>}
        </div>
      </div>
    </div>
  );
};

// =========================================================
// EMPTY COMMISSION
// =========================================================

const EmptyCommission = () => {
  return (
    <div className="p-10 text-center">
      <div
        className="
          h-14
          w-14
          rounded-2xl
          bg-slate-100
          text-slate-400
          flex
          items-center
          justify-center
          mx-auto
        "
      >
        <IndianRupee size={24} />
      </div>

      <h3 className="mt-4 font-semibold text-slate-700">No commission found</h3>

      <p className="text-sm text-slate-400 mt-1">
        Your commission details will appear here.
      </p>
    </div>
  );
};

export default CounsellorCommission;
