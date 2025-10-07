import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/user/Home';
import Discover from './pages/user/Discover';
import CreateCampaign from './pages/user/CreateCampaign';
import NGODiscovery from './pages/user/NGODiscovery';
import CampaignDetails from './pages/user/CampaignDetails';
import Profile from './pages/user/Profile';
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ChatBot from './pages/user/ChatBot';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import CampaignApprovals from './pages/admin/CampaignApprovals';
import AdminCampaigns from './pages/admin/AdminCampaigns';
import { useAuth } from './context/AuthContext';

const NotAuthorized = () => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-bold mb-2">Not authorized</h1>
    <p className="text-gray-600">You do not have permission to view this page.</p>
  </div>
);

const AdminGuard = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') return <Navigate to="/not-authorized" replace />;
  return children;
};

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>

          {/* User Routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/campaign/:id" element={<CampaignDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<CreateCampaign />} />
            <Route path="/ngos" element={<NGODiscovery />} />
            <Route path="/chat" element={<ChatBot />} />
            <Route path="/not-authorized" element={<NotAuthorized />} />
          </Route>

          {/* Auth Routes (no layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes with Admin Layout (guarded) */}
          <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
            <Route index element={<AdminDashboard />} />
            <Route path="campaigns" element={<AdminCampaigns />} />
            <Route path="approvals" element={<CampaignApprovals />} />
          </Route>

        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
