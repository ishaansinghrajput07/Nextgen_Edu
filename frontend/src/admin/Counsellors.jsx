import {
  Eye,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  TrendingUp,
  UserPlus,
} from "lucide-react";


import {
  Link
} from "react-router-dom";


import {
  useEffect,
  useState
} from "react";


import axios from "axios";





export default function Counsellors() {


  const [performance,setPerformance] = useState([]);


  const token = localStorage.getItem("token");





  useEffect(()=>{

    loadData();

  },[]);







  const loadData = async()=>{


    try{


      const res = await axios.get(

        "http://localhost:8000/api/v1/counsellor/allcounsellor",

        {

          headers:{

            Authorization:`Bearer ${token}`

          }

        }

      );



      if(res.data.success){

        setPerformance(
          res.data.counsellors
        );

      }



    }

    catch(error){

      console.log(error);

    }


  };








  const deleteCounsellor = async(id)=>{


    try{


      await axios.delete(

        `http://localhost:8000/api/v1/counsellor/delete/counsellor/${id}`,

        {

          headers:{

            Authorization:`Bearer ${token}`

          }

        }

      );



      loadData();


    }

    catch(error){

      console.log(error);

    }


  };







  const totalCounsellors =
    performance.length;



  const totalLeads =
    performance.reduce(
      (sum,item)=>
      sum + Number(item.totalLeads || 0),
      0
    );



  const totalConverted =
    performance.reduce(
      (sum,item)=>
      sum + Number(item.convertedLeads || 0),
      0
    );






  return (


<div

className="
relative

min-h-screen

space-y-8

"

>





{/* Background Glow */}



<div

className="
absolute

-top-40

-left-40

w-[500px]

h-[500px]


rounded-full


bg-cyan-200/30


blur-[120px]


pointer-events-none

"

/>




<div

className="
absolute

right-0

top-40


w-[420px]

h-[420px]


rounded-full


bg-blue-200/20


blur-[120px]


pointer-events-none

"

/>







{/* Header */}



<div

className="
relative

z-10


flex

flex-col

md:flex-row


md:items-center


md:justify-between


gap-5

"

>




<div>


<h1

className="
text-3xl

md:text-4xl


font-extrabold


bg-gradient-to-r


from-cyan-500


to-sky-600


bg-clip-text


text-transparent

"

>

Counsellors Management

</h1>



<p

className="
text-slate-500

mt-2

"

>

Manage counsellors performance and assigned leads

</p>



</div>








<Link

to="/admin/add-counsellor"


className="
inline-flex

items-center

justify-center


gap-2


px-6

py-3


rounded-2xl


bg-gradient-to-r


from-cyan-500


to-sky-500


text-white


font-semibold


shadow-lg


shadow-cyan-200


hover:scale-105


transition-all


duration-300

"

>


<UserPlus size={18}/>


Add Counsellor


</Link>




</div>









{/* Stats Cards */}



<div

className="
relative

z-10


grid

grid-cols-1

sm:grid-cols-3


gap-5

"

>








{/* Total Counsellors */}



<div

className="
bg-white/70


backdrop-blur-xl


border

border-white/80


rounded-3xl


p-6


shadow-[0_20px_60px_rgba(14,165,233,.12)]


flex

items-center

gap-4


"

>



<div

className="
h-14

w-14


rounded-2xl


bg-cyan-100


flex

items-center

justify-center

"

>


<Users

className="
text-cyan-600

"

/>


</div>



<div>


<p

className="
text-sm

text-slate-500

"

>

Total Counsellors

</p>



<h2

className="
text-2xl

font-bold

text-slate-800

"

>

{totalCounsellors}

</h2>



</div>



</div>








{/* Leads */}



<div

className="
bg-white/70


backdrop-blur-xl


border

border-white/80


rounded-3xl


p-6


shadow-[0_20px_60px_rgba(14,165,233,.12)]


flex

items-center

gap-4

"

>



<div

className="
h-14

w-14


rounded-2xl


bg-sky-100


flex

items-center

justify-center

"

>


<UserCheck

className="
text-sky-600

"

/>


</div>



<div>


<p

className="
text-sm

text-slate-500

"

>

Total Leads

</p>



<h2

className="
text-2xl

font-bold

text-slate-800

"

>

{totalLeads}

</h2>



</div>


</div>
{/* Converted Leads Stats */}


<div

className="
bg-white/70


backdrop-blur-xl


border

border-white/80


rounded-3xl


p-6


shadow-[0_20px_60px_rgba(14,165,233,.12)]


flex

items-center

gap-4

"

>


<div

className="
h-14

w-14


rounded-2xl


bg-emerald-100


flex

items-center

justify-center

"

>


<TrendingUp

className="
text-emerald-600

"

/>


</div>



<div>


<p

className="
text-sm

text-slate-500

"

>

Converted Leads

</p>



<h2

className="
text-2xl

font-bold

text-slate-800

"

>

{totalConverted}

</h2>



</div>



</div>


</div>









{/* Desktop Counsellor Table */}



<div

className="
hidden

lg:block

relative

z-10

"

>


<div

className="
bg-white/70


backdrop-blur-2xl


border

border-white/80


rounded-[36px]


p-8


shadow-[0_25px_80px_rgba(14,165,233,.12)]


overflow-x-auto

"

>


<table

className="
w-full

min-w-[1000px]

"

>



<thead>


<tr

className="
bg-sky-50

text-slate-600

"

>


<th

className="
text-left

p-5

rounded-l-2xl

"

>

Counsellor

</th>



<th

className="
text-left

p-5

"

>

Contact

</th>



<th

className="
text-left

p-5

"

>

Leads

</th>



<th

className="
text-left

p-5

"

>

Converted

</th>



<th

className="
text-left

p-5

"

>

Performance

</th>



<th

className="
text-left

p-5

rounded-r-2xl

"

>

Actions

</th>



</tr>


</thead>







<tbody>



{


performance.length > 0 ?


performance.map((person,index)=>(



<tr

key={person._id || index}


className="
border-b

border-slate-100


hover:bg-cyan-50/50


transition-all

duration-300

"

>





{/* Name */}



<td

className="
p-5

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
h-12

w-12


rounded-2xl


bg-gradient-to-br


from-cyan-400


to-sky-600


flex

items-center

justify-center


text-white


font-bold


shadow-lg


shadow-cyan-200

"

>

{

person.name

?.charAt(0)

?.toUpperCase()

}


</div>



<div>


<p

className="
font-bold

text-slate-800

"

>

{person.name}

</p>



<p

className="
text-xs

text-slate-500

"

>

Counsellor

</p>



</div>



</div>


</td>










{/* Contact */}



<td

className="
p-5

"

>


<a

href={`mailto:${person.email}`}


className="
text-cyan-600


font-medium


hover:text-cyan-700

"

>

{person.email}

</a>



<p

className="
text-sm

text-slate-500

mt-1

"

>

{person.phoneNumber}

</p>



</td>









{/* Leads */}



<td

className="
p-5

"

>


<span

className="
px-4

py-2


rounded-full


bg-sky-100


text-sky-700


font-semibold


text-sm

"

>

{person.totalLeads || 0}

</span>



</td>









{/* Converted */}



<td

className="
p-5

"

>


<span

className="
px-4

py-2


rounded-full


bg-emerald-100


text-emerald-700


font-semibold


text-sm

"

>

{person.convertedLeads || 0}

</span>



</td>









{/* Performance */}



<td

className="
p-5

"

>



<div

className="
w-40

"

>


<div

className="
flex

justify-between

text-xs

mb-2

"

>

<span

className="
text-slate-500

"

>

Rate

</span>


<span

className="
font-semibold

text-cyan-600

"

>

{person.conversionRate || 0}%

</span>


</div>





<div

className="
h-2

bg-slate-100


rounded-full


overflow-hidden

"

>


<div

className="
h-full


bg-gradient-to-r


from-cyan-500


to-sky-500


rounded-full

"

style={{

width:`${person.conversionRate || 0}%`

}}


/>


</div>



</div>



</td>









{/* Actions */}



<td

className="
p-5

"

>


<div

className="
flex

gap-2

"

>


<Link

to={`/admin/counsellor/${person._id}`}


className="
h-10

w-10


rounded-xl


bg-cyan-100


text-cyan-700


flex

items-center

justify-center


hover:scale-110


transition

"

>

<Eye size={18}/>

</Link>






<Link

to={`/admin/edit-counsellor/${person._id}`}


className="
h-10

w-10


rounded-xl


bg-yellow-100


text-yellow-700


flex

items-center

justify-center


hover:scale-110


transition

"

>

<Pencil size={18}/>

</Link>






<button

onClick={()=>{


const confirmDelete =
window.confirm(
`Delete ${person.name}?`
);


if(confirmDelete){

deleteCounsellor(person._id);

}


}}


className="
h-10

w-10


rounded-xl


bg-red-100


text-red-700


flex

items-center

justify-center


hover:scale-110


transition

"

>


<Trash2 size={18}/>


</button>





</div>



</td>





</tr>


))


:

null



}



</tbody>





</table>






</div>



</div>
{/* Mobile + Tablet Cards */}



<div

className="
lg:hidden

relative

z-10


space-y-5

"

>


{


performance.length > 0 ?


performance.map((person,index)=>(


<div

key={person._id || index}


className="
bg-white/70


backdrop-blur-2xl


border

border-white/80


rounded-[32px]


p-6


shadow-[0_20px_60px_rgba(14,165,233,.12)]


"

>





{/* Profile */}



<div

className="
flex

items-center

gap-4

mb-6

"

>



<div

className="
h-16

w-16


rounded-3xl


bg-gradient-to-br


from-cyan-400


to-sky-600


flex

items-center

justify-center


text-white


text-xl


font-bold


shadow-lg


shadow-cyan-200

"

>


{

person.name

?.charAt(0)

?.toUpperCase()

}



</div>






<div>


<h3

className="
text-xl

font-bold

text-slate-800

"

>

{person.name}

</h3>



<p

className="
text-sm

text-slate-500

"

>

Counsellor

</p>



</div>



</div>








{/* Details */}



<div

className="
space-y-4

"

>



<div>


<p

className="
text-xs

text-slate-500

"

>

Email

</p>



<p

className="
font-medium

text-cyan-600

break-all

"

>

{person.email}

</p>



</div>






<div>


<p

className="
text-xs

text-slate-500

"

>

Phone

</p>



<p

className="
font-medium

text-slate-700

"

>

{person.phoneNumber}

</p>



</div>






<div

className="
grid

grid-cols-3


gap-3

"

>



<div

className="
bg-sky-50


rounded-2xl


p-3


text-center

"

>

<p

className="
text-xs

text-slate-500

"

>

Leads

</p>


<p

className="
font-bold

text-slate-800

"

>

{person.totalLeads || 0}

</p>



</div>







<div

className="
bg-emerald-50


rounded-2xl


p-3


text-center

"

>

<p

className="
text-xs

text-slate-500

"

>

Done

</p>


<p

className="
font-bold

text-slate-800

"

>

{person.convertedLeads || 0}

</p>



</div>








<div

className="
bg-cyan-50


rounded-2xl


p-3


text-center

"

>

<p

className="
text-xs

text-slate-500

"

>

Rate

</p>


<p

className="
font-bold

text-cyan-700

"

>

{person.conversionRate || 0}%

</p>



</div>




</div>




</div>









{/* Actions */}



<div

className="
flex

gap-3

mt-6

"

>



<Link

to={`/admin/counsellor/${person._id}`}


className="
flex-1


h-12


rounded-2xl


bg-cyan-100


text-cyan-700


flex

items-center

justify-center


hover:bg-cyan-200


transition

"

>


<Eye size={18}/>


</Link>






<Link

to={`/admin/edit-counsellor/${person._id}`}


className="
flex-1


h-12


rounded-2xl


bg-yellow-100


text-yellow-700


flex

items-center

justify-center


hover:bg-yellow-200


transition

"

>


<Pencil size={18}/>


</Link>






<button


onClick={()=>{


const confirmDelete =
window.confirm(
`Delete ${person.name}?`
);


if(confirmDelete){

deleteCounsellor(person._id);

}



}}


className="
flex-1


h-12


rounded-2xl


bg-red-100


text-red-700


flex

items-center

justify-center


hover:bg-red-200


transition

"

>


<Trash2 size={18}/>


</button>





</div>





</div>


))





:


(


<div

className="
bg-white/70


backdrop-blur-xl


rounded-3xl


p-10


text-center


border

border-white/80

"

>


<div

className="
h-16

w-16


mx-auto


rounded-2xl


bg-cyan-100


flex

items-center

justify-center


mb-4

"

>


<Users

className="
text-cyan-600

"

/>



</div>





<h3

className="
text-xl

font-bold

text-slate-700

"

>

No Counsellors Found

</h3>



<p

className="
text-slate-500

mt-2

"

>

Add counsellors to manage admissions.

</p>



</div>



)



}





</div>






</div>


  );

}