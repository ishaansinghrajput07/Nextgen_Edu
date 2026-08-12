import { useState } from "react";
import {
  Pencil,
  Trash2,
  Calendar,
  CreditCard,
  Loader2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import commissionApi from "../../services/commissionApi";

const CommissionPaymentHistory = ({
  commission,
  refresh,
}) => {
  const [editingPayment, setEditingPayment] = useState(null);
  const [deletingPaymentId, setDeletingPaymentId] =
    useState(null);

  const [editLoading, setEditLoading] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const [editForm, setEditForm] = useState({
    amount: "",
    paymentMode: "Bank Transfer",
    transactionId: "",
    referenceNumber: "",
    remarks: "",
  });

  // =====================================================
  // PAYMENT HISTORY
  // =====================================================

  const payments =
    commission?.paymentHistory || [];

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return "-";
    }
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (date) => {
    if (!date) return "";

    try {
      return new Date(date).toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    } catch {
      return "";
    }
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const handleEdit = (payment) => {
    if (!payment?._id) {
      toast.error("Payment ID not found.");
      return;
    }

    setEditingPayment(payment);

    setEditForm({
      amount: payment.amount || "",
      paymentMode:
        payment.paymentMode || "Bank Transfer",
      transactionId:
        payment.transactionId || "",
      referenceNumber:
        payment.referenceNumber || "",
      remarks: payment.remarks || "",
    });
  };

  // =====================================================
  // CLOSE EDIT
  // =====================================================

  const closeEdit = () => {
    if (editLoading) return;

    setEditingPayment(null);

    setEditForm({
      amount: "",
      paymentMode: "Bank Transfer",
      transactionId: "",
      referenceNumber: "",
      remarks: "",
    });
  };

  // =====================================================
  // HANDLE EDIT CHANGE
  // =====================================================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // UPDATE PAYMENT
  // =====================================================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!commission?._id) {
      toast.error("Commission ID not found.");
      return;
    }

    if (!editingPayment?._id) {
      toast.error("Payment ID not found.");
      return;
    }

    const amount = Number(
      editForm.amount
    );

    if (!amount || amount <= 0) {
      toast.error(
        "Enter a valid payment amount."
      );
      return;
    }

    try {
      setEditLoading(true);

      await commissionApi.updateCommissionPayment(
        commission._id,
        editingPayment._id,
        {
          amount,
          paymentMode:
            editForm.paymentMode,
          transactionId:
            editForm.transactionId,
          referenceNumber:
            editForm.referenceNumber,
          remarks:
            editForm.remarks,
        }
      );

      toast.success(
        "Payment updated successfully."
      );

      closeEdit();

      if (refresh) {
        await refresh();
      }
    } catch (error) {
      console.error(
        "Update payment error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to update payment."
      );
    } finally {
      setEditLoading(false);
    }
  };

  // =====================================================
  // DELETE PAYMENT
  // =====================================================

  const handleDelete = async (payment) => {
    if (!commission?._id) {
      toast.error("Commission ID not found.");
      return;
    }

    if (!payment?._id) {
      toast.error("Payment ID not found.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete this payment of ₹${Number(
        payment.amount || 0
      ).toLocaleString("en-IN")}?`
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(true);
      setDeletingPaymentId(payment._id);

      await commissionApi.deleteCommissionPayment(
        commission._id,
        payment._id
      );

      toast.success(
        "Payment deleted successfully."
      );

      if (refresh) {
        await refresh();
      }
    } catch (error) {
      console.error(
        "Delete payment error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete payment."
      );
    } finally {
      setDeleteLoading(false);
      setDeletingPaymentId(null);
    }
  };

  return (
    <>
      {/* =================================================
          PAYMENT HISTORY
      ================================================= */}

      <div className="
        mt-5
        bg-gray-50
        border
        border-gray-200
        rounded-2xl
        overflow-hidden
      ">

        {/* HEADER */}

        <div className="
          px-5
          py-4
          border-b
          bg-white
          flex
          items-center
          justify-between
        ">

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              w-10
              h-10
              rounded-xl
              bg-blue-100
              text-blue-600
              flex
              items-center
              justify-center
            ">
              <CreditCard size={19} />
            </div>

            <div>
              <h3 className="
                text-base
                font-semibold
                text-gray-800
              ">
                Payment History
              </h3>

              <p className="
                text-xs
                text-gray-500
                mt-0.5
              ">
                All payments recorded for this commission
              </p>
            </div>

          </div>

          <span className="
            px-3
            py-1
            rounded-full
            bg-blue-50
            text-blue-600
            text-xs
            font-medium
          ">
            {payments.length} Payment
            {payments.length !== 1 ? "s" : ""}
          </span>

        </div>

        {/* NO PAYMENT */}

        {payments.length === 0 ? (

          <div className="
            px-5
            py-10
            text-center
            text-gray-500
            bg-white
          ">

            <CreditCard
              size={30}
              className="
                mx-auto
                mb-2
                text-gray-300
              "
            />

            <p className="
              text-sm
              font-medium
              text-gray-600
            ">
              No payment history found.
            </p>

            <p className="
              text-xs
              text-gray-400
              mt-1
            ">
              Payments will appear here after adding one.
            </p>

          </div>

        ) : (

          /* =================================================
             PAYMENT LIST
          ================================================= */

          <div className="divide-y divide-gray-200">

            {payments.map((payment) => {

              const amount =
                Number(
                  payment.amount || 0
                );

              const isDeleting =
                deletingPaymentId ===
                payment._id;

              return (
                <div
                  key={payment._id}
                  className="
                    bg-white
                    px-5
                    py-4
                    hover:bg-gray-50
                    transition
                  "
                >

                  <div className="
                    flex
                    flex-col
                    lg:flex-row
                    lg:items-center
                    justify-between
                    gap-4
                  ">

                    {/* LEFT */}

                    <div className="
                      flex
                      items-start
                      gap-3
                    ">

                      <div className="
                        w-10
                        h-10
                        rounded-xl
                        bg-green-100
                        text-green-600
                        flex
                        items-center
                        justify-center
                        shrink-0
                      ">
                        <CreditCard size={18} />
                      </div>

                      <div>

                        <div className="
                          flex
                          items-center
                          gap-2
                          flex-wrap
                        ">

                          <span className="
                            text-lg
                            font-bold
                            text-green-600
                          ">
                            ₹
                            {amount.toLocaleString(
                              "en-IN"
                            )}
                          </span>

                          <span className="
                            px-2.5
                            py-1
                            rounded-full
                            bg-gray-100
                            text-gray-600
                            text-xs
                            font-medium
                          ">
                            {payment.paymentMode ||
                              "Bank Transfer"}
                          </span>

                        </div>

                        {/* DATE */}

                        <div className="
                          flex
                          items-center
                          gap-1.5
                          mt-1.5
                          text-xs
                          text-gray-500
                        ">
                          <Calendar size={13} />

                          {formatDate(
                            payment.paymentDate
                          )}

                          {formatTime(
                            payment.paymentDate
                          ) &&
                            ` • ${formatTime(
                              payment.paymentDate
                            )}`}
                        </div>

                      </div>

                    </div>

                    {/* RIGHT ACTIONS */}

                    <div className="
                      flex
                      items-center
                      gap-2
                    ">

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(payment)
                        }
                        disabled={
                          deleteLoading ||
                          isDeleting
                        }
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          px-3
                          py-2
                          rounded-lg
                          bg-blue-50
                          text-blue-600
                          hover:bg-blue-100
                          disabled:opacity-40
                          transition
                          text-sm
                          font-medium
                        "
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(payment)
                        }
                        disabled={
                          deleteLoading ||
                          isDeleting
                        }
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          px-3
                          py-2
                          rounded-lg
                          bg-red-50
                          text-red-600
                          hover:bg-red-100
                          disabled:opacity-40
                          transition
                          text-sm
                          font-medium
                        "
                      >
                        {isDeleting ? (
                          <Loader2
                            size={15}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={15} />
                        )}

                        Delete
                      </button>

                    </div>

                  </div>

                  {/* EXTRA DETAILS */}

                  {(payment.transactionId ||
                    payment.referenceNumber ||
                    payment.remarks) && (

                    <div className="
                      mt-4
                      ml-0
                      lg:ml-13
                      grid
                      grid-cols-1
                      md:grid-cols-3
                      gap-3
                    ">

                      {payment.transactionId && (
                        <div className="
                          bg-gray-50
                          rounded-lg
                          p-3
                        ">
                          <p className="
                            text-[11px]
                            text-gray-400
                            uppercase
                            tracking-wide
                          ">
                            Transaction ID
                          </p>

                          <p className="
                            text-sm
                            font-medium
                            text-gray-700
                            mt-1
                            break-all
                          ">
                            {payment.transactionId}
                          </p>
                        </div>
                      )}

                      {payment.referenceNumber && (
                        <div className="
                          bg-gray-50
                          rounded-lg
                          p-3
                        ">
                          <p className="
                            text-[11px]
                            text-gray-400
                            uppercase
                            tracking-wide
                          ">
                            Reference Number
                          </p>

                          <p className="
                            text-sm
                            font-medium
                            text-gray-700
                            mt-1
                            break-all
                          ">
                            {payment.referenceNumber}
                          </p>
                        </div>
                      )}

                      {payment.remarks && (
                        <div className="
                          bg-gray-50
                          rounded-lg
                          p-3
                        ">
                          <p className="
                            text-[11px]
                            text-gray-400
                            uppercase
                            tracking-wide
                          ">
                            Remarks
                          </p>

                          <p className="
                            text-sm
                            text-gray-700
                            mt-1
                            break-words
                          ">
                            {payment.remarks}
                          </p>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* =================================================
          EDIT PAYMENT MODAL
      ================================================= */}

      {editingPayment && (

        <div className="
          fixed
          inset-0
          z-[110]
          flex
          items-center
          justify-center
          p-4
          bg-black/50
          backdrop-blur-sm
        ">

          <div className="
            w-full
            max-w-lg
            bg-white
            rounded-2xl
            shadow-2xl
            overflow-hidden
          ">

            {/* MODAL HEADER */}

            <div className="
              px-5
              py-4
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
                  Edit Payment
                </h2>

                <p className="
                  text-xs
                  text-gray-500
                  mt-1
                ">
                  Update payment information
                </p>
              </div>

              <button
                type="button"
                onClick={closeEdit}
                disabled={editLoading}
                className="
                  p-2
                  rounded-lg
                  text-gray-500
                  hover:bg-gray-100
                  disabled:opacity-40
                "
              >
                <X size={19} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleUpdate}
              className="p-5 space-y-4"
            >

              {/* AMOUNT */}

              <div>
                <label className="
                  text-sm
                  font-medium
                  text-gray-700
                ">
                  Amount *
                </label>

                <input
                  type="number"
                  min="1"
                  step="0.01"
                  name="amount"
                  value={editForm.amount}
                  onChange={
                    handleEditChange
                  }
                  disabled={editLoading}
                  className="
                    mt-1
                    w-full
                    px-3
                    py-2.5
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    focus:ring-2
                    focus:ring-blue-400
                    disabled:bg-gray-100
                  "
                />
              </div>

              {/* PAYMENT MODE */}

              <div>
                <label className="
                  text-sm
                  font-medium
                  text-gray-700
                ">
                  Payment Mode
                </label>

                <select
                  name="paymentMode"
                  value={
                    editForm.paymentMode
                  }
                  onChange={
                    handleEditChange
                  }
                  disabled={editLoading}
                  className="
                    mt-1
                    w-full
                    px-3
                    py-2.5
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    disabled:bg-gray-100
                  "
                >
                  <option>
                    Bank Transfer
                  </option>

                  <option>UPI</option>

                  <option>Cash</option>

                  <option>Cheque</option>

                  <option>Online</option>
                </select>
              </div>

              {/* TRANSACTION ID */}

              <div>
                <label className="
                  text-sm
                  font-medium
                  text-gray-700
                ">
                  Transaction ID
                </label>

                <input
                  type="text"
                  name="transactionId"
                  value={
                    editForm.transactionId
                  }
                  onChange={
                    handleEditChange
                  }
                  disabled={editLoading}
                  className="
                    mt-1
                    w-full
                    px-3
                    py-2.5
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    focus:ring-2
                    focus:ring-blue-400
                    disabled:bg-gray-100
                  "
                />
              </div>

              {/* REFERENCE */}

              <div>
                <label className="
                  text-sm
                  font-medium
                  text-gray-700
                ">
                  Reference Number
                </label>

                <input
                  type="text"
                  name="referenceNumber"
                  value={
                    editForm.referenceNumber
                  }
                  onChange={
                    handleEditChange
                  }
                  disabled={editLoading}
                  className="
                    mt-1
                    w-full
                    px-3
                    py-2.5
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    focus:ring-2
                    focus:ring-blue-400
                    disabled:bg-gray-100
                  "
                />
              </div>

              {/* REMARKS */}

              <div>
                <label className="
                  text-sm
                  font-medium
                  text-gray-700
                ">
                  Remarks
                </label>

                <textarea
                  name="remarks"
                  value={
                    editForm.remarks
                  }
                  onChange={
                    handleEditChange
                  }
                  disabled={editLoading}
                  rows={3}
                  className="
                    mt-1
                    w-full
                    px-3
                    py-2.5
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    resize-none
                    focus:ring-2
                    focus:ring-blue-400
                    disabled:bg-gray-100
                  "
                />
              </div>

              {/* BUTTONS */}

              <div className="
                flex
                justify-end
                gap-3
                pt-2
              ">

                <button
                  type="button"
                  onClick={closeEdit}
                  disabled={editLoading}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    bg-gray-100
                    text-gray-700
                    hover:bg-gray-200
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={editLoading}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    bg-blue-600
                    text-white
                    hover:bg-blue-700
                    disabled:opacity-60
                    flex
                    items-center
                    gap-2
                  "
                >

                  {editLoading && (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  )}

                  Update Payment

                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </>
  );
};

export default CommissionPaymentHistory;