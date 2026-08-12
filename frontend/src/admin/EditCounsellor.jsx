import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditCounsellor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    designation: "",
    department: "",
    monthlyLeadTarget: "",
    monthlyAdmissionTarget: "",
  });

  const token = localStorage.getItem("token");

  console.log("Route ID =", id);

  // ==============================
  // GET COUNSELLOR
  // ==============================

  useEffect(() => {
    const fetchCounsellor = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/counsellor/admin/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("COUNSELLOR DATA:", res.data);

        if (res.data.success) {
          const data = res.data.counsellor;

          setFormData({
            name: data.name || "",
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            designation: data.designation || "",
            department: data.department || "",
            monthlyLeadTarget: data.monthlyLeadTarget ?? "",
            monthlyAdmissionTarget: data.monthlyAdmissionTarget ?? "",
          });
        }
      } catch (error) {
        console.log(
          "GET COUNSELLOR ERROR:",
          error.response?.data || error.message
        );
      }
    };

    if (id) {
      fetchCounsellor();
    }
  }, [id]);

  // ==============================
  // HANDLE CHANGE
  // ==============================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==============================
  // UPDATE COUNSELLOR
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/counsellor/admin/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("UPDATE RESPONSE:", res.data);

      if (res.data.success) {
        alert("Counsellor Updated Successfully");
        navigate("/admin/counsellors");
      }
    } catch (error) {
      console.log(
        "UPDATE COUNSELLOR ERROR:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Edit Counsellor
        </h1>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAME */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Phone Number
              </label>

              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* DESIGNATION */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Designation
              </label>

              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* DEPARTMENT */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Department
              </label>

              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* LEAD TARGET */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Monthly Lead Target
              </label>

              <input
                type="number"
                name="monthlyLeadTarget"
                value={formData.monthlyLeadTarget}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* ADMISSION TARGET */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Monthly Admission Target
              </label>

              <input
                type="number"
                name="monthlyAdmissionTarget"
                value={formData.monthlyAdmissionTarget}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition"
            >
              Update Counsellor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}