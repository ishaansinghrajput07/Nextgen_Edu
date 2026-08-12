import {
  Eye,
  CreditCard,
} from "lucide-react";

const CommissionTable = ({
  commissions = [],
  loading,
  onView,
  onPayment,
}) => {

  const getStatus = (total, paid) => {
    const totalAmount = Number(total || 0);
    const paidAmount = Number(paid || 0);

    if (totalAmount <= 0) {
      return "Pending";
    }

    if (paidAmount >= totalAmount) {
      return "Paid";
    }

    if (paidAmount > 0) {
      return "Partial";
    }

    return "Pending";
  };

  const statusStyle = (status) => {
    if (status === "Paid") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Partial") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
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
        flex
        justify-between
        items-center
      ">
        <div>
          <h2 className="
            text-lg
            font-semibold
            text-gray-800
          ">
            Counsellor Commission
          </h2>

          <p className="
            text-sm
            text-gray-500
            mt-1
          ">
            Counsellor wise commission report
          </p>
        </div>

        <span className="
          text-sm
          text-gray-500
        ">
          Total: {commissions.length}
        </span>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>
            <tr className="
              bg-gray-50
              text-gray-600
              border-b
            ">

              <th className="px-5 py-3 text-left">
                Counsellor
              </th>

              <th className="px-5 py-3">
                Total Commission
              </th>

              <th className="px-5 py-3">
                Paid
              </th>

              <th className="px-5 py-3">
                Pending
              </th>

              <th className="px-5 py-3">
                Status
              </th>

              <th className="px-5 py-3">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td
                    colSpan="6"
                    className="px-5 py-5"
                  >
                    <div className="
                      h-6
                      bg-gray-200
                      rounded-lg
                      animate-pulse
                    " />
                  </td>
                </tr>
              ))
            ) : commissions.length === 0 ? (

              <tr>
                <td
                  colSpan="6"
                  className="
                    text-center
                    py-10
                    text-gray-500
                  "
                >
                  No commission data found.
                </td>
              </tr>

            ) : (

              commissions.map((item, index) => {

                const total =
                  Number(
                    item.totalCommission || 0
                  );

                const paid =
                  Number(
                    item.paidCommission || 0
                  );

                const pending =
                  Math.max(
                    total - paid,
                    0
                  );

                const status =
                  getStatus(total, paid);

                return (
                  <tr
                    key={
                      item._id ||
                      item.employeeId ||
                      index
                    }
                    className="
                      border-b
                      hover:bg-gray-50
                      transition
                    "
                  >

                    {/* COUNSELLOR */}

                    <td className="
                      px-5
                      py-4
                    ">
                      <p className="
                        font-semibold
                        text-gray-800
                      ">
                        {item.counsellorName ||
                          "N/A"}
                      </p>

                      <p className="
                        text-xs
                        text-gray-500
                      ">
                        {item.employeeId || "-"}
                      </p>
                    </td>

                    {/* TOTAL */}

                    <td className="
                      px-5
                      py-4
                      text-center
                      font-semibold
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
                      text-center
                      text-green-600
                      font-medium
                    ">
                      ₹
                      {paid.toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    {/* PENDING */}

                    <td className="
                      px-5
                      py-4
                      text-center
                      text-orange-600
                      font-medium
                    ">
                      ₹
                      {pending.toLocaleString(
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
                          ${statusStyle(status)}
                        `}
                      >
                        {status}
                      </span>
                    </td>

                    {/* ACTION */}

                    <td className="px-5 py-4">
  <div className="flex items-center justify-center gap-2">

    {/* VIEW */}
    <button
  type="button"
  onClick={() => {
    console.log("CLICKED COUNSELLOR:", item);
    console.log("COUNSELLOR ID:", item.counsellorId);

    if (!item.counsellorId) {
      console.error("Counsellor ID missing!");
      return;
    }

    onView?.(item.counsellorId);
  }}
  className="
    p-2
    rounded-lg
    bg-blue-50
    text-blue-600
    hover:bg-blue-100
  "
>
  <Eye size={18} />
</button>

    {/* PAYMENT */}
    <button
      type="button"
      onClick={() => onPayment?.(item)}
      title="Add payment"
      className="
        p-2
        rounded-lg
        bg-green-50
        text-green-600
        hover:bg-green-100
        transition
      "
    >
      <CreditCard size={18} />
    </button>

  </div>
</td>
                  </tr>
                );
              })
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default CommissionTable;