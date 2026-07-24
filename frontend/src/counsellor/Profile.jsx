import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [counsellor, setCounsellor] = useState(null);

  const [stats, setStats] = useState({
    assigned: 0,
    converted: 0,
    rate: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const [profileRes, leadsRes] = await Promise.all([
        axios.get(
          "http://localhost:8000/api/v1/contact/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),

        axios.get(
          "http://localhost:8000/api/v1/contact/my-leads",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ]);

      console.log("Profile:", profileRes.data);
      console.log("Leads:", leadsRes.data);

      setCounsellor(profileRes.data.counsellor);

      const leads = leadsRes.data.leads;

      const converted = leads.filter(
        (lead) => lead.status === "Converted"
      ).length;

      const rate =
        leads.length > 0
          ? Math.round((converted / leads.length) * 100)
          : 0;

      setStats({
        assigned: leads.length,
        converted,
        rate,
      });
    } catch (error) {
      console.log(error.response?.data);
      console.log(error.response?.status);
      console.log(error);
    }
  };

  if (!counsellor) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Profile
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="glass p-8 rounded-3xl">

          <div className="flex flex-col items-center">

            <div
              className="
              w-24
              h-24
              rounded-full
              bg-cyan-500
              flex
              items-center
              justify-center
              text-3xl
              font-bold
              "
            >
              {counsellor?.name?.charAt(0)?.toUpperCase()}
            </div>

            <h2 className="text-2xl font-bold mt-4">
              {counsellor.name}
            </h2>

            <p className="text-gray-400">
              Admission Counsellor
            </p>

          </div>

        </div>

        <div
          className="
          glass
          p-8
          rounded-3xl
          lg:col-span-2
          "
        >

          <h2 className="text-2xl font-bold mb-6">
            Personal Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-400">
                Full Name
              </p>

              <h3 className="text-xl font-semibold">
                {counsellor.name}
              </h3>
            </div>

            <div>
              <p className="text-gray-400">
                Email
              </p>

              <h3 className="text-xl font-semibold">
                {counsellor.email}
              </h3>
            </div>

            <div>
              <p className="text-gray-400">
                Role
              </p>

              <h3 className="text-xl font-semibold">
                Counsellor
              </h3>
            </div>

            <div>
              <p className="text-gray-400">
                Status
              </p>

              <h3 className="text-green-400 font-semibold">
                {counsellor.status || "Active"}
              </h3>
            </div>

          </div>

        </div>

      </div>

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
        mt-8
        "
      >

        <div className="glass p-6 rounded-3xl">

          <h3 className="text-gray-400">
            Assigned Leads
          </h3>

          <p className="text-4xl font-bold mt-2">
            {stats.assigned}
          </p>

        </div>

        <div className="glass p-6 rounded-3xl">

          <h3 className="text-gray-400">
            Converted Leads
          </h3>

          <p className="text-4xl font-bold mt-2 text-green-400">
            {stats.converted}
          </p>

        </div>

        <div className="glass p-6 rounded-3xl">

          <h3 className="text-gray-400">
            Conversion Rate
          </h3>

          <p className="text-4xl font-bold mt-2 text-cyan-400">
            {stats.rate}%
          </p>

        </div>

      </div>

    </div>
  );
}