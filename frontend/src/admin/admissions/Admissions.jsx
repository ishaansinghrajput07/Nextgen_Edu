
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { GraduationCap, RefreshCcw, Search } from "lucide-react";

import AdmissionStats from "./AdmissionStats";
import AdmissionFilters from "./AdmissionFilters";
import AdmissionTable from "./AdmissionTable";

import admissionApi from "../../services/admissionApi";

const Admissions = () => {
  console.log("Admissions Component Loaded");

  const [admissions, setAdmissions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    admissionStatus: "",
    university: "",
    counsellor: "",
  });

  // =====================================================
  // FETCH ADMISSIONS
  // =====================================================

  const fetchAdmissions = async () => {
    try {
      setLoading(true);

      const { data } = await admissionApi.get("/admissions", {
        params: filters,
      });

      console.log("API Response:", data);
      console.log("API Admissions:", data.admissions);

      setAdmissions(data.admissions || []);
    } catch (error) {
      console.log("FETCH ADMISSIONS ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load admissions",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH STATS
  // =====================================================

  const fetchStats = async () => {
    try {
      const { data } = await admissionApi.get(
        "/admissions/stats",
      );

      console.log(data);

      setStats(data.stats);
    } catch (error) {
      console.log("FETCH STATS ERROR:", error);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchAdmissions();
    fetchStats();
  }, []);

  // =====================================================
  // FILTER CHANGE
  // =====================================================

  useEffect(() => {
    fetchAdmissions();
  }, [filters]);

  // =====================================================
  // REFRESH
  // =====================================================

  const handleRefresh = () => {
    fetchAdmissions();
    fetchStats();
  };

  return (
    <div
      className="
        relative
        min-h-full
        text-slate-800
      "
    >
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div
        className="
          bg-white/75
          backdrop-blur-2xl
          border
          border-white/80
          rounded-3xl
          p-5
          sm:p-6
          lg:p-7
          shadow-[0_20px_60px_rgba(14,165,233,.10)]
          mb-6
        "
      >
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
          "
        >
          {/* TITLE */}

          <div className="flex items-center gap-4">
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-br
                from-cyan-100
                to-sky-100
                flex
                items-center
                justify-center
                shadow-sm
              "
            >
              <GraduationCap
                size={28}
                className="text-cyan-600"
              />
            </div>

            <div>
              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  lg:text-4xl
                  font-extrabold
                  bg-gradient-to-r
                  from-cyan-500
                  to-sky-600
                  bg-clip-text
                  text-transparent
                "
              >
                Admissions
              </h1>

              <p
                className="
                  text-sm
                  sm:text-base
                  text-slate-500
                  mt-1
                "
              >
                Manage student admissions, payments and
                commissions
              </p>
            </div>
          </div>

          {/* REFRESH */}

          <button
            onClick={handleRefresh}
            className="
              flex
              items-center
              justify-center
              gap-2
              px-5
              py-3
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-sky-500
              text-white
              font-semibold
              shadow-lg
              shadow-cyan-200
              hover:from-cyan-600
              hover:to-sky-600
              hover:-translate-y-0.5
              transition-all
              duration-300
              w-full
              md:w-auto
            "
          >
            <RefreshCcw size={18} />

            Refresh
          </button>
        </div>
      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="mb-6">
        <AdmissionStats stats={stats} />
      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div
        className="
          bg-white/75
          backdrop-blur-2xl
          border
          border-white/80
          rounded-3xl
          p-4
          sm:p-5
          shadow-[0_15px_45px_rgba(14,165,233,.08)]
          mb-6
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            bg-slate-50
            border
            border-slate-200
            rounded-2xl
            px-4
            py-3
            transition-all
            focus-within:border-cyan-400
            focus-within:ring-4
            focus-within:ring-cyan-100
          "
        >
          <Search
            size={20}
            className="text-slate-400 shrink-0"
          />

          <input
            value={filters.search}
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value,
              })
            }
            placeholder="Search student, admission number..."
            className="
              w-full
              bg-transparent
              outline-none
              text-slate-700
              placeholder:text-slate-400
              text-sm
              sm:text-base
            "
          />
        </div>
      </div>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <div className="mb-6">
        <AdmissionFilters
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="mb-6">
        <AdmissionTable
          admissions={admissions}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Admissions;
