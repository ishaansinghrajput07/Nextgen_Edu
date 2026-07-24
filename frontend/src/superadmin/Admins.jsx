import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Admins() {
  const [admins, setAdmins] = useState([]);

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  // GET ALL ADMINS

  const getAdmins = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/auth/all-admins",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAdmins(res.data.admins);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load admins");
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  // CREATE ADMIN

  const createAdmin = async () => {
    if (!form.name || !form.email || !form.password) {
      return toast.error("Fill all fields");
    }

    try {
      await axios.post(
        "http://localhost:8000/api/v1/auth/create-admin",

        form,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Admin Created");

      setForm({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
      });

      getAdmins();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Error");
    }
  };

  // DELETE ADMIN

  const deleteAdmin = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/auth/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Admin Deleted");

      getAdmins();
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Manage Admins</h1>

      <div className="glass p-6 rounded-3xl mb-8">
        <h2 className="text-2xl mb-4">Create Admin</h2>

        <div className="grid md:grid-cols-4 gap-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="p-4 rounded-xl bg-black/20"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="p-4 rounded-xl bg-black/20"
          />

          <input
            placeholder="Phone"
            value={form.phoneNumber}
            onChange={(e) =>
              setForm({
                ...form,
                phoneNumber: e.target.value,
              })
            }
            className="p-4 rounded-xl bg-black/20"
          />

          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="p-4 rounded-xl bg-black/20"
          />
        </div>

        <button
          onClick={createAdmin}
          className="
mt-4
bg-cyan-500
px-6
py-3
rounded-xl
"
        >
          Create Admin
        </button>
      </div>
<div className="glass p-6 rounded-3xl overflow-x-auto">
  <table className="w-full table-auto border-collapse">
    <thead>
      <tr className="border-b border-white/10">
        <th className="text-left py-4 px-4 font-semibold">Name</th>

        <th className="text-left py-4 px-4 font-semibold">Email</th>

        <th className="text-center py-4 px-4 font-semibold">Role</th>

        <th className="text-center py-4 px-4 font-semibold">
          Created By
        </th>

        <th className="text-center py-4 px-4 font-semibold">
          Action
        </th>
      </tr>
    </thead>

    <tbody>
      {admins.map((admin) => (
        <tr
          key={admin._id}
          className="border-b border-white/10 hover:bg-white/5 transition"
        >
          <td className="py-4 px-4">
            {admin.name}
          </td>

          <td className="py-4 px-4">
            {admin.email}
          </td>

          <td className="py-4 px-4 text-center">
            <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
              {admin.role}
            </span>
          </td>

          <td className="py-4 px-4 text-center">
            {admin.createdBy?.name || "-"}
          </td>

          <td className="py-4 px-4 text-center">
            <button
              onClick={() => deleteAdmin(admin._id)}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
}
