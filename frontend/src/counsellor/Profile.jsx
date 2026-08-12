import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Target,
  Users,
  UserCheck,
  TrendingUp,
  IndianRupee,
  WalletCards,
  Clock,
  Activity,
  GraduationCap,
  ArrowRight,
  Pencil,
  LockKeyhole,
  X,
  Save,
  Loader2,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  PhoneCall,
} from "lucide-react";

const API_BASE_URL = "http://localhost:8000/api/v1/counsellor";

const Profile = () => {
  const token = localStorage.getItem("token");

  const [counsellor, setCounsellor] = useState(null);

  const [leads, setLeads] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [todaysFollowUps, setTodaysFollowUps] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    notes: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =====================================================
  // SAFE ARRAY HELPER
  // =====================================================

  const getArray = (data, keys = []) => {
    if (Array.isArray(data)) return data;

    for (const key of keys) {
      if (Array.isArray(data?.[key])) {
        return data[key];
      }
    }

    return [];
  };

  // =====================================================
  // FETCH PROFILE
  // =====================================================

  const fetchProfile = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/profile`,
      authConfig
    );

    const profile = response.data?.counsellor;

    setCounsellor(profile || null);

    if (profile) {
      setEditForm({
        name: profile.name || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        notes: profile.notes || "",
      });
    }
  };

  // =====================================================
  // FETCH LEADS
  // =====================================================

  const fetchLeads = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/leads`,
        authConfig
      );

      const data = response.data;

      setLeads(getArray(data, ["leads"]));
    } catch (error) {
      console.log(
        "LEADS ERROR:",
        error.response?.data || error.message
      );
    }
  };

  // =====================================================
  // FETCH RECENT LEADS
  // =====================================================

  const fetchRecentLeads = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/recent-leads`,
        authConfig
      );

      setRecentLeads(
        getArray(response.data, ["leads", "recentLeads"])
      );
    } catch (error) {
      console.log(
        "RECENT LEADS ERROR:",
        error.response?.data || error.message
      );
    }
  };

  // =====================================================
  // FETCH RECENT STUDENTS
  // =====================================================

  const fetchRecentStudents = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/recent-students`,
        authConfig
      );

      setRecentStudents(
        getArray(response.data, ["students", "recentStudents"])
      );
    } catch (error) {
      console.log(
        "RECENT STUDENTS ERROR:",
        error.response?.data || error.message
      );
    }
  };

  // =====================================================
  // FETCH ACTIVITIES
  // =====================================================

  const fetchRecentActivities = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/recent-activities`,
        authConfig
      );

      setRecentActivities(
        getArray(response.data, ["activities", "recentActivities"])
      );
    } catch (error) {
      console.log(
        "ACTIVITIES ERROR:",
        error.response?.data || error.message
      );
    }
  };

  // =====================================================
  // FETCH TODAY FOLLOW UPS
  // =====================================================

  const fetchTodaysFollowUps = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/todays-followups`,
        authConfig
      );

      setTodaysFollowUps(
        getArray(response.data, ["followUps", "followups", "data"])
      );
    } catch (error) {
      console.log(
        "FOLLOW UPS ERROR:",
        error.response?.data || error.message
      );
    }
  };

  // =====================================================
  // FETCH ALL PROFILE DATA
  // =====================================================

  const fetchAllData = async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      await Promise.all([
        fetchProfile(),
        fetchLeads(),
        fetchRecentLeads(),
        fetchRecentStudents(),
        fetchRecentActivities(),
        fetchTodaysFollowUps(),
      ]);
    } catch (error) {
      console.log(
        "PROFILE FETCH ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // =====================================================
  // PERFORMANCE
  // =====================================================

  const performance = useMemo(() => {
    const assigned = leads.length;

    const converted = leads.filter(
      (lead) =>
        String(lead.status || "").toLowerCase() ===
        "converted"
    ).length;

    const enrolled = leads.filter(
      (lead) =>
        String(lead.status || "").toLowerCase() ===
        "enrolled"
    ).length;

    const interested = leads.filter(
      (lead) =>
        String(lead.status || "").toLowerCase() ===
        "interested"
    ).length;

    const followUp = leads.filter(
      (lead) =>
        String(lead.status || "").toLowerCase() ===
        "follow up"
    ).length;

    const contacted = leads.filter(
      (lead) =>
        String(lead.status || "").toLowerCase() ===
        "contacted"
    ).length;

    const conversionRate =
      assigned > 0
        ? Math.round((converted / assigned) * 100)
        : 0;

    return {
      assigned,
      converted,
      enrolled,
      interested,
      followUp,
      contacted,
      conversionRate,
    };
  }, [leads]);

  // =====================================================
  // EDIT PROFILE
  // =====================================================

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!editForm.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!editForm.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!editForm.phoneNumber.trim()) {
      toast.error("Phone number is required");
      return;
    }

    try {
      setSavingProfile(true);

      const { data } = await axios.put(
        `${API_BASE_URL}/profile`,
        {
          name: editForm.name.trim(),
          email: editForm.email.trim(),
          phoneNumber: editForm.phoneNumber.trim(),
          notes: editForm.notes,
        },
        authConfig
      );

      if (data.success) {
        setCounsellor(data.counsellor);

        setEditForm({
          name: data.counsellor?.name || "",
          email: data.counsellor?.email || "",
          phoneNumber: data.counsellor?.phoneNumber || "",
          notes: data.counsellor?.notes || "",
        });

        setEditOpen(false);

        toast.success(
          data.message || "Profile updated successfully"
        );
      }
    } catch (error) {
      console.log(
        "UPDATE PROFILE ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSavingProfile(false);
    }
  };

  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!passwordForm.currentPassword) {
      toast.error("Current password is required");
      return;
    }

    if (!passwordForm.newPassword) {
      toast.error("New password is required");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error(
        "New password must be at least 6 characters"
      );
      return;
    }

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setChangingPassword(true);

      const { data } = await axios.put(
        `${API_BASE_URL}/change-password`,
        {
          currentPassword:
            passwordForm.currentPassword,

          newPassword:
            passwordForm.newPassword,
        },
        authConfig
      );

      if (data.success) {
        toast.success(
          data.message ||
            "Password changed successfully"
        );

        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        setPasswordOpen(false);
      }
    } catch (error) {
      console.log(
        "CHANGE PASSWORD ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to change password"
      );
    } finally {
      setChangingPassword(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center">
            <Loader2
              size={26}
              className="text-cyan-600 animate-spin"
            />
          </div>

          <p className="text-sm text-slate-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!counsellor) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
        <AlertCircle
          size={42}
          className="mx-auto text-red-400 mb-4"
        />

        <h2 className="text-xl font-bold text-slate-800">
          Profile not found
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          We couldn't load your counsellor profile.
        </p>

        <button
          onClick={() => fetchAllData()}
          className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 transition"
        >
          <RefreshCcw size={18} />
          Try Again
        </button>
      </div>
    );
  }

  const initials =
    counsellor.name
      ?.split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "C";

  const joiningDate = counsellor.joiningDate
    ? new Date(
        counsellor.joiningDate
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  const totalCommission = Number(
    counsellor.totalCommission || 0
  );

  const paidCommission = Number(
    counsellor.paidCommission || 0
  );

  const pendingCommission = Number(
    counsellor.pendingCommission || 0
  );

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="space-y-6 pb-10">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
            My Profile
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage your account, performance and security
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchAllData(false)}
            disabled={refreshing}
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-white
              border
              border-slate-200
              text-slate-600
              shadow-sm
              hover:bg-slate-50
              transition
              disabled:opacity-60
            "
          >
            <RefreshCcw
              size={17}
              className={
                refreshing ? "animate-spin" : ""
              }
            />

            Refresh
          </button>

          <button
            onClick={() => setEditOpen(true)}
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-2.5
              rounded-xl
              bg-cyan-600
              text-white
              shadow-sm
              hover:bg-cyan-700
              transition
            "
          >
            <Pencil size={17} />

            Edit Profile
          </button>
        </div>
      </div>

      {/* =================================================
          PROFILE HERO
      ================================================= */}

      <div
        className="
          relative
          overflow-hidden
          bg-white
          border
          border-slate-200
          rounded-[28px]
          shadow-[0_20px_60px_rgba(15,23,42,0.06)]
          p-5
          sm:p-7
        "
      >
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-100/60 blur-3xl" />

        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-sky-100/50 blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            {/* Avatar */}

            <div
              className="
                h-24
                w-24
                sm:h-28
                sm:w-28
                shrink-0
                rounded-[28px]
                bg-gradient-to-br
                from-cyan-500
                to-sky-600
                text-white
                flex
                items-center
                justify-center
                text-3xl
                sm:text-4xl
                font-extrabold
                shadow-lg
                shadow-cyan-500/20
              "
            >
              {initials}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                  {counsellor.name}
                </h2>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    px-3
                    py-1.5
                    rounded-full
                    bg-emerald-50
                    border
                    border-emerald-100
                    text-emerald-700
                    text-xs
                    font-semibold
                  "
                >
                  <CheckCircle2 size={14} />

                  {counsellor.status || "Active"}
                </span>
              </div>

              <p className="text-slate-500 mt-1">
                {counsellor.designation ||
                  "Admission Counsellor"}
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-slate-500">

                <span className="inline-flex items-center gap-2">
                  <BriefcaseBusiness
                    size={15}
                    className="text-cyan-600"
                  />

                  {counsellor.employeeId || "Employee ID unavailable"}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Building2
                    size={15}
                    className="text-cyan-600"
                  />

                  {counsellor.department || "Counselling"}
                </span>

                <span className="inline-flex items-center gap-2">
                  <CalendarDays
                    size={15}
                    className="text-cyan-600"
                  />

                  Joined {joiningDate}
                </span>

              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPasswordOpen(true)}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-slate-50
                border
                border-slate-200
                text-slate-700
                hover:bg-cyan-50
                hover:text-cyan-700
                hover:border-cyan-200
                transition
              "
            >
              <LockKeyhole size={17} />

              Change Password
            </button>
          </div>

        </div>
      </div>

      {/* =================================================
          PERFORMANCE CARDS
      ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          icon={Users}
          title="Assigned Leads"
          value={performance.assigned}
          subtitle="Total assigned to you"
          iconBg="bg-cyan-50"
          iconColor="text-cyan-600"
        />

        <StatCard
          icon={UserCheck}
          title="Converted Leads"
          value={performance.converted}
          subtitle="Successfully converted"
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />

        <StatCard
          icon={TrendingUp}
          title="Conversion Rate"
          value={`${performance.conversionRate}%`}
          subtitle="Lead conversion performance"
          iconBg="bg-violet-50"
          iconColor="text-violet-600"
        />

        <StatCard
          icon={GraduationCap}
          title="Enrolled"
          value={performance.enrolled}
          subtitle="Successful enrollments"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />

      </div>

      {/* =================================================
          PERSONAL + PERFORMANCE
      ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Personal Details */}

        <div
          className="
            xl:col-span-2
            bg-white
            border
            border-slate-200
            rounded-[26px]
            shadow-[0_15px_45px_rgba(15,23,42,0.05)]
            p-5
            sm:p-6
          "
        >
          <SectionHeader
            icon={User}
            title="Personal Details"
            subtitle="Your account information"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">

            <DetailItem
              icon={User}
              label="Full Name"
              value={counsellor.name}
            />

            <DetailItem
              icon={Mail}
              label="Email"
              value={counsellor.email}
            />

            <DetailItem
              icon={Phone}
              label="Phone Number"
              value={counsellor.phoneNumber}
            />

            <DetailItem
              icon={ShieldCheck}
              label="Role"
              value={counsellor.role || "Counsellor"}
            />

            <DetailItem
              icon={BriefcaseBusiness}
              label="Designation"
              value={
                counsellor.designation ||
                "Admission Counsellor"
              }
            />

            <DetailItem
              icon={Building2}
              label="Department"
              value={
                counsellor.department ||
                "Counselling"
              }
            />

          </div>
        </div>

        {/* Targets */}

        <div
          className="
            bg-white
            border
            border-slate-200
            rounded-[26px]
            shadow-[0_15px_45px_rgba(15,23,42,0.05)]
            p-5
            sm:p-6
          "
        >
          <SectionHeader
            icon={Target}
            title="Monthly Targets"
            subtitle="Your assigned targets"
          />

          <TargetRow
            icon={Users}
            title="Lead Target"
            value={
              counsellor.monthlyLeadTarget || 0
            }
            current={performance.assigned}
          />

          <TargetRow
            icon={GraduationCap}
            title="Admission Target"
            value={
              counsellor.monthlyAdmissionTarget || 0
            }
            current={performance.enrolled}
          />

        </div>
      </div>

      {/* =================================================
          COMMISSION
      ================================================= */}

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-[26px]
          shadow-[0_15px_45px_rgba(15,23,42,0.05)]
          p-5
          sm:p-6
        "
      >
        <SectionHeader
          icon={IndianRupee}
          title="Commission Overview"
          subtitle="Your commission summary"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <CommissionCard
            title="Total Commission"
            value={totalCommission}
            icon={WalletCards}
            bg="bg-cyan-50"
            text="text-cyan-700"
          />

          <CommissionCard
            title="Paid Commission"
            value={paidCommission}
            icon={CheckCircle2}
            bg="bg-emerald-50"
            text="text-emerald-700"
          />

          <CommissionCard
            title="Pending Commission"
            value={pendingCommission}
            icon={Clock}
            bg="bg-amber-50"
            text="text-amber-700"
          />

        </div>
      </div>

      {/* =================================================
          LEAD STATUS
      ================================================= */}

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-[26px]
          shadow-[0_15px_45px_rgba(15,23,42,0.05)]
          p-5
          sm:p-6
        "
      >
        <SectionHeader
          icon={TrendingUp}
          title="Lead Status Overview"
          subtitle="Current distribution of your leads"
        />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">

          <MiniStatus
            title="Contacted"
            value={performance.contacted}
            className="bg-blue-50 text-blue-700"
          />

          <MiniStatus
            title="Interested"
            value={performance.interested}
            className="bg-violet-50 text-violet-700"
          />

          <MiniStatus
            title="Follow Up"
            value={performance.followUp}
            className="bg-amber-50 text-amber-700"
          />

          <MiniStatus
            title="Converted"
            value={performance.converted}
            className="bg-emerald-50 text-emerald-700"
          />

          <MiniStatus
            title="Enrolled"
            value={performance.enrolled}
            className="bg-cyan-50 text-cyan-700"
          />

        </div>
      </div>

      {/* =================================================
          RECENT LEADS + FOLLOW UPS
      ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Recent Leads */}

        <ListCard
          icon={Users}
          title="Recent Leads"
          subtitle="Latest leads assigned to you"
        >
          {recentLeads.length === 0 ? (
            <EmptyList text="No recent leads found." />
          ) : (
            recentLeads.slice(0, 5).map((lead, index) => (
              <LeadRow
                key={lead._id || lead.id || index}
                lead={lead}
              />
            ))
          )}
        </ListCard>

        {/* Today's Follow Ups */}

        <ListCard
          icon={PhoneCall}
          title="Today's Follow-ups"
          subtitle="Follow-ups scheduled for today"
        >
          {todaysFollowUps.length === 0 ? (
            <EmptyList text="No follow-ups for today." />
          ) : (
            todaysFollowUps
              .slice(0, 5)
              .map((followUp, index) => (
                <FollowUpRow
                  key={
                    followUp._id ||
                    followUp.id ||
                    index
                  }
                  item={followUp}
                />
              ))
          )}
        </ListCard>

      </div>

      {/* =================================================
          RECENT STUDENTS + ACTIVITIES
      ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Recent Students */}

        <ListCard
          icon={GraduationCap}
          title="Recent Students"
          subtitle="Recently added students"
        >
          {recentStudents.length === 0 ? (
            <EmptyList text="No recent students found." />
          ) : (
            recentStudents
              .slice(0, 5)
              .map((student, index) => (
                <StudentRow
                  key={
                    student._id ||
                    student.id ||
                    index
                  }
                  student={student}
                />
              ))
          )}
        </ListCard>

        {/* Activities */}

        <ListCard
          icon={Activity}
          title="Recent Activities"
          subtitle="Your latest account activities"
        >
          {recentActivities.length === 0 ? (
            <EmptyList text="No recent activities found." />
          ) : (
            recentActivities
              .slice(0, 5)
              .map((activity, index) => (
                <ActivityRow
                  key={
                    activity._id ||
                    activity.id ||
                    index
                  }
                  activity={activity}
                />
              ))
          )}
        </ListCard>

      </div>

      {/* =================================================
          NOTES
      ================================================= */}

      {counsellor.notes && (
        <div
          className="
            bg-white
            border
            border-slate-200
            rounded-[26px]
            shadow-[0_15px_45px_rgba(15,23,42,0.05)]
            p-5
            sm:p-6
          "
        >
          <SectionHeader
            icon={BookOpen}
            title="Profile Notes"
            subtitle="Additional information"
          />

          <p className="text-sm leading-7 text-slate-600 whitespace-pre-wrap">
            {counsellor.notes}
          </p>
        </div>
      )}

      {/* =================================================
          SECURITY
      ================================================= */}

      <div
        className="
          bg-gradient-to-r
          from-slate-900
          to-slate-800
          rounded-[26px]
          p-5
          sm:p-6
          text-white
          shadow-[0_20px_50px_rgba(15,23,42,0.15)]
        "
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <LockKeyhole size={23} />
            </div>

            <div>
              <h3 className="text-lg font-bold">
                Account Security
              </h3>

              <p className="text-sm text-slate-300 mt-1">
                Keep your counsellor account secure.
              </p>
            </div>

          </div>

          <button
            onClick={() => setPasswordOpen(true)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-5
              py-2.5
              rounded-xl
              bg-white
              text-slate-800
              font-semibold
              hover:bg-cyan-50
              hover:text-cyan-700
              transition
            "
          >
            <LockKeyhole size={17} />
            Change Password
          </button>

        </div>
      </div>

      {/* =================================================
          EDIT PROFILE MODAL
      ================================================= */}

      {editOpen && (
        <Modal
          title="Edit Profile"
          subtitle="Update your personal information"
          icon={Pencil}
          onClose={() => {
            if (!savingProfile) {
              setEditOpen(false);
            }
          }}
        >
          <form
            onSubmit={handleUpdateProfile}
            className="space-y-5"
          >

            <FormInput
              label="Full Name"
              icon={User}
              value={editForm.name}
              onChange={(value) =>
                handleEditChange("name", value)
              }
            />

            <FormInput
              label="Email Address"
              type="email"
              icon={Mail}
              value={editForm.email}
              onChange={(value) =>
                handleEditChange("email", value)
              }
            />

            <FormInput
              label="Phone Number"
              icon={Phone}
              value={editForm.phoneNumber}
              onChange={(value) =>
                handleEditChange(
                  "phoneNumber",
                  value
                )
              }
            />

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Notes
              </label>

              <textarea
                value={editForm.notes}
                onChange={(e) =>
                  handleEditChange(
                    "notes",
                    e.target.value
                  )
                }
                rows={4}
                placeholder="Add profile notes..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-sm
                  text-slate-800
                  outline-none
                  resize-none
                  focus:bg-white
                  focus:border-cyan-400
                  focus:ring-4
                  focus:ring-cyan-50
                  transition
                "
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">

              <button
                type="button"
                disabled={savingProfile}
                onClick={() => setEditOpen(false)}
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  border
                  border-slate-200
                  text-slate-600
                  hover:bg-slate-50
                  transition
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={savingProfile}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-xl
                  bg-cyan-600
                  text-white
                  hover:bg-cyan-700
                  disabled:opacity-60
                  transition
                "
              >
                {savingProfile ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <Save size={17} />
                )}

                {savingProfile
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>
          </form>
        </Modal>
      )}

      {/* =================================================
          PASSWORD MODAL
      ================================================= */}

      {passwordOpen && (
        <Modal
          title="Change Password"
          subtitle="Update your account password securely"
          icon={LockKeyhole}
          onClose={() => {
            if (!changingPassword) {
              setPasswordOpen(false);
            }
          }}
        >
          <form
            onSubmit={handlePasswordChange}
            className="space-y-5"
          >

            <FormInput
              label="Current Password"
              type="password"
              icon={LockKeyhole}
              value={passwordForm.currentPassword}
              onChange={(value) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  currentPassword: value,
                }))
              }
            />

            <FormInput
              label="New Password"
              type="password"
              icon={LockKeyhole}
              value={passwordForm.newPassword}
              onChange={(value) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  newPassword: value,
                }))
              }
            />

            <FormInput
              label="Confirm New Password"
              type="password"
              icon={LockKeyhole}
              value={passwordForm.confirmPassword}
              onChange={(value) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  confirmPassword: value,
                }))
              }
            />

            <div className="rounded-xl bg-cyan-50 border border-cyan-100 p-4">
              <p className="text-xs text-cyan-700 leading-5">
                Password must contain at least 6
                characters.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">

              <button
                type="button"
                disabled={changingPassword}
                onClick={() =>
                  setPasswordOpen(false)
                }
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  border
                  border-slate-200
                  text-slate-600
                  hover:bg-slate-50
                  transition
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={changingPassword}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-xl
                  bg-slate-800
                  text-white
                  hover:bg-slate-900
                  disabled:opacity-60
                  transition
                "
              >
                {changingPassword ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <LockKeyhole size={17} />
                )}

                {changingPassword
                  ? "Changing..."
                  : "Change Password"}
              </button>

            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};

