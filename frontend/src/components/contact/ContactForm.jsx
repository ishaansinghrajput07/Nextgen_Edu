
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  MapPin,
  MessageSquare,
  LoaderCircle,
  ArrowRight,
  ShieldCheck,
  Headphones,
  CheckCircle2,
} from "lucide-react";
import { submitLead } from "../../services/contactService";

const indianStatesAndUTs = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const courses = [
  "B.Tech",
  "M.Tech",
  "BCA",
  "MCA",
  "BBA",
  "MBA",
  "B.Com",
  "M.Com",
  "B.Sc",
  "M.Sc",
  "B.A",
  "M.A",
  "PhD",
  "Diploma",
  "Certification",
];

export default function ContactForm({ isPopup = false, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    course: "",
    message: "",
  });

  const [customCourse, setCustomCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleCourseChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      course: value,
    }));

    setErrors((prev) => ({
      ...prev,
      course: "",
    }));

    if (value !== "Other") {
      setCustomCourse("");
    }
  };

  const validate = () => {
    const err = {};

    if (!formData.name.trim()) {
      err.name = "Name required";
    }

    if (!formData.email.trim()) {
      err.email = "Email required";
    }

    if (!formData.phone.trim()) {
      err.phone = "Phone required";
    }

    if (!formData.state) {
      err.state = "Select your state";
    }

    if (!formData.course) {
      err.course = "Select course";
    }

    if (formData.course === "Other" && !customCourse.trim()) {
      err.course = "Please enter your course";
    }

    if (!formData.message.trim()) {
      err.message = "Message required";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill all required fields");
      return;
    }

    const finalCourse =
      formData.course === "Other"
        ? customCourse.trim()
        : formData.course;

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      state: formData.state,
      course: finalCourse,
      message: formData.message.trim(),
    };

    try {
      setLoading(true);

      const res = await submitLead(payload);

      if (res?.success) {
        toast.success("Our counsellor will contact you soon");

        setFormData({
          name: "",
          email: "",
          phone: "",
          state: "",
          course: "",
          message: "",
        });

        setCustomCourse("");
        setErrors({});

        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={
        isPopup
          ? "relative overflow-hidden bg-white"
          : "relative overflow-hidden bg-slate-50 px-[30px] py-[30px] sm:py-16 lg:py-20"
      }
    >
      {!isPopup && (
        <>
          <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-cyan-100/50 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
        </>
      )}

      <div
        className={
          isPopup
            ? "relative w-full"
            : "relative mx-auto w-full max-w-6xl"
        }
      >
        <motion.div
          initial={{ opacity: 0, y: isPopup ? 10 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
          className={
            isPopup
              ? "w-full bg-white px-4 pb-5 pt-4 sm:px-7 sm:pb-7 sm:pt-5"
              : "overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_80px_-30px_rgba(15,23,42,0.25)]"
          }
        >
          {/* Header */}
          <div
            className={
              isPopup
                ? "mb-5 pr-10"
                : "border-b border-slate-100 px-6 pb-6 pt-7 sm:px-9 sm:pt-9"
            }
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                <Headphones size={22} />
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-600">
                    Admission Support
                  </span>

                  <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                  <span className="hidden text-xs font-medium text-slate-400 sm:block">
                    Free Counselling
                  </span>
                </div>

                <h2
                  className={
                    isPopup
                      ? "text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
                      : "text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl"
                  }
                >
                  Let’s plan your{" "}
                  <span className="text-cyan-600">next step.</span>
                </h2>

                <p
                  className={
                    isPopup
                      ? "mt-1.5 max-w-xl text-sm leading-6 text-slate-500"
                      : "mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base"
                  }
                >
                  Share your details and our admission counsellor will help
                  you understand courses, eligibility and admission options.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={
              isPopup
                ? "px-0"
                : "px-6 py-7 sm:px-9 sm:py-9"
            }
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Full Name"
                required
                icon={<User size={18} />}
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />

              <Input
                label="Email Address"
                required
                icon={<Mail size={18} />}
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <Input
                label="Phone Number"
                required
                icon={<Phone size={18} />}
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />

              {/* State */}
              <SelectField
                label="State / UT"
                required
                icon={<MapPin size={18} />}
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={errors.state}
              >
                <option value="">Select your state</option>

                {indianStatesAndUTs.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </SelectField>
            </div>

            {/* Course */}
            <div className="mt-5">
              <SelectField
                label="Preferred Course"
                required
                icon={<BookOpen size={18} />}
                name="course"
                value={formData.course}
                onChange={handleCourseChange}
                error={errors.course}
              >
                <option value="">Select a course</option>

                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}

                <option value="Other">Other</option>
              </SelectField>

              {formData.course === "Other" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3"
                >
                  <input
                    type="text"
                    value={customCourse}
                    onChange={(e) => {
                      setCustomCourse(e.target.value);

                      setErrors((prev) => ({
                        ...prev,
                        course: "",
                      }));
                    }}
                    placeholder="Enter your course name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                  />
                </motion.div>
              )}
            </div>

            {/* Message */}
            <div className="mt-5">
              <FieldLabel label="How can we help?" required />

              <div className="group relative">
                <MessageSquare
                  size={18}
                  className="pointer-events-none absolute left-4 top-4 text-slate-400 transition group-focus-within:text-cyan-600"
                />

                <textarea
                  name="message"
                  rows={isPopup ? 3 : 4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your admission requirements..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                />
              </div>

              {errors.message && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Bottom Area */}
            <div
              className={
                isPopup
                  ? "mt-5"
                  : "mt-7 flex flex-col gap-5 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between"
              }
            >
              {!isPopup && (
                <div className="flex items-center gap-4">
                  <TrustItem
                    icon={<ShieldCheck size={17} />}
                    text="Your details are secure"
                  />

                  <div className="hidden h-5 w-px bg-slate-200 sm:block" />

                  <TrustItem
                    icon={<CheckCircle2 size={17} />}
                    text="Free counselling"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={
                  isPopup
                    ? "group flex w-full items-center justify-center gap-2.5 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-600 hover:shadow-xl hover:shadow-cyan-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                    : "group flex w-full items-center justify-center gap-2.5 rounded-xl bg-slate-950 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-600 hover:shadow-xl hover:shadow-cyan-600/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[210px]"
                }
              >
                {loading ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Enquiry
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------
   Reusable Input
---------------------------------- */

function Input({
  label,
  required,
  icon,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div>
      <FieldLabel label={label} required={required} />

      <div className="group relative">
        <span className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-cyan-600">
          {icon}
        </span>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
        />
      </div>

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------
   Reusable Select
---------------------------------- */

function SelectField({
  label,
  required,
  icon,
  name,
  value,
  onChange,
  error,
  children,
}) {
  return (
    <div>
      <FieldLabel label={label} required={required} />

      <div className="group relative">
        <span className="pointer-events-none absolute left-4 top-1/2 z-10 flex -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-cyan-600">
          {icon}
        </span>

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-10 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
        >
          {children}
        </select>

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------
   Field Label
---------------------------------- */

function FieldLabel({ label, required }) {
  return (
    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-600">
      {label}

      {required && (
        <span className="ml-1 text-cyan-600">*</span>
      )}
    </label>
  );
}

/* ---------------------------------
   Trust Item
---------------------------------- */

function TrustItem({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
      <span className="text-cyan-600">{icon}</span>
      {text}
    </div>
  );
}
