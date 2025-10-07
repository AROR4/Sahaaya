import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "../../components/GoogleAuthButton";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Outer Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-[380px] text-center border border-gray-200"
      >
        {/* Logo / Title */}
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-extrabold text-gray-800 mb-6"
        >
          Welcome Back to <span className="text-blue-600">Sahaaya</span>
        </motion.h2>

        <p className="text-gray-500 mb-6 text-sm">
          Empowering <span className="text-blue-500 font-semibold">Changemakers</span> — One Campaign at a Time
        </p>

        {/* Google Auth */}
        <GoogleAuthButton
          endpoint="http://localhost:5152/api/login"
          onSuccess={() => {
            const user = JSON.parse(localStorage.getItem("user"));
            navigate(user.role === "admin" ? "/admin" : "/");
          }}
        />

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-400 text-xs uppercase">or</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        {/* Email / Password inputs (optional future-proofing) */}
        <form className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm mt-6 text-gray-500">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
