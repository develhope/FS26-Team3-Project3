import React from 'react';

const Dashboard = () => {
    return (
        <div className="bg-gray-100 max-w-[430px] mx-auto">
            <div className="bg-white text-black text-center py-4 flex justify-between items-center px-4">
                <i className="fas fa-bars"></i>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <i className="fas fa-bell"></i>
            </div>
            <div className="p-4 space-y-4">
                <div className="bg-white p-4 rounded-lg shadow" id="summary cards">
                    <h2 className="text-xl font-bold mb-2">Summary</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-200 p-3 rounded shadow text-center">
                            <span className="block text-sm text-black">Totale ore lavorate</span>
                            <span className="block text-2xl font-bold text-black">32</span>
                        </div>
                        <div className="bg-gray-200 p-3 rounded shadow text-center">
                            <span className="block text-sm text-black">Turni pendenti</span>
                            <span className="block text-2xl font-bold text-black">1</span>
                        </div>
                        <div className="bg-gray-200 p-3 rounded shadow text-center">
                            <span className="block text-sm text-black">Paga per tempo lavorato</span>
                            <span className="block text-2xl font-bold text-black">$1,250</span>
                        </div>
                        <div className="bg-gray-200 p-3 rounded shadow text-center">
                            <span className="block text-sm text-black">Orari straordinari</span>
                            <span className="block text-2xl font-bold text-black">0</span>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto flex space-x-4 py-2" id="quick table status tiles">
                    <div className="bg-green-200 p-3 rounded shadow text-center flex-shrink-0">
                        <span className="block text-sm">Lunedi 01</span>
                        <span className="block text-xs">Free</span>
                    </div>
                    <div className="bg-gray-200 p-3 rounded shadow text-center flex-shrink-0">
                        <span className="block text-sm">Martedi 02</span>
                        <span className="block text-xs">Occupied</span>
                    </div>
                    <div className="bg-green-200 p-3 rounded shadow text-center flex-shrink-0">
                        <span className="block text-sm">Mercoledi 03</span>
                        <span className="block text-xs">Free</span>
                    </div>
                    <div className="bg-gray-200 p-3 rounded shadow text-center flex-shrink-0">
                        <span className="block text-sm">Giovedi 04</span>
                        <span className="block text-xs">Occupied</span>
                    </div>
                    <div className="bg-green-200 p-3 rounded shadow text-center flex-shrink-0">
                        <span className="block text-sm">Venerdi 05</span>
                        <span className="block text-xs">Free</span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow" id="guest list">
                    <h3 className="text-lg font-semibold mb-2">Lavoratori di turno</h3>
                    <ul className="text-sm space-y-2">
                        <li>Jimmy Saavedra - 7:00 AM</li>
                        <li>Francesca - 8:00 AM</li>
                        <li>Giorgio - 7:00 AM</li>
                        <li>Ricardo -</li>
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow" id="actionable notifications">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Notifications</h3>
                        <i className="fas fa-bell"></i>
                    </div>
                    <p className="text-sm mt-2">Non dimenticare che dobbiamo lavorare in squadra</p>
                </div>
                <div className="fixed bottom-0 left-0 right-0 bg-green-900 py-4 px-4 flex items-center justify-between text-white" id="navigation bar">
                    <a className="text-center text-sm" href="#">
                        <i className="fas fa-home"></i>
                        <span>Home</span>
                    </a>
                    <a className="text-center text-sm" href="#">
                        <i className=""></i>
                        <span>Dashboard</span>
                    </a>
                    <a className="text-center text-sm" href="#">
                        <i className="fas fa-user"></i>
                        <span>Profile</span>
                    </a>
                    <a className="text-center text-sm" href="#">
                        <i className="fas fa-cog"></i>
                        <span>Settings</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;