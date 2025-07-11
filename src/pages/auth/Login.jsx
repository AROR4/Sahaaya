import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "../../components/GoogleAuthButton";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-[300px] text-center">
        <h2 className="text-xl font-bold mb-4">Login to Sahaaya</h2>
        <GoogleAuthButton
    endpoint="http://localhost:5152/api/login"
    onSuccess={() => {
    const user = JSON.parse(localStorage.getItem("user"));
    navigate(user.role === "admin" ? "/admin" : "/");
  }}
/>

        <p className="text-sm mt-2">
          Don’t have an account? <a href="/signup" className="text-blue-600 underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
