import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Save,
  Loader2,
  GraduationCap,
  IndianRupee,
  UserCheck,
} from "lucide-react";


const EditAdmission = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  const [formData, setFormData] = useState({
    intake: "",
    country: "",

    tuitionFee: 0,
    scholarshipAmount: 0,

    universityCommissionPercent: 0,
    counsellorCommissionPercent: 0,

    admissionStatus: "Applied",
    documentStatus: "Pending",
    enrollmentStatus: "Pending",

    paymentDueDate: "",

    notes: "",
    remarks: "",
  });



  // ======================================
  // FETCH ADMISSION
  // ======================================

  const fetchAdmission = async () => {
    try {

      setLoading(true);


      const { data } = await axios.get(
        `/api/admissions/${id}`,
        {
          withCredentials:true,
        }
      );


      const admission = data.admission;


      setFormData({

        intake: admission.intake || "",

        country: admission.country || "",


        tuitionFee:
          admission.tuitionFee || 0,


        scholarshipAmount:
          admission.scholarshipAmount || 0,


        universityCommissionPercent:
          admission.universityCommissionPercent || 0,


        counsellorCommissionPercent:
          admission.counsellorCommissionPercent || 0,


        admissionStatus:
          admission.admissionStatus || "Applied",


        documentStatus:
          admission.documentStatus || "Pending",


        enrollmentStatus:
          admission.enrollmentStatus || "Pending",


        paymentDueDate:
          admission.paymentDueDate
          ?
          admission.paymentDueDate.split("T")[0]
          :
          "",


        notes:
          admission.notes || "",


        remarks:
          admission.remarks || "",

      });


    } catch(error){

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load admission"
      );

    }
    finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchAdmission();

  },[id]);




  // ======================================
  // INPUT CHANGE
  // ======================================


  const handleChange = (e)=>{

    const {name,value}=e.target;


    setFormData(prev=>({

      ...prev,

      [name]:value,

    }));

  };





  // ======================================
  // UPDATE ADMISSION
  // ======================================


  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{

      setSaving(true);


      await axios.put(

        `/api/admissions/${id}`,

        formData,

        {
          withCredentials:true,
        }

      );


      toast.success(
        "Admission updated successfully"
      );


      navigate(
        `/admin/admissions/${id}`
      );


    }catch(error){

      console.log(error);


      toast.error(

        error.response?.data?.message ||
        "Update failed"

      );


    }finally{

      setSaving(false);

    }

  };



  if(loading){

    return (

      <div className="flex justify-center items-center h-96">

        <Loader2
          className="animate-spin text-blue-600"
          size={40}
        />

      </div>

    );

  }




  return (

<div className="p-6 space-y-6">


{/* HEADER */}

<div className="
flex justify-between items-center
bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500
rounded-2xl
p-6
text-white
">


<div>

<h1 className="text-2xl font-bold">
Edit Admission
</h1>


<p className="text-sm opacity-90">
Update admission information
</p>


</div>



<button

onClick={()=>navigate(-1)}

className="
flex items-center gap-2
bg-white/20
px-4 py-2
rounded-xl
hover:bg-white/30
"

>

<ArrowLeft size={18}/>
Back

</button>



</div>



<form

onSubmit={handleSubmit}

className="
bg-white
rounded-2xl
shadow
p-6
space-y-6
"



>


{/* Fee Section */}

<div>


<h2 className="
flex gap-2
items-center
font-semibold
text-lg
">

<IndianRupee size={20}/>
Fee Information

</h2>



<div className="
grid
md:grid-cols-3
gap-5
mt-4
">


<InputField

label="Tuition Fee"

name="tuitionFee"

value={formData.tuitionFee}

onChange={handleChange}

/>


<InputField

label="Scholarship"

name="scholarshipAmount"

value={formData.scholarshipAmount}

onChange={handleChange}

/>



<InputField

label="Intake"

name="intake"

value={formData.intake}

onChange={handleChange}

/>



</div>

</div>
// ======================================
// COMMISSION SECTION
// ======================================


<div>

<h2 className="
flex items-center
gap-2
font-semibold
text-lg
">

<UserCheck size={20}/>

Commission Details

</h2>



<div className="
grid
md:grid-cols-2
gap-5
mt-4
">


<InputField

label="University Commission %"

name="universityCommissionPercent"

value={
formData.universityCommissionPercent
}

onChange={handleChange}

/>



<InputField

label="Counsellor Commission %"

name="counsellorCommissionPercent"

value={
formData.counsellorCommissionPercent
}

onChange={handleChange}

/>


</div>

</div>





{/* STATUS SECTION */}


<div>


<h2 className="
font-semibold
text-lg
mb-4
">

Admission Status

</h2>



<div className="
grid
md:grid-cols-3
gap-5
">


<SelectField

label="Admission Status"

name="admissionStatus"

value={
formData.admissionStatus
}

onChange={handleChange}

options={[
"Applied",
"Documents Pending",
"Documents Verified",
"Offer Letter",
"Fee Paid",
"Enrolled",
"Rejected",
"Cancelled"
]}

/>




<SelectField

label="Document Status"

name="documentStatus"

value={
formData.documentStatus
}

onChange={handleChange}

options={[
"Pending",
"Uploaded",
"Verified",
"Rejected"
]}

/>





<SelectField

label="Enrollment Status"

name="enrollmentStatus"

value={
formData.enrollmentStatus
}

onChange={handleChange}

options={[
"Pending",
"Enrolled"
]}

/>


</div>


</div>





{/* PAYMENT DATE */}


<div className="
grid
md:grid-cols-2
gap-5
">


<InputField

label="Payment Due Date"

type="date"

name="paymentDueDate"

value={
formData.paymentDueDate
}

onChange={handleChange}

/>


</div>





{/* NOTES */}



<div className="
grid
md:grid-cols-2
gap-5
">


<div>


<label className="
text-sm
font-medium
">

Notes

</label>


<textarea

name="notes"

value={
formData.notes
}

onChange={handleChange}


rows="4"


className="
mt-2
w-full
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-blue-400
"


/>


</div>





<div>


<label className="
text-sm
font-medium
">

Remarks

</label>


<textarea

name="remarks"

value={
formData.remarks
}

onChange={handleChange}


rows="4"


className="
mt-2
w-full
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-blue-400
"


/>


</div>



</div>







{/* SAVE BUTTON */}



<div className="
flex
justify-end
pt-4
">


<button

type="submit"

disabled={saving}


className="
flex
items-center
gap-2
bg-gradient-to-r
from-blue-600
to-cyan-500
text-white
px-6
py-3
rounded-xl
font-semibold
hover:shadow-lg
disabled:opacity-50
"


>


{
saving
?
<>

<Loader2
size={18}
className="animate-spin"
/>

Updating...

</>

:

<>

<Save size={18}/>

Update Admission

</>

}



</button>


</div>




</form>


</div>


  );

};




// ======================================
// INPUT COMPONENT
// ======================================


const InputField = ({
label,
name,
value,
onChange,
type="number"
})=>{


return (

<div>


<label className="
text-sm
font-medium
">

{label}

</label>


<input

type={type}

name={name}

value={value}

onChange={onChange}


className="
mt-2
w-full
border
rounded-xl
px-3
py-2
outline-none
focus:ring-2
focus:ring-blue-400
"


/>


</div>

);


};






// ======================================
// SELECT COMPONENT
// ======================================


const SelectField = ({
label,
name,
value,
onChange,
options=[]
})=>{


return (

<div>


<label className="
text-sm
font-medium
">

{label}

</label>



<select

name={name}

value={value}

onChange={onChange}


className="
mt-2
w-full
border
rounded-xl
px-3
py-2
bg-white
outline-none
focus:ring-2
focus:ring-blue-400
"


>


{
options.map((item)=>(

<option
key={item}
value={item}
>

{item}

</option>

))

}



</select>


</div>

);


};



export default EditAdmission;