import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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

  //fetch university
  const fetchUniversity = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/university/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        setUniversity(res.data.university);
      }
    } catch (error) {
      toast.error("Failed to load university");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/course/university/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        setCourses(res.data.courses);
      }
    } catch (error) {
      toast.error("Failed to load courses");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await fetchUniversity();
      await fetchCourses();

      setLoading(false);
    };

    loadData();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  if (!university) {
    return <div className="p-8 text-white">University Not Found</div>;
  }

  const saveCourse = async () => {
    if (!courseName || !duration || !fees) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (editingCourse) {
        await axios.put(
          `http://localhost:8000/api/v1/course/update/${editingCourse._id}`,
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
          },
        );

        toast.success("Course Updated");
      } else {
        await axios.post(
          `http://localhost:8000/api/v1/course/add/${id}`,
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
          },
        );

        toast.success("Course Added");
      }

      fetchCourses();

      setCourseName("");
      setDuration("");
      setFees("");
      setEditingCourse(null);
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editCourse = (course) => {
    setEditingCourse(course);

    setCourseName(course.courseName);

    setDuration(course.duration);

    setFees(course.fees);

    setShowModal(true);
  };

  //delet course
  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/course/delete/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Course Deleted");

      fetchCourses();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Link
        to="/admin/universities"
        className="text-cyan-400 hover:text-cyan-300 text-sm sm:text-base"
      >
        ← Back
      </Link>

      <div className="glass p-4 sm:p-6 lg:p-8 rounded-3xl mt-6">
        {university.universityBanner && (
          <img
            src={university.universityBanner}
            alt={university.universityName}
            className="
w-full
h-48
sm:h-64
lg:h-72
object-cover
rounded-3xl
mb-6
"
          />
        )}

        {university.universityLogo && (
          <img
            src={university.universityLogo}
            alt={university.universityName}
            className="
      w-16
      h-16
      sm:w-20
      sm:h-20
      lg:w-24
      lg:h-24
      object-contain
      mb-4
    "
          />
        )}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
          {university.universityName}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-400">Location</p>
            <p>{university.location}</p>
          </div>

          <div>
            <p className="text-gray-400">Ranking</p>
            <p>{university.ranking}</p>
          </div>

          <div>
            <p className="text-gray-400">Fees</p>
            <p>
              ₹ {Number(university.applicationFee || 0).toLocaleString("en-IN")}{" "}
              LPA
            </p>{" "}
          </div>

          <div>
            <p className="text-gray-400">Status</p>
            <p
              className={
                university.status === "Approved"
                  ? "text-green-400"
                  : university.status === "Pending"
                    ? "text-yellow-400"
                    : "text-red-400"
              }
            >
              {university.status}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-400">Approvals</p>
            <div className="flex gap-2 flex-wrap mt-2">
              {university.naacVerified && (
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full">
                  NAAC
                </span>
              )}

              {university.ugcApproved && (
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full">
                  UGC
                </span>
              )}

              {university.aiuApproved && (
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full">
                  AIU
                </span>
              )}

              {university.nirfRanked && (
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full">
                  NIRF
                </span>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-400">Description</p>
            <p>{university.description}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-400">Eligibility</p>
            <p>{university.eligibility}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-400">Admission Process</p>
            <p>{university.admissionProcess}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-400">Placement Percentage</p>
            <p>{university.placementPercentage || 0}%</p>

            <p className="text-gray-400 mt-3">Highest Package</p>
            <p>
              ₹ {Number(university.highestPackage || 0).toLocaleString("en-IN")}
              LPA
            </p>

            <p className="text-gray-400 mt-3">Average Package</p>
            <p>
              ₹ {Number(university.averagePackage || 0).toLocaleString("en-IN")}
              LPA
            </p>
          </div>

          <div>
            <p className="text-gray-400">Total Courses</p>
            <p>{courses.length}</p>
          </div>

          <div>
            <p className="text-gray-400">Country</p>
            <p>{university.country || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400">State</p>
            <p>{university.state || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400">City</p>
            <p>{university.city || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400">Website</p>
            <a
              href={university.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400"
            >
              {university.website || "N/A"}
            </a>
          </div>

          <div>
            <p className="text-gray-400">Email</p>
            <p>{university.email || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400">Phone Number</p>
            <p>{university.phoneNumber || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400">Accreditation</p>
            <p>{university.accreditation || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400">Application Fee</p>
            <p>
              ₹ {Number(university.applicationFee || 0).toLocaleString("en-IN")}{" "}
              LPA
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-400">Eligibility</p>
            <p>{university.eligibility || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400">Admission Open</p>
            <p>{university.admissionOpen ? "Yes" : "No"}</p>
          </div>

          <div>
            <p className="text-gray-400">Hostel Available</p>
            <p>{university.hostelAvailable ? "Yes" : "No"}</p>
          </div>

          <div>
            <p className="text-gray-400">Scholarship Available</p>
            <p>{university.scholarshipAvailable ? "Yes" : "No"}</p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingCourse(null);
            setCourseName("");
            setDuration("");
            setFees("");
            setShowModal(true);
          }}
          className="
mt-6
bg-cyan-500
px-5
py-3
rounded-xl
w-full
sm:w-auto
"
        >
          Add Course
        </button>
      </div>

      <div className="glass p-4 sm:p-6 lg:p-8 rounded-3xl mt-8 overflow-x-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Courses</h2>

        <table className="min-w-[750px] w-full table-fixed">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-4 text-left w-[30%]">Course</th>

              <th className="py-4 text-center w-[15%]">Duration</th>

              <th className="py-4 text-center w-[20%]">Fees</th>

              <th className="py-4 text-center w-[15%]">Status</th>

              <th className="py-4 text-center w-[20%]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">
                  No Courses Found
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-5">{course.courseName}</td>

                  <td className="text-center">{course.duration} Years</td>

                  <td className="text-center">
                    ₹{Number(course.fees).toLocaleString("en-IN")}LPA
                  </td>

                  <td className="text-center">
                    <span
                      className="
                px-3
                py-1
                rounded-full
                text-sm
                bg-green-500/20
                text-green-400
                "
                    >
                      {course.status || "Active"}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center flex-wrap gap-3">
                      <button
                        onClick={() => editCourse(course)}
                        className="
                  p-2.5
                  rounded-lg
                  bg-yellow-500/20
                  hover:bg-yellow-500/30
                  "
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deleteCourse(course._id)}
                        className="
                  p-2.5
                  rounded-lg
                  bg-red-500/20
                  hover:bg-red-500/30
                  "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div
            className="
  glass
  p-4
  sm:p-6
  lg:p-8
  rounded-3xl
  w-full
  max-w-lg
  max-h-[90vh]
  overflow-y-auto
"
          >
            <h2 className="text-2xl font-bold mb-6">
              {editingCourse ? "Edit Course" : "Add Course"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Course Name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="
w-full
p-3
rounded-xl
bg-white/5
border
border-white/10
outline-none
text-sm
sm:text-base
"
              />

              <input
                type="text"
                placeholder="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="
w-full
p-3
rounded-xl
bg-white/5
border
border-white/10
outline-none
text-sm
sm:text-base
"
              />

              <select
                value={courseMode}
                onChange={(e) => setCourseMode(e.target.value)}
                className="
    w-full
    p-3
    rounded-xl
    bg-white/5
    border
    border-white/10
    outline-none
    text-sm
    sm:text-base
  "
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>

              <input
                type="number"
                placeholder="Fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="
w-full
p-3
rounded-xl
bg-white/5
border
border-white/10
outline-none
text-sm
sm:text-base
"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={saveCourse}
                className="
bg-cyan-500
px-5
py-3
rounded-xl
hover:bg-cyan-600
w-full
sm:w-auto
"
              >
                {editingCourse ? "Update Course" : "Save Course"}
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingCourse(null);
                  setCourseName("");
                  setDuration("");
                  setFees("");
                }}
                className="
bg-red-500
px-5
py-3
rounded-xl
hover:bg-red-600
w-full
sm:w-auto
"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
