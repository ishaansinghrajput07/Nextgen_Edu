import {
  X,
  IndianRupee,
  Loader2,
} from "lucide-react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import commissionApi from "../../services/commissionApi";

const initialForm = {
  amount: "",
  paymentMode: "Bank Transfer",
  transactionId: "",
  referenceNumber: "",
  remarks: "",
};

const CommissionPaymentModal = ({
  isOpen,
  onClose,
  commissionId,
  refresh,
}) => {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState(initialForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialForm);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commissionId) {
      toast.error(
        "Commission not selected."
      );
      return;
    }

    const amount = Number(
      formData.amount
    );

    if (!amount || amount <= 0) {
      toast.error(
        "Enter a valid payment amount."
      );
      return;
    }

    try {
      setLoading(true);

      await commissionApi.addCommissionPayment(
        commissionId,
        {
          amount,
          paymentMode:
            formData.paymentMode,
          transactionId:
            formData.transactionId,
          referenceNumber:
            formData.referenceNumber,
          remarks:
            formData.remarks,
        }
      );

      toast.success(
        "Commission payment added successfully."
      );

      setFormData(initialForm);

      onClose();

      if (refresh) {
        await refresh();
      }
    } catch (error) {
      console.error(
        "Payment error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to add payment."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="
      fixed
      inset-0
      z-[100]
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
        {/* HEADER */}

        <div className="
          flex
          items-center
          justify-between
          p-5
          border-b
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
              <IndianRupee
                size={20}
              />
            </div>

            <div>
              <h2 className="
                text-lg
                font-semibold
                text-gray-800
              ">
                Add Commission Payment
              </h2>

              <p className="
                text-xs
                text-gray-500
              ">
                Record counsellor payment
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              p-2
              rounded-lg
              hover:bg-gray-100
              text-gray-500
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
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

            <div className="relative mt-1">
              <IndianRupee
                size={17}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="number"
                min="1"
                step="0.01"
                name="amount"
                value={
                  formData.amount
                }
                onChange={
                  handleChange
                }
                placeholder="Enter payment amount"
                className="
                  w-full
                  pl-9
                  pr-3
                  py-2.5
                  rounded-xl
                  border
                  border-gray-200
                  outline-none
                  focus:ring-2
                  focus:ring-blue-400
                "
              />
            </div>
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
                formData.paymentMode
              }
              onChange={
                handleChange
              }
              className="
                mt-1
                w-full
                px-3
                py-2.5
                rounded-xl
                border
                border-gray-200
                outline-none
              "
            >
              <option>
                Bank Transfer
              </option>

              <option>
                UPI
              </option>

              <option>
                Cash
              </option>

              <option>
                Cheque
              </option>

              <option>
                Online
              </option>
            </select>
          </div>

          {/* TRANSACTION */}

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
                formData.transactionId
              }
              onChange={
                handleChange
              }
              placeholder="Transaction ID"
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
                formData.referenceNumber
              }
              onChange={
                handleChange
              }
              placeholder="Reference number"
              className="
                mt-1
                w-full
                px-3
                py-2.5
                rounded-xl
                border
                border-gray-200
                outline-none
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
                formData.remarks
              }
              onChange={
                handleChange
              }
              rows={3}
              placeholder="Payment notes..."
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
              onClick={onClose}
              disabled={loading}
              className="
                px-5
                py-2.5
                rounded-xl
                bg-gray-100
                text-gray-700
                hover:bg-gray-200
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                px-5
                py-2.5
                rounded-xl
                bg-blue-600
                text-white
                hover:bg-blue-700
                flex
                items-center
                gap-2
                disabled:opacity-60
              "
            >
              {loading && (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              )}

              Save Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommissionPaymentModal;