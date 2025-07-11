import React from "react";
import { useAuth } from "../context/AuthContext"; 

const GoogleAuthButton = ({ endpoint, onSuccess }) => {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const { login } = useAuth();

  React.useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            const res = await fetch(endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credential: response.credential }),
            });

            const data = await res.json();
            if (data.user) {
              login(data.user);
              onSuccess();
            } else {
              alert(data.message || "Failed");
            }
          } catch (err) {
            console.error("Google login failed:", err);
            console.log(err);
            alert("Something went wrong");
          }
        },
      });

      window.google.accounts.id.renderButton(
        document.getElementById("g-signin-btn"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  return <div id="g-signin-btn" className="my-4"></div>;
};

export default GoogleAuthButton;
