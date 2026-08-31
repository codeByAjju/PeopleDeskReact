function AdminShiftDashboard({ dashboardStats, onCreateClick }) {
  return (<main className="">
    <div className="container-fluid px-3 px-lg-4 py-4">
      {/* Page Heading */}
      <div className="page-heading">
        <div className="page-heading-copy">
          <div>
            <h1 className="h3 mb-1">Shift Management</h1>
          </div>
        </div>
        <div className="heading-actions">
          <button onClick={onCreateClick} className="btn btn-primary btn-sm" type="button">
            <i className="bi bi-file-earmark-plus" aria-hidden="true"></i>
            Create Shift
          </button>
        </div>
      </div>

      {/* Metric Cards Section */}
      <section className="row g-3 mt-1" aria-label="Dashboard metrics">
        {/* Revenue Card */}
        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-primary">
            <div className="metric-top">
              <span className="metric-label">Total Shifts</span>
              <span className="metric-icon">
                <i className="bi bi-building" aria-hidden="true"></i>
              </span>
            </div>
            <div className="metric-value">{dashboardStats?.totalShifts ?? 0}</div>
          </article>
        </div>

        {/* Orders Card */}
        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-success">
            <div className="metric-top">
              <span className="metric-label">Active Shifts</span>
              <span className="metric-icon">
                <i className="bi bi-check-circle" aria-hidden="true"></i>
              </span>
            </div>
            <div className="metric-value">{dashboardStats?.activeShifts ?? 0}</div>
          </article>
        </div>

        {/* Customers Card */}
        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-warning">
            <div className="metric-top">
              <span className="metric-label">Inactive Shifts</span>
              <span className="metric-icon">
                <i className="bi bi-pause-circle" aria-hidden="true"></i>
              </span>
            </div>
            <div className="metric-value">{dashboardStats?.inactiveShifts ?? 0}</div>
          </article>
        </div>

        {/* Tickets Card */}
        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-primary">
            <div className="metric-top">
              <span className="metric-label">Deleted Shifts</span>
              <span className="metric-icon">
                <i className="bi bi-people" aria-hidden="true"></i>
              </span>
            </div>
            <div className="metric-value">{dashboardStats?.deletedShifts ?? 0}</div>
          </article>
        </div>
      </section>
    </div>
  </main>);
}

export default AdminShiftDashboard;
