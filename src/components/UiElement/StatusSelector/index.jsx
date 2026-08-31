import React from "react";
import "./index.css";

export function StatusSelector({ value = "active", onChange, disabled = false }) {
    const statuses = [
        {
            key: "active",
            label: "Active",
            className: "badge-active",
            selectedIcon: "bi bi-check-circle-fill",
            unselectedIcon: "bi bi-circle",
        },
        {
            key: "inactive",
            label: "Inactive",
            className: "badge-inactive",
            selectedIcon: "bi bi-pause-circle-fill",
            unselectedIcon: "bi bi-circle",
        },
        {
            key: "deleted",
            label: "Deleted",
            className: "badge-deleted",
            selectedIcon: "bi bi-x-circle-fill",
            unselectedIcon: "bi bi-circle",
        },
    ];

    return (
        <div className="ui-status-selector">
            {statuses.map((status) => {
                const isSelected = value === status.key;
                return (
                    <button
                        key={status.key}
                        type="button"
                        className={`ui-status-badge ${status.className} ${isSelected ? "selected" : ""}`}
                        onClick={() => onChange && onChange(status.key)}
                        disabled={disabled}
                    >
                        <span className="badge-icon">
                            <i className={isSelected ? status.selectedIcon : status.unselectedIcon} />
                        </span>
                        {status.label}
                    </button>
                );
            })}
        </div>
    );
}
