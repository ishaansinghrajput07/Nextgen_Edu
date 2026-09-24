import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  ArrowLeft,
  MapPin,
  Trophy,
  IndianRupee,
  CheckCircle2,
  Globe2,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Home,
  Award,
  BookOpen,
  Plus,
  X,
  Save,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

export default function UniversityProfile() {
  const { id } = useParams();

  const [university, setUniversity] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseMode, setCourseMode] = useState("Online");
  const [duration, setDuration] = useState("");
  const [fees, setFees] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);

  // =========================
  // FETCH UNIVERSITY
  // =========================

  const fetchUniversity = async () => {
    try {
      const res = await api.get(
        `/university/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setUniversity(res.data.university);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load university");
    }
  };

  // =========================
  // FETCH COURSES
  // =========================

  const fetchCourses = async () => {
    try {
      const res = await api.get(
        `/course/university/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setCourses(res.data.courses || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load courses");
    }
  };

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([fetchUniversity(), fetchCourses()]);

      setLoading(false);
    };

    loadData();
  }, [id]);

  // =========================
  // RESET COURSE FORM
  // =========================

  const resetCourseForm = () => {
    setCourseName("");
    setCourseMode("Online");
    setDuration("");
    setFees("");
    setEditingCourse(null);
  };

  // =========================
  // SAVE / UPDATE COURSE
  // =========================

  const saveCourse = async () => {
    if (!courseName.trim() || !duration.trim() || !fees) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      if (editingCourse) {
        await api.put(
          `/course/update/${editingCourse._id}`,
          {
            courseName,
            duration,
            fees,
            status: editingCourse.status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Course Updated Successfully");
      } else {
        await api.post(
          `/course/add/${id}`,
          {
            courseName,
            duration,
            fees,
            status: "Active",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Course Added Successfully");
      }

      await fetchCourses();

      resetCourseForm();
      setShowModal(false);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  // =========================
  // EDIT COURSE
  // =========================

  const editCourse = (course) => {
    setEditingCourse(course);

    setCourseName(course.courseName || "");
    setDuration(course.duration || "");
    setFees(course.fees || "");
    setCourseMode(course.courseMode || "Online");

    setShowModal(true);
  };

  // =========================
  // DELETE COURSE
  // =========================

  const deleteCourse = async (courseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/course/delete/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Course Deleted Successfully");

      await fetchCourses();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to delete course"
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center shadow-xl shadow-cyan-200 animate-pulse">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>

          <p className="mt-5 text-lg font-semibold text-slate-700">
            Loading University...
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Please wait a moment
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // UNIVERSITY NOT FOUND
  // =========================

  if (!university) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-xl">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-red-50 flex items-center justify-center">
            <Building2 className="h-8 w-8 text-red-500" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-800">
            University Not Found
          </h2>

          <p className="mt-2 text-slate-500">
            The requested university could not be found.
          </p>

          <Link
            to="/admin/universities"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 px-5 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:-translate-y-0.5"
          >
            <ArrowLeft size={18} />
            Back to Universities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      {/* =========================
          BACKGROUND EFFECTS
      ========================= */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-cyan-200/30 blur-[120px]" />

      <div className="pointer-events-none absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-sky-200/25 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[350px] w-[500px] rounded-full bg-blue-100/30 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* =========================
            BACK BUTTON
        ========================= */}

        <Link
          to="/admin/universities"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600"
        >
          <ArrowLeft size={18} />
          Back to Universities
        </Link>

        {/* =========================
            HERO CARD
        ========================= */}

        <div className="mt-6 overflow-hidden rounded-[32px] border border-white/80 bg-white/90 shadow-[0_25px_80px_rgba(14,165,233,0.12)] backdrop-blur-2xl">
          {/* Banner */}

          {university.universityBanner ? (
            <div className="relative h-56 overflow-hidden sm:h-72 lg:h-80">
              <img
                src={university.universityBanner}
                alt={university.universityName}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-8">
                <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                  <Building2 size={16} />
                  University Profile
                </div>

                <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                  {university.universityName}
                </h1>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 p-8 sm:p-10">
              <div className="flex items-center gap-3 text-white/80">
                <Building2 size={20} />
                University Profile
              </div>

              <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                {university.universityName}
              </h1>
            </div>
          )}

          <div className="p-6 sm:p-8">
            {/* University Header */}

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                {university.universityLogo ? (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-slate-100 bg-white p-3 shadow-lg">
                    <img
                      src={university.universityLogo}
                      alt={university.universityName}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-sky-600 shadow-lg shadow-cyan-200">
                    <GraduationCap className="h-9 w-9 text-white" />
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">
                    {university.universityName}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={15} className="text-cyan-500" />
                      {university.location || "Location not available"}
                    </span>

                    {university.country && (
                      <span className="text-slate-300">•</span>
                    )}

                    {university.country && (
                      <span>{university.country}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status */}

              <span
                className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                  university.status === "Approved"
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                    : university.status === "Pending"
                    ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                    : "bg-red-50 text-red-700 ring-1 ring-red-200"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    university.status === "Approved"
                      ? "bg-emerald-500"
                      : university.status === "Pending"
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                />

                {university.status || "Unknown"}
              </span>
            </div>

            {/* =========================
                QUICK STATS
            ========================= */}

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-cyan-100 bg-cyan-50/70 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100">
                    <BookOpen className="h-5 w-5 text-cyan-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Total Courses
                    </p>

                    <p className="text-2xl font-black text-slate-800">
                      {courses.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                    <Trophy className="h-5 w-5 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Ranking
                    </p>

                    <p className="text-2xl font-black text-slate-800">
                      {university.ranking || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
                    <Award className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Placement
                    </p>

                    <p className="text-2xl font-black text-slate-800">
                      {university.placementPercentage || 0}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-purple-100 bg-purple-50/70 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
                    <IndianRupee className="h-5 w-5 text-purple-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Application Fee
                    </p>

                    <p className="text-xl font-black text-slate-800">
                      ₹
                      {Number(
                        university.applicationFee || 0
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            UNIVERSITY INFORMATION
        ========================= */}

        <div className="mt-8 rounded-[32px] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_rgba(14,165,233,0.10)] backdrop-blur-2xl sm:p-8">
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-wider text-cyan-500">
              University Details
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-800">
              Complete Information
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Location */}

            <InfoCard
              icon={<MapPin size={20} />}
              title="Location"
              value={university.location}
            />

            <InfoCard
              icon={<Globe2 size={20} />}
              title="Country"
              value={university.country || "N/A"}
            />

            <InfoCard
              icon={<Building2 size={20} />}
              title="State"
              value={university.state || "N/A"}
            />

            <InfoCard
              icon={<MapPin size={20} />}
              title="City"
              value={university.city || "N/A"}
            />

            <InfoCard
              icon={<Trophy size={20} />}
              title="Ranking"
              value={university.ranking || "N/A"}
            />

            <InfoCard
              icon={<Award size={20} />}
              title="Accreditation"
              value={university.accreditation || "N/A"}
            />

            <InfoCard
              icon={<Mail size={20} />}
              title="Email"
              value={university.email || "N/A"}
            />

            <InfoCard
              icon={<Phone size={20} />}
              title="Phone Number"
              value={university.phoneNumber || "N/A"}
            />

            {/* Website */}

            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 md:col-span-2">
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Globe2 size={18} className="text-cyan-500" />
                Website
              </div>

              {university.website ? (
                <a
                  href={university.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all font-semibold text-cyan-600 transition hover:text-cyan-700 hover:underline"
                >
                  {university.website}
                </a>
              ) : (
                <p className="font-semibold text-slate-700">N/A</p>
              )}
            </div>

            {/* Description */}

            <TextCard
              title="Description"
              value={university.description || "N/A"}
            />

            <TextCard
              title="Eligibility"
              value={university.eligibility || "N/A"}
            />

            <TextCard
              title="Admission Process"
              value={university.admissionProcess || "N/A"}
            />

            {/* Placement */}

            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
              <p className="mb-4 text-sm font-semibold text-slate-500">
                Placement Details
              </p>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400">
                    Placement Percentage
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-800">
                    {university.placementPercentage || 0}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Highest Package
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-800">
                    ₹
                    {Number(
                      university.highestPackage || 0
                    ).toLocaleString("en-IN")}{" "}
                    LPA
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Average Package
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-800">
                    ₹
                    {Number(
                      university.averagePackage || 0
                    ).toLocaleString("en-IN")}{" "}
                    LPA
                  </p>
                </div>
              </div>
            </div>

            {/* Application Fee */}

            <InfoCard
              icon={<IndianRupee size={20} />}
              title="Application Fee"
              value={`₹${Number(
                university.applicationFee || 0
              ).toLocaleString("en-IN")}`}
            />
          </div>

          {/* =========================
              APPROVALS
          ========================= */}

          <div className="mt-6 rounded-2xl border border-cyan-100 bg-cyan-50/60 p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-cyan-600" />

              <p className="font-bold text-slate-800">
                Approvals & Certifications
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {university.naacVerified && (
                <ApprovalBadge text="NAAC Verified" />
              )}

              {university.ugcApproved && (
                <ApprovalBadge text="UGC Approved" />
              )}

              {university.aiuApproved && (
                <ApprovalBadge text="AIU Approved" />
              )}

              {university.nirfRanked && (
                <ApprovalBadge text="NIRF Ranked" />
              )}

              {!university.naacVerified &&
                !university.ugcApproved &&
                !university.aiuApproved &&
                !university.nirfRanked && (
                  <span className="text-sm text-slate-500">
                    No approval information available.
                  </span>
                )}
            </div>
          </div>

          {/* =========================
              FACILITIES
          ========================= */}

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FeatureStatus
              icon={<Home size={19} />}
              title="Hostel Available"
              active={university.hostelAvailable}
            />

            <FeatureStatus
              icon={<Award size={19} />}
              title="Scholarship Available"
              active={university.scholarshipAvailable}
            />

            <FeatureStatus
              icon={<Clock size={19} />}
              title="Admission Open"
              active={university.admissionOpen}
            />
          </div>
        </div>

        {/* =========================
            COURSES SECTION
        ========================= */}

        <div className="mt-8 overflow-hidden rounded-[32px] border border-white/80 bg-white/90 shadow-[0_25px_80px_rgba(14,165,233,0.10)] backdrop-blur-2xl">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-cyan-500">
                Academic Programs
              </p>

              <h2 className="mt-1 text-2xl font-extrabold text-slate-800">
                Courses
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage all courses offered by this university.
              </p>
            </div>

            <button
              onClick={() => {
                resetCourseForm();
                setShowModal(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 px-5 py-3 font-bold text-white shadow-lg shadow-cyan-200 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Plus size={19} />
              Add Course
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead>
                <tr className="bg-slate-50/80 text-left text-sm text-slate-500">
                  <th className="px-6 py-4 font-semibold">
                    Course
                  </th>

                  <th className="px-6 py-4 text-center font-semibold">
                    Duration
                  </th>

                  <th className="px-6 py-4 text-center font-semibold">
                    Fees
                  </th>

                  <th className="px-6 py-4 text-center font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {courses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-14 text-center"
                    >
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50">
                        <BookOpen className="h-8 w-8 text-cyan-500" />
                      </div>

                      <h3 className="mt-4 font-bold text-slate-700">
                        No Courses Found
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Add a course to get started.
                      </p>
                    </td>
                  </tr>
                ) : (
                  courses.map((course) => (
                    <tr
                      key={course._id}
                      className="border-t border-slate-100 transition hover:bg-cyan-50/40"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100">
                            <GraduationCap className="h-5 w-5 text-cyan-600" />
                          </div>

                          <div>
                            <p className="font-bold text-slate-800">
                              {course.courseName}
                            </p>

                            <p className="text-xs text-slate-400">
                              Academic Program
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-center font-medium text-slate-600">
                        {course.duration} Years
                      </td>

                      <td className="px-6 py-5 text-center font-bold text-slate-700">
                        ₹
                        {Number(
                          course.fees || 0
                        ).toLocaleString("en-IN")}
                        <span className="ml-1 text-xs font-medium text-slate-400">
                          LPA
                        </span>
                      </td>

                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {course.status || "Active"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => editCourse(course)}
                            title="Edit Course"
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition hover:bg-amber-100"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            onClick={() =>
                              deleteCourse(course._id)
                            }
                            title="Delete Course"
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* =========================
          COURSE MODAL
      ========================= */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white bg-white shadow-[0_30px_100px_rgba(15,23,42,0.25)]">
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-cyan-50 to-sky-50 px-6 py-5 sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-600">
                  Academic Program
                </p>

                <h2 className="mt-1 text-2xl font-extrabold text-slate-800">
                  {editingCourse ? "Edit Course" : "Add Course"}
                </h2>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetCourseForm();
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition hover:bg-red-50 hover:text-red-500"
              >
                <X size={19} />
              </button>
            </div>

            {/* Modal Body */}

            <div className="max-h-[70vh] overflow-y-auto p-6 sm:p-7">
              <div className="space-y-5">
                {/* Course Name */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Course Name
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. B.Tech Computer Science"
                    value={courseName}
                    onChange={(e) =>
                      setCourseName(e.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  />
                </div>

                {/* Duration */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Duration
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. 4"
                    value={duration}
                    onChange={(e) =>
                      setDuration(e.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  />
                </div>

                {/* Course Mode */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Course Mode
                  </label>

                  <select
                    value={courseMode}
                    onChange={(e) =>
                      setCourseMode(e.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                {/* Fees */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Fees
                  </label>

                  <div className="relative">
                    <IndianRupee
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500"
                    />

                    <input
                      type="number"
                      placeholder="e.g. 2.5"
                      value={fees}
                      onChange={(e) =>
                        setFees(e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />
                  </div>

                  <p className="mt-1.5 text-xs text-slate-400">
                    Enter fees in LPA.
                  </p>
                </div>
              </div>

              {/* Buttons */}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={saveCourse}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-cyan-200 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <Save size={18} />

                  {editingCourse
                    ? "Update Course"
                    : "Save Course"}
                </button>

                <button
                  onClick={() => {
                    setShowModal(false);
                    resetCourseForm();
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 font-bold text-slate-600 transition hover:bg-red-50 hover:text-red-600"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================
   INFO CARD
========================================= */

function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition hover:border-cyan-100 hover:bg-cyan-50/40">
      <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
        <span className="text-cyan-500">{icon}</span>
        {title}
      </div>

      <p className="break-words font-bold text-slate-800">
        {value || "N/A"}
      </p>
    </div>
  );
}

/* =========================================
   TEXT CARD
========================================= */

function TextCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 md:col-span-2">
      <p className="mb-2 text-sm font-semibold text-slate-500">
        {title}
      </p>

      <p className="whitespace-pre-line leading-7 text-slate-700">
        {value || "N/A"}
      </p>
    </div>
  );
}

/* =========================================
   APPROVAL BADGE
========================================= */

function ApprovalBadge({ text }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-cyan-700 shadow-sm ring-1 ring-cyan-100">
      <CheckCircle2 size={16} className="text-cyan-500" />
      {text}
    </span>
  );
}

/* =========================================
   FEATURE STATUS
========================================= */

function FeatureStatus({ icon, title, active }) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        active
          ? "border-emerald-100 bg-emerald-50/70"
          : "border-slate-100 bg-slate-50/70"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              active ? "bg-emerald-100" : "bg-slate-100"
            }`}
          >
            <span
              className={
                active ? "text-emerald-600" : "text-slate-400"
              }
            >
              {icon}
            </span>
          </div>

          <p className="text-sm font-bold text-slate-700">
            {title}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            active
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {active ? "Yes" : "No"}
        </span>
      </div>
    </div>
  );
}