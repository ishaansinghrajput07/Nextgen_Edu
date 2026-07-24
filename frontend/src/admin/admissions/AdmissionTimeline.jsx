import {
  Clock,
  User,
  CheckCircle,
} from "lucide-react";



const AdmissionTimeline = ({
  timeline = [],
}) => {


  return (

    <div className="
      bg-white/10
      backdrop-blur-xl
      border
      border-white/10
      rounded-3xl
      p-5
    ">


      {/* Header */}

      <div className="
        flex
        items-center
        gap-3
        mb-6
      ">


        <div className="
          p-3
          rounded-xl
          bg-cyan-500/20
        ">

          <Clock
            size={22}
            className="text-cyan-400"
          />

        </div>


        <h2 className="
          text-xl
          font-semibold
          text-white
        ">

          Admission Timeline

        </h2>


      </div>





      {
        timeline.length === 0 ? (

          <div className="
            text-center
            py-8
            text-gray-400
          ">

            No activity found

          </div>

        ) : (


          <div className="
            relative
            space-y-6
          ">


            {/* Vertical Line */}

            <div className="
              absolute
              left-5
              top-5
              bottom-5
              w-px
              bg-cyan-400/30
            " />




            {
              timeline.map(
                (item,index)=>(


                  <div

                    key={index}

                    className="
                      relative
                      flex
                      gap-4
                    "

                  >



                    {/* Icon */}

                    <div className="
                      relative
                      z-10
                      w-10
                      h-10
                      rounded-full
                      bg-cyan-500/20
                      flex
                      items-center
                      justify-center
                    ">


                      <CheckCircle

                        size={20}

                        className="
                          text-cyan-400
                        "

                      />


                    </div>







                    {/* Content */}

                    <div className="
                      flex-1
                      bg-white/5
                      rounded-2xl
                      p-4
                    ">


                      <div className="
                        flex
                        flex-col
                        md:flex-row
                        justify-between
                        gap-2
                      ">


                        <h3 className="
                          text-white
                          font-semibold
                        ">

                          {item.title}

                        </h3>




                        <span className="
                          text-xs
                          text-gray-400
                        ">


                          {
                            item.date
                            ?
                            new Date(
                              item.date
                            ).toLocaleString()
                            :
                            "-"
                          }


                        </span>



                      </div>






                      <p className="
                        text-gray-300
                        text-sm
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
                          text-gray-400
                        ">

                          <User
                            size={14}
                          />

                          Updated by Admin

                        </div>

                      }



                    </div>




                  </div>


                )

              )
            }



          </div>


        )

      }



    </div>

  );

};



export default AdmissionTimeline;