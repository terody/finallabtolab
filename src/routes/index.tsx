import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Directory from '../pages/Directory';
import Community from '../pages/Community';
import Marketplace from '../pages/Marketplace';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import JobBoard from '../pages/JobBoard';
import AdminDashboard from '../pages/AdminDashboard';
import { RequireAuth } from '../context/AuthContext';

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