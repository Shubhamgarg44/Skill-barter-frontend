import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Signup.css";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  const validatePassword = (password) => {
    setPasswordValidation({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPasswordValid = Object.values(passwordValidation).every(Boolean);
    if (!isPasswordValid) {
      alert('Please ensure your password meets all requirements');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('You must agree to the terms and conditions');
      return;
    }

    try {
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      };

      const response = await api.post("/auth/signup", userData);

      if (response.status === 201) {
        toast.success("✅ Signup successful! Please login to continue.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response?.status === 400) {
        toast.error("Signup failed. Please try again later.");

      } else {
        toast.error("Signup failed. Please try again later.");
      }
    }
  };

  const isSubmitDisabled = () => {
    return (
      !Object.values(passwordValidation).every(Boolean) ||
      formData.password !== formData.confirmPassword ||
      !formData.agreeToTerms
    );
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div>
          <h2 className="signup-title">
            Create your account
          </h2>
          <p className="signup-subtitle">
            Or{' '}
            <Link to="/Login" className="signup-link">
              Login here
            </Link>
          </p>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="name-fields">
            <div className="form-group">
              <label htmlFor="first-name" className="sr-only">
                First Name
              </label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                className="form-input"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name" className="sr-only">
                Last Name
              </label>
              <input
                id="last-name"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                className="form-input"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="form-input"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="form-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            {/* Password Requirements */}
            <div className="password-validation">
              <p className="password-validation-title">Password must contain:</p>
              <ul className="password-validation-list">
                <li className={`password-validation-item ${passwordValidation.hasMinLength ? "valid" : ""}`}>
                  <span className="password-validation-icon">
                    {passwordValidation.hasMinLength ? "✓" : "•"}
                  </span>
                  At least 8 characters
                </li>
                <li className={`password-validation-item ${passwordValidation.hasUpperCase ? "valid" : ""}`}>
                  <span className="password-validation-icon">
                    {passwordValidation.hasUpperCase ? "✓" : "•"}
                  </span>
                  One uppercase letter
                </li>
                <li className={`password-validation-item ${passwordValidation.hasLowerCase ? "valid" : ""}`}>
                  <span className="password-validation-icon">
                    {passwordValidation.hasLowerCase ? "✓" : "•"}
                  </span>
                  One lowercase letter
                </li>
                <li className={`password-validation-item ${passwordValidation.hasNumber ? "valid" : ""}`}>
                  <span className="password-validation-icon">
                    {passwordValidation.hasNumber ? "✓" : "•"}
                  </span>
                  One number
                </li>
                <li className={`password-validation-item ${passwordValidation.hasSpecialChar ? "valid" : ""}`}>
                  <span className="password-validation-icon">
                    {passwordValidation.hasSpecialChar ? "✓" : "•"}
                  </span>
                  One special character
                </li>
              </ul>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="form-input"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {formData.confirmPassword && (
              <p className={`password-match ${formData.password === formData.confirmPassword ? 'valid' : 'invalid'}`}>
                {formData.password === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
              </p>
            )}
          </div>

          <div className="checkbox-group">
            <input
              id="agree-terms"
              name="agreeToTerms"
              type="checkbox"
              className="checkbox-input"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <label htmlFor="agree-terms" className="checkbox-label">
              I agree to the <a href="/terms" className="terms-link">Terms and Conditions</a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitDisabled()}
              className="submit-button"
            >
              Create Account
            </button>
          </div>

          <div className="divider">
            <span className="divider-text">Or sign up with</span>
          </div>

          <div className="social-buttons">
            <div>
              <a href="#" className="social-button">
                <img className="social-icon" src="https://www.svgrepo.com/show/512120/facebook-176.svg" alt="Facebook" />
              </a>
            </div>
            <div>
              <a href="#" className="social-button">
                <img className="social-icon" src="https://www.svgrepo.com/show/513008/twitter-154.svg" alt="Twitter" />
              </a>
            </div>
            <div>
              <a href="#" className="social-button">
                <img className="social-icon" src="https://www.svgrepo.com/show/506498/google.svg" alt="Google" />
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
