// pages/login.js
"use client"
import { useState } from 'react';
import "./register.scss"

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            email,
            password,
            nickname
        };

        try {
            const response = await fetch('http://localhost:3000/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Handle successful login here, e.g., redirect to a dashboard.
                //get response token
                const data = await response.json();
                //save token to local storage
                localStorage.setItem('userId', data.id);
                localStorage.setItem('token', data.token);
            } else {
                // Handle login failure, e.g., display an error message.
            }
        } catch (error) {
            // Handle any network or client-side errors here.
            console.error(error);
        }
    };

    return (
        <div className='page container'>
            <div className='page-register'>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nickname</label>
                    <input
                        type="test"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            </div>
        </div>
    );
};

export default LoginPage;