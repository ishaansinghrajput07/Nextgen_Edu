// src/pages/admin/admissions/components/AdmissionDocuments.jsx

import React from "react";
import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  UploadCloud,
} from "lucide-react";


const AdmissionDocuments = ({ admission }) => {

  if (!admission) return null;


  const {
    documentStatus = "Pending",
    documents = [],
  } = admission;



  const statusConfig = {

    Pending: {
      icon: Clock,
      style: "bg-yellow-100 text-yellow-700",
    },

    Uploaded: {
      icon: UploadCloud,
      style: "bg-blue-100 text-blue-700",
    },

    Verified: {
      icon: CheckCircle,
      style: "bg-green-100 text-green-700",
    },

    Rejected: {
      icon: XCircle,
      style: "bg-red-100 text-red-700",
    },

  };



  const currentStatus =
    statusConfig[documentStatus] ||
    statusConfig.Pending;



  const StatusIcon = currentStatus.icon;



  return (

    <div className="space-y-6">



      {/* ===========================
          DOCUMENT STATUS CARD
      =========================== */}


      <div className="bg-white border rounded-2xl shadow-sm p-6">


        <div className="flex items-center justify-between">


          <div className="flex items-center gap-3">


            <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">

              <FileText size={24}/>

            </div>



            <div>

              <h3 className="text-lg font-semibold">
                Document Status
              </h3>

              <p className="text-sm text-gray-500">
                Admission documents verification
              </p>

            </div>


          </div>




          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${currentStatus.style}`}
          >

            <StatusIcon size={18}/>

            {documentStatus}

          </div>


        </div>


      </div>






      {/* ===========================
          DOCUMENT LIST
      =========================== */}



      <div className="bg-white border rounded-2xl shadow-sm p-6">


        <div className="flex justify-between items-center mb-5">


          <h3 className="text-lg font-semibold">
            Required Documents
          </h3>



          <button
            className="
            flex items-center gap-2
            px-4 py-2
            rounded-xl
            bg-blue-600
            text-white
            hover:bg-blue-700
            transition
            "
          >

            <UploadCloud size={18}/>

            Upload

          </button>


        </div>




        {
          documents.length === 0 ?


          (

            <div className="text-center py-10 text-gray-500">

              No documents uploaded yet.

            </div>

          )


          :

          (

            <div className="space-y-4">


              {
                documents.map((doc,index)=>(


                  <div
                    key={index}
                    className="
                    flex
                    items-center
                    justify-between
                    border
                    rounded-xl
                    p-4
                    hover:shadow-sm
                    transition
                    "
                  >



                    <div className="flex items-center gap-4">


                      <div className="p-3 rounded-xl bg-gray-100">

                        <FileText size={22}/>

                      </div>




                      <div>

                        <h4 className="font-medium">

                          {doc.name || "Document"}

                        </h4>


                        <p className="text-sm text-gray-500">

                          {
                            doc.uploadedAt
                            ?
                            new Date(
                              doc.uploadedAt
                            ).toLocaleDateString()
                            :
                            "Not uploaded"
                          }

                        </p>


                      </div>



                    </div>





                    <span
                      className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-medium
                      ${
                        statusConfig[
                          doc.status
                        ]?.style ||
                        statusConfig.Pending.style
                      }
                      `}
                    >

                      {
                        doc.status || "Pending"
                      }


                    </span>




                  </div>


                ))
              }



            </div>


          )

        }



      </div>




      {/* ===========================
          DOCUMENT CHECKLIST
      =========================== */}



      <div className="
      bg-gradient-to-r
      from-blue-600
      to-cyan-500
      rounded-2xl
      p-6
      text-white
      ">


        <h3 className="text-xl font-semibold mb-3">

          Document Checklist

        </h3>



        <ul className="space-y-2 text-sm">


          <li>
            ✓ Passport / ID Proof
          </li>


          <li>
            ✓ Academic Certificates
          </li>


          <li>
            ✓ Mark Sheets
          </li>


          <li>
            ✓ Passport Size Photos
          </li>


          <li>
            ✓ Other Required Documents
          </li>


        </ul>



      </div>




    </div>

  );

};



export default AdmissionDocuments;