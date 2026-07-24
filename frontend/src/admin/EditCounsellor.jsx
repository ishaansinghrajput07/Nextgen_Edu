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

  // Get counsellor data

  useEffect(() => {
    const fetchCounsellor = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/counsellor/counsellor/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.data.success) {
          const data = res.data.counsellor;

          setFormData({
            name: data.name || "",

            email: data.email || "",

            phoneNumber: data.phoneNumber || "",

            designation: data.designation || "",

            department: data.department || "",

            monthlyLeadTarget: data.monthlyLeadTarget || "",

            monthlyAdmissionTarget: data.monthlyAdmissionTarget || "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCounsellor();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/counsellor/update/counsellor/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        alert("Counsellor Updated Successfully");

        navigate("/admin/counsellors");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Counsellor</h1>

      <div className="glass p-8 rounded-3xl max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="
w-full
bg-white/5
border
border-white/10
rounded-xl
p-3
"
            />
          </div>

          <div>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="
w-full
bg-white/5
border
border-white/10
rounded-xl
p-3
"
            />
          </div>

          <div>
            <label>Phone Number</label>

            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="
w-full
bg-white/5
border
border-white/10
rounded-xl
p-3
"
            />
          </div>

          <div>
            <label>Designation</label>

            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="
w-full
bg-white/5
border
border-white/10
rounded-xl
p-3
"
            />
          </div>

          <div>
            <label>Department</label>

            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="
w-full
bg-white/5
border
border-white/10
rounded-xl
p-3
"
            />
          </div>

          <div>
            <label>Lead Target</label>

            <input
              type="number"
              name="monthlyLeadTarget"
              value={formData.monthlyLeadTarget}
              onChange={handleChange}
              className="
w-full
bg-white/5
border
border-white/10
rounded-xl
p-3
"
            />
          </div>

          <div>
            <label>Admission Target</label>

            <input
              type="number"
              name="monthlyAdmissionTarget"
              value={formData.monthlyAdmissionTarget}
              onChange={handleChange}
              className="
w-full
bg-white/5
border
border-white/10
rounded-xl
p-3
"
            />
          </div>

          <button
            type="submit"
            className="
bg-cyan-500
px-6
py-3
rounded-xl
hover:bg-cyan-600
"
          >
            Update Counsellor
          </button>
        </form>
      </div>
    </div>
  );
}
