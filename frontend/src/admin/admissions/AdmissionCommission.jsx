import React from "react";
import {
  IndianRupee,
  Building2,
  UserCheck,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";


const AdmissionCommission = ({ admission }) => {

  if (!admission) return null;


  const {

    universityName,

    universityCommissionPercent = 0,
    universityCommissionAmount = 0,
    universityPaymentStatus = "Pending",

    counsellorCommissionPercent = 0,
    counsellorCommissionAmount = 0,
    counsellorPaymentStatus = "Pending",

    netFee = 0,
    universityPayments = [],
    counsellorPayments = [],

  } = admission;



  const statusBadge = (status) => {

    if(status === "Paid"){

      return "bg-green-100 text-green-700";

    }


    if(status === "Partial"){

      return "bg-yellow-100 text-yellow-700";

    }


    return "bg-red-100 text-red-700";

  };



  return (

    <div className="space-y-6">

      {/* ==========================
          PAID BANNERS
      =========================== */}

      <div className="space-y-2">
        {universityPaymentStatus === "Paid" && (
          <div className="p-3 rounded bg-green-50 text-green-800">University commission fully paid on {admission.universityPaymentDate ? new Date(admission.universityPaymentDate).toLocaleDateString() : "-"} (₹{universityCommissionAmount.toLocaleString()})</div>
        )}

        {counsellorPaymentStatus === "Paid" && (
          <div className="p-3 rounded bg-green-50 text-green-800">Counsellor commission fully paid on {admission.counsellorPaymentDate ? new Date(admission.counsellorPaymentDate).toLocaleDateString() : "-"} (₹{counsellorCommissionAmount.toLocaleString()})</div>
        )}
      </div>



      {/* ==========================
          COMMISSION SUMMARY
      =========================== */}


      <div className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-5
      ">



        <div className="
        bg-white
        border
        rounded-2xl
        p-5
        shadow-sm
        ">


          <div className="flex items-center gap-3">


            <div className="
            p-3
            rounded-xl
            bg-blue-100
            text-blue-600
            ">

              <IndianRupee size={22}/>

            </div>


            <div>

              <p className="text-sm text-gray-500">
                Net Fee
              </p>


              <h2 className="text-xl font-bold">
                ₹ {netFee.toLocaleString()}
              </h2>


            </div>


          </div>

          {/* ==========================
              PAYMENT HISTORY
          =========================== */}

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white border rounded-2xl p-4">
              <h4 className="font-semibold mb-2">University Payments</h4>
              {universityPayments && universityPayments.length > 0 ? (
                <ul className="space-y-2 text-sm">
                  {universityPayments.map((p, idx) => (
                    <li key={idx} className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">₹ {Number(p.amount || 0).toLocaleString()}</div>
                        <div className="text-gray-500">{p.paymentMode} • {p.referenceNumber || p.transactionId || "-"}</div>
                        <div className="text-gray-400 text-xs">{p.remarks}</div>
                      </div>
                      <div className="text-right text-xs text-gray-600">{p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : "-"}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-gray-500">No university payments recorded.</div>
              )}
            </div>

            <div className="bg-white border rounded-2xl p-4">
              <h4 className="font-semibold mb-2">Counsellor Payments</h4>
              {counsellorPayments && counsellorPayments.length > 0 ? (
                <ul className="space-y-2 text-sm">
                  {counsellorPayments.map((p, idx) => (
                    <li key={idx} className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">₹ {Number(p.amount || 0).toLocaleString()}</div>
                        <div className="text-gray-500">{p.paymentMode} • {p.referenceNumber || p.transactionId || "-"}</div>
                        <div className="text-gray-400 text-xs">{p.remarks}</div>
                      </div>
                      <div className="text-right text-xs text-gray-600">{p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : "-"}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-gray-500">No counsellor payments recorded.</div>
              )}
            </div>
          </div>


        </div>





        <div className="
        bg-white
        border
        rounded-2xl
        p-5
        shadow-sm
        ">


          <div className="flex items-center gap-3">


            <div className="
            p-3
            rounded-xl
            bg-purple-100
            text-purple-600
            ">

              <Building2 size={22}/>

            </div>


            <div>

              <p className="text-sm text-gray-500">
                University Commission
              </p>


              <h2 className="text-xl font-bold">

                ₹ {universityCommissionAmount.toLocaleString()}

              </h2>


            </div>


          </div>


        </div>





        <div className="
        bg-white
        border
        rounded-2xl
        p-5
        shadow-sm
        ">


          <div className="flex items-center gap-3">


            <div className="
            p-3
            rounded-xl
            bg-green-100
            text-green-600
            ">

              <UserCheck size={22}/>

            </div>


            <div>

              <p className="text-sm text-gray-500">
                Counsellor Commission
              </p>


              <h2 className="text-xl font-bold">

                ₹ {counsellorCommissionAmount.toLocaleString()}

              </h2>


            </div>


          </div>


        </div>



      </div>






      {/* ==========================
          COMMISSION DETAILS
      =========================== */}



      <div className="
      grid
      grid-cols-1
      lg:grid-cols-2
      gap-6
      ">




        {/* UNIVERSITY */}


        <div className="
        bg-white
        border
        rounded-2xl
        p-6
        shadow-sm
        ">


          <div className="
          flex
          justify-between
          items-center
          mb-5
          ">


            <div className="flex items-center gap-3">


              <Building2
                className="text-blue-600"
              />


              <h3 className="font-semibold text-lg">

                University Commission

              </h3>


            </div>



            <span
              className={`
              px-3
              py-1
              rounded-full
              text-sm
              font-medium
              ${statusBadge(
                universityPaymentStatus
              )}
              `}
            >

              {universityPaymentStatus}

            </span>


          </div>





          <div className="space-y-3">


            <p>
              University :
              <span className="font-semibold ml-2">
                {universityName}
              </span>
            </p>



            <p>
              Commission Rate :
              <span className="font-semibold ml-2">
                {universityCommissionPercent}%
              </span>
            </p>




            <p>
              Amount :
              <span className="font-semibold ml-2">

                ₹ {universityCommissionAmount.toLocaleString()}

              </span>
            </p>



          </div>



        </div>







        {/* COUNSELLOR */}



        <div className="
        bg-white
        border
        rounded-2xl
        p-6
        shadow-sm
        ">


          <div className="
          flex
          justify-between
          items-center
          mb-5
          ">


            <div className="flex items-center gap-3">


              <UserCheck
                className="text-green-600"
              />


              <h3 className="font-semibold text-lg">

                Counsellor Commission

              </h3>


            </div>



            <span
              className={`
              px-3
              py-1
              rounded-full
              text-sm
              font-medium
              ${statusBadge(
                counsellorPaymentStatus
              )}
              `}
            >

              {counsellorPaymentStatus}

            </span>


          </div>





          <div className="space-y-3">


            <p>
              Commission Rate :
              <span className="font-semibold ml-2">

                {counsellorCommissionPercent}%

              </span>
            </p>




            <p>
              Amount :
              <span className="font-semibold ml-2">

                ₹ {counsellorCommissionAmount.toLocaleString()}

              </span>
            </p>



          </div>



        </div>



      </div>






      {/* ==========================
          COMMISSION TRACKING
      =========================== */}



      <div className="
      bg-gradient-to-r
      from-indigo-600
      to-blue-600
      rounded-2xl
      p-6
      text-white
      ">



        <div className="
        flex
        items-center
        gap-3
        mb-4
        ">

          <TrendingUp size={25}/>


          <h3 className="text-xl font-semibold">
            Commission Tracking
          </h3>


        </div>



        <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
        ">



          <div className="
          bg-white/20
          rounded-xl
          p-4
          ">


            <p className="text-sm">
              University Payment
            </p>


            <div className="flex items-center gap-2 mt-2">

              {
                universityPaymentStatus === "Paid"
                ?
                <CheckCircle size={18}/>
                :
                <Clock size={18}/>
              }


              {universityPaymentStatus}

            </div>


          </div>





          <div className="
          bg-white/20
          rounded-xl
          p-4
          ">


            <p className="text-sm">
              Counsellor Payment
            </p>


            <div className="flex items-center gap-2 mt-2">


              {
                counsellorPaymentStatus === "Paid"
                ?
                <CheckCircle size={18}/>
                :
                <Clock size={18}/>
              }


              {counsellorPaymentStatus}


            </div>


          </div>



        </div>


      </div>



    </div>

  );
};


export default AdmissionCommission;