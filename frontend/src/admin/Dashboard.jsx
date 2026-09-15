import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Users,
  UserPlus,
  PhoneCall,
  GraduationCap,
  IndianRupee,
  TrendingUp,
  CheckCircle2,
  Clock3,
  ArrowUpRight,
  Activity,
  Sparkles,
  Wallet,
  ShieldCheck,
  Search,
  Bell,
  RefreshCw,
  UserCheck,
  FileCheck2,
  CircleDot,
  XCircle,
  BarChart3,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

const API_BASE_URL = "http://localhost:8000/api/v1";

const Dashboard = () => {
  const token = localStorage.getItem("token");
const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    interestedLeads: 0,
    followUpLeads: 0,
    convertedLeads: 0,
    closedLeads: 0,

    totalStudents: 0,
    students: 0,
    totalAdmissions: 0,

    totalCommission: 0,
    paidCommission: 0,
    pendingCommission: 0,

    todayRevenue: 0,
    monthlyRevenue: 0,
    yearRevenue: 0,

    conversionRate: 0,
  });

  const [recentLeads, setRecentLeads] = useState([]);

  // ============================================================
  // HELPERS
  // ============================================================

  const formatCurrency = (value) => {
    const number = Number(value) || 0;

    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(number);
  };

  const getPercentage = (value, total) => {
    const num = Number(value) || 0;
    const denominator = Number(total) || 0;

    if (!denominator) return 0;

    return Math.min(
      100,
      Math.round((num / denominator) * 100)
    );
  };

  const getLeadName = (lead) => {
    return (
      lead?.leadName ||
      lead?.name ||
      lead?.studentName ||
      lead?.username ||
      "Unknown Lead"
    );
  };

  const getCourseName = (lead) => {
    return (
      lead?.interestedCourse ||
      lead?.course ||
      lead?.courseName ||
      lead?.enrollment?.course ||
      "Course not selected"
    );
  };

  const getPhoneNumber = (lead) => {
    return (
      lead?.phoneNumber ||
      lead?.phone ||
      lead?.mobile ||
      "-"
    );
  };

  const getStatusClasses = (status) => {
    const normalized = String(status || "New").toLowerCase();

    if (normalized === "new") {
      return "bg-sky-50 text-sky-700 border-sky-100";
    }

    if (normalized === "contacted") {
      return "bg-blue-50 text-blue-700 border-blue-100";
    }

    if (normalized === "interested") {
      return "bg-violet-50 text-violet-700 border-violet-100";
    }

    if (
      normalized === "follow up" ||
      normalized === "followup"
    ) {
      return "bg-orange-50 text-orange-700 border-orange-100";
    }

    if (
      normalized === "converted" ||
      normalized === "enrolled"
    ) {
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }

    if (
      normalized === "closed" ||
      normalized === "rejected" ||
      normalized === "cancelled"
    ) {
      return "bg-red-50 text-red-700 border-red-100";
    }

    return "bg-slate-50 text-slate-700 border-slate-100";
  };

  const getInitial = (lead) => {
    return getLeadName(lead)
      .charAt(0)
      .toUpperCase();
  };

  // ============================================================
  // FETCH DASHBOARD
  // ============================================================

  const fetchDashboard = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [statsResponse, leadsResponse] =
        await Promise.all([
          fetch(
            `${API_BASE_URL}/dashboard/stats`,
            {
              headers,
            }
          ),

          fetch(
            `${API_BASE_URL}/contact/recent-leads`,
            {
              headers,
            }
          ),
        ]);

      const statsData = await statsResponse.json();
      const leadsData = await leadsResponse.json();

      console.log(
        "ADMIN DASHBOARD STATS:",
        statsData
      );

      console.log(
        "ADMIN RECENT LEADS:",
        leadsData
      );

      // ========================================================
      // STATS
      // ========================================================

      if (statsData?.success) {
        const s = statsData?.stats || {};

        setStats({
          totalLeads:
            s.totalLeads ??
            s.total ??
            0,

          newLeads:
            s.newLeads ??
            s.new ??
            0,

          contactedLeads:
            s.contactedLeads ??
            s.contacted ??
            0,

          interestedLeads:
            s.interestedLeads ??
            s.interested ??
            0,

          followUpLeads:
            s.followUpLeads ??
            s.followUps ??
            s.followUp ??
            0,

          convertedLeads:
            s.convertedLeads ??
            s.converted ??
            0,

          closedLeads:
            s.closedLeads ??
            s.closed ??
            0,

          totalStudents:
            s.totalStudents ??
            s.students ??
            0,

          students:
            s.students ??
            s.totalStudents ??
            0,

          totalAdmissions:
            s.totalAdmissions ??
            s.admissions ??
            s.enrolledStudents ??
            0,

          totalCommission:
            s.totalCommission ??
            0,

          paidCommission:
            s.paidCommission ??
            0,

          pendingCommission:
            s.pendingCommission ??
            0,

          todayRevenue:
            s.todayRevenue ??
            s.todayCommission ??
            0,

          monthlyRevenue:
            s.monthlyRevenue ??
            s.paidCommission ??
            0,

          yearRevenue:
            s.yearRevenue ??
            s.totalCommission ??
            0,

          conversionRate:
            s.conversionRate ??
            0,
        });
      }

      // ========================================================
      // RECENT LEADS
      // ========================================================

      if (leadsData?.success) {
        const leads =
          leadsData?.recentLeads ||
          leadsData?.leads ||
          leadsData?.data ||
          [];

        setRecentLeads(
          Array.isArray(leads)
            ? leads
            : []
        );
      } else {
        setRecentLeads([]);
      }
    } catch (error) {
      console.error(
        "ADMIN DASHBOARD ERROR:",
        error
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ============================================================
  // CALCULATED DATA
  // ============================================================

  const leadPipeline = useMemo(() => {
    return [
      {
        label: "New",
        value: stats.newLeads,
        icon: UserPlus,
        color: "sky",
      },
      {
        label: "Contacted",
        value: stats.contactedLeads,
        icon: PhoneCall,
        color: "blue",
      },
      {
        label: "Interested",
        value: stats.interestedLeads,
        icon: UserCheck,
        color: "violet",
      },
      {
        label: "Follow Up",
        value: stats.followUpLeads,
        icon: Clock3,
        color: "orange",
      },
      {
        label: "Converted",
        value: stats.convertedLeads,
        icon: CheckCircle2,
        color: "emerald",
      },
      {
        label: "Closed",
        value: stats.closedLeads,
        icon: XCircle,
        color: "red",
      },
    ];
  }, [stats]);

  const conversionRate = useMemo(() => {
    if (Number(stats.conversionRate) > 0) {
      return Math.round(
        Number(stats.conversionRate)
      );
    }

    return getPercentage(
      stats.convertedLeads,
      stats.totalLeads
    );
  }, [
    stats.conversionRate,
    stats.convertedLeads,
    stats.totalLeads,
  ]);

  const admissionRate = useMemo(() => {
    return getPercentage(
      stats.totalAdmissions ||
        stats.students ||
        stats.totalStudents,
      stats.totalLeads
    );
  }, [
    stats.totalAdmissions,
    stats.students,
    stats.totalStudents,
    stats.totalLeads,
  ]);

  const paidCommissionPercentage =
    useMemo(() => {
      return getPercentage(
        stats.paidCommission,
        stats.totalCommission
      );
    }, [
      stats.paidCommission,
      stats.totalCommission,
    ]);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f9fc]">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-20 rounded-3xl bg-white" />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="h-32 rounded-3xl bg-white"
                  />
                )
              )}
            </div>

            <div className="grid gap-6 xl:grid-cols-12">
              <div className="h-[430px] rounded-3xl bg-white xl:col-span-8" />

              <div className="h-[430px] rounded-3xl bg-white xl:col-span-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // DASHBOARD
  // ============================================================

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      {/* ========================================================
          HEADER
      ======================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-4 sm:px-7 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
              <BarChart3
                size={23}
                className="text-white"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
                NextGen Education CRM
              </p>

              <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                Admin Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="hidden h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 sm:flex"
            >
              <Search size={18} />
            </button>

            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
               onClick={() => navigate("/admin/notifications")}
            >
              <Bell size={18} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            <button
              type="button"
              onClick={() => fetchDashboard(true)}
              disabled={refreshing}
              className="flex h-11 items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 text-sm font-bold text-sky-700 transition hover:border-sky-300 hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              <span className="hidden sm:inline">
                Refresh
              </span>
            </button>

            <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-sm font-black text-white">
                A
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Workspace
                </p>

                <p className="text-sm font-bold text-slate-800">
                  Admin
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          CONTENT
      ======================================================== */}

      <main className="mx-auto max-w-[1600px] space-y-7 px-5 py-7 sm:px-7 lg:px-10 lg:py-9">
        {/* ======================================================
            WELCOME
        ====================================================== */}

        <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-950 via-blue-950 to-sky-900 p-7 text-white shadow-xl shadow-blue-900/10 sm:p-9">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur">
                <Sparkles size={15} />
                NextGen Education CRM
              </div>

              <h2 className="max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Business Overview
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Manage leads, students, admissions,
                counsellors, follow-ups and revenue
                from one central workspace.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <p className="text-xs font-medium text-blue-100">
                  Total Commission
                </p>

                <p className="mt-2 text-2xl font-black sm:text-3xl">
                  ₹
                  {formatCurrency(
                    stats.totalCommission
                  )}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <p className="text-xs font-medium text-blue-100">
                  Conversion
                </p>

                <p className="mt-2 text-2xl font-black sm:text-3xl">
                  {conversionRate}%
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            KPI CARDS
        ====================================================== */}

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Business Snapshot
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Real-time CRM performance overview
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs font-semibold text-slate-400 sm:flex">
              <Activity size={15} />
              Live data
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* TOTAL LEADS */}

            <MetricCard
              title="Total Leads"
              value={stats.totalLeads}
              subtitle="All captured inquiries"
              icon={Users}
              iconBg="bg-sky-50"
              iconColor="text-sky-600"
              accent="from-sky-500 to-blue-600"
            />

            {/* NEW LEADS */}

            <MetricCard
              title="New Leads"
              value={stats.newLeads}
              subtitle="Waiting for first action"
              icon={UserPlus}
              iconBg="bg-emerald-50"
              iconColor="text-emerald-600"
              accent="from-emerald-500 to-teal-600"
            />

            {/* CONVERTED */}

            <MetricCard
              title="Converted Leads"
              value={stats.convertedLeads}
              subtitle={`${conversionRate}% conversion rate`}
              icon={CheckCircle2}
              iconBg="bg-violet-50"
              iconColor="text-violet-600"
              accent="from-violet-500 to-purple-600"
            />

            {/* STUDENTS */}

            <MetricCard
              title="Total Students"
              value={
                stats.totalStudents ||
                stats.students
              }
              subtitle="Converted student records"
              icon={GraduationCap}
              iconBg="bg-pink-50"
              iconColor="text-pink-600"
              accent="from-pink-500 to-rose-600"
            />

            {/* CONTACTED */}

            <MetricCard
              title="Contacted"
              value={stats.contactedLeads}
              subtitle="Leads already contacted"
              icon={PhoneCall}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              accent="from-blue-500 to-indigo-600"
            />

            {/* FOLLOW UPS */}

            <MetricCard
              title="Follow Ups"
              value={stats.followUpLeads}
              subtitle="Leads requiring follow-up"
              icon={Clock3}
              iconBg="bg-orange-50"
              iconColor="text-orange-600"
              accent="from-orange-500 to-amber-600"
            />

            {/* ADMISSIONS */}

            <MetricCard
              title="Admissions"
              value={
                stats.totalAdmissions ||
                stats.students
              }
              subtitle={`${admissionRate}% of total leads`}
              icon={FileCheck2}
              iconBg="bg-indigo-50"
              iconColor="text-indigo-600"
              accent="from-indigo-500 to-blue-700"
            />

            {/* CLOSED */}

            <MetricCard
              title="Closed Leads"
              value={stats.closedLeads}
              subtitle="Closed or inactive leads"
              icon={XCircle}
              iconBg="bg-red-50"
              iconColor="text-red-600"
              accent="from-red-500 to-rose-600"
            />
          </div>
        </section>

        {/* ======================================================
            FINANCIAL CARDS
        ====================================================== */}

        <section className="grid gap-4 md:grid-cols-3">
          <FinanceCard
            title="Today's Revenue"
            value={stats.todayRevenue}
            subtitle="Collected today"
            icon={Wallet}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />

          <FinanceCard
            title="Monthly Revenue"
            value={stats.monthlyRevenue}
            subtitle="Current month"
            icon={CalendarDays}
            iconBg="bg-orange-50"
            iconColor="text-orange-600"
          />

          <FinanceCard
            title="Paid Commission"
            value={stats.paidCommission}
            subtitle={`${paidCommissionPercentage}% of total commission`}
            icon={IndianRupee}
            iconBg="bg-sky-50"
            iconColor="text-sky-600"
          />
        </section>

        {/* ======================================================
            MAIN GRID
        ====================================================== */}

        <section className="grid gap-6 xl:grid-cols-12">
          {/* ====================================================
              RECENT LEADS
          ==================================================== */}

          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm xl:col-span-8">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-6 sm:px-7">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Recent Leads
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest enquiries received by the CRM
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700">
                <CircleDot
                  size={14}
                  className="animate-pulse"
                />

                Live
              </div>
            </div>

            <div className="overflow-x-auto">
              {recentLeads.length === 0 ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                    <Users
                      size={27}
                      className="text-slate-400"
                    />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-800">
                    No recent leads
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    New enquiries will appear here.
                  </p>
                </div>
              ) : (
                <table className="min-w-[760px] w-full">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                      <th className="px-7 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Lead
                      </th>

                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Course
                      </th>

                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Phone
                      </th>

                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Status
                      </th>

                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                        View
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentLeads.map(
                      (lead, index) => {
                        const name =
                          getLeadName(lead);

                        const status =
                          lead?.status ||
                          "New";

                        return (
                          <tr
                            key={
                              lead?._id ||
                              index
                            }
                            className="border-b border-slate-100 transition hover:bg-slate-50/80"
                          >
                            <td className="px-7 py-5">
                              <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-sm font-black text-white shadow-sm">
                                  {getInitial(
                                    lead
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate font-bold text-slate-800">
                                    {name}
                                  </p>

                                  <p className="mt-0.5 max-w-[190px] truncate text-xs text-slate-500">
                                    {lead?.email ||
                                      "-"}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-5 py-5">
                              <span className="inline-flex max-w-[180px] truncate rounded-xl bg-cyan-50 px-3 py-2 text-xs font-bold text-cyan-700">
                                {getCourseName(
                                  lead
                                )}
                              </span>
                            </td>

                            <td className="px-5 py-5 text-sm font-medium text-slate-600">
                              {getPhoneNumber(
                                lead
                              )}
                            </td>

                            <td className="px-5 py-5">
                              <span
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                                  status
                                )}`}
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />

                                {status}
                              </span>
                            </td>

                            <td className="px-5 py-5">
                              <button
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
                              >
                                <ChevronRight
                                  size={17}
                                />
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* ====================================================
              PERFORMANCE
          ==================================================== */}

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm xl:col-span-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Performance
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Current business health
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                <TrendingUp size={21} />
              </div>
            </div>

            <div className="mt-7 space-y-6">
              <ProgressItem
                title="Lead Conversion"
                value={conversionRate}
                color="bg-sky-500"
                textColor="text-sky-600"
              />

              <ProgressItem
                title="Admission Progress"
                value={admissionRate}
                color="bg-emerald-500"
                textColor="text-emerald-600"
              />

              <ProgressItem
                title="Commission Collected"
                value={
                  paidCommissionPercentage
                }
                color="bg-violet-500"
                textColor="text-violet-600"
              />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Pending Commission
                </p>

                <p className="mt-2 text-lg font-black text-slate-900">
                  ₹
                  {formatCurrency(
                    stats.pendingCommission
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Total Students
                </p>

                <p className="mt-2 text-lg font-black text-slate-900">
                  {stats.totalStudents ||
                    stats.students}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            LEAD PIPELINE
        ====================================================== */}

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Lead Pipeline
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Track leads through the complete sales journey.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-2 text-xs font-bold text-slate-500">
              {stats.totalLeads} Total Leads
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {leadPipeline.map(
              (item) => {
                const Icon = item.icon;

                const percentage =
                  getPercentage(
                    item.value,
                    stats.totalLeads
                  );

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                        <Icon
                          size={19}
                          className="text-slate-600"
                        />
                      </div>

                      <span className="text-xs font-bold text-slate-400">
                        {percentage}%
                      </span>
                    </div>

                    <p className="mt-4 text-sm font-bold text-slate-700">
                      {item.label}
                    </p>

                    <p className="mt-1 text-2xl font-black text-slate-900">
                      {item.value}
                    </p>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-slate-700 transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>

        {/* ======================================================
            QUICK ANALYTICS
        ====================================================== */}

        <section className="grid gap-6 lg:grid-cols-3">
          <AnalyticsCard
            title="Completed Leads"
            value={stats.convertedLeads}
            description="Successfully converted leads"
            icon={CheckCircle2}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <AnalyticsCard
            title="Pending Follow Ups"
            value={stats.followUpLeads}
            description="Leads waiting for follow-up"
            icon={Clock3}
            iconClass="bg-orange-50 text-orange-600"
          />

          <AnalyticsCard
            title="Pending Commission"
            value={`₹${formatCurrency(
              stats.pendingCommission
            )}`}
            description="Commission yet to be collected"
            icon={ShieldCheck}
            iconClass="bg-violet-50 text-violet-600"
          />
        </section>

        {/* ======================================================
            FOOTER SUMMARY
        ====================================================== */}

        <section className="overflow-hidden rounded-[30px] bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 p-7 text-white shadow-xl shadow-blue-600/10 sm:p-9">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold backdrop-blur">
                <Sparkles size={15} />
                CRM Overview
              </div>

              <h2 className="mt-4 text-3xl font-black">
                Your business at a glance
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                Keep track of your leads, student
                conversions, admissions and commission
                performance from the NextGen admin panel.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="min-w-[140px] rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-xs text-blue-100">
                  Paid Commission
                </p>

                <p className="mt-2 text-2xl font-black">
                  ₹
                  {formatCurrency(
                    stats.paidCommission
                  )}
                </p>
              </div>

              <div className="min-w-[140px] rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-xs text-blue-100">
                  Students
                </p>

                <p className="mt-2 text-2xl font-black">
                  {stats.totalStudents ||
                    stats.students}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// ============================================================
// METRIC CARD
// ============================================================

const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  accent,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-400">
            {title}
          </p>

          <p className="mt-3 truncate text-3xl font-black tracking-tight text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs font-medium text-slate-500">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg} ${iconColor} transition duration-300 group-hover:scale-110`}
        >
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// FINANCE CARD
// ============================================================

const FinanceCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
}) => {
  const formatted = new Intl.NumberFormat(
    "en-IN",
    {
      maximumFractionDigits: 0,
    }
  ).format(Number(value) || 0);

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <p className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
            ₹{formatted}
          </p>

          <p className="mt-1 text-xs font-medium text-slate-500">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}
        >
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PROGRESS ITEM
// ============================================================

const ProgressItem = ({
  title,
  value,
  color,
  textColor,
}) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-600">
          {title}
        </span>

        <span
          className={`text-sm font-black ${textColor}`}
        >
          {value}%
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{
            width: `${Math.min(
              100,
              Math.max(0, value)
            )}%`,
          }}
        />
      </div>
    </div>
  );
};

// ============================================================
// ANALYTICS CARD
// ============================================================

const AnalyticsCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
}) => {
  return (
    <div className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>

        <div>
          <p className="text-sm font-bold text-slate-800">
            {title}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <p className="text-2xl font-black text-slate-900">
        {value}
      </p>
    </div>
  );
};

export default Dashboard;