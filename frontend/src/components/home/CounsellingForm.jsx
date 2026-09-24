import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_V1_URL } from "../../config/api";

import {
  User,
  Phone,
  Mail,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Award,
  Headphones,
} from "lucide-react";

export default function CounsellingForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${API_V1_URL}/contact/form`,
        {
          username: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          interestedCourse: formData.course,
          message: "Free Career Counselling",
          source: "Home Page",
        }
      );

      if (data.success) {
        toast.success("Enquiry Submitted Successfully");

        setFormData({
          name: "",
          phone: "",
          email: "",
          course: "",
        });
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
      relative
      overflow-hidden

      py-24

      bg-[#F7FBFF]

      bg-[radial-gradient(circle_at_top_left,#DDF5FF_0%,#F8FCFF_35%,#FFFFFF_70%,#F5FBFF_100%)]
      "
    >
      {/* Left Glow */}

      <div
        className="
        absolute
        -top-52
        -left-52

        h-[650px]
        w-[650px]

        rounded-full

        bg-cyan-200/30

        blur-[150px]
        "
      />

      {/* Right Glow */}

      <div
        className="
        absolute
        top-0
        right-0

        h-[520px]
        w-[520px]

        rounded-full

        bg-sky-200/30

        blur-[150px]
        "
      />

      {/* Bottom Glow */}

      <div
        className="
        absolute
        bottom-0
        left-1/2

        -translate-x-1/2

        h-[420px]
        w-[900px]

        rounded-full

        bg-cyan-100/40

        blur-[150px]
        "
      />

      {/* Dot Pattern */}

      <div
        className="
        absolute
        inset-0

        opacity-[0.03]

        [background-image:radial-gradient(#0ea5e9_1px,transparent_1px)]

        [background-size:28px_28px]
        "
      />

      <div className="relative z-10 max-w-[1450px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

  {/* ================= LEFT SIDE ================= */}

  <div>

    {/* Badge */}

    <div
      className="
      inline-flex
      items-center
      gap-3

      rounded-full

      border
      border-cyan-200

      bg-white/80

      px-6
      py-3

      shadow-lg
      backdrop-blur-xl
      "
    >
      <ShieldCheck
        size={18}
        className="text-cyan-600"
      />

      <span className="font-semibold text-slate-700">
        Trusted by 15,000+ Students
      </span>
    </div>

    {/* Heading */}

   <h2
  className="
    mt-6
    text-4xl
    lg:text-5xl
    font-black
    leading-tight
    text-slate-900
  "
>
  Free Career{" "}
  <span
    className="
      bg-gradient-to-r
      from-blue-700
      via-cyan-500
      to-sky-400
      bg-clip-text
      text-transparent
    "
  >
    Counselling
  </span>
</h2>

    {/* Line */}

    <div
      className="
      mt-5
h-1
w-70

      rounded-full

      bg-gradient-to-r

      from-blue-600
      to-cyan-400
      "
    />

    {/* Description */}

    <p
      className="
      mt-5
max-w-lg
text-base
leading-7

      text-slate-600
      "
    >
      Get personalized admission guidance for Undergraduate,
      Postgraduate, Diploma and Online Degree Programs.

      Our experienced counsellors help you choose the right
      university, the right course and build a successful career.
    </p>

    {/* Features */}

    <div className="mt-7 grid grid-cols-2 gap-4">

      {/* Expert */}

      <div className="flex items-start gap-4">

        <div
          className="
          flex

          h-12
          w-12

          items-center
          justify-center

          rounded-2xl

          bg-cyan-100
          "
        >
          <Users
            className="text-cyan-700"
            size={22}
          />
        </div>

        <div>

          <h3 className="font-bold text-base text-slate-900">
            Expert Guidance
          </h3>

          <p className="text-sm text-slate-500">
            One-to-one admission experts
          </p>

        </div>

      </div>

      {/* Universities */}

      <div className="flex items-start gap-4">

        <div
          className="
          flex

          h-16
          w-16

          items-center
          justify-center

          rounded-2xl

          bg-violet-100
          "
        >
          <Building2
            className="text-violet-700"
            size={28}
          />
        </div>

        <div>

          <h3 className="font-bold text-lg text-slate-900">
            250+ Universities
          </h3>

          <p className="mt-1 text-slate-500">
            India's top universities
          </p>

        </div>

      </div>

      {/* Scholarship */}

      <div className="flex items-start gap-4">

        <div
          className="
          flex

          h-16
          w-16

          items-center
          justify-center

          rounded-2xl

          bg-emerald-100
          "
        >
          <Award
            className="text-emerald-700"
            size={28}
          />
        </div>

        <div>

          <h3 className="font-bold text-lg text-slate-900">
            Scholarship Help
          </h3>

          <p className="mt-1 text-slate-500">
            100% assistance available
          </p>

        </div>

      </div>

      {/* Support */}

      <div className="flex items-start gap-4">

        <div
          className="
          flex

          h-16
          w-16

          items-center
          justify-center

          rounded-2xl

          bg-orange-100
          "
        >
          <Headphones
            className="text-orange-600"
            size={28}
          />
        </div>

        <div>

          <h3 className="font-bold text-lg text-slate-900">
            24×7 Support
          </h3>

          <p className="mt-1 text-slate-500">
            We're always here to help
          </p>

        </div>

      </div>

    </div>
    </div>
              {/* ================= Right Form ================= */}

          <div className="relative">

            {/* Glass Card */}

            <div
              className="
              relative

              rounded-[36px]

              bg-white/80

              backdrop-blur-2xl

              border
              border-white/70

              shadow-[0_30px_80px_rgba(14,165,233,.18)]

              p-5 lg:p-6

              overflow-hidden
              "
            >

              {/* Background Glow */}

              <div className="absolute -top-24 -right-20 h-52 w-52 rounded-full bg-cyan-200/40 blur-3xl" />

              <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-sky-200/30 blur-3xl" />

              <div className="relative z-10">

                {/* Heading */}

                <span
                  className="
                  inline-flex
                  items-center

                  rounded-full

                  bg-cyan-100

                  px-4
                  py-2

                  text-sm
                  font-semibold

                  text-cyan-700
                  "
                >
                  🎓 Free Career Guidance
                </span>

                <h2
                  className="
                 mt-3
text-xl

                  font-black

                  text-slate-900
                  "
                >
                  Book Your Free Counselling
                </h2>

                <p
                  className="
                  

                  text-slate-600

                  mt-2
text-sm
leading-6
                  "
                >
                  Fill your details and our admission expert will contact you
                  within 30 minutes.
                </p>

                {/* Form */}

                <form
                  onSubmit={handleSubmit}
                  className="mt-4 space-y-3"
                >

                  {/* Name */}

                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="
                    w-full

                    rounded-2xl

                    border
                    border-slate-200

                    bg-white

                    px-5
py-3

                    outline-none

                    transition-all

                    focus:border-cyan-500

                    focus:ring-4
                    focus:ring-cyan-100
                    "
                  />

                  {/* Phone */}

                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="
                    w-full

                    rounded-2xl

                    border
                    border-slate-200

                    bg-white

                    px-5
                    py-4

                    outline-none

                    transition-all

                    focus:border-cyan-500

                    focus:ring-4
                    focus:ring-cyan-100
                    "
                  />

                  {/* Email */}

                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="
                    w-full

                    rounded-2xl

                    border
                    border-slate-200

                    bg-white

                    px-5
                    py-4

                    outline-none

                    transition-all

                    focus:border-cyan-500

                    focus:ring-4
                    focus:ring-cyan-100
                    "
                  />

                  {/* Course */}

                  <input
                    type="text"
                    name="course"
                    required
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="Interested Course"
                    className="
                    w-full

                    rounded-2xl

                    border
                    border-slate-200

                    bg-white

                    px-5
                    py-4

                    outline-none

                    transition-all

                    focus:border-cyan-500

                    focus:ring-4
                    focus:ring-cyan-100
                    "
                  />

                                    {/* Submit Button */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                    group

                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3

                    rounded-2xl

                    bg-gradient-to-r
                    from-cyan-500
                    via-sky-500
                    to-blue-600

                  px-6
py-3
text-sm
                    font-bold
                    text-white

                    shadow-xl

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:shadow-cyan-300/40

                    disabled:cursor-not-allowed
                    disabled:opacity-70
                    "
                  >
                    {loading ? (
                      "Submitting..."
                    ) : (
                      <>
                        Get Free Counselling

                        <ArrowRight
                          size={22}
                          className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                          "
                        />
                      </>
                    )}
                  </button>

                </form>

                {/* Bottom Trust */}

                <div
                  className="
                  mt-4

                  grid
                  grid-cols-3

                  gap-3
                  "
                >

                  <div
                    className="
                    rounded-2xl

                    border
                    border-cyan-100

                    bg-cyan-50

                    p-4

                    text-center
                    "
                  >

                    <h3 className="text-xl font-black text-cyan-700">
                      250+
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      Universities
                    </p>

                  </div>

                  <div
                    className="
                    rounded-2xl

                    border
                    border-blue-100

                    bg-blue-50

                    p-4

                    text-center
                    "
                  >

                    <h3 className="text-2xl font-black text-blue-700">
                      30K+
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      Students
                    </p>

                  </div>

                  <div
                    className="
                    rounded-2xl

                    border
                    border-emerald-100

                    bg-emerald-50

                    p-4

                    text-center
                    "
                  >

                    <h3 className="text-2xl font-black text-emerald-700">
                      98%
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      Success
                    </p>

                  </div>

                </div>

              </div>

            </div>

                      {/* Floating Card */}

          <div
           className="
absolute

-right-8
top-4

hidden
lg:flex

items-center

gap-4

rounded-3xl

bg-white/90

backdrop-blur-xl

border
border-white

px-4
py-3

shadow-2xl
"
          >

            <div
              className="
              flex

              h-12
              w-12

              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-r
              from-cyan-500
              to-blue-600

              text-white
              "
            >
              <Headphones size={26} />
            </div>

            <div>

              <h4 className="font-black text-slate-900">
                24×7 Support
              </h4>

              <p className="text-sm text-slate-500">
                Admission Experts
              </p>

            </div>

          </div>

          {/* Bottom Badge */}

          <div
            className="
            absolute

            -right-8
            -bottom-6

            hidden
            lg:flex

            items-center

            gap-4

            rounded-3xl

            bg-gradient-to-r
            from-cyan-500
            to-blue-600

            px-6
            py-4

            text-white

            shadow-2xl
            "
          >

            <ShieldCheck size={28} />

            <div>

              <h4 className="font-bold">
                100% Free
              </h4>

              <p className="text-sm text-cyan-100">
                Career Counselling
              </p>

            </div>

          </div>

        </div>

      </div>
</div>
    </section>
  );
}
      