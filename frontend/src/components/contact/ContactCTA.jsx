import { ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";


const ContactCTA = () => {

  return (

    <section
      className="
      relative
      py-20
      overflow-hidden
      "
    >


      {/* Background Glow */}

      <div
        className="
        absolute
        top-10
        left-1/2
        -translate-x-1/2
        w-[400px]
        h-[400px]
        bg-cyan-400/20
        blur-[120px]
        rounded-full
        "
      />


      <div
        className="
        absolute
        bottom-0
        right-0
        w-[300px]
        h-[300px]
        bg-blue-500/20
        blur-[100px]
        rounded-full
        "
      />





      <div
        className="
        relative
        max-w-6xl
        mx-auto
        px-6
        "
      >


        {/* Glass Card */}

        <div
          className="
          rounded-3xl
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          shadow-2xl
          p-8
          md:p-12
          text-center
          "
        >



          {/* Icon */}

          <div
            className="
            mx-auto
            mb-6
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            bg-gradient-to-r
            from-cyan-400
            to-blue-600
            shadow-lg
            shadow-cyan-500/30
            "
          >

            <GraduationCap
              size={34}
              className="text-white"
            />

          </div>





          {/* Heading */}

          <h2
            className="
            text-3xl
            md:text-5xl
            font-bold
            text-white
            leading-tight
            "
          >

            Ready To Start Your
            <span
              className="
              text-cyan-300
              "
            >
              {" "}Career Journey?
            </span>

          </h2>





          {/* Description */}

          <p
            className="
            mt-5
            max-w-2xl
            mx-auto
            text-gray-300
            text-base
            md:text-lg
            "
          >

            Connect with our expert counsellors and get
            personalized guidance for choosing the right
            course and university.

          </p>






          {/* Buttons */}

          <div
            className="
            mt-8
            flex
            flex-col
            sm:flex-row
            justify-center
            gap-4
            "
          >



            {/* Admission Button */}

            <Link
              to="/admission"
              className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              px-8
              py-4
              rounded-xl
              bg-gradient-to-r
              from-cyan-400
              to-blue-600
              text-white
              font-semibold
              shadow-lg
              shadow-cyan-500/30
              hover:scale-105
              transition
              duration-300
              "
            >

              Apply Now


              <ArrowRight
                size={20}
                className="
                group-hover:translate-x-1
                transition
                "
              />

            </Link>






            {/* Contact Button */}

            <Link
              to="/contact"
              className="
              px-8
              py-4
              rounded-xl
              border
              border-white/30
              bg-white/5
              text-white
              font-semibold
              hover:bg-white/10
              transition
              duration-300
              "
            >

              Talk To Counsellor

            </Link>



          </div>



        </div>



      </div>


    </section>

  );

};


export default ContactCTA;