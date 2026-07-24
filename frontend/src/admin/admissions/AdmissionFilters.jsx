import {
  Filter,
  RotateCcw,
} from "lucide-react";


const AdmissionFilters = ({
  filters,
  setFilters,
}) => {



  const handleChange = (key,value)=>{

    setFilters({
      ...filters,
      [key]: value,
    });

  };



  const resetFilters = ()=>{

    setFilters({

      search:"",
      status:"",
      university:"",
      counsellor:"",

    });

  };



  return (

    <div className="
      bg-white/10
      backdrop-blur-xl
      border
      border-white/10
      rounded-3xl
      p-5
      mb-6
    ">


      {/* Header */}

      <div className="
        flex
        items-center
        gap-3
        mb-5
      ">

        <div className="
          p-3
          rounded-xl
          bg-cyan-500/20
        ">

          <Filter
            className="text-cyan-400"
            size={22}
          />

        </div>


        <h2 className="
          text-white
          font-semibold
          text-lg
        ">

          Filter Admissions

        </h2>


      </div>





      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-4
      ">



        {/* Status */}


        <select

          value={filters.status}

          onChange={(e)=>
            handleChange(
              "status",
              e.target.value
            )
          }


          className="
            bg-white/10
            border
            border-white/20
            text-white
            rounded-xl
            px-4
            py-3
            outline-none
          "

        >

          <option
            value=""
            className="text-black"
          >
            All Status
          </option>


          <option
            value="Applied"
            className="text-black"
          >
            Applied
          </option>


          <option
            value="Documents Pending"
            className="text-black"
          >
            Documents Pending
          </option>


          <option
            value="Documents Verified"
            className="text-black"
          >
            Documents Verified
          </option>


          <option
            value="Offer Letter"
            className="text-black"
          >
            Offer Letter
          </option>


          <option
            value="Fee Paid"
            className="text-black"
          >
            Fee Paid
          </option>


          <option
            value="Enrolled"
            className="text-black"
          >
            Enrolled
          </option>


        </select>







        {/* University */}


        <input

          value={filters.university}

          onChange={(e)=>
            handleChange(
              "university",
              e.target.value
            )
          }


          placeholder="University ID"


          className="
            bg-white/10
            border
            border-white/20
            text-white
            placeholder:text-gray-400
            rounded-xl
            px-4
            py-3
            outline-none
          "

        />







        {/* Counsellor */}


        <input

          value={filters.counsellor}

          onChange={(e)=>
            handleChange(
              "counsellor",
              e.target.value
            )
          }


          placeholder="Counsellor ID"


          className="
            bg-white/10
            border
            border-white/20
            text-white
            placeholder:text-gray-400
            rounded-xl
            px-4
            py-3
            outline-none
          "

        />







        {/* Reset */}


        <button

          onClick={resetFilters}


          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white/10
            hover:bg-white/20
            text-white
            transition
          "

        >

          <RotateCcw size={18}/>

          Reset


        </button>



      </div>


    </div>

  );

};


export default AdmissionFilters;