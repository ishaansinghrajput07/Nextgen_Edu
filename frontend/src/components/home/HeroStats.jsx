import { motion } from "framer-motion";
import {
  GraduationCap,
  Building2,
  Award,
  Users,
} from "lucide-react";


const stats = [

  {
    icon: GraduationCap,
    title: "Course Selection",
    description:
      "Choose the right course according to your interest and career goals.",

    bg:
      "bg-blue-50",

    iconBg:
      "bg-blue-100",

    iconColor:
      "text-blue-600",
  },


  {
    icon: Building2,
    title: "University Admission",
    description:
      "Get admission guidance for reputed universities across India.",

    bg:
      "bg-cyan-50",

    iconBg:
      "bg-cyan-100",

    iconColor:
      "text-cyan-600",
  },



  {
    icon: Award,
    title: "Scholarship Assistance",
    description:
      "Find suitable scholarship opportunities for your education.",

    bg:
      "bg-amber-50",

    iconBg:
      "bg-amber-100",

    iconColor:
      "text-amber-600",
  },



  {
    icon: Users,
    title: "Student Support",
    description:
      "Complete support from counselling till admission completion.",

    bg:
      "bg-violet-50",

    iconBg:
      "bg-violet-100",

    iconColor:
      "text-violet-600",
  },

];




export default function HeroStats(){



return (

<motion.section


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
duration:.7,
}}



className="
mt-16
mb-12
"



>


<div

className="
grid
gap-5
lg:grid-cols-2
xl:grid-cols-4
"


>


{

stats.map((item,index)=>{


const Icon=item.icon;



return (


<motion.div


key={item.title}



whileHover={{

y:-8,
scale:1.02,

}}



transition={{

duration:.3,

}}




className={`
relative
overflow-hidden
rounded-[28px]
border
border-slate-100
${item.bg}
px-6
py-5
shadow-[0_10px_35px_rgba(15,23,42,.08)]
hover:shadow-[0_25px_50px_rgba(15,23,42,.12)]
transition-all
duration-300
`}



>



{/* Glow */}

<div

className="
absolute
-right-10
-top-10
h-32
w-32
rounded-full
bg-white/60
blur-3xl
"

/>





<div className="
relative
flex
items-start
gap-4
">





<div

className={`
flex
h-14
w-14
shrink-0
items-center
justify-center
rounded-2xl
${item.iconBg}
`}
>


<Icon

size={26}

className={item.iconColor}

/>


</div>






<div>


<h3

className="
text-[17px]
font-black
text-slate-900
leading-tight
"

>

{item.title}

</h3>



<p

className="
mt-2
text-sm
leading-5
text-slate-600
"

>

{item.description}

</p>



</div>





</div>





</motion.div>


);


})


}



</div>



</motion.section>


);



}