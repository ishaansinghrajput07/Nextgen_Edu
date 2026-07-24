import { useState } from "react";
import { Plus, Minus } from "lucide-react";


const ContactFAQ = () => {


  const [activeIndex, setActiveIndex] = useState(null);



  const faqs = [

    {
      question:
        "How can I get admission guidance?",
      
      answer:
        "You can fill the contact form or talk with our counsellor. Our admission experts will guide you about courses, universities, eligibility and fees."
    },


    {
      question:
        "Do you help in selecting the right university?",

      answer:
        "Yes, our counsellors analyze your academic profile, career goals and budget to suggest the best university options."
    },


    {
      question:
        "Can I apply for multiple courses?",

      answer:
        "Yes, you can explore multiple courses and our team will help you compare available options."
    },


    {
      question:
        "What documents are required for admission?",

      answer:
        "Generally, academic certificates, identity proof, photographs and other university-specific documents are required."
    },


    {
      question:
        "How long does the admission process take?",

      answer:
        "The timeline depends on the university and course. Our counsellors help you complete every step smoothly."
    }

  ];





  const toggleFAQ = (index) => {

    setActiveIndex(
      activeIndex === index ? null : index
    );

  };





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
        left-0
        top-20
        w-72
        h-72
        bg-cyan-400/20
        blur-[120px]
        rounded-full
        "
      />



      <div
        className="
        absolute
        right-0
        bottom-10
        w-72
        h-72
        bg-blue-500/20
        blur-[120px]
        rounded-full
        "
      />







      <div
        className="
        relative
        max-w-5xl
        mx-auto
        px-6
        "
      >



        {/* Heading */}

        <div
          className="
          text-center
          mb-12
          "
        >

          <h2
            className="
            text-3xl
            md:text-5xl
            font-bold
            text-white
            "
          >

            Frequently Asked
            <span
              className="
              text-cyan-300
              "
            >
              {" "}Questions
            </span>

          </h2>



          <p
            className="
            mt-4
            text-gray-300
            "
          >

            Find answers to common questions
            about admissions and counselling.

          </p>


        </div>







        {/* FAQ List */}

        <div
          className="
          space-y-5
          "
        >


          {
            faqs.map((item, index) => (

              <div
                key={index}
                className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/20
                rounded-2xl
                overflow-hidden
                transition
                "
              >



                {/* Question */}

                <button
                  onClick={() => toggleFAQ(index)}
                  className="
                  w-full
                  flex
                  items-center
                  justify-between
                  gap-4
                  px-6
                  py-5
                  text-left
                  "
                >


                  <span
                    className="
                    text-white
                    font-semibold
                    text-lg
                    "
                  >

                    {item.question}

                  </span>



                  <div
                    className="
                    w-9
                    h-9
                    rounded-full
                    bg-cyan-400/20
                    flex
                    items-center
                    justify-center
                    text-cyan-300
                    shrink-0
                    "
                  >

                    {
                      activeIndex === index ? (
                        <Minus size={20}/>
                      ) : (
                        <Plus size={20}/>
                      )
                    }

                  </div>



                </button>








                {/* Answer */}

                <div
                  className={`
                  overflow-hidden
                  transition-all
                  duration-500
                  ${
                    activeIndex === index
                    ? "max-h-40 opacity-100 pb-6 px-6"
                    : "max-h-0 opacity-0"
                  }
                  `}
                >

                  <p
                    className="
                    text-gray-300
                    leading-relaxed
                    "
                  >

                    {item.answer}

                  </p>


                </div>



              </div>


            ))

          }



        </div>




      </div>




    </section>

  );

};


export default ContactFAQ;