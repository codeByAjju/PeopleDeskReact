import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../AdminCompanyDetail/CompanyDetailsPage.css";
import { SuperAdminEmployeeServices } from "../../../Services/SuperAdmin/Employee/index.service";
import { SuperAdminDepartmentServices } from "../../../Services/SuperAdmin/Department/index.service";
import { SuperAdminDesignationServices } from "../../../Services/SuperAdmin/Designation/index.service";
import { SuperAdminBranchServices } from "../../../Services/SuperAdmin/Branch/index.service";
import { SuperAdminLocationServices } from "../../../Services/SuperAdmin/Location/index.service";
import { SuperAdminShiftServices } from "../../../Services/SuperAdmin/Shift/index.service";
import { SuperAdminCountryServices } from "../../../Services/SuperAdmin/Country/index.service";
import { SuperAdminStateServices } from "../../../Services/SuperAdmin/State/index.service";
import { SuperAdminCityServices } from "../../../Services/SuperAdmin/City/index.service";
import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { extractApiItem, extractApiList, findMasterLabel, getMasterLabel } from "../../../utils/common.util";
import { EmployeeDetailsSkeleton } from "../../UiElement";


const STATUS_BADGE_MAP = {
    active: { label: "Active", className: "badge-status-active" },
    inactive: { label: "Inactive", className: "badge-status-inactive" },
    terminated: { label: "Terminated", className: "badge-status-deleted" },
    deleted: { label: "Deleted", className: "badge-status-deleted" },
};

const formatDate = (isoString, withTime = false) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
    });
};

const formatEnum = (value) =>
    value ? String(value).replace(/_/g, " ") : "-";

const OverviewCard = ({ icon, label, value }) => (
    <div className="ov-card">
        <span className="ov-card-icon">
            <i className={`fa ${icon}`} aria-hidden="true" />
        </span>
        <div>
            <div className="ov-card-label">{label}</div>
            <div className="ov-card-value">{value || "-"}</div>
        </div>
    </div>
);

const AdminEmployeeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [labels, setLabels] = useState({});
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        if (!id) return;
        let cancelled = false;
        const loadDetails = async () => {
            setLoading(true);
            try {
                const employeeRes = await SuperAdminEmployeeServices.superAdminGetEmployeeById(id);
                const data = extractApiItem(employeeRes);
                if (!data) {
                    throw new Error("Failed to load employee details");
                }
                if (cancelled) return;
                setEmployee(data);

                const [
                    departmentRes,
                    designationRes,
                    branchRes,
                    locationRes,
                    shiftRes,
                    countryRes,
                    stateRes,
                    cityRes,
                    managerRes,
                ] = await Promise.all([
                    SuperAdminDepartmentServices.superAdminGetAllDepartment({ limit: 1000, page: 1 }),
                    SuperAdminDesignationServices.superAdminGetAllDesignation({ limit: 1000, page: 1 }),
                    SuperAdminBranchServices.superAdminGetAllBranch({ limit: 1000, page: 1 }),
                    SuperAdminLocationServices.superAdminGetAllLocation({ limit: 1000, page: 1 }),
                    SuperAdminShiftServices.superAdminGetAllShift({ limit: 1000, page: 1 }),
                    data.countryId
                        ? SuperAdminCountryServices.superAdminGetCountryById(data.countryId)
                        : Promise.resolve(null),
                    data.stateId
                        ? SuperAdminStateServices.superAdminGetStateById(data.stateId)
                        : Promise.resolve(null),
                    data.cityId
                        ? SuperAdminCityServices.superAdminGetCityById(data.cityId)
                        : Promise.resolve(null),
                    data.managerId
                        ? SuperAdminEmployeeServices.superAdminGetEmployeeById(data.managerId)
                        : Promise.resolve(null),
                ]);

                if (cancelled) return;

                const departments = extractApiList(departmentRes, ["departments", "department"]);
                const designations = extractApiList(designationRes, ["designations", "designation"]);
                const branches = extractApiList(branchRes, ["branches", "branch"]);
                const shifts = extractApiList(shiftRes, ["shifts", "shift"]);
                const locations = extractApiList(locationRes, ["locations", "location"]);
                const countryItem = extractApiItem(countryRes);
                const stateItem = extractApiItem(stateRes);
                const cityItem = extractApiItem(cityRes);
                const managerItem = extractApiItem(managerRes);

                setLabels({
                    department:
                        getMasterLabel(data.department) ||
                        findMasterLabel(departments, data.departmentId) ||
                        "-",
                    designation:
                        getMasterLabel(data.designation) ||
                        findMasterLabel(designations, data.designationId) ||
                        "-",
                    branch:
                        getMasterLabel(data.branch) ||
                        findMasterLabel(branches, data.branchId) ||
                        "-",
                    location:
                        getMasterLabel(data.location) ||
                        findMasterLabel(locations, data.locationId) ||
                        "-",
                    shift:
                        getMasterLabel(data.shift) ||
                        findMasterLabel(shifts, data.shiftId) ||
                        "-",
                    country: getMasterLabel(data.country) || getMasterLabel(countryItem) || "-",
                    state: getMasterLabel(data.state) || getMasterLabel(stateItem) || "-",
                    city: getMasterLabel(data.city) || getMasterLabel(cityItem) || "-",
                    manager:
                        getMasterLabel(data.manager) ||
                        getMasterLabel(managerItem) ||
                        "-",
                });
            } catch (err) {
                const message =
                    err?.response?.data?.message || err?.message || "Failed to load employee details";
                if (!cancelled) {
                    setFetchError(message);
                    toast.error(message);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        loadDetails();
        return () => {
            cancelled = true;
        };
    }, [id]);

    const handleEdit = () => navigate(`/superAdmin/edit-employee/${id}`);

    if (loading) {
        return <EmployeeDetailsSkeleton />
    }

    if (fetchError) {
        return (
            <div className="cp-page">
                <div className="cp-card">
                    <div className="text-danger">{fetchError}</div>
                    <Link to={SuperAdminAccessRoute.ADMIN_EMPLOYEE.path} className="btn btn-outline-light mt-3">
                        Back to list
                    </Link>
                </div>
            </div>
        );
    }

    if (!employee) return null;

    const fullName = `${employee.firstName || ""} ${employee.lastName || ""}`.trim() || "-";
    const statusInfo =
        STATUS_BADGE_MAP[employee.employmentStatus] || {
            label: employee.employmentStatus || "Unknown",
            className: "badge-status-default",
        };

    return (
        <div className="cp-page">
            <div className="cp-heading">
                <h1>Employee Profile</h1>
                <div className="cp-breadcrumb">
                    <Link to={SuperAdminAccessRoute.DASHBOARD.path}>
                        <i className="fa fa-home" aria-hidden="true" /> Dashboard
                    </Link>
                    <i className="fa fa-chevron-right cp-crumb-sep" aria-hidden="true" />
                    <Link to={SuperAdminAccessRoute.ADMIN_EMPLOYEE.path}>Employees</Link>
                    <i className="fa fa-chevron-right cp-crumb-sep" aria-hidden="true" />
                    <span>Employee Profile</span>
                </div>
            </div>

            <div className="cp-card cp-header-card">
                <div className="cp-header-left">
                    <div className="cp-logo">
                        {employee.profileImage ? (
                            <img src={employee.profileImage} alt={`${fullName} profile`} />
                        ) : (
                            <i className="fa fa-user" aria-hidden="true" />
                        )}
                    </div>
                    <div>
                        <div className="cp-name-row">
                            <h2>{fullName}</h2>
                            <span className={`badge-status ${statusInfo.className}`}>
                                {statusInfo.label}
                            </span>
                        </div>
                        <ul className="cp-contact-list">
                            <li>
                                <i className="fa fa-hashtag" aria-hidden="true" />
                                {employee.employeeCode}
                            </li>
                            <li>
                                <i className="fa fa-envelope" aria-hidden="true" />
                                {employee.email}
                            </li>
                            <li>
                                <i className="fa fa-phone" aria-hidden="true" />
                                {employee.phoneNumberCountryCode} {employee.phoneNumber}
                            </li>
                            <li>
                                <i className="fa fa-venus-mars" aria-hidden="true" />
                                {formatEnum(employee.gender)}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="cp-header-meta">
                    <div className="cp-meta-row">
                        <span className="cp-meta-label">Employment Type</span>
                        <span>:</span>
                        <span className="cp-meta-value">{formatEnum(employee.employmentType)}</span>
                    </div>
                    <div className="cp-meta-row">
                        <span className="cp-meta-label">Date of Joining</span>
                        <span>:</span>
                        <span className="cp-meta-value">{formatDate(employee.dateOfJoining)}</span>
                    </div>
                    <div className="cp-meta-row">
                        <span className="cp-meta-label">Date of Birth</span>
                        <span>:</span>
                        <span className="cp-meta-value">{formatDate(employee.dateOfBirth)}</span>
                    </div>
                    <div className="cp-meta-row">
                        <span className="cp-meta-label">Can Login</span>
                        <span>:</span>
                        <span className="cp-meta-value">{employee.canEmployeeLogin ? "Yes" : "No"}</span>
                    </div>
                    <div className="cp-meta-row">
                        <span className="cp-meta-label">Date of Leaving</span>
                        <span>:</span>
                        <span className="cp-meta-value">{formatDate(employee.dateOfLeaving)}</span>
                    </div>
                </div>

                <button type="button" className="btn btn-outline-light cp-edit-btn" onClick={handleEdit}>
                    <i className="fa fa-pen" aria-hidden="true" /> Edit Employee
                </button>
            </div>

            <div className="cp-card">
                <h3 className="cp-section-title">Employee Overview</h3>
                <div className="cp-overview-grid">
                    <div className="ov-about">
                        <div className="ov-about-title">About Employee</div>
                        <p>
                            {fullName} is registered with employee code {employee.employeeCode}.
                            Contact them at {employee.email} for employment related communication.
                        </p>
                    </div>
                    <div className="ov-cards">
                        <OverviewCard icon="fa-envelope" label="Email" value={employee.email} />
                        <OverviewCard icon="fa-phone" label="Phone" value={`${employee.phoneNumberCountryCode || ""} ${employee.phoneNumber || ""}`.trim()} />
                        <OverviewCard icon="fa-briefcase" label="Employment Type" value={formatEnum(employee.employmentType)} />
                        <OverviewCard icon="fa-sitemap" label="Department" value={labels.department} />
                        <OverviewCard icon="fa-id-card" label="Designation" value={labels.designation} />
                        <OverviewCard icon="fa-clock-o" label="Shift" value={labels.shift} />
                    </div>
                </div>
            </div>

            <div className="cp-row-two">
                <div className="cp-card">
                    <h3 className="cp-section-title">
                        <i className="fa fa-map-marker-alt cp-section-icon" aria-hidden="true" />
                        Address
                    </h3>
                    <div className="cp-address-grid">
                        <div className="cp-address-item cp-address-full">
                            <div className="cp-address-label">Street Address</div>
                            <div className="cp-address-value">{employee.address || "-"}</div>
                        </div>
                        <div className="cp-address-item">
                            <div className="cp-address-label">City</div>
                            <div className="cp-address-value">{labels.city}</div>
                        </div>
                        <div className="cp-address-item">
                            <div className="cp-address-label">Postal Code</div>
                            <div className="cp-address-value">{employee.postalCode || "-"}</div>
                        </div>
                        <div className="cp-address-item">
                            <div className="cp-address-label">State</div>
                            <div className="cp-address-value">{labels.state}</div>
                        </div>
                        <div className="cp-address-item">
                            <div className="cp-address-label">Country</div>
                            <div className="cp-address-value">{labels.country}</div>
                        </div>
                    </div>
                </div>

                <div className="cp-card">
                    <h3 className="cp-section-title">
                        <i className="fa fa-building cp-section-icon" aria-hidden="true" />
                        Assignment
                    </h3>
                    <div className="cp-address-grid">
                        <div className="cp-address-item">
                            <div className="cp-address-label">Branch</div>
                            <div className="cp-address-value">{labels.branch}</div>
                        </div>
                        <div className="cp-address-item">
                            <div className="cp-address-label">Location</div>
                            <div className="cp-address-value">{labels.location}</div>
                        </div>
                        <div className="cp-address-item">
                            <div className="cp-address-label">Manager</div>
                            <div className="cp-address-value">{labels.manager}</div>
                        </div>
                        <div className="cp-address-item">
                            <div className="cp-address-label">Login Access</div>
                            <div className="cp-address-value">{employee.canEmployeeLogin ? "Enabled" : "Disabled"}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cp-card">
                <h3 className="cp-section-title">
                    <i className="fa fa-clock cp-section-icon" aria-hidden="true" />
                    Recent Activity
                </h3>
                <div className="cp-activity">
                    <span className="cp-activity-dot" />
                    <div>
                        <div className="cp-activity-title">Employee profile updated</div>
                        <div className="cp-activity-meta">
                            by Admin &bull; {formatDate(employee.updatedAt, true)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminEmployeeDetail;
