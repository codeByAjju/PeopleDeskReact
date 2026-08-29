import { Col, Form, Row } from "react-bootstrap";
import { forwardRef, memo, useCallback } from "react";
import { Input } from "../../../UiElement";
import { getMasterLabel } from "../../../../utils/common.util";
import "./EmployeeForm.css";

const GENDER_OPTIONS = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
];

const EMPLOYMENT_TYPE_OPTIONS = [
    { label: "Full Time", value: "full_time" },
    { label: "Part Time", value: "part_time" },
    { label: "Contract", value: "contract" },
    { label: "Intern", value: "intern" },
];

const EMPLOYMENT_STATUS_OPTIONS = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Terminated", value: "terminated" },
];

const FormField = memo(({ id, label, required, optional, icon, error, children }) => (
    <div className="company-field">
        <label htmlFor={id} className="company-label">
            {label}{" "}
            {required && <span className="required-star">*</span>}
            {optional && <span className="optional-tag">(Optional)</span>}
        </label>
        <div className="company-input-wrap">
            {icon && <i className={`fa ${icon} company-input-icon`} aria-hidden="true" />}
            {children}
        </div>
        {error && (
            <div className="company-error-text">
                <i className="fa fa-exclamation-circle" aria-hidden="true" />
                {error}
            </div>
        )}
    </div>
));

const MasterSelect = memo(({
    id,
    name,
    value,
    onChange,
    options = [],
    placeholder,
    disabled,
    isInvalid,
}) => (
    <Form.Select
        id={id}
        name={name}
        value={value === null || value === undefined ? "" : String(value)}
        onChange={onChange}
        disabled={disabled}
        isInvalid={isInvalid}
    >
        <option value="">{placeholder}</option>
        {options.map((item) => (
            <option key={item.id} value={String(item.id)}>
                {getMasterLabel(item) || `Record ${item.id}`}
            </option>
        ))}
    </Form.Select>
));

