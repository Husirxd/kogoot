// pages/login.js
"use client"
import "./login.scss"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
      const response = await fetch('http://localhost:3000/auth/login', {
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
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        router.push('/?loggedIn=true');
        //redirect to home page

      } else {
        // Handle login failure, e.g., display an error message.
        setIsError(true);
        setErrorMessage("Login failed. Please try again later.");
      }
    } catch (error) {
      // Handle any network or client-side errors here.
      console.error(error);
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="page container">
      {isError && <div class="notification notification--error">{errorMessage}</div>}
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
        <button type="submit">Login</button>
      </form>
      </div>
    </div>
  );
};

export default LoginPage;