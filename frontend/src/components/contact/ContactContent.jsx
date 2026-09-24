
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

export default function ContactForm() {
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
      } else {
        toast.error(
          res?.message || "Something went wrong"
        );
      }
    } catch (error) {
      console.error(error);

      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background Glow */}

      <div
        className="
          absolute
          left-1/2
          top-10
          h-[450px]
          w-[450px]
          -translate-x-1/2
          rounded-full
          bg-cyan-400/20
          blur-[130px]
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          h-[350px]
          w-[350px]
          rounded-full
          bg-blue-600/20
          blur-[120px]
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-5xl
          px-4
          sm:px-6
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{
            once: true,
          }}
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-2xl
            sm:p-8
            md:p-12
          "
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name + Email */}

            <div className="grid gap-6 md:grid-cols-2">
              <Input
                icon={<User size={20} />}
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />

              <Input
                icon={<Mail size={20} />}
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>

            {/* Phone + State */}

            <div className="grid gap-6 md:grid-cols-2">
              <Input
                icon={<Phone size={20} />}
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />

              {/* State */}

              <div>
                <div className="relative">
                  <MapPin
                    size={20}
                    className="
                      absolute
                      left-4
                      top-4
                      z-10
                      text-cyan-600
                    "
                  />

                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      py-4
                      pl-12
                      pr-10
                      text-sm
                      text-slate-700
                      outline-none
                      transition
                      focus:border-cyan-500
                      focus:ring-4
                      focus:ring-cyan-500/10
                    "
                  >
                    <option value="">
                      Select State / UT
                    </option>

                    {indianStatesAndUTs.map((state) => (
                      <option
                        key={state}
                        value={state}
                      >
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {errors.state && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.state}
                  </p>
                )}
              </div>
            </div>

            {/* Course */}

            <div>
              <div className="relative">
                <BookOpen
                  size={20}
                  className="
                    absolute
                    left-4
                    top-4
                    z-10
                    text-cyan-600
                  "
                />

                <select
                  name="course"
                  value={formData.course}
                  onChange={handleCourseChange}
                  className="
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-4
                    pl-12
                    pr-10
                    text-sm
                    text-slate-700
                    outline-none
                    transition
                    focus:border-cyan-500
                    focus:ring-4
                    focus:ring-cyan-500/10
                  "
                >
                  <option value="">
                    Select Course
                  </option>

                  {courses.map((course) => (
                    <option
                      key={course}
                      value={course}
                    >
                      {course}
                    </option>
                  ))}

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* Custom Course */}

              {formData.course === "Other" && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
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
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      px-4
                      py-4
                      text-sm
                      text-slate-700
                      outline-none
                      transition
                      focus:border-cyan-500
                      focus:ring-4
                      focus:ring-cyan-500/10
                    "
                  />
                </motion.div>
              )}

              {errors.course && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.course}
                </p>
              )}
            </div>

            {/* Message */}

            <div>
              <div className="relative">
                <MessageSquare
                  size={20}
                  className="
                    absolute
                    left-4
                    top-4
                    text-cyan-600
                  "
                />

                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your admission requirements..."
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-slate-200
                    py-4
                    pl-12
                    pr-4
                    text-sm
                    text-slate-700
                    outline-none
                    transition
                    focus:border-cyan-500
                    focus:ring-4
                    focus:ring-cyan-500/10
                  "
                />
              </div>

              {errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-gradient-to-r
                from-blue-700
                via-cyan-600
                to-sky-500
                py-4
                text-base
                font-bold
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:text-lg
              "
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={20}
                    className="animate-spin"
                  />
                  Sending...
                </>
              ) : (
                "Submit Enquiry"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Input({
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
      <div className="relative">
        <div
          className="
            absolute
            left-4
            top-4
            z-10
            text-cyan-600
          "
        >
          {icon}
        </div>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            py-4
            pl-12
            pr-4
            text-sm
            text-slate-700
            outline-none
            transition
            focus:border-cyan-500
            focus:ring-4
            focus:ring-cyan-500/10
          "
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

