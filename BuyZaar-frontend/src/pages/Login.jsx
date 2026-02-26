import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

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
      const data = await loginUser(formData);

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

  return (
    <div className="login-container">
      {/* Gradient background */}
      <div className="gradient-background"></div>

      <div className="login-card-wrapper">
        <form onSubmit={handleSubmit} className="login-card">
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

          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">
            Sign in to your account to continue shopping
          </p>

          {error && <div className="error-message">{error}</div>}

          {/* Email Input with Floating Label */}
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder=" "
              className="floating-input"
              onChange={handleChange}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              required
            />
            <label
              className={`floating-label ${
                emailFocused || formData.email ? "active" : ""
              }`}
            >
              Email Address
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
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              required
            />
            <label
              className={`floating-label ${
                passwordFocused || formData.password ? "active" : ""
              }`}
            >
              Password
            </label>
          </div>

          {/* Forgot Password Link */}
          <div className="forgot-password-container">
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button type="submit" className="login-button">
            Sign In
          </button>

          {/* Sign Up Link */}
          <p className="signup-prompt">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
