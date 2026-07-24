import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import ApplyNowModal from "../components/universities/ApplyNowModal";
import CourseCard from "../components/courses/CourseCard";

import {
  GraduationCap,
  Search,
  Filter,
  Building2,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";

import { getPublicCourses } from "../services/courseService";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Apply Modal

  const [selectedUniversityData, setSelectedUniversityData] = useState(null);

  const [applyModalOpen, setApplyModalOpen] = useState(false);

  // Search & Filter

  const [search, setSearch] = useState("");

  const [selectedUniversity, setSelectedUniversity] = useState("All");

  const [sortBy, setSortBy] = useState("latest");

  // Fetch Courses

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const res = await getPublicCourses();

      const validCourses = res.courses.filter((course) => course.university);

      setCourses(validCourses);

      setError("");
    } catch (err) {
      console.log(err);

      setError("Unable to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Universities List

  const universities = useMemo(() => {
    const list = [
      ...new Set(courses.map((course) => course.university?.universityName)),
    ];

    return list;
  }, [courses]);

  // Search Filter Sort

  const filteredCourses = useMemo(() => {
    let data = [...courses];

    if (search.trim()) {
      data = data.filter((course) =>
        `${course.courseName}
        ${course.university?.universityName}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    }

    if (selectedUniversity !== "All") {
      data = data.filter(
        (course) => course.university?.universityName === selectedUniversity,
      );
    }

    switch (sortBy) {
      case "low":
        data.sort((a, b) => a.fees - b.fees);

        break;

      case "high":
        data.sort((a, b) => b.fees - a.fees);

        break;

      case "name":
        data.sort((a, b) => a.courseName.localeCompare(b.courseName));

        break;

      default:
        break;
    }

    return data;
  }, [courses, search, selectedUniversity, sortBy]);

  return (
    <div
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-gradient-to-br
      from-sky-50
      via-white
      to-cyan-50
      "
    >
      {/* Background */}

      <div
        className="
        absolute
        -top-44
        -left-44
        h-[520px]
        w-[520px]
        rounded-full
        bg-cyan-200/30
        blur-[120px]
        "
      />

      <div
        className="
        absolute
        top-32
        right-0
        h-[420px]
        w-[420px]
        rounded-full
        bg-blue-200/20
        blur-[120px]
        "
      />

      <div
        className="
        relative
        z-10
        mx-auto
        max-w-[1400px]
        px-6
        pt-20
        pb-12
        lg:px-10
        "
      >
        {/* HERO SECTION */}

        <motion.section
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="text-center  pt-10"  
        >



        
          {/* Badge */}

          <div
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-sky-200
            bg-white
            px-5
            py-2
            text-sm
            font-semibold
            text-sky-700
            shadow-sm
            "
          >
            <Sparkles size={16} className="text-sky-600" />
            Explore Professional Programs
          </div>

          {/* Heading */}

         <h1
  className="
  mt-8
  text-3xl
  font-black
  leading-tight
  tracking-tight
  text-slate-900
  md:text-5xl
  "
>
  Find The Right{" "}

  <span
    className="
    bg-gradient-to-r
    from-sky-600
    via-cyan-500
    to-blue-600
    bg-clip-text
    text-transparent
    "
  >
    Online Course
  </span>

  <br />

  For Your Dream Career
</h1>






          {/* Description */}

          <p
            className="
            mx-auto
            mt-4
            max-w-3xl
           text-base
            leading-7
            text-slate-600
            "
          >
            Discover top online degree programs from India's leading
            universities. Compare courses, fees, duration and choose the perfect
            program for your career growth.
          </p>
        </motion.section>

        {/* STATISTICS */}





        <motion.section
  initial={{
    opacity: 0,
    y: 40,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  viewport={{
    once: true,
  }}
  transition={{
    duration: 0.7,
  }}
  className="
  mt-10
  grid
  gap-5
  sm:grid-cols-2
  lg:grid-cols-4
  "
>

  {/* Courses */}

  <div
    className="
    flex
    items-center
    gap-4
    rounded-3xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-lg
    shadow-sky-100/50
    "
  >

    <div
      className="
      flex
      h-12
      w-12
      shrink-0
      items-center
      justify-center
      rounded-2xl
      bg-sky-50
      "
    >
      <GraduationCap
        size={28}
        className="text-sky-600"
      />
    </div>


    <div>
      <h2
        className="
        text-3xl
        font-black
        text-slate-900
        "
      >
        {courses.length}+
      </h2>

      <p className="text-sm text-slate-600">
        Professional Courses
      </p>
    </div>

  </div>



  {/* Universities */}

  <div
    className="
    flex
    items-center
    gap-4
    rounded-3xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-lg
    shadow-sky-100/50
    "
  >

    <div
      className="
      flex
      h-12
      w-12
      shrink-0
      items-center
      justify-center
      rounded-2xl
      bg-blue-50
      "
    >
      <Building2
        size={26}
        className="text-blue-600"
      />
    </div>


    <div>

      <h2
        className="
        text-3xl
        font-black
        text-slate-900
        "
      >
        {universities.length}+
      </h2>


      <p className="text-sm text-slate-600">
        Partner Universities
      </p>

    </div>

  </div>



  {/* Admission Support */}

  <div
    className="
    flex
    items-center
    gap-4
    rounded-3xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-lg
    shadow-sky-100/50
    "
  >

    <div
      className="
      flex
      h-12
      w-12
      shrink-0
      items-center
      justify-center
      rounded-2xl
      bg-emerald-50
      "
    >
      <Filter
        size={26}
        className="text-emerald-600"
      />
    </div>


    <div>

      <h2
        className="
        text-3xl
        font-black
        text-slate-900
        "
      >
        100%
      </h2>


      <p className="text-sm text-slate-600">
        Admission Support
      </p>

    </div>

  </div>




  {/* Updated */}

  <div
    className="
    flex
    items-center
    gap-4
    rounded-3xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-lg
    shadow-sky-100/50
    "
  >

    <div
      className="
      flex
      h-12
      w-12
      shrink-0
      items-center
      justify-center
      rounded-2xl
      bg-purple-50
      "
    >
      <ArrowUpDown
        size={26}
        className="text-purple-600"
      />
    </div>


    <div>

      <h2
        className="
        text-3xl
        font-black
        text-slate-900
        "
      >
        Daily
      </h2>


      <p className="text-sm text-slate-600">
        Course Updates
      </p>

    </div>

  </div>


</motion.section>



     {/* SEARCH & FILTER SECTION */}

<motion.section
  initial={{
    opacity: 0,
    y: 40,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  viewport={{
    once: true,
  }}
  transition={{
    duration: 0.6,
  }}
  className="
  mt-10
  rounded-3xl
  border
  border-slate-200
  bg-white/80
  p-4
  shadow-lg
  shadow-sky-100/40
  backdrop-blur-xl
  "
>

  <div
    className="
    grid
    gap-3
    lg:grid-cols-4
    "
  >

    {/* Search Input */}

    <div
      className="
      relative
      lg:col-span-2
      "
    >

      <Search
        size={18}
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-sky-600
        "
      />


      <input
        type="text"
        placeholder="Search course or university..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
        w-full
        rounded-xl
        border
        border-slate-200
        bg-slate-50
        py-3
        pl-12
        pr-4
        text-sm
        text-slate-900
        outline-none
        transition
        placeholder:text-slate-400
        focus:border-sky-500
        focus:bg-white
        "
      />

    </div>



    {/* University Filter */}

    <select
      value={selectedUniversity}
      onChange={(e) => setSelectedUniversity(e.target.value)}
      className="
      rounded-xl
      border
      border-slate-200
      bg-slate-50
      px-4
      py-3
      text-sm
      text-slate-800
      outline-none
      transition
      focus:border-sky-500
      "
    >

      <option value="All">
        All Universities
      </option>


      {universities.map((uni) => (
        <option
          key={uni}
          value={uni}
        >
          {uni}
        </option>
      ))}


    </select>




    {/* Sort Filter */}

    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="
      rounded-xl
      border
      border-slate-200
      bg-slate-50
      px-4
      py-3
      text-sm
      text-slate-800
      outline-none
      transition
      focus:border-sky-500
      "
    >

      <option value="latest">
        Latest
      </option>

      <option value="name">
        Course Name
      </option>

      <option value="low">
        Fees Low → High
      </option>

      <option value="high">
        Fees High → Low
      </option>


    </select>


  </div>



  {/* Bottom Filter Row */}


  <div
    className="
    mt-4
    flex
    flex-col
    gap-3
    md:flex-row
    md:items-center
    md:justify-between
    "
  >


    <p
      className="
      text-sm
      text-slate-600
      "
    >

      Showing

      <span
        className="
        mx-2
        font-black
        text-sky-600
        "
      >
        {filteredCourses.length}
      </span>

      Courses

    </p>



    <button
      onClick={() => {

        setSearch("");

        setSelectedUniversity("All");

        setSortBy("latest");

      }}
      className="
      rounded-xl
      border
      border-sky-200
      bg-sky-50
      px-5
      py-2.5
      text-sm
      font-semibold
      text-sky-700
      transition
      hover:bg-sky-600
      hover:text-white
      "
    >

      Reset Filters

    </button>


  </div>


</motion.section>





        {/* COURSES HEADER */}

        <motion.section
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
          mt-14
          flex
          flex-col
          gap-5
          md:flex-row
          md:items-center
          md:justify-between
          "
        >
          <div>
            <h2
              className="
             text-3xl
              font-black
              tracking-tight
              text-slate-900
              "
            >
              Explore Courses
            </h2>

            <p
              className="
              mt-2
              text-slate-600
              "
            >
              {filteredCourses.length} courses available
            </p>
          </div>

          <div
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-sky-200
            bg-sky-50
            px-5
            py-3
            font-semibold
            text-sky-700
            "
          >
            <Sparkles size={18} />
            Updated Daily
          </div>
        </motion.section>

        {/* COURSE GRID */}

        {loading ? (
          <div
            className="
              mt-12
              grid
              gap-8
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              "
          >
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="
                    h-[360px]
                    animate-pulse
                    rounded-3xl
                    bg-slate-200
                    "
              />
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <motion.div
            layout
            className="
              mt-10
              grid
              gap-7
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              "
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                }}
                whileHover={{
                  y: -8,
                }}
                className="
                      w-full
                      "
              >
                <CourseCard
                  course={course}
                  onApply={() => {
                    setSelectedUniversityData(course.university);

                    setApplyModalOpen(true);
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
              mt-16
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-14
              text-center
              shadow-lg
              "
          >
            <GraduationCap
              size={80}
              className="
                mx-auto
                text-sky-600
                "
            />

            <h2
              className="
                mt-6
                text-3xl
                font-black
                text-slate-900
                "
            >
              No Courses Found
            </h2>

            <p
              className="
                mt-3
                text-slate-600
                "
            >
              Try changing your search filters.
            </p>

            <button
              onClick={() => {
                setSearch("");

                setSelectedUniversity("All");

                setSortBy("latest");
              }}
              className="
                mt-6
                rounded-xl
                bg-sky-600
                px-7
                py-3
                font-bold
                text-white
                transition
                hover:bg-sky-700
                "
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* PREMIUM CTA SECTION */}

        <motion.section
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
          relative
          mt-16
          overflow-hidden
          rounded-[40px]
          bg-gradient-to-r
          from-sky-600
          via-cyan-500
          to-blue-600
          p-10
          text-center
          
          md:p-14
          "
        >
          {/* Glow */}

          <div
            className="
            absolute
            -left-20
            -top-20
            h-72
            w-72
            rounded-full
            bg-white/20
            blur-[100px]
            "
          />

          <div
            className="
            absolute
            -bottom-20
            -right-20
            h-72
            w-72
            rounded-full
            bg-cyan-200/30
            blur-[100px]
            "
          />

          <div
            className="
            relative
            z-10
            "
          >
            <Sparkles
              size={45}
              className="
              mx-auto
              text-white
              "
            />

            <h2
              className="
              mt-6
              text-3xl
              font-black
              text-white
             md:text-4xl
              "
            >
              Still Confused About Choosing Course?
            </h2>

            <p
              className="
              mx-auto
              mt-5
              max-w-2xl
              text-lg
              leading-8
              text-white/90
              "
            >
              Get free counselling from our experts and choose the right
              university and course according to your career goals.
            </p>

            <div
              className="
              mt-5
              flex
              flex-wrap
              justify-center
              gap-4
              "
            >
              <button
                onClick={() => {
                  setApplyModalOpen(true);
                }}
                className="
                rounded-2xl
                bg-white
                px-8
                py-4
                font-bold
                text-sky-700
                transition
                hover:scale-105
                "
              >
                Apply Now
              </button>

              <button
                onClick={() => {
                  setApplyModalOpen(true);
                }}
                className="
                rounded-2xl
                border
                border-white
                px-8
                py-4
                font-bold
                text-white
                transition
                hover:bg-white
                hover:text-sky-700
                "
              >
                Free Counselling
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* APPLY MODAL */}

      <ApplyNowModal
        isOpen={applyModalOpen}
        onClose={() => {
          setApplyModalOpen(false);
        }}
        university={selectedUniversityData}
      />
    </div>
  );
}