// =========================================================
// STAT CARD
// =========================================================

const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  iconBg,
  iconColor,
}) => {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-[24px]
        p-5
        shadow-[0_12px_35px_rgba(15,23,42,0.05)]
        hover:-translate-y-1
        hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]
        transition-all
        duration-300
      "
    >
      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="text-3xl font-extrabold text-slate-800 mt-2">
            {value}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            {subtitle}
          </p>
        </div>

        <div
          className={`h-11 w-11 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center`}
        >
          <Icon size={21} />
        </div>

      </div>
    </div>
  );
};

// =========================================================
// SECTION HEADER
// =========================================================

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
}) => {
  return (
    <div className="flex items-center gap-3 mb-5">

      <div className="h-11 w-11 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100 flex items-center justify-center">
        <Icon size={20} />
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-800">
          {title}
        </h2>

        <p className="text-xs text-slate-500 mt-0.5">
          {subtitle}
        </p>
      </div>

    </div>
  );
};

// =========================================================
// DETAIL ITEM
// =========================================================

const DetailItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center gap-3 py-4 border-b border-slate-100">

      <div className="h-9 w-9 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="text-sm font-semibold text-slate-800 mt-0.5 break-all">
          {value || "-"}
        </p>
      </div>

    </div>
  );
};

// =========================================================
// TARGET ROW
// =========================================================

