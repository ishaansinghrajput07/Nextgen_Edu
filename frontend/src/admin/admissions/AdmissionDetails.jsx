import { useEffect, useState } from "react";

import {
  ArrowLeft,
  User,
  Building2,
  BookOpen,
  IndianRupee,
  Loader2,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import admissionApi from "../../services/admissionApi";

import AdmissionTimeline from "./AdmissionTimeline";

const AdmissionDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [admission, setAdmission] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchAdmission = async () => {
    try {
      setLoading(true);

      const { data } = await admissionApi.get(
        `/admissions/${id}`,
      );

      console.log(data);

      setAdmission(data.admission);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load admission",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmission();
  }, [id]);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div
        className="
          min-h-[500px]
          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
            gap-4
          "
        >
          <div
            className="
              h-14
              w-14
              rounded-2xl
              bg-cyan-50
              border
              border-cyan-100
              flex
              items-center
              justify-center
            "
          >
            <Loader2
              size={26}
              className="
                text-cyan-600
                animate-spin
              "
            />
          </div>

          <p className="text-slate-500 text-sm">
            Loading admission details...
          </p>
        </div>
      </div>
    );
  }

  /* =========================
     EMPTY
  ========================= */

  if (!admission) {
    return (
      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-[28px]
          p-10
          text-center
          shadow-[0_20px_60px_rgba(14,165,233,0.08)]
        "
      >
        <p className="text-slate-500">
          Admission not found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* =========================
          HEADER
      ========================= */}

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-[28px]
          shadow-[0_20px_60px_rgba(14,165,233,0.08)]
          p-5
          sm:p-6
          flex
          flex-col
          sm:flex-row
          sm:items-center
          justify-between
          gap-4
        "
      >
        <div className="flex items-center gap-4">

          {/* Back Button */}

          <button
            onClick={() => navigate(-1)}
            className="
              h-11
              w-11
              shrink-0
              rounded-xl
              bg-slate-50
              border
              border-slate-200
              text-slate-600
              flex
              items-center
              justify-center
              shadow-sm
              hover:bg-cyan-50
              hover:text-cyan-600
              hover:border-cyan-200
              transition-all
              duration-300
            "
          >
            <ArrowLeft size={20} />
          </button>

          {/* Heading */}

          <div>
            <h1
              className="
                text-2xl
                sm:text-3xl
                font-extrabold
                bg-gradient-to-r
                from-cyan-500
                to-sky-600
                bg-clip-text
                text-transparent
              "
            >
              Admission Details
            </h1>

            <p
              className="
                text-sm
                text-slate-500
                mt-1
              "
            >
              {admission.admissionNumber || "Admission"}
            </p>
          </div>
        </div>

        {/* Status */}

        <span
          className={`
            inline-flex
            items-center
            justify-center
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            border
            w-fit
            ${
              admission.admissionStatus === "Enrolled"
                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                : admission.admissionStatus === "Rejected"
                  ? "bg-red-50 text-red-700 border-red-100"
                  : admission.admissionStatus === "Fee Paid"
                    ? "bg-green-50 text-green-700 border-green-100"
                    : "bg-cyan-50 text-cyan-700 border-cyan-100"
            }
          `}
        >
          {admission.admissionStatus || "Pending"}
        </span>
      </div>

      {/* =========================
          TOP INFORMATION CARDS
      ========================= */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-5
        "
      >

        {/* Student */}

        <InfoCard
          icon={User}
          title="Student"
          items={[
            ["Name", admission.studentName],
            ["Email", admission.studentEmail],
            ["Phone", admission.studentPhone],
          ]}
        />

        {/* University */}

        <InfoCard
          icon={Building2}
          title="University"
          items={[
            ["University", admission.universityName],
            ["Country", admission.country],
            ["Intake", admission.intake],
          ]}
        />

        {/* Course */}

        <InfoCard
          icon={BookOpen}
          title="Course"
          items={[
            ["Course", admission.courseName],
            ["Status", admission.admissionStatus],
            [
              "Created",
              admission.createdAt
                ? new Date(
                    admission.createdAt,
                  ).toLocaleDateString()
                : "-",
            ],
          ]}
        />
      </div>

      {/* =========================
          FINANCIAL INFORMATION
      ========================= */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
        "
      >

        {/* Fee Details */}

        <InfoCard
          icon={IndianRupee}
          title="Fee Details"
          items={[
            [
              "Tuition Fee",
              `₹${Number(
                admission.tuitionFee || 0,
              ).toLocaleString()}`,
            ],
            [
              "Scholarship",
              `₹${Number(
                admission.scholarshipAmount || 0,
              ).toLocaleString()}`,
            ],
            [
              "Net Fee",
              `₹${Number(
                admission.netFee || 0,
              ).toLocaleString()}`,
            ],
          ]}
        />

        {/* Commission */}

        <InfoCard
          icon={IndianRupee}
          title="Commission"
          items={[
            [
              "University Commission",
              `₹${Number(
                admission.universityCommissionAmount || 0,
              ).toLocaleString()}`,
            ],
            [
              "Counsellor Commission",
              `₹${Number(
                admission.counsellorCommissionAmount || 0,
              ).toLocaleString()}`,
            ],
            [
              "Payment Status",
              admission.counsellorPaymentStatus || "-",
            ],
          ]}
        />
      </div>

      {/* =========================
          ADMISSION TIMELINE
      ========================= */}

      <div className="pt-1">
        <AdmissionTimeline
          timeline={admission.timeline || []}
        />
      </div>
    </div>
  );
};

/* =====================================================
   INFO CARD
===================================================== */

const InfoCard = ({
  icon: Icon,
  title,
  items,
}) => {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-[28px]
        p-5
        sm:p-6
        shadow-[0_20px_60px_rgba(14,165,233,0.08)]
        hover:-translate-y-1
        hover:shadow-[0_25px_65px_rgba(14,165,233,0.12)]
        hover:border-cyan-200
        transition-all
        duration-300
      "
    >

      {/* Card Header */}

      <div
        className="
          flex
          items-center
          gap-3
          mb-5
        "
      >
        <div
          className="
            h-11
            w-11
            rounded-2xl
            bg-cyan-50
            text-cyan-600
            border
            border-cyan-100
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <Icon size={21} />
        </div>

        <h2
          className="
            text-lg
            font-bold
            text-slate-800
          "
        >
          {title}
        </h2>
      </div>

      {/* Card Content */}

      <div className="space-y-0">
        {items.map((item, index) => (
          <div
            key={index}
            className="
              flex
              items-start
              justify-between
              gap-4
              py-3
              border-b
              border-slate-100
              last:border-b-0
            "
          >
            <span
              className="
                text-sm
                text-slate-500
                shrink-0
              "
            >
              {item[0]}
            </span>

            <span
              className="
                text-sm
                text-slate-800
                font-semibold
                text-right
                break-words
                max-w-[65%]
              "
            >
              {item[1] || "-"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdmissionDetails;