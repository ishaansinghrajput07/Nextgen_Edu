import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import SuperAdminLayout from "../superadmin/SuperAdminLayout";

import SuperAdminDashboard from "../superadmin/Dashboard";

import Admins from "../superadmin/Admins";
import ScrollToTop from "../components/ScrollToTop";

import CounsellorsManagement from "../superadmin/CounsellorsManagement";
import ActivityLogs from "../superadmin/ActivityLogs";
import AdminPerformance from "../superadmin/AdminPerformance";

/* Pages */
import Home from "../pages/Home";
import CareerResearch from "../pages/CareerResearch";
import EducationTrends from "../pages/EducationTrends";
import CollegeGuide from "../pages/CollegeGuide";
import CareerAdvice from "../pages/college-guide";
import BlogArticles from "../pages/BlogArticles";

import About from "../pages/About";
import Contact from "../pages/Contact";
import Universities from "../pages/Universities";
import UniversityDetails from "../pages/UniversityDetails";
import Courses from "../pages/Courses";
import CourseDetails from "../pages/CourseDetails";
import Scholarships from "../pages/Scholarships";
import Reviews from "../pages/Reviews";
import CompareUniversities from "../pages/CompareUniversities";
import TermsConditions from "../pages/TermsConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import SuccessStories from "../pages/SuccessStories";
import PhD from "../pages/PhD";
import HowToApply from "../pages/HowToApply";
import AdmissionProcess from "../pages/AdmissionProcess";
import EligibilityCriteria from "../pages/EligibilityCriteria";
import RegistrationForm from "../pages/RegistrationForm";
import faqs from "../components/home/FAQ";

/* Admin */
import AdminLayout from "../admin/AdminLayout";
import Dashboard from "../admin/Dashboard";
import Leads from "../admin/Leads";
import Counsellors from "../admin/Counsellors";
import UniversitiesAdmin from "../admin/Universities";
import Notifications from "../admin/Notifications";
// import BlogsAdmin from "../admin/Blogs";
import AdmissionDetails from "../../src/admin/admissions/AdmissionDetails";
import SettingsAdmin from "../admin/Settings";
import LeadDetails from "../admin/LeadDetails";
import CounsellorProfile from "../admin/CounsellorProfile";

import Commissions from "../admin/commission/Commission";
import CommissionDetails from "../admin/commission/CommissionDetails";
import Admissions from "../admin/admissions/Admissions";
import Students from "../admin/Students";
import AddCounsellor from "../admin/AddCounsellor";
import EditCounsellor from "../admin/EditCounsellor";
import UniversityProfile from "../admin/UniversityProfile";
import ReviewsAdmin from "../admin/Reviews";

/* Counsellor */
import CounsellorLayout from "../counsellor/CounsellorLayout";
import CounsellorDashboard from "../counsellor/CounsellorDashboard";
import MyLeads from "../counsellor/MyLeads";
import CounsellorCommission from "../counsellor/CounsellorCommission";
import Profile from "../counsellor/Profile";
import CounsellorLeadDetails from "../counsellor/CounsellorLeadDetails";
import ProtectedRoute from "../auth/ProtectedRoute";
import CounsellorStudents from "../counsellor/students/CounsellorStudents"
import CounsellorFollowUps from "../counsellor/CounsellorFollowUps"

/* Auth */
import Login from "../auth/Login";
import CounsellorLogin from "../auth/CounsellorLogin";
import AdminLogin from "../auth/AdminLogin";
import SuperAdminLogin from "../auth/SuperAdminLogin";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Website */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
<Route path="phd" element={<PhD />} />
<Route path="college-guide" element={<CollegeGuide />} />
<Route path="blogs" element={<BlogArticles />} />

<Route path="career-advice" element={<CareerAdvice />} />
          <Route path="about" element={<About />} />
          <Route path="career-research" element={<CareerResearch />} />
          

          <Route path="contact" element={<Contact />} />
          <Route path="/success-stories" element={<SuccessStories />} />

          <Route path="how-to-apply" element={<HowToApply />} />
          <Route path="admission-process" element={<AdmissionProcess />} />
           <Route path="admission-faq" element={<faqs/>} />
           <Route
  path="education-trends"
  element={<EducationTrends />}
/>


          <Route
            path="eligibility-criteria"
            element={<EligibilityCriteria />}
          />
          <Route path="registration-form" element={<RegistrationForm />} />

          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route path="universities" element={<Universities />} />

          <Route
  path="universities/type/:type"
  element={<Universities />}
/>

          <Route path="universities/:slug" element={<UniversityDetails />} />

          <Route path="courses" element={<Courses />} />

          <Route path="courses/:slug" element={<CourseDetails />} />

          <Route path="scholarships" element={<Scholarships />} />

          <Route path="reviews" element={<Reviews />} />

          <Route path="compare" element={<CompareUniversities />} />
        </Route>

        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route
  path="/counsellor-login"
  element={<CounsellorLogin />}
/>

<Route
  path="/admin-login"
  element={<AdminLogin />}
/>

<Route
  path="/super-admin-login"
  element={<SuperAdminLogin />}
/>

        <Route
          path="/superadmin"
          element={
            <ProtectedRoute allowedRoles={["SuperAdmin"]}>
              <SuperAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SuperAdminDashboard />} />

          <Route path="admins" element={<Admins />} />

          <Route path="counsellors" element={<CounsellorsManagement />} />

          <Route path="activity-logs" element={<ActivityLogs />} />

          <Route path="admin-performance" element={<AdminPerformance />} />
        </Route>

        {/* Admin Panel */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >

  
          <Route index element={<Dashboard />} />
  
 <Route path="notifications" element={<Notifications />} />
          <Route path="leads" element={<Leads />} />

          <Route path="leads/:id" element={<LeadDetails />} />

          <Route path="counsellors" element={<Counsellors />} />

          <Route path="/admin/counsellor/:id" element={<CounsellorProfile />} />
          <Route
            path="/admin/edit-counsellor/:id"
            element={<EditCounsellor />}
          />

          <Route path="/admin/university/:id" element={<UniversityProfile />} />

          <Route path="/admin/add-counsellor" element={<AddCounsellor />} />

          <Route path="universities" element={<UniversitiesAdmin />} />

          <Route path="reviews" element={<ReviewsAdmin />} />

          <Route path="admissions" element={<Admissions />} />

          <Route path="commissions" element={<Commissions />} />

         <Route
  path="/admin/commission/:counsellorId"
  element={<CommissionDetails />}
/>

          <Route path="admissions/:id" element={<AdmissionDetails />} />
          <Route path="students" element={<Students />} />

          <Route path="settings" element={<SettingsAdmin />} />
        </Route>

        {/* Counsellor Panel */}

        <Route
          path="/counsellor"
          element={
            <ProtectedRoute allowedRoles={["Counsellor"]}>
              <CounsellorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CounsellorDashboard />} />

          <Route path="leads" element={<MyLeads />} />

          <Route path="follow-ups" element={<CounsellorFollowUps />} />
          <Route path="profile" element={<Profile />} />
          <Route path="commission" element={<CounsellorCommission />} />
          <Route path="leads/:id" element={<CounsellorLeadDetails />} />

            <Route
    path="students"
    element={<CounsellorStudents />}
  />
        </Route>

        {/* footer */}
      </Routes>
    </BrowserRouter>
  );
}
