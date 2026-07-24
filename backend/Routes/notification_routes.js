import express from "express";

import {
  getMyNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  deleteAllNotifications,
  deleteReadNotifications,
} from "../controller/notification_controller.js";


import {
  protect,
} from "../middleware/auth.middleware.js";


const router = express.Router();



// =====================================================
// GET MY NOTIFICATIONS
// Admin / SuperAdmin / Counsellor
// =====================================================

router.get(
  "/",
  protect,
  getMyNotifications
);



// =====================================================
// GET UNREAD COUNT
// Notification Bell Count
// =====================================================

router.get(
  "/unread-count",
  protect,
  getUnreadNotificationCount
);



// =====================================================
// MARK SINGLE READ
// =====================================================

router.put(
  "/read/:id",
  protect,
  markNotificationAsRead
);



// =====================================================
// MARK ALL READ
// =====================================================

router.put(
  "/read-all",
  protect,
  markAllNotificationsAsRead
);



// =====================================================
// DELETE SINGLE
// =====================================================

router.delete(
  "/:id",
  protect,
  deleteNotification
);



// =====================================================
// DELETE ALL
// =====================================================

router.delete(
  "/delete-all",
  protect,
  deleteAllNotifications
);



// =====================================================
// DELETE ONLY READ
// =====================================================

router.delete(
  "/delete-read",
  protect,
  deleteReadNotifications
);



export default router;