const TargetRow = ({
  icon: Icon,
  title,
  value,
  current,
}) => {
  const target = Number(value || 0);
  const progress =
    target > 0
      ? Math.min(
          Math.round((current / target) * 100),
          100
        )
      : 0;

  return (
    <div className="mb-6 last:mb-0">

      <div className="flex items-center justify-between gap-3 mb-2">

        <div className="flex items-center gap-2">

          <div className="h-8 w-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Icon size={16} />
          </div>

          <span className="text-sm font-semibold text-slate-700">
            {title}
          </span>

        </div>

        <span className="text-sm font-bold text-slate-800">
          {current} / {target}
        </span>

      </div>

      <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">

        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 transition-all"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <p className="text-[11px] text-slate-400 mt-1">
        {progress}% completed
      </p>

    </div>
  );
};

// =========================================================
// COMMISSION CARD
// =========================================================

const CommissionCard = ({
  title,
  value,
  icon: Icon,
  bg,
  text,
}) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="text-2xl font-extrabold text-slate-800 mt-2">
            ₹{Number(value || 0).toLocaleString("en-IN")}
          </p>
        </div>

        <div
          className={`h-11 w-11 rounded-2xl ${bg} ${text} flex items-center justify-center`}
        >
          <Icon size={21} />
        </div>

      </div>

    </div>
  );
};

