import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Leads() {
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const [statusFilter, setStatusFilter] = useState("All");

  const [counsellorFilter, setCounsellorFilter] = useState("All");

  const [counsellors, setCounsellors] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
    fetchCounsellors();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/contact/admin/contacts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setLeads(res.data.contacts);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const fetchCounsellors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/counsellor/allcounsellor",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCounsellors(res.data.counsellors);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.username?.toLowerCase().includes(search.toLowerCase()) ||
      lead.phoneNumber?.includes(search) ||
      lead.email?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : lead.status === statusFilter;

    const matchesCounsellor =
      counsellorFilter === "All"
        ? true
        : lead.assignedTo?._id === counsellorFilter;

    return matchesSearch && matchesStatus && matchesCounsellor;
  });
  const updateLead = async (leadId, field, value) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/contact/admin/contacts/${leadId}`,
        {
          [field]: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchLeads();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Leads Management</h1>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total Leads: {filteredLeads.length}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Lead..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
    p-3
    rounded-xl
    border
    border-gray-300
    dark:border-slate-700
    bg-white
    dark:bg-slate-900
    "
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
    p-3
    rounded-xl
    border
    border-gray-300
    dark:border-slate-700
    bg-white
    dark:bg-slate-900
    "
        >
          <option>All</option>

          <option>New</option>

          <option>Contacted</option>

          <option>Interested</option>

          <option>Follow Up</option>

          <option>Converted</option>

          <option>Closed</option>
        </select>

        <select
          value={counsellorFilter}
          onChange={(e) => setCounsellorFilter(e.target.value)}
          className="
    p-3
    rounded-xl
    border
    border-gray-300
    dark:border-slate-700
    bg-white
    dark:bg-slate-900
    "
        >
          <option>All</option>

          {counsellors.map((person) => (
            <option key={person._id} value={person._id}>
              {person.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="text-left py-4 px-4">Name</th>

                <th className="text-left px-4">Phone</th>

                <th className="text-left px-4">Course</th>

                <th className="text-left px-4">Source</th>

                <th className="text-left px-4">Status</th>

                <th className="text-left px-4">Assigned To</th>

                <th className="text-left px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-gray-500">
                    No Leads Found
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, index) => (
                  <tr
                    key={lead._id}
                    className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                  >
                    <td className="py-4 px-4">{lead.username || "-"}</td>

                    <td className="px-4">{lead.phoneNumber || "-"}</td>

                    <td className="px-4">{lead.interestedCourse || "-"}</td>

                    <td className="px-4">{lead.source || "-"}</td>

                    <td className="px-4">
                      <select
                        value={lead.status || "New"}
                        onChange={(e) =>
                          updateLead(lead._id, "status", e.target.value)
                        }
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                      >
                        <option value="New">New</option>

                        <option value="Contacted">Contacted</option>

                        <option value="Interested">Interested</option>

                        <option value="Follow Up">Follow Up</option>

                        <option value="Converted">Converted</option>

                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    <td className="px-4">
                      <select
                        value={lead.assignedTo?._id || ""}
                        onChange={(e) =>
                          updateLead(lead._id, "assignedTo", e.target.value)
                        }
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                      >
                        <option value="">Select</option>

                        {counsellors.map((counsellor) => (
                          <option key={counsellor._id} value={counsellor._id}>
                            {counsellor.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4">
                      <Link
                        to={`/admin/leads/${lead._id}`}
                        className="inline-flex items-center px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition"
                      >
                        View
                      </Link>
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
