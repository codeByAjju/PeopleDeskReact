import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import userAccessRoute from "../../../routeControl/userRoutMap";
import { SweetAlert } from "../../UiElement/SweetAlert";
function EmployeeNavbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const handleLogout = async () => {
    const confirmed = await SweetAlert.confirm({
      title: "Logout",
      text: "Are you sure you want to logout?",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    });

    if (confirmed) {
      dispatch(logout());
      navigate(userAccessRoute.LOGIN.path);
    }
  };

  return (
    <nav className="navbar employee-navbar navbar-expand bg-white">
      <div className="container-fluid px-3 px-lg-4">
        <button
          className="sidebar-toggle"
          type="button"
          aria-label="Toggle sidebar"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <form className="d-none d-md-flex ms-3 flex-grow-1" role="search">
          <input
            className="form-control search-input"
            type="search"
            placeholder="Search users, orders, reports"
            aria-label="Search"
          />
        </form>

        <div className="navbar-actions ms-auto">
          <button
            className="icon-button theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label="Switch color theme"
            title="Switch color theme"
          >
            <i
              className={isDarkMode ? "bi bi-sun-fill" : "bi bi-moon-stars"}
              aria-hidden="true"
            ></i>
          </button>

          <div className="dropdown">
            <button
              className="icon-button"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="Notifications"
            >
              <span className="notification-dot"></span>
              <i className="bi bi-bell" aria-hidden="true"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-end notification-menu">
              <div className="dropdown-header fw-bold text-body">
                Notifications
              </div>
              <a className="dropdown-item" href="#users">
                <span className="notification-title">New user registered</span>
                <span className="notification-time">4 minutes ago</span>
              </a>
              <a className="dropdown-item" href="#charts">
                <span className="notification-title">
                  Revenue target reached
                </span>
                <span className="notification-time">32 minutes ago</span>
              </a>
              <a className="dropdown-item" href="#settings">
                <span className="notification-title">
                  Security review completed
                </span>
                <span className="notification-time">1 hour ago</span>
              </a>
            </div>
          </div>

          <div className="dropdown">
            <button
              className="profile-button dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                className="avatar-img avatar-sm"
                src="/assets/images/avatar/avatar.jpg"
                alt="Admin Hasan"
              />
              <span className="profile-name d-none d-sm-inline">
                Admin Hasan
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#profile">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#settings">
                  Account settings
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default EmployeeNavbar;
