import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ApplyNowModal from "../components/universities/ApplyNowModal";
import CourseCard from "../components/courses/CourseCard";

import {
  GraduationCap,
  ArrowLeft,
  Building2,
  BadgeCheck,
  Briefcase,
  BookOpen,
  Clock3,
  IndianRupee,
  CheckCircle2,
 Award,
 Sparkles
  

} from "lucide-react";

import { getPublicCourseBySlug } from "../services/courseService";


export default function CourseDetails() {

  const { slug } = useParams();


  const [course, setCourse] = useState(null);

  const [relatedCourses, setRelatedCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  const [applyModalOpen, setApplyModalOpen] = useState(false);



  // Fetch Course Data

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });


    fetchCourse();

  }, [slug]);



  const fetchCourse = async () => {

    try {

      setLoading(true);


      const res = await getPublicCourseBySlug(slug);


      setCourse(res.course);


      setRelatedCourses(
        res.relatedCourses || []
      );


      setError("");


    } catch (err) {

      console.log(err);


      setError(
        "Course not found."
      );

    } finally {

      setLoading(false);

    }

  };





  // Loading UI

  if (loading) {

    return (

      <section
        className="
        min-h-screen
        bg-gradient-to-br
        from-sky-50
        via-white
        to-cyan-50
        pt-28
        "
      >

        <div
          className="
          mx-auto
          max-w-7xl
          px-6
          "
        >

          <div
            className="
            h-[450px]
            animate-pulse
            rounded-3xl
            bg-slate-200
            "
          />

        </div>


      </section>

    );

  }





  // Error UI

  if(error || !course){

    return (

      <section
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-sky-50
        via-white
        to-cyan-50
        "
      >

        <div
          className="
          text-center
          px-6
          "
        >

          <GraduationCap
            size={80}
            className="
            mx-auto
            text-sky-600
            "
          />


          <h2
            className="
            mt-6
            text-4xl
            font-black
            text-slate-900
            "
          >
            Course Not Found
          </h2>


          <p
            className="
            mt-3
            text-slate-600
            "
          >
            This course does not exist or has been removed.
          </p>


          <Link
            to="/courses"
            className="
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-sky-600
            px-6
            py-3
            font-bold
            text-white
            hover:bg-sky-700
            transition
            "
          >

            <ArrowLeft size={18}/>

            Back To Courses

          </Link>


        </div>


      </section>

    );

  }





  const university = course.university;



  return (

    <section
      className="
      min-h-screen
      overflow-hidden
      bg-gradient-to-br
      from-sky-50
      via-white
      to-cyan-50
      text-slate-900
      "
    >


      {/* ================= PREMIUM HERO SECTION ================= */}


<motion.section
  initial={{
    opacity:0,
    y:40,
  }}
  animate={{
    opacity:1,
    y:0,
  }}
  transition={{
    duration:0.7,
  }}
  className="
  relative
  overflow-hidden
  rounded-[40px]
  border
  border-slate-200
  bg-white
  shadow-xl
  shadow-sky-100/50
  pt-10
  "
>


{/* Background Glow */}

<div
className="
absolute
-top-32
-left-32
h-96
w-96
rounded-full
bg-cyan-300/30
blur-[120px]
"
/>


<div
className="
absolute
-bottom-32
-right-20
h-96
w-96
rounded-full
bg-blue-300/30
blur-[120px]
"
/>



<div
className="
relative
z-10
grid
gap-10
p-8
md:p-12
lg:grid-cols-3
"
>



{/* LEFT CONTENT */}

<div
className="
lg:col-span-2
"
>


<Link
to="/courses"
className="
inline-flex
items-center
gap-2
rounded-full
border
border-slate-200
bg-slate-50
px-5
py-2
text-sm
font-semibold
text-slate-700
hover:bg-sky-50
transition
"
>

<ArrowLeft size={16}/>

Back To Courses

</Link>



<div
className="
mt-8
inline-flex
items-center
gap-2
rounded-full
border
border-sky-200
bg-sky-50
px-5
py-2
text-sm
font-semibold
text-sky-700
"
>

✨ Industry Ready Course

</div>



<h1
className="
mt-6
text-4xl
font-black
leading-tight
text-slate-900
md:text-6xl
"
>

{course.courseName}

</h1>




<p
className="
mt-5
max-w-3xl
text-lg
leading-8
text-slate-600
"
>

{course.description ||
"Build practical skills with industry focused learning and career support."}

</p>





{/* University */}

<div
className="
mt-8
flex
items-center
gap-4
"
>


<img

src={
university?.universityLogo
}

alt={
university?.universityName
}

className="
h-16
w-16
rounded-2xl
border
border-slate-200
bg-white
object-contain
p-2
shadow
"

/>



<div>

<h3
className="
text-xl
font-black
text-slate-900
"
>

{university?.universityName}

</h3>


<p
className="
text-sm
text-slate-500
"
>

Recognized & Career Focused University

</p>


</div>


</div>





{/* Info Cards */}

<div
className="
mt-10
grid
gap-4
sm:grid-cols-3
"
>



<div
className="
rounded-2xl
border
border-slate-200
bg-slate-50
p-4
"
>

<p className="text-sm text-slate-500">
Duration
</p>


<h3 className="mt-1 font-black">
{course.duration}
</h3>


</div>




<div
className="
rounded-2xl
border
border-slate-200
bg-slate-50
p-4
"
>

<p className="text-sm text-slate-500">
Fees
</p>


<h3 className="mt-1 font-black">
₹{Number(course.fees).toLocaleString("en-IN")}
</h3>


</div>





<div
className="
rounded-2xl
border
border-slate-200
bg-slate-50
p-4
"
>

<p className="text-sm text-slate-500">
Status
</p>


<h3 className="mt-1 font-black">
{course.status}
</h3>


</div>



</div>





{/* Buttons */}

<div
className="
mt-10
flex
flex-wrap
gap-4
"
>


<button
onClick={() =>
setApplyModalOpen(true)
}
className="
rounded-2xl
bg-sky-600
px-8
py-4
font-bold
text-white
transition
hover:bg-sky-700
hover:scale-105
"
>

Apply Now

</button>




<button
className="
rounded-2xl
border
border-sky-200
bg-white
px-8
py-4
font-bold
text-sky-700
transition
hover:bg-sky-50
"
>

Download Brochure

</button>



</div>



</div>





{/* RIGHT SIDE IMAGE CARD */}


<div
className="
hidden
lg:flex
items-center
justify-center
"
>


<div
className="
relative
rounded-[32px]
border
border-slate-200
bg-white
p-5
shadow-xl
"
>


<img

src={
university?.universityBanner ||
"https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
}

alt="course"

className="
h-[420px]
w-full
rounded-[25px]
object-cover
"

/>


</div>


</div>



</div>


</motion.section>



      <div
        className="
        mx-auto
        max-w-7xl
        px-6
        py-20
        "
      >


       {/* ================= TRUST STATS SECTION ================= */}


<motion.section
initial={{
  opacity:0,
  y:40,
}}
whileInView={{
  opacity:1,
  y:0,
}}
viewport={{
  once:true,
}}
transition={{
  duration:0.6,
}}
className="
grid
gap-5
sm:grid-cols-2
lg:grid-cols-4
"
>


<div
className="
rounded-3xl
border
border-slate-200
bg-white
p-5
shadow-lg
shadow-sky-100/50
"
>

<div
className="
flex
items-center
gap-4
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
bg-sky-100
text-sky-600
"
>

<GraduationCap size={26}/>

</div>


<div>

<h3
className="
text-2xl
font-black
text-slate-900
"
>
10K+
</h3>


<p className="text-sm text-slate-500">
Students
</p>


</div>


</div>

</div>





<div
className="
rounded-3xl
border
border-slate-200
bg-white
p-5
shadow-lg
shadow-sky-100/50
"
>

<div
className="
flex
items-center
gap-4
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
bg-cyan-100
text-cyan-600
"
>

<Building2 size={26}/>

</div>


<div>

<h3
className="
text-2xl
font-black
text-slate-900
"
>
50+
</h3>


<p className="text-sm text-slate-500">
Universities
</p>


</div>


</div>

</div>





<div
className="
rounded-3xl
border
border-slate-200
bg-white
p-5
shadow-lg
shadow-sky-100/50
"
>

<div
className="
flex
items-center
gap-4
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
bg-purple-100
text-purple-600
"
>

<BadgeCheck size={26}/>

</div>


<div>

<h3
className="
text-2xl
font-black
text-slate-900
"
>
100%
</h3>


<p className="text-sm text-slate-500">
Certification
</p>


</div>


</div>

</div>





<div
className="
rounded-3xl
border
border-slate-200
bg-white
p-5
shadow-lg
shadow-sky-100/50
"
>

<div
className="
flex
items-center
gap-4
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
bg-emerald-100
text-emerald-600
"
>

<Briefcase size={26}/>

</div>


<div>

<h3
className="
text-2xl
font-black
text-slate-900
"
>
24/7
</h3>


<p className="text-sm text-slate-500">
Career Support
</p>


</div>


</div>

</div>



</motion.section>






{/* ================= COURSE OVERVIEW ================= */}



<motion.section

initial={{
opacity:0,
y:40,
}}

whileInView={{
opacity:1,
y:0,
}}

viewport={{
once:true,
}}

transition={{
duration:0.6,
}}

className="
mt-12
"

>


<div
className="
rounded-[32px]
border
border-slate-200
bg-white
p-8
shadow-xl
shadow-sky-100/40
md:p-10
"
>


<div
className="
flex
items-center
gap-3
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
bg-sky-100
text-sky-600
"
>

<BookOpen size={26}/>

</div>



<h2
className="
text-3xl
font-black
text-slate-900
"
>

Course Overview

</h2>



</div>





<p
className="
mt-6
text-base
leading-8
text-slate-600
"
>

{course.description ||
`
The ${course.courseName} program is designed to provide
industry focused knowledge, practical skills and career
growth opportunities with expert guidance.
`
}

</p>



<div
className="
mt-8
grid
gap-4
md:grid-cols-3
"
>


<div
className="
rounded-2xl
bg-sky-50
p-5
"
>

<h4 className="font-bold text-sky-700">
Flexible Learning
</h4>

<p className="mt-2 text-sm text-slate-600">
Learn anytime from anywhere.
</p>

</div>



<div
className="
rounded-2xl
bg-cyan-50
p-5
"
>

<h4 className="font-bold text-cyan-700">
Industry Skills
</h4>

<p className="mt-2 text-sm text-slate-600">
Practical knowledge for career growth.
</p>

</div>




<div
className="
rounded-2xl
bg-blue-50
p-5
"
>

<h4 className="font-bold text-blue-700">
Expert Support
</h4>

<p className="mt-2 text-sm text-slate-600">
Guidance throughout your journey.
</p>

</div>



</div>



</div>


</motion.section>




{/* ================= QUICK INFO SECTION ================= */}


<motion.section

initial={{
opacity:0,
y:40,
}}

whileInView={{
opacity:1,
y:0,
}}

viewport={{
once:true,
}}

transition={{
duration:0.6,
}}

className="
mt-12
grid
gap-5
sm:grid-cols-2
xl:grid-cols-4
"

>


{/* Duration */}

<div
className="
rounded-3xl
border
border-slate-200
bg-white
p-5
shadow-lg
shadow-sky-100/40
"
>

<div
className="
flex
items-center
gap-4
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
bg-sky-100
text-sky-600
"
>

<Clock3 size={26}/>

</div>


<div>

<h3
className="
text-xl
font-black
text-slate-900
"
>
{course.duration}
</h3>


<p className="text-sm text-slate-500">
Duration
</p>


</div>


</div>


</div>





{/* Fees */}


<div
className="
rounded-3xl
border
border-slate-200
bg-white
p-5
shadow-lg
shadow-sky-100/40
"
>


<div
className="
flex
items-center
gap-4
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
bg-emerald-100
text-emerald-600
"
>

<IndianRupee size={26}/>

</div>


<div>

<h3
className="
text-xl
font-black
text-slate-900
"
>

₹{Number(course.fees).toLocaleString("en-IN")}

</h3>


<p className="text-sm text-slate-500">
Total Fees
</p>


</div>


</div>


</div>






{/* Status */}


<div
className="
rounded-3xl
border
border-slate-200
bg-white
p-5
shadow-lg
shadow-sky-100/40
"
>


<div
className="
flex
items-center
gap-4
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
bg-yellow-100
text-yellow-600
"
>

<BadgeCheck size={26}/>

</div>



<div>

<h3
className="
text-xl
font-black
text-slate-900
"
>

{course.status}

</h3>


<p className="text-sm text-slate-500">
Admission Status
</p>


</div>


</div>


</div>






{/* Mode */}


<div
className="
rounded-3xl
border
border-slate-200
bg-white
p-5
shadow-lg
shadow-sky-100/40
"
>


<div
className="
flex
items-center
gap-4
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
bg-purple-100
text-purple-600
"
>

<GraduationCap size={26}/>

</div>



<div>

<h3
className="
text-xl
font-black
text-slate-900
"
>
Online
</h3>


<p className="text-sm text-slate-500">
Study Mode
</p>


</div>


</div>


</div>



</motion.section>








{/* ================= COURSE HIGHLIGHTS ================= */}



<motion.section

initial={{
opacity:0,
y:40,
}}

whileInView={{
opacity:1,
y:0,
}}

viewport={{
once:true,
}}

transition={{
duration:0.6,
}}

className="
mt-16
"

>


<div
className="
mb-8
"
>


<h2
className="
text-3xl
font-black
text-slate-900
"
>

Course Highlights

</h2>


<p
className="
mt-2
text-slate-600
"
>

Everything you need for a successful career journey.

</p>


</div>




<div
className="
grid
gap-5
md:grid-cols-2
lg:grid-cols-4
"
>


{[
{
title:"Industry Curriculum",
text:"Updated syllabus designed according to market needs."
},

{
title:"Expert Faculty",
text:"Learn from experienced mentors and professionals."
},

{
title:"Practical Projects",
text:"Gain real-world experience through assignments."
},

{
title:"Career Support",
text:"Guidance for resume, interviews and placement."
}

].map((item,index)=>(


<motion.div

key={index}

whileHover={{
y:-8,
}}

className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-lg
shadow-sky-100/40
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
bg-gradient-to-br
from-sky-500
to-cyan-400
text-white
font-black
"
>

{index+1}

</div>



<h3
className="
mt-5
text-lg
font-bold
text-slate-900
"
>

{item.title}

</h3>


<p
className="
mt-3
text-sm
leading-6
text-slate-600
"
>

{item.text}

</p>



</motion.div>


))}



</div>


</motion.section>



{/* ===================== UNIVERSITY DETAILS ===================== */}

<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="mt-20"
>
  <div
    className="
    relative
    overflow-hidden
    rounded-[36px]
    border
    border-sky-100
    bg-gradient-to-br
    from-[#f8fcff]
    via-[#eef7ff]
    to-[#ffffff]
    shadow-[0_25px_80px_rgba(14,165,233,0.12)]
    "
  >

    {/* Decorative Background */}

    <div className="absolute inset-0">

      {/* Top Glow */}

      <div
        className="
        absolute
        -top-32
        -left-20
        h-72
        w-72
        rounded-full
        bg-cyan-300/30
        blur-[120px]
        "
      />

      {/* Bottom Glow */}

      <div
        className="
        absolute
        -bottom-24
        -right-10
        h-80
        w-80
        rounded-full
        bg-blue-300/25
        blur-[130px]
        "
      />

      {/* Purple Glow */}

      <div
        className="
        absolute
        top-20
        right-1/3
        h-56
        w-56
        rounded-full
        bg-violet-300/20
        blur-[110px]
        "
      />

      {/* Grid */}

      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]
        [background-size:40px_40px]
        "
      />

    </div>

    <div className="relative z-10 grid lg:grid-cols-[290px_1fr]">

      {/* ================= LEFT LOGO ================= */}

      <div
        className="
        relative
        flex
        items-center
        justify-center
        p-6
        md:p-8
        "
      >

        {/* Circle */}

        <div
          className="
          absolute
          h-[240px]
          w-[240px]
          rounded-full
          border
          border-sky-200
          "
        />

        <div
          className="
          absolute
          h-[290px]
          w-[290px]
          rounded-full
          border
          border-sky-100
          "
        />

        {/* Floating Dots */}

        <div className="absolute top-12 left-12 h-3 w-3 rounded-full bg-sky-400" />

        <div className="absolute bottom-12 right-12 h-2 w-2 rounded-full bg-cyan-500" />

        <div className="absolute top-20 right-10 h-2.5 w-2.5 rounded-full bg-blue-500" />

        {/* Logo */}

        <motion.div
          whileHover={{
            scale: 1.05,
            rotate: 2,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
          relative
          flex
          h-32
          w-32
          items-center
          justify-center
          rounded-[28px]
          bg-white
          p-5
          shadow-2xl
          ring-8
          ring-sky-50
          "
        >

          <img
            src={university?.universityLogo}
            alt={university?.universityName}
            className="
            h-full
            w-full
            object-contain
            "
          />

        </motion.div>

      </div>

      {/* ================= RIGHT CONTENT ================= */}

      <div
        className="
        p-7
        md:p-10
        "
      >

        {/* Heading */}

        <div className="flex items-center gap-3">

          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-sky-100
            "
          >

            <Building2
              size={24}
              className="text-sky-600"
            />

          </div>

          <div>

            <p className="text-sm font-semibold uppercase tracking-[3px] text-sky-600">
              Partner University
            </p>

            <h2
              className="
              mt-1
              text-3xl
              font-black
              text-slate-900
              md:text-4xl
              "
            >
              {university?.universityName}
            </h2>

          </div>

        </div>

        {/* Description */}

        <p
          className="
          mt-6
          max-w-3xl
          text-[16px]
          leading-8
          text-slate-600
          "
        >
          {university?.description ||
            `${university?.universityName} offers industry-focused education, experienced faculty, practical learning, placement assistance and flexible online programs that help students build successful careers with recognised university degrees.`}
        </p>

        {/* ===== Part 2 starts from INFO GRID ===== */}
                {/* ================= INFO GRID ================= */}

        <div
          className="
          mt-8
          grid
          gap-4
          sm:grid-cols-2
          "
        >
          {[
            {
              title: "University Type",
              value: university?.universityType || "Private University",
              icon: "🏛️",
            },
            {
              title: "Established",
              value: university?.establishedYear || "N/A",
              icon: "📅",
            },
            {
              title: "Ranking",
              value: university?.ranking || "Top Ranked",
              icon: "🏆",
            },
            {
              title: "Location",
              value: `${university?.city}, ${university?.state}`,
              icon: "📍",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -5,
                scale: 1.02,
              }}
              transition={{ duration: 0.25 }}
              className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-5
              py-4
              shadow-md
              hover:shadow-xl
              transition-all
              "
            >
              <div className="flex items-center gap-3">

                <div
                  className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-sky-100
                  text-xl
                  "
                >
                  {item.icon}
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {item.title}
                  </p>

                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    {item.value}
                  </h3>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= APPROVALS ================= */}

        <div
          className="
          mt-8
          flex
          flex-wrap
          gap-3
          "
        >
          {[
            "UGC Approved",
            "NAAC Accredited",
            "Industry Recognized",
            "Online Learning",
          ].map((item, index) => (
            <motion.span
              key={index}
              whileHover={{
                scale: 1.05,
              }}
              className="
              rounded-full
              border
              border-sky-200
              bg-sky-50
              px-5
              py-2
              text-sm
              font-semibold
              text-sky-700
              "
            >
              ✓ {item}
            </motion.span>
          ))}
        </div>

        {/* ================= BUTTONS ================= */}

        <div
          className="
          mt-10
          flex
          flex-wrap
          gap-4
          "
        >
          <Link
            to={`/universities/${university?.slug}`}
            className="
            inline-flex
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-r
            from-sky-600
            via-cyan-500
            to-blue-600
            px-8
            py-3.5
            font-bold
            text-white
            shadow-lg
            transition-all
            hover:-translate-y-1
            hover:shadow-2xl
            "
          >
            Visit University →
          </Link>

          <button
            className="
            inline-flex
            items-center
            justify-center
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-8
            py-3.5
            font-bold
            text-slate-800
            shadow-md
            transition-all
            hover:-translate-y-1
            hover:border-sky-500
            hover:text-sky-600
            hover:shadow-xl
            "
          >
            Download Brochure
          </button>
        </div>

      </div>
    </div>
  </div>
</motion.section>


{/* ===================== ADMISSION INFORMATION ===================== */}

<div className="mt-20">

  {/* Heading */}

  <motion.div
    initial={{
      opacity: 0,
      y: 30,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
    }}
    viewport={{
      once: true,
    }}
    transition={{
      duration: 0.6,
    }}
    className="text-center"
  >

    <div
      className="
      inline-flex
      items-center
      gap-2
      rounded-full
      border
      border-sky-200
      bg-sky-50
      px-5
      py-2
      text-sm
      font-semibold
      text-sky-700
      "
    >
      <BadgeCheck size={16} />
      Admission Information
    </div>

    <h2
      className="
      mt-6
      text-4xl
      font-black
      text-slate-900
      "
    >
      Everything You Need Before Applying
    </h2>

    <p
      className="
      mx-auto
      mt-4
      max-w-2xl
      text-slate-600
      "
    >
      Check the eligibility criteria and admission process before applying
      for this program.
    </p>

  </motion.div>



  <div
    className="
    mt-12
    grid
    gap-8
    lg:grid-cols-2
    "
  >




{/* ================= ELIGIBILITY ================= */}

<motion.div

initial={{
opacity:0,
x:-40
}}

whileInView={{
opacity:1,
x:0
}}

viewport={{
once:true
}}

transition={{
duration:.6
}}

className="
relative
overflow-hidden
rounded-[32px]
border
border-slate-200
bg-gradient-to-br
from-white
via-sky-50
to-white
p-8
shadow-xl
"
>

<div
className="
absolute
-right-20
-top-20
h-52
w-52
rounded-full
bg-sky-200/40
blur-[90px]
"
/>


<div className="relative z-10">


<div className="flex items-center gap-4">

<div
className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-sky-100
"
>

<BadgeCheck
size={28}
className="text-sky-600"
/>

</div>


<div>

<p
className="
text-sm
font-semibold
uppercase
tracking-[2px]
text-sky-600
"
>

Eligibility

</p>

<h3
className="
text-3xl
font-black
text-slate-900
"
>

Who Can Apply?

</h3>

</div>

</div>




<div
className="
mt-8
space-y-5
"
>

{[

course.eligibility ||
"10+2 / Graduation from recognised board or university",

"Valid identity proof and academic documents required",

"Admission based on university eligibility criteria",

"Working professionals can also apply"

].map((item,index)=>(

<motion.div

key={index}

whileHover={{
x:8
}}

className="
flex
items-start
gap-4
rounded-2xl
border
border-slate-200
bg-white
p-4
shadow-sm
"
>

<div
className="
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-green-100
"
>

<CheckCircle2
size={20}
className="text-green-600"
/>

</div>

<p
className="
flex-1
leading-7
text-slate-700
"
>

{item}

</p>

</motion.div>

))}

</div>

</div>

</motion.div>

{/* ================= ADMISSION PROCESS ================= */}

<motion.div
  initial={{
    opacity: 0,
    x: 40,
  }}
  whileInView={{
    opacity: 1,
    x: 0,
  }}
  viewport={{
    once: true,
  }}
  transition={{
    duration: 0.6,
  }}
  className="
  relative
  overflow-hidden
  rounded-[32px]
  border
  border-slate-200
  bg-gradient-to-br
  from-white
  via-purple-50
  to-white
  p-8
  shadow-xl
  "
>

  {/* Glow */}

  <div
    className="
    absolute
    -left-20
    -bottom-20
    h-56
    w-56
    rounded-full
    bg-purple-200/40
    blur-[90px]
    "
  />

  <div className="relative z-10">

    {/* Heading */}

    <div className="flex items-center gap-4">

      <div
        className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        bg-purple-100
        "
      >
        <GraduationCap
          size={28}
          className="text-purple-600"
        />
      </div>

      <div>

        <p
          className="
          text-sm
          font-semibold
          uppercase
          tracking-[2px]
          text-purple-600
          "
        >
          Admission Process
        </p>

        <h3
          className="
          text-3xl
          font-black
          text-slate-900
          "
        >
          Just 5 Easy Steps
        </h3>

      </div>

    </div>

    {/* Timeline */}

    <div className="relative mt-10">

      {/* Vertical Line */}

      <div
        className="
        absolute
        left-5
        top-2
        h-[85%]
        w-[3px]
        rounded-full
        bg-gradient-to-b
        from-sky-500
        via-cyan-400
        to-purple-500
        "
      />

      {[
        "Fill Online Application Form",
        "Upload Required Documents",
        "Document Verification",
        "Fee Payment",
        "Admission Confirmation",
      ].map((step, index) => (

        <motion.div
          key={index}
          whileHover={{
            x: 8,
          }}
          className="
          relative
          mb-6
          flex
          gap-5
          "
        >

          {/* Step Number */}

          <div
            className="
            relative
            z-10
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-sky-500
            to-cyan-500
            font-bold
            text-white
            shadow-lg
            "
          >
            {index + 1}
          </div>

          {/* Step Card */}

          <div
            className="
            flex-1
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            transition-all
            hover:shadow-lg
            "
          >

            <h4
              className="
              font-bold
              text-slate-900
              "
            >
              {step}
            </h4>

            <p
              className="
              mt-1
              text-sm
              leading-6
              text-slate-600
              "
            >
              Complete this step carefully to move ahead with your admission.
            </p>

          </div>

        </motion.div>

      ))}

    </div>

  </div>

</motion.div>

</div>

</div>


{/* ===================== CAREER SUPPORT ===================== */}

<motion.section
  initial={{
    opacity: 0,
    y: 50,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  viewport={{
    once: true,
  }}
  transition={{
    duration: 0.7,
  }}
  className="mt-20"
>
  <div
    className="
    relative
    overflow-hidden
    rounded-[36px]
    border
    border-slate-200
    bg-gradient-to-br
    from-white
    via-sky-50
    to-white
    shadow-[0_25px_70px_rgba(14,165,233,.12)]
    "
  >

    {/* Glow */}

    <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-cyan-300/30 blur-[120px]" />

    <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-blue-300/30 blur-[120px]" />

    <div className="relative z-10 p-8 md:p-12">

      {/* Heading */}

      <div className="text-center">

        <div
          className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-sky-100
          px-5
          py-2
          text-sm
          font-semibold
          text-sky-700
          "
        >
          <Award size={16} />
          Career Benefits
        </div>

        <h2
          className="
          mt-6
          text-4xl
          font-black
          text-slate-900
          "
        >
          Everything You Need For Career Success
        </h2>

        <p
          className="
          mx-auto
          mt-4
          max-w-3xl
          text-slate-600
          "
        >
          Our university provides complete career assistance,
          practical learning and professional guidance for every student.
        </p>

      </div>

      <div
        className="
        mt-12
        grid
        gap-8
        lg:grid-cols-2
        "
      >

        {/* LEFT SIDE */}

        <div>

          <div className="flex items-center gap-3">

            <Award
              size={30}
              className="text-sky-600"
            />

            <h3
              className="
              text-3xl
              font-black
              text-slate-900
              "
            >
              Placement Support
            </h3>

          </div>

          <div
            className="
            mt-8
            space-y-4
            "
          >

            {[
              "Professional Resume Building",
              "Mock Interview Sessions",
              "Career Counselling",
              "Job Assistance",
              "LinkedIn Profile Optimization",
            ].map((item,index)=>(

              <motion.div
                key={index}
                whileHover={{
                  x:8
                }}
                className="
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
                "
              >

                <div
                  className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-green-100
                  "
                >

                  <CheckCircle2
                    className="text-green-600"
                    size={20}
                  />

                </div>

                <p
                  className="
                  font-medium
                  text-slate-700
                  "
                >
                  {item}
                </p>

              </motion.div>

            ))}

          </div>

        </div>
                {/* ================= RIGHT SIDE ================= */}

        <div>

          <div className="flex items-center gap-3">

            <Sparkles
              size={30}
              className="text-purple-600"
            />

            <h3
              className="
              text-3xl
              font-black
              text-slate-900
              "
            >
              Why Choose This Course?
            </h3>

          </div>

          <div
            className="
            mt-8
            grid
            gap-4
            sm:grid-cols-2
            "
          >

            {[
              {
                title: "Industry Curriculum",
                icon: "🚀",
              },
              {
                title: "Expert Faculty",
                icon: "👨‍🏫",
              },
              {
                title: "Live Projects",
                icon: "💻",
              },
              {
                title: "Placement Assistance",
                icon: "🎯",
              },
              {
                title: "Affordable Fees",
                icon: "💰",
              },
              {
                title: "Recognized Degree",
                icon: "🏆",
              },
            ].map((item, index) => (

              <motion.div
                key={index}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                hover:shadow-xl
                transition-all
                "
              >

                <div
                  className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-r
                  from-sky-100
                  to-cyan-100
                  text-2xl
                  "
                >
                  {item.icon}
                </div>

                <h4
                  className="
                  mt-4
                  text-lg
                  font-bold
                  text-slate-900
                  "
                >
                  {item.title}
                </h4>

                <p
                  className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-600
                  "
                >
                  Learn through a practical and career-oriented approach
                  with continuous guidance from experienced mentors.
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

      {/* ================= STATS ================= */}

      <div
        className="
        mt-12
        grid
        gap-5
        border-t
        border-slate-200
        pt-10
        md:grid-cols-4
        "
      >

        {[
          {
            number: "100%",
            label: "Career Support",
          },
          {
            number: "24/7",
            label: "Student Assistance",
          },
          {
            number: "50+",
            label: "Industry Projects",
          },
          {
            number: "Top",
            label: "University Degree",
          },
        ].map((item, index) => (

          <motion.div
            key={index}
            whileHover={{
              y: -5,
            }}
            className="
            rounded-2xl
            bg-white
            p-6
            text-center
            shadow-md
            "
          >

            <h2
              className="
              text-4xl
              font-black
              bg-gradient-to-r
              from-sky-600
              via-cyan-500
              to-blue-600
              bg-clip-text
              text-transparent
              "
            >
              {item.number}
            </h2>

            <p
              className="
              mt-2
              font-medium
              text-slate-600
              "
            >
              {item.label}
            </p>

          </motion.div>

        ))}

      </div>

    </div>

  </div>

</motion.section>

{/* ===================== FINAL CTA SECTION ===================== */}
<motion.section
  initial={{
    opacity: 0,
    y: 60,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  viewport={{
    once: true,
  }}
  transition={{
    duration: 0.8,
  }}
  className="mt-20 mb-10"
>
  <div
    className="
    relative
    overflow-hidden
    rounded-[36px]
    border
    border-sky-200/30
    bg-gradient-to-br
    from-sky-600
    via-cyan-500
    to-blue-700
    shadow-[0_25px_80px_rgba(14,165,233,.35)]
    "
  >
    {/* Glow */}

    <motion.div
      animate={{
        x: [0, 120, 0],
        y: [0, 60, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
      }}
      className="
      absolute
      -top-24
      -left-20
      h-72
      w-72
      rounded-full
      bg-white/20
      blur-[120px]
      "
    />

    <motion.div
      animate={{
        x: [0, -90, 0],
        y: [0, -40, 0],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
      }}
      className="
      absolute
      bottom-0
      right-0
      h-80
      w-80
      rounded-full
      bg-cyan-300/20
      blur-[120px]
      "
    />

    {/* Pattern */}

    <div
      className="
      absolute
      inset-0
      opacity-10
      [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)]
      [background-size:38px_38px]
      "
    />

    <div
      className="
      relative
      z-10
      px-6
      py-10
      md:px-12
      text-center
      "
    >
      {/* Badge */}

      <div
        className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-white/30
        bg-white/15
        px-4
        py-1.5
        text-xs
        font-semibold
        text-white
        backdrop-blur-xl
        "
      >
        <Sparkles size={14} />
        Admissions Open 2026
      </div>

      {/* Heading */}

      <h2
        className="
        mt-5
        text-3xl
        md:text-5xl
        font-black
        leading-tight
        text-white
        "
      >
        Ready To Build
        <br />
        Your Dream Career?
      </h2>

      {/* Description */}

      <p
        className="
        mx-auto
        mt-4
        max-w-2xl
        text-base
        leading-7
        text-white/90
        "
      >
        Join India's leading universities, gain industry-ready skills,
        receive expert career guidance and earn a recognized online degree.
      </p>

      {/* Trust Badges */}

      <div
        className="
        mt-6
        flex
        flex-wrap
        justify-center
        gap-2
        "
      >
        {[
          "✓ UGC Approved",
          "✓ NAAC Accredited",
          "✓ Placement Support",
          "✓ Expert Counselling",
        ].map((item, index) => (
          <div
            key={index}
            className="
            rounded-full
            border
            border-white/30
            bg-white/15
            px-4
            py-1.5
            text-xs
            font-semibold
            text-white
            backdrop-blur-xl
            "
          >
            {item}
          </div>
        ))}
      </div>

      {/* Buttons */}

      <div
        className="
        mt-7
        flex
        flex-wrap
        justify-center
        gap-3
        "
      >
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => setApplyModalOpen(true)}
          className="
          rounded-xl
          bg-white
          px-7
          py-3
          text-base
          font-bold
          text-sky-700
          shadow-xl
          transition
          hover:shadow-2xl
          "
        >
          Apply Now →
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => setApplyModalOpen(true)}
          className="
          rounded-xl
          border-2
          border-white
          bg-white/10
          px-7
          py-3
          text-base
          font-bold
          text-white
          backdrop-blur-xl
          transition
          hover:bg-white
          hover:text-sky-700
          "
        >
          Free Counselling
        </motion.button>
      </div>

      {/* Stats */}

      <div
        className="
        mt-8
        grid
        gap-3
        border-t
        border-white/20
        pt-6
        md:grid-cols-3
        "
      >
        {[
          {
            number: "100%",
            label: "Admission Support",
          },
          {
            number: "50+",
            label: "Professional Courses",
          },
          {
            number: "Top",
            label: "Partner Universities",
          },
        ].map((item, index) => (
          <div key={index}>
            <h3
              className="
              text-3xl
              font-black
              text-white
              "
            >
              {item.number}
            </h3>

            <p
              className="
              mt-1
              text-sm
              text-white/80
              "
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</motion.section>

      </div>





      <ApplyNowModal

        isOpen={applyModalOpen}

        onClose={() =>
          setApplyModalOpen(false)
        }

        university={university}

      />


    </section>

  );

}