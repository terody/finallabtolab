import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RequireAuth from "../components/RequireAuth";
import AdminDashboard from "../pages/AdminDashboard";
import Community from "../pages/Community";
import Contact from "../pages/Contact";
import Directory from "../pages/Directory";
import Home from "../pages/Home";
import JobBoard from "../pages/JobBoard";
import Login from "../pages/Login";
import Marketplace from "../pages/Marketplace";
import Register from "../pages/Register";
import Subscription from "../pages/Subscription";
import BusinessSubscriptions from "../pages/BusinessSubscriptions";
import ProfessionalSubscriptions from "../pages/ProfessionalSubscriptions";
export default function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/community" element={<Community />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/subscriptions" element={<Subscription />} />
          <Route
            path="/business-subscriptions"
            element={<BusinessSubscriptions />}
          />
          <Route
            path="/professional-subscriptions"
            element={<ProfessionalSubscriptions />}
          />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
