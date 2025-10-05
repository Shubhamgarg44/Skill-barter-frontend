import React, { useState } from 'react';
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted:', { email, password, rememberMe });
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <div>
          <h2 className="login-title">
            Sign in to your account
          </h2>
          <p className="login-subtitle">
            Or{' '}
            <Link to="/Signup" className="login-link">
                 create a new account
            </Link>
          </p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="login-input"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="remember-forgot">
            <div className="remember-me">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
               <Link to="/forgot-password" className="login-link">
                 Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="login-button"
            >
              Sign in
            </button>
          </div>
          
          <div className="divider">
            <span className="divider-text">Or continue with</span>
          </div>

          <div className="social-login">
  <div>
    <a
      href="http://localhost:5000/auth/facebook"   // backend handles Facebook login
      className="social-button"
    >
      <img className="social-icon" src="https://www.svgrepo.com/show/512120/facebook-176.svg" alt="Facebook" />
    </a>
  </div>
  <div>
    <a
      href="http://localhost:5000/auth/twitter"    // backend handles Twitter login
      className="social-button"
    >
      <img className="social-icon" src="https://www.svgrepo.com/show/513008/twitter-154.svg" alt="Twitter" />
    </a>
  </div>
  <div>
    <a
      href="http://localhost:5000/auth/google"     // backend handles Google login
      className="social-button"
    >
      <img className="social-icon" src="https://www.svgrepo.com/show/506498/google.svg" alt="Google" />
    </a>
  </div>
</div>

        </form>
      </div>
    </div>
  );
};

export default Login;