import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "../../components/GoogleAuthButton";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-[300px] text-center">
        <h2 className="text-xl font-bold mb-4">Join Sahaaya</h2>
        <GoogleAuthButton endpoint="http://localhost:5152/api/signup" onSuccess={() => navigate("/")} />
        <p className="text-sm mt-2">
          Already have an account? <a href="/login" className="text-blue-600 underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
