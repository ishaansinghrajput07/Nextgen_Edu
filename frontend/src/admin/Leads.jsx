import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import axios from "axios";
import axiosInstance from "../services/axiosInstance";

import toast from "react-hot-toast";

import {
  Users,
  Search,
  Phone,
  GraduationCap,
  UserRoundCheck,
  RefreshCcw,
  Eye,
} from "lucide-react";

export default function Leads() {
  const token = localStorage.getItem("token");

  // ==========================
  // STATES
  // ==========================

  const [leads, setLeads] = useState([]);

  const [counsellors, setCounsellors] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [counsellorFilter, setCounsellorFilter] = useState("All");

  // ==========================
  // FETCH LEADS
  // ==========================

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/v1/contact");

      console.log("LEADS DATA", res.data);

      setLeads(res.data.leads || []);
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  const fetchCounsellors = async () => {
    try {
      const res = await axiosInstance.get(
  "/v1/counsellor/admin/allcounsellor"
);

      setCounsellors(res.data.counsellors || []);
    } catch (error) {
      console.log(error);

      toast.error("Counsellor loading failed");
    }
  };

  useEffect(() => {
    fetchLeads();

    fetchCounsellors();
  }, []);

  // ==========================
  // ASSIGN COUNSELLOR
  // ==========================

  const assignCounsellor = async (leadId, counsellorId) => {
    try {
      console.log("LEAD ID =>", leadId);
      console.log("COUNSELLOR ID =>", counsellorId);
      await axiosInstance.patch(`/v1/contact/${leadId}/assign-counsellor`, {
        counsellorId,
      });

      toast.success("Counsellor Assigned");

      fetchLeads();
    } catch (error) {
      console.log(error.response?.data);

      toast.error("Assignment Failed");
    }
  };

  // ==========================
  // UPDATE STATUS
  // ==========================

  const updateStatus = async (leadId, status) => {
    try {
      await axiosInstance.put(`/v1/contact/${leadId}`, {
        status,
      });

      toast.success("Status Updated");

      fetchLeads();
    } catch (error) {
      console.log(error);

      toast.error("Status update failed");
    }
  };
  // ==========================
  // FILTER LEADS
  // ==========================

  const filteredLeads = leads.filter((lead) => {
    const searchText = search.toLowerCase();

    const searchMatch =
      lead.leadName?.toLowerCase().includes(searchText) ||
      lead.email?.toLowerCase().includes(searchText) ||
      lead.phoneNumber?.includes(search);

    const statusMatch =
      statusFilter === "All" ? true : lead.status === statusFilter;

    const counsellorMatch =
      counsellorFilter === "All"
        ? true
        : lead.counsellor?._id === counsellorFilter;

    return searchMatch && statusMatch && counsellorMatch;
  });

  return (
    <div
      className="
relative
min-h-screen
overflow-hidden
bg-gradient-to-br
from-sky-50
via-cyan-50
to-blue-100
p-6
lg:p-10
"
    >
      {/* Background Glow */}

      <div
        className="
absolute
-top-40
-left-40
h-[450px]
w-[450px]
rounded-full
bg-cyan-300/30
blur-[120px]
"
      />

      <div
        className="
absolute
bottom-0
right-0
h-[500px]
w-[500px]
rounded-full
bg-blue-300/30
blur-[140px]
"
      />

      <div
        className="
relative
z-10
max-w-7xl
mx-auto
"
      >
        {/* ==========================
HEADER
========================== */}

        <div
          className="
flex
flex-col
lg:flex-row
justify-between
gap-6
mb-10
"
        >
          <div>
            <div
              className="
inline-flex
items-center
gap-2
rounded-full
bg-white/80
backdrop-blur-xl
border
border-sky-200
px-5
py-2
shadow-md
"
            >
              <Users
                className="
h-5
w-5
text-cyan-600
"
              />

              <span
                className="
font-semibold
text-sky-700
"
              >
                Lead Management
              </span>
            </div>

            <h1
              className="
mt-5
text-5xl
font-black
text-slate-900
"
            >
              Manage
              <span
                className="
block
bg-gradient-to-r
from-sky-500
via-cyan-500
to-blue-500
bg-clip-text
text-transparent
"
              >
                Leads
              </span>
            </h1>

            <p
              className="
mt-4
max-w-2xl
text-lg
leading-8
text-slate-600
"
            >
              Track enquiries, assign counsellors, manage admissions and monitor
              student journey.
            </p>
          </div>

          <button
            onClick={fetchLeads}
            className="
flex
items-center
gap-3
h-fit
rounded-2xl
bg-white
px-6
py-4
font-bold
text-sky-700
border
border-sky-100
shadow-xl
hover:-translate-y-1
transition
"
          >
            <RefreshCcw className={loading ? "animate-spin" : ""} />
            Refresh Leads
          </button>
        </div>

        {/* ==========================
STATS
========================== */}

        <div
          className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-6
mb-10
"
        >
          <div
            className="
rounded-3xl
bg-white/80
backdrop-blur-xl
border
border-white
p-6
shadow-xl
"
          >
            <p
              className="
text-sm
text-slate-500
"
            >
              Total Leads
            </p>

            <h2
              className="
mt-2
text-4xl
font-black
text-slate-900
"
            >
              {leads.length}
            </h2>
          </div>

          <div
            className="
rounded-3xl
bg-white/80
backdrop-blur-xl
border
border-white
p-6
shadow-xl
"
          >
            <p
              className="
text-sm
text-slate-500
"
            >
              New Leads
            </p>

            <h2
              className="
mt-2
text-4xl
font-black
text-cyan-600
"
            >
              {leads.filter((item) => item.status === "New").length}
            </h2>
          </div>

          <div
            className="
rounded-3xl
bg-white/80
backdrop-blur-xl
border
border-white
p-6
shadow-xl
"
          >
            <p
              className="
text-sm
text-slate-500
"
            >
              Assigned Leads
            </p>

            <h2
              className="
mt-2
text-4xl
font-black
text-blue-600
"
            >
              {leads.filter((item) => item.counsellor).length}
            </h2>
          </div>

          <div
            className="
rounded-3xl
bg-white/80
backdrop-blur-xl
border
border-white
p-6
shadow-xl
"
          >
            <p
              className="
text-sm
text-slate-500
"
            >
              Converted
            </p>

            <h2
              className="
mt-2
text-4xl
font-black
text-emerald-600
"
            >
              {leads.filter((item) => item.status === "Converted").length}
            </h2>
          </div>
        </div>

        {/* ==========================
FILTER BOX
========================== */}

        <div
          className="
rounded-3xl
bg-white/80
backdrop-blur-xl
border
border-white
shadow-xl
p-6
mb-8
"
        >
          <div
            className="
grid
lg:grid-cols-3
gap-5
"
          >
            <div
              className="
relative
"
            >
              <Search
                className="
absolute
left-4
top-1/2
-translate-y-1/2
text-sky-500
"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="
Search name email phone
"
                className="
w-full
rounded-2xl
border
border-sky-100
py-4
pl-12
pr-5
outline-none
focus:ring-4
focus:ring-cyan-100
"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="
rounded-2xl
border
border-sky-100
px-5
py-4
bg-white
outline-none
"
            >
              <option>All</option>

              <option>New</option>

              <option>Contacted</option>

              <option>Interested</option>

              <option>Follow Up</option>

              <option>Converted</option>

              <option>Enrolled</option>

              <option>Closed</option>
            </select>

            <select
              value={counsellorFilter}
              onChange={(e) => setCounsellorFilter(e.target.value)}
              className="
rounded-2xl
border
border-sky-100
px-5
py-4
bg-white
outline-none
"
            >
              <option value="All">All Counsellors</option>

              {counsellors.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className="
rounded-[32px]
bg-white/80
backdrop-blur-xl
border
border-white
shadow-2xl
overflow-hidden
"
        >
          {/* TABLE HEADER */}

          <div
            className="
px-6
py-5
border-b
border-sky-100
flex
justify-between
items-center
"
          >
            <div>
              <h2
                className="
text-2xl
font-black
text-slate-900
"
              >
                All Leads
              </h2>

              <p
                className="
text-sm
text-slate-500
mt-1
"
              >
                Manage enquiries and counsellor assignments
              </p>
            </div>

            <div
              className="
rounded-full
bg-cyan-100
px-5
py-2
text-cyan-700
font-semibold
"
            >
              {filteredLeads.length} Leads
            </div>
          </div>

          <div
            className="
overflow-x-auto
"
          >
            <table
              className="
w-full
min-w-[1200px]
"
            >
              <thead>
                <tr
                  className="
bg-gradient-to-r
from-sky-50
to-cyan-50
"
                >
                  <th className="px-6 py-4 text-left">Name</th>

                  <th className="px-6 py-4 text-left">Phone</th>

                  <th className="px-6 py-4 text-left">Course</th>

                  <th className="px-6 py-4 text-left">Source</th>

                  <th className="px-6 py-4 text-left">Status</th>

                  <th className="px-6 py-4 text-left">Assigned</th>

                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="
py-16
text-center
text-sky-600
"
                    >
                      <div
                        className="
flex
justify-center
items-center
gap-3
"
                      >
                        <RefreshCcw
                          className="
animate-spin
"
                        />
                        Loading Leads...
                      </div>
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="
py-16
text-center
text-slate-500
"
                    >
                      No Leads Found
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="
border-b
border-slate-100
hover:bg-sky-50/50
transition
"
                    >
                      {/* NAME */}

                      <td
                        className="
px-6
py-5
"
                      >
                        <div
                          className="
font-bold
text-slate-900
"
                        >
                          {lead.leadName || "-"}
                        </div>

                        <div
                          className="
text-xs
text-slate-500
mt-1
"
                        >
                          {lead.email || "-"}
                        </div>
                      </td>

                      {/* PHONE */}

                      <td
                        className="
px-6
py-5
"
                      >
                        <div
                          className="
flex
items-center
gap-2
"
                        >
                          <Phone
                            className="
h-4
w-4
text-cyan-600
"
                          />

                          {lead.phoneNumber || "-"}
                        </div>
                      </td>

                      {/* COURSE */}

                      <td
                        className="
px-6
py-5
"
                      >
                        <div
                          className="
flex
items-center
gap-2
"
                        >
                          <GraduationCap
                            className="
h-5
w-5
text-sky-500
"
                          />

                          {lead.interestedCourse || "-"}
                        </div>
                      </td>

                      {/* SOURCE */}

                      <td
                        className="
px-6
py-5
"
                      >
                        <span
                          className="
rounded-full
bg-blue-100
px-3
py-1
text-xs
font-semibold
text-blue-700
"
                        >
                          {lead.source || "Website"}
                        </span>
                      </td>

                      {/* STATUS */}

                      <td
                        className="
px-6
py-5
"
                      >
                        <select
                          value={lead.status || "New"}
                          onChange={(e) =>
                            updateStatus(
                              lead._id,

                              e.target.value,
                            )
                          }
                          className="
rounded-xl
border
border-sky-200
bg-white
px-3
py-2
text-sm
outline-none
focus:ring-4
focus:ring-cyan-100
"
                        >
                          <option value="New">New</option>

                          <option value="Contacted">Contacted</option>

                          <option value="Interested">Interested</option>

                          <option value="Follow Up">Follow Up</option>

                          <option value="Converted">Converted</option>

                          <option value="Enrolled">Enrolled</option>

                          <option value="Closed">Closed</option>
                        </select>
                      </td>

                      {/* ASSIGNED COUNSELLOR */}

                      <td
                        className="
px-6
py-5
"
                      >
                        <div
                          className="
flex
items-center
gap-2
"
                        >
                          <UserRoundCheck
                            className="
h-5
w-5
text-cyan-600
"
                          />

                          <select
                            value={lead.counsellor?._id || ""}
                            onChange={(e) =>
                              assignCounsellor(
                                lead._id,

                                e.target.value,
                              )
                            }
                            className="
rounded-xl
border
border-sky-200
bg-white
px-3
py-2
text-sm
outline-none
focus:ring-4
focus:ring-cyan-100
"
                          >
                            <option value="">Select</option>

                            {counsellors.map((c) => (
                              <option key={c._id} value={c._id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>

                      {/* ACTION */}

                      <td
                        className="
px-6
py-5
"
                      >
                        <Link
                          to={`/admin/leads/${lead._id}`}
                          className="
inline-flex
items-center
gap-2
rounded-xl
bg-gradient-to-r
from-sky-500
to-cyan-500
px-5
py-3
font-bold
text-white
shadow-lg
hover:-translate-y-1
transition
"
                        >
                          <Eye
                            className="
h-4
w-4
"
                          />
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
    </div>
  );
}
