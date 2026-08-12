import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  Mail,
  Phone,
  RefreshCw,
  Search,
  UserRound,
  AlertCircle,
  MessageSquare,
  X,
} from "lucide-react";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

const BASE_URL =
  "http://localhost:8000/api/v1/counsellor";

const CounsellorFollowUps = () => {
  // ============================================================
  // AUTH
  // ============================================================

  const token = localStorage.getItem("token");

  // ============================================================
  // STATES
  // ============================================================

  const [followUps, setFollowUps] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedFilter, setSelectedFilter] =
    useState("all");

  const [selectedFollowUp, setSelectedFollowUp] =
    useState(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  // ============================================================
  // AUTH HEADERS
  // ============================================================

  const authHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  // ============================================================
  // FETCH TODAY'S FOLLOW UPS
  // ============================================================

  const fetchFollowUps = useCallback(
    async (showLoader = true) => {
      try {
        if (showLoader) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }

        const { data } = await axios.get(
          `${BASE_URL}/todays-followups`,
          {
            headers: authHeaders,
          }
        );

        console.log(
          "COUNSELLOR FOLLOW UPS RESPONSE:",
          data
        );

        /*
         * Backend response ko flexible rakha gaya hai.
         * Agar backend direct array,
         * data.followUps,
         * data.followups,
         * data.data.followUps
         * me bheje to sab handle hoga.
         */

        const list =
          data?.followUps ||
          data?.followups ||
          data?.data?.followUps ||
          data?.data?.followups ||
          data?.data ||
          [];

        setFollowUps(
          Array.isArray(list)
            ? list
            : []
        );
      } catch (error) {
        console.error(
          "FETCH COUNSELLOR FOLLOW UPS ERROR:",
          error
        );

        console.error(
          "FOLLOW UP ERROR RESPONSE:",
          error?.response?.data
        );

        toast.error(
          error?.response?.data?.message ||
            "Unable to load follow-ups"
        );

        setFollowUps([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [authHeaders]
  );

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    fetchFollowUps();
  }, [fetchFollowUps]);

  // ============================================================
  // NORMALIZE FOLLOW-UP
  // ============================================================

  const normalizedFollowUps = useMemo(() => {
    return followUps.map((item) => {
      const lead =
        item?.lead ||
        item?.contact ||
        item?.student ||
        {};

      const leadName =
        item?.leadName ||
        item?.studentName ||
        lead?.leadName ||
        lead?.studentName ||
        lead?.name ||
        "Unknown";

      const email =
        item?.email ||
        item?.leadEmail ||
        lead?.email ||
        "";

      const phone =
        item?.phoneNumber ||
        item?.phone ||
        item?.leadPhone ||
        lead?.phoneNumber ||
        lead?.phone ||
        "";

      const text =
        item?.text ||
        item?.note ||
        item?.notes ||
        item?.message ||
        item?.description ||
        "";

      const date =
        item?.date ||
        item?.followUpDate ||
        item?.followupDate ||
        item?.scheduledAt ||
        item?.nextFollowUp ||
        null;

      const status =
        item?.status ||
        item?.followUpStatus ||
        "Pending";

      const leadId =
        item?.leadId ||
        item?.contactId ||
        lead?._id ||
        item?.lead?._id ||
        null;

      return {
        ...item,
        displayId:
          item?._id ||
          `${leadId}-${date}`,

        leadName,

        email,

        phone,

        text,

        date,

        status,

        leadId,
      };
    });
  }, [followUps]);

  // ============================================================
  // DATE HELPERS
  // ============================================================

  const getDate = (date) => {
    if (!date) return null;

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return null;
    }

    return parsed;
  };

  const formatDate = (date) => {
    const parsed = getDate(date);

    if (!parsed) {
      return "No date";
    }

    return parsed.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatTime = (date) => {
    const parsed = getDate(date);

    if (!parsed) {
      return "";
    }

    return parsed.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // ============================================================
  // STATUS HELPERS
  // ============================================================

  const getStatus = (followUp) => {
    const status =
      String(
        followUp?.status || "Pending"
      ).toLowerCase();

    if (
      status.includes("complete") ||
      status.includes("done")
    ) {
      return "Completed";
    }

    if (
      status.includes("cancel")
    ) {
      return "Cancelled";
    }

    return "Pending";
  };

  // ============================================================
  // OVERDUE CHECK
  // ============================================================

  const isOverdue = (followUp) => {
    const date = getDate(
      followUp?.date
    );

    if (!date) {
      return false;
    }

    if (
      getStatus(followUp) ===
      "Completed"
    ) {
      return false;
    }

    return date.getTime() <
      Date.now();
  };

  // ============================================================
  // FILTER
  // ============================================================

  const filteredFollowUps = useMemo(() => {
    let data = [
      ...normalizedFollowUps,
    ];

    // ----------------------------------------------------------
    // SEARCH
    // ----------------------------------------------------------

    if (search.trim()) {
      const keyword =
        search
          .toLowerCase()
          .trim();

      data = data.filter(
        (item) => {
          return (
            item?.leadName
              ?.toLowerCase()
              .includes(keyword) ||

            item?.email
              ?.toLowerCase()
              .includes(keyword) ||

            item?.phone
              ?.toLowerCase()
              .includes(keyword) ||

            item?.text
              ?.toLowerCase()
              .includes(keyword)
          );
        }
      );
    }

    // ----------------------------------------------------------
    // STATUS FILTER
    // ----------------------------------------------------------

    if (
      selectedFilter ===
      "completed"
    ) {
      data = data.filter(
        (item) =>
          getStatus(item) ===
          "Completed"
      );
    }

    if (
      selectedFilter ===
      "pending"
    ) {
      data = data.filter(
        (item) =>
          getStatus(item) ===
          "Pending"
      );
    }

    if (
      selectedFilter ===
      "overdue"
    ) {
      data = data.filter(
        (item) =>
          isOverdue(item)
      );
    }

    return data;
  }, [
    normalizedFollowUps,
    search,
    selectedFilter,
  ]);

  // ============================================================
  // STATS
  // ============================================================

  const stats = useMemo(() => {
    const total =
      normalizedFollowUps.length;

    const completed =
      normalizedFollowUps.filter(
        (item) =>
          getStatus(item) ===
          "Completed"
      ).length;

    const overdue =
      normalizedFollowUps.filter(
        (item) =>
          isOverdue(item)
      ).length;

    const pending =
      normalizedFollowUps.filter(
        (item) =>
          getStatus(item) ===
          "Pending"
      ).length;

    return {
      total,
      completed,
      overdue,
      pending,
    };
  }, [normalizedFollowUps]);

  // ============================================================
  // OPEN DETAILS
  // ============================================================

  const handleView = (followUp) => {
    setSelectedFollowUp(
      followUp
    );

    setDrawerOpen(true);
  };

  // ============================================================
  // CLOSE DETAILS
  // ============================================================

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedFollowUp(null);
  };

  // ============================================================
  // REFRESH
  // ============================================================

  const handleRefresh = () => {
    fetchFollowUps(false);
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 xl:p-8">
        <div className="mx-auto w-full max-w-7xl">

          <div className="mb-8">
            <div className="h-9 w-64 animate-pulse rounded-xl bg-slate-200" />

            <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded-lg bg-slate-200" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="h-32 animate-pulse rounded-3xl bg-white shadow-sm"
                />
              )
            )}
          </div>

          <div className="mt-6 h-24 animate-pulse rounded-3xl bg-white shadow-sm" />

          <div className="mt-6 h-96 animate-pulse rounded-3xl bg-white shadow-sm" />
        </div>
      </div>
    );
  }

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-50">

      <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 xl:p-8"
      >

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 shadow-sm">
                <CalendarDays
                  size={24}
                />
              </div>

              <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">
                  Follow-Ups
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Manage and track your
                  scheduled follow-ups.
                </p>
              </div>

            </div>
          </div>

          <button
            type="button"
            onClick={
              handleRefresh
            }
            disabled={
              refreshing
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh"}
          </button>

        </div>

        {/* ======================================================
            STATS
        ====================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL */}

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Follow-Ups
                </p>

                <p className="mt-2 text-3xl font-black text-slate-900">
                  {stats.total}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                <CalendarDays
                  size={21}
                />
              </div>

            </div>
          </motion.div>

          {/* PENDING */}

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending
                </p>

                <p className="mt-2 text-3xl font-black text-amber-600">
                  {stats.pending}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <Clock3
                  size={21}
                />
              </div>

            </div>
          </motion.div>

          {/* OVERDUE */}

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Overdue
                </p>

                <p className="mt-2 text-3xl font-black text-red-600">
                  {stats.overdue}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <AlertCircle
                  size={21}
                />
              </div>

            </div>
          </motion.div>

          {/* COMPLETED */}

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Completed
                </p>

                <p className="mt-2 text-3xl font-black text-emerald-600">
                  {stats.completed}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2
                  size={21}
                />
              </div>

            </div>
          </motion.div>

        </div>

        {/* ======================================================
            SEARCH + FILTER
        ====================================================== */}

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* SEARCH */}

            <div className="relative w-full lg:max-w-md">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search lead, email, phone..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              />

            </div>

            {/* FILTERS */}

            <div className="flex flex-wrap gap-2">

              {[
                {
                  key: "all",
                  label: "All",
                },
                {
                  key: "pending",
                  label: "Pending",
                },
                {
                  key: "overdue",
                  label: "Overdue",
                },
                {
                  key: "completed",
                  label: "Completed",
                },
              ].map(
                (filter) => (
                  <button
                    key={
                      filter.key
                    }
                    type="button"
                    onClick={() =>
                      setSelectedFilter(
                        filter.key
                      )
                    }
                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      selectedFilter ===
                      filter.key
                        ? "bg-cyan-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {
                      filter.label
                    }
                  </button>
                )
              )}

            </div>

          </div>

        </div>

        {/* ======================================================
            TABLE
        ====================================================== */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Lead
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Contact
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Follow-Up
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Note
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredFollowUps.length ===
                0 ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="px-6 py-16"
                    >

                      <div className="flex flex-col items-center justify-center text-center">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <CalendarDays
                            size={28}
                          />
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-slate-900">
                          No Follow-Ups Found
                        </h3>

                        <p className="mt-2 max-w-md text-sm text-slate-500">
                          {search
                            ? "No follow-ups match your search."
                            : "You don't have any follow-ups for today."}
                        </p>

                      </div>

                    </td>

                  </tr>

                ) : (

                  filteredFollowUps.map(
                    (followUp) => {

                      const overdue =
                        isOverdue(
                          followUp
                        );

                      const status =
                        getStatus(
                          followUp
                        );

                      return (
                        <motion.tr
                          key={
                            followUp.displayId
                          }
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          className="border-b border-slate-100 transition hover:bg-slate-50"
                        >

                          {/* LEAD */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 font-bold text-cyan-700">
                                {followUp.leadName
                                  ?.charAt(
                                    0
                                  )
                                  ?.toUpperCase() ||
                                  "?"}
                              </div>

                              <div className="min-w-0">

                                <p className="truncate font-bold text-slate-900">
                                  {
                                    followUp.leadName
                                  }
                                </p>

                                <p className="mt-0.5 text-xs text-slate-400">
                                  Lead
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* CONTACT */}

                          <td className="px-6 py-5">

                            <div className="space-y-1.5">

                              {followUp.phone && (
                                <a
                                  href={`tel:${followUp.phone}`}
                                  className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-cyan-600"
                                >
                                  <Phone
                                    size={14}
                                  />
                                  {
                                    followUp.phone
                                  }
                                </a>
                              )}

                              {followUp.email && (
                                <a
                                  href={`mailto:${followUp.email}`}
                                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-600"
                                >
                                  <Mail
                                    size={14}
                                  />
                                  <span className="max-w-[220px] truncate">
                                    {
                                      followUp.email
                                    }
                                  </span>
                                </a>
                              )}

                            </div>

                          </td>

                          {/* DATE */}

                          <td className="px-6 py-5">

                            <div
                              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 ${
                                overdue
                                  ? "bg-red-50 text-red-700"
                                  : "bg-cyan-50 text-cyan-700"
                              }`}
                            >

                              <CalendarDays
                                size={15}
                              />

                              <div>

                                <p className="text-xs font-bold">
                                  {formatDate(
                                    followUp.date
                                  )}
                                </p>

                                {formatTime(
                                  followUp.date
                                ) && (
                                  <p className="mt-0.5 text-[11px] opacity-70">
                                    {formatTime(
                                      followUp.date
                                    )}
                                  </p>
                                )}

                              </div>

                            </div>

                          </td>

                          {/* NOTE */}

                          <td className="max-w-[250px] px-6 py-5">

                            <div className="flex items-start gap-2">

                              <MessageSquare
                                size={15}
                                className="mt-0.5 shrink-0 text-slate-400"
                              />

                              <p className="line-clamp-2 text-sm text-slate-600">
                                {followUp.text ||
                                  "No notes added"}
                              </p>

                            </div>

                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-5">

                            {overdue ? (

                              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
                                <AlertCircle
                                  size={13}
                                />
                                Overdue
                              </span>

                            ) : status ===
                              "Completed" ? (

                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                                <CheckCircle2
                                  size={13}
                                />
                                Completed
                              </span>

                            ) : (

                              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                                <Clock3
                                  size={13}
                                />
                                Pending
                              </span>

                            )}

                          </td>

                          {/* ACTION */}

                          <td className="px-6 py-5 text-right">

                            <button
                              type="button"
                              onClick={() =>
                                handleView(
                                  followUp
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-600 hover:shadow-md"
                            >
                              <Eye
                                size={16}
                              />
                              View
                            </button>

                          </td>

                        </motion.tr>
                      );
                    }
                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

      </motion.div>

      {/* ========================================================
          DETAILS DRAWER
      ======================================================== */}

      {drawerOpen &&
        selectedFollowUp && (
          <div className="fixed inset-0 z-50">

            {/* BACKDROP */}

            <button
              type="button"
              aria-label="Close"
              onClick={
                closeDrawer
              }
              className="absolute inset-0 cursor-default bg-slate-950/30 backdrop-blur-sm"
            />

            {/* DRAWER */}

            <motion.div
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 280,
              }}
              className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl"
            >

              {/* DRAWER HEADER */}

              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-600">
                    Follow-Up Details
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-900">
                    {
                      selectedFollowUp.leadName
                    }
                  </h2>

                </div>

                <button
                  type="button"
                  onClick={
                    closeDrawer
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
                >
                  <X
                    size={19}
                  />
                </button>

              </div>

              {/* DRAWER CONTENT */}

              <div className="space-y-6 p-6">

                {/* PROFILE */}

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-lg font-black text-cyan-700">
                      {
                        selectedFollowUp.leadName
                          ?.charAt(
                            0
                          )
                          ?.toUpperCase()
                      }
                    </div>

                    <div>

                      <h3 className="text-lg font-bold text-slate-900">
                        {
                          selectedFollowUp.leadName
                        }
                      </h3>

                      <p className="text-sm text-slate-500">
                        Assigned Lead
                      </p>

                    </div>

                  </div>

                </div>

                {/* CONTACT */}

                <div>

                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
                    Contact Information
                  </h3>

                  <div className="grid gap-3 sm:grid-cols-2">

                    <a
                      href={`tel:${selectedFollowUp.phone}`}
                      className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-cyan-300 hover:bg-cyan-50"
                    >

                      <Phone
                        size={18}
                        className="text-cyan-600"
                      />

                      <p className="mt-2 text-xs text-slate-400">
                        Phone
                      </p>

                      <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                        {
                          selectedFollowUp.phone ||
                          "Not available"
                        }
                      </p>

                    </a>

                    <a
                      href={`mailto:${selectedFollowUp.email}`}
                      className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-cyan-300 hover:bg-cyan-50"
                    >

                      <Mail
                        size={18}
                        className="text-cyan-600"
                      />

                      <p className="mt-2 text-xs text-slate-400">
                        Email
                      </p>

                      <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                        {
                          selectedFollowUp.email ||
                          "Not available"
                        }
                      </p>

                    </a>

                  </div>

                </div>

                {/* FOLLOW UP DATE */}

                <div>

                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
                    Scheduled Follow-Up
                  </h3>

                  <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm">
                        <CalendarDays
                          size={20}
                        />
                      </div>

                      <div>

                        <p className="text-sm font-bold text-slate-900">
                          {formatDate(
                            selectedFollowUp.date
                          )}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {formatTime(
                            selectedFollowUp.date
                          ) ||
                            "Time not specified"}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* NOTE */}

                <div>

                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
                    Follow-Up Note
                  </h3>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">

                    <div className="flex gap-3">

                      <MessageSquare
                        size={19}
                        className="mt-0.5 shrink-0 text-cyan-600"
                      />

                      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                        {
                          selectedFollowUp.text ||
                          "No note added."
                        }
                      </p>

                    </div>

                  </div>

                </div>

                {/* STATUS */}

                <div>

                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
                    Status
                  </h3>

                  {isOverdue(
                    selectedFollowUp
                  ) ? (

                    <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-700">

                      <AlertCircle
                        size={20}
                      />

                      <div>
                        <p className="font-bold">
                          Follow-Up Overdue
                        </p>

                        <p className="mt-1 text-xs text-red-600/80">
                          This follow-up
                          date has
                          passed.
                        </p>
                      </div>

                    </div>

                  ) : getStatus(
                      selectedFollowUp
                    ) ===
                    "Completed" ? (

                    <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-700">

                      <CheckCircle2
                        size={20}
                      />

                      <div>
                        <p className="font-bold">
                          Completed
                        </p>
                      </div>

                    </div>

                  ) : (

                    <div className="flex items-center gap-3 rounded-2xl bg-amber-50 p-4 text-amber-700">

                      <Clock3
                        size={20}
                      />

                      <div>
                        <p className="font-bold">
                          Pending
                        </p>

                        <p className="mt-1 text-xs text-amber-600/80">
                          Follow-up is
                          waiting for
                          action.
                        </p>
                      </div>

                    </div>

                  )}

                </div>

                {/* LEAD ID */}

                {selectedFollowUp.leadId && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Lead ID
                    </p>

                    <p className="mt-1 break-all font-mono text-xs text-slate-600">
                      {
                        selectedFollowUp.leadId
                      }
                    </p>

                  </div>
                )}

              </div>

            </motion.div>

          </div>
        )}

    </div>
  );
};

export default CounsellorFollowUps;