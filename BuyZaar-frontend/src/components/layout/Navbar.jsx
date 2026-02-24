import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on navigation
  const handleDropdownItemClick = () => {
    setIsDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="logo-icon">B</div>
          <span>BuyZaar</span>
        </Link>

        {/* Hamburger Menu */}
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </form>

        {/* Nav Links */}
        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <div className="nav-links">
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/products" className="nav-link" onClick={closeMenu}>
              Products
            </Link>
            <Link to="/about" className="nav-link" onClick={closeMenu}>
              About
            </Link>
            <Link to="/contact" className="nav-link" onClick={closeMenu}>
              Contact
            </Link>

            {user?.role === "admin" && (
              <Link
                to="/dashboard"
                className="nav-link admin-link"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Section - Cart & Auth */}
          <div className="nav-right">
            {/* Cart Icon */}
            <Link to="/cart" className="cart-icon" onClick={closeMenu}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-badge">0</span>
            </Link>

            {/* Auth Button */}
            {user ? (
              <div
                className="user-menu"
                ref={dropdownRef}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className="user-button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="menu"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 12c-6.67 0-10 3.33-10 3.33v2.67C2 21 3 22 4 22h16c1 0 2-1 2-2v-2.67S18.67 14 12 14z"></path>
                  </svg>
                  <span>{user.name || "Profile"}</span>
                </button>
                <div
                  className={`dropdown-menu ${isDropdownOpen ? "active" : ""}`}
                  role="menu"
                >
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => {
                      handleDropdownItemClick();
                      closeMenu();
                    }}
                    role="menuitem"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="dropdown-item"
                    onClick={() => {
                      handleDropdownItemClick();
                      closeMenu();
                    }}
                    role="menuitem"
                  >
                    My Orders
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button
                    onClick={() => {
                      handleLogout();
                      handleDropdownItemClick();
                    }}
                    className="dropdown-item logout-item"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="auth-button" onClick={closeMenu}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
