import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? styles.activeButton : "";

  return (
    <nav className={styles.sidebar}>
      <div className={styles.navGroup}>
        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          className={`${styles.navButton} ${isActive("/")}`}
        >
          <i class={`fa-solid fa-house ${styles.icon}`}></i>
          <span className={styles.navText}>Home</span>
        </button>

        {/* About Button */}
        <button
          onClick={() => navigate("/about")}
          className={`${styles.navButton} ${isActive("/about")}`}
        >
          <i className={`fas fa-users ${styles.icon}`}></i>
          <span className={styles.navText}>About</span>
        </button>

        {/* Services Button */}
        <button
          onClick={() => navigate("/service")}
          className={`${styles.navButton} ${isActive("/service")}`}
        >
          <i className={`fas fa-briefcase ${styles.icon}`}></i>
          <span className={styles.navText}>Services</span>
        </button>

        {/* Register Button */}
        <button
          onClick={() => navigate("/register")}
          className={`${styles.navButton} ${isActive("/register")}`}
        >
          <i className={`fas fa-user-plus ${styles.icon}`}></i>
          <span className={styles.navText}>Register</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
