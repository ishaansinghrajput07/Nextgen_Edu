import { useState, useEffect } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  Check,
  EyeOff,
  Search,
  MapPin,
  GraduationCap,
  X,
  Upload,
  Building2,
  ShieldCheck,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function UniversitiesAdmin() {
  const [universities, setUniversities] = useState([]);
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);

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
        await axios.post(
          "http://localhost:8000/api/v1/university/add",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );

        toast.success("University Added");
      }

      getUniversities();
      setShowModal(false);
      setEditingId(null);
      setFormData(initialFormData);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong",
      );
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
      toast.error(
        error.response?.data?.message || "Delete failed",
      );
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

      setUniversities(res.data.universities || []);
    } catch (error) {
      console.log(error);
    }
  };

  const approveUniversity = async (id) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/v1/university/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("University Approved");
      getUniversities();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Approval failed",
      );
    }
  };

  const hideUniversity = async (id) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/v1/university/hide/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("University Hidden");
      getUniversities();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong",
      );
    }
  };

  const editUniversity = (university) => {
    setEditingId(university._id);

    setFormData({
      universityName: university.universityName || "",
      location: university.location || "",
      country: university.country || "",
      state: university.state || "",
      city: university.city || "",
      website: university.website || "",
      email: university.email || "",
      phoneNumber: university.phoneNumber || "",
      description: university.description || "",
      ranking: university.ranking || "",
      establishedYear: university.establishedYear || "",
      universityType: university.universityType || "Private",

      naacVerified: university.naacVerified || false,
      ugcApproved: university.ugcApproved || false,
      aiuApproved: university.aiuApproved || false,
      nirfRanked: university.nirfRanked || false,

      accreditation: university.accreditation || "",
      eligibility: university.eligibility || "",
      admissionProcess: university.admissionProcess || "",

      applicationFee: university.applicationFee || "",
      averageTuitionFee: university.averageTuitionFee || "",
      placementPercentage: university.placementPercentage || "",
      highestPackage: university.highestPackage || "",
      averagePackage: university.averagePackage || "",

      admissionOpen:
        university.admissionOpen !== undefined
          ? university.admissionOpen
          : true,

      hostelAvailable: university.hostelAvailable || false,
      scholarshipAvailable: university.scholarshipAvailable || false,

      status: university.status || "Pending",

      universityLogo: university.universityLogo || "",
      universityBanner: university.universityBanner || "",
    });

    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialFormData);
    setShowModal(true);
  };

  const filteredUniversities = universities.filter((university) => {
    const query = search.toLowerCase();

    return (
      university.universityName?.toLowerCase().includes(query) ||
      university.city?.toLowerCase().includes(query) ||
      university.state?.toLowerCase().includes(query) ||
      university.country?.toLowerCase().includes(query)
    );
  });

  const getStatusStyle = (status) => {
    const normalized = status?.toLowerCase();

    if (normalized === "approved") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (normalized === "hidden") {
      return "bg-slate-100 text-slate-600 border-slate-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all";

  const labelClass =
    "block text-sm font-semibold text-slate-700 mb-2";

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center shadow-lg shadow-cyan-200">
              <Building2 className="text-white" size={22} />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                Universities
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Manage universities, approvals and information
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            px-5
            py-3
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-sky-600
            text-white
            font-semibold
            shadow-lg
            shadow-cyan-200
            hover:shadow-xl
            hover:-translate-y-0.5
            transition-all
            duration-300
            w-full
            lg:w-auto
          "
        >
          <Plus size={19} />
          Add University
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Universities
              </p>

              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                {universities.length}
              </h3>
            </div>

            <div className="h-11 w-11 rounded-xl bg-cyan-50 flex items-center justify-center">
              <Building2
                size={21}
                className="text-cyan-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Approved
              </p>

              <h3 className="text-2xl font-bold text-emerald-600 mt-1">
                {
                  universities.filter(
                    (item) =>
                      item.status?.toLowerCase() ===
                      "approved",
                  ).length
                }
              </h3>
            </div>

            <div className="h-11 w-11 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Check
                size={21}
                className="text-emerald-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <h3 className="text-2xl font-bold text-amber-600 mt-1">
                {
                  universities.filter(
                    (item) =>
                      item.status?.toLowerCase() ===
                        "pending" ||
                      !item.status,
                  ).length
                }
              </h3>
            </div>

            <div className="h-11 w-11 rounded-xl bg-amber-50 flex items-center justify-center">
              <ShieldCheck
                size={21}
                className="text-amber-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search + Table */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-[0_15px_50px_rgba(15,23,42,0.07)] overflow-hidden">
        {/* Table Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              University Records
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {filteredUniversities.length} universities found
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search university..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                pl-11
                pr-4
                py-3
                rounded-xl
                bg-slate-50
                border
                border-slate-200
                outline-none
                text-sm
                text-slate-700
                placeholder:text-slate-400
                focus:border-cyan-400
                focus:ring-4
                focus:ring-cyan-100
                transition-all
              "
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-[1050px] w-full">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  University
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Location
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Courses
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUniversities.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-16 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 rounded-2xl bg-cyan-50 flex items-center justify-center mb-4">
                        <GraduationCap
                          size={30}
                          className="text-cyan-500"
                        />
                      </div>

                      <h3 className="font-semibold text-slate-700">
                        No Universities Found
                      </h3>

                      <p className="text-sm text-slate-400 mt-1">
                        Add a university or change your search.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUniversities.map((university) => (
                  <tr
                    key={university._id}
                    className="
                      border-b
                      border-slate-100
                      last:border-0
                      hover:bg-cyan-50/30
                      transition-colors
                    "
                  >
                    {/* University */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                          {university.universityLogo ? (
                            <img
                              src={university.universityLogo}
                              alt={university.universityName}
                              className="h-full w-full object-contain p-1"
                            />
                          ) : (
                            <GraduationCap
                              size={22}
                              className="text-cyan-500"
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 truncate max-w-[280px]">
                            {university.universityName}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            {university.universityType ||
                              "University"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-2">
                        <MapPin
                          size={16}
                          className="text-cyan-500 mt-0.5 shrink-0"
                        />

                        <div>
                          <p className="font-medium text-slate-700">
                            {university.city || "N/A"}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            {[
                              university.state,
                              university.country,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Courses */}
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-semibold">
                        <GraduationCap size={15} />

                        {Array.isArray(university.courses)
                          ? university.courses.length
                          : 0}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`
                          inline-flex
                          items-center
                          px-3
                          py-1.5
                          rounded-full
                          border
                          text-xs
                          font-bold
                          ${getStatusStyle(
                            university.status,
                          )}
                        `}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current mr-2" />

                        {university.status || "Pending"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {/* View */}
                        <Link
                          to={`/admin/university/${university._id}`}
                          title="View"
                          className="
                            h-9
                            w-9
                            rounded-xl
                            bg-cyan-50
                            border
                            border-cyan-100
                            text-cyan-600
                            flex
                            items-center
                            justify-center
                            hover:bg-cyan-100
                            transition
                          "
                        >
                          <Eye size={16} />
                        </Link>

                        {/* Approve */}
                        <button
                          disabled={
                            university.status === "Approved"
                          }
                          onClick={() =>
                            approveUniversity(
                              university._id,
                            )
                          }
                          title="Approve"
                          className={`
                            h-9
                            px-3
                            rounded-xl
                            text-xs
                            font-semibold
                            flex
                            items-center
                            gap-1.5
                            border
                            transition
                            ${
                              university.status ===
                              "Approved"
                                ? "bg-emerald-50 text-emerald-400 border-emerald-100 cursor-not-allowed"
                                : "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100"
                            }
                          `}
                        >
                          <Check size={14} />
                          Approve
                        </button>

                        {/* Hide */}
                        <button
                          disabled={
                            university.status === "Hidden"
                          }
                          onClick={() =>
                            hideUniversity(
                              university._id,
                            )
                          }
                          title="Hide"
                          className={`
                            h-9
                            px-3
                            rounded-xl
                            text-xs
                            font-semibold
                            flex
                            items-center
                            gap-1.5
                            border
                            transition
                            ${
                              university.status ===
                              "Hidden"
                                ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                            }
                          `}
                        >
                          <EyeOff size={14} />
                          Hide
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() =>
                            editUniversity(university)
                          }
                          title="Edit"
                          className="
                            h-9
                            w-9
                            rounded-xl
                            bg-amber-50
                            border
                            border-amber-100
                            text-amber-600
                            flex
                            items-center
                            justify-center
                            hover:bg-amber-100
                            transition
                          "
                        >
                          <Pencil size={15} />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() =>
                            deleteUniversity(
                              university._id,
                            )
                          }
                          title="Delete"
                          className="
                            h-9
                            w-9
                            rounded-xl
                            bg-rose-50
                            border
                            border-rose-100
                            text-rose-600
                            flex
                            items-center
                            justify-center
                            hover:bg-rose-100
                            transition
                          "
                        >
                          <Trash2 size={15} />
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

      {/* Add / Edit Modal */}
      {showModal && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-slate-900/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-3
            sm:p-5
          "
        >
          <div
            className="
              bg-white
              w-full
              max-w-4xl
              max-h-[94vh]
              overflow-hidden
              rounded-3xl
              shadow-[0_30px_100px_rgba(15,23,42,0.25)]
              border
              border-slate-100
              flex
              flex-col
            "
          >
            {/* Modal Header */}
            <div className="px-5 sm:px-7 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-cyan-50 flex items-center justify-center">
                    <Building2
                      size={20}
                      className="text-cyan-600"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                      {editingId
                        ? "Edit University"
                        : "Add University"}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                      Enter university information below
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                  setFormData(initialFormData);
                }}
                className="
                  h-10
                  w-10
                  rounded-xl
                  bg-slate-100
                  text-slate-500
                  flex
                  items-center
                  justify-center
                  hover:bg-slate-200
                  transition
                "
              >
                <X size={19} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 overflow-y-auto">
              {/* Basic Information */}
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-7 w-7 rounded-lg bg-cyan-50 flex items-center justify-center">
                    <Building2
                      size={15}
                      className="text-cyan-600"
                    />
                  </div>

                  <h3 className="font-bold text-slate-800">
                    Basic Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      University Name
                    </label>

                    <input
                      type="text"
                      name="universityName"
                      placeholder="Enter university name"
                      value={formData.universityName}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      placeholder="Enter location"
                      value={formData.location}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      University Type
                    </label>

                    <select
                      name="universityType"
                      value={formData.universityType}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="Private">
                        Private
                      </option>
                      <option value="Public">
                        Public
                      </option>
                      <option value="Government">
                        Government
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Country
                    </label>

                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      State
                    </label>

                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Established Year
                    </label>

                    <input
                      type="number"
                      name="establishedYear"
                      placeholder="Established year"
                      value={formData.establishedYear}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-7 w-7 rounded-lg bg-sky-50 flex items-center justify-center">
                    <Eye
                      size={15}
                      className="text-sky-600"
                    />
                  </div>

                  <h3 className="font-bold text-slate-800">
                    Contact Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Website
                    </label>

                    <input
                      type="text"
                      name="website"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="university@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Phone Number
                    </label>

                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Accreditation
                    </label>

                    <input
                      type="text"
                      name="accreditation"
                      placeholder="Accreditation"
                      value={formData.accreditation}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-7 w-7 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Upload
                      size={15}
                      className="text-purple-600"
                    />
                  </div>

                  <h3 className="font-bold text-slate-800">
                    University Images
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Logo */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <label className={labelClass}>
                      University Logo
                    </label>

                    {formData.universityLogo && (
                      <img
                        src={
                          typeof formData.universityLogo ===
                          "string"
                            ? formData.universityLogo
                            : URL.createObjectURL(
                                formData.universityLogo,
                              )
                        }
                        alt="logo"
                        className="
                          w-full
                          h-32
                          object-contain
                          rounded-xl
                          bg-white
                          border
                          border-slate-200
                          p-3
                          mb-3
                        "
                      />
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];

                        if (!file) return;

                        setFormData((prev) => ({
                          ...prev,
                          universityLogo: file,
                        }));
                      }}
                      className="
                        w-full
                        text-sm
                        text-slate-500
                        file:mr-4
                        file:py-2
                        file:px-4
                        file:rounded-xl
                        file:border-0
                        file:bg-cyan-50
                        file:text-cyan-700
                        file:font-semibold
                        hover:file:bg-cyan-100
                      "
                    />
                  </div>

                  {/* Banner */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <label className={labelClass}>
                      University Banner
                    </label>

                    {formData.universityBanner && (
                      <img
                        src={
                          typeof formData.universityBanner ===
                          "string"
                            ? formData.universityBanner
                            : URL.createObjectURL(
                                formData.universityBanner,
                              )
                        }
                        alt="banner"
                        className="
                          w-full
                          h-32
                          object-cover
                          rounded-xl
                          bg-white
                          border
                          border-slate-200
                          mb-3
                        "
                      />
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];

                        if (!file) return;

                        setFormData((prev) => ({
                          ...prev,
                          universityBanner: file,
                        }));
                      }}
                      className="
                        w-full
                        text-sm
                        text-slate-500
                        file:mr-4
                        file:py-2
                        file:px-4
                        file:rounded-xl
                        file:border-0
                        file:bg-sky-50
                        file:text-sky-700
                        file:font-semibold
                        hover:file:bg-sky-100
                      "
                    />
                  </div>
                </div>
              </div>

              {/* Verification */}
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-7 w-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <ShieldCheck
                      size={15}
                      className="text-emerald-600"
                    />
                  </div>

                  <h3 className="font-bold text-slate-800">
                    Verification & Facilities
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    ["naacVerified", "NAAC"],
                    ["ugcApproved", "UGC"],
                    ["aiuApproved", "AIU"],
                    ["nirfRanked", "NIRF"],
                  ].map(([name, label]) => (
                    <label
                      key={name}
                      className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        cursor-pointer
                        hover:bg-cyan-50
                        hover:border-cyan-200
                        transition
                      "
                    >
                      <input
                        type="checkbox"
                        name={name}
                        checked={formData[name]}
                        onChange={handleChange}
                        className="h-4 w-4 accent-cyan-600"
                      />

                      <span className="text-sm font-semibold text-slate-700">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  {[
                    ["admissionOpen", "Admission Open"],
                    ["hostelAvailable", "Hostel Available"],
                    [
                      "scholarshipAvailable",
                      "Scholarship Available",
                    ],
                  ].map(([name, label]) => (
                    <label
                      key={name}
                      className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        cursor-pointer
                        hover:bg-cyan-50
                        hover:border-cyan-200
                        transition
                      "
                    >
                      <input
                        type="checkbox"
                        name={name}
                        checked={formData[name]}
                        onChange={handleChange}
                        className="h-4 w-4 accent-cyan-600"
                      />

                      <span className="text-sm font-semibold text-slate-700">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Academic Information */}
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-7 w-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <GraduationCap
                      size={15}
                      className="text-indigo-600"
                    />
                  </div>

                  <h3 className="font-bold text-slate-800">
                    Academic Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Ranking
                    </label>

                    <input
                      type="text"
                      name="ranking"
                      placeholder="University ranking"
                      value={formData.ranking}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Placement Percentage
                    </label>

                    <input
                      type="number"
                      name="placementPercentage"
                      placeholder="Placement percentage"
                      value={formData.placementPercentage}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Highest Package
                    </label>

                    <input
                      type="number"
                      name="highestPackage"
                      placeholder="Highest package"
                      value={formData.highestPackage}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Average Package
                    </label>

                    <input
                      type="number"
                      name="averagePackage"
                      placeholder="Average package"
                      value={formData.averagePackage}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Application Fee
                    </label>

                    <input
                      type="number"
                      name="applicationFee"
                      placeholder="Application fee"
                      value={formData.applicationFee}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Average Tuition Fee
                    </label>

                    <input
                      type="number"
                      name="averageTuitionFee"
                      placeholder="Average tuition fee"
                      value={formData.averageTuitionFee}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-7">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className={labelClass}>
                      Description
                    </label>

                    <textarea
                      name="description"
                      placeholder="University description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Eligibility
                    </label>

                    <textarea
                      name="eligibility"
                      placeholder="Eligibility criteria"
                      value={formData.eligibility}
                      onChange={handleChange}
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Admission Process
                    </label>

                    <textarea
                      name="admissionProcess"
                      placeholder="Admission process"
                      value={formData.admissionProcess}
                      onChange={handleChange}
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 sm:px-7 py-4 border-t border-slate-100 bg-slate-50 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                  setFormData(initialFormData);
                }}
                className="
                  px-6
                  py-3
                  rounded-xl
                  bg-white
                  border
                  border-slate-200
                  text-slate-600
                  font-semibold
                  hover:bg-slate-100
                  transition
                  w-full
                  sm:w-auto
                "
              >
                Cancel
              </button>

              <button
                onClick={saveUniversity}
                className="
                  px-6
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-sky-600
                  text-white
                  font-semibold
                  shadow-lg
                  shadow-cyan-200
                  hover:shadow-xl
                  hover:-translate-y-0.5
                  transition-all
                  w-full
                  sm:w-auto
                "
              >
                {editingId
                  ? "Update University"
                  : "Save University"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}