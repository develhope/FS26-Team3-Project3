import React from 'react';
import LoginComponent from './LoginComponent';

const users = [
    { email: 'jimmsaav@icloud.com', password: '12345' },
    { email: 'user2@example.com', password: 'password456' }
];

const EventLogin = () => {
    const handleLogin = (email, password) => {
        const user = users.find((user) => user.email === email && user.password === password);
        if (user) {
            window.location.href = '/dashboard';
        } else {
            alert('Invalid email or password');
        }
    };

    return <LoginComponent onLogin={handleLogin} />;
};

export default EventLogin;