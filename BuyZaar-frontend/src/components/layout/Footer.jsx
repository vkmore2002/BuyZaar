import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 */}
        <div className="footer-section">
          <h3>BuyZaar</h3>
          <p>Your one-stop shop for everything.</p>
        </div>

        {/* Column 2 */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Column 3 */}
        <div className="footer-section">
          <h4>Customer</h4>
          <Link to="/profile">My Profile</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/cart">Cart</Link>
        </div>

        {/* Column 4 */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@buyzaar.com</p>
          <p>Phone: +91 9876543210</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BuyZaar. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
