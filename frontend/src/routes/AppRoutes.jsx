import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../admin/AdminLayout";

import SuperAdminLayout from "../superadmin/SuperAdminLayout";

import ScrollToTop from "../components/ScrollToTop";

/* Pages */
const FAQs = lazy(() => import("../components/home/FAQ"));

const Home = lazy(() => import("../pages/Home"));
const CareerResearch = lazy(() => import("../pages/CareerResearch"));
const EducationTrends = lazy(() => import("../pages/EducationTrends"));
const CollegeGuide = lazy(() => import("../pages/CollegeGuide"));
const CareerAdvice = lazy(() => import("../pages/college-guide"));
const BlogArticles = lazy(() => import("../pages/BlogArticles"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Universities = lazy(() => import("../pages/Universities"));
const UniversityDetails = lazy(() => import("../pages/UniversityDetails"));
const Courses = lazy(() => import("../pages/Courses"));
const CourseDetails = lazy(() => import("../pages/CourseDetails"));
const Scholarships = lazy(() => import("../pages/Scholarships"));
const Reviews = lazy(() => import("../pages/Reviews"));
const CompareUniversities = lazy(() => import("../pages/CompareUniversities"));
const TermsConditions = lazy(() => import("../pages/TermsConditions"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const SuccessStories = lazy(() => import("../pages/SuccessStories"));
const PhD = lazy(() => import("../pages/PhD"));
const HowToApply = lazy(() => import("../pages/HowToApply"));
const AdmissionProcess = lazy(() => import("../pages/AdmissionProcess"));
const EligibilityCriteria = lazy(() => import("../pages/EligibilityCriteria"));
const RegistrationForm = lazy(() => import("../pages/RegistrationForm"));

/* Admin */
const Dashboard = lazy(() => import("../admin/Dashboard"));
const Leads = lazy(() => import("../admin/Leads"));
const Counsellors = lazy(() => import("../admin/Counsellors"));
const UniversitiesAdmin = lazy(() => import("../admin/Universities"));
const Notifications = lazy(() => import("../admin/Notifications"));
const AdmissionDetails = lazy(() => import("../../src/admin/admissions/AdmissionDetails"));
const SettingsAdmin = lazy(() => import("../admin/Settings"));
const LeadDetails = lazy(() => import("../admin/LeadDetails"));
const CounsellorProfile = lazy(() => import("../admin/CounsellorProfile"));
const Commissions = lazy(() => import("../admin/commission/Commission"));
const CommissionDetails = lazy(() => import("../admin/commission/CommissionDetails"));
const Admissions = lazy(() => import("../admin/admissions/Admissions"));
const Students = lazy(() => import("../admin/Students"));
const AddCounsellor = lazy(() => import("../admin/AddCounsellor"));
const EditCounsellor = lazy(() => import("../admin/EditCounsellor"));
const UniversityProfile = lazy(() => import("../admin/UniversityProfile"));
const ReviewsAdmin = lazy(() => import("../admin/Reviews"));

/* Counsellor */
import CounsellorLayout from "../counsellor/CounsellorLayout";
const CounsellorDashboard = lazy(() => import("../counsellor/CounsellorDashboard"));
const MyLeads = lazy(() => import("../counsellor/MyLeads"));
const CounsellorCommission = lazy(() => import("../counsellor/CounsellorCommission"));
const Profile = lazy(() => import("../counsellor/Profile"));
const CounsellorLeadDetails = lazy(() => import("../counsellor/CounsellorLeadDetails"));
const CounsellorStudents = lazy(() => import("../counsellor/students/CounsellorStudents"));
const CounsellorFollowUps = lazy(() => import("../counsellor/CounsellorFollowUps"));

/* Auth */
const Login = lazy(() => import("../auth/Login"));
const CounsellorLogin = lazy(() => import("../auth/CounsellorLogin"));
const AdminLogin = lazy(() => import("../auth/AdminLogin"));
const SuperAdminLogin = lazy(() => import("../auth/SuperAdminLogin"));

const SuperAdminDashboard = lazy(() => import("../superadmin/Dashboard"));
const Admins = lazy(() => import("../superadmin/Admins"));
const CounsellorsManagement = lazy(() => import("../superadmin/CounsellorsManagement"));
const ActivityLogs = lazy(() => import("../superadmin/ActivityLogs"));
const AdminPerformance = lazy(() => import("../superadmin/AdminPerformance"));

import ProtectedRoute from "../auth/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
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
           <Route path="admission-faq" element={<FAQs />} />
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
      </Suspense>
    </BrowserRouter>
  );
}
