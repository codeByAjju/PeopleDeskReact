import { NavLink } from "react-router-dom";
import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";

function AdminSidebar() {
  const navLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  return (
    <aside className="admin-sidebar" aria-label="Main navigation">
      <div className="sidebar-header">
        <a
          className="brand-mark"
          href={SuperAdminAccessRoute.DASHBOARD.path}
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
          to={SuperAdminAccessRoute.DASHBOARD.path}
          end
        >
          <span className="nav-icon">
            <i className="bi bi-speedometer2" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Dashboard</span>
        </NavLink>

        <NavLink
          className={navLinkClass}
          to={SuperAdminAccessRoute.ADMIN_EMPLOYEE.path}
        >
          <span className="nav-icon">
            <i className="bi bi-people" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Employees</span>
        </NavLink>
        <NavLink
          className={navLinkClass}
          to={SuperAdminAccessRoute.ADMIN_BRANCH.path}
        >
          <span className="nav-icon">
            <i className="bi bi-flag" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Branch</span>
        </NavLink>
        <NavLink
          className={navLinkClass}
          to={SuperAdminAccessRoute.ADMIN_LOCATION.path}
        >
          <span className="nav-icon">
            <i className="bi bi-geo-alt" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Location</span>
        </NavLink>
        <NavLink
          className={navLinkClass}
          to={SuperAdminAccessRoute.ADMIN_SHIFT.path}
        >
          <span className="nav-icon">
            <i className="bi bi-clock" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Shift</span>
        </NavLink>
        <NavLink
          className={navLinkClass}
          to={SuperAdminAccessRoute.ADMIN_DEPARTMENT.path}
        >
          <span className="nav-icon">
            <i className="bi bi-briefcase" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Department</span>
        </NavLink>
        <NavLink
          className={navLinkClass}
          to={SuperAdminAccessRoute.ADMIN_DESIGNATION.path}
        >
          <span className="nav-icon">
            <i className="bi bi-hash" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Designation</span>
        </NavLink>
        <NavLink
          className={navLinkClass}
          to={SuperAdminAccessRoute.ADMIN_USERS.path}
        >
          <span className="nav-icon">
            <i className="bi bi-people" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Users</span>
        </NavLink>
        <NavLink
          className={navLinkClass}
          to={SuperAdminAccessRoute.ADMIN_ADD_USERS.path}
        >
          <span className="nav-icon">
            <i className="bi bi-person-plus" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Add User</span>
        </NavLink>
        <NavLink
          className={navLinkClass}
          to={SuperAdminAccessRoute.ADMIN_PROFILE.path}
        >
          <span className="nav-icon">
            <i className="bi bi-person-badge" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Profile</span>
        </NavLink>

        <NavLink
          className={navLinkClass}
          to={SuperAdminAccessRoute.ADMIN_CHARTS.path}
        >
          <span className="nav-icon">
            <i className="bi bi-bar-chart-line" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Charts</span>
        </NavLink>

        <NavLink
          className={navLinkClass}
          to={SuperAdminAccessRoute.ADMIN_COMPANY.path}
        >
          <span className="nav-icon">
            <i className="bi bi-table" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Company</span>
        </NavLink>

        <a className="nav-link" href="#forms">
          <span className="nav-icon">
            <i className="bi bi-ui-checks-grid" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Forms</span>
        </a>

        <a className="nav-link" href="#components">
          <span className="nav-icon">
            <i className="bi bi-grid-3x3-gap" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Components</span>
        </a>

        <a className="nav-link" href="#alerts">
          <span className="nav-icon">
            <i className="bi bi-exclamation-triangle" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Alerts</span>
        </a>

        <a className="nav-link" href="#modals">
          <span className="nav-icon">
            <i className="bi bi-window-stack" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Modals</span>
        </a>

        <a className="nav-link" href="#settings">
          <span className="nav-icon">
            <i className="bi bi-gear" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Settings</span>
        </a>

        <a className="nav-link" href="#blank">
          <span className="nav-icon">
            <i className="bi bi-file-earmark" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Blank Page</span>
        </a>
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

export default AdminSidebar;