// =========================================================
// MINI STATUS
// =========================================================

const MiniStatus = ({
  title,
  value,
  className,
}) => {
  return (
    <div
      className={`rounded-2xl p-4 ${className}`}
    >
      <p className="text-xs font-medium opacity-80">
        {title}
      </p>

      <p className="text-2xl font-extrabold mt-1">
        {value}
      </p>
    </div>
  );
};

// =========================================================
// LIST CARD
// =========================================================

const ListCard = ({
  icon: Icon,
  title,
  subtitle,
  children,
}) => {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-[26px]
        shadow-[0_15px_45px_rgba(15,23,42,0.05)]
        p-5
        sm:p-6
      "
    >
      <SectionHeader
        icon={Icon}
        title={title}
        subtitle={subtitle}
      />

      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

// =========================================================
// LEAD ROW
// =========================================================

const LeadRow = ({ lead }) => {
  const name =
    lead.name ||
    lead.studentName ||
    lead.fullName ||
    "Unknown Lead";

  const status = lead.status || "New";

  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        p-3
        rounded-2xl
        border
        border-slate-100
        hover:border-cyan-100
        hover:bg-cyan-50/30
        transition
      "
    >
      <div className="flex items-center gap-3 min-w-0">

        <div className="h-10 w-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 font-bold">
          {name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">

          <p className="text-sm font-semibold text-slate-800 truncate">
            {name}
          </p>

          <p className="text-xs text-slate-400 truncate">
            {lead.email ||
              lead.phone ||
              lead.studentPhone ||
              "No contact information"}
          </p>

        </div>
      </div>

      <span className="shrink-0 px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-[11px] font-semibold">
        {status}
      </span>

    </div>
  );
};

// =========================================================
// FOLLOW UP ROW
// =========================================================

const FollowUpRow = ({ item }) => {
  const name =
    item.name ||
    item.studentName ||
    item.leadName ||
    "Follow-up";

  const date =
    item.followUpDate ||
    item.date ||
    item.nextFollowUp;

  return (
    <div className="flex items-center justify-between gap-4 p-3 rounded-2xl border border-slate-100 hover:bg-amber-50/30 hover:border-amber-100 transition">

      <div className="flex items-center gap-3 min-w-0">

        <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <PhoneCall size={18} />
        </div>

        <div className="min-w-0">

          <p className="text-sm font-semibold text-slate-800 truncate">
            {name}
          </p>

          <p className="text-xs text-slate-400 truncate">
            {item.phone ||
              item.studentPhone ||
              item.description ||
              "Follow-up scheduled"}
          </p>

        </div>
      </div>

      <span className="text-xs text-slate-500 whitespace-nowrap">
        {date
          ? new Date(date).toLocaleDateString(
              "en-IN"
            )
          : "Today"}
      </span>

    </div>
  );
};

// =========================================================
// STUDENT ROW
// =========================================================

const StudentRow = ({ student }) => {
  const name =
    student.name ||
    student.studentName ||
    student.fullName ||
    "Student";

  return (
    <div className="flex items-center justify-between gap-4 p-3 rounded-2xl border border-slate-100 hover:bg-blue-50/30 hover:border-blue-100 transition">

      <div className="flex items-center gap-3 min-w-0">

        <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <GraduationCap size={18} />
        </div>

        <div className="min-w-0">

          <p className="text-sm font-semibold text-slate-800 truncate">
            {name}
          </p>

          <p className="text-xs text-slate-400 truncate">
            {student.email ||
              student.phone ||
              student.studentPhone ||
              "Student"}
          </p>

        </div>
      </div>

      <ArrowRight
        size={17}
        className="text-slate-300 shrink-0"
      />

    </div>
  );
};

// =========================================================
// ACTIVITY ROW
// =========================================================

const ActivityRow = ({ activity }) => {
  const action =
    activity.action ||
    activity.title ||
    activity.description ||
    "Account activity";

  const date =
    activity.createdAt ||
    activity.date ||
    activity.timestamp;

  return (
    <div className="flex gap-3 p-3 rounded-2xl border border-slate-100">

      <div className="h-9 w-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
        <Activity size={17} />
      </div>

      <div className="min-w-0">

        <p className="text-sm font-medium text-slate-700">
          {action}
        </p>

        {date && (
          <p className="text-xs text-slate-400 mt-1">
            {new Date(date).toLocaleString(
              "en-IN"
            )}
          </p>
        )}

      </div>

    </div>
  );
};

// =========================================================
// EMPTY LIST
// =========================================================

const EmptyList = ({ text }) => {
  return (
    <div className="py-8 text-center">

      <div className="h-11 w-11 mx-auto rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center mb-3">
        <Activity size={18} />
      </div>

      <p className="text-sm text-slate-400">
        {text}
      </p>

    </div>
  );
};

// =========================================================
// FORM INPUT
// =========================================================

const FormInput = ({
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div>

      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">

        <Icon
          size={17}
          className="
            absolute
            left-3.5
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type={type}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            pl-10
            pr-4
            py-3
            text-sm
            text-slate-800
            outline-none
            focus:bg-white
            focus:border-cyan-400
            focus:ring-4
            focus:ring-cyan-50
            transition
          "
        />

      </div>

    </div>
  );
};

// =========================================================
// MODAL
// =========================================================

const Modal = ({
  title,
  subtitle,
  icon: Icon,
  onClose,
  children,
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      <div
        className="
          absolute
          inset-0
          bg-slate-900/40
          backdrop-blur-sm
        "
        onClick={onClose}
      />

      <div
        className="
          relative
          w-full
          max-w-lg
          max-h-[90vh]
          overflow-y-auto
          bg-white
          rounded-[28px]
          shadow-[0_30px_100px_rgba(15,23,42,0.25)]
          border
          border-slate-200
        "
      >

        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-slate-100">

          <div className="flex items-center gap-3">

            <div className="h-11 w-11 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Icon size={20} />
            </div>

            <div>

              <h2 className="text-lg font-bold text-slate-800">
                {title}
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                {subtitle}
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="h-9 w-9 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition"
          >
            <X size={18} />
          </button>

        </div>

        <div className="p-5 sm:p-6">
          {children}
        </div>

      </div>

    </div>
  );
};

export default Profile;