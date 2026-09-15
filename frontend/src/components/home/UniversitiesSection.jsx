import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getApprovedUniversities } from "../../services/universityService";
import { useCompare } from "../../context/CompareContext";

import UniversityCard from "../home/Trusteduniver/UniversityCard";

export default function UniversitiesSection() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    compareItems,
    addToCompare,
    removeFromCompare,
  } = useCompare();

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);

      const response = await getApprovedUniversities();

      console.log(
        "COMPLETE UNIVERSITY RESPONSE:",
        response
      );

      const universityData =
        response?.universities ||
        response?.data?.universities ||
        response?.data ||
        [];

      setUniversities(
        Array.isArray(universityData)
          ? universityData
          : []
      );
    } catch (error) {
      console.error(
        "Failed to fetch universities:",
        error
      );

      setUniversities([]);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Backend se complete universities state me rahengi.
   * Sirf first 8 cards me display honge.
   */
  const featuredUniversities = useMemo(() => {
    return universities.slice(0, 8);
  }, [universities]);

  const handleCompareToggle = (
    university,
    isChecked
  ) => {
    if (!university?._id) return;

    if (isChecked) {
      const added = addToCompare(university);

      /*
       * Agar 4 universities already selected hain,
       * to card ko checked mat rakho.
       */
      if (!added) {
        console.log(
          "Maximum 4 universities can be compared."
        );
      }
    } else {
      removeFromCompare(university._id);
    }
  };

  return (
    <section className="w-full bg-white px-[30px] py-[45px]">

      {/* HEADER */}
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#131371] sm:text-3xl lg:text-4xl">
          Explore over 200 online universities & Compare on 30+ factors
        </h2>

        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
          Explore flexible, recognized online programs from leading
          universities in India and beyond.
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="
                h-64
                animate-pulse
                rounded-2xl
                bg-slate-100
                shadow-[0_15px_35px_rgba(15,23,42,0.06)]
              "
            />
          ))}
        </div>
      ) : featuredUniversities.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg font-semibold text-slate-500">
            No universities found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {featuredUniversities.map((uni) => {
            const isCompared = compareItems.some(
              (item) => item?._id === uni?._id
            );

            return (
              <div
                key={uni._id}
                className="
                  group
                  relative
                  rounded-2xl
                  transition-all
                  duration-500
                  ease-out
                  [transform-style:preserve-3d]
                  hover:-translate-y-2
                  hover:[transform:perspective(1000px)_rotateX(1deg)_rotateY(-1deg)]
                "
              >

                {/* GLOW */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    -inset-1
                    rounded-[1.15rem]
                    bg-gradient-to-br
                    from-blue-500/10
                    via-transparent
                    to-violet-500/10
                    opacity-0
                    blur-xl
                    transition-all
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* SHADOW */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-2xl
                    shadow-[0_10px_25px_rgba(15,23,42,0.08)]
                    transition-all
                    duration-500
                    group-hover:shadow-[0_25px_55px_rgba(15,23,42,0.16)]
                  "
                />

                {/* CARD */}
                <div className="relative z-10">
                  <UniversityCard
                    university={uni}
                    onCompareToggle={
                      handleCompareToggle
                    }
                    isCompared={isCompared}
                  />
                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* VIEW ALL */}
      {!loading &&
        featuredUniversities.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              to="/universities"
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                bg-yellow-400
                px-8
                py-3.5
                text-sm
                font-black
                text-black
                shadow-[0_8px_20px_rgba(250,204,21,0.18)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-yellow-500
                hover:shadow-[0_14px_30px_rgba(250,204,21,0.28)]
              "
            >
              View All Universities
            </Link>
          </div>
        )}
    </section>
  );
}