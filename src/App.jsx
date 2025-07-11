import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/user/Home';
import Discover from './pages/user/Discover';
import CreateCampaign from './pages/user/CreateCampaign';
import NGODiscovery from './pages/user/NGODiscovery';
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ChatBot from './pages/user/ChatBot';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import CampaignApprovals from './pages/admin/CampaignApprovals';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>

          {/* ✅ User Routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/create" element={<CreateCampaign />} />
            <Route path="/ngos" element={<NGODiscovery />} />
            <Route path="/chat" element={<ChatBot />} />
          </Route>

          {/* ✅ Auth Routes (no layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ Admin Routes with Admin Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="approvals" element={<CampaignApprovals />} />
          </Route>

        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
