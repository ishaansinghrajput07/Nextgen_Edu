import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    getActivityLogs();
  }, []);

  const getActivityLogs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/activity/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLogs(res.data.activities);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load activity logs");
    }
  };

  const filteredLogs = logs.filter(
    (log) =>
      log.action?.toLowerCase().includes(search.toLowerCase()) ||
      log.by?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">

      {/* Header */}

      <div
        className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
        mb-8
        "
      >
        <h1
          className="
          text-3xl
          md:text-4xl
          font-bold
          "
        >
          Activity Logs
        </h1>

        <div
          className="
          text-sm
          text-gray-400
          "
        >
          Total Logs : {filteredLogs.length}
        </div>
      </div>

      {/* Main Card */}

      <div
        className="
        glass
        rounded-3xl
        overflow-hidden
        flex-1
        min-h-0
        "
      >
        {/* Search */}

        <div
          className="
          p-6
          border-b
          border-white/10
          "
        >
          <input
            type="text"
            placeholder="Search Activity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
            w-full
            p-4
            rounded-xl
            bg-black/20
            border
            border-white/10
            outline-none
            "
          />
        </div>

        {/* Logs */}

        <div
          className="
          h-[600px]
          overflow-y-auto
          p-6
          space-y-4
          "
        >
          {filteredLogs.length === 0 ? (
            <div
              className="
              text-center
              py-20
              text-gray-400
              "
            >
              No Activity Found
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log._id}
                className="
                p-5
                rounded-2xl
                bg-white/5
                border
                border-white/10
                hover:bg-white/10
                transition
                "
              >
                <div
                  className="
                  font-semibold
                  text-white
                  "
                >
                  {log.action}
                </div>

                <div
                  className="
                  text-sm
                  text-cyan-400
                  mt-2
                  "
                >
                  By : {log.by}
                </div>

                <div
                  className="
                  text-xs
                  text-gray-500
                  mt-1
                  "
                >
                  {new Date(log.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}