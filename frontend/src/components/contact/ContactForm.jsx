import { useState } from "react";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  MessageSquare,
  LoaderCircle,
} from "lucide-react";

import { submitLead } from "../../services/contactService";

const ContactForm = () => {
  // ==========================
  // Form State
  // ==========================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });


  // ==========================
  // Error State
  // ==========================
  const [errors, setErrors] = useState({});


  // ==========================
  // Loading State
  // ==========================
  const [loading, setLoading] = useState(false);



  // ==========================
  // Input Change Handler
  // ==========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


    // remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };



  // ==========================
  // Form Validation
  // ==========================
  const validateForm = () => {
    let newErrors = {};


    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }


    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } 
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter valid email";
    }


    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10 digit number";
    }


    if (!formData.course) {
      newErrors.course = "Please select course";
    }


    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }


    setErrors(newErrors);


    return Object.keys(newErrors).length === 0;
  };



  // ==========================
  // Submit Handler
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }


    try {

      setLoading(true);


      const response = await submitLead(formData);



      if (response?.success) {

        toast.success(
          "Thank you! Our counsellor will contact you soon."
        );


        setFormData({
          name: "",
          email: "",
          phone: "",
          course: "",
          message: "",
        });

      } 
      else {

        toast.error(
          response?.message || "Something went wrong"
        );

      }


    } catch (error) {

      console.log(
        "Contact Form Error:",
        error
      );


      toast.error(
        "Server error. Please try again later."
      );


    } finally {

      setLoading(false);

    }

  };



   return (
    <section className="relative py-20 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />


      <div className="relative max-w-4xl mx-auto px-6">


        {/* Glass Form Card */}
        <div
          className="
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          shadow-2xl
          rounded-3xl
          p-8 md:p-12
          "
        >


          {/* Heading */}
          <div className="text-center mb-10">

            <h2
              className="
              text-3xl md:text-4xl
              font-bold
              text-white
              "
            >
              Get In Touch
            </h2>


            <p
              className="
              mt-3
              text-gray-300
              max-w-xl
              mx-auto
              "
            >
              Have questions about admissions or courses?
              Fill the form and our counsellor will contact you.
            </p>

          </div>



          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >



            {/* Name + Email */}
            <div className="grid md:grid-cols-2 gap-6">


              {/* Name */}
              <div>


                <label
                  className="
                  text-sm
                  text-gray-200
                  mb-2
                  block
                  "
                >
                  Full Name
                </label>


                <div
                  className="
                  relative
                  "
                >

                  <User
                    size={20}
                    className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-cyan-300
                    "
                  />


                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="
                    w-full
                    pl-12
                    pr-4
                    py-3
                    rounded-xl
                    bg-white/10
                    border
                    border-white/20
                    text-white
                    placeholder:text-gray-400
                    outline-none
                    focus:border-cyan-400
                    transition
                    "
                  />

                </div>


                {
                  errors.name && (
                    <p
                      className="
                      text-red-400
                      text-sm
                      mt-2
                      "
                    >
                      {errors.name}
                    </p>
                  )
                }

              </div>




              {/* Email */}
              <div>


                <label
                  className="
                  text-sm
                  text-gray-200
                  mb-2
                  block
                  "
                >
                  Email Address
                </label>


                <div
                  className="
                  relative
                  "
                >

                  <Mail
                    size={20}
                    className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-cyan-300
                    "
                  />


                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="
                    w-full
                    pl-12
                    pr-4
                    py-3
                    rounded-xl
                    bg-white/10
                    border
                    border-white/20
                    text-white
                    placeholder:text-gray-400
                    outline-none
                    focus:border-cyan-400
                    transition
                    "
                  />

                </div>


                {
                  errors.email && (
                    <p
                      className="
                      text-red-400
                      text-sm
                      mt-2
                      "
                    >
                      {errors.email}
                    </p>
                  )
                }


              </div>


            </div>





            {/* Phone + Course */}
            <div className="grid md:grid-cols-2 gap-6">


              {/* Phone */}
              <div>


                <label
                  className="
                  text-sm
                  text-gray-200
                  mb-2
                  block
                  "
                >
                  Phone Number
                </label>


                <div className="relative">


                  <Phone
                    size={20}
                    className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-cyan-300
                    "
                  />


                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="
                    w-full
                    pl-12
                    pr-4
                    py-3
                    rounded-xl
                    bg-white/10
                    border
                    border-white/20
                    text-white
                    placeholder:text-gray-400
                    outline-none
                    focus:border-cyan-400
                    transition
                    "
                  />


                </div>



                {
                  errors.phone && (
                    <p
                      className="
                      text-red-400
                      text-sm
                      mt-2
                      "
                    >
                      {errors.phone}
                    </p>
                  )
                }


              </div>





              {/* Course */}
              <div>


                <label
                  className="
                  text-sm
                  text-gray-200
                  mb-2
                  block
                  "
                >
                  Interested Course
                </label>


                <div className="relative">


                  <BookOpen
                    size={20}
                    className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-cyan-300
                    "
                  />


                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="
                    w-full
                    pl-12
                    pr-4
                    py-3
                    rounded-xl
                    bg-white/10
                    border
                    border-white/20
                    text-white
                    outline-none
                    focus:border-cyan-400
                    transition
                    "
                  >

                    <option
                      value=""
                      className="text-black"
                    >
                      Select Course
                    </option>


                    <option
                      value="B.Tech"
                      className="text-black"
                    >
                      B.Tech
                    </option>


                    <option
                      value="MBA"
                      className="text-black"
                    >
                      MBA
                    </option>


                    <option
                      value="MCA"
                      className="text-black"
                    >
                      MCA
                    </option>


                    <option
                      value="BCA"
                      className="text-black"
                    >
                      BCA
                    </option>


                    <option
                      value="Other"
                      className="text-black"
                    >
                      Other
                    </option>


                  </select>


                </div>



                {
                  errors.course && (
                    <p
                      className="
                      text-red-400
                      text-sm
                      mt-2
                      "
                    >
                      {errors.course}
                    </p>
                  )
                }



              </div>


            </div>

                        {/* Message */}
            <div>

              <label
                className="
                text-sm
                text-gray-200
                mb-2
                block
                "
              >
                Your Message
              </label>


              <div className="relative">


                <MessageSquare
                  size={20}
                  className="
                  absolute
                  left-4
                  top-4
                  text-cyan-300
                  "
                />


                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your message..."
                  className="
                  w-full
                  pl-12
                  pr-4
                  py-4
                  rounded-xl
                  bg-white/10
                  border
                  border-white/20
                  text-white
                  placeholder:text-gray-400
                  outline-none
                  resize-none
                  focus:border-cyan-400
                  transition
                  "
                />

              </div>



              {
                errors.message && (
                  <p
                    className="
                    text-red-400
                    text-sm
                    mt-2
                    "
                  >
                    {errors.message}
                  </p>
                )
              }


            </div>





            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              mt-4
              py-4
              rounded-xl
              bg-gradient-to-r
              from-cyan-400
              to-blue-600
              text-white
              font-semibold
              text-lg
              shadow-lg
              shadow-cyan-500/30
              hover:scale-[1.02]
              active:scale-95
              transition
              duration-300
              disabled:opacity-70
              disabled:cursor-not-allowed
              flex
              items-center
              justify-center
              gap-3
              "
            >

              {
                loading ? (
                  <>
                    <LoaderCircle
                      size={22}
                      className="
                      animate-spin
                      "
                    />

                    Sending...

                  </>
                ) : (
                  "Send Message"
                )
              }


            </button>



          </form>



        </div>


      </div>


    </section>
  );

};


export default ContactForm;


