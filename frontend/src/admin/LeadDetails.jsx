import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

import {
  User,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  Building2,
  IndianRupee,
  CheckCircle,
  Clock,
} from "lucide-react";
import AdmissionCommission from "./admissions/AdmissionCommission";
import AdmissionPaymentModal from "./admissions/AdmissionPaymentModal";
import api from "../services/api";

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ==========================
  // STATES
  // ==========================

  const [lead, setLead] = useState(null);

  const [loading, setLoading] = useState(true);

  // NOTES

  const [notes, setNotes] = useState("");

  // FOLLOW UP

  const [followUpText, setFollowUpText] = useState("");

  const [followUps, setFollowUps] = useState([]);

  // STATUS

  const [status, setStatus] = useState("");

  // ENROLLMENT

  const [enrollmentStatus, setEnrollmentStatus] = useState("Not Enrolled");

  const [university, setUniversity] = useState("");

  const [enrolledCourse, setEnrolledCourse] = useState("");

  const [joiningDate, setJoiningDate] = useState("");

  const [tuitionFee, setTuitionFee] = useState("");

  const [universities, setUniversities] = useState([]);

  const [courses, setCourses] = useState([]);

  const [admission, setAdmission] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState("university");

  const paymentStatusLabel =
    admission?.paymentStatus ||
    admission?.counsellorPaymentStatus ||
    admission?.universityPaymentStatus ||
    lead?.paymentStatus ||
    "Pending";
  const admissionStatusLabel =
    admission?.admissionStatus || admission?.applicationStatus || "Enrolled";

  // COMMISSION

  const [collegePercentage, setCollegePercentage] = useState("");

  const [counsellorPercentage, setCounsellorPercentage] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("Pending");

  // ==========================
  // FETCH LEAD
  // ==========================

  useEffect(() => {
    fetchUniversities();
    fetchLead();
  }, [id]);

  const fetchUniversities = async () => {
    try {
      const res = await api.get(
        "/university/alluniversity",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUniversities(res.data.universities || []);
    } catch (error) {
      console.log(
        "FETCH UNIVERSITIES ERROR =>",
        error.response?.data || error.message,
      );
    }
  };

  const fetchCourses = async (universityId) => {
    if (!universityId) {
      setCourses([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/course/university/${universityId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCourses(res.data.courses || []);
    } catch (error) {
      console.log(
        "FETCH COURSES ERROR =>",
        error.response?.data || error.message,
      );
      setCourses([]);
    }
  };

  const fetchLead = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/contact/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("SINGLE LEAD RESPONSE =>", res.data);
      console.log("STATUS =>", res.data.lead?.status);
      console.log("LEAD =>", res.data.lead);

      const data =
        res.data.lead || res.data.contact || res.data.data || res.data;

      setLead(data);

      setNotes(data.notes || "");

      setFollowUps(data.followUps || []);

      setStatus(data.status || "New");

      setEnrollmentStatus(data.enrollmentStatus || "Not Enrolled");

      setUniversity(data.enrollment?.university || "");

      setEnrolledCourse(data.enrollment?.course || "");

      setJoiningDate(data.enrollment?.joiningDate || "");

      setTuitionFee(data.enrollment?.tuitionFee || "");

      setAdmission(res.data.admission || null);

      if (data.enrollment?.university) {
        await fetchCourses(data.enrollment.university);
      }

      setCollegePercentage(data.commission?.collegePercentage || "");

      setCounsellorPercentage(data.commission?.counsellorPercentage || "");

      setPaymentStatus(data.commission?.paymentStatus || "Pending");
    } catch (error) {
      console.log(
        "FETCH SINGLE LEAD ERROR =>",
        error.response?.data || error.message,
      );

      toast.error("Lead not found");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // UPDATE LEAD
  // ==========================

  const updateLead = async (payload) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/contact/${id}`,

        payload,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Updated Successfully");

      fetchLead();
    } catch (error) {
      console.log("UPDATE ERROR =>", error.response?.data || error.message);

      toast.error("Update Failed");
    }
  };

  // ==========================
  // STATUS UPDATE
  // ==========================

  const handleStatusUpdate = () => {
    updateLead({
      status,
    });
  };

  // ==========================
  // SAVE NOTES
  // ==========================

  const saveNotes = () => {
    updateLead({
      notes,
    });
  };

  // ==========================
  // ADD FOLLOW UP
  // ==========================

  const addFollowUp = () => {
    if (!followUpText.trim()) {
      toast.error("Enter follow up");

      return;
    }

    const newFollowUp = {
      text: followUpText,

      date: new Date(),
    };

    updateLead({
      followUps: [...followUps, newFollowUp],
    });

    setFollowUpText("");
  };

  // ==========================
  // SAVE ENROLLMENT
  // ==========================

  const saveEnrollment = () => {
    if (!university || !enrolledCourse) {
      toast.error("Please select university and enrolled course.");
      return;
    }

    const selectedUniversity =
      universities.find((item) => item._id === university);

    updateLead({
      status: "Enrolled",

      applicationStatus: "Enrolled",

      enrollmentStatus: "Enrolled",

      university: selectedUniversity?.universityName || "",

      tuitionFee: Number(tuitionFee),

      enrollment: {
        university,
        course: enrolledCourse,
        joiningDate,
        tuitionFee: Number(tuitionFee),
      },
    });
  };

  // ==========================
  // SAVE COMMISSION
  // ==========================

  const saveCommission = () => {
    const totalCommission =
      (Number(tuitionFee) * Number(collegePercentage)) / 100;

    const counsellorAmount =
      (totalCommission * Number(counsellorPercentage)) / 100;

    updateLead({
      commission: {
        collegePercentage: Number(collegePercentage),

        totalCommission,

        counsellorPercentage: Number(counsellorPercentage),

        counsellorAmount,

        paymentStatus,
      },
    });
  };

  if (loading) {
    return <div className="p-10 text-center">Loading Lead...</div>;
  }

  if (!lead) {
    return <div className="p-10">Lead Not Found</div>;
  }
  const timeline = lead.timeline || lead.activityTimeline || [];
  return (
    <div
      className="
relative
min-h-screen
overflow-hidden
bg-gradient-to-br
from-sky-50
via-cyan-50
to-blue-100
p-6
lg:p-10
"
    >
      {/* Background Glow */}

      <div
        className="
absolute
-top-40
-left-40
h-[450px]
w-[450px]
rounded-full
bg-cyan-300/30
blur-[120px]
"
      />

      <div
        className="
absolute
bottom-0
right-0
h-[500px]
w-[500px]
rounded-full
bg-blue-300/30
blur-[140px]
"
      />

      <div
        className="
relative
z-10
max-w-7xl
mx-auto
"
      >
        {/* ==========================
 HERO HEADER
========================== */}

        <div
          className="
rounded-[35px]
bg-white/80
backdrop-blur-xl
border
border-white
shadow-2xl
p-8
lg:p-10
mb-8
"
        >
          <div
            className="
flex
flex-col
lg:flex-row
justify-between
gap-8
"
          >
            {/* LEFT */}

            <div>
              <div
                className="
inline-flex
items-center
gap-2
rounded-full
bg-cyan-100
px-5
py-2
text-cyan-700
font-semibold
"
              >
                <User
                  className="
h-5
w-5
"
                />
                Lead Details
              </div>

              <h1
                className="
mt-5
text-4xl
lg:text-5xl
font-black
text-slate-900
"
              >
                {lead.leadName || lead.username || "Unknown Lead"}
              </h1>

              <p
                className="
mt-3
text-lg
text-slate-600
"
              >
                {lead.interestedCourse || "No Course Selected"}
              </p>

              <div
                className="
flex
flex-wrap
gap-3
mt-6
"
              >
                <span
                  className="
px-5
py-2
rounded-full
bg-gradient-to-r
from-sky-500
to-cyan-500
text-white
font-bold
shadow-lg
"
                >
                  {status}
                </span>

                <span
                  className="
px-5
py-2
rounded-full
bg-blue-100
text-blue-700
font-semibold
"
                >
                  ID :{lead._id}
                </span>

                {admission && (
                  <button
                    onClick={() => navigate(`/admin/admissions/${admission._id}`)}
                    className="
px-5
py-2
rounded-full
bg-emerald-100
text-emerald-700
font-semibold
shadow-lg
hover:bg-emerald-200
transition
"
                  >
                    View Admission
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT */}

            <div
              className="
bg-gradient-to-br
from-sky-500
to-blue-600
rounded-3xl
p-8
text-white
min-w-[280px]
shadow-xl
"
            >
              <p
                className="
text-sm
opacity-80
"
              >
                Assigned Counsellor
              </p>

              <h2
                className="
text-2xl
font-black
mt-2
"
              >
                {lead.counsellor?.name ||
                  lead.assignedTo?.name ||
                  "Not Assigned"}
              </h2>

              <div
                className="
mt-5
flex
items-center
gap-2
"
              >
                <Clock
                  className="
h-5
w-5
"
                />

                <span>
                  {lead.createdAt
                    ? new Date(lead.createdAt).toLocaleDateString()
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================
 QUICK INFO CARDS
========================== */}

        <div
          className="
grid
md:grid-cols-2
lg:grid-cols-4
gap-6
mb-8
"
        >
          <InfoCard
            icon={<Phone />}
            title="Phone"
            value={lead.phoneNumber || "-"}
          />

          <InfoCard icon={<Mail />} title="Email" value={lead.email || "-"} />

          <InfoCard
            icon={<GraduationCap />}
            title="Course"
            value={lead.interestedCourse || "-"}
          />

          <InfoCard
            icon={<Calendar />}
            title="Created"
            value={
              lead.createdAt
                ? new Date(lead.createdAt).toLocaleDateString()
                : "-"
            }
          />
        </div>

        {/* ==========================
 ADMISSION PIPELINE
========================== */}

        <div
          className="
bg-white/80
backdrop-blur-xl
border
border-white
rounded-[35px]
shadow-2xl
p-8
mb-8
"
        >
          <h2
            className="
text-2xl
font-black
text-slate-900
mb-8
"
          >
            Admission Journey
          </h2>

          <div
            className="
grid
grid-cols-2
md:grid-cols-3
lg:grid-cols-6
gap-5
"
          >
            {[
              "New",
              "Contacted",
              "Interested",
              "Follow Up",
              "Converted",
              "Enrolled",
            ].map((item, index) => {
              const active =
                [
                  "New",
                  "Contacted",
                  "Interested",
                  "Follow Up",
                  "Converted",
                  "Enrolled",
                ].indexOf(status) >= index;

              return (
                <div
                  key={item}
                  className="
flex
flex-col
items-center
gap-3
"
                >
                  <div
                    className={`
h-14
w-14
rounded-full
flex
items-center
justify-center
font-black
shadow-lg

${
  active
    ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white"
    : "bg-slate-100 text-slate-400"
}

`}
                  >
                    {index + 1}
                  </div>

                  <p
                    className={`
text-sm
font-semibold
text-center

${active ? "text-sky-700" : "text-slate-400"}

`}
                  >
                    {item}
                  </p>
                </div>
              );
            })}
          </div>

          {/* STATUS UPDATE */}

          <div
            className="
mt-10
flex
flex-col
md:flex-row
gap-5
items-center
"
          >
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="
w-full
md:w-80
rounded-2xl
border
border-sky-200
bg-white
px-5
py-4
outline-none
focus:ring-4
focus:ring-cyan-100
"
            >
              <option>New</option>

              <option>Contacted</option>

              <option>Interested</option>

              <option>Follow Up</option>

              <option>Converted</option>

              <option>Enrolled</option>
            </select>

            <button
              onClick={handleStatusUpdate}
              className="
rounded-2xl
bg-gradient-to-r
from-sky-500
to-cyan-500
px-8
py-4
text-white
font-bold
shadow-lg
hover:-translate-y-1
transition
"
            >
              Update Status
            </button>
          </div>
        </div>

        {/* ==========================
 ACTIVITY TIMELINE
========================== */}

        <div
          className="
bg-white/80
backdrop-blur-xl
border
border-white
rounded-[35px]
shadow-2xl
p-8
mb-8
"
        >
          <h2
            className="
text-2xl
font-black
text-slate-900
mb-8
"
          >
            Activity Timeline
          </h2>

          <div
            className="
space-y-6
"
          >
            {timeline && timeline.length > 0 ? (
              timeline
                .slice()
                .reverse()
                .map((item, index) => (
                  <div
                    key={index}
                    className="
flex
gap-5
"
                  >
                    <div
                      className="
relative
"
                    >
                      <div
                        className="
h-12
w-12
rounded-full
bg-cyan-100
text-cyan-600
flex
items-center
justify-center
"
                      >
                        <CheckCircle
                          className="
h-6
w-6
"
                        />
                      </div>

                      {index !== timeline.length - 1 && (
                        <div
                          className="
absolute
top-12
left-6
h-full
w-[2px]
bg-cyan-200
"
                        />
                      )}
                    </div>

                    <div
                      className="
bg-slate-50
rounded-2xl
p-5
flex-1
"
                    >
                        <h3
                        className="
font-bold
text-slate-900
"
                      >
                        {item.title || item.type}
                      </h3>

                      <p
                        className="
text-slate-600
mt-1
"
                      >
                        {item.description}
                      </p>

                      <p
                        className="
text-sm
text-slate-400
mt-2
"
                      >
                        {item.date ? new Date(item.date).toLocaleString() : "-"}
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <div
                className="
text-center
text-slate-500
py-10
"
              >
                No Activity Available
              </div>
            )}
          </div>
        </div>
        {/* ==========================
 NOTES SECTION
========================== */}

        <div
          className="
bg-white/80
backdrop-blur-xl
border
border-white
rounded-[35px]
shadow-2xl
p-8
mb-8
"
        >
          <div
            className="
flex
items-center
gap-3
mb-6
"
          >
            <div
              className="
h-12
w-12
rounded-2xl
bg-cyan-100
text-cyan-600
flex
items-center
justify-center
"
            >
              <User />
            </div>

            <h2
              className="
text-2xl
font-black
text-slate-900
"
            >
              Internal Notes
            </h2>
          </div>

          <textarea
            rows={6}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="
Write important notes about student...
"
            className="
w-full
rounded-3xl
border
border-sky-200
bg-white
p-5
outline-none
resize-none
focus:ring-4
focus:ring-cyan-100
"
          />

          <button
            onClick={saveNotes}
            className="
mt-5
rounded-2xl
bg-gradient-to-r
from-sky-500
to-cyan-500
px-8
py-3
text-white
font-bold
shadow-lg
hover:-translate-y-1
transition
"
          >
            Save Notes
          </button>
        </div>

        {/* ==========================
 FOLLOW UP SECTION
========================== */}

        <div
          className="
bg-white/80
backdrop-blur-xl
border
border-white
rounded-[35px]
shadow-2xl
p-8
mb-8
"
        >
          <div
            className="
flex
items-center
gap-3
mb-8
"
          >
            <div
              className="
h-12
w-12
rounded-2xl
bg-blue-100
text-blue-600
flex
items-center
justify-center
"
            >
              <Clock />
            </div>

            <h2
              className="
text-2xl
font-black
text-slate-900
"
            >
              Follow Up Management
            </h2>
          </div>

          <div
            className="
grid
lg:grid-cols-3
gap-6
"
          >
            <textarea
              rows={4}
              value={followUpText}
              onChange={(e) => setFollowUpText(e.target.value)}
              placeholder="
Example: Student interested in MBA, call tomorrow...
"
              className="
lg:col-span-2
rounded-3xl
border
border-sky-200
p-5
resize-none
outline-none
focus:ring-4
focus:ring-cyan-100
"
            />

            <button
              onClick={addFollowUp}
              className="
rounded-3xl
bg-gradient-to-r
from-blue-500
to-cyan-500
text-white
font-black
text-lg
shadow-xl
hover:-translate-y-1
transition
"
            >
              Add Follow Up
            </button>
          </div>

          {/* HISTORY */}

          <div
            className="
mt-10
space-y-5
"
          >
            <h3
              className="
text-xl
font-black
text-slate-900
"
            >
              Follow Up History
            </h3>

            {followUps.length > 0 ? (
              followUps
                .slice()
                .reverse()
                .map((item, index) => (
                  <div
                    key={index}
                    className="
border-l-4
border-cyan-500
bg-slate-50
rounded-r-3xl
p-5
"
                  >
                    <div
                      className="
flex
justify-between
gap-5
flex-wrap
"
                    >
                      <p
                        className="
font-bold
text-slate-900
"
                      >
                        {item.text}
                      </p>

                      <span
                        className="
text-sm
text-slate-500
"
                      >
                        {item.date ? new Date(item.date).toLocaleString() : "-"}
                      </span>
                    </div>
                  </div>
                ))
            ) : (
              <div
                className="
text-center
text-slate-500
py-8
"
              >
                No Follow Ups Added Yet
              </div>
            )}
          </div>
        </div>
        {/* ==========================
 STUDENT ENROLLMENT SECTION
========================== */}

        {admission ? (
          <div
            className="
  bg-white/80
backdrop-blur-xl
border
border-white
rounded-[35px]
shadow-2xl
p-8
mb-8
"
          >
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-3">
                  Admission Created
                </h2>
                <p className="text-slate-600">
                  This lead already has an admission record. Enrollment and admission fields are locked for updates from the admission page.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Admission Number</p>
                  <p className="text-lg font-bold text-slate-900">
                    {admission.admissionNumber || "-"}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Admission Status</p>
                  <p className="text-lg font-bold text-slate-900">
                    {admissionStatusLabel}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Payment Status</p>
                  <p className="text-lg font-bold text-slate-900">
                    {paymentStatusLabel}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">University / Course</p>
                  <p className="text-lg font-bold text-slate-900">
                    {admission.universityName || "-"} / {admission.courseName || "-"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate(`/admin/admissions/${admission._id}`)}
                className="
  inline-flex
  items-center
  justify-center
  rounded-2xl
  bg-gradient-to-r
  from-sky-500
  to-cyan-500
  px-8
  py-4
  text-white
  font-bold
  shadow-xl
  hover:-translate-y-1
  transition
"
              >
                Update Admission
              </button>
              {/* Show commission summary when admission exists */}
              <div className="mt-6">
                <AdmissionCommission admission={admission} />

                <div className="flex gap-3 mt-4">
                  {admission?.universityPaymentStatus !== "Paid" ? (
                    <button onClick={() => { setPaymentType("university"); setShowPaymentModal(true); }} className="px-4 py-2 rounded bg-green-600 text-white">Record University Payment</button>
                  ) : (
                    <span className="px-4 py-2 rounded bg-green-100 text-green-800 font-medium">University commission paid</span>
                  )}

                  {admission?.counsellorPaymentStatus !== "Paid" ? (
                    <button onClick={() => { setPaymentType("counsellor"); setShowPaymentModal(true); }} className="px-4 py-2 rounded bg-amber-600 text-white">Record Counsellor Payment</button>
                  ) : (
                    <span className="px-4 py-2 rounded bg-green-100 text-green-800 font-medium">Counsellor commission paid</span>
                  )}
                </div>
              </div>

              {showPaymentModal && (
                <AdmissionPaymentModal
                  admissionId={admission?._id}
                  admission={admission}
                  type={paymentType}
                  onClose={() => setShowPaymentModal(false)}
                  onSaved={(updated) => setAdmission(updated)}
                />
              )}
            </div>
          </div>
        ) : (
          <div
            className="
bg-white/80
backdrop-blur-xl
border
border-white
rounded-[35px]
shadow-2xl
p-8
mb-8
"
          >
          <div
            className="
flex
items-center
gap-3
mb-8
"
          >
            <div
              className="
h-12
w-12
rounded-2xl
bg-blue-100
text-blue-600
flex
items-center
justify-center
"
            >
              <GraduationCap />
            </div>

            <h2
              className="
text-2xl
font-black
text-slate-900
"
            >
              Student Enrollment
            </h2>
          </div>

          {/* ENROLLMENT STATUS */}

          <div
            className="
grid
md:grid-cols-2
gap-6
mb-8
"
          >
            <div>
              <label
                className="
text-sm
font-semibold
text-slate-600
"
              >
                Enrollment Status
              </label>

              <select
                value={enrollmentStatus}
                onChange={(e) => setEnrollmentStatus(e.target.value)}
                className="
mt-2
w-full
rounded-2xl
border
border-sky-200
bg-white
px-5
py-4
outline-none
focus:ring-4
focus:ring-cyan-100
"
              >
                <option value="Not Enrolled">Not Enrolled</option>

                <option value="Enrolled">Enrolled</option>
              </select>
            </div>

            <div
              className="
flex
items-center
justify-center
"
            >
              <div
                className={`
px-6
py-3
rounded-full
font-bold

${
  enrollmentStatus === "Enrolled"
    ? "bg-green-100 text-green-700"
    : "bg-yellow-100 text-yellow-700"
}

`}
              >
                {enrollmentStatus === "Enrolled"
                  ? "✓ Student Enrolled"
                  : "Waiting For Enrollment"}
              </div>
            </div>
          </div>

          {enrollmentStatus === "Enrolled" && (
            <div
              className="
grid
md:grid-cols-2
gap-6
"
            >
              {/* UNIVERSITY */}

              <div>
                <label
                  className="
text-sm
font-semibold
text-slate-600
"
                >
                  University
                </label>

                <select
                  value={university}
                  onChange={async (e) => {
                    setUniversity(e.target.value);
                    setEnrolledCourse("");
                    await fetchCourses(e.target.value);
                  }}
                  className="
mt-2
w-full
rounded-2xl
border
border-sky-200
bg-white
px-5
py-4
outline-none
focus:ring-4
focus:ring-cyan-100
"
                >
                  <option value="">Select University</option>
                  {universities.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.universityName}
                    </option>
                  ))}
                </select>
              </div>

              {/* COURSE */}

              <div>
                <label
                  className="
text-sm
font-semibold
text-slate-600
"
                >
                  Enrolled Course
                </label>

                <select
                  value={enrolledCourse}
                  onChange={(e) => setEnrolledCourse(e.target.value)}
                  className="
mt-2
w-full
rounded-2xl
border
border-sky-200
bg-white
px-5
py-4
outline-none
focus:ring-4
focus:ring-cyan-100
"
                >
                  <option value="">Select Course</option>
                  {courses.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.courseName}
                    </option>
                  ))}
                </select>
              </div>

              {/* JOINING DATE */}

              <div>
                <label
                  className="
text-sm
font-semibold
text-slate-600
"
                >
                  Joining Date
                </label>

                <input
                  type="date"
                  value={joiningDate ? joiningDate.substring(0, 10) : ""}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  className="
mt-2
w-full
rounded-2xl
border
border-sky-200
p-4
outline-none
focus:ring-4
focus:ring-cyan-100
"
                />
              </div>

              {/* TUITION FEE */}

              <div>
                <label
                  className="
text-sm
font-semibold
text-slate-600
"
                >
                  Tuition Fee
                </label>

                <div
                  className="
relative
"
                >
                  <IndianRupee
                    className="
absolute
left-4
top-1/2
-translate-y-1/2
text-cyan-600
h-5
"
                  />

                  <input
                    type="number"
                    value={tuitionFee}
                    onChange={(e) => setTuitionFee(e.target.value)}
                    placeholder="
500000
"
                    className="
mt-2
w-full
rounded-2xl
border
border-sky-200
p-4
pl-12
outline-none
focus:ring-4
focus:ring-cyan-100
"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={saveEnrollment}
            className="
mt-8
rounded-2xl
bg-gradient-to-r
from-sky-500
to-blue-600
px-8
py-4
text-white
font-black
shadow-xl
hover:-translate-y-1
transition
"
          >
            Save Enrollment Details
          </button>
        </div>
      )}
        {/* ==========================
 COMMISSION MANAGEMENT
========================== */}

        {!admission && enrollmentStatus === "Enrolled" && (
          <div
            className="
bg-white/80
backdrop-blur-xl
border
border-white
rounded-[35px]
shadow-2xl
p-8
mb-8
"
          >
            <div
              className="
flex
items-center
gap-3
mb-8
"
            >
              <div
                className="
h-12
w-12
rounded-2xl
bg-green-100
text-green-600
flex
items-center
justify-center
"
              >
                <IndianRupee />
              </div>

              <h2
                className="
text-2xl
font-black
text-slate-900
"
              >
                Commission Management
              </h2>
            </div>

            <div
              className="
grid
md:grid-cols-2
gap-6
"
            >
              {/* COLLEGE COMMISSION % */}

              <div>
                <label
                  className="
text-sm
font-semibold
text-slate-600
"
                >
                  College Commission %
                </label>

                <input
                  type="number"
                  value={collegePercentage}
                  onChange={(e) => setCollegePercentage(e.target.value)}
                  placeholder="Example 20"
                  className="
mt-2
w-full
rounded-2xl
border
border-sky-200
p-4
outline-none
focus:ring-4
focus:ring-cyan-100
"
                />
              </div>

              {/* COUNSELLOR SHARE % */}

              <div>
                <label
                  className="
text-sm
font-semibold
text-slate-600
"
                >
                  Counsellor Share %
                </label>

                <input
                  type="number"
                  value={counsellorPercentage}
                  onChange={(e) => setCounsellorPercentage(e.target.value)}
                  placeholder="Example 40"
                  className="
mt-2
w-full
rounded-2xl
border
border-sky-200
p-4
outline-none
focus:ring-4
focus:ring-cyan-100
"
                />
              </div>
            </div>

            {/* CALCULATION CARD */}

            <div
              className="
mt-8
grid
md:grid-cols-3
gap-5
"
            >
              <div
                className="
rounded-3xl
bg-sky-50
p-6
"
              >
                <p
                  className="
text-sm
text-slate-500
"
                >
                  College Commission
                </p>

                <h3
                  className="
mt-2
text-3xl
font-black
text-sky-700
"
                >
                  ₹{(Number(tuitionFee) * Number(collegePercentage)) / 100}
                </h3>
              </div>

              <div
                className="
rounded-3xl
bg-cyan-50
p-6
"
              >
                <p
                  className="
text-sm
text-slate-500
"
                >
                  Total Commission
                </p>

                <h3
                  className="
mt-2
text-3xl
font-black
text-cyan-700
"
                >
                  ₹{(Number(tuitionFee) * Number(collegePercentage)) / 100}
                </h3>
              </div>

              <div
                className="
rounded-3xl
bg-blue-50
p-6
"
              >
                <p
                  className="
text-sm
text-slate-500
"
                >
                  Counsellor Amount
                </p>

                <h3
                  className="
mt-2
text-3xl
font-black
text-blue-700
"
                >
                  ₹
                  {(((Number(tuitionFee) * Number(collegePercentage)) / 100) *
                    Number(counsellorPercentage)) /
                    100}
                </h3>
              </div>
            </div>

            {/* PAYMENT STATUS */}

            <div
              className="
mt-8
grid
md:grid-cols-2
gap-6
"
            >
              <div>
                <label
                  className="
text-sm
font-semibold
text-slate-600
"
                >
                  Commission Payment Status
                </label>

                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="
mt-2
w-full
rounded-2xl
border
border-sky-200
bg-white
p-4
outline-none
focus:ring-4
focus:ring-cyan-100
"
                >
                  <option value="Pending">Pending</option>

                  <option value="Paid">Paid</option>
                </select>
              </div>

              <div
                className="
flex
items-end
"
              >
                <button
                  onClick={saveCommission}
                  className="
w-full
rounded-2xl
bg-gradient-to-r
from-green-500
to-emerald-600
px-8
py-4
text-white
font-black
shadow-xl
hover:-translate-y-1
transition
"
                >
                  Save Commission
                </button>
              </div>
            </div>
          </div>
        )}
        {/* ==========================
 STATUS HISTORY
========================== */}

        <div
          className="
bg-white/80
backdrop-blur-xl
border
border-white
rounded-[35px]
shadow-2xl
p-8
mb-8
"
        >
          <h2
            className="
text-2xl
font-black
text-slate-900
mb-8
"
          >
            Status History
          </h2>

          {lead.statusHistory && lead.statusHistory.length > 0 ? (
            <div className="space-y-5">
              {lead.statusHistory
                .slice()
                .reverse()
                .map((item, index) => (
                  <div
                    key={index}
                    className="
flex
gap-5
items-start
"
                  >
                    <div
                      className="
h-10
w-10
rounded-full
bg-cyan-100
text-cyan-600
flex
items-center
justify-center
font-bold
"
                    >
                      {index + 1}
                    </div>

                    <div
                      className="
flex-1
bg-slate-50
rounded-2xl
p-5
"
                    >
                      <div
                        className="
flex
justify-between
flex-wrap
gap-3
"
                      >
                        <h3
                          className="
font-black
text-slate-900
"
                        >
                          {item.status}
                        </h3>

                        <span
                          className="
text-sm
text-slate-500
"
                        >
                          {item.date
                            ? new Date(item.date).toLocaleString()
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div
              className="
text-center
text-slate-500
py-8
"
            >
              No Status History Available
            </div>
          )}
        </div>

        {/* ==========================
 ASSIGNMENT HISTORY
========================== */}

        <div
          className="
bg-white/80
backdrop-blur-xl
border
border-white
rounded-[35px]
shadow-2xl
p-8
mb-8
"
        >
          <div
            className="
flex
items-center
gap-3
mb-8
"
          >
            <div
              className="
h-12
w-12
rounded-2xl
bg-blue-100
text-blue-600
flex
items-center
justify-center
"
            >
              <User />
            </div>

            <h2
              className="
text-2xl
font-black
text-slate-900
"
            >
              Assignment History
            </h2>
          </div>

          {lead.assignmentHistory && lead.assignmentHistory.length > 0 ? (
            <div
              className="
space-y-5
"
            >
              {lead.assignmentHistory
                .slice()
                .reverse()
                .map((item, index) => (
                  <div
                    key={index}
                    className="
bg-slate-50
rounded-2xl
p-5
flex
justify-between
flex-wrap
gap-3
"
                  >
                    <div>
                      <p
                        className="
font-bold
text-slate-900
"
                      >
                        {item.counsellorName || item.counsellor || "Unknown"}
                      </p>

                      <p
                        className="
text-sm
text-slate-500
mt-1
"
                      >
                        Assigned Counsellor
                      </p>
                    </div>

                    <p
                      className="
text-sm
text-slate-500
"
                    >
                      {item.date ? new Date(item.date).toLocaleString() : "-"}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <div
              className="
text-center
text-slate-500
py-8
"
            >
              No Assignment History
            </div>
          )}
        </div>

        {/* ==========================
 END SPACE
========================== */}

        <div
          className="
text-center
py-10
text-slate-500
font-semibold
"
        >
          Lead Management System
        </div>
      </div>
    </div>
  );
}

// ==========================
// INFO CARD COMPONENT
// ==========================

function InfoCard({ icon, title, value }) {
  return (
    <div
      className="
bg-white/80
backdrop-blur-xl
border
border-white
rounded-3xl
p-6
shadow-xl
hover:-translate-y-2
transition
"
    >
      <div
        className="
h-12
w-12
rounded-2xl
bg-gradient-to-r
from-sky-500
to-cyan-500
text-white
flex
items-center
justify-center
mb-5
shadow-lg
"
      >
        {icon}
      </div>

      <p
        className="
text-sm
text-slate-500
font-medium
"
      >
        {title}
      </p>

      <h3
        className="
mt-2
font-black
text-slate-900
break-words
"
      >
        {value}
      </h3>
    </div>
  );
}
