import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Lock,
  Mail,
  ShieldCheck,
  GraduationCap,
  Users,
  BarChart3,
} from "lucide-react";


export default function AdminLogin() {

  const navigate = useNavigate();


  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");



  const handleLogin = (e)=>{

    e.preventDefault();


    if(
      email === "admin@nextgen.com" &&
      password === "123456"
    ){

      localStorage.setItem(
        "adminToken",
        "loggedIn"
      );


      navigate("/admin");

    }

    else{

      alert("Invalid Email or Password");

    }

  };




  return (

<div
className="
relative

min-h-screen

overflow-hidden


flex

items-center

justify-center


bg-gradient-to-br

from-sky-50

via-white

to-cyan-50


px-4

"
>



{/* Background Glow */}


<div
className="
absolute

-top-44

-left-44

w-[520px]

h-[520px]

rounded-full

bg-cyan-200/30

blur-[120px]
"
/>


<div
className="
absolute

top-32

right-0

w-[420px]

h-[420px]

rounded-full

bg-blue-200/20

blur-[120px]
"
/>



<div
className="
absolute

bottom-0

left-1/2

-translate-x-1/2


w-[700px]

h-[320px]

rounded-full


bg-sky-100/40


blur-[120px]
"
/>





{/* Grid Pattern */}


<div
className="
absolute

inset-0

opacity-[0.04]


[background-image:radial-gradient(#0284c7_1px,transparent_1px)]


[background-size:24px_24px]

"
/>





<div
className="
relative

z-10

flex

items-center

justify-center

gap-12

"

>




{/* Left Branding Card */}


<div
className="
hidden

lg:flex


w-[380px]

h-[420px]


rounded-[40px]


bg-white/60


backdrop-blur-2xl


border

border-white/80


shadow-[0_30px_80px_rgba(14,165,233,.18)]


flex-col

items-center

justify-center


p-8

"
>



<div
className="
h-24

w-24


rounded-3xl


bg-gradient-to-br

from-cyan-500

to-sky-600


flex

items-center

justify-center


shadow-xl

shadow-cyan-200

"
>

<GraduationCap

size={50}

className="text-white"

/>


</div>





<h1

className="
mt-6

text-4xl

font-extrabold


bg-gradient-to-r

from-cyan-500

to-sky-600


bg-clip-text

text-transparent

"
>

NextGen

</h1>



<p

className="
text-slate-500

text-center

mt-3

"
>

Smart Education Management Platform

</p>






<div
className="
mt-8

grid

grid-cols-3

gap-3

w-full
"

>



<div

className="
bg-white/80

rounded-2xl

p-4

text-center

shadow-sm
"

>

<Users

size={24}

className="
mx-auto

text-cyan-500

"
/>


<p

className="
text-xs

mt-2

text-slate-500

"
>

Students

</p>


</div>






<div

className="
bg-white/80

rounded-2xl

p-4

text-center

shadow-sm
"

>


<BarChart3

size={24}

className="
mx-auto

text-cyan-500

"
/>



<p

className="
text-xs

mt-2

text-slate-500

"
>

Analytics

</p>


</div>







<div

className="
bg-white/80

rounded-2xl

p-4

text-center

shadow-sm
"

>


<ShieldCheck

size={24}

className="
mx-auto

text-cyan-500

"
/>



<p

className="
text-xs

mt-2

text-slate-500

"
>

Secure

</p>


</div>



</div>





</div>








{/* Login Card */}



<div

className="
w-full

max-w-md


bg-white/70


backdrop-blur-2xl


border

border-white/80


rounded-[36px]


p-8


shadow-[0_30px_80px_rgba(14,165,233,.18)]

"

>





<div

className="
flex

justify-center

mb-6

"

>

<div

className="
h-16

w-16


rounded-2xl


bg-gradient-to-br

from-cyan-500

to-sky-600


flex

items-center

justify-center


shadow-lg

shadow-cyan-200

"

>

<ShieldCheck

size={34}

className="text-white"

/>


</div>


</div>







<h2

className="
text-3xl

font-extrabold


text-center


bg-gradient-to-r

from-cyan-500

to-sky-600


bg-clip-text

text-transparent

"

>

Admin Login

</h2>





<p

className="
text-center

text-slate-500

mt-2

mb-8

"

>

Welcome back to NextGen Admin Panel

</p>







<form

onSubmit={handleLogin}

className="
space-y-5

"

>




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

text-cyan-500

"

/>



<input

type="email"

placeholder="Email Address"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
w-full

pl-12

pr-4

py-4


rounded-2xl


bg-white


border

border-slate-200


outline-none


focus:border-cyan-400


focus:ring-4


focus:ring-cyan-100

transition

"

/>


</div>







<div

className="
relative

"

>


<Lock

size={20}

className="
absolute

left-4

top-1/2

-translate-y-1/2

text-cyan-500

"

/>



<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="
w-full

pl-12

pr-4

py-4


rounded-2xl


bg-white


border

border-slate-200


outline-none


focus:border-cyan-400


focus:ring-4


focus:ring-cyan-100

transition

"

/>



</div>







<button

type="submit"


className="
w-full


py-4


rounded-2xl


bg-gradient-to-r


from-cyan-500


to-sky-500



text-white


font-semibold



shadow-lg


shadow-cyan-200



hover:scale-[1.02]

transition-all

duration-300

"

>

Login

</button>





</form>








<div

className="
mt-8

p-4


rounded-2xl


bg-cyan-50


border

border-cyan-100


text-center


text-sm


text-cyan-700

"

>


<p

className="
font-semibold

mb-2

"
>

Demo Login

</p>


admin@nextgen.com

<br/>

123456



</div>




</div>





</div>



</div>

  );

}