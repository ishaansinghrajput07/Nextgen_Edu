import {
  Eye,
  Loader2,
  GraduationCap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


const AdmissionTable = ({
  admissions,
  loading,
}) => {


  const navigate = useNavigate();



  const getStatusStyle = (status)=>{

    switch(status){

      case "Applied":
        return "bg-blue-500/20 text-blue-300";


      case "Documents Pending":
        return "bg-yellow-500/20 text-yellow-300";


      case "Documents Verified":
        return "bg-purple-500/20 text-purple-300";


      case "Offer Letter":
        return "bg-indigo-500/20 text-indigo-300";


      case "Fee Paid":
        return "bg-green-500/20 text-green-300";


      case "Enrolled":
        return "bg-emerald-500/20 text-emerald-300";


      case "Rejected":
        return "bg-red-500/20 text-red-300";


      default:
        return "bg-gray-500/20 text-gray-300";

    }

  };




  if(loading){

    return (

      <div className="
        flex
        justify-center
        items-center
        h-64
        bg-white/10
        rounded-3xl
        backdrop-blur-xl
      ">

        <Loader2
          className="
            animate-spin
            text-cyan-400
          "
          size={35}
        />

      </div>

    );

  }




  return (

    <div className="
      bg-white/10
      backdrop-blur-xl
      border
      border-white/10
      rounded-3xl
      overflow-hidden
    ">



      {/* Desktop Table */}


      <div className="
        hidden
        md:block
        overflow-x-auto
      ">


        <table className="
          w-full
          text-left
        ">


          <thead>

            <tr className="
              border-b
              border-white/10
              text-gray-300
              text-sm
            ">


              <th className="px-6 py-4">
                Student
              </th>


              <th className="px-6 py-4">
                University
              </th>


              <th className="px-6 py-4">
                Course
              </th>


              <th className="px-6 py-4">
                Status
              </th>


              <th className="px-6 py-4">
                Fee
              </th>


              <th className="px-6 py-4">
                Commission
              </th>


              <th className="px-6 py-4">
                Action
              </th>


            </tr>

          </thead>





          <tbody>


          {
            admissions?.length > 0 ?


            admissions.map((admission)=>(


              <tr

                key={admission._id}

                className="
                  border-b
                  border-white/10
                  hover:bg-white/5
                  transition
                "

              >



                {/* Student */}

                <td className="
                  px-6
                  py-4
                ">


                  <div className="
                    flex
                    items-center
                    gap-3
                  ">


                    <div className="
                      p-3
                      rounded-xl
                      bg-cyan-500/20
                    ">

                      <GraduationCap
                        className="text-cyan-400"
                        size={20}
                      />

                    </div>



                    <div>

                      <p className="
                        text-white
                        font-semibold
                      ">

                        {
                          admission.studentName
                        }

                      </p>


                      <p className="
                        text-gray-400
                        text-sm
                      ">

                        {
                          admission.studentPhone
                        }

                      </p>


                    </div>


                  </div>


                </td>







                {/* University */}


                <td className="
                  px-6
                  py-4
                  text-gray-200
                ">

                  {
                    admission.universityName
                  }


                </td>






                {/* Course */}


                <td className="
                  px-6
                  py-4
                  text-gray-200
                ">


                  {
                    admission.courseName
                  }


                </td>







                {/* Status */}


                <td className="
                  px-6
                  py-4
                ">


                  <span

                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      ${getStatusStyle(
                        admission.admissionStatus
                      )}
                    `}

                  >

                    {
                      admission.admissionStatus
                    }


                  </span>


                </td>







                {/* Fee */}


                <td className="
                  px-6
                  py-4
                  text-white
                ">


                  ₹{
                    admission.netFee?.toLocaleString()
                    || 0
                  }


                </td>







                {/* Commission */}


                <td className="
                  px-6
                  py-4
                  text-cyan-300
                  font-semibold
                ">


                  ₹{
                    admission.counsellorCommissionAmount
                    ?.toLocaleString()
                    || 0
                  }


                </td>







                {/* Action */}


                <td className="
                  px-6
                  py-4
                ">


                  <button

                    onClick={()=> 
                      navigate(
                        `/admin/admissions/${admission._id}`
                      )
                    }


                    className="
                      p-3
                      rounded-xl
                      bg-cyan-500/20
                      hover:bg-cyan-500/40
                      text-cyan-300
                      transition
                    "

                  >

                    <Eye size={18}/>


                  </button>


                </td>



              </tr>


            ))



            :

            (

              <tr>

                <td

                  colSpan="7"

                  className="
                    text-center
                    py-10
                    text-gray-400
                  "

                >

                  No admissions found


                </td>

              </tr>

            )


          }


          </tbody>


        </table>


      </div>






      {/* Mobile Cards */}


      <div className="
        md:hidden
        p-4
        space-y-4
      ">


        {
          admissions?.map((admission)=>(

            <div

              key={admission._id}

              className="
                bg-white/10
                rounded-2xl
                p-4
                border
                border-white/10
              "

            >


              <h3 className="
                text-white
                font-semibold
              ">

                {
                  admission.studentName
                }

              </h3>


              <p className="
                text-gray-400
                text-sm
              ">

                {
                  admission.universityName
                }

              </p>


              <button

                onClick={()=>
                  navigate(
                    `/admin/admissions/${admission._id}`
                  )
                }

                className="
                  mt-3
                  w-full
                  py-2
                  rounded-xl
                  bg-cyan-500/20
                  text-cyan-300
                "

              >

                View Details

              </button>



            </div>


          ))
        }


      </div>



    </div>

  );

};


export default AdmissionTable;