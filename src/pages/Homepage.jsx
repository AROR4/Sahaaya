import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, MessageCircle, Heart, Users, Zap, ArrowRight, Star } from 'lucide-react';


const Home = () => {
  return (
    <div className="min-h-screen">
      <header className="hero-section p-6" >
        <h1>Welcome to Sahaaya</h1>
        <p>Your one-stop platform for community-driven social change.</p>
        <button onClick={() => window.location.href = "/discover"}>Explore Campaigns</button>
      </header>

      <section className="about-section">
        <h2>About Us</h2>
        <p>
          Sahaaya is a platform that connects volunteers, NGOs, and communities
          to collaborate on social initiatives. Whether it's environmental clean-ups,
          education drives, or animal welfare — find causes you care about and take action.
        </p>
      </section>
      

      <section className="features-section">
        <h2>Key Features</h2>
        <ul>
          <li>📍 Location-based campaign discovery</li>
          <li>📝 Create your own verified campaigns</li>
          <li>🤝 Connect with NGOs and local initiatives</li>
          <li>💬 AI chatbot to guide your participation</li>
        </ul>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Sahaaya. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
