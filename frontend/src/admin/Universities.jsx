import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function UniversitiesAdmin() {
  const [universities, setUniversities] = useState([]);
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    universityName: "",
    location: "",
    country: "",
    state: "",
    city: "",
    website: "",
    email: "",
    phoneNumber: "",
    description: "",
    ranking: "",
    establishedYear: "",
    universityType: "Private",

    naacVerified: false,
    ugcApproved: false,
    aiuApproved: false,
    nirfRanked: false,

    accreditation: "",
    eligibility: "",
    admissionProcess: "",

    applicationFee: "",
    averageTuitionFee: "",
    placementPercentage: "",
    highestPackage: "",
    averagePackage: "",

    admissionOpen: true,
    hostelAvailable: false,
    scholarshipAvailable: false,

    status: "Pending",

    universityLogo: "",
    universityBanner: "",
  });

  useEffect(() => {
    getUniversities();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveUniversity = async () => {
    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "universityLogo" && key !== "universityBanner") {
          if (value === "null") {
            data.append(key, "");
          } else {
            data.append(key, value);
          }
        }
      });

      if (formData.universityLogo) {
        data.append("logo", formData.universityLogo);
      }

      if (formData.universityBanner) {
        data.append("banner", formData.universityBanner);
      }

      if (editingId) {
        await axios.put(
          `http://localhost:8000/api/v1/university/update/${editingId}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        toast.success("University Updated");
      } else {
        await axios.post("http://localhost:8000/api/v1/university/add", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        toast.success("University Added");
      }

      getUniversities();

      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deleteUniversity = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/university/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("University Deleted");

      getUniversities();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const getUniversities = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8000/api/v1/university/alluniversity",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUniversities(res.data.universities);
    } catch (error) {
      console.log(error);
    }
  };

  const approveUniversity = async (id) => {
    await axios.patch(
      `http://localhost:8000/api/v1/university/approve/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    getUniversities();
  };

  const hideUniversity = async (id) => {
    await axios.patch(
      `http://localhost:8000/api/v1/university/hide/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    getUniversities();
  };

  const editUniversity = (university) => {
    setEditingId(university._id);

    setFormData({
      universityName: university.universityName,
      location: university.location,
      country: university.country,
      state: university.state,
      city: university.city,
      website: university.website,
      email: university.email,
      phoneNumber: university.phoneNumber,
      description: university.description,
      ranking: university.ranking,
      establishedYear: university.establishedYear,
      universityType: university.universityType,

      naacVerified: university.naacVerified,
      ugcApproved: university.ugcApproved,
      aiuApproved: university.aiuApproved,
      nirfRanked: university.nirfRanked,

      accreditation: university.accreditation,
      eligibility: university.eligibility,
      admissionProcess: university.admissionProcess,

      applicationFee: university.applicationFee,
      averageTuitionFee: university.averageTuitionFee,
      placementPercentage: university.placementPercentage,
      highestPackage: university.highestPackage,
      averagePackage: university.averagePackage,

      admissionOpen: university.admissionOpen,
      hostelAvailable: university.hostelAvailable,
      scholarshipAvailable: university.scholarshipAvailable,

      status: university.status,
      universityLogo: university.universityLogo,
      universityBanner: university.universityBanner,
    });

    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingId(null);

    setFormData({
      universityName: "",
      location: "",
      country: "",
      state: "",
      city: "",
      website: "",
      email: "",
      phoneNumber: "",
      description: "",
      ranking: "",
      establishedYear: "",
      universityType: "Private",

      naacVerified: false,
      ugcApproved: false,
      aiuApproved: false,
      nirfRanked: false,

      accreditation: "",
      eligibility: "",
      admissionProcess: "",

      applicationFee: "",
      averageTuitionFee: "",
      placementPercentage: "",
      highestPackage: "",
      averagePackage: "",

      admissionOpen: true,
      hostelAvailable: false,
      scholarshipAvailable: false,

      status: "Pending",

      universityLogo: "",
      universityBanner: "",
    });

    setShowModal(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div
        className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-4
                  mb-8
                "
      >
        <h1 className="text-2xl sm:text-3xl font-bold">Universities</h1>

        <button
          onClick={openAddModal}
          className="
                    bg-cyan-500
                    hover:bg-cyan-600
                    px-5
                    py-3
                    rounded-xl
                    w-full
                    sm:w-auto
                  "
        >
          Add University
        </button>
      </div>

      <div className="glass p-3 sm:p-6 rounded-3xl overflow-x-auto">
        <table className="min-w-[900px] w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4">University</th>

              <th className="text-left">Location</th>

              <th className="text-left">Courses</th>

              <th className="text-left">Status</th>

              <th className="text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {universities.map((university) => (
              <tr
                key={university._id}
                className="
                                  border-b
                                  border-white/5
                                  "
              >
                <td className="py-4">{university.universityName}</td>

                <td>
                  {university.city}, {university.state}, {university.country}
                </td>

                <td>
                  {Array.isArray(university.courses)
                    ? university.courses.length
                    : 0}
                </td>

                <td>
                  <span
                    className={
                      university.status === "approved"
                        ? "text-green-400"
                        : university.status === "hidden"
                          ? "text-red-400"
                          : "text-yellow-400"
                    }
                  >
                    {university.status}
                  </span>
                </td>

                <td>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/admin/university/${university._id}`}
                      className="
                      bg-cyan-500
                      px-3
                      py-1
                      rounded-lg
                      "
                    >
                      <Eye size={16} />
                    </Link>

                    <button
                      disabled={university.status === "Approved"}
                      onClick={() => approveUniversity(university._id)}
                      className={`
                                        text-xs sm:text-sm
                    px-3
                    py-1
                    rounded-lg
                    ${
                      university.status === "approved"
                        ? "bg-green-500/40 cursor-not-allowed"
                        : "bg-green-500"
                    }
                  `}
                    >
                      Approve
                    </button>

                    <button
                      disabled={university.status === "Hidden"}
                      onClick={() => hideUniversity(university._id)}
                      className={`
                                        text-xs sm:text-sm
                    px-3
                    py-1
                    rounded-lg
                    ${
                      university.status === "hidden"
                        ? "bg-gray-500/40 cursor-not-allowed"
                        : "bg-gray-500"
                    }
                  `}
                    >
                      Hide
                    </button>

                    <button
                      onClick={() => editUniversity(university)}
                      className="
                      text-xs sm:text-sm
      bg-yellow-500
      px-3
      py-1
      rounded-lg
      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteUniversity(university._id)}
                      className="
                      text-xs sm:text-sm
      bg-red-500
      px-3
      py-1
      rounded-lg
      "
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="
    fixed
    inset-0
    bg-black/70
    flex
    items-center
    justify-center
    z-50
    "
        >
          <div
            className="
                  glass
                  p-4
                  sm:p-6
                  lg:p-8
                  rounded-3xl
                  w-[95%]
                  sm:w-full
                  max-w-2xl
                  max-h-[90vh]
                  overflow-y-auto
                  "
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              {editingId ? "Edit University" : "Add University"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                name="universityName"
                placeholder="University Name"
                value={formData.universityName}
                onChange={handleChange}
                className="
                w-full
                p-3
                rounded-xl
                bg-white/5
                border
                border-white/10
                text-sm
                sm:text-base
                "
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="
                    w-full
                    p-3
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                    text-sm
                    sm:text-base
                    "
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Logo Upload */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <label className="block mb-3 font-semibold">
                    Upload Logo
                  </label>

                  {formData.universityLogo && (
                    <img
                      src={
                        typeof formData.universityLogo === "string"
                          ? formData.universityLogo
                          : URL.createObjectURL(formData.universityLogo)
                      }
                      alt="logo"
                      className="
                        w-full
                        h-32
                        object-contain
                        rounded-xl
                        mb-3
                        bg-white
                        p-2
                      "
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="w-full"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (!file) return;

                      setFormData((prev) => ({
                        ...prev,
                        universityLogo: file,
                      }));
                    }}
                  />
                </div>

                {/* Banner Upload */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <label className="block mb-3 font-semibold">
                    Upload Banner
                  </label>

                  {formData.universityBanner && (
                    <img
                      src={
                        typeof formData.universityBanner === "string"
                          ? formData.universityBanner
                          : URL.createObjectURL(formData.universityBanner)
                      }
                      alt="banner"
                      className="
                        w-full
                        h-32
                        object-cover
                        rounded-xl
                        mb-3
                      "
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="
                      w-full
                      p-3
                      rounded-xl
                      bg-white/5
                      border
                      border-white/10
                      text-sm
                      sm:text-base
                    "
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (!file) return;

                      setFormData((prev) => ({
                        ...prev,
                        universityBanner: file,
                      }));
                    }}
                  />
                </div>
              </div>

              <label>
                <input
                  type="checkbox"
                  name="naacVerified"
                  checked={formData.naacVerified}
                  onChange={handleChange}
                />
                NAAC
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="ugcApproved"
                  checked={formData.ugcApproved}
                  onChange={handleChange}
                />
                UGC
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="aiuApproved"
                  checked={formData.aiuApproved}
                  onChange={handleChange}
                />
                AIU
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="nirfRanked"
                  checked={formData.nirfRanked}
                  onChange={handleChange}
                />
                NIRF
              </label>

              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="admissionOpen"
                    checked={formData.admissionOpen}
                    onChange={handleChange}
                  />
                  Admission Open
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="hostelAvailable"
                    checked={formData.hostelAvailable}
                    onChange={handleChange}
                  />
                  Hostel Available
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="scholarshipAvailable"
                    checked={formData.scholarshipAvailable}
                    onChange={handleChange}
                  />
                  Scholarship Available
                </label>
              </div>

              <textarea
                name="description"
                placeholder="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5"
              />

              <textarea
                name="eligibility"
                placeholder="Eligibility"
                value={formData.eligibility}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5"
              />

              <textarea
                name="admissionProcess"
                placeholder="Admission Process"
                value={formData.admissionProcess}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5"
              />

              <input
                type="number"
                name="placementPercentage"
                placeholder="Placement Percentage"
                value={formData.placementPercentage}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              />

              <input
                type="text"
                name="ranking"
                placeholder="Ranking"
                value={formData.ranking}
                onChange={handleChange}
                className="
    w-full
    p-3
    rounded-xl
    bg-white/5
    border
    border-white/10
    text-sm
    sm:text-base
  "
              />

              <input
                type="number"
                name="highestPackage"
                placeholder="Highest Package"
                value={formData.highestPackage}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              />

              <input
                type="number"
                name="averagePackage"
                placeholder="Average Package"
                value={formData.averagePackage}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              />

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5"
              />

              <input
                type="text"
                name="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5"
              />

              <input
                type="text"
                name="accreditation"
                placeholder="Accreditation"
                value={formData.accreditation}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5"
              />

              <input
                type="number"
                name="applicationFee"
                placeholder="Application Fee"
                value={formData.applicationFee}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={saveUniversity}
                className="
              bg-cyan-500
              px-5
              py-3
              rounded-xl
              w-full
              sm:w-auto
              "
              >
                Save
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);

                  setFormData({
                    universityName: "",
                    location: "",
                    country: "",
                    state: "",
                    city: "",
                    website: "",
                    email: "",
                    phoneNumber: "",
                    description: "",
                    ranking: "",
                    establishedYear: "",
                    universityType: "Private",

                    naacVerified: false,
                    ugcApproved: false,
                    aiuApproved: false,
                    nirfRanked: false,

                    accreditation: "",
                    eligibility: "",
                    admissionProcess: "",

                    applicationFee: "",
                    averageTuitionFee: "",
                    placementPercentage: "",
                    highestPackage: "",
                    averagePackage: "",

                    admissionOpen: true,
                    hostelAvailable: false,
                    scholarshipAvailable: false,

                    status: "Pending",

                    universityLogo: "",
                    universityBanner: "",
                  });
                }}
                className="
                bg-red-500
                px-5
                py-3
                rounded-xl
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
