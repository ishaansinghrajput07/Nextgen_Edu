import {
  GraduationCap,
  FileText,
  CheckCircle,
  Clock,
  IndianRupee,
  TrendingUp,
} from "lucide-react";


const AdmissionStats = ({ stats }) => {


  const cards = [

    {
      title: "Total Admissions",
      value: stats?.totalAdmissions || 0,
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
    },


    {
      title: "Applied",
      value: stats?.applied || 0,
      icon: FileText,
      color: "from-indigo-500 to-blue-500",
    },


    {
      title: "Documents Pending",
      value: stats?.documentsPending || 0,
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
    },


    {
      title: "Enrolled",
      value: stats?.enrolled || 0,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },


    {
      title: "Fee Paid",
      value: stats?.feePaid || 0,
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },


    {
      title: "Total Commission",
      value: `₹ ${
        stats?.totalCommission?.toLocaleString()
        || 0
      }`,
      icon: IndianRupee,
      color: "from-cyan-500 to-teal-500",
    },

  ];



  return (

    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-6
      gap-4
    ">


      {
        cards.map((card,index)=>{


          const Icon = card.icon;


          return (

            <div

              key={index}

              className="
                relative
                overflow-hidden
                rounded-3xl
                bg-white/10
                backdrop-blur-xl
                border
                border-white/10
                p-5
                hover:scale-[1.03]
                transition-all
                duration-300
                shadow-xl
              "

            >


              {/* Glow */}

              <div

                className={`
                  absolute
                  -top-10
                  -right-10
                  w-28
                  h-28
                  rounded-full
                  blur-3xl
                  bg-gradient-to-r
                  ${card.color}
                  opacity-40
                `}

              />



              <div className="
                relative
                z-10
              ">



                <div className="
                  flex
                  justify-between
                  items-center
                  mb-4
                ">


                  <div

                    className={`
                      p-3
                      rounded-2xl
                      bg-gradient-to-r
                      ${card.color}
                    `}

                  >

                    <Icon
                      size={22}
                      className="text-white"
                    />

                  </div>


                </div>



                <h3 className="
                  text-gray-300
                  text-sm
                  font-medium
                ">

                  {card.title}

                </h3>



                <p className="
                  text-3xl
                  font-bold
                  text-white
                  mt-2
                ">

                  {card.value}

                </p>


              </div>


            </div>

          );


        })
      }


    </div>

  );

};


export default AdmissionStats;