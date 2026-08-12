import express from "express";

import {
  submitContactForm,
  createLead,
  getAllLeads,
  getSingleLead,
  updateLead,
  deleteLead,
  getLeadStats,
  getRecentLeads,
  getMyLeads,
  getCounsellorLead,
  updateCounsellorLead,
  getCounsellorProfile,
   assignCounsellor,
} from "../controller/Contact_controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();


// ======================================================
// PUBLIC ROUTES
// ======================================================

// Website Contact Form
router.post(
  "/form",
  submitContactForm
);

// Backward-compatible website lead endpoint
router.post(
  "/contacts",
  submitContactForm
);

// ======================================================
// ADMIN ROUTES
// ======================================================

// Create Lead Manually
router.post(
  "/add",
  protect,
  authorize("Admin", "SuperAdmin"),
  createLead
);


// Get All Leads
router.get(
  "/",
  protect,
  authorize("Admin", "SuperAdmin"),
  getAllLeads
);


// Dashboard Stats
router.get(
  "/stats",
  protect,
  authorize("Admin", "SuperAdmin"),
  getLeadStats
);


// Recent Leads
router.get(
  "/recent-leads",
  protect,
  authorize("Admin", "SuperAdmin"),
  getRecentLeads
);



// Single Lead
router.get(
  "/:id",
  protect,
  authorize("Admin", "SuperAdmin"),
  getSingleLead
);




// ======================================================
// ASSIGN COUNSELLOR
// ======================================================

router.patch(
  "/:id/assign-counsellor",
  protect,
  authorize("Admin", "SuperAdmin"),
 assignCounsellor
);





// Update Lead
router.put(
  "/:id",
  protect,
  authorize("Admin", "SuperAdmin"),
  updateLead
);


// Delete Lead
router.delete(
  "/:id",
  protect,
  authorize("Admin", "SuperAdmin"),
  deleteLead
);


// ======================================================
// COUNSELLOR ROUTES
// ======================================================

// My Leads
router.get(
  "/counsellor/my-leads",
  protect,
  authorize("Admin", "SuperAdmin", "Counsellor"),
  getMyLeads
);


// Single My Lead
router.get(
  "/counsellor/my-leads/:id",
  protect,
  authorize("Admin", "SuperAdmin", "Counsellor"),
  getCounsellorLead
);

router.get(
  "/my-lead/:id",
  protect,
  authorize("Admin", "SuperAdmin", "Counsellor"),
  getCounsellorLead
);

// Update My Lead
router.put(
  "/counsellor/my-leads/:id",
  protect,
  authorize("Admin", "SuperAdmin", "Counsellor"),
  updateCounsellorLead
);

router.put(
  "/my-lead/:id",
  protect,
  authorize("Admin", "SuperAdmin", "Counsellor"),
  updateCounsellorLead
);


// My Profile
router.get(
  "/counsellor/profile",
  protect,
  authorize("Counsellor"),
  getCounsellorProfile
);


export default router;