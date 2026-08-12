import {
  Trash2,
  CalendarDays,
  CreditCard,
  Loader2,
  ReceiptText,
} from "lucide-react";

const CommissionHistory = ({
  payments = [],
  loading = false,
  onDelete,
}) => {
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="
      bg-white
      rounded-2xl
      border
      border-gray-100
      shadow-sm
      overflow-hidden
    ">
      {/* HEADER */}

      <div className="
        p-5
        border-b
      ">
        <div className="
          flex
          items-center
          gap-2
        ">
          <ReceiptText
            size={20}
            className="text-blue-600"
          />

          <h2 className="
            text-lg
            font-semibold
            text-gray-800
          ">
            Payment History
          </h2>
        </div>

        <p className="
          text-sm
          text-gray-500
          mt-1
        ">
          All commission payment records
        </p>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">
        <table className="
          w-full
          text-sm
        ">
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
              ">
                Date
              </th>

              <th className="
                px-5
                py-3
                text-center
              ">
                Amount
              </th>

              <th className="
                px-5
                py-3
                text-center
              ">
                Payment Mode
              </th>

              <th className="
                px-5
                py-3
                text-center
              ">
                Transaction ID
              </th>

              <th className="
                px-5
                py-3
                text-center
              ">
                Remarks
              </th>

              <th className="
                px-5
                py-3
                text-center
              ">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="
                    py-10
                    text-center
                  "
                >
                  <Loader2
                    size={28}
                    className="
                      mx-auto
                      animate-spin
                      text-blue-600
                    "
                  />
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="
                    py-10
                    text-center
                    text-gray-500
                  "
                >
                  No payment history found.
                </td>
              </tr>
            ) : (
              payments.map(
                (payment, index) => (
                  <tr
                    key={
                      payment._id ||
                      index
                    }
                    className="
                      border-b
                      hover:bg-gray-50
                    "
                  >
                    {/* DATE */}

                    <td className="
                      px-5
                      py-4
                    ">
                      <div className="
                        flex
                        items-center
                        gap-2
                        text-gray-700
                      ">
                        <CalendarDays
                          size={16}
                          className="
                            text-blue-500
                          "
                        />

                        {formatDate(
                          payment.paymentDate
                        )}
                      </div>
                    </td>

                    {/* AMOUNT */}

                    <td className="
                      px-5
                      py-4
                      text-center
                      font-semibold
                      text-green-600
                    ">
                      ₹{" "}
                      {Number(
                        payment.amount || 0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    {/* MODE */}

                    <td className="
                      px-5
                      py-4
                    ">
                      <div className="
                        flex
                        items-center
                        justify-center
                        gap-2
                      ">
                        <CreditCard
                          size={16}
                          className="
                            text-gray-400
                          "
                        />

                        {payment.paymentMode ||
                          "-"}
                      </div>
                    </td>

                    {/* TRANSACTION */}

                    <td className="
                      px-5
                      py-4
                      text-center
                    ">
                      {payment.transactionId ||
                        "-"}
                    </td>

                    {/* REMARKS */}

                    <td className="
                      px-5
                      py-4
                      text-center
                      max-w-xs
                    ">
                      <span className="
                        line-clamp-2
                        text-gray-600
                      ">
                        {payment.remarks ||
                          "-"}
                      </span>
                    </td>

                    {/* DELETE */}

                    <td className="
                      px-5
                      py-4
                      text-center
                    ">
                      <button
                        type="button"
                        onClick={() =>
                          onDelete?.(
                            payment._id
                          )
                        }
                        disabled={
                          !payment._id
                        }
                        className="
                          p-2
                          rounded-lg
                          bg-red-50
                          text-red-600
                          hover:bg-red-100
                          disabled:opacity-40
                        "
                        title="Delete payment"
                      >
                        <Trash2
                          size={18}
                        />
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommissionHistory;