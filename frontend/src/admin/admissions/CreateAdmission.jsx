import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Save,
  GraduationCap,
  IndianRupee,
} from "lucide-react";


import {
  getAllStudents,
} from "../../../api/studentApi";

import {
  getAllContacts,
} from "../../../api/contactApi";


import {
  getAllCounsellors,
} from "../../../api/counsellorApi";


import {
  getAllUniversities,
} from "../../../api/universityApi";


import {
  getCoursesByUniversity,
} from "../../../api/courseApi";


import {
  createAdmission,
} from "../../../api/admissionApi";





const CreateAdmission = () => {


  const navigate = useNavigate();



  const [loading,setLoading] = useState(false);



  const [students,setStudents] = useState([]);

  const [leads,setLeads] = useState([]);

  const [counsellors,setCounsellors] = useState([]);

  const [universities,setUniversities] = useState([]);

  const [courses,setCourses] = useState([]);




  const [form,setForm] = useState({

    lead:"",

    studentId:"",

    counsellor:"",

    university:"",

    course:"",

    intake:"",

    country:"India",

    tuitionFee:0,

    scholarshipAmount:0,

    universityCommissionPercent:0,

    counsellorCommissionPercent:0,

    admissionDate:"",

    expectedJoiningDate:"",

    remarks:"",

    notes:"",

  });







  // ==============================
  // LOAD DATA
  // ==============================


  useEffect(()=>{


    loadData();


  },[]);




  const loadData = async()=>{


    try{


      const [
        studentRes,
        leadRes,
        counsellorRes,
        universityRes
      ] = await Promise.all([


        getAllStudents(),

        getAllContacts(),

        getAllCounsellors(),

        getAllUniversities(),


      ]);



      setStudents(
        studentRes.data.students || []
      );


      setLeads(
        leadRes.data.contacts || []
      );


      setCounsellors(
        counsellorRes.data.counsellors || []
      );


      setUniversities(
        universityRes.data.universities || []
      );



    }

    catch(error){

      toast.error(
        "Failed to load data"
      );

    }



  };






  // ==============================
  // HANDLE INPUT
  // ==============================


  const handleChange=(e)=>{


    const {
      name,
      value
    } = e.target;



    setForm(prev=>({

      ...prev,

      [name]:value,

    }));


  };






  // ==============================
  // UNIVERSITY COURSE LOAD
  // ==============================


  const handleUniversityChange = async(e)=>{


    const universityId =
      e.target.value;



    setForm(prev=>({

      ...prev,

      university:universityId,

      course:"",

    }));


    if(universityId){


      try{


        const res =
          await getCoursesByUniversity(
            universityId
          );



        setCourses(
          res.data.courses || []
        );


      }

      catch(error){

        toast.error(
          "Course loading failed"
        );

      }


    }


  };






  // ==============================
  // SUBMIT
  // ==============================


  const submitHandler = async(e)=>{


    e.preventDefault();



    try{


      setLoading(true);



      await createAdmission(form);



      toast.success(
        "Admission created successfully"
      );



      navigate(
        "/admin/admissions"
      );



    }

    catch(error){


      toast.error(
        error.response?.data?.message ||
        "Admission creation failed"
      );


    }

    finally{


      setLoading(false);


    }



  };





return (

<div className="min-h-screen bg-gray-50 p-6">



{/* HEADER */}


<div className="
flex
items-center
justify-between
mb-6
">


<button

onClick={()=>navigate(-1)}

className="
flex
items-center
gap-2
text-gray-600
hover:text-blue-600
"

>

<ArrowLeft size={20}/>

Back

</button>




<h1 className="
text-2xl
font-bold
flex
items-center
gap-2
">


<GraduationCap
className="text-blue-600"
/>

Create Admission


</h1>


</div>





<form
onSubmit={submitHandler}
className="
bg-white
rounded-2xl
shadow
p-6
space-y-6
"
>


{/* BASIC SELECT */}


<div className="
grid
grid-cols-1
md:grid-cols-3
gap-5
">


<select
name="lead"
value={form.lead}
onChange={handleChange}
className="input"
>


<option value="">
Select Lead
</option>


{
leads.map(item=>(

<option
key={item._id}
value={item._id}
>

{item.name || item.leadName}

</option>


))
}


</select>





<select
name="studentId"
value={form.studentId}
onChange={handleChange}
className="input"
>


<option>
Select Student
</option>


{
students.map(item=>(

<option
key={item._id}
value={item._id}
>

{item.studentName}

</option>

))
}


</select>





<select
name="counsellor"
value={form.counsellor}
onChange={handleChange}
className="input"
>


<option>
Select Counsellor
</option>


{
counsellors.map(item=>(

<option
key={item._id}
value={item._id}
>

{item.name}

</option>

))
}


</select>



</div>
{/* UNIVERSITY & COURSE */}


<div className="
grid
grid-cols-1
md:grid-cols-2
gap-5
">


<select
name="university"
value={form.university}
onChange={handleUniversityChange}
className="input"
>


<option value="">
Select University
</option>


{
universities.map((item)=>(

<option
key={item._id}
value={item._id}
>

{item.universityName}

</option>

))
}


</select>





<select
name="course"
value={form.course}
onChange={handleChange}
className="input"
>


<option value="">
Select Course
</option>


{
courses.map((item)=>(

<option
key={item._id}
value={item._id}
>

{item.courseName}

</option>

))
}


</select>


</div>






{/* ADMISSION DETAILS */}



<div className="
grid
grid-cols-1
md:grid-cols-3
gap-5
">


<input

type="text"

name="intake"

value={form.intake}

onChange={handleChange}

placeholder="Intake (2026 January)"

className="input"

/>




<input

type="text"

name="country"

value={form.country}

onChange={handleChange}

placeholder="Country"

className="input"

/>




<input

type="date"

name="admissionDate"

value={form.admissionDate}

onChange={handleChange}

className="input"

/>


</div>






{/* FEE SECTION */}



<div className="
border
rounded-2xl
p-5
bg-gray-50
">


<h2 className="
font-semibold
text-lg
mb-4
flex
items-center
gap-2
">


<IndianRupee size={20}/>

Fee Details


</h2>




<div className="
grid
grid-cols-1
md:grid-cols-3
gap-5
">



<input

type="number"

name="tuitionFee"

value={form.tuitionFee}

onChange={handleChange}

placeholder="Tuition Fee"

className="input"

/>





<input

type="number"

name="scholarshipAmount"

value={form.scholarshipAmount}

onChange={handleChange}

placeholder="Scholarship Amount"

className="input"

/>





<input

type="number"

value={
Math.max(
form.tuitionFee -
form.scholarshipAmount,
0
)
}

readOnly

placeholder="Net Fee"

className="input bg-gray-100"

/>



</div>


</div>






{/* COMMISSION SECTION */}



<div className="
border
rounded-2xl
p-5
bg-blue-50
">


<h2 className="
font-semibold
text-lg
mb-4
text-blue-700
">


Commission Details


</h2>



<div className="
grid
grid-cols-1
md:grid-cols-2
gap-5
">



<input

type="number"

name="universityCommissionPercent"

value={
form.universityCommissionPercent
}

onChange={handleChange}

placeholder="University Commission %"

className="input"

/>





<input

type="number"

name="counsellorCommissionPercent"

value={
form.counsellorCommissionPercent
}

onChange={handleChange}

placeholder="Counsellor Commission %"

className="input"

/>



</div>



</div>







{/* JOINING DATE */}



<div className="
grid
grid-cols-1
md:grid-cols-2
gap-5
">



<input

type="date"

name="expectedJoiningDate"

value={
form.expectedJoiningDate
}

onChange={handleChange}

className="input"

/>





<input

type="date"

name="paymentDueDate"

onChange={handleChange}

className="input"

/>



</div>






{/* NOTES */}



<textarea

name="notes"

value={form.notes}

onChange={handleChange}

placeholder="Notes"

rows="3"

className="input resize-none"

/>






<textarea

name="remarks"

value={form.remarks}

onChange={handleChange}

placeholder="Remarks"

rows="3"

className="input resize-none"

/>







{/* SUBMIT */}



<div className="
flex
justify-end
pt-4
">


<button

disabled={loading}

type="submit"

className="
flex
items-center
gap-2
px-6
py-3
rounded-xl
bg-blue-600
text-white
font-semibold
hover:bg-blue-700
transition
disabled:opacity-50
"

>


<Save size={20}/>


{
loading
?
"Creating..."
:
"Create Admission"
}


</button>



</div>




</form>


</div>


);


};


export default CreateAdmission;