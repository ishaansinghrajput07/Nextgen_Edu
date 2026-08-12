import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";

const StudentDeleteModal = ({
  open,
  student,
  onClose,
  onSuccess,
}) => {
  const token = localStorage.getItem("token");

 const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!student?._id) return;

    try {
      setLoading(true);

      await axios.delete(
        `http://localhost:8000/api/v1/student/${student._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Student deleted successfully.");

      onSuccess?.();

      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to delete student."
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
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* =====================================================
              MODAL
          ===================================================== */}

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
              {/* =====================================================
                  HEADER
              ===================================================== */}

              <div className="border-b border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
                      <AlertTriangle
                        size={30}
                        className="text-red-600"
                      />
                    </div>

                    <div>
                      <h2 className="text-2xl font-black text-slate-900">
                        Delete Student
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* =====================================================
                  BODY
              ===================================================== */}

              <div className="p-6">
                                {/* =====================================================
                    STUDENT PREVIEW
                ===================================================== */}

                <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-red-700">
                    Student Information
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Student Name
                      </span>

                      <span className="font-semibold text-slate-900">
                        {student?.studentName || "-"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Student Number
                      </span>

                      <span className="font-semibold text-slate-900">
                        {student?.studentNumber || "-"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        University
                      </span>

                      <span className="max-w-[220px] text-right font-semibold text-slate-900">
                        {student?.university || "-"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Course
                      </span>

                      <span className="max-w-[220px] text-right font-semibold text-slate-900">
                        {student?.course || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* =====================================================
                    WARNING MESSAGE
                ===================================================== */}

                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-sm leading-7 text-amber-800">
                    <strong>Warning:</strong> Deleting this student will
                    permanently remove the student record from the CRM.
                    This action cannot be undone.
                  </p>

                  {student?.lead?.leadNumber && (
                    <p className="mt-3 text-sm text-amber-700">
                      Associated Lead:
                      <span className="ml-2 font-bold">
                        {student.lead.leadNumber}
                      </span>
                    </p>
                  )}
                </div>

                {/* =====================================================
                    ACTIONS
                ===================================================== */}

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Trash2 size={18} />

                    {loading
                      ? "Deleting..."
                      : "Delete Student"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StudentDeleteModal;
            