import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  RefreshCcw,
  Download,
} from "lucide-react";

import commissionApi from "../../services/commissionApi";

import CommissionStats from "../commission/CommissionStats";
import CommissionFilters from "../commission/CommissionFilters";
import CommissionTable from "../commission/CommissionTable";
import CommissionPaymentModal from "../commission/CommissionPaymentModal";

const Commission = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const [stats, setStats] = useState(null);
  const [commissions, setCommissions] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    counsellor: "",
    university: "",
    startDate: "",
    endDate: "",
  });

  const [selectedCommission, setSelectedCommission] =
    useState(null);

  const [showPayment, setShowPayment] = useState(false);

  // =====================================================
  // FETCH ADMIN REPORT
  // =====================================================

  const fetchReport = async () => {
    try {
      setLoading(true);
      setStatsLoading(true);

      const params = {
        status: filters.status || undefined,
        counsellor:
          filters.counsellor || undefined,
        university:
          filters.university || undefined,
        startDate:
          filters.startDate || undefined,
        endDate:
          filters.endDate || undefined,
      };

      const response =
        await commissionApi.getAdminCommissionReport(
          params
        );

      setStats(response?.summary || {});

      setCommissions(
        response?.counsellorWise || []
      );
    } catch (error) {
      console.error(
        "Commission report error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch commission report."
      );
    } finally {
      setLoading(false);
      setStatsLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchReport();
  }, []);

  // =====================================================
  // FILTER
  // =====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReport();
    }, 300);

    return () => clearTimeout(timer);
  }, [
    filters.status,
    filters.counsellor,
    filters.university,
    filters.startDate,
    filters.endDate,
  ]);

  // =====================================================
  // REFRESH
  // =====================================================

  const refreshData = () => {
    fetchReport();
  };

  // =====================================================
  // EXPORT COMMISSION REPORT
  // =====================================================

  const handleExport = async () => {
    try {
      setExportLoading(true);

      const params = {
        status:
          filters.status || undefined,

        counsellor:
          filters.counsellor || undefined,

        university:
          filters.university || undefined,

        // Backend expects these names
        fromDate:
          filters.startDate || undefined,

        toDate:
          filters.endDate || undefined,
      };

      const response =
        await commissionApi.exportCommissionReport(
          params
        );

      const report =
        response?.report || [];

      // =================================================
      // NO DATA
      // =================================================

      if (!report.length) {
        toast.error(
          "No commission data available to export."
        );
        return;
      }

      // =================================================
      // CSV HEADERS
      // =================================================

      const headers = Object.keys(
        report[0]
      );

      // =================================================
      // CSV ROWS
      // =================================================

      const rows = report.map((item) =>
        headers.map((header) => {
          let value = item[header];

          if (
            value === null ||
            value === undefined
          ) {
            return "";
          }

          // Format dates
          if (
            header === "PaymentDate" ||
            header === "CreatedAt"
          ) {
            value = value
              ? new Date(
                  value
                ).toLocaleString("en-IN")
              : "";
          }

          // Escape CSV characters
          return `"${String(value).replace(
            /"/g,
            '""'
          )}"`;
        })
      );

      // =================================================
      // CREATE CSV
      // =================================================

      const csvContent = [
        headers.join(","),
        ...rows.map((row) =>
          row.join(",")
        ),
      ].join("\n");

      // =================================================
      // CREATE FILE
      // =================================================

      const blob = new Blob(
        [
          "\uFEFF",
          csvContent,
        ],
        {
          type:
            "text/csv;charset=utf-8;",
        }
      );

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `commission-report-${new Date()
          .toISOString()
          .slice(0, 10)}.csv`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      toast.success(
        `${report.length} commission records exported successfully.`
      );
    } catch (error) {
      console.error(
        "Commission export error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to export commission report."
      );
    } finally {
      setExportLoading(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">

        <div>
          <h1 className="
            text-2xl
            font-bold
            text-gray-800
          ">
            Commission Management
          </h1>

          <p className="
            mt-1
            text-gray-500
          ">
            Manage counsellor commissions
            and payments
          </p>
        </div>

        {/* ACTIONS */}

        <div className="
          flex
          items-center
          gap-3
        ">

          {/* EXPORT */}

          <button
            type="button"
            onClick={handleExport}
            disabled={exportLoading}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              bg-green-600
              text-white
              hover:bg-green-700
              disabled:opacity-60
              disabled:cursor-not-allowed
              transition
            "
          >
            <Download
              size={18}
              className={
                exportLoading
                  ? "animate-pulse"
                  : ""
              }
            />

            {exportLoading
              ? "Exporting..."
              : "Export Report"}
          </button>

          {/* REFRESH */}

          <button
            type="button"
            onClick={refreshData}
            disabled={loading}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              bg-blue-600
              text-white
              hover:bg-blue-700
              disabled:opacity-60
              transition
            "
          >
            <RefreshCcw
              size={18}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

        </div>

      </div>

      {/* =================================================
          STATS
      ================================================= */}

      <CommissionStats
        stats={stats}
        loading={statsLoading}
      />

      {/* =================================================
          FILTERS
      ================================================= */}

      <CommissionFilters
        filters={filters}
        setFilters={setFilters}
      />

      {/* =================================================
          TABLE
      ================================================= */}

      <CommissionTable
        commissions={commissions}
        loading={loading}
        refresh={refreshData}

        onView={(counsellorId) => {
          console.log(
            "VIEW COUNSELLOR ID:",
            counsellorId
          );

          if (!counsellorId) {
            toast.error(
              "Counsellor ID not found."
            );
            return;
          }

          navigate(
            `/admin/commission/${counsellorId}`
          );
        }}

        onPayment={(item) => {
          setSelectedCommission(item);
          setShowPayment(true);
        }}
      />

      {/* =================================================
          PAYMENT MODAL
      ================================================= */}

      <CommissionPaymentModal
        isOpen={showPayment}

        onClose={() => {
          setShowPayment(false);
          setSelectedCommission(null);
        }}

        commissionId={
          selectedCommission?._id
        }

        refresh={refreshData}
      />

    </div>
  );
};

export default Commission;