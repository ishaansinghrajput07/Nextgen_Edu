import {
  ArrowLeft,
  Mail,
  Phone,
  Users,
  CheckCircle,
  Clock,
  UserRound,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";



export default function CounsellorProfile() {


  const { id } = useParams();

  const token = localStorage.getItem("token");



  const [counsellor, setCounsellor] = useState(null);

  const [assignedLeads, setAssignedLeads] = useState([]);




  useEffect(() => {


    const fetchData = async () => {


      try {


        const counsellorRes = await axios.get(

          `http://localhost:8000/api/v1/counsellor/counsellor/${id}`,

          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }

        );



        setCounsellor(
          counsellorRes.data.counsellor
        );




        const contactRes = await axios.get(

          "http://localhost:8000/api/v1/contact/admin/contacts",

          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }

        );



        const contacts = contactRes.data.contacts;



        const assigned = contacts.filter(
          (item)=>
            item.assignedTo &&
            item.assignedTo._id === id
        );



        setAssignedLeads(assigned);



      }

      catch(error){

        console.log(error);

      }


    };



    fetchData();


  },[id]);






  const convertedLeads =
    assignedLeads.filter(
      lead=>lead.status==="Converted"
    ).length;



  const pendingLeads =
    assignedLeads.filter(
      lead=>lead.status==="Pending"
    ).length;






  if(!counsellor){


    return (

      <div
      className="
      min-h-screen

      flex
      items-center
      justify-center

      bg-gradient-to-br
      from-sky-50
      via-white
      to-cyan-50
      "
      >


        <div
        className="
        bg-white/80
        backdrop-blur-xl

        border
        border-white

        rounded-3xl

        p-10

        shadow-xl

        text-center
        "
        >

          <h2
          className="
          text-2xl
          font-bold
          text-slate-700
          "
          >

          Counsellor Not Found

          </h2>


        </div>


      </div>

    );

  }







  return (

    <div
    className="
    relative

    space-y-8
    "
    >



      {/* Background Glow */}


      <div
      className="
      absolute

      -top-40
      -right-40

      w-[450px]
      h-[450px]

      rounded-full

      bg-cyan-200/40

      blur-[120px]

      pointer-events-none
      "
      />



      <div
      className="
      absolute

      bottom-0
      left-0

      w-[420px]
      h-[420px]

      rounded-full

      bg-blue-200/30

      blur-[120px]

      pointer-events-none
      "
      />







      {/* Back Button */}


      <Link
      to="/admin/counsellors"

      className="
      relative
      z-10

      inline-flex

      items-center

      gap-2

      px-5
      py-3

      rounded-2xl

      bg-white/80

      backdrop-blur-xl

      border
      border-white

      text-cyan-600

      font-semibold

      shadow-sm

      hover:bg-cyan-50

      transition
      "
      >


        <ArrowLeft size={18}/>

        Back to Counsellors


      </Link>








      {/* Profile Header */}


      <div
      className="
      relative
      z-10

      bg-white/80

      backdrop-blur-2xl

      border
      border-white

      rounded-[36px]

      p-8

      shadow-[0_30px_80px_rgba(14,165,233,.15)]
      "
      >



        <div
        className="
        flex

        flex-col
        md:flex-row

        items-center

        gap-6
        "
        >



          {/* Avatar */}


          <div
          className="
          h-24
          w-24

          rounded-[30px]

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

            <UserRound
            size={45}
            className="text-white"
            />

          </div>







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

              {counsellor.name}

            </h1>



            <p
            className="
            text-slate-500

            mt-2

            "
            >

              Professional Admission Counsellor

            </p>



            <div
            className="
            flex

            flex-wrap

            gap-3

            mt-4
            "
            >


              <span
              className="
              px-4
              py-2

              rounded-full

              bg-cyan-100

              text-cyan-700

              text-sm

              font-semibold
              "
              >

              Active Counsellor

              </span>


            </div>


          </div>




        </div>






        {/* Stats Part 2 me continue hoga */}


        {/* Stats Cards */}


        <div
        className="
        grid

        grid-cols-1

        sm:grid-cols-3

        gap-5

        mt-8
        "
        >



          {/* Assigned Leads */}


          <div
          className="
          bg-white

          rounded-3xl

          p-5

          border

          border-cyan-100

          shadow-sm

          hover:shadow-xl

          hover:-translate-y-1

          transition-all

          duration-300

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
              className="text-cyan-600"
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


              <h3
              className="
              text-3xl

              font-bold

              text-slate-800
              "
              >

              {assignedLeads.length}

              </h3>


            </div>


          </div>









          {/* Converted */}


          <div
          className="
          bg-white

          rounded-3xl

          p-5

          border

          border-emerald-100

          shadow-sm

          hover:shadow-xl

          hover:-translate-y-1

          transition-all

          duration-300

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

              <CheckCircle
              className="text-emerald-600"
              />

            </div>




            <div>


              <p
              className="
              text-sm

              text-slate-500
              "
              >

              Converted

              </p>



              <h3
              className="
              text-3xl

              font-bold

              text-slate-800
              "
              >

              {convertedLeads}

              </h3>



            </div>



          </div>











          {/* Pending */}


          <div
          className="
          bg-white

          rounded-3xl

          p-5

          border

          border-yellow-100

          shadow-sm

          hover:shadow-xl

          hover:-translate-y-1

          transition-all

          duration-300

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

            bg-yellow-100

            flex

            items-center
            justify-center
            "
            >


              <Clock
              className="text-yellow-600"
              />



            </div>





            <div>


              <p
              className="
              text-sm

              text-slate-500
              "
              >

              Pending

              </p>



              <h3
              className="
              text-3xl

              font-bold

              text-slate-800
              "
              >

              {pendingLeads}

              </h3>



            </div>



          </div>



        </div>



      </div>













      {/* Counsellor Information */}



      <div
      className="
      relative

      z-10

      bg-white/80

      backdrop-blur-2xl

      border

      border-white

      rounded-[36px]

      p-8

      shadow-[0_25px_70px_rgba(14,165,233,.12)]
      "
      >




        <div
        className="
        flex

        items-center

        justify-between

        mb-6
        "
        >


          <h2
          className="
          text-2xl

          font-bold

          text-slate-800
          "
          >

          Counsellor Information

          </h2>


        </div>








        <div
        className="
        grid

        md:grid-cols-2

        gap-5
        "
        >




          {/* Email */}


          <div
          className="
          bg-sky-50

          rounded-3xl

          p-5

          border

          border-sky-100
          "
          >


            <div
            className="
            flex

            items-center

            gap-3

            mb-3
            "
            >

              <Mail
              size={22}
              className="text-cyan-600"
              />


              <span
              className="
              text-sm

              text-slate-500
              "
              >

              Email

              </span>


            </div>



            <p
            className="
            font-semibold

            text-slate-800

            break-all
            "
            >

            {counsellor.email}

            </p>


          </div>









          {/* Phone */}


          <div
          className="
          bg-cyan-50

          rounded-3xl

          p-5

          border

          border-cyan-100
          "
          >


            <div
            className="
            flex

            items-center

            gap-3

            mb-3
            "
            >

              <Phone
              size={22}
              className="text-cyan-600"
              />


              <span
              className="
              text-sm

              text-slate-500
              "
              >

              Phone Number

              </span>


            </div>




            <p
            className="
            font-semibold

            text-slate-800
            "
            >

            {counsellor.phoneNumber}

            </p>



          </div>








          {/* Login Email */}


          <div
          className="
          bg-white

          rounded-3xl

          p-5

          border

          border-slate-100
          "
          >


            <p
            className="
            text-sm

            text-slate-500

            mb-2
            "
            >

            Login Email

            </p>


            <p
            className="
            font-semibold

            text-cyan-600

            break-all
            "
            >

            {counsellor.email}

            </p>



          </div>









          {/* Password */}


          <div
          className="
          bg-white

          rounded-3xl

          p-5

          border

          border-slate-100
          "
          >


            <p
            className="
            text-sm

            text-slate-500

            mb-2
            "
            >

            Password

            </p>


            <p
            className="
            font-semibold

            text-slate-700
            "
            >

            ********

            </p>


          </div>





        </div>



      </div>





      {/* Assigned Leads Part 3 me continue hoga */}

id="9w2n7k"
      {/* Assigned Leads */}


      <div
      className="
      relative

      z-10

      bg-white/80

      backdrop-blur-2xl

      border

      border-white

      rounded-[36px]

      p-6

      md:p-8

      shadow-[0_25px_80px_rgba(14,165,233,.12)]
      "
      >




        <div
        className="
        flex

        flex-col

        sm:flex-row

        sm:items-center

        justify-between

        gap-4

        mb-6
        "
        >



          <div>


            <h2
            className="
            text-2xl

            font-bold

            text-slate-800
            "
            >

            Assigned Leads

            </h2>


            <p
            className="
            text-sm

            text-slate-500

            mt-1
            "
            >

            Manage all student enquiries

            </p>


          </div>





          <span
          className="
          px-5

          py-2

          rounded-full

          bg-cyan-100

          text-cyan-700

          font-semibold

          text-sm

          w-fit
          "
          >

          {assignedLeads.length} Leads

          </span>




        </div>








        <div
        className="
        space-y-4
        "
        >



        {
          assignedLeads.length > 0 ?


          assignedLeads.map((lead)=>(


            <div
            key={lead._id}

            className="
            bg-white

            rounded-3xl

            border

            border-slate-100

            p-5

            shadow-sm

            hover:shadow-xl

            transition-all

            duration-300
            "
            >




              <div
              className="
              flex

              flex-col

              md:flex-row

              md:items-center

              md:justify-between

              gap-4
              "
              >




                {/* Student Info */}


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

                  from-cyan-500

                  to-sky-600

                  flex

                  items-center

                  justify-center

                  text-white

                  font-bold

                  text-lg
                  "
                  >

                    {
                    lead.username
                    ?.charAt(0)
                    ?.toUpperCase()
                    }


                  </div>





                  <div>


                    <h3
                    className="
                    font-bold

                    text-slate-800
                    "
                    >

                    {lead.username}

                    </h3>



                    <p
                    className="
                    text-sm

                    text-slate-500
                    "
                    >

                    Student Enquiry

                    </p>


                  </div>



                </div>







                {/* Status */}


                <span

                className={`

                px-4

                py-2

                rounded-full

                text-sm

                font-semibold

                w-fit


                ${
                  lead.status==="Converted"

                  ?

                  "bg-emerald-100 text-emerald-700"


                  :


                  lead.status==="Pending"

                  ?

                  "bg-yellow-100 text-yellow-700"


                  :

                  "bg-slate-100 text-slate-600"

                }

                `}

                >


                {lead.status || "Pending"}


                </span>





              </div>









              <div
              className="
              grid

              grid-cols-1

              sm:grid-cols-2

              gap-4

              mt-5
              "
              >




                <div
                className="
                bg-sky-50

                rounded-2xl

                p-4
                "
                >


                  <p
                  className="
                  text-xs

                  text-slate-500

                  mb-1
                  "
                  >

                  Interested Course

                  </p>


                  <p
                  className="
                  font-semibold

                  text-slate-700
                  "
                  >

                  {lead.interestedCourse || "-"}

                  </p>



                </div>








                <div
                className="
                bg-cyan-50

                rounded-2xl

                p-4
                "
                >


                  <p
                  className="
                  text-xs

                  text-slate-500

                  mb-1
                  "
                  >

                  Phone Number

                  </p>


                  <p
                  className="
                  font-semibold

                  text-slate-700
                  "
                  >

                  {lead.phoneNumber || "-"}

                  </p>



                </div>





              </div>




            </div>


          ))



          :



          (

            <div
            className="
            bg-white

            rounded-3xl

            p-10

            text-center

            border

            border-slate-100
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
              "
              >

                <Users
                size={32}
                className="text-cyan-600"
                />

              </div>




              <h3
              className="
              mt-4

              text-lg

              font-bold

              text-slate-700
              "
              >

              No Leads Assigned

              </h3>



              <p
              className="
              text-slate-500

              mt-2
              "
              >

              Assigned student enquiries will appear here.

              </p>



            </div>


          )

        }



        </div>



      </div>




    </div>

  );

}