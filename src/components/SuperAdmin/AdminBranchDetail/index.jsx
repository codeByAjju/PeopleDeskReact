import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SuperAdminBranchServices } from "../../../Services/SuperAdmin/Branch/index.service";
import { SuperAdminStateServices } from "../../../Services/SuperAdmin/State/index.service";
import { SuperAdminCityServices } from "../../../Services/SuperAdmin/City/index.service";
import { extractApiItem } from "../../../utils/common.util";
import validation from "./validation";
import "./AdminDepartmentDetail.css";
import { DepartmentDetailsSkeleton, SelectPicker, StatusSelector } from "../../UiElement";

const AdminBranchDetail = ({ branchId, mode = "view", onClose, onSuccess, countries = [] }) => {
    const [loading, setLoading] = useState(false);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [initialValues, setInitialValues] = useState({
        name: "",
        code: "",
        postalCode: "",
        address: "",
        phoneNumber: "",
        countryId: "",
        stateId: "",
        cityId: "",
        status: "active",
    });

    // Fetch states when countryId changes (only used in create/edit)
    const fetchStates = async (countryId) => {
        if (!countryId) { setStates([]); setCities([]); return; }
        try {
            const res = await SuperAdminStateServices.superAdminGetStatesByCountryId(countryId);
            setStates(res?.data?.result?.states || res?.data?.result || []);
        } catch {
            toast.error("Error fetching states");
        }
    };

    // Fetch cities when stateId changes (only used in create/edit)
    const fetchCities = async (stateId) => {
        if (!stateId) { setCities([]); return; }
        try {
            const res = await SuperAdminCityServices.superAdminGetCitiesByStateId(stateId);
            setCities(res?.data?.result?.cities || res?.data?.result || []);
        } catch {
            toast.error("Error fetching cities");
        }
    };

    useEffect(() => {
        if ((mode === "view" || mode === "edit") && branchId) {
            let active = true;
            const loadDetails = async () => {
                setLoading(true);
                try {
                    const res = await SuperAdminBranchServices.superAdminBranchDetails(branchId);
                    const data = extractApiItem(res);
                    if (data && active) {
                        setInitialValues({
                            name: data.name || "",
                            code: data.code || "",
                            postalCode: data.postalCode || "",
                            address: data.address || "",
                            phoneNumber: data.phoneNumber || "",
                            countryId: data.countryId || "",
                            stateId: data.stateId || "",
                            cityId: data.cityId || "",
                            status: data.status || "active",
                        });
                        // Pre-load dependent dropdowns
                        if (data.countryId) await fetchStates(data.countryId);
                        if (data.stateId) await fetchCities(data.stateId);
                    }
                } catch (error) {
                    toast.error("Failed to load branch details");
                } finally {
                    if (active) setLoading(false);
                }
            };
            loadDetails();
            return () => { active = false; };
        } else {
            setInitialValues({
                name: "",
                code: "",
                postalCode: "",
                address: "",
                phoneNumber: "",
                countryId: "",
                stateId: "",
                cityId: "",
                status: "active",
            });
            setStates([]);
            setCities([]);
        }
    }, [branchId, mode]);

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            let res;
            if (mode === "create") {
                res = await SuperAdminBranchServices.superAdminCreateBranch(values);
            } else {
                res = await SuperAdminBranchServices.superAdminUpdateBranch(branchId, values);
            }

            if (res?.status === 200 || res?.status === 201) {
                toast.success(
                    mode === "create"
                        ? "Branch created successfully"
                        : "Branch updated successfully"
                );
                if (onSuccess) onSuccess();
            } else {
                toast.error(res?.data?.message || "Failed to process branch request");
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to process branch request"
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <DepartmentDetailsSkeleton />;
    }

    const isViewOnly = mode === "view";

    const countryOptions = countries?.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const stateOptions = states?.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const cityOptions = cities?.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validation()}
            onSubmit={onSubmit}
        >
            {({
                isSubmitting,
                errors,
                touched,
                values,
                setFieldValue,
                setFieldTouched,
            }) => (
                <Form className="dept-form-container">
                    <div className="dept-fields-grid">

                        {/* Branch Name */}
                        <div className="dept-field">
                            <label htmlFor="name" className="dept-label">
                                Branch Name <span className="required-star">*</span>
                            </label>
                            <div className={`dept-input-wrap ${isViewOnly ? "is-view" : ""}`}>
                                <i className="bi bi-building dept-input-icon" aria-hidden="true" />
                                <Field
                                    name="name"
                                    id="name"
                                    placeholder="e.g. Mumbai HQ"
                                    className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                                    disabled={isViewOnly}
                                />
                            </div>
                            <ErrorMessage name="name" component="div" className="dept-error-text" />
                        </div>

                        {/* Branch Code */}
                        <div className="dept-field">
                            <label htmlFor="code" className="dept-label">
                                Branch Code <span className="required-star">*</span>
                            </label>
                            <div className={`dept-input-wrap ${isViewOnly ? "is-view" : ""}`}>
                                <i className="bi bi-hash dept-input-icon" aria-hidden="true" />
                                <Field
                                    name="code"
                                    id="code"
                                    placeholder="e.g. MUM-HQ"
                                    className={`form-control ${touched.code && errors.code ? "is-invalid" : ""}`}
                                    disabled={isViewOnly}
                                />
                            </div>
                            <ErrorMessage name="code" component="div" className="dept-error-text" />
                        </div>

                        {/* Phone */}
                        <div className="dept-field">
                            <label htmlFor="phoneNumber" className="dept-label">
                                Phone <span className="optional-tag text-muted font-normal">(Optional)</span>
                            </label>
                            <div className={`dept-input-wrap ${isViewOnly ? "is-view" : ""}`}>
                                <i className="bi bi-telephone dept-input-icon" aria-hidden="true" />
                                <Field
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="e.g. +91 98765 43210"
                                    className={`form-control ${touched.phoneNumber && errors.phoneNumber ? "is-invalid" : ""}`}
                                    disabled={isViewOnly}
                                />
                            </div>
                            <ErrorMessage name="phoneNumber" component="div" className="dept-error-text" />
                        </div>

                        {/* Postal Code */}
                        <div className="dept-field">
                            <label htmlFor="postalCode" className="dept-label">
                                Postal Code <span className="required-star"></span>
                            </label>
                            <div className={`dept-input-wrap ${isViewOnly ? "is-view" : ""}`}>
                                <i className="bi bi-hash dept-input-icon" aria-hidden="true" />
                                <Field
                                    name="postalCode"
                                    id="postalCode"
                                    placeholder="e.g. 000001"
                                    className={`form-control ${touched.postalCode && errors.postalCode ? "is-invalid" : ""}`}
                                    disabled={isViewOnly}
                                />
                            </div>
                            <ErrorMessage name="postalCode" component="div" className="dept-error-text" />
                        </div>

                        {/* Address */}
                        <div className="dept-field dept-full-width">
                            <label htmlFor="address" className="dept-label">
                                Address <span className="optional-tag text-muted font-normal">(Optional)</span>
                            </label>
                            <div className={`dept-input-wrap ${isViewOnly ? "is-view" : ""}`}>
                                <i className="bi bi-geo-alt dept-input-icon" style={{ top: "0.95rem", transform: "none" }} aria-hidden="true" />
                                <Field
                                    as="textarea"
                                    name="address"
                                    id="address"
                                    placeholder="Enter full branch address..."
                                    className={`form-control ${touched.address && errors.address ? "is-invalid" : ""}`}
                                    disabled={isViewOnly}
                                />
                            </div>
                            <ErrorMessage name="address" component="div" className="dept-error-text" />
                        </div>

                        {/* Country */}
                        <div className="dept-field">
                            <label htmlFor="countryId" className="dept-label">
                                Country <span className="required-star">*</span>
                            </label>
                            <div className={`department-select-wrap ${isViewOnly ? "is-view" : ""}`}>
                                <SelectPicker
                                    key="countryId"
                                    options={countryOptions}
                                    name="countryId"
                                    id="countryId"
                                    placeholder="Select Country..."
                                    isDisabled={isViewOnly}
                                    value={countryOptions?.find((opt) => String(opt.value) === String(values.countryId)) || null}
                                    onChange={async (selected) => {
                                        const countryId = selected?.value || "";
                                        await setFieldValue("countryId", countryId, true);
                                        await setFieldValue("stateId", "", false);
                                        await setFieldValue("cityId", "", false);
                                        setFieldTouched("stateId", false, false);
                                        setFieldTouched("cityId", false, false);
                                        setCities([]);
                                        if (countryId) {
                                            fetchStates(countryId);
                                        } else {
                                            setStates([]);
                                        }
                                    }}
                                    onBlur={() => {
                                        setFieldTouched("countryId", true, true);
                                    }}
                                    className="department-select"
                                    classNamePrefix="department"
                                    isSearchable
                                />
                            </div>
                            {touched.countryId && errors.countryId && (
                                <div className="dept-error-text">
                                    {errors.countryId}
                                </div>
                            )}
                        </div>

                        {/* State */}
                        <div className="dept-field">
                            <label htmlFor="stateId" className="dept-label">
                                State <span className="required-star">*</span>
                            </label>
                            <div className={`department-select-wrap ${isViewOnly ? "is-view" : ""}`}>
                                <SelectPicker
                                    key={`state-${values.countryId}`}
                                    options={stateOptions}
                                    name="stateId"
                                    id="stateId"
                                    placeholder="Select State..."
                                    isDisabled={isViewOnly || !values.countryId}
                                    value={stateOptions?.find((opt) => String(opt.value) === String(values.stateId)) || null}
                                    onChange={async (selected) => {
                                        const stateId = selected?.value || "";
                                        await setFieldValue("stateId", stateId, true);
                                        await setFieldValue("cityId", "", false);
                                        setFieldTouched("cityId", false, false);
                                        setCities([]);
                                        if (stateId) {
                                            fetchCities(stateId);
                                        }
                                    }}
                                    className="department-select"
                                    classNamePrefix="department"
                                    isSearchable
                                />
                            </div>
                            {touched.stateId && errors.stateId && (
                                <div className="dept-error-text">
                                    {errors.stateId}
                                </div>
                            )}
                        </div>

                        {/* City */}
                        <div className="dept-field">
                            <label htmlFor="cityId" className="dept-label">
                                City <span className="required-star">*</span>
                            </label>
                            <div className={`department-select-wrap ${isViewOnly ? "is-view" : ""}`}>
                                <SelectPicker
                                    key={`city-${values.stateId}`}
                                    options={cityOptions}
                                    name="cityId"
                                    id="cityId"
                                    placeholder="Select City..."
                                    isDisabled={isViewOnly || !values.stateId}
                                    value={cityOptions?.find((opt) => String(opt.value) === String(values.cityId)) || null}
                                    onChange={async (selected) => {
                                        const cityId = selected?.value || "";
                                        await setFieldValue("cityId", cityId, true);
                                        setFieldTouched("cityId", true, false);
                                    }}
                                    className="department-select"
                                    classNamePrefix="department"
                                    isSearchable
                                />
                            </div>
                            {touched.cityId && errors.cityId && (
                                <div className="dept-error-text">
                                    {errors.cityId}
                                </div>
                            )}
                        </div>

                        {/* Status */}
                        <div className="dept-field dept-full-width">
                            <span className="dept-label">Status <span className="required-star">*</span></span>
                            <StatusSelector
                                value={values.status}
                                onChange={(val) => setFieldValue("status", val)}
                                disabled={isViewOnly}
                            />
                            <ErrorMessage name="status" component="div" className="dept-error-text" />
                        </div>

                    </div>

                    {mode !== "view" && (
                        <div className="dept-modal-footer">
                            <button type="button" className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-save" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                        Saving...
                                    </>
                                ) : (
                                    <>{mode === "create" ? "Create Branch" : "Save Changes"}</>
                                )}
                            </button>
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    );
};

export default AdminBranchDetail;