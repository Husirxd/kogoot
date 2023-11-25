// pages/login.js
"use client"
import "./login.scss"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        router.push('/?loggedIn=true');

      } else {
        setIsError(true);
        setErrorMessage("Login failed. Please try again later.");
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    }
  };




  return (
    <div className="page container">
      {isError && <div className="notification notification--error">{errorMessage}</div>}
      <div className="login-form">
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
        <button className="cta-button" type="submit">Login</button>
      </form>
        <div className="flex flex--center"><Link href="/account/create">Create Account!</Link></div>
      </div>
    </div>
  );
};

export default LoginPage;