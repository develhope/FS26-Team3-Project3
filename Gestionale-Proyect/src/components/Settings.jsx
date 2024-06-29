import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === "true";
  console.log("Settings - isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const logout = async () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center px-6">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      <button
        onClick={logout}
        className="w-full max-w-sm p-3 text-white rounded custom-button bg-green-700 hover:bg-green-800"
        type="button"
      >
        Log-out
      </button>
    </div>
  );
};

export default Settings;