import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const nav = useNavigate();
  const logout = async () => {
    nav("/");
  };

  return (
    <div>
      <h1>Ciao</h1>
      <button
        onClick={logout}
        className="w-full p-3 text-white rounded custom-button bg-green-700 hover:bg-green-800"
        type="submit"
      >
        Log-out
      </button>
    </div>
  );
};

export default Settings;
