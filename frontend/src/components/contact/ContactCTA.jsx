import { useState } from "react";
import { ArrowRight, GraduationCap, Send, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { submitLead } from "../../services/contactService";

const ContactCTA = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    interestedCourse: "",
    message: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.interestedCourse.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (formData.phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
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
        source: "Contact CTA",
      });

      toast.success("Your enquiry has been submitted successfully.");

      setFormData({
        username: "",
        email: "",
        phoneNumber: "",
        interestedCourse: "",
        message: "",
      });
    } catch (error) {
      console.error("CONTACT CTA ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* =====================================================
          SOFT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-sky-100/70 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50 blur-3xl" />

      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            MAIN CARD
        ===================================================== */}

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-xl
            shadow-slate-200/60
          "
        >
          <div className="grid lg:grid-cols-2">
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div
              className="
                relative
                overflow-hidden
                bg-gradient-to-br
                from-cyan-50
                via-white
                to-sky-50
                p-7
                sm:p-10
                lg:p-12
              "
            >
              {/* Decorative circle */}

              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-200/40 blur-2xl" />

              <div className="relative">
                {/* Icon */}

                <div
                  className="
                    mb-6
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-500
                    to-blue-600
                    text-white
                    shadow-lg
                    shadow-cyan-500/20
                  "
                >
                  <GraduationCap className="h-8 w-8" />
                </div>

                {/* Small Badge */}

                <div
                  className="
                    mb-4
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-cyan-200
                    bg-white
                    px-4
                    py-2
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-cyan-700
                    shadow-sm
                  "
                >
                  Admission Assistance
                </div>

                {/* Heading */}

                <h2
                  className="
                    text-3xl
                    font-black
                    leading-tight
                    tracking-tight
                    text-slate-900
                    sm:text-4xl
                    lg:text-5xl
                  "
                >
                  Ready To Start Your{" "}
                  <span
                    className="
                      bg-gradient-to-r
                      from-cyan-600
                      via-sky-600
                      to-blue-600
                      bg-clip-text
                      text-transparent
                    "
                  >
                    Career Journey?
                  </span>
                </h2>

                {/* Description */}

                <p
                  className="
                    mt-5
                    max-w-xl
                    text-sm
                    leading-7
                    text-slate-600
                    sm:text-base
                  "
                >
                  Connect with our expert counsellors and get personalized
                  guidance for choosing the right course and university.
                </p>

                {/* Benefits */}

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                      <GraduationCap className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        Expert Admission Guidance
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Get help choosing the right course and university.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                      <Phone className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        Personalised Counselling
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Our counsellors help you understand your options.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                      <Mail className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        Quick Response
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Submit your enquiry and our team will get back to you.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Admission Button */}

                <Link
                  to="/admission"
                  className="
                    group
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-cyan-600
                    to-blue-600
                    px-6
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    shadow-cyan-600/20
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >
                  Explore Admissions

                  <ArrowRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </div>
            </div>

            {/* =================================================
                CONTACT FORM
            ================================================= */}

            <div className="bg-white p-7 sm:p-10 lg:p-12">
              <div className="mb-7">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
                  Get In Touch
                </p>

                <h3 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                  Talk To A Counsellor
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Fill in your details and our admission team will contact
                  you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="cta-username"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Full Name
                    </label>

                    <input
                      id="cta-username"
                      type="text"
                      name="username"
                      placeholder="Enter your full name"
                      value={formData.username}
                      onChange={handleChange}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3.5
                        text-sm
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-cyan-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-cyan-500/10
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cta-email"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="cta-email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3.5
                        text-sm
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-cyan-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-cyan-500/10
                      "
                    />
                  </div>
                </div>

                {/* Phone + Course */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="cta-phone"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="cta-phone"
                      type="tel"
                      name="phoneNumber"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3.5
                        text-sm
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-cyan-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-cyan-500/10
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cta-course"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Interested Course
                    </label>

                    <input
                      id="cta-course"
                      type="text"
                      name="interestedCourse"
                      placeholder="e.g. B.Tech, MBA"
                      value={formData.interestedCourse}
                      onChange={handleChange}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3.5
                        text-sm
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-cyan-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-cyan-500/10
                      "
                    />
                  </div>
                </div>

                {/* Message */}

                <div>
                  <label
                    htmlFor="cta-message"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="cta-message"
                    name="message"
                    rows={5}
                    placeholder="Tell us what you need help with..."
                    value={formData.message}
                    onChange={handleChange}
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      py-3.5
                      text-sm
                      leading-6
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-cyan-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-cyan-500/10
                    "
                  />
                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-cyan-600
                    to-blue-600
                    px-6
                    py-4
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    shadow-cyan-600/20
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Enquiry
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;