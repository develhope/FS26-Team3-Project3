import React, { useState } from 'react';

const LoginComponent = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="flex flex-col h-screen justify-center items-center px-6">
            <div className="mb-4">
                <img src="./Resourse Genie.png" alt="Company Logo" className="w-32 md:w-48 lg:w-56" />
            </div>
            <div className="mb-4 text-center">
                <h2 className="text-2xl font-semibold">Resource Genie</h2>
                <p className="text-gray-400">Employee Scheduling</p>
            </div>
            <form className="w-full mb-4" onSubmit={handleSubmit}>
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
                <button className="w-full p-3 text-white rounded custom-button bg-green-700 hover:bg-green-800" type="submit">
                    Login
                </button>
            </form>
            <div className="mb-4">
                <a className="text-sm text-gray-400" href="#">Forgot password?</a>
            </div>
        </div>
    );
};

export default LoginComponent;