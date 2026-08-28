function AdminCharts() {
    return <>
        <main className="dashboard-content">
            <div className="container-fluid px-3 px-lg-4 py-4">
                <div className="page-heading">
                    <div className="page-heading-copy">
                        <span className="page-icon">
                            <i className="bi bi-bar-chart-line" aria-hidden="true" />
                        </span>
                        <div>
                            <p className="eyebrow mb-1">Analytics</p>
                            <h1 className="h3 mb-1">Charts</h1>
                            <p className="text-muted mb-0">
                                Visualize revenue, channels, and operating performance.
                            </p>
                        </div>
                    </div>
                </div>
                <section className="row g-3 mt-1">
                    <div className="col-12 col-xl-8">
                        <div className="panel h-100">
                            <div className="panel-header">
                                <div>
                                    <h2 className="h5 mb-1 section-title">
                                        <i className="bi bi-bar-chart-line" aria-hidden="true" />
                                        <span>Revenue Trend</span>
                                    </h2>
                                    <p className="text-muted mb-0">
                                        Static chart component ready for Chart.js integration.
                                    </p>
                                </div>
                            </div>
                            <div className="chart-bars" aria-label="Revenue chart">
                                <div className="chart-column bar-42">
                                    <span />
                                    <small>Jan</small>
                                </div>
                                <div className="chart-column bar-58">
                                    <span />
                                    <small>Feb</small>
                                </div>
                                <div className="chart-column bar-51">
                                    <span />
                                    <small>Mar</small>
                                </div>
                                <div className="chart-column bar-72">
                                    <span />
                                    <small>Apr</small>
                                </div>
                                <div className="chart-column bar-66">
                                    <span />
                                    <small>May</small>
                                </div>
                                <div className="chart-column bar-83">
                                    <span />
                                    <small>Jun</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-4">
                        <div className="panel h-100">
                            <div className="panel-header">
                                <div>
                                    <h2 className="h5 mb-1 section-title">
                                        <i className="bi bi-pie-chart" aria-hidden="true" />
                                        <span>Channel Mix</span>
                                    </h2>
                                    <p className="text-muted mb-0">Revenue contribution by source.</p>
                                </div>
                            </div>
                            <div className="donut-chart mx-auto">
                                <span>68%</span>
                            </div>
                            <div className="legend-list mt-4">
                                <div>
                                    <span className="legend-dot bg-primary" />
                                    Direct sales<strong>42%</strong>
                                </div>
                                <div>
                                    <span className="legend-dot bg-success" />
                                    Marketplace<strong>26%</strong>
                                </div>
                                <div>
                                    <span className="legend-dot bg-warning" />
                                    Partners<strong>18%</strong>
                                </div>
                                <div>
                                    <span className="legend-dot bg-danger" />
                                    Other<strong>14%</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </>
}

export default AdminCharts