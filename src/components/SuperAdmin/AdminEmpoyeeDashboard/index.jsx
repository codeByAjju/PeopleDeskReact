import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { Link } from "react-router-dom";

function AdminEmployeeDashboard() {
  return (<main className="">
    <div className="container-fluid px-3 px-lg-4 py-4">
      {/* Page Heading */}
      <div className="page-heading">
        <div className="page-heading-copy">
          <div>
            <h1 className="h3 mb-1">Employee Management</h1>
          </div>
        </div>
        <div className="heading-actions">
          <button className="btn btn-outline-secondary btn-sm" type="button">
            <i className="bi bi-download" aria-hidden="true"></i> Export
          </button>
          <Link to={SuperAdminAccessRoute.CREATE_EMPLOYEE.path} className="btn btn-primary btn-sm" type="button">
            <i className="bi bi-file-earmark-plus" aria-hidden="true"></i>
            Create Employee
          </Link>
        </div>
      </div>

      {/* Metric Cards Section */}
      <section className="row g-3 mt-1" aria-label="Dashboard metrics">
        {/* Revenue Card */}
        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-primary">
            <div className="metric-top">
              <span className="metric-label">Total Employees</span>
              <span className="metric-icon">
                <i className="bi bi-people" aria-hidden="true"></i>
              </span>
            </div>
            <div className="metric-value">12</div>
            <div className="metric-meta">
              <span className="text-success">+2 this month</span>
            </div>
          </article>
        </div>

        {/* Orders Card */}
        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-success">
            <div className="metric-top">
              <span className="metric-label">Active Employees</span>
              <span className="metric-icon">
                <i className="bi bi-check-circle" aria-hidden="true"></i>
              </span>
            </div>
            <div className="metric-value">10</div>
            <div className="metric-meta">
              <span className="text-success">+83.33%</span>
            </div>
          </article>
        </div>

        {/* Customers Card */}
        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-warning">
            <div className="metric-top">
              <span className="metric-label">Inactive Employees</span>
              <span className="metric-icon">
                <i className="bi bi-pause-circle" aria-hidden="true"></i>
              </span>
            </div>
            <div className="metric-value">2</div>
            <div className="metric-meta">
              <span className="text-success">16.67%</span>
            </div>
          </article>
        </div>

        {/* Tickets Card */}
        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-primary">
            <div className="metric-top">
              <span className="metric-label">Terminated</span>
              <span className="metric-icon">
                <i className="bi bi-x-circle" aria-hidden="true"></i>
              </span>
            </div>
            <div className="metric-value">0</div>
            <div className="metric-meta">
              <span className="">Employment ended</span>
            </div>
          </article>
        </div>
      </section>
    </div>
  </main>);
}

export default AdminEmployeeDashboard;
