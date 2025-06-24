import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Discover from './pages/Discover';
import CreateCampaign from './pages/CreateCampaign';
import NGODiscovery from './pages/NGODiscovery';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatBot from './pages/ChatBot';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const Googleauthwrapper =()=>{
    return (
      <GoogleOAuthProvider>
        <Login>
          </Login>
      </GoogleOAuthProvider>
    )
  }
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/create" element={<CreateCampaign />} />
          <Route path="/ngos" element={<NGODiscovery />} />
          <Route path="/chat" element={<ChatBot />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;