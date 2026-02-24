import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", iconClass: "fas fa-chart-pie" },
    { name: "Users", path: "/about", iconClass: "fas fa-users" },
    { name: "Services", path: "/service", iconClass: "fas fa-briefcase" },
    { name: "Register", path: "/register", iconClass: "fas fa-cogs" },
  ];

  return (
    <nav className={styles.sidebar}>
      <div className={styles.navGroup}>
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`${styles.navButton} ${
              location.pathname === item.path ? styles.activeButton : ""
            }`}
          >
            {/* Font Awesome icon from your index.html CDN */}
            <i className={`${item.iconClass} ${styles.icon}`}></i>
            <span className={styles.navText}>{item.name}</span>
          </button>
        ))}
      </div>

      <div className={styles.logoutSection}>
        <button className={styles.navButton} onClick={() => navigate("/login")}>
          <i className={`fas fa-sign-out-alt ${styles.icon}`}></i>
          <span className={styles.navText}>Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
