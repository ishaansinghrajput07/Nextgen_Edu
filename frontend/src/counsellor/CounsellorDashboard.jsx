
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  UserCheck,
  UserPlus,
  PhoneCall,
  CheckCircle2,
  GraduationCap,
  IndianRupee,
  Clock3,
  CalendarCheck,
  Activity,
  TrendingUp,
  RefreshCw,
  ArrowUpRight,
  Mail,
  Phone,
  CircleUserRound,
  AlertCircle,
} from "lucide-react";

const API = "http://localhost:8000";

export default function CounsellorDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [commission, setCommission] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [todaysFollowUps, setTodaysFollowUps] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // AXIOS CONFIG
  // =====================================================

  const getConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // =====================================================
  // FETCH DASHBOARD DATA
  // =====================================================

  const fetchDashboardData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const config = getConfig();

      // =====================================================
      // MAIN DASHBOARD
      // GET /api/v1/counsellor/dashboard
      // =====================================================

      const dashboardRequest = axios.get(
        `${API}/api/v1/counsellor/dashboard`,
        config,
      );

      // =====================================================
      // COMMISSION
      // GET /api/commissions/my
      // =====================================================

      const commissionRequest = axios.get(
        `${API}/api/commissions/my`,
        config,
      );

      // =====================================================
      // RECENT LEADS
      // GET /api/v1/counsellor/recent-leads
      // =====================================================

      const recentLeadsRequest = axios.get(
        `${API}/api/v1/counsellor/recent-leads`,
        config,
      );

      // =====================================================
      // RECENT STUDENTS
      // GET /api/v1/counsellor/recent-students
      // =====================================================

      const recentStudentsRequest = axios.get(
        `${API}/api/v1/counsellor/recent-students`,
        config,
      );

      // =====================================================
      // RECENT ACTIVITIES
      // GET /api/v1/counsellor/recent-activities
      // =====================================================

      const activitiesRequest = axios.get(
        `${API}/api/v1/counsellor/recent-activities`,
        config,
      );

      // =====================================================
      // TODAY'S FOLLOW UPS
      // GET /api/v1/counsellor/todays-followups
      // =====================================================

      const followUpsRequest = axios.get(
        `${API}/api/v1/counsellor/todays-followups`,
        config,
      );

      // =====================================================
      // RUN ALL REQUESTS
      // =====================================================

      const results = await Promise.allSettled([
        dashboardRequest,
        commissionRequest,
        recentLeadsRequest,
        recentStudentsRequest,
        activitiesRequest,
        followUpsRequest,
      ]);

      const [
        dashboardResult,
        commissionResult,
        leadsResult,
        studentsResult,
        activitiesResult,
        followUpsResult,
      ] = results;

      // =====================================================
      // DASHBOARD
      // =====================================================

      if (dashboardResult.status === "fulfilled") {
        setDashboard(dashboardResult.value.data);
      }

      // =====================================================
      // COMMISSION
      // =====================================================

      if (commissionResult.status === "fulfilled") {
        const data = commissionResult.value.data;

        console.log(
          "=================================",
        );
        console.log(
          "COMMISSION RESPONSE:",
          data,
        );
        console.log(
          "COMMISSION SUMMARY:",
          data?.summary,
        );
        console.log(
          "COMMISSION LIST:",
          data?.commissions,
        );
        console.log(
          "=================================",
        );

        setCommission(data);
      }

      // =====================================================
      // RECENT LEADS
      // =====================================================

      if (leadsResult.status === "fulfilled") {
        const data = leadsResult.value.data;

        setRecentLeads(
          data?.leads ||
            data?.recentLeads ||
            data?.data ||
            [],
        );
      }

      // =====================================================
      // RECENT STUDENTS
      // =====================================================

      if (studentsResult.status === "fulfilled") {
        const data = studentsResult.value.data;

        setRecentStudents(
          data?.students ||
            data?.recentStudents ||
            data?.data ||
            [],
        );
      }

      // =====================================================
      // RECENT ACTIVITIES
      // =====================================================

      if (activitiesResult.status === "fulfilled") {
        const data = activitiesResult.value.data;

        setRecentActivities(
          data?.activities ||
            data?.recentActivities ||
            data?.data ||
            [],
        );
      }

      // =====================================================
      // FOLLOW UPS
      // =====================================================

      if (followUpsResult.status === "fulfilled") {
        const data = followUpsResult.value.data;

        setTodaysFollowUps(
          data?.followUps ||
            data?.todaysFollowUps ||
            data?.data ||
            [],
        );
      }

      // =====================================================
      // MAIN DASHBOARD ERROR
      // =====================================================

      if (dashboardResult.status === "rejected") {
        console.log(
          "COUNSELLOR DASHBOARD ERROR:",
          dashboardResult.reason?.response?.data ||
            dashboardResult.reason?.message,
        );

        setError("Unable to load dashboard data.");
      }

      // =====================================================
      // DEBUG API ERRORS
      // =====================================================

      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.log(
            `COUNSELLOR API ${index + 1} ERROR:`,
            result.reason?.response?.data ||
              result.reason?.message,
          );
        }
      });
    } catch (err) {
      console.log(
        "COUNSELLOR DASHBOARD ERROR:",
        err.response?.data || err.message,
      );

      setError(
        "Something went wrong while loading dashboard.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-cyan-500 animate-spin" />

          <p className="text-slate-500 font-medium">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // SAFE DATA
  // =====================================================

  const stats = dashboard?.stats || {};
  const counsellor = dashboard?.counsellor || {};

  /*
   * Commission API expected structure:
   *
   * {
   *   success: true,
   *   summary: {
   *     totalCommission,
   *     paidCommission,
   *     pendingCommission
   *   }
   * }
   */

  const commissionStats =
    commission?.summary ||
    commission?.stats ||
    commission?.commission ||
    {};

  const totalCommission = Number(
    commissionStats?.totalCommission ??
      stats?.totalCommission ??
      0,
  );

  const paidCommission = Number(
    commissionStats?.paidCommission ??
      stats?.paidCommission ??
      0,
  );

  const pendingCommission = Number(
    commissionStats?.pendingCommission ??
      stats?.pendingCommission ??
      0,
  );

  // =====================================================
  // LEAD STATS
  // =====================================================

  const totalLeads = Number(stats?.totalLeads || 0);
  const newLeads = Number(stats?.newLeads || 0);
  const contactedLeads = Number(
    stats?.contactedLeads || 0,
  );
  const interestedLeads = Number(
    stats?.interestedLeads || 0,
  );
  const followUpLeads = Number(
    stats?.followUpLeads || 0,
  );
  const convertedLeads = Number(
    stats?.convertedLeads || 0,
  );
  const closedLeads = Number(
    stats?.closedLeads || 0,
  );

  const totalStudents = Number(
    stats?.totalStudents || 0,
  );

  const totalAdmissions = Number(
    stats?.totalAdmissions || 0,
  );

  const conversionRate = Number(
    stats?.conversionRate || 0,
  );

  // =====================================================
  // HELPERS
  // =====================================================

  const formatMoney = (value) => {
    return new Intl.NumberFormat("en-IN").format(
      Number(value || 0),
    );
  };

  const getLeadName = (lead) => {
    return (
      lead?.leadName ||
      lead?.name ||
      lead?.fullName ||
      "Unknown Lead"
    );
  };

  const getStudentName = (student) => {
    return (
      student?.name ||
      student?.studentName ||
      student?.fullName ||
      "Unknown Student"
    );
  };

  const getStatusClass = (status) => {
    const value = String(status || "")
      .toLowerCase()
      .trim();

    if (
      value === "converted" ||
      value === "enrolled"
    ) {
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    }

    if (value === "interested") {
      return "bg-cyan-50 text-cyan-600 border-cyan-100";
    }

    if (
      value === "follow up" ||
      value === "followup"
    ) {
      return "bg-amber-50 text-amber-600 border-amber-100";
    }

    if (value === "contacted") {
      return "bg-blue-50 text-blue-600 border-blue-100";
    }

    if (value === "closed") {
      return "bg-red-50 text-red-600 border-red-100";
    }

    return "bg-slate-50 text-slate-600 border-slate-100";
  };

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-7">

        {/* HEADER */}

        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-6 md:p-8 text-white shadow-xl">

          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="h-14 w-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur">
                <CircleUserRound size={30} />
              </div>

              <div>
                <p className="text-sm text-cyan-200">
                  Welcome back
                </p>

                <h1 className="text-2xl md:text-3xl font-bold">
                  {counsellor?.name || "Counsellor"}
                </h1>

                <p className="text-sm text-slate-300 mt-1">
                  {counsellor?.designation ||
                    "Counsellor"}{" "}
                  •{" "}
                  {counsellor?.department ||
                    "Admissions"}
                </p>
              </div>

            </div>

            <button
              onClick={() => fetchDashboardData(true)}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2.5 text-sm font-medium transition disabled:opacity-50"
            >
              <RefreshCw
                size={17}
                className={
                  refreshing ? "animate-spin" : ""
                }
              />

              {refreshing
                ? "Refreshing..."
                : "Refresh"}
            </button>

          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-600">
            <AlertCircle size={20} />

            <span className="text-sm font-medium">
              {error}
            </span>
          </div>
        )}

        {/* MAIN STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          <StatCard
            title="Total Leads"
            value={totalLeads}
            icon={<Users size={22} />}
            iconClass="bg-blue-50 text-blue-600"
            description="All assigned leads"
          />

          <StatCard
            title="Interested"
            value={interestedLeads}
            icon={<UserCheck size={22} />}
            iconClass="bg-cyan-50 text-cyan-600"
            description="Interested prospects"
          />

          <StatCard
            title="Follow Ups"
            value={followUpLeads}
            icon={<PhoneCall size={22} />}
            iconClass="bg-amber-50 text-amber-600"
            description="Leads to follow up"
          />

          <StatCard
            title="Converted"
            value={convertedLeads}
            icon={<CheckCircle2 size={22} />}
            iconClass="bg-emerald-50 text-emerald-600"
            description="Successfully converted"
          />

        </div>

        {/* SECONDARY STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          <MiniStat
            title="New Leads"
            value={newLeads}
            icon={<UserPlus size={19} />}
          />

          <MiniStat
            title="Contacted"
            value={contactedLeads}
            icon={<PhoneCall size={19} />}
          />

          <MiniStat
            title="Students"
            value={totalStudents}
            icon={<GraduationCap size={19} />}
          />

          <MiniStat
            title="Admissions"
            value={totalAdmissions}
            icon={<CalendarCheck size={19} />}
          />

        </div>

        {/* COMMISSION */}

        <section>

          <div className="flex items-center justify-between mb-4">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Commission Overview
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Track your earned and pending commission
              </p>
            </div>

            <div className="hidden sm:flex h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 items-center justify-center">
              <IndianRupee size={20} />
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <CommissionCard
              title="Total Commission"
              value={totalCommission}
              icon={<IndianRupee size={21} />}
              className="bg-white"
            />

            <CommissionCard
              title="Paid Commission"
              value={paidCommission}
              icon={<CheckCircle2 size={21} />}
              className="bg-emerald-50/60"
            />

            <CommissionCard
              title="Pending Commission"
              value={pendingCommission}
              icon={<Clock3 size={21} />}
              className="bg-amber-50/60"
            />

          </div>
        </section>

        {/* ANALYTICS */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Conversion */}

          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Conversion Rate
                </p>

                <h2 className="text-4xl font-bold text-slate-900 mt-2">
                  {conversionRate}%
                </h2>
              </div>

              <div className="h-12 w-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <TrendingUp size={23} />
              </div>

            </div>

            <div className="mt-6 h-3 rounded-full bg-slate-100 overflow-hidden">

              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-700"
                style={{
                  width: `${Math.min(
                    Math.max(conversionRate, 0),
                    100,
                  )}%`,
                }}
              />

            </div>

            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>0%</span>
              <span>100%</span>
            </div>

          </div>

          {/* Lead Pipeline */}

          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">

            <div className="flex items-center justify-between mb-5">

              <div>
                <h2 className="font-bold text-lg text-slate-900">
                  Lead Pipeline
                </h2>

                <p className="text-sm text-slate-500">
                  Current lead distribution
                </p>
              </div>

              <Activity
                className="text-slate-400"
                size={21}
              />

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <PipelineItem
                title="New"
                value={newLeads}
                className="bg-blue-50 text-blue-600"
              />

              <PipelineItem
                title="Contacted"
                value={contactedLeads}
                className="bg-cyan-50 text-cyan-600"
              />

              <PipelineItem
                title="Interested"
                value={interestedLeads}
                className="bg-violet-50 text-violet-600"
              />

              <PipelineItem
                title="Converted"
                value={convertedLeads}
                className="bg-emerald-50 text-emerald-600"
              />

            </div>
          </div>

        </div>

        {/* RECENT LEADS + FOLLOW UPS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

          {/* Recent Leads */}

          <DashboardSection
            title="Recent Leads"
            subtitle="Latest leads assigned to you"
            icon={<Users size={20} />}
          >

            {recentLeads.length === 0 ? (
              <EmptyState text="No recent leads found." />
            ) : (
              <div className="space-y-3">

                {recentLeads
                  .slice(0, 5)
                  .map((lead, index) => (
                    <div
                      key={lead?._id || index}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 p-4 hover:bg-slate-50 transition"
                    >

                      <div className="flex items-center gap-3 min-w-0">

                        <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                          <Users size={18} />
                        </div>

                        <div className="min-w-0">

                          <p className="font-semibold text-slate-800 truncate">
                            {getLeadName(lead)}
                          </p>

                          <p className="text-xs text-slate-400 truncate">
                            {lead?.email ||
                              lead?.phoneNumber ||
                              "No contact"}
                          </p>

                        </div>

                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                          lead?.status,
                        )}`}
                      >
                        {lead?.status || "New"}
                      </span>

                    </div>
                  ))}

              </div>
            )}

          </DashboardSection>

          {/* Today's Follow Ups */}

          <DashboardSection
            title="Today's Follow Ups"
            subtitle="Follow ups scheduled for today"
            icon={<CalendarCheck size={20} />}
          >

            {todaysFollowUps.length === 0 ? (
              <EmptyState text="No follow ups scheduled for today." />
            ) : (
              <div className="space-y-3">

                {todaysFollowUps
                  .slice(0, 5)
                  .map((followUp, index) => (
                    <div
                      key={followUp?._id || index}
                      className="flex items-center gap-3 rounded-2xl border border-slate-100 p-4 hover:bg-slate-50 transition"
                    >

                      <div className="h-10 w-10 shrink-0 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <PhoneCall size={18} />
                      </div>

                      <div className="flex-1 min-w-0">

                        <p className="font-semibold text-slate-800 truncate">
                          {getLeadName(followUp)}
                        </p>

                        <p className="text-xs text-slate-400">

                          {followUp?.followUpDate
                            ? new Date(
                                followUp.followUpDate,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Follow up today"}

                        </p>

                      </div>

                      <ArrowUpRight
                        size={18}
                        className="text-slate-400"
                      />

                    </div>
                  ))}

              </div>
            )}

          </DashboardSection>

        </div>

        {/* STUDENTS + ACTIVITIES */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

          {/* Recent Students */}

          <DashboardSection
            title="Recent Students"
            subtitle="Recently added students"
            icon={<GraduationCap size={20} />}
          >

            {recentStudents.length === 0 ? (
              <EmptyState text="No recent students found." />
            ) : (
              <div className="space-y-3">

                {recentStudents
                  .slice(0, 5)
                  .map((student, index) => (
                    <div
                      key={student?._id || index}
                      className="flex items-center gap-3 rounded-2xl border border-slate-100 p-4 hover:bg-slate-50 transition"
                    >

                      <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <GraduationCap size={18} />
                      </div>

                      <div className="flex-1 min-w-0">

                        <p className="font-semibold text-slate-800 truncate">
                          {getStudentName(student)}
                        </p>

                        <p className="text-xs text-slate-400 truncate">
                          {student?.email ||
                            student?.phoneNumber ||
                            "Student"}
                        </p>

                      </div>

                      <CheckCircle2
                        size={18}
                        className="text-emerald-500"
                      />

                    </div>
                  ))}

              </div>
            )}

          </DashboardSection>

          {/* Recent Activities */}

          <DashboardSection
            title="Recent Activities"
            subtitle="Your latest account activity"
            icon={<Activity size={20} />}
          >

            {recentActivities.length === 0 ? (
              <EmptyState text="No recent activities found." />
            ) : (
              <div className="space-y-4">

                {recentActivities
                  .slice(0, 6)
                  .map((activity, index) => (
                    <div
                      key={activity?._id || index}
                      className="flex gap-3"
                    >

                      <div className="relative">

                        <div className="h-9 w-9 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center">
                          <Activity size={16} />
                        </div>

                        {index !==
                          Math.min(
                            recentActivities.length,
                            6,
                          ) - 1 && (
                          <div className="absolute left-1/2 top-9 h-7 w-px bg-slate-200" />
                        )}

                      </div>

                      <div className="flex-1">

                        <p className="text-sm font-medium text-slate-700">
                          {activity?.action ||
                            activity?.message ||
                            "Activity recorded"}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">

                          {activity?.createdAt
                            ? new Date(
                                activity.createdAt,
                              ).toLocaleString()
                            : "Recently"}

                        </p>

                      </div>

                    </div>
                  ))}

              </div>
            )}

          </DashboardSection>

        </div>

        {/* COUNSELLOR INFORMATION */}

        <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <h2 className="font-bold text-slate-900">
                Counsellor Information
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Your account information
              </p>

            </div>

            <div className="flex flex-wrap gap-3 text-sm">

              {counsellor?.email && (
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-slate-600">
                  <Mail size={16} />
                  {counsellor.email}
                </div>
              )}

              {counsellor?.phoneNumber && (
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-slate-600">
                  <Phone size={16} />
                  {counsellor.phoneNumber}
                </div>
              )}

              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-emerald-600">
                <CheckCircle2 size={16} />
                {counsellor?.status || "Active"}
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// =========================================================
// STAT CARD
// =========================================================

function StatCard({
  title,
  value,
  icon,
  iconClass,
  description,
}) {
  return (
    <div className="group bg-white rounded-3xl border border-slate-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`h-12 w-12 rounded-2xl flex items-center justify-center ${iconClass}`}
        >
          {icon}
        </div>

      </div>

      <p className="text-xs text-slate-400 mt-4">
        {description}
      </p>

    </div>
  );
}

// =========================================================
// MINI STAT
// =========================================================

function MiniStat({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center gap-4">

      <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
        {icon}
      </div>

      <div>

        <p className="text-xs text-slate-500">
          {title}
        </p>

        <p className="text-xl font-bold text-slate-800">
          {value}
        </p>

      </div>

    </div>
  );
}

// =========================================================
// COMMISSION CARD
// =========================================================

function CommissionCard({
  title,
  value,
  icon,
  className = "",
}) {
  return (
    <div
      className={`rounded-3xl border border-slate-100 p-6 shadow-sm ${className}`}
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            ₹{new Intl.NumberFormat("en-IN").format(
              Number(value || 0),
            )}
          </h2>

        </div>

        <div className="h-11 w-11 rounded-xl bg-white/80 flex items-center justify-center">
          {icon}
        </div>

      </div>

    </div>
  );
}

// =========================================================
// PIPELINE
// =========================================================

function PipelineItem({
  title,
  value,
  className,
}) {
  return (
    <div
      className={`rounded-2xl p-4 ${className}`}
    >

      <p className="text-xs font-medium opacity-80">
        {title}
      </p>

      <p className="text-2xl font-bold mt-1">
        {value}
      </p>

    </div>
  );
}

// =========================================================
// SECTION
// =========================================================

function DashboardSection({
  title,
  subtitle,
  icon,
  children,
}) {
  return (
    <section className="bg-white rounded-3xl border border-slate-100 p-5 md:p-6 shadow-sm">

      <div className="flex items-center gap-3 mb-5">

        <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
          {icon}
        </div>

        <div>

          <h2 className="font-bold text-slate-900">
            {title}
          </h2>

          <p className="text-xs text-slate-400 mt-0.5">
            {subtitle}
          </p>

        </div>

      </div>

      {children}

    </section>
  );
}

// =========================================================
// EMPTY STATE
// =========================================================

function EmptyState({ text }) {
  return (
    <div className="py-10 text-center">

      <div className="mx-auto h-12 w-12 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center">
        <Activity size={22} />
      </div>

      <p className="text-sm text-slate-400 mt-3">
        {text}
      </p>

    </div>
  );
}
