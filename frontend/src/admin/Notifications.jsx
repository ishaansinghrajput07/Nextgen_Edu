
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  MailOpen,
  RefreshCw,
  BellRing,
  AlertCircle,
  UserPlus,
  GraduationCap,
  CreditCard,
  Users,
  Info,
  X,
  Clock,
} from "lucide-react";

import notificationApi from "../services/notificationApi";

// =====================================================
// NOTIFICATION ICON
// =====================================================

const getNotificationIcon = (type = "") => {
  const value = String(type).toLowerCase();

  if (value.includes("lead") || value.includes("contact")) {
    return UserPlus;
  }

  if (value.includes("student") || value.includes("admission")) {
    return GraduationCap;
  }

  if (value.includes("payment") || value.includes("commission")) {
    return CreditCard;
  }

  if (value.includes("counsellor") || value.includes("counselor")) {
    return Users;
  }

  if (value.includes("alert") || value.includes("error")) {
    return AlertCircle;
  }

  return Info;
};

// =====================================================
// DATE FORMAT
// =====================================================

const formatDate = (date) => {
  if (!date) return "Just now";

  const notificationDate = new Date(date);

  if (Number.isNaN(notificationDate.getTime())) {
    return "Just now";
  }

  return notificationDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// =====================================================
// TIME AGO
// =====================================================

const timeAgo = (date) => {
  if (!date) return "Just now";

  const created = new Date(date).getTime();

  if (Number.isNaN(created)) {
    return "Just now";
  }

  const seconds = Math.floor((Date.now() - created) / 1000);

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hr ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  return formatDate(date);
};

// =====================================================
// RESPONSE NORMALIZER
// =====================================================

const normalizeNotifications = (response) => {
  const data = response?.data ?? response;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.notifications)) {
    return data.notifications;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
};

