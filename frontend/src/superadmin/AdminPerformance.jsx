import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminPerformance() {
  const [admins, setAdmins] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getPerformance();
  }, []);

  const getPerformance = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/auth/admin-performance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdmins(res.data.admins);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load performance");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Admin Performance
      </h1>

      <div className="glass p-6 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
          <table className="w-full min-w-[1400px] border-separate border-spacing-y-2">
            <thead className="sticky top-0 bg-slate-900 z-10">
              <tr>
                <th className="text-left px-4 py-4">
                  👤 Admin Name
                </th>

                <th className="text-left px-4 py-4">
                  📧 Email
                </th>

                <th className="text-left px-4 py-4">
                  Status
                </th>

                <th className="text-left px-4 py-4">
                  👥 Total Counsellors
                </th>

                <th className="text-left px-4 py-4">
                  📞 Total Leads
                </th>

                <th className="text-left px-4 py-4">
                  ✅ Converted Leads
                </th>

                <th className="text-left px-4 py-4">
                  📈 Conversion Rate
                </th>
              </tr>
            </thead>

            <tbody>
              {admins.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-10 text-gray-400"
                  >
                    No Admins Found
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr
                    key={admin._id}
                    className="bg-white/5 hover:bg-white/10 transition"
                  >
                    <td className="px-4 py-4 font-semibold">
                      {admin.name}
                    </td>

                    <td className="px-4 py-4">
                      {admin.email}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={
                          admin.isActive
                            ? "bg-green-500 text-white px-3 py-1 rounded-full text-sm"
                            : "bg-red-500 text-white px-3 py-1 rounded-full text-sm"
                        }
                      >
                        {admin.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center font-semibold">
                      {admin.totalCounsellors ?? 0}
                    </td>

                    <td className="px-4 py-4 text-center font-semibold">
                      {admin.totalLeads ?? 0}
                    </td>

                    <td className="px-4 py-4 text-center font-semibold">
                      {admin.convertedLeads ?? 0}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm">
                        {admin.conversionRate ?? 0}%
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}