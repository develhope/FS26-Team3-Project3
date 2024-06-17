import { useState } from "react";
import PropTypes from "prop-types";

const LoginComponent = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };
  LoginComponent.propTypes = {
    onLogin: PropTypes.func.isRequired,
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center px-6">
      <div className="mb-4">
        <img
          src="./Resourse Genie Modificato.png"
          alt="Company Logo"
          className="w-60 md:w-64 lg:w-72 mt-10"
        />
      </div>
      <div className="mb-4 text-center">
        <p className="text-black">Employee</p>
      </div>
      <form className="w-full max-w-sm mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            className="w-full p-3 border border-gray-200 rounded"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            className="w-full p-3 border border-gray-200 rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full p-3 text-white rounded bg-blue-500 hover:bg-blue-600"
          type="submit"
        >
          Login
        </button>
      </form>
      <div className="mb-4">
        <a className="text-sm text-gray-400" href="#">
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default LoginComponent;
