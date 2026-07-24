import {
  useEffect,
  useState
} from "react";

import {
  ArrowLeft,
  User,
  Building2,
  BookOpen,
  IndianRupee,
  Loader2,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";


import admissionApi from "../../../src/api/admissionApi";

import AdmissionTimeline from "./AdmissionTimeline";



const AdmissionDetails = () => {


  const { id } = useParams();

  const navigate = useNavigate();


  const [admission,setAdmission] = useState(null);

  const [loading,setLoading] = useState(true);




  const fetchAdmission = async()=>{

    try{

      setLoading(true);


      const {data} = await admissionApi.get(
        `/admissions/${id}`
      );


      setAdmission(
        data.admission
      );


    }catch(error){

      console.log(error);


      toast.error(
        error.response?.data?.message ||
        "Failed to load admission"
      );


    }finally{

      setLoading(false);

    }

  };




  useEffect(()=>{

    fetchAdmission();

  },[id]);






  if(loading){

    return (

      <div className="
        min-h-screen
        flex
        justify-center
        items-center
        bg-slate-950
      ">

        <Loader2
          size={40}
          className="
          animate-spin
          text-cyan-400
          "
        />

      </div>

    );

  }




  if(!admission){

    return null;

  }






return (

<div className="
min-h-screen
bg-gradient-to-br
from-slate-950
via-blue-950
to-cyan-950
p-4
md:p-6
rounded-3xl
">





{/* HEADER */}


<div className="
flex
items-center
gap-4
mb-6
">


<button

onClick={()=>navigate(-1)}

className="
p-3
rounded-xl
bg-white/10
text-white
hover:bg-white/20
"

>

<ArrowLeft size={20}/>

</button>




<div>

<h1 className="
text-3xl
font-bold
text-white
">

Admission Details

</h1>


<p className="
text-gray-300
">

{admission.admissionNumber}

</p>


</div>


</div>







{/* TOP CARDS */}



<div className="
grid
grid-cols-1
lg:grid-cols-3
gap-5
">





<InfoCard

icon={User}

title="Student"

items={[

[
"Name",
admission.studentName
],

[
"Email",
admission.studentEmail
],

[
"Phone",
admission.studentPhone
],

]}

/>






<InfoCard

icon={Building2}

title="University"

items={[

[
"University",
admission.universityName
],

[
"Country",
admission.country
],

[
"Intake",
admission.intake
],

]}

/>






<InfoCard

icon={BookOpen}

title="Course"

items={[

[
"Course",
admission.courseName
],

[
"Status",
admission.admissionStatus
],

[
"Created",
new Date(
admission.createdAt
).toLocaleDateString()
],

]}

/>



</div>









{/* FINANCE */}



<div className="
mt-6
grid
grid-cols-1
md:grid-cols-2
gap-5
">





<InfoCard

icon={IndianRupee}

title="Fee Details"

items={[

[
"Tuition Fee",
`₹${admission.tuitionFee}`
],

[
"Scholarship",
`₹${admission.scholarshipAmount}`
],

[
"Net Fee",
`₹${admission.netFee}`
],

]}

/>







<InfoCard

icon={IndianRupee}

title="Commission"

items={[

[
"University Commission",
`₹${admission.universityCommissionAmount}`
],

[
"Counsellor Commission",
`₹${admission.counsellorCommissionAmount}`
],

[
"Payment Status",
admission.counsellorPaymentStatus
],

]}

/>




</div>







{/* TIMELINE COMPONENT */}



<div className="mt-6">


<AdmissionTimeline

timeline={
admission.timeline
}

/>


</div>





</div>

);


};







const InfoCard = ({

icon:Icon,

title,

items,

})=>{


return (

<div className="
bg-white/10
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-5
">


<div className="
flex
items-center
gap-3
mb-4
">


<div className="
p-3
rounded-xl
bg-cyan-500/20
">


<Icon

size={22}

className="
text-cyan-400
"

/>


</div>




<h2 className="
text-white
font-semibold
text-lg
">

{title}

</h2>



</div>







<div className="space-y-3">


{

items.map(

(item,index)=>(


<div

key={index}

className="
flex
justify-between
gap-3
text-sm
"

>


<span className="
text-gray-400
">

{item[0]}

</span>



<span className="
text-white
text-right
">

{item[1] || "-"}

</span>


</div>


)

)

}



</div>


</div>


);


};





export default AdmissionDetails;