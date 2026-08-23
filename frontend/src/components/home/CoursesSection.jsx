import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import ApplyNowModal from "../universities/ApplyNowModal";

import {
  GraduationCap,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import CourseCard from "../courses/CourseCard";

import {
  getPublicCourses,
} from "../../services/courseService";


export default function CoursesSection() {


  const [courses,setCourses] = useState([]);

  const [loading,setLoading] = useState(true);

  const [error,setError] = useState("");

  const [selectedCourse,setSelectedCourse] = useState(null);




  useEffect(()=>{


    const fetchCourses = async()=>{


      try{


        setLoading(true);


        const res = await getPublicCourses();


        const validCourses = (
          res?.courses || []
        )
        .filter(
          (course)=>course.university
        )
        .slice(0,8);



        setCourses(validCourses);

console.log("PUBLIC COURSES RESPONSE", res);
console.log("FIRST COURSE", res?.courses?.[0]);


      }
      catch(err){


        console.log(err);

        setError(
          "Unable to load courses."
        );


      }
      finally{


        setLoading(false);


      }


    };



    fetchCourses();


  },[]);





  if(loading){

    return (

      <section className="
      py-24
      bg-slate-50
      ">

        <div className="
        max-w-7xl
        mx-auto
        px-6
        text-center
        ">

          <h2 className="
mt-4
max-w-3xl
text-3xl
font-black
leading-tight
text-slate-900
md:text-5xl
">

            Loading Courses...

          </h2>

        </div>

      </section>

    );

  }





  if(error){

    return (

      <section className="
      py-24
      text-center
      text-red-500
      ">

        {error}

      </section>

    );

  }
    return (

    <section
  className="
  relative
  overflow-hidden
  bg-gradient-to-br
  from-sky-50
  via-white
  to-cyan-50
  py-16
  "
>



      {/* Background Glow */}


      <div

        className="
        absolute
        -top-40
        -left-40
        h-[500px]
        w-[500px]
        rounded-full
        bg-cyan-200/30
        blur-[120px]
        "

      />



      <div

        className="
        absolute
        top-20
        right-0
        h-[420px]
        w-[420px]
        rounded-full
        bg-blue-200/30
        blur-[120px]
        "

      />



      <div

        className="
        absolute
        bottom-0
        left-1/2
        -translate-x-1/2
        h-[350px]
        w-[700px]
        rounded-full
        bg-sky-100/50
        blur-[120px]
        "

      />





      {/* Dot Pattern */}


      <div

        className="
        absolute
        inset-0
        opacity-[0.04]
        [background-image:radial-gradient(#0284c7_1px,transparent_1px)]
        [background-size:24px_24px]
        "

      />







      {/* Main Content */}



      <div

        className="
        relative
        z-10
        max-w-[1400px]
        mx-auto
        px-6
        lg:px-10
        "

      >


        {/* HEADER SECTION */}


        <motion.div

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
            duration:0.7,
          }}


         className="
flex
flex-col
gap-5
lg:flex-row
lg:items-center
lg:justify-between
"

        >




          {/* Left Content */}


          <div>


            <span

              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-200
              bg-cyan-50
              px-4
py-1.5
text-xs
              font-semibold
              text-cyan-700
              "

            >

              <Sparkles size={16}/>

              TRENDING COURSES


            </span>





            <h2

             className="
mt-4
max-w-3xl
text-3xl
font-black
leading-tight
text-slate-900
md:text-5xl
"

            >

              Explore Our
              
              <span className="text-sky-600">
                {" "}
                Popular Courses
              </span>


            </h2>





            <p

             className="
mt-3
max-w-xl
text-base
leading-7
text-slate-600
"

            >

              Discover career-focused degree programs
              from India's leading universities with
              expert admission guidance and support.


            </p>



          </div>







          {/* View All Button */}



          <Link

            to="/courses"


            className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-sky-500
            to-cyan-600
            px-7
            py-3
            font-bold
            text-white
            shadow-lg
            shadow-sky-200
            transition-all
            duration-300
            hover:scale-105
            "

          >

            View All Courses


            <ArrowRight size={18}/>


          </Link>




        </motion.div>
                {/* COURSE GRID */}



        {
          courses.length > 0 ? (


            <motion.div

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
                duration:0.7,
              }}


              className="
              mt-14
              grid
              gap-7
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              "

            >



              {
                courses.map(
                  (course,index)=>(


                    <motion.div


                      key={
                        course._id
                      }


                      initial={{
                        opacity:0,
                        y:30,
                      }}


                      whileInView={{
                        opacity:1,
                        y:0,
                      }}


                      viewport={{
                        once:true,
                      }}


                      transition={{
                        duration:0.45,
                        delay:index*0.08,
                      }}


                      whileHover={{
                        y:-8,
                      }}


                      className="
                      w-full
                      "
                    >




                      <CourseCard

                        course={
                          course
                        }


                        onApply={()=>{


                          setSelectedCourse(
                            course
                          );


                        }}

                      />




                    </motion.div>


                  )
                )
              }




            </motion.div>



          ) : (


            <div

              className="
              mt-16
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-14
              text-center
              shadow-lg
              "

            >



              <GraduationCap

                size={80}

                className="
                mx-auto
                text-sky-600
                "

              />



              <h3

               className="
mt-4
max-w-3xl
text-3xl
font-black
leading-tight
text-slate-900
md:text-5xl
"

              >

                No Courses Found


              </h3>




              <p

                className="
                mt-3
                text-slate-600
                "

              >

                Courses will appear here after adding
                from admin panel.


              </p>



            </div>



          )

        }
                {/* CTA SECTION */}


        <motion.div

          initial={{
            opacity:0,
            y:50,
          }}

          whileInView={{
            opacity:1,
            y:0,
          }}

          viewport={{
            once:true,
          }}

          transition={{
            duration:0.7,
          }}


          className="
          relative
          mt-20
          overflow-hidden
          rounded-[36px]
          bg-gradient-to-r
          from-sky-600
          via-cyan-500
          to-blue-600
          p-10
          text-center
          md:p-14
          "

        >



          {/* Glow */}


          <div

            className="
            absolute
            -left-20
            -top-20
            h-64
            w-64
            rounded-full
            bg-white/20
            blur-[100px]
            "

          />



          <div

            className="
            absolute
            -right-20
            -bottom-20
            h-64
            w-64
            rounded-full
            bg-cyan-200/30
            blur-[100px]
            "

          />






          <div

            className="
            relative
            z-10
            "

          >



            <Sparkles

              size={42}

              className="
              mx-auto
              text-white
              "

            />




            <h3

              className="
              mt-5
              text-3xl
              font-black
              text-white
              md:text-5xl
              "

            >

              Confused About Choosing The Right Course?


            </h3>




            <p

              className="
              mx-auto
              mt-5
              max-w-2xl
              text-lg
              leading-8
              text-white/90
              "

            >

              Get free counselling from our experts
              and select the best university program
              for your career.


            </p>





            <button

              onClick={()=>{

                setSelectedCourse({
                  university:null
                });

              }}


              className="
              mt-8
              rounded-2xl
              bg-white
              px-8
              py-4
              font-bold
              text-sky-700
              transition
              hover:scale-105
              "

            >

              Get Free Counselling


            </button>



          </div>



        </motion.div>





      </div>





      {
        selectedCourse && (

          <ApplyNowModal

            isOpen={true}

            university={
              selectedCourse.university
            }


            course={
              selectedCourse.courseName
            }


            onClose={()=>{

              setSelectedCourse(null);

            }}

          />

        )
      }





    </section>

  );

}