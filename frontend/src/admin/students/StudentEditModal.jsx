import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Save,
  GraduationCap,
  Building2,
  Globe,
  Calendar,
  IndianRupee,
  Percent,
} from "lucide-react";

const StudentEditModal = ({
  open,
  student,
  onClose,
  onSuccess,
}) => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phoneNumber: "",
    university: "",
    course: "",
    country: "",
    intake: "",
    tuitionFee: "",
    commissionPercent: "",
    commissionAmount: "",
    paymentStatus: "Pending",
    admissionStatus: "Enrolled",
    notes: "",
  });

  useEffect(() => {
    if (!student) return;

    setFormData({
      studentName: student.studentName || "",
      email: student.email || "",
      phoneNumber: student.phoneNumber || "",
      university: student.university || "",
      course: student.course || "",
      country: student.country || "",
      intake: student.intake || "",
      tuitionFee: student.tuitionFee || "",
      commissionPercent: student.commissionPercent || "",
      commissionAmount: student.commissionAmount || "",
      paymentStatus: student.paymentStatus || "Pending",
      admissionStatus: student.admissionStatus || "Enrolled",
      notes: student.notes || "",
    });
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student?._id) return;

    try {
      setLoading(true);

      await axios.put(
        `http://localhost:8000/api/v1/student/${student._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Student updated successfully");

      onSuccess?.();

      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* =====================================================
              BACKDROP
          ===================================================== */}

          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* =====================================================
              MODAL
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 40,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
              {/* Header */}

              <div className="flex items-center justify-between border-b border-slate-200 px-8 py-5">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Edit Student
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Update student admission information
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 p-2 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="flex-1 overflow-y-auto p-8"
              >
                                {/* =====================================================
                    STUDENT INFORMATION
                ===================================================== */}

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="mb-6 text-lg font-bold text-slate-900">
                    Student Information
                  </h3>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* Student Name */}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Student Name
                      </label>

                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        placeholder="Enter student name"
                        className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                        required
                      />
                    </div>

                    {/* Email */}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                      />
                    </div>

                    {/* Phone */}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Phone Number
                      </label>

                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                      />
                    </div>

                    {/* Country */}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Country
                      </label>

                      <div className="relative">
                        <Globe
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="Country"
                          className="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* =====================================================
                    ADMISSION DETAILS
                ===================================================== */}

                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="mb-6 text-lg font-bold text-slate-900">
                    Admission Details
                  </h3>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* University */}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        University
                      </label>

                      <div className="relative">
                        <Building2
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="text"
                          name="university"
                          value={formData.university}
                          onChange={handleChange}
                          placeholder="University"
                          className="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                        />
                      </div>
                    </div>

                    {/* Course */}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Course
                      </label>

                      <div className="relative">
                        <GraduationCap
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="text"
                          name="course"
                          value={formData.course}
                          onChange={handleChange}
                          placeholder="Course"
                          className="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                        />
                      </div>
                    </div>

                    {/* Intake */}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Intake
                      </label>

                      <div className="relative">
                        <Calendar
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="text"
                          name="intake"
                          value={formData.intake}
                          onChange={handleChange}
                          placeholder="e.g. 2026 January"
                          className="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                        />
                      </div>
                    </div>

                    {/* Tuition Fee */}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Tuition Fee
                      </label>

                      <div className="relative">
                        <IndianRupee
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="number"
                          name="tuitionFee"
                          value={formData.tuitionFee}
                          onChange={handleChange}
                          placeholder="Tuition Fee"
                          className="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                                {/* =====================================================
                    COMMISSION & PAYMENT
                ===================================================== */}

                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="mb-6 text-lg font-bold text-slate-900">
                    Commission & Payment
                  </h3>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* Commission Percent */}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Commission Percentage
                      </label>

                      <div className="relative">
                        <Percent
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="number"
                          name="commissionPercent"
                          value={formData.commissionPercent}
                          onChange={handleChange}
                          placeholder="Commission %"
                          min="0"
                          className="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                        />
                      </div>
                    </div>

                    {/* Commission Amount */}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Commission Amount
                      </label>

                      <div className="relative">
                        <IndianRupee
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="number"
                          name="commissionAmount"
                          value={formData.commissionAmount}
                          onChange={handleChange}
                          placeholder="Commission Amount"
                          min="0"
                          className="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                        />
                      </div>
                    </div>

                    {/* Payment Status */}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Payment Status
                      </label>

                      <select
                        name="paymentStatus"
                        value={formData.paymentStatus}
                        onChange={handleChange}
                        className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </div>

                    {/* Admission Status */}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Admission Status
                      </label>

                      <select
                        name="admissionStatus"
                        value={formData.admissionStatus}
                        onChange={handleChange}
                        className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                      >
                        <option value="Enrolled">Enrolled</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* =====================================================
                    NOTES
                ===================================================== */}

                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="mb-4 text-lg font-bold text-slate-900">
                    Notes
                  </h3>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write notes..."
                    className="w-full rounded-2xl border border-slate-300 bg-white p-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                {/* =====================================================
                    FOOTER ACTIONS
                ===================================================== */}

                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save size={18} />

                    {loading ? "Updating..." : "Update Student"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StudentEditModal;
             