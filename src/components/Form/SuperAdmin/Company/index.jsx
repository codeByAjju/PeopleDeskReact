import { Col, Form, Row } from "react-bootstrap";
import { forwardRef } from "react";
import { Input } from "../../../UiElement";
import "./CompanyForm.css";

const CommonCompanyForm = forwardRef(
    (
        {
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            initialLoading,
            logoPreview,
            fileInputRef,
            onLogoChange,
            onRemoveLogo,
            typeModal,

        },
        ref
    ) => {
        if (initialLoading) {
            return (
                <div className="company-form-loading">
                    <div className="company-spinner-lg" />
                    <p className="mt-2 text-muted">Loading company information...</p>
                </div>
            );
        }

        return (
            <Form
                id="companyForm"
                className="company-form-container"
                onSubmit={handleSubmit}
                ref={ref}
                noValidate
            >
                {/* Section 1: Basic Information */}
                <div className="company-section-header">
                    <div className="company-section-icon">
                        <i className="fa fa-building" aria-hidden="true" />
                    </div>
                    <div>
                        <h6 className="company-section-title">Basic Information</h6>
                        <p className="company-section-desc">
                            Company identity and contact channels
                        </p>
                    </div>
                </div>

                <Row className="form-grid g-3">
                    {/* Company Name */}
                    <Col md={6}>
                        <div className="company-field">
                            <label htmlFor="name" className="company-label">
                                Company Name <span className="required-star">*</span>
                            </label>
                            <div className="company-input-wrap">
                                <i className="fa fa-building company-input-icon" aria-hidden="true" />
                                <Input
                                    id="name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    placeholder="Enter company name"
                                    isInvalid={touched.name && !!errors.name}
                                />
                            </div>
                            {touched.name && errors.name && (
                                <div className="company-error-text">
                                    <i className="fa fa-exclamation-circle" aria-hidden="true" />
                                    {errors.name}
                                </div>
                            )}
                        </div>
                    </Col>

                    {/* Company Code */}
                    <Col md={6}>
                        <div className="company-field">
                            <label htmlFor="code" className="company-label">
                                Company Code <span className="required-star">*</span>
                            </label>
                            <div className="company-input-wrap">
                                <i className="fa fa-hashtag company-input-icon" aria-hidden="true" />
                                <Input
                                    id="code"
                                    name="code"
                                    value={values.code}
                                    onChange={handleChange}
                                    placeholder="Enter company code (e.g. ACM-01)"
                                    isInvalid={touched.code && !!errors.code}
                                />
                            </div>
                            {touched.code && errors.code && (
                                <div className="company-error-text">
                                    <i className="fa fa-exclamation-circle" aria-hidden="true" />
                                    {errors.code}
                                </div>
                            )}
                        </div>
                    </Col>

                    {/* Email */}
                    <Col md={6}>
                        <div className="company-field">
                            <label htmlFor="email" className="company-label">
                                Email Address <span className="required-star">*</span>
                            </label>
                            <div className="company-input-wrap">
                                <i className="fa fa-envelope company-input-icon" aria-hidden="true" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address (e.g. info@company.com)"
                                    isInvalid={touched.email && !!errors.email}
                                    disabled={typeModal === "edit"}
                                />
                            </div>
                            {touched.email && errors.email && (
                                <div className="company-error-text">
                                    <i className="fa fa-exclamation-circle" aria-hidden="true" />
                                    {errors.email}
                                </div>
                            )}
                        </div>
                    </Col>

                    {/* Phone */}
                    <Col md={6}>
                        <div className="company-field">
                            <label htmlFor="phoneNumber" className="company-label">
                                Phone Number <span className="required-star">*</span>
                            </label>
                            <div className="company-input-wrap">
                                <i className="fa fa-phone company-input-icon" aria-hidden="true" />
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Enter 10-digit phone number"
                                    isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                                />
                            </div>
                            {touched.phoneNumber && errors.phoneNumber && (
                                <div className="company-error-text">
                                    <i className="fa fa-exclamation-circle" aria-hidden="true" />
                                    {errors.phoneNumber}
                                </div>
                            )}
                        </div>
                    </Col>

                    {/* Website */}
                    <Col md={6}>
                        <div className="company-field">
                            <label htmlFor="website" className="company-label">
                                Website <span className="optional-tag">(Optional)</span>
                            </label>
                            <div className="company-input-wrap">
                                <i className="fa fa-globe company-input-icon" aria-hidden="true" />
                                <Input
                                    id="website"
                                    name="website"
                                    value={values.website}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                    isInvalid={touched.website && !!errors.website}
                                />
                            </div>
                            {touched.website && errors.website && (
                                <div className="company-error-text">
                                    <i className="fa fa-exclamation-circle" aria-hidden="true" />
                                    {errors.website}
                                </div>
                            )}
                        </div>
                    </Col>

                    {/* Logo */}
                    <Col md={6}>
                        <div className="company-field">
                            <label htmlFor="logo-input" className="company-label">
                                Company Logo <span className="optional-tag">(Optional)</span>
                            </label>
                            <div className="company-logo-wrap">
                                <input
                                    ref={fileInputRef}
                                    id="logo-input"
                                    type="file"
                                    name="logo"
                                    accept="image/jpeg,image/png,image/webp,image/svg+xml"
                                    className="d-none"
                                    onChange={onLogoChange}
                                />
                                {logoPreview ? (
                                    <div className="company-logo-preview-box">
                                        <img
                                            src={logoPreview}
                                            alt="Company Logo Preview"
                                            className="company-logo-img"
                                        />
                                        <div className="company-logo-details">
                                            <span className="company-logo-title">
                                                {values.logo instanceof File
                                                    ? values.logo.name
                                                    : "Company Logo"}
                                            </span>
                                            <span className="company-logo-meta">
                                                {values.logo instanceof File
                                                    ? `${(values.logo.size / 1024).toFixed(1)} KB`
                                                    : "Current logo"}
                                            </span>
                                        </div>
                                        <div className="company-logo-actions-btns">
                                            <button
                                                type="button"
                                                className="company-logo-mini-btn btn-change"
                                                title="Change logo"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <i className="fa fa-pencil" aria-hidden="true" />
                                            </button>
                                            <button
                                                type="button"
                                                className="company-logo-mini-btn btn-remove"
                                                title="Remove logo"
                                                onClick={onRemoveLogo}
                                            >
                                                <i className="fa fa-trash" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={`company-logo-upload-trigger ${touched.logo && errors.logo ? "is-invalid" : ""
                                            }`}
                                        onClick={() => fileInputRef.current?.click()}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                fileInputRef.current?.click();
                                            }
                                        }}
                                    >
                                        <i className="fa fa-picture-o company-input-icon" aria-hidden="true" />
                                        <span className="company-logo-upload-text">
                                            Upload Logo (JPG, PNG, max 2MB)
                                        </span>
                                        <span className="company-logo-upload-badge">
                                            <i className="fa fa-cloud-upload me-1" aria-hidden="true" /> Browse
                                        </span>
                                    </div>
                                )}
                            </div>
                            {touched.logo && errors.logo && (
                                <div className="company-error-text">
                                    <i className="fa fa-exclamation-circle" aria-hidden="true" />
                                    {errors.logo}
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>

                {/* Section 2: Address & Location */}
                <div className="company-section-header mt-4 pt-3">
                    <div className="company-section-icon">
                        <i className="fa fa-map-marker" aria-hidden="true" />
                    </div>
                    <div>
                        <h6 className="company-section-title">Address & Location</h6>
                        <p className="company-section-desc">
                            Physical headquarter and regional address details
                        </p>
                    </div>
                </div>

                <Row className="form-grid g-3">
                    <Col md={6}>
                        <div className="company-field">
                            <label htmlFor="address" className="company-label">
                                Street Address <span className="required-star">*</span>
                            </label>
                            <div className="company-input-wrap">
                                <i className="fa fa-map-marker company-input-icon" aria-hidden="true" />
                                <Input
                                    id="address"
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    placeholder="Enter street address"
                                    isInvalid={touched.address && !!errors.address}
                                />
                            </div>
                            {touched.address && errors.address && (
                                <div className="company-error-text">
                                    <i className="fa fa-exclamation-circle" aria-hidden="true" />
                                    {errors.address}
                                </div>
                            )}
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="company-field">
                            <label htmlFor="city" className="company-label">
                                City <span className="required-star">*</span>
                            </label>
                            <div className="company-input-wrap">
                                <i className="fa fa-building-o company-input-icon" aria-hidden="true" />
                                <Input
                                    id="city"
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                    isInvalid={touched.city && !!errors.city}
                                />
                            </div>
                            {touched.city && errors.city && (
                                <div className="company-error-text">
                                    <i className="fa fa-exclamation-circle" aria-hidden="true" />
                                    {errors.city}
                                </div>
                            )}
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="company-field">
                            <label htmlFor="state" className="company-label">
                                State / Province <span className="required-star">*</span>
                            </label>
                            <div className="company-input-wrap">
                                <i className="fa fa-map company-input-icon" aria-hidden="true" />
                                <Input
                                    id="state"
                                    name="state"
                                    value={values.state}
                                    onChange={handleChange}
                                    placeholder="Enter state or province"
                                    isInvalid={touched.state && !!errors.state}
                                />
                            </div>
                            {touched.state && errors.state && (
                                <div className="company-error-text">
                                    <i className="fa fa-exclamation-circle" aria-hidden="true" />
                                    {errors.state}
                                </div>
                            )}
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="company-field">
                            <label htmlFor="country" className="company-label">
                                Country <span className="required-star">*</span>
                            </label>
                            <div className="company-input-wrap">
                                <i className="fa fa-flag company-input-icon" aria-hidden="true" />
                                <Input
                                    id="country"
                                    name="country"
                                    value={values.country}
                                    onChange={handleChange}
                                    placeholder="Enter country"
                                    isInvalid={touched.country && !!errors.country}
                                />
                            </div>
                            {touched.country && errors.country && (
                                <div className="company-error-text">
                                    <i className="fa fa-exclamation-circle" aria-hidden="true" />
                                    {errors.country}
                                </div>
                            )}
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="company-field">
                            <label htmlFor="postalCode" className="company-label">
                                Postal Code <span className="required-star">*</span>
                            </label>
                            <div className="company-input-wrap">
                                <i className="fa fa-map-pin company-input-icon" aria-hidden="true" />
                                <Input
                                    id="postalCode"
                                    name="postalCode"
                                    value={values.postalCode}
                                    onChange={handleChange}
                                    placeholder="Enter postal code"
                                    isInvalid={touched.postalCode && !!errors.postalCode}
                                />
                            </div>
                            {touched.postalCode && errors.postalCode && (
                                <div className="company-error-text">
                                    <i className="fa fa-exclamation-circle" aria-hidden="true" />
                                    {errors.postalCode}
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Form>
        );
    }
);

export default CommonCompanyForm;