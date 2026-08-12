import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Eye,
  Mail,
  Phone,
  BookOpen,
  Users,
  Search,
  UserRound,
  ChevronRight,
} from "lucide-react";

export default function MyLeads() {
  const [myLeads, setMyLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMyLeads();
  }, []);

  const fetchMyLeads = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "http://localhost:8000/api/v1/contact/counsellor/my-leads",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("My Leads Response:", data);

      if (data.success) {
        setMyLeads(data.leads || []);
      } else {
        setMyLeads([]);
        toast.error(data.message || "Failed to load leads");
      }
    } catch (error) {
      console.log("MY LEADS ERROR:", error.response?.data);
      console.log("STATUS:", error.response?.status);
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to load leads"
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // SEARCH
  // ============================================

  const filteredLeads = myLeads.filter((lead) => {
    const searchText = search.toLowerCase();

    return (
      lead.leadName?.toLowerCase().includes(searchText) ||
      lead.email?.toLowerCase().includes(searchText) ||
      lead.phoneNumber?.toLowerCase().includes(searchText) ||
      lead.interestedCourse?.toLowerCase().includes(searchText) ||
      lead.status?.toLowerCase().includes(searchText) ||
      lead.leadNumber?.toLowerCase().includes(searchText)
    );
  });

  // ============================================
  // STATUS STYLE
  // ============================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Converted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "Enrolled":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Interested":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "Follow Up":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "Contacted":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";

      case "Closed":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 w-52 bg-slate-200 rounded-lg mb-3" />
            <div className="h-5 w-80 bg-slate-200 rounded-lg mb-8" />

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-12 bg-slate-100 rounded-xl mb-6" />

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-16 bg-slate-100 rounded-xl mb-3"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // UI
  // ============================================

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">

          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-xl bg-cyan-600 flex items-center justify-center shadow-sm">
                <Users className="w-5 h-5 text-white" />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                My Leads
              </h1>
            </div>

            <p className="text-sm text-slate-500">
              Manage and track all leads assigned to you.
            </p>
          </div>

          {/* Count */}
          <div className="flex items-center gap-3">
            <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
              <div className="text-xs font-medium text-slate-500">
                Total Leads
              </div>

              <div className="text-2xl font-bold text-slate-900">
                {myLeads.length}
              </div>
            </div>

            <div className="bg-cyan-600 text-white rounded-xl px-5 py-3 shadow-sm">
              <div className="text-xs text-cyan-100">
                Showing
              </div>

              <div className="text-2xl font-bold">
                {filteredLeads.length}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            MAIN CARD
        ========================================= */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* =======================================
              TOOLBAR
          ======================================= */}

          <div className="p-5 md:p-6 border-b border-slate-200">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Assigned Leads
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  View lead details and manage your assigned enquiries.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80">

                <Search
                  size={18}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search leads..."
                  className="
                    w-full
                    h-11
                    pl-10
                    pr-4
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    text-sm
                    text-slate-900
                    placeholder:text-slate-400
                    outline-none
                    transition
                    focus:bg-white
                    focus:border-cyan-500
                    focus:ring-2
                    focus:ring-cyan-100
                  "
                />
              </div>

            </div>
          </div>

          {/* =======================================
              TABLE
          ======================================= */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1050px]">

              {/* TABLE HEAD */}

              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Lead
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Contact
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Course
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Enrolment
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Action
                  </th>

                </tr>
              </thead>

              {/* TABLE BODY */}

              <tbody className="divide-y divide-slate-100">

                {filteredLeads.length === 0 ? (

                  <tr>
                    <td colSpan={6}>

                      <div className="py-16 text-center">

                        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                          <Users className="w-6 h-6 text-slate-400" />
                        </div>

                        <h3 className="text-base font-semibold text-slate-900">
                          {search
                            ? "No leads found"
                            : "No leads assigned"}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          {search
                            ? "Try searching with another keyword."
                            : "There are currently no leads assigned to you."}
                        </p>

                      </div>

                    </td>
                  </tr>

                ) : (

                  filteredLeads.map((lead) => (

                    <tr
                      key={lead._id}
                      className="
                        group
                        hover:bg-slate-50/80
                        transition-colors
                      "
                    >

                      {/* LEAD */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="
                            w-10
                            h-10
                            rounded-xl
                            bg-cyan-50
                            border
                            border-cyan-100
                            flex
                            items-center
                            justify-center
                            shrink-0
                          ">
                            <UserRound
                              size={18}
                              className="text-cyan-600"
                            />
                          </div>

                          <div className="min-w-0">

                            <div className="font-semibold text-slate-900 truncate max-w-[190px]">
                              {lead.leadName || "Unnamed Lead"}
                            </div>

                            <div className="text-xs text-slate-400 mt-1">
                              {lead.leadNumber || "No Lead ID"}
                            </div>

                          </div>

                        </div>

                      </td>

                      {/* CONTACT */}

                      <td className="px-6 py-5">

                        <div className="space-y-1.5">

                          {lead.email ? (
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Mail
                                size={14}
                                className="text-slate-400 shrink-0"
                              />

                              <span className="truncate max-w-[220px]">
                                {lead.email}
                              </span>
                            </div>
                          ) : (
                            <div className="text-sm text-slate-400">
                              No email
                            </div>
                          )}

                          {lead.phoneNumber ? (
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Phone
                                size={14}
                                className="text-slate-400 shrink-0"
                              />

                              <span>
                                {lead.phoneNumber}
                              </span>
                            </div>
                          ) : (
                            <div className="text-sm text-slate-400">
                              No phone
                            </div>
                          )}

                        </div>

                      </td>

                      {/* COURSE */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">

                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                            <BookOpen
                              size={15}
                              className="text-indigo-600"
                            />
                          </div>

                          <div>
                            <div className="text-sm font-medium text-slate-800 max-w-[170px] truncate">
                              {lead.interestedCourse || "Not specified"}
                            </div>

                            {lead.country && (
                              <div className="text-xs text-slate-400 mt-0.5">
                                {lead.country}
                              </div>
                            )}
                          </div>

                        </div>

                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-5">

                        <span
                          className={`
                            inline-flex
                            items-center
                            px-3
                            py-1.5
                            rounded-full
                            border
                            text-xs
                            font-semibold
                            ${getStatusStyle(lead.status)}
                          `}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
                          {lead.status || "New"}
                        </span>

                      </td>

                      {/* ENROLLMENT */}

                      <td className="px-6 py-5">

                        <span
                          className={`
                            text-sm font-medium
                            ${
                              lead.enrollmentStatus === "Enrolled"
                                ? "text-emerald-600"
                                : "text-slate-500"
                            }
                          `}
                        >
                          {lead.enrollmentStatus === "Enrolled"
                            ? "Enrolled"
                            : "Not Enrolled"}
                        </span>

                      </td>

                      {/* ACTION */}

                      <td className="px-6 py-5 text-right">

                        <Link
                          to={`/counsellor/leads/${lead._id}`}
                         className="
    inline-flex
    items-center
    gap-2
    px-4
    py-2.5
    rounded-xl
    bg-slate-900
    !text-white
    text-sm
    font-medium
    hover:bg-cyan-600
    hover:!text-white
    transition-all
    shadow-sm
    group-hover:shadow
  "
                        >
                          <Eye size={16} />

                          View

                          <ChevronRight size={15} />
                        </Link>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>
          </div>

          {/* =======================================
              FOOTER
          ======================================= */}

          {myLeads.length > 0 && (
            <div className="
              px-6
              py-4
              border-t
              border-slate-200
              bg-slate-50
              flex
              items-center
              justify-between
              text-sm
            ">

              <span className="text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {filteredLeads.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {myLeads.length}
                </span>{" "}
                leads
              </span>

              <button
                onClick={fetchMyLeads}
                className="
                  text-cyan-600
                  font-medium
                  hover:text-cyan-700
                  transition
                "
              >
                Refresh
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}