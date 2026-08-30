const DepartmentDetailsSkeleton = () => (
    <div className="dept-skeleton-container">
        <div className="dept-field">
            <div className="dept-skeleton-line dept-skeleton-label" />
            <div className="dept-skeleton-line dept-skeleton-input" />
        </div>
        <div className="dept-field">
            <div className="dept-skeleton-line dept-skeleton-label" />
            <div className="dept-skeleton-line dept-skeleton-input" />
        </div>
        <div className="dept-field">
            <div className="dept-skeleton-line dept-skeleton-label" />
            <div className="dept-skeleton-line dept-skeleton-textarea" />
        </div>
        <div className="dept-field">
            <div className="dept-skeleton-line dept-skeleton-label" />
            <div className="d-flex gap-2">
                <div className="dept-skeleton-line dept-skeleton-input" style={{ width: "30%" }} />
                <div className="dept-skeleton-line dept-skeleton-input" style={{ width: "30%" }} />
            </div>
        </div>
    </div>
);
export default DepartmentDetailsSkeleton;