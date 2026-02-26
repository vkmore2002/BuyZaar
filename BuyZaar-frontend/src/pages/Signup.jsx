import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await registerUser(formData);

      // Auto login after signup
      login(data);

      // Navigate to dashboard for admin, else to home
      if (data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const isFocused = (fieldName) => focusedField === fieldName;
  const hasValue = (fieldName) => formData[fieldName] !== "";

  return (
    <div className="signup-container">
      {/* Gradient background */}
      <div className="gradient-background"></div>

      <div className="signup-card-wrapper">
        <form onSubmit={handleSubmit} className="signup-card">
          {/* Brand Logo */}
          <div className="logo-container">
            <div className="logo">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="8" fill="url(#gradient)" />
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="20"
                  fontWeight="bold"
                  fill="white"
                >
                  B
                </text>
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FF6B6B" />
                    <stop offset="100%" stopColor="#FF8E72" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <h2 className="signup-title">Create Your Account</h2>
          <p className="signup-subtitle">
            Join us and start shopping with exclusive benefits
          </p>

          {error && <div className="error-message">{error}</div>}

          {/* Full Name Input with Floating Label */}
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder=" "
              className="floating-input"
              onChange={handleChange}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField("")}
              required
            />
            <label
              className={`floating-label ${
                isFocused("name") || hasValue("name") ? "active" : ""
              }`}
            >
              Full Name
            </label>
          </div>

          {/* Email Input with Floating Label */}
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder=" "
              className="floating-input"
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              required
            />
            <label
              className={`floating-label ${
                isFocused("email") || hasValue("email") ? "active" : ""
              }`}
            >
              Email Address
            </label>
          </div>

          {/* Phone Input with Floating Label */}
          <div className="input-group">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder=" "
              className="floating-input"
              onChange={handleChange}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField("")}
              required
            />
            <label
              className={`floating-label ${
                isFocused("phone") || hasValue("phone") ? "active" : ""
              }`}
            >
              Phone Number
            </label>
          </div>

          {/* Password Input with Floating Label */}
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder=" "
              className="floating-input"
              onChange={handleChange}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField("")}
              required
            />
            <label
              className={`floating-label ${
                isFocused("password") || hasValue("password") ? "active" : ""
              }`}
            >
              Password
            </label>
          </div>

          {/* Confirm Password Input with Floating Label */}
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder=" "
              className="floating-input"
              onChange={handleChange}
              onFocus={() => setFocusedField("confirmPassword")}
              onBlur={() => setFocusedField("")}
              required
            />
            <label
              className={`floating-label ${
                isFocused("confirmPassword") || hasValue("confirmPassword")
                  ? "active"
                  : ""
              }`}
            >
              Confirm Password
            </label>
          </div>

          {/* Create Account Button */}
          <button type="submit" className="signup-button">
            Create Account
          </button>

          {/* Login Link */}
          <p className="login-prompt">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
