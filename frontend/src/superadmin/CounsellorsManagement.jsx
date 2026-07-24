import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CounsellorsManagement() {
  const [counsellors, setCounsellors] = useState([]);

  const token = localStorage.getItem("token");

  const getCounsellors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/counsellor/allcounsellor",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCounsellors(res.data.counsellors);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load counsellors");
    }
  };

  useEffect(() => {
    getCounsellors();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Counsellors
      </h1>

      <div className="glass p-6 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[500px]">

          <table className="w-full min-w-[900px] border-separate border-spacing-y-2">

            <thead className="sticky top-0 bg-slate-900 z-10">

              <tr>

                <th className="text-left px-4 py-4">
                  Name
                </th>

                <th className="text-left px-4 py-4">
                  Email
                </th>

                <th className="text-left px-4 py-4">
                  Phone
                </th>

                <th className="text-left px-4 py-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {counsellors.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-400"
                  >
                    No Counsellors Found
                  </td>

                </tr>

              ) : (

                counsellors.map((counsellor) => (

                  <tr
                    key={counsellor._id}
                    className="bg-white/5 hover:bg-white/10 transition"
                  >

                    <td className="px-4 py-4">
                      {counsellor.name}
                    </td>

                    <td className="px-4 py-4">
                      {counsellor.email}
                    </td>

                    <td className="px-4 py-4">
                      {counsellor.phoneNumber}
                    </td>

                    <td className="px-4 py-4">

                      <span
                        className={
                          counsellor.status === "Inactive"
                            ? "bg-red-500 px-3 py-1 rounded-full text-white text-sm"
                            : "bg-green-500 px-3 py-1 rounded-full text-white text-sm"
                        }
                      >
                        {counsellor.status || "Active"}
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