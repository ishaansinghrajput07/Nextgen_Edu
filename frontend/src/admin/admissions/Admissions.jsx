import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { GraduationCap, RefreshCcw, Search } from "lucide-react";

import AdmissionStats from "./AdmissionStats";
import AdmissionFilters from "./AdmissionFilters";
import AdmissionTable from "./AdmissionTable";

import admissionApi from "../../../src/api/admissionApi";

const Admissions = () => {
  const [admissions, setAdmissions] = useState([]);

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
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

      setAdmissions(data.admissions || []);
    } catch (error) {
      console.log("FETCH ADMISSIONS ERROR:", error);

      toast.error(error.response?.data?.message || "Failed to load admissions");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH STATS
  // =====================================================

  const fetchStats = async () => {
    try {
      const { data } = await admissionApi.get("/admissions/stats");

      setStats(data.stats);
    } catch (error) {
      console.log("FETCH STATS ERROR:", error);
    }
  };

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

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-blue-950
      to-cyan-950
      p-4
      md:p-6
      rounded-3xl
    "
    >
      {/* ==========================================
          HEADER
      ========================================== */}

      <div
        className="
        flex
        flex-col
        md:flex-row
        justify-between
        gap-4
        mb-6
      "
      >
        <div>
          <div
            className="
            flex
            items-center
            gap-3
          "
          >
            <div
              className="
              p-3
              rounded-2xl
              bg-white/10
              backdrop-blur-xl
            "
            >
              <GraduationCap size={30} className="text-cyan-400" />
            </div>

            <div>
              <h1
                className="
                text-3xl
                font-bold
                text-white
              "
              >
                Admissions
              </h1>

              <p
                className="
                text-gray-300
                mt-1
              "
              >
                Manage student admissions, payments and commissions
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            fetchAdmissions();
            fetchStats();
          }}
          className="
            flex
            items-center
            gap-2
            px-5
            py-3
            rounded-xl
            bg-white/10
            hover:bg-white/20
            text-white
            backdrop-blur-xl
            transition
          "
        >
          <RefreshCcw size={18} />
          Refresh
        </button>
      </div>

      {/* ==========================================
          STATS
      ========================================== */}

      <AdmissionStats stats={stats} />

      {/* ==========================================
          SEARCH BAR QUICK
      ========================================== */}

      <div
        className="
        mt-6
        mb-5
        flex
        items-center
        gap-3
        bg-white/10
        backdrop-blur-xl
        border
        border-white/10
        rounded-2xl
        px-4
        py-3
      "
      >
        <Search className="text-gray-300" />

        <input
          value={filters.search}
          onChange={(e) =>
            setFilters({
              ...filters,
              search: e.target.value,
            })
          }
          placeholder="
          Search student, admission number...
          "
          className="
            w-full
            bg-transparent
            outline-none
            text-white
            placeholder:text-gray-400
          "
        />
      </div>

      {/* ==========================================
          FILTERS
      ========================================== */}

      <AdmissionFilters filters={filters} setFilters={setFilters} />

      {/* ==========================================
          TABLE
      ========================================== */}

      <AdmissionTable admissions={admissions} loading={loading} />
    </div>
  );
};

export default Admissions;