const CommonEmployeeForm = forwardRef(
    (
        {
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
            initialLoading,
            logoPreview,
            fileInputRef,
            onLogoChange,
            onRemoveLogo,
            typeModal,
            dropdowns = {},
        },
        ref
    ) => {
        if (initialLoading) {
            return (
                <div className="company-form-loading">
                    <div className="company-spinner-lg" />
                    <p className="mt-2 text-muted">Loading employee information...</p>
                </div>
            );
        }

        const {
            departments = [],
            designations = [],
            branches = [],
            locations = [],
            shifts = [],
            managers = [],
            countries = [],
            states = [],
            cities = [],
            loadingDesignations = false,
            loadingLocations = false,
            loadingStates = false,
            loadingCities = false,
        } = dropdowns;

        // TODO: Optionally filter locations by branchId when the API supports it
        // const visibleLocations = values.branchId
        //     ? locations.filter((item) => String(item.branchId) === String(values.branchId)).length
        //         ? locations.filter((item) => String(item.branchId) === String(values.branchId))
        //         : locations
        //     : locations;
        const visibleLocations = locations;

        const fieldError = (name) => touched[name] && errors[name] ? errors[name] : undefined;

        return (
            <Form
                id="employeeForm"
                className="company-form-container"
                onSubmit={handleSubmit}
                ref={ref}
                noValidate
            >
                <div className="company-section-header">
                    <div className="company-section-icon">
                        <i className="fa fa-user" aria-hidden="true" />
                    </div>
                    <div>
                        <h6 className="company-section-title">Basic Information</h6>
                        <p className="company-section-desc">
                            Employee identity and contact channels
                        </p>
                    </div>
                </div>

                <Row className="form-grid g-3">
                    <Col md={6}>
                        <FormField id="employeeCode" label="Employee Code" required icon="fa-hashtag" error={fieldError("employeeCode")}>
                            <Input
                                id="employeeCode"
                                name="employeeCode"
                                value={values.employeeCode}
                                onChange={handleChange}
                                placeholder="Enter employee code (e.g. EMP-001)"
                                isInvalid={touched.employeeCode && !!errors.employeeCode}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="email" label="Email Address" required icon="fa-envelope" error={fieldError("email")}>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                isInvalid={touched.email && !!errors.email}
                                disabled={typeModal === "edit"}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="firstName" label="First Name" required icon="fa-user" error={fieldError("firstName")}>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                isInvalid={touched.firstName && !!errors.firstName}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="lastName" label="Last Name" required icon="fa-user" error={fieldError("lastName")}>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                placeholder="Enter last name"
                                isInvalid={touched.lastName && !!errors.lastName}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="phoneNumberCountryCode" label="Country Code" required icon="fa-flag" error={fieldError("phoneNumberCountryCode")}>
                            <Form.Select
                                id="phoneNumberCountryCode"
                                name="phoneNumberCountryCode"
                                value={values.phoneNumberCountryCode}
                                onChange={handleChange}
                                isInvalid={touched.phoneNumberCountryCode && !!errors.phoneNumberCountryCode}
                            >
                                <option value="">Select country code</option>
                                {countries.map((c) => (
                                    <option key={c.id} value={c.phoneCode}>
                                        {c.name} ({c.phoneCode})
                                    </option>
                                ))}
                            </Form.Select>
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="phoneNumber" label="Phone Number" required icon="fa-phone" error={fieldError("phoneNumber")}>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                value={values.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter 10-digit phone number"
                                isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="gender" label="Gender" required icon="fa-venus-mars" error={fieldError("gender")}>
                            <Form.Select
                                id="gender"
                                name="gender"
                                value={values.gender}
                                onChange={handleChange}
                                isInvalid={touched.gender && !!errors.gender}
                            >
                                <option value="">Select gender</option>
                                {GENDER_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </Form.Select>
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="dateOfBirth" label="Date of Birth" required icon="fa-calendar" error={fieldError("dateOfBirth")}>
                            <Input
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="date"
                                value={values.dateOfBirth}
                                onChange={handleChange}
                                isInvalid={touched.dateOfBirth && !!errors.dateOfBirth}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <div className="company-field">
                            <label htmlFor="logo-input" className="company-label">
                                Profile Image <span className="optional-tag">(Optional)</span>
                            </label>
                            <div className="company-logo-wrap">
                                <input
                                    ref={fileInputRef}
                                    id="logo-input"
                                    type="file"
                                    name="profileImage"
                                    accept="image/jpeg,image/png,image/webp,image/svg+xml"
                                    className="d-none"
                                    onChange={onLogoChange}
                                />
                                {logoPreview ? (
                                    <div className="company-logo-preview-box">
                                        <img
                                            src={logoPreview}
                                            alt="Employee profile preview"
                                            className="company-logo-img"
                                        />
                                        <div className="company-logo-details">
                                            <span className="company-logo-title">Profile Image</span>
                                            <span className="company-logo-meta">Current photo</span>
                                        </div>
                                        <div className="company-logo-actions-btns">
                                            <button
                                                type="button"
                                                className="company-logo-mini-btn btn-change"
                                                title="Change image"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <i className="fa fa-pencil" aria-hidden="true" />
                                            </button>
                                            <button
                                                type="button"
                                                className="company-logo-mini-btn btn-remove"
                                                title="Remove image"
                                                onClick={onRemoveLogo}
                                            >
                                                <i className="fa fa-trash" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={`company-logo-upload-trigger ${touched.profileImage && errors.profileImage ? "is-invalid" : ""}`}
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
                                            Upload Photo (JPG, PNG, max 2MB)
                                        </span>
                                        <span className="company-logo-upload-badge">
                                            <i className="fa fa-cloud-upload me-1" aria-hidden="true" /> Browse
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>

                <div className="company-section-header mt-4 pt-3">
                    <div className="company-section-icon">
                        <i className="fa fa-briefcase" aria-hidden="true" />
                    </div>
                    <div>
                        <h6 className="company-section-title">Employment Details</h6>
                        <p className="company-section-desc">
                            Role, assignment and joining information
                        </p>
                    </div>
                </div>

                <Row className="form-grid g-3">
                    <Col md={6}>
                        <FormField id="employmentType" label="Employment Type" required icon="fa-id-badge" error={fieldError("employmentType")}>
                            <Form.Select
                                id="employmentType"
                                name="employmentType"
                                value={values.employmentType}
                                onChange={handleChange}
                                isInvalid={touched.employmentType && !!errors.employmentType}
                            >
                                <option value="">Select type</option>
                                {EMPLOYMENT_TYPE_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </Form.Select>
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="employmentStatus" label="Employment Status" required icon="fa-check-circle" error={fieldError("employmentStatus")}>
                            <Form.Select
                                id="employmentStatus"
                                name="employmentStatus"
                                value={values.employmentStatus}
                                onChange={handleChange}
                                isInvalid={touched.employmentStatus && !!errors.employmentStatus}
                            >
                                <option value="">Select status</option>
                                {EMPLOYMENT_STATUS_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </Form.Select>
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="dateOfJoining" label="Date of Joining" required icon="fa-calendar-plus-o" error={fieldError("dateOfJoining")}>
                            <Input
                                id="dateOfJoining"
                                name="dateOfJoining"
                                type="date"
                                value={values.dateOfJoining}
                                onChange={handleChange}
                                isInvalid={touched.dateOfJoining && !!errors.dateOfJoining}
                            />
                        </FormField>
                    </Col>
                    {/* <Col md={6}>
                        <FormField id="dateOfLeaving" label="Date of Leaving" optional icon="fa-calendar-times-o" error={fieldError("dateOfLeaving")}>
                            <Input
                                id="dateOfLeaving"
                                name="dateOfLeaving"
                                type="date"
                                value={values.dateOfLeaving || ""}
                                onChange={handleChange}
                                isInvalid={touched.dateOfLeaving && !!errors.dateOfLeaving}
                            />
                        </FormField>
                    </Col> */}
                    <Col md={6}>
                        <FormField id="departmentId" label="Department" required icon="fa-sitemap" error={fieldError("departmentId")}>
                            <MasterSelect
                                id="departmentId"
                                name="departmentId"
                                value={values.departmentId}
                                onChange={handleChange}
                                options={departments}
                                placeholder="Select department"
                                isInvalid={touched.departmentId && !!errors.departmentId}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="designationId" label="Designation" required icon="fa-id-card" error={fieldError("designationId")}>
                            <MasterSelect
                                id="designationId"
                                name="designationId"
                                value={values.designationId}
                                onChange={handleChange}
                                options={designations}
                                placeholder={
                                    !values.departmentId
                                        ? "Select department first"
                                        : loadingDesignations
                                            ? "Loading designations..."
                                            : "Select designation"
                                }
                                disabled={!values.departmentId || loadingDesignations}
                                isInvalid={touched.designationId && !!errors.designationId}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="branchId" label="Branch" required icon="fa-code-fork" error={fieldError("branchId")}>
                            <MasterSelect
                                id="branchId"
                                name="branchId"
                                value={values.branchId}
                                onChange={handleChange}
                                options={branches}
                                placeholder="Select branch"
                                isInvalid={touched.branchId && !!errors.branchId}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="locationId" label="Location" required icon="fa-map-marker" error={fieldError("locationId")}>
                            <MasterSelect
                                id="locationId"
                                name="locationId"
                                value={values.locationId}
                                onChange={handleChange}
                                options={visibleLocations}
                                placeholder={loadingLocations ? "Loading locations..." : "Select location"}
                                disabled={loadingLocations}
                                isInvalid={touched.locationId && !!errors.locationId}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="shiftId" label="Shift" required icon="fa-clock-o" error={fieldError("shiftId")}>
                            <MasterSelect
                                id="shiftId"
                                name="shiftId"
                                value={values.shiftId}
                                onChange={handleChange}
                                options={shifts}
                                placeholder="Select shift"
                                isInvalid={touched.shiftId && !!errors.shiftId}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="managerId" label="Manager" optional icon="fa-user-plus" error={fieldError("managerId")}>
                            <MasterSelect
                                id="managerId"
                                name="managerId"
                                value={values.managerId}
                                onChange={handleChange}
                                options={managers}
                                placeholder="Select manager"
                                isInvalid={touched.managerId && !!errors.managerId}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <div className="company-field">
                            <label className="company-label">Employee Login</label>
                            <div className="employee-checkbox-wrap">
                                <input
                                    id="canEmployeeLogin"
                                    name="canEmployeeLogin"
                                    type="checkbox"
                                    checked={!!values.canEmployeeLogin}
                                    onChange={(e) => setFieldValue("canEmployeeLogin", e.target.checked)}
                                />
                                <span>Allow employee to log in</span>
                            </div>
                        </div>
                    </Col>
                </Row>

                <div className="company-section-header mt-4 pt-3">
                    <div className="company-section-icon">
                        <i className="fa fa-map-marker" aria-hidden="true" />
                    </div>
                    <div>
                        <h6 className="company-section-title">Address & Location</h6>
                        <p className="company-section-desc">
                            Residential address and regional details
                        </p>
                    </div>
                </div>

                <Row className="form-grid g-3">
                    <Col md={6}>
                        <FormField id="address" label="Street Address" required icon="fa-map-marker" error={fieldError("address")}>
                            <Input
                                id="address"
                                name="address"
                                value={values.address}
                                onChange={handleChange}
                                placeholder="Enter street address"
                                isInvalid={touched.address && !!errors.address}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="postalCode" label="Postal Code" required icon="fa-map-pin" error={fieldError("postalCode")}>
                            <Input
                                id="postalCode"
                                name="postalCode"
                                value={values.postalCode}
                                onChange={handleChange}
                                placeholder="Enter postal code"
                                isInvalid={touched.postalCode && !!errors.postalCode}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="countryId" label="Country" required icon="fa-flag" error={fieldError("countryId")}>
                            <MasterSelect
                                id="countryId"
                                name="countryId"
                                value={values.countryId}
                                onChange={handleChange}
                                options={countries}
                                placeholder="Select country"
                                isInvalid={touched.countryId && !!errors.countryId}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="stateId" label="State" required icon="fa-map" error={fieldError("stateId")}>
                            <MasterSelect
                                id="stateId"
                                name="stateId"
                                value={values.stateId}
                                onChange={handleChange}
                                options={states}
                                placeholder={
                                    !values.countryId
                                        ? "Select country first"
                                        : loadingStates
                                            ? "Loading states..."
                                            : "Select state"
                                }
                                disabled={!values.countryId || loadingStates}
                                isInvalid={touched.stateId && !!errors.stateId}
                            />
                        </FormField>
                    </Col>
                    <Col md={6}>
                        <FormField id="cityId" label="City" required icon="fa-building-o" error={fieldError("cityId")}>
                            <MasterSelect
                                id="cityId"
                                name="cityId"
                                value={values.cityId}
                                onChange={handleChange}
                                options={cities}
                                placeholder={
                                    !values.stateId
                                        ? "Select state first"
                                        : loadingCities
                                            ? "Loading cities..."
                                            : "Select city"
                                }
                                disabled={!values.stateId || loadingCities}
                                isInvalid={touched.cityId && !!errors.cityId}
                            />
                        </FormField>
                    </Col>
                </Row>
            </Form>
        );
    }
);

export default memo(CommonEmployeeForm);
