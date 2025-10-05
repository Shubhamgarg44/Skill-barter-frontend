import React, { useState } from 'react';
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios"; // ✅ Axios instance

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/auth/login", { email, password });

      if (response.status === 200) {
        const { token, user } = response.data;

        // ✅ Save token in localStorage
        localStorage.setItem("token", token);

        // ✅ Optionally store basic user info (optional)
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("✅ Login successful!");

        navigate("/dashboard"); // Redirect after login
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.status === 401) {
        alert("Invalid email or password. Please try again.");
      } else if (error.response?.status === 404) {
        alert("User not found. Please sign up first.");
      } else {
        alert("Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="divider">
            <span className="divider-text">Or continue with</span>
          </div>

          <div className="social-login">
            <div>
              <a
                href="#"
                className="social-button"
              >
                <img
                  className="social-icon"
                  src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                  alt="Facebook"
                />
              </a>
            </div>
            <div>
              <a
                href="#"
                className="social-button"
              >
                <img
                  className="social-icon"
                  src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                  alt="Twitter"
                />
              </a>
            </div>
            <div>
              <a
                href="#"
                className="social-button"
              >
                <img
                  className="social-icon"
                  src="https://www.svgrepo.com/show/506498/google.svg"
                  alt="Google"
                />
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
