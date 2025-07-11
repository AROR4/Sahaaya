import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  Plus,
  Building2,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import NavbarAuthSection from "./NavbarAuth";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Discover", href: "/discover", icon: Search },
    { name: "Create Campaign", href: "/create", icon: Plus },
    { name: "NGO Discovery", href: "/ngos", icon: Building2 },
    { name: "Chat Assistant", href: "/chat", icon: MessageCircle },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Sahaaya</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:block">
              <NavbarAuthSection />
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 pt-4 pb-3 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="border-t border-gray-200 pt-4">
                <NavbarAuthSection />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 🧩 Main Content Placeholder */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
