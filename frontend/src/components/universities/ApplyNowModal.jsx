import { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import toast from "react-hot-toast";
import { submitLead } from "../../services/contactService";

export default function ApplyNowModal({
  isOpen,
  onClose,
  university,
  course = "",
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    interestedCourse: course,
    message: `I want to apply for ${university?.universityName || ""}.`,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const phone = value.replace(/\D/g, "").slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        phoneNumber: phone,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({
        username: "",
        email: "",
        phoneNumber: "",
        interestedCourse: course || "",
        message: `I want to apply for ${university?.universityName || ""}.`,
      });
    }
  }, [isOpen, course, university]);

  if (!isOpen) return null;

  // ================= Submit Form =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.interestedCourse ||
      !formData.message
    ) {
      return toast.error("Please fill all fields.");
    }

    try {
      setLoading(true);

      await submitLead({
        ...formData,
        email: formData.email.toLowerCase().trim(),
        source: university?.universityName || "Website",
      });

      toast.success("Application submitted successfully.");

      setFormData({
        username: "",
        email: "",
        phoneNumber: "",
        interestedCourse: course || "",
        message: `I want to apply for ${university?.universityName || ""}.`,
      });

      onClose();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div
        className="
        relative
        w-full
        max-w-2xl
        rounded-3xl
        border
        border-white/10
        bg-[#0f172a]
        shadow-2xl
        overflow-hidden
        animate-in
        fade-in
        zoom-in-95
        duration-300
      "
      >
        {/* Header */}

        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
          <div>
            <h2 className="text-3xl font-bold text-white">Apply Now</h2>

            <p className="text-gray-400 mt-1">{university?.universityName}</p>
          </div>

          <button
            onClick={onClose}
            className="
            w-11
            h-11
            rounded-full
            bg-white/10
            hover:bg-red-500
            transition
            flex
            items-center
            justify-center
          "
          >
            <X size={22} className="text-white" />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Name */}

          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            className="
            w-full
            rounded-xl
            bg-white/5
            border
            border-white/10
            px-5
            py-4
            text-white
            placeholder-gray-400
            focus:border-cyan-400
            outline-none
          "
          />

          {/* Email */}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="
            w-full
            rounded-xl
            bg-white/5
            border
            border-white/10
            px-5
            py-4
            text-white
            placeholder-gray-400
            focus:border-cyan-400
            outline-none
          "
          />

          {/* Phone */}

          <input
            type="tel"
            name="phoneNumber"
            maxLength={10}
            inputMode="numeric"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="
            w-full
            rounded-xl
            bg-white/5
            border
            border-white/10
            px-5
            py-4
            text-white
            placeholder-gray-400
            focus:border-cyan-400
            outline-none
          "
          />

          {/* Course */}

          <input
            type="text"
            name="interestedCourse"
            placeholder="Interested Course"
            value={formData.interestedCourse}
            onChange={handleChange}
            className="
            w-full
            rounded-xl
            bg-white/5
            border
            border-white/10
            px-5
            py-4
            text-white
            placeholder-gray-400
            focus:border-cyan-400
            outline-none
          "
          />

          {/* Message */}

          <textarea
            rows={5}
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="
            w-full
            rounded-xl
            bg-white/5
            border
            border-white/10
            px-5
            py-4
            text-white
            placeholder-gray-400
            focus:border-cyan-400
            outline-none
            resize-none
          "
          />

          {/* Buttons */}

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="
              px-6
              py-3
              rounded-xl
              border
              border-white/20
              text-white
              hover:bg-white/10
              transition
            "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
