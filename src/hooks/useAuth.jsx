// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload(); 
  };

  return { user, logout };
}
