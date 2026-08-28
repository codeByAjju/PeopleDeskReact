import { NavLink } from "react-router-dom";
import userAccessRoute from "../../../routeControl/userRoutMap";

function UserSidebar() {
  const navLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  return (
    <aside className="admin-sidebar" aria-label="Main navigation">
      <div className="sidebar-header">
        <a
          className="brand-mark"
          href={userAccessRoute.DASHBOARD.path}
          aria-label="adminHMD dashboard"
        >
          <span className="brand-icon">
            <i className="bi bi-grid-1x2-fill" aria-hidden="true"></i>
          </span>

          <span className="brand-copy">
            <span className="brand-title">PeopleDesk</span>
            {/* <span className="brand-subtitle">Admin Template</span> */}
          </span>
        </a>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          className={navLinkClass}
          to={userAccessRoute.DASHBOARD.path}
          end
        >
          <span className="nav-icon">
            <i className="bi bi-speedometer2" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Dashboard</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <span className="status-dot"></span>
        <span className="sidebar-footer-text">
          System running smoothly
        </span>
      </div>
    </aside>
  );
}

export default UserSidebar;