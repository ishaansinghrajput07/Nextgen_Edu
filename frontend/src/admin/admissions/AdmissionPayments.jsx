// src/pages/admin/admissions/components/AdmissionPayments.jsx

import React from "react";
import {
  IndianRupee,
  CreditCard,
  CalendarDays,
  CheckCircle,
  Clock,
} from "lucide-react";

const AdmissionPayments = ({ admission }) => {
  if (!admission) return null;

  const {
    tuitionFee = 0,
    netFee = 0,

    universityCommissionAmount = 0,
    counsellorCommissionAmount = 0,

    universityPaymentStatus = "Pending",
    counsellorPaymentStatus = "Pending",

    universityPayments = [],
    counsellorPayments = [],
  } = admission;

  const statusStyle = (status) => {
    if (status === "Paid") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Partial") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  };


  return (
    <div className="space-y-6">


      {/* ===============================
          FEE SUMMARY
      =============================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


        <div className="bg-white rounded-2xl shadow-sm border p-5">

          <div className="flex items-center gap-3">

            <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
              <IndianRupee size={22}/>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Tuition Fee
              </p>

              <h3 className="text-xl font-bold">
                ₹ {tuitionFee.toLocaleString()}
              </h3>
            </div>

          </div>

        </div>



        <div className="bg-white rounded-2xl shadow-sm border p-5">

          <div className="flex items-center gap-3">

            <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
              <CreditCard size={22}/>
            </div>

            <div>

              <p className="text-sm text-gray-500">
                Net Payable Fee
              </p>

              <h3 className="text-xl font-bold">
                ₹ {netFee.toLocaleString()}
              </h3>

            </div>

          </div>

        </div>




        <div className="bg-white rounded-2xl shadow-sm border p-5">

          <div className="flex items-center gap-3">

            <div className="p-3 rounded-xl bg-green-100 text-green-600">
              <IndianRupee size={22}/>
            </div>

            <div>

              <p className="text-sm text-gray-500">
                Counsellor Commission
              </p>

              <h3 className="text-xl font-bold">
                ₹ {counsellorCommissionAmount.toLocaleString()}
              </h3>

            </div>

          </div>

        </div>


      </div>




      {/* ===============================
          COMMISSION STATUS
      =============================== */}


      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


        {/* University Payment */}

        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="flex justify-between items-center mb-5">

            <h3 className="font-semibold text-lg">
              University Commission
            </h3>


            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle(
                universityPaymentStatus
              )}`}
            >
              {universityPaymentStatus}
            </span>


          </div>



          <h2 className="text-2xl font-bold mb-3">
            ₹ {universityCommissionAmount.toLocaleString()}
          </h2>



          <div className="flex items-center gap-2 text-gray-500 text-sm">

            {
              universityPaymentStatus === "Paid"
              ?
              <CheckCircle size={16}/>
              :
              <Clock size={16}/>
            }

            Payment Status : {universityPaymentStatus}

          </div>


        </div>





        {/* Counsellor Payment */}


        <div className="bg-white border rounded-2xl p-6 shadow-sm">


          <div className="flex justify-between items-center mb-5">

            <h3 className="font-semibold text-lg">
              Counsellor Commission
            </h3>


            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle(
                counsellorPaymentStatus
              )}`}
            >
              {counsellorPaymentStatus}
            </span>


          </div>



          <h2 className="text-2xl font-bold mb-3">
            ₹ {counsellorCommissionAmount.toLocaleString()}
          </h2>



          <div className="flex items-center gap-2 text-gray-500 text-sm">

            {
              counsellorPaymentStatus === "Paid"
              ?
              <CheckCircle size={16}/>
              :
              <Clock size={16}/>
            }

            Payment Status : {counsellorPaymentStatus}

          </div>


        </div>


      </div>





      {/* ===============================
          PAYMENT HISTORY
      =============================== */}



      <div className="bg-white border rounded-2xl shadow-sm p-6">


        <h3 className="text-lg font-semibold mb-5">
          Payment History
        </h3>



        {
          universityPayments.length === 0 &&
          counsellorPayments.length === 0
          ?

          <div className="text-center text-gray-500 py-8">
            No payment history available
          </div>


          :

          <div className="space-y-4">



            {
              [...universityPayments, ...counsellorPayments]
              .map((payment,index)=>(


                <div
                  key={index}
                  className="flex justify-between items-center border rounded-xl p-4"
                >


                  <div>

                    <p className="font-medium">
                      {payment.paymentMode}
                    </p>


                    <div className="flex items-center gap-2 text-sm text-gray-500">

                      <CalendarDays size={15}/>

                      {
                        new Date(
                          payment.paymentDate
                        ).toLocaleDateString()
                      }

                    </div>


                  </div>



                  <div className="font-bold text-lg">

                    ₹ {payment.amount.toLocaleString()}

                  </div>



                </div>


              ))
            }



          </div>

        }



      </div>



    </div>
  );
};


export default AdmissionPayments;