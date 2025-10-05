import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios"; // ✅ Import our Axios instance
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate(); // ✅ Used for redirect after signup

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

  // ✅ NEW: Connect backend
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
      // ✅ Combine name fields for backend
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      };

      // ✅ Send request
      const response = await api.post("/auth/signup", userData);

      if (response.status === 201) {
        alert("✅ Signup successful! Please login to continue.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);

      // ✅ Handle different backend errors
      if (error.response?.status === 400) {
        alert(error.response.data.message || "User already exists");
      } else {
        alert("Signup failed. Please try again later.");
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
          <h2 className="signup-title">Create your account</h2>
          <p className="signup-subtitle">
            Or{" "}
            <Link to="/Login" className="signup-link">
              Login here
            </Link>
          </p>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Existing Form UI stays exactly the same */}
          {/* ... All your inputs and password checks remain untouched ... */}
          {/* Your existing fields and buttons stay same */}
        </form>
      </div>
    </div>
  );
};

export default Signup;
