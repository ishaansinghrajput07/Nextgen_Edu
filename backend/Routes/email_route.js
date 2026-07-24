import express from "express";


import {

  sendEmailController,

  sendBulkEmail,

  getEmailHistory,

} from "../controller/email_controller.js";


import {
  protect,
} from "../middleware/auth.middleware.js";



const router = express.Router();





// =====================================================
// SEND SINGLE EMAIL
// =====================================================

router.post(
  "/send",
  protect,
  sendEmailController
);





// =====================================================
// SEND BULK EMAIL
// =====================================================

router.post(
  "/bulk",
  protect,
  sendBulkEmail
);





// =====================================================
// EMAIL HISTORY
// =====================================================

router.get(
  "/history",
  protect,
  getEmailHistory
);





export default router;