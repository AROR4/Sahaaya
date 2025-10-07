import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "../../components/GoogleAuthButton";
import { motion } from "framer-motion";

const Signup = () => {
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
        {/* Title */}
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-extrabold text-gray-800 mb-6"
        >
          Join <span className="text-blue-600">Sahaaya</span>
        </motion.h2>

        <p className="text-gray-500 mb-6 text-sm">
          Be part of a growing community of{" "}
          <span className="text-blue-500 font-semibold">Changemakers</span>.
        </p>

        {/* Google Signup */}
        <GoogleAuthButton
          endpoint="http://localhost:5152/api/signup"
          onSuccess={() => navigate("/")}
        />

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-400 text-xs uppercase">or</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        {/* Signup form (future-proof) */}
        <form className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
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
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm mt-6 text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
