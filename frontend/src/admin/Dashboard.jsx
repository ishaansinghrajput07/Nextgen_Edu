import { useEffect, useState } from "react";
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
  CalendarDays,
  LayoutGrid,
  BarChart3,
  Bell,
  Search,
  Menu,
  ClipboardList,
} from "lucide-react";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({
    totalLeads: 0,
    newLeads: 0,
    totalCalls: 0,
    totalAdmissions: 0,

    todayRevenue: 0,
    monthlyRevenue: 0,
    yearRevenue: 0,

    completedLeads: 0,
    pendingLeads: 0,
    activeUsers: 0,

    recentLeads: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const statsRes = await fetch(
          "http://localhost:8000/api/v1/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const statsData = await statsRes.json();

        const leadsRes = await fetch(
          "http://localhost:8000/api/v1/contact/recent-leads",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const leadsData = await leadsRes.json();

        if (statsData.success) {
          const s = statsData.stats;

          setDashboard({
            totalLeads: s.totalLeads || 0,
            newLeads: s.newLeads || 0,

            totalCalls: s.contactedLeads || 0,
            totalAdmissions: s.students || 0,

            todayRevenue: s.paidCommission || 0,
            monthlyRevenue: s.paidCommission || 0,
            yearRevenue: s.totalCommission || 0,

            completedLeads: s.convertedLeads || 0,
            pendingLeads: s.followUpLeads || 0,
            activeUsers: s.students || 0,

            recentLeads: leadsData.success ? leadsData.recentLeads || [] : [],
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      {/* Top Header */}

      <div className="sticky top-0 z-30 border-b bg-white">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-6">
            <button className="rounded-xl border p-2 hover:bg-gray-100 lg:hidden">
              <Menu size={20} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800">
              Operations Console
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-xl border p-3 hover:bg-gray-50">
              <Search size={18} />
            </button>

            <button className="rounded-xl border p-3 hover:bg-gray-50">
              <Bell size={18} />
            </button>

            <div className="rounded-full border border-green-200 bg-green-50 px-4 py-2 font-semibold text-green-700">
              Earth Bond Admin
            </div>
          </div>
        </div>
      </div>

      {(() => {
        const metricCards = [
          {
            title: "Total Leads",
            value: dashboard.totalLeads,
            subtitle: "All captured inquiries",
            icon: Users,
            color: "text-sky-500",
            bg: "bg-sky-50",
            border: "border-sky-100",
          },
          {
            title: "New Inquiries",
            value: dashboard.newLeads,
            subtitle: "Pending first action",
            icon: UserPlus,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
          },
          {
            title: "Converted Leads",
            value: dashboard.completedLeads,
            subtitle: "Closed into clients",
            icon: CheckCircle2,
            color: "text-violet-500",
            bg: "bg-violet-50",
            border: "border-violet-100",
          },
          {
            title: "Total Clients",
            value: dashboard.activeUsers,
            subtitle: "Onboarded accounts",
            icon: GraduationCap,
            color: "text-pink-500",
            bg: "bg-pink-50",
            border: "border-pink-100",
          },
          {
            title: "Follow-ups Today",
            value: dashboard.pendingLeads,
            subtitle: "Due actions",
            icon: Clock3,
            color: "text-orange-500",
            bg: "bg-orange-50",
            border: "border-orange-100",
          },
          {
            title: "Overdue Follow-ups",
            value: 0,
            subtitle: "Past due",
            icon: PhoneCall,
            color: "text-red-500",
            bg: "bg-red-50",
            border: "border-red-100",
          },
          {
            title: "Active Applications",
            value: dashboard.totalAdmissions,
            subtitle: "Live work items",
            icon: Activity,
            color: "text-indigo-500",
            bg: "bg-indigo-50",
            border: "border-indigo-100",
          },
          {
            title: "Pending Documents",
            value: dashboard.pendingLeads,
            subtitle: "Client action needed",
            icon: ShieldCheck,
            color: "text-yellow-500",
            bg: "bg-yellow-50",
            border: "border-yellow-100",
          },
          {
            title: "Today's Revenue",
            value: `₹${dashboard.todayRevenue}`,
            subtitle: "Collected today",
            icon: Wallet,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
          },
          {
            title: "Monthly Revenue",
            value: `₹${dashboard.monthlyRevenue}`,
            subtitle: "Current month",
            icon: IndianRupee,
            color: "text-orange-500",
            bg: "bg-orange-50",
            border: "border-orange-100",
          },
          {
            title: "Year Revenue",
            value: `₹${dashboard.yearRevenue}`,
            subtitle: "Total earnings",
            icon: TrendingUp,
            color: "text-sky-500",
            bg: "bg-sky-50",
            border: "border-sky-100",
          },
          {
            title: "Calls Done",
            value: dashboard.totalCalls,
            subtitle: "Contacted students",
            icon: PhoneCall,
            color: "text-violet-500",
            bg: "bg-violet-50",
            border: "border-violet-100",
          },
        ];

        return (
          <div className="px-10 py-6">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {metricCards.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-2xl border ${item.border} bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                  >
                    {/* Background Glow */}
                    <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-bl from-gray-50 to-transparent" />

                    <div className="relative flex items-center justify-between">
                      {/* Left */}
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {item.title}
                        </p>

                        <h2
                          className={`mt-2 text-3xl font-black leading-none ${item.color}`}
                        >
                          {item.value}
                        </h2>

                        <p className="mt-1 text-xs text-gray-400">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Right Icon */}
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bg}`}
                      >
                        <Icon className={item.color} size={22} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      <div className="grid gap-6 px-10 pb-8 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm">
            {/* Header */}

            <div className="flex items-center justify-between border-b border-gray-100 px-7 py-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Recent Leads
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Latest enquiries received
                </p>
              </div>

              <button className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-600 transition hover:bg-sky-100">
                View All
              </button>
            </div>

            {/* Table */}

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="px-7 py-4 text-sm font-semibold text-gray-500">
                      Student
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">
                      Course
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">
                      Phone
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {(dashboard.recentLeads || []).map((lead, index) => (
                    <tr
                      key={lead._id || index}
                      className="border-b border-gray-100 transition hover:bg-slate-50"
                    >
                      {/* Student */}

                      <td className="px-7 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 font-bold text-white">
                            {(lead?.name || "S").charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {lead?.name || "-"}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {lead?.email || "-"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Course */}

                      <td className="px-6 py-5">
                        <span className="rounded-xl bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700">
                          {lead?.course || "-"}
                        </span>
                      </td>

                      {/* Phone */}

                      <td className="px-6 py-5 text-gray-700">
                        {lead?.phone || "-"}
                      </td>

                      {/* Status */}

                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                          <CheckCircle2 size={16} />

                          {lead?.status || "New"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6 xl:col-span-4">
          {/* Performance */}

          <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Performance</h3>

                <p className="text-sm text-gray-500">Overall business health</p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 p-3 text-white">
                <TrendingUp size={22} />
              </div>
            </div>

            {/* Conversion */}

            <div className="mb-6">
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-gray-600">Conversion</span>

                <span className="font-semibold text-sky-600">82%</span>
              </div>

              <div className="h-2 rounded-full bg-gray-100">
                <div className="h-full w-[82%] rounded-full bg-sky-500"></div>
              </div>
            </div>

            {/* Admissions */}

            <div className="mb-6">
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-gray-600">Admissions</span>

                <span className="font-semibold text-emerald-600">71%</span>
              </div>

              <div className="h-2 rounded-full bg-gray-100">
                <div className="h-full w-[71%] rounded-full bg-emerald-500"></div>
              </div>
            </div>

            {/* Revenue */}

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-gray-600">Revenue</span>

                <span className="font-semibold text-pink-600">91%</span>
              </div>

              <div className="h-2 rounded-full bg-gray-100">
                <div className="h-full w-[91%] rounded-full bg-pink-500"></div>
              </div>
            </div>
          </div>

          {/* Part 4 me Quick Analytics + Bottom Summary banega */}
        </div>
      </div>

      <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Quick Analytics</h3>

            <p className="text-sm text-gray-500">Today's summary</p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
            <ShieldCheck className="text-violet-600" size={22} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-2">
                <CheckCircle2 className="text-emerald-600" size={18} />
              </div>

              <span className="font-medium text-gray-700">Completed Leads</span>
            </div>

            <span className="text-xl font-bold text-gray-800">
              {dashboard.completedLeads}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-yellow-100 p-2">
                <Clock3 className="text-yellow-600" size={18} />
              </div>

              <span className="font-medium text-gray-700">Pending Leads</span>
            </div>

            <span className="text-xl font-bold text-gray-800">
              {dashboard.pendingLeads}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-sky-100 p-2">
                <Users className="text-sky-600" size={18} />
              </div>

              <span className="font-medium text-gray-700">Active Users</span>
            </div>

            <span className="text-xl font-bold text-gray-800">
              {dashboard.activeUsers}
            </span>
          </div>
        </div>
      </div>

      <div className="px-10 pb-10">
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 p-8 text-white shadow-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
                <Sparkles size={16} />
                Earth Bond Solutions CRM
              </div>

              <h2 className="mt-5 text-4xl font-black">Business Overview</h2>

              <p className="mt-3 max-w-2xl text-blue-100">
                Monitor leads, admissions, revenue, follow-ups and business
                performance from a single premium admin dashboard.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <p className="text-sm text-blue-100">Total Revenue</p>

                <h3 className="mt-2 text-3xl font-black">
                  ₹{dashboard.yearRevenue}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-green-300">
                  <ArrowUpRight size={18} />

                  <span className="font-semibold">+22%</span>
                </div>
              </div>

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <p className="text-sm text-blue-100">Success Rate</p>

                <h3 className="mt-2 text-3xl font-black">96%</h3>

                <div className="mt-3 flex items-center gap-2 text-cyan-300">
                  <TrendingUp size={18} />

                  <span className="font-semibold">Excellent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
