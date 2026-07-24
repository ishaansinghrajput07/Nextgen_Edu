import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [topCounsellors, setTopCounsellors] = useState([]);

  const [stats, setStats] = useState({
    admins: 0,
    activeAdmins: 0,
    inactiveAdmins: 0,
    counsellors: 0,
    leads: 0,
    universities: 0,
  });

  const [recentAdmins, setRecentAdmins] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:8000/api/v1/superadmin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);

      setStats(data.stats);
      setRecentAdmins(data.recentAdmins);
      setTopCounsellors(data.topCounsellors);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load dashboard");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Super Admin Dashboard
      </h1>

      {/* Stats */}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-8">

        <div className="glass p-6 rounded-3xl">
          <h3>Total Admins</h3>
          <p className="text-4xl font-bold mt-2">
            {stats.admins}
          </p>
        </div>

        <div className="glass p-6 rounded-3xl">
          <h3>Active Admins</h3>
          <p className="text-4xl font-bold text-green-400 mt-2">
            {stats.activeAdmins}
          </p>
        </div>

        <div className="glass p-6 rounded-3xl">
          <h3>Inactive Admins</h3>
          <p className="text-4xl font-bold text-red-400 mt-2">
            {stats.inactiveAdmins}
          </p>
        </div>

        <div className="glass p-6 rounded-3xl">
          <h3>Counsellors</h3>
          <p className="text-4xl font-bold mt-2">
            {stats.counsellors}
          </p>
        </div>

        <div className="glass p-6 rounded-3xl">
          <h3>Leads</h3>
          <p className="text-4xl font-bold mt-2">
            {stats.leads}
          </p>
        </div>

        <div className="glass p-6 rounded-3xl">
          <h3>Universities</h3>
          <p className="text-4xl font-bold mt-2">
            {stats.universities}
          </p>
        </div>

      </div>

      {/* Recent Admins */}

      <div className="glass p-6 rounded-3xl">

        <h2 className="text-2xl font-bold mb-6">
          Recent Admins
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10">

                <th className="text-left p-3">
                  Name
                </th>

                <th className="text-left p-3">
                  Email
                </th>

                <th className="text-left p-3">
                  Status
                </th>

                <th className="text-left p-3">
                  Last Login
                </th>

              </tr>

            </thead>

            <tbody>

              {recentAdmins.map((admin) => (

                <tr
                  key={admin._id}
                  className="border-b border-white/5"
                >

                  <td className="p-3">
                    {admin.name}
                  </td>

                  <td className="p-3">
                    {admin.email}
                  </td>

                  <td className="p-3">

                    <span
                      className={
                        admin.isActive
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {admin.isActive ? "Active" : "Inactive"}
                    </span>

                  </td>

                  <td className="p-3">
                    {admin.lastLogin
                      ? new Date(admin.lastLogin).toLocaleString()
                      : "Never"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Counsellor Performance */}

      <div className="glass p-6 rounded-3xl mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Counsellor Performance
        </h2>

        <table className="w-full">

          <thead>

            <tr>

              <th className="text-left p-3">
                Counsellor
              </th>

              <th className="text-left p-3">
                Leads
              </th>

            </tr>

          </thead>

          <tbody>

            {topCounsellors.map((item) => (

              <tr
                key={item._id}
                className="border-b border-white/5"
              >

                <td className="p-3">
                  {item.name}
                </td>

                <td className="p-3 font-bold">
                  {item.totalLeads}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}