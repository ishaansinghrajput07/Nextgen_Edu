import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import ApplyNowModal from "../universities/ApplyNowModal";

import {
  GraduationCap,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import CourseCard from "../courses/CourseCard";

import {
  getPublicCourses,
} from "../../services/courseService";

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const res = await getPublicCourses();

        const validCourses = (res?.courses || [])
          .filter((course) => course.university)
          .slice(0, 8);

        setCourses(validCourses);

        console.log("PUBLIC COURSES RESPONSE", res);
        console.log("FIRST COURSE", res?.courses?.[0]);
      } catch (err) {
        console.log(err);
        setError("Unable to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <section className="bg-white py-[30px]">
        <div className="mx-auto w-full px-[30px]">
          <div className="mx-auto max-w-[1500px] text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-slate-300" />

              <span className="text-[14px] font-black uppercase tracking-[0.18em] text-teal-700">
                Courses
              </span>

              <span className="h-px w-10 bg-slate-300" />
            </div>

            <h2 className="mt-4 text-[38px] font-black leading-[1.12] tracking-tight text-slate-950 md:text-[46px] lg:text-[52px]">
              Loading{" "}
              <span className="text-teal-700">
                Courses...
              </span>
            </h2>
          </div>
        </div>
      </section>
    );
  }

  /* =========================
     ERROR
  ========================= */
  if (error) {
    return (
      <section className="bg-white px-[30px] py-[30px] text-center">
        <p className="text-sm font-semibold text-rose-600">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section className="bg-white py-[30px]">
      <div className="mx-auto w-full max-w-[1500px] px-[30px]">

        {/* =========================
            HEADER
        ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-slate-300" />

            <span className="inline-flex items-center gap-2 text-[14px] font-black uppercase tracking-[0.18em] text-[#1a4d40]">
              <Sparkles size={15} />
              Trending Courses
            </span>

            <span className="h-px w-10 bg-slate-300" />
          </div>

          {/* Heading */}
          <h2 className="mt-4 text-[38px] font-black leading-[1.12] tracking-tight text-slate-950 md:text-[46px] lg:text-[52px]">
            Explore Our{" "}
            <span className="text-[#131371]">
              Popular Courses.
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl text-[15px] font-semibold leading-7 text-slate-500 md:text-[16px]">
            Discover career-focused degree programs from India's
            leading universities with expert admission guidance
            and support.
          </p>

       
        </motion.div>

        {/* =========================
            COURSES GRID
        ========================= */}
        {courses.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
                className="w-full"
              >
                <CourseCard
                  course={course}
                  onApply={() => {
                    setSelectedCourse(course);
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* =========================
             NO COURSES
          ========================= */
          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50">
              <GraduationCap
                size={32}
                className="text-teal-700"
              />
            </div>

            <h3 className="mt-5 text-2xl font-black text-slate-950">
              No Courses Found
            </h3>

            <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
              Courses will appear here after adding from admin panel.
            </p>
          </div>
        )}

        {/* =========================
            APPLY MODAL
        ========================= */}
        {selectedCourse && (
          <ApplyNowModal
            isOpen={true}
            university={selectedCourse.university}
            course={selectedCourse.courseName}
            onClose={() => {
              setSelectedCourse(null);
            }}
          />
        )}
      </div>

         {/* View All */}
          <div className="mt-6 flex justify-center">
            <Link
              to="/courses"
              className="group inline-flex items-center gap-3 rounded-xl bg-yellow-400 px-5 py-3 text-[13px] font-black text-slate-950 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300"
            >
              View All Courses

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-white transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
    </section>
  );
}