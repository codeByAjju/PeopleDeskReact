import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./CompanyDetailsPage.css";
import { SuperAdminCompanyServices } from "../../../Services/SuperAdmin/Company/index.service";
import { CompanyDetailsSkeleton } from "../../UiElement";


const STATUS_BADGE_MAP = {
    active: { label: "Active", className: "badge-status-active" },
    inactive: { label: "Inactive", className: "badge-status-inactive" },
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

const AdminCompanyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        SuperAdminCompanyServices.superAdminGetCompanyById(id)
            .then((res) => {
                setCompany(res?.data?.result ?? res?.data?.data ?? res?.data);
            })
            .catch((err) => {
                const message =
                    err?.response?.data?.message || "Failed to load company details";
                setFetchError(message);
                toast.error(message);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleEdit = () => navigate(`/company/${id}/edit`);

    if (loading) {
        return <CompanyDetailsSkeleton />
    }

    if (fetchError) {
        return (
            <div className="cp-page">
                <div className="cp-card">
                    <div className="text-danger">{fetchError}</div>
                    <Link to="/company/list" className="btn btn-outline-light mt-3">
                        Back to list
                    </Link>
                </div>
            </div>
        );
    }

    if (!company) return null;

    const statusInfo =
        STATUS_BADGE_MAP[company.status] || {
            label: company.status || "Unknown",
            className: "badge-status-default",
        };

    return (
        <div className="cp-page">
            {/* Page heading + breadcrumb */}
            <div className="cp-heading">
                <h1>Company Profile</h1>
                <div className="cp-breadcrumb">
                    <Link to="/dashboard">
                        <i className="fa fa-home" aria-hidden="true" /> Dashboard
                    </Link>
                    <i className="fa fa-chevron-right cp-crumb-sep" aria-hidden="true" />
                    <Link to="/company/list">Companies</Link>
                    <i className="fa fa-chevron-right cp-crumb-sep" aria-hidden="true" />
                    <span>Company Profile</span>
                </div>
            </div>

            {/* Header card */}
            <div className="cp-card cp-header-card">
                <div className="cp-header-left">
                    <div className="cp-logo">
                        {company.logo ? (
                            <img src={company.logo} alt={`${company.name} logo`} />
                        ) : (
                            <i className="fa fa-building" aria-hidden="true" />
                        )}
                    </div>
                    <div>
                        <div className="cp-name-row">
                            <h2>{company.name}</h2>
                            <span className={`badge-status ${statusInfo.className}`}>
                                {statusInfo.label}
                            </span>
                        </div>
                        <ul className="cp-contact-list">
                            <li>
                                <i className="fa fa-hashtag" aria-hidden="true" />
                                {company.code}
                            </li>
                            <li>
                                <i className="fa fa-envelope" aria-hidden="true" />
                                {company.email}
                            </li>
                            <li>
                                <i className="fa fa-phone" aria-hidden="true" />
                                {company.phoneNumber}
                            </li>
                            {company.website && (
                                <li>
                                    <i className="fa fa-globe" aria-hidden="true" />
                                    <a href={company.website} target="_blank" rel="noreferrer">
                                        {company.website.replace(/^https?:\/\//, "")}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* STATIC placeholder block — your API has no company-type /
            registration / GST / incorporation-date / company-size
            fields yet. Replace the hardcoded values below once it does. */}
                <div className="cp-header-meta">
                    <div className="cp-meta-row">
                        <span className="cp-meta-label">Company Type</span>
                        <span>:</span>
                        <span className="cp-meta-value">Private Limited</span>
                    </div>
                    <div className="cp-meta-row">
                        <span className="cp-meta-label">Registration Number</span>
                        <span>:</span>
                        <span className="cp-meta-value">U72900MP2019PTC123456</span>
                    </div>
                    <div className="cp-meta-row">
                        <span className="cp-meta-label">GST Number</span>
                        <span>:</span>
                        <span className="cp-meta-value">23AABCO1234X1Z5</span>
                    </div>
                    <div className="cp-meta-row">
                        <span className="cp-meta-label">Incorporation Date</span>
                        <span>:</span>
                        <span className="cp-meta-value">15 Jan 2019</span>
                    </div>
                    <div className="cp-meta-row">
                        <span className="cp-meta-label">Company Size</span>
                        <span>:</span>
                        <span className="cp-meta-value">51 - 200 Employees</span>
                    </div>
                </div>

                <button type="button" className="btn btn-outline-light cp-edit-btn" onClick={handleEdit}>
                    <i className="fa fa-pen" aria-hidden="true" /> Edit Company
                </button>
            </div>

            {/* Company Overview */}
            <div className="cp-card">
                <h3 className="cp-section-title">Company Overview</h3>
                <div className="cp-overview-grid">
                    {/* STATIC placeholder — no "about" text field in your API yet */}
                    <div className="ov-about">
                        <div className="ov-about-title">About Company</div>
                        <p>
                            {company.name} is dedicated to delivering innovative software
                            solutions that help businesses grow and scale. We build
                            products that simplify operations and improve user
                            experiences.
                        </p>
                    </div>
                    <div className="ov-cards">
                        {/* STATIC — Industry has no matching API field */}
                        <OverviewCard icon="fa-industry" label="Industry" value="Information Technology" />
                        <OverviewCard icon="fa-envelope" label="Email" value={company.email} />
                        <OverviewCard icon="fa-phone" label="Phone" value={company.phoneNumber} />
                        <OverviewCard
                            icon="fa-globe"
                            label="Website"
                            value={company.website?.replace(/^https?:\/\//, "")}
                        />
                        {/* STATIC — no employee-count field yet */}
                        <OverviewCard icon="fa-users" label="Employee Strength" value="120" />
                        {/* STATIC — no founding-year field yet */}
                        <OverviewCard icon="fa-calendar-alt" label="Year Established" value="2019" />
                    </div>
                </div>
            </div>

            {/* Registered Address + Contact Person */}
            <div className="cp-row-two">
                <div className="cp-card">
                    <h3 className="cp-section-title">
                        <i className="fa fa-map-marker-alt cp-section-icon" aria-hidden="true" />
                        Registered Address
                    </h3>
                    <div className="cp-address-grid">
                        <div className="cp-address-item cp-address-full">
                            <div className="cp-address-label">Street Address</div>
                            <div className="cp-address-value">{company.address || "-"}</div>
                        </div>
                        <div className="cp-address-item">
                            <div className="cp-address-label">City</div>
                            <div className="cp-address-value">{company.city || "-"}</div>
                        </div>
                        <div className="cp-address-item">
                            <div className="cp-address-label">Postal Code</div>
                            <div className="cp-address-value">{company.postalCode || "-"}</div>
                        </div>
                        <div className="cp-address-item">
                            <div className="cp-address-label">State</div>
                            <div className="cp-address-value">{company.state || "-"}</div>
                        </div>
                        <div className="cp-address-item">
                            <div className="cp-address-label">Country</div>
                            <div className="cp-address-value">{company.country || "-"}</div>
                        </div>
                    </div>
                </div>

                {/* STATIC — no contact-person object in your API yet */}
                <div className="cp-card">
                    <h3 className="cp-section-title">
                        <i className="fa fa-user cp-section-icon" aria-hidden="true" />
                        Contact Person
                    </h3>
                    <div className="cp-address-grid">
                        <div className="cp-address-item">
                            <div className="cp-address-label">Name</div>
                            <div className="cp-address-value">Rahul Sharma</div>
                        </div>
                        <div className="cp-address-item">
                            <div className="cp-address-label">Phone</div>
                            <div className="cp-address-value">+91 91234 56789</div>
                        </div>
                        <div className="cp-address-item">
                            <div className="cp-address-label">Email</div>
                            <div className="cp-address-value">rahul.sharma@example.com</div>
                        </div>
                        <div className="cp-address-item">
                            <div className="cp-address-label">Designation</div>
                            <div className="cp-address-value">HR Manager</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Documents & Assets — STATIC list, wire to real files/URLs later.
          Company Logo download link is the one real field you already
          have (company.logo); the other three are placeholders. */}
            <div className="cp-card">
                <h3 className="cp-section-title">
                    <i className="fa fa-folder cp-section-icon" aria-hidden="true" />
                    Documents & Assets
                </h3>
                <div className="cp-docs-grid">
                    <div className="cp-doc">
                        <span className="cp-doc-icon">
                            <i className="fa fa-file-pdf" aria-hidden="true" />
                        </span>
                        <div className="cp-doc-info">
                            <div className="cp-doc-name">Certificate of Incorporation</div>
                            <div className="cp-doc-size">1.2 MB</div>
                        </div>
                        <button type="button" className="cp-doc-download" aria-label="Download">
                            <i className="fa fa-download" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="cp-doc">
                        <span className="cp-doc-icon">
                            <i className="fa fa-file-pdf" aria-hidden="true" />
                        </span>
                        <div className="cp-doc-info">
                            <div className="cp-doc-name">GST Certificate</div>
                            <div className="cp-doc-size">1.1 MB</div>
                        </div>
                        <button type="button" className="cp-doc-download" aria-label="Download">
                            <i className="fa fa-download" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="cp-doc">
                        <span className="cp-doc-icon">
                            <i className="fa fa-file-pdf" aria-hidden="true" />
                        </span>
                        <div className="cp-doc-info">
                            <div className="cp-doc-name">PAN Card</div>
                            <div className="cp-doc-size">0.8 MB</div>
                        </div>
                        <button type="button" className="cp-doc-download" aria-label="Download">
                            <i className="fa fa-download" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="cp-doc">
                        <span className="cp-doc-icon">
                            <i className="fa fa-file-image" aria-hidden="true" />
                        </span>
                        <div className="cp-doc-info">
                            <div className="cp-doc-name">Company Logo</div>
                            <div className="cp-doc-size">{company.logo ? "Image file" : "0 MB"}</div>
                        </div>
                        {company.logo ? (
                            <a
                                href={company.logo}
                                download
                                className="cp-doc-download"
                                aria-label="Download logo"
                            >
                                <i className="fa fa-download" aria-hidden="true" />
                            </a>
                        ) : (
                            <button type="button" className="cp-doc-download" aria-label="Download" disabled>
                                <i className="fa fa-download" aria-hidden="true" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Activity — STATIC entry. Once you have an activity log
          endpoint, map over its entries here; company.updatedAt is used
          for the timestamp since that's the one real signal available. */}
            <div className="cp-card">
                <h3 className="cp-section-title">
                    <i className="fa fa-clock cp-section-icon" aria-hidden="true" />
                    Recent Activity
                </h3>
                <div className="cp-activity">
                    <span className="cp-activity-dot" />
                    <div>
                        <div className="cp-activity-title">Company profile updated</div>
                        <div className="cp-activity-meta">
                            by Admin &bull; {formatDate(company.updatedAt, true)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCompanyDetail;