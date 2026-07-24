import { useState } from "react";
import { motion } from "framer-motion";
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


export default function ContactForm() {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });


  const [loading, setLoading] = useState(false);



  const [errors, setErrors] = useState({});




  const handleChange = (e)=>{

    const {name,value}=e.target;


    setFormData((prev)=>({
      ...prev,
      [name]:value
    }));


    setErrors((prev)=>({
      ...prev,
      [name]:""
    }));

  };





  const validate = ()=>{

    let err={};


    if(!formData.name)
      err.name="Name required";


    if(!formData.email)
      err.email="Email required";


    if(!formData.phone)
      err.phone="Phone required";


    if(!formData.course)
      err.course="Select course";


    if(!formData.message)
      err.message="Message required";



    setErrors(err);


    return Object.keys(err).length===0;

  };







  const handleSubmit=async(e)=>{

    e.preventDefault();



    if(!validate())
    {
      toast.error("Please fill all fields");
      return;
    }



    try{


      setLoading(true);


      const res=await submitLead(formData);



      if(res?.success)
      {

        toast.success(
          "Our counsellor will contact you soon"
        );


        setFormData({
          name:"",
          email:"",
          phone:"",
          course:"",
          message:""
        });


      }
      else{

        toast.error(
          res?.message || "Something went wrong"
        );

      }



    }
    catch(error){

      console.log(error);

      toast.error(
        "Server error"
      );

    }
    finally{

      setLoading(false);

    }


  };







  return (

<section
className="
relative
py-20
overflow-hidden
"
>


{/* Hero Same Background Glow */}

<div
className="
absolute
top-10
left-1/2
-translate-x-1/2
w-[450px]
h-[450px]
bg-cyan-400/20
blur-[130px]
rounded-full
"
/>


<div
className="
absolute
right-0
bottom-0
w-[350px]
h-[350px]
bg-blue-600/20
blur-[120px]
rounded-full
"
/>





<div
className="
relative
max-w-5xl
mx-auto
px-6
"
>



<motion.div

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
duration:.7
}}

viewport={{
once:true
}}

className="
bg-white
border
border-slate-200
rounded-3xl
shadow-2xl
p-8
md:p-12
"
>




<form
onSubmit={handleSubmit}
className="
space-y-6
"
>





<div
className="
grid
md:grid-cols-2
gap-6
"
>


<Input
icon={<User/>}
name="name"
placeholder="Full Name"
value={formData.name}
onChange={handleChange}
error={errors.name}
/>



<Input
icon={<Mail/>}
name="email"
placeholder="Email Address"
value={formData.email}
onChange={handleChange}
error={errors.email}
/>


</div>






<div
className="
grid
md:grid-cols-2
gap-6
"
>


<Input
icon={<Phone/>}
name="phone"
placeholder="Phone Number"
value={formData.phone}
onChange={handleChange}
error={errors.phone}
/>



<div>


<div
className="
relative
"
>

<BookOpen
className="
absolute
left-4
top-4
text-cyan-600
"
size={20}
/>


<select
name="course"
value={formData.course}
onChange={handleChange}
className="
w-full
pl-12
py-4
rounded-xl
border
border-slate-200
outline-none
focus:border-cyan-500
"
>


<option value="">
Select Course
</option>

<option>B.Tech</option>
<option>MBA</option>
<option>MCA</option>
<option>BCA</option>

</select>


</div>


<p className="text-red-500 text-sm mt-1">
{errors.course}
</p>


</div>


</div>








<div>

<div
className="
relative
"
>


<MessageSquare
className="
absolute
left-4
top-4
text-cyan-600
"
size={20}
/>



<textarea

name="message"

rows="5"

value={formData.message}

onChange={handleChange}

placeholder="Your Message"

className="
w-full
pl-12
py-4
rounded-xl
border
border-slate-200
outline-none
focus:border-cyan-500
resize-none
"

/>


</div>


<p className="text-red-500 text-sm">
{errors.message}
</p>


</div>







<button

disabled={loading}

className="
w-full
flex
justify-center
items-center
gap-3
py-4
rounded-xl
bg-gradient-to-r
from-blue-700
via-cyan-600
to-sky-500
text-white
font-bold
text-lg
shadow-xl
hover:-translate-y-1
transition
disabled:opacity-60
"

>


{
loading ?

<>
<LoaderCircle
className="animate-spin"
/>
Sending...
</>

:

"Submit Enquiry"

}


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
placeholder,
value,
onChange,
error
}){


return (

<div>


<div
className="
relative
"
>


<div
className="
absolute
left-4
top-4
text-cyan-600
"
>

{icon}

</div>


<input

name={name}

value={value}

onChange={onChange}

placeholder={placeholder}

className="
w-full
pl-12
py-4
rounded-xl
border
border-slate-200
outline-none
focus:border-cyan-500
"
/>


</div>


<p className="text-red-500 text-sm mt-1">
{error}
</p>


</div>


)

}