// =====================================================
// PAGE
// =====================================================

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [actionLoading, setActionLoading] = useState(null);

  const [filter, setFilter] = useState("all");

  const [selectedNotification, setSelectedNotification] = useState(null);

  // ===================================================
  // FETCH NOTIFICATIONS
  // ===================================================

  const fetchNotifications = async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      // Backend:
      // GET /api/v1/notification

      const response = await notificationApi.get("/notification");

      const list = normalizeNotifications(response);

      setNotifications(list);
    } catch (error) {
      console.error("FETCH NOTIFICATIONS ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to load notifications",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ===================================================
  // UNREAD COUNT
  // ===================================================

  const unreadCount = useMemo(() => {
    return notifications.filter(
      (notification) =>
        !notification?.isRead && notification?.read !== true,
    ).length;
  }, [notifications]);

  // ===================================================
  // FILTER
  // ===================================================

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter(
        (notification) =>
          !notification?.isRead &&
          notification?.read !== true,
      );
    }

    if (filter === "read") {
      return notifications.filter(
        (notification) =>
          notification?.isRead === true ||
          notification?.read === true,
      );
    }

    return notifications;
  }, [notifications, filter]);

  // ===================================================
  // MARK SINGLE AS READ
  // ===================================================

  const handleMarkAsRead = async (notification) => {
    const id = notification?._id || notification?.id;

    if (!id) return;

    const alreadyRead =
      notification?.isRead === true ||
      notification?.read === true;

    if (alreadyRead) return;

    try {
      setActionLoading(`read-${id}`);

      // Backend:
      // PUT /api/v1/notification/read/:id

      await notificationApi.put(`/notification/read/${id}`);

      setNotifications((prev) =>
        prev.map((item) => {
          const itemId = item?._id || item?.id;

          if (itemId === id) {
            return {
              ...item,
              isRead: true,
              read: true,
            };
          }

          return item;
        }),
      );
    } catch (error) {
      console.error(
        "MARK NOTIFICATION READ ERROR:",
        error,
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to mark notification as read",
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ===================================================
  // MARK ALL AS READ
  // ===================================================

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) {
      toast("All notifications are already read");
      return;
    }

    try {
      setActionLoading("read-all");

      // Backend:
      // PUT /api/v1/notification/read-all

      await notificationApi.put("/notification/read-all");

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
          read: true,
        })),
      );

      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("MARK ALL READ ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to mark all notifications",
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ===================================================
  // DELETE SINGLE
  // ===================================================

  const handleDelete = async (notification) => {
    const id = notification?._id || notification?.id;

    if (!id) return;

    try {
      setActionLoading(`delete-${id}`);

      // Backend:
      // DELETE /api/v1/notification/:id

      await notificationApi.delete(`/notification/${id}`);

      setNotifications((prev) =>
        prev.filter((item) => {
          const itemId = item?._id || item?.id;

          return itemId !== id;
        }),
      );

      if (
        selectedNotification?._id === id ||
        selectedNotification?.id === id
      ) {
        setSelectedNotification(null);
      }

      toast.success("Notification deleted");
    } catch (error) {
      console.error(
        "DELETE NOTIFICATION ERROR:",
        error,
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to delete notification",
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ===================================================
  // DELETE ALL
  // ===================================================

  const handleDeleteAll = async () => {
    if (notifications.length === 0) {
      toast("No notifications to delete");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete all notifications?",
    );

    if (!confirmed) return;

    try {
      setActionLoading("delete-all");

      // Backend:
      // DELETE /api/v1/notification/delete-all

      await notificationApi.delete(
        "/notification/delete-all",
      );

      setNotifications([]);

      toast.success("All notifications deleted");
    } catch (error) {
      console.error(
        "DELETE ALL NOTIFICATIONS ERROR:",
        error,
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to delete notifications",
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ===================================================
  // DELETE READ
  // ===================================================

  const handleDeleteRead = async () => {
    const readCount = notifications.filter(
      (notification) =>
        notification?.isRead === true ||
        notification?.read === true,
    ).length;

    if (readCount === 0) {
      toast("No read notifications");
      return;
    }

    try {
      setActionLoading("delete-read");

      // Backend:
      // DELETE /api/v1/notification/delete-read

      await notificationApi.delete(
        "/notification/delete-read",
      );

      setNotifications((prev) =>
        prev.filter(
          (notification) =>
            !notification?.isRead &&
            notification?.read !== true,
        ),
      );

      toast.success("Read notifications deleted");
    } catch (error) {
      console.error(
        "DELETE READ NOTIFICATIONS ERROR:",
        error,
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to delete read notifications",
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-10 w-64 animate-pulse rounded-xl bg-slate-200" />

          <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded-lg bg-slate-200" />

          <div className="mt-8 space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="
                  h-28
                  animate-pulse
                  rounded-2xl
                  bg-white
                  shadow-sm
                "
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="border-b border-slate-200 bg-white">
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-6
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >

            {/* TITLE */}

            <div className="flex items-center gap-4">
              <div
                className="
                  relative
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-sky-500
                  to-cyan-500
                  text-white
                  shadow-lg
                  shadow-sky-500/20
                "
              >
                <Bell className="h-7 w-7" />

                {unreadCount > 0 && (
                  <span
                    className="
                      absolute
                      -right-1
                      -top-1
                      flex
                      h-6
                      min-w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-red-500
                      px-1.5
                      text-[11px]
                      font-black
                      text-white
                      ring-4
                      ring-white
                    "
                  >
                    {unreadCount > 99
                      ? "99+"
                      : unreadCount}
                  </span>
                )}
              </div>

              <div>
                <h1
                  className="
                    text-2xl
                    font-black
                    tracking-tight
                    text-slate-900
                    md:text-3xl
                  "
                >
                  Notifications
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Stay updated with your latest activities
                  and alerts.
                </p>
              </div>
            </div>

            {/* ACTIONS */}

            <div className="flex flex-wrap gap-2">

              <button
                type="button"
                onClick={() => fetchNotifications(false)}
                disabled={refreshing}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-bold
                  text-slate-700
                  shadow-sm
                  transition
                  hover:border-sky-200
                  hover:bg-sky-50
                  hover:text-sky-700
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    refreshing ? "animate-spin" : ""
                  }`}
                />

                Refresh
              </button>

              <button
                type="button"
                onClick={handleMarkAllAsRead}
                disabled={
                  unreadCount === 0 ||
                  actionLoading === "read-all"
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-sky-600
                  px-4
                  py-2.5
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-sky-500/20
                  transition
                  hover:bg-sky-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <CheckCheck className="h-4 w-4" />

                Mark all read
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <main
        className="
          mx-auto
          max-w-7xl
          px-4
          py-6
          sm:px-6
          lg:px-8
        "
      >

        {/* FILTER / TOOLBAR */}

        <div
          className="
            mb-6
            flex
            flex-col
            gap-4
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex flex-wrap gap-2">

            {[
              {
                id: "all",
                label: "All",
                count: notifications.length,
              },
              {
                id: "unread",
                label: "Unread",
                count: unreadCount,
              },
              {
                id: "read",
                label: "Read",
                count:
                  notifications.length - unreadCount,
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`
                  rounded-xl
                  px-4
                  py-2
                  text-sm
                  font-bold
                  transition
                  ${
                    filter === item.id
                      ? "bg-sky-600 text-white shadow-md shadow-sky-500/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }
                `}
              >
                {item.label}

                <span
                  className={`
                    ml-2
                    rounded-full
                    px-2
                    py-0.5
                    text-xs
                    ${
                      filter === item.id
                        ? "bg-white/20"
                        : "bg-white"
                    }
                  `}
                >
                  {item.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">

            <button
              type="button"
              onClick={handleDeleteRead}
              disabled={
                actionLoading === "delete-read"
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                px-3
                py-2
                text-xs
                font-bold
                text-slate-600
                transition
                hover:border-red-200
                hover:bg-red-50
                hover:text-red-600
              "
            >
              <MailOpen className="h-4 w-4" />

              Clear read
            </button>

            <button
              type="button"
              onClick={handleDeleteAll}
              disabled={
                actionLoading === "delete-all"
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-red-100
                bg-red-50
                px-3
                py-2
                text-xs
                font-bold
                text-red-600
                transition
                hover:bg-red-100
              "
            >
              <Trash2 className="h-4 w-4" />

              Delete all
            </button>
          </div>
        </div>

        {/* =================================================
            NOTIFICATION LIST
        ================================================= */}

        {filteredNotifications.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              flex
              min-h-[420px]
              flex-col
              items-center
              justify-center
              rounded-3xl
              border
              border-dashed
              border-slate-300
              bg-white
              px-6
              text-center
            "
          >
            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-3xl
                bg-sky-50
                text-sky-500
              "
            >
              <BellRing className="h-10 w-10" />
            </div>

            <h2
              className="
                mt-6
                text-xl
                font-black
                text-slate-900
              "
            >
              No notifications here
            </h2>

            <p
              className="
                mt-2
                max-w-md
                text-sm
                leading-6
                text-slate-500
              "
            >
              {filter === "unread"
                ? "You're all caught up. There are no unread notifications."
                : filter === "read"
                  ? "You don't have any read notifications."
                  : "New notifications will appear here when there is activity on your account."}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredNotifications.map(
                (notification, index) => {
                  const id =
                    notification?._id ||
                    notification?.id ||
                    index;

                  const isRead =
                    notification?.isRead === true ||
                    notification?.read === true;

                  const Icon = getNotificationIcon(
                    notification?.type,
                  );

                  const title =
                    notification?.title ||
                    notification?.subject ||
                    "Notification";

                  const message =
                    notification?.message ||
                    notification?.description ||
                    "";

                  const date =
                    notification?.createdAt ||
                    notification?.created_at ||
                    notification?.date;

                  return (
                    <motion.div
                      key={id}
                      layout
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: 50,
                        height: 0,
                      }}
                      transition={{
                        delay: Math.min(
                          index * 0.03,
                          0.2,
                        ),
                      }}
                      className={`
                        group
                        relative
                        overflow-hidden
                        rounded-2xl
                        border
                        p-4
                        shadow-sm
                        transition-all
                        duration-300
                        md:p-5
                        ${
                          isRead
                            ? "border-slate-200 bg-white"
                            : "border-sky-200 bg-gradient-to-r from-sky-50/80 via-white to-cyan-50/50 shadow-sky-100"
                        }
                      `}
                    >
                      {!isRead && (
                        <div
                          className="
                            absolute
                            left-0
                            top-0
                            h-full
                            w-1
                            bg-gradient-to-b
                            from-sky-500
                            to-cyan-500
                          "
                        />
                      )}

                      <div className="flex gap-4">

                        {/* ICON */}

                        <div
                          className={`
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            ${
                              isRead
                                ? "bg-slate-100 text-slate-500"
                                : "bg-sky-100 text-sky-600"
                            }
                          `}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        {/* BODY */}

                        <div className="min-w-0 flex-1">

                          <div
                            className="
                              flex
                              flex-col
                              gap-1
                              sm:flex-row
                              sm:items-start
                              sm:justify-between
                            "
                          >
                            <div>

                              <div className="flex items-center gap-2">

                                <h3
                                  className={`
                                    text-sm
                                    md:text-base
                                    ${
                                      isRead
                                        ? "font-bold text-slate-700"
                                        : "font-black text-slate-900"
                                    }
                                  `}
                                >
                                  {title}
                                </h3>

                                {!isRead && (
                                  <span
                                    className="
                                      rounded-full
                                      bg-sky-100
                                      px-2
                                      py-0.5
                                      text-[10px]
                                      font-black
                                      uppercase
                                      tracking-wide
                                      text-sky-700
                                    "
                                  >
                                    New
                                  </span>
                                )}
                              </div>

                              {notification?.type && (
                                <p
                                  className="
                                    mt-1
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-sky-500
                                  "
                                >
                                  {notification.type}
                                </p>
                              )}
                            </div>

                            <div
                              className="
                                flex
                                shrink-0
                                items-center
                                gap-1
                                text-xs
                                text-slate-400
                              "
                            >
                              <Clock className="h-3.5 w-3.5" />

                              {timeAgo(date)}
                            </div>
                          </div>

                          <p
                            className="
                              mt-3
                              text-sm
                              leading-6
                              text-slate-600
                            "
                          >
                            {message}
                          </p>

                          <div
                            className="
                              mt-4
                              flex
                              flex-wrap
                              items-center
                              gap-2
                            "
                          >

                            {/* VIEW DETAILS */}

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedNotification(
                                  notification,
                                );

                                handleMarkAsRead(
                                  notification,
                                );
                              }}
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-lg
                                bg-slate-100
                                px-3
                                py-1.5
                                text-xs
                                font-bold
                                text-slate-600
                                transition
                                hover:bg-sky-100
                                hover:text-sky-700
                              "
                            >
                              <Info className="h-3.5 w-3.5" />

                              View details
                            </button>

                            {/* MARK READ */}

                            {!isRead && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleMarkAsRead(
                                    notification,
                                  )
                                }
                                disabled={
                                  actionLoading ===
                                  `read-${id}`
                                }
                                className="
                                  inline-flex
                                  items-center
                                  gap-1.5
                                  rounded-lg
                                  bg-sky-50
                                  px-3
                                  py-1.5
                                  text-xs
                                  font-bold
                                  text-sky-700
                                  transition
                                  hover:bg-sky-100
                                "
                              >
                                <Check className="h-3.5 w-3.5" />

                                Mark as read
                              </button>
                            )}

                            {/* DELETE */}

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  notification,
                                )
                              }
                              disabled={
                                actionLoading ===
                                `delete-${id}`
                              }
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-lg
                                px-3
                                py-1.5
                                text-xs
                                font-bold
                                text-slate-400
                                transition
                                hover:bg-red-50
                                hover:text-red-600
                              "
                            >
                              <Trash2 className="h-3.5 w-3.5" />

                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                },
              )}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* =================================================
          DETAIL MODAL
      ================================================= */}

      <AnimatePresence>
        {selectedNotification && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-slate-950/50
              p-4
              backdrop-blur-sm
            "
            onClick={() =>
              setSelectedNotification(null)
            }
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                w-full
                max-w-lg
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-2xl
              "
            >

              {/* MODAL HEADER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  bg-gradient-to-r
                  from-sky-600
                  to-cyan-500
                  p-6
                  text-white
                "
              >
                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/15
                    "
                  >
                    <Bell className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/70">
                      Notification
                    </p>

                    <h2 className="mt-1 font-black">
                      {selectedNotification?.title ||
                        selectedNotification?.subject ||
                        "Notification"}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedNotification(null)
                  }
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                    transition
                    hover:bg-white/20
                  "
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* MODAL BODY */}

              <div className="p-6">

                <p className="text-sm leading-7 text-slate-600">
                  {selectedNotification?.message ||
                    selectedNotification?.description ||
                    "No additional details available."}
                </p>

                <div
                  className="
                    mt-6
                    rounded-2xl
                    bg-slate-50
                    p-4
                  "
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <Clock className="h-4 w-4" />

                    {formatDate(
                      selectedNotification?.createdAt ||
                        selectedNotification?.created_at ||
                        selectedNotification?.date,
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;

