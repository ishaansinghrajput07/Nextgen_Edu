// src/pages/admin/admissions/components/AdmissionActivity.jsx

import React from "react";
import {
  Activity,
  User,
  Clock,
  CheckCircle,
  FileText,
  IndianRupee,
  GraduationCap,
} from "lucide-react";


const AdmissionActivity = ({ admission }) => {

  if (!admission) return null;


  const {
    timeline = [],
  } = admission;



  const getIcon = (title = "") => {

    const text = title.toLowerCase();


    if(text.includes("payment")){

      return (
        <IndianRupee size={18}/>
      );

    }


    if(text.includes("document")){

      return (
        <FileText size={18}/>
      );

    }


    if(text.includes("admission")){

      return (
        <GraduationCap size={18}/>
      );

    }


    if(text.includes("verified")){

      return (
        <CheckCircle size={18}/>
      );

    }


    return (
      <Activity size={18}/>
    );

  };




  return (

    <div className="space-y-6">



      {/* ============================
          HEADER
      ============================ */}



      <div className="
      bg-white
      border
      rounded-2xl
      shadow-sm
      p-6
      ">


        <div className="
        flex
        items-center
        gap-3
        ">


          <div className="
          p-3
          rounded-xl
          bg-blue-100
          text-blue-600
          ">

            <Activity size={24}/>

          </div>



          <div>

            <h2 className="
            text-xl
            font-semibold
            ">

              Admission Activity

            </h2>


            <p className="
            text-sm
            text-gray-500
            ">

              Complete admission history

            </p>


          </div>



        </div>


      </div>








      {/* ============================
          TIMELINE
      ============================ */}



      <div className="
      bg-white
      border
      rounded-2xl
      shadow-sm
      p-6
      ">



        {
          timeline.length === 0

          ?

          (

            <div className="
            text-center
            py-10
            text-gray-500
            ">

              No activity found

            </div>

          )


          :

          (

            <div className="relative">


              {/* Vertical Line */}

              <div className="
              absolute
              left-5
              top-0
              bottom-0
              w-px
              bg-gray-200
              " />




              <div className="
              space-y-8
              ">



                {
                  [...timeline]
                  .reverse()
                  .map(
                    (item,index)=>(


                    <div
                      key={index}
                      className="
                      relative
                      flex
                      gap-5
                      "
                    >



                      {/* ICON */}


                      <div className="
                      relative
                      z-10
                      flex
                      items-center
                      justify-center
                      w-10
                      h-10
                      rounded-full
                      bg-blue-100
                      text-blue-600
                      ">

                        {
                          getIcon(
                            item.title
                          )
                        }

                      </div>







                      {/* CONTENT */}



                      <div className="
                      flex-1
                      border
                      rounded-xl
                      p-4
                      ">


                        <div className="
                        flex
                        justify-between
                        items-start
                        gap-3
                        ">



                          <h3 className="
                          font-semibold
                          ">

                            {item.title}

                          </h3>




                          {
                            item.date &&

                            <span className="
                            flex
                            items-center
                            gap-1
                            text-xs
                            text-gray-500
                            ">

                              <Clock size={14}/>


                              {
                                new Date(
                                  item.date
                                )
                                .toLocaleString()
                              }


                            </span>

                          }



                        </div>






                        <p className="
                        text-sm
                        text-gray-600
                        mt-2
                        ">

                          {
                            item.description
                          }

                        </p>







                        {
                          item.createdBy &&

                          <div className="
                          flex
                          items-center
                          gap-2
                          mt-3
                          text-xs
                          text-gray-500
                          ">


                            <User size={14}/>


                            Action performed by user


                          </div>


                        }




                      </div>




                    </div>


                  ))

                }




              </div>



            </div>


          )

        }



      </div>






    </div>

  );

};



export default AdmissionActivity;