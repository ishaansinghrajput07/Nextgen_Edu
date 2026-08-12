import { useState } from "react";
import { X, Check } from "lucide-react";
import admissionApi from "../../services/admissionApi";
import toast from "react-hot-toast";

const AdmissionPaymentModal = ({ admissionId, admission, type, onClose, onSaved }) => {
  // Prefill computed values from admission when available
  const universityCommissionAmount = admission?.universityCommissionAmount || 0;
  const counsellorCommissionAmount = admission?.counsellorCommissionAmount || 0;

  const totalUniversityPaid = (admission?.universityPayments || []).reduce((s, p) => s + (p.amount || 0), 0);
  const totalCounsellorPaid = (admission?.counsellorPayments || []).reduce((s, p) => s + (p.amount || 0), 0);

  const [amount, setAmount] = useState(type === "university" ? Math.max(universityCommissionAmount - totalUniversityPaid, 0) : Math.max(counsellorCommissionAmount - totalCounsellorPaid, 0));
  const [paymentMode, setPaymentMode] = useState("Bank Transfer");
  const [transactionId, setTransactionId] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatusOption, setPaymentStatusOption] = useState(type === "university" ? (admission?.universityPaymentStatus || "Pending") : (admission?.counsellorPaymentStatus || "Pending"));

  const submit = async () => {
    try {
      setLoading(true);

      const base = type === "university"
        ? { universityPayment: { amount, paymentMode, transactionId, referenceNumber, remarks }, universityPaymentStatus: paymentStatusOption }
        : { counsellorPayment: { amount, paymentMode, transactionId, referenceNumber, remarks }, counsellorPaymentStatus: paymentStatusOption };

      const payload = base;

      const { data } = await admissionApi.put(`/admissions/${admissionId}`, payload);

      toast.success(data.message || "Payment recorded");

      onSaved && onSaved(data.admission);

      onClose && onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to record payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Record {type === "university" ? "University" : "Counsellor"} Payment</h3>
          <button onClick={onClose} className="text-gray-600"><X /></button>
        </div>

        <div className="space-y-3">

          {/* Prefilled summary */}
          {admission && (
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-sm text-gray-600">University: <span className="font-medium">{admission.universityName}</span></div>
              <div className="text-sm text-gray-600">Student: <span className="font-medium">{admission.studentName}</span></div>
              <div className="text-sm text-gray-600">Course: <span className="font-medium">{admission.courseName}</span></div>
              <div className="text-sm text-gray-600">Net Fee: <span className="font-medium">₹{(admission.netFee || 0).toLocaleString()}</span></div>
              {type === "university" ? (
                <div className="text-sm text-gray-600">University Commission: <span className="font-medium">{admission.universityCommissionPercent}% → ₹{(admission.universityCommissionAmount || 0).toLocaleString()}</span></div>
              ) : (
                <div className="text-sm text-gray-600">Counsellor Commission: <span className="font-medium">{admission.counsellorCommissionPercent}% → ₹{(admission.counsellorCommissionAmount || 0).toLocaleString()}</span></div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-600">Payment Status</label>
            <select value={paymentStatusOption} onChange={(e)=>setPaymentStatusOption(e.target.value)} className="w-full mt-1 p-2 border rounded">
              <option>Pending</option>
              <option>Partial</option>
              <option>Paid</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Select 'Paid' to enable the submit button.</p>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Amount</label>
            <input type="number" value={amount} onChange={(e)=>setAmount(Number(e.target.value))} className="w-full mt-1 p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Payment Mode</label>
            <select value={paymentMode} onChange={(e)=>setPaymentMode(e.target.value)} className="w-full mt-1 p-2 border rounded">
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>UPI</option>
              <option>Cheque</option>
              <option>Online</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Transaction ID / Ref</label>
            <input value={transactionId} onChange={(e)=>setTransactionId(e.target.value)} className="w-full mt-1 p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Reference Number</label>
            <input value={referenceNumber} onChange={(e)=>setReferenceNumber(e.target.value)} className="w-full mt-1 p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Remarks</label>
            <textarea value={remarks} onChange={(e)=>setRemarks(e.target.value)} className="w-full mt-1 p-2 border rounded" rows={3} />
          </div>

          <div className="flex justify-end gap-2 mt-4 items-center">
            <button onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>

            {paymentStatusOption === "Paid" ? (
              <button onClick={submit} disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white flex items-center gap-2">
                <Check /> {loading ? "Saving..." : "Submit Payment"}
              </button>
            ) : (
              <div className="text-sm text-gray-500">Select 'Paid' to show submit button.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPaymentModal;
