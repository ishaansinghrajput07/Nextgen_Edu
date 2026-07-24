import { useEffect, useState } from "react";
import axios from "axios";

export default function CounsellorDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    interested: 0,
    followUp: 0,
    converted: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8000/api/v1/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        

        setStats(res.data.stats);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Counsellor Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-3xl">
          <p>Total Leads</p>
          <h2 className="text-4xl font-bold">
            {stats.total}
          </h2>
        </div>

        <div className="glass p-6 rounded-3xl">
          <p>Interested</p>
          <h2 className="text-4xl font-bold text-cyan-400">
            {stats.interested}
          </h2>
        </div>

        <div className="glass p-6 rounded-3xl">
          <p>Follow Up</p>
          <h2 className="text-4xl font-bold text-yellow-400">
            {stats.followUp}
          </h2>
        </div>

        <div className="glass p-6 rounded-3xl">
          <p>Converted</p>
          <h2 className="text-4xl font-bold text-green-400">
            {stats.converted}
          </h2>
        </div>
      </div>
    </div>
  );
}