// pages/login.js
"use client"
import "./create-account.scss";
import { useState } from 'react';
import Image from 'next/image';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [file, setFile] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            email,
            password,
            nickname,
            uid: '',
            file
        };

        try {
            console.log(payload);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('nickname', nickname);
            const response = await fetch('http://localhost:8080/users/create', {
                method: 'POST',
                body: formData,
                
            });

            if (response.ok) {
                // Handle successful login here, e.g., redirect to a dashboard.
                //get response token
                const data = await response.json();
                localStorage.setItem('userId', data.id);
                localStorage.setItem('token', data.token);
                //redirect to my-account
            } else {
                // Handle login failure, e.g., display an error message.
            }
        } catch (error) {
            // Handle any network or client-side errors here.
            console.error(error);
        }
    };

    return (
        <div className='page container page-create-account create-account'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} >
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
                <div>
                    <label>
                        Avatar
                    </label>
                    <input type="file" name='file'  onChange={(e) => setFile(e.target.files[0])} />    
                </div>
                <button className="cta-button" type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;