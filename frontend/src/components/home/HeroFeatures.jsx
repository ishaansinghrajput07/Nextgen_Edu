import { motion } from "framer-motion";
import {
  CheckCircle2,
  GraduationCap,
  Building2,
  Award,
  Headphones,
} from "lucide-react";


const features = [

  {
    icon: GraduationCap,
    title: "Career Counselling",
  },

  {
    icon: Building2,
    title: "250+ Universities",
  },

  {
    icon: Award,
    title: "Scholarship Support",
  },

  {
    icon: Headphones,
    title: "Admission Assistance",
  },

];



export default function HeroFeatures() {


  return (

    <motion.div


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
        duration:.7,
      }}



      className="
      mt-8
      grid
      grid-cols-2
      lg:grid-cols-4
      gap-5
      "


    >



      {
        features.map((item,index)=>{


          const Icon=item.icon;



          return (


            <motion.div


              key={item.title}


              whileHover={{
                y:-6,
              }}



              transition={{
                duration:.3,
              }}




              className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white
              px-5
              py-5
              shadow-[0_10px_35px_rgba(15,23,42,.08)]
              transition-all
              duration-300
              hover:shadow-[0_20px_45px_rgba(15,23,42,.12)]
              "


            >



              {/* Glow */}


              <div
                className="
                absolute
                -right-10
                -top-10
                h-24
                w-24
                rounded-full
                bg-cyan-200/40
                blur-2xl
                transition
                group-hover:bg-cyan-300/50
                "
              />






              <div className="relative flex items-center gap-4">





                <div

                  className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-cyan-500
                  to-blue-600
                  text-white
                  shadow-lg
                  "

                >

                  <Icon size={23}/>


                </div>





                <div>


                  <div className="flex items-center gap-2">


                    <CheckCircle2

                      size={15}

                      className="text-cyan-600"

                    />


                    <h3 className="text-sm font-bold text-slate-800">

                      {item.title}

                    </h3>


                  </div>


                  <p className="mt-1 text-xs text-slate-500">

                    Trusted Support

                  </p>



                </div>





              </div>





            </motion.div>



          );


        })
      }



    </motion.div>

  );

}