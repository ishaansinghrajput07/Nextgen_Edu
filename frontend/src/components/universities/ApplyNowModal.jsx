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

  const getInitialFormData = () => ({
    username: "",
    email: "",
    phoneNumber: "",
    interestedCourse: course || "",
    message: `I want to apply for ${
      university?.universityName || ""
    }.`,
  });

  const [formData, setFormData] = useState(getInitialFormData);

  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData());
    }
  }, [isOpen, course, university]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.interestedCourse.trim() ||
      !formData.message.trim()
    ) {
      return toast.error("Please fill all fields.");
    }

    if (formData.phoneNumber.length !== 10) {
      return toast.error("Please enter a valid 10-digit phone number.");
    }

    try {
      setLoading(true);

      await submitLead({
        ...formData,
        username: formData.username.trim(),
        email: formData.email.toLowerCase().trim(),
        phoneNumber: formData.phoneNumber.trim(),
        interestedCourse: formData.interestedCourse.trim(),
        message: formData.message.trim(),
        source: university?.universityName || "Website",
      });

      toast.success("Application submitted successfully.");

      setFormData(getInitialFormData());

      onClose();
    } catch (error) {
      console.error("APPLY NOW ERROR:", error);

      toast.error(
        error?.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-slate-950/50
        p-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          flex
          max-h-[95vh]
          w-full
          max-w-2xl
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
          duration-300
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-slate-200
            bg-white
            px-6
            py-5
            sm:px-8
            sm:py-6
          "
        >
          <div className="min-w-0 pr-4">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-sky-500
                  to-cyan-500
                  text-white
                  shadow-lg
                  shadow-sky-500/20
                "
              >
                <Send className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h2
                  className="
                    text-xl
                    font-black
                    tracking-tight
                    text-slate-900
                    sm:text-2xl
                  "
                >
                  Apply Now
                </h2>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-sm
                    font-medium
                    text-slate-500
                  "
                >
                  {university?.universityName || "University Application"}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              text-slate-500
              transition-all
              duration-200
              hover:border-red-200
              hover:bg-red-50
              hover:text-red-600
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* =====================================================
            SCROLLABLE FORM AREA
        ===================================================== */}

        <div
          className="
            overflow-y-auto
            overscroll-contain
            scrollbar-thin
            scrollbar-track-slate-100
            scrollbar-thumb-slate-300
            hover:scrollbar-thumb-slate-400
          "
        >
          <form
            onSubmit={handleSubmit}
            className="
              space-y-5
              p-6
              sm:p-8
            "
          >
            {/* INFO */}

            <div
              className="
                rounded-2xl
                border
                border-sky-100
                bg-sky-50
                px-4
                py-3
              "
            >
              <p className="text-sm leading-6 text-slate-600">
                Fill in your details below and our counsellor will contact you
                regarding your application.
              </p>
            </div>

            {/* =================================================
                FULL NAME
            ================================================= */}

            <div>
              <label
                htmlFor="username"
                className="
                  mb-2
                  block
                  text-sm
                  font-bold
                  text-slate-700
                "
              >
                Full Name
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your full name"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                autoComplete="name"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3.5
                  text-sm
                  font-medium
                  text-slate-900
                  outline-none
                  transition-all
                  placeholder:text-slate-400
                  hover:border-slate-300
                  focus:border-sky-500
                  focus:ring-4
                  focus:ring-sky-500/10
                  disabled:cursor-not-allowed
                  disabled:bg-slate-50
                "
              />
            </div>

            {/* =================================================
                EMAIL + PHONE
            ================================================= */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-sm
                    font-bold
                    text-slate-700
                  "
                >
                  Email Address
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="email"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3.5
                    text-sm
                    font-medium
                    text-slate-900
                    outline-none
                    transition-all
                    placeholder:text-slate-400
                    hover:border-slate-300
                    focus:border-sky-500
                    focus:ring-4
                    focus:ring-sky-500/10
                    disabled:cursor-not-allowed
                    disabled:bg-slate-50
                  "
                />
              </div>

              {/* PHONE */}

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="
                    mb-2
                    block
                    text-sm
                    font-bold
                    text-slate-700
                  "
                >
                  Phone Number
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  maxLength={10}
                  inputMode="numeric"
                  placeholder="10-digit mobile number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="tel"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3.5
                    text-sm
                    font-medium
                    text-slate-900
                    outline-none
                    transition-all
                    placeholder:text-slate-400
                    hover:border-slate-300
                    focus:border-sky-500
                    focus:ring-4
                    focus:ring-sky-500/10
                    disabled:cursor-not-allowed
                    disabled:bg-slate-50
                  "
                />
              </div>
            </div>

            {/* =================================================
                COURSE
            ================================================= */}

            <div>
              <label
                htmlFor="interestedCourse"
                className="
                  mb-2
                  block
                  text-sm
                  font-bold
                  text-slate-700
                "
              >
                Interested Course
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="interestedCourse"
                type="text"
                name="interestedCourse"
                placeholder="Enter your interested course"
                value={formData.interestedCourse}
                onChange={handleChange}
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3.5
                  text-sm
                  font-medium
                  text-slate-900
                  outline-none
                  transition-all
                  placeholder:text-slate-400
                  hover:border-slate-300
                  focus:border-sky-500
                  focus:ring-4
                  focus:ring-sky-500/10
                  disabled:cursor-not-allowed
                  disabled:bg-slate-50
                "
              />
            </div>

            {/* =================================================
                MESSAGE
            ================================================= */}

            <div>
              <label
                htmlFor="message"
                className="
                  mb-2
                  block
                  text-sm
                  font-bold
                  text-slate-700
                "
              >
                Message
                <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                id="message"
                rows={5}
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                className="
                  min-h-[130px]
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3.5
                  text-sm
                  font-medium
                  leading-6
                  text-slate-900
                  outline-none
                  transition-all
                  placeholder:text-slate-400
                  hover:border-slate-300
                  focus:border-sky-500
                  focus:ring-4
                  focus:ring-sky-500/10
                  disabled:cursor-not-allowed
                  disabled:bg-slate-50
                "
              />
            </div>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div
              className="
                flex
                flex-col-reverse
                gap-3
                border-t
                border-slate-100
                pt-5
                sm:flex-row
                sm:justify-end
              "
            >
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-slate-600
                  transition-all
                  hover:border-slate-300
                  hover:bg-slate-50
                  hover:text-slate-800
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-sky-600
                  to-cyan-500
                  px-7
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-sky-500/20
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:from-sky-700
                  hover:to-cyan-600
                  hover:shadow-xl
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  disabled:hover:translate-y-0
                "
              >
                {loading ? (
                  <>
                    <div
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white
                        border-t-transparent
                      "
                    />

                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />

                    Submit Application
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
