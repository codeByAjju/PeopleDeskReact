import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { SuperAdminDesignationServices } from "../../../Services/SuperAdmin/Designation/index.service";
import { extractApiItem } from "../../../utils/common.util";
import validation from "./validation";
import "./AdminDepartmentDetail.css";
import { DepartmentDetailsSkeleton, SelectPicker, StatusSelector } from "../../UiElement";

const AdminDesignationDetail = ({ designationId, mode = "view", onClose, onSuccess, departments }) => {
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: "",
        code: "",
        description: "",
        departmentId: "",
        level: "",
        status: "active",
    });

    useEffect(() => {
        if ((mode === "view" || mode === "edit") && designationId) {
            let active = true;
            const loadDetails = async () => {
                setLoading(true);
                try {
                    const res = await SuperAdminDesignationServices.superAdminDesignationDetails(designationId);
                    const data = extractApiItem(res);
                    if (data && active) {
                        setInitialValues({
                            name: data.name || "",
                            code: data.code || "",
                            description: data.description || "",
                            departmentId: data.departmentId || "",
                            level: data.level !== undefined && data.level !== null ? String(data.level) : "",
                            status: data.status || "active",
                        });
                    }
                } catch (error) {
                    toast.error("Failed to load designation details");
                } finally {
                    if (active) setLoading(false);
                }
            };
            loadDetails();
            return () => {
                active = false;
            };
        } else {
            setInitialValues({
                name: "",
                code: "",
                description: "",
                departmentId: "",
                level: "",
                status: "active",
            });
        }
    }, [designationId, mode]);

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            let res;
            if (mode === "create") {
                res = await SuperAdminDesignationServices.superAdminCreateDesignation(values);
            } else {
                res = await SuperAdminDesignationServices.superAdminUpdateDesignation(designationId, values);
            }

            if (res?.status === 200 || res?.status === 201) {
                toast.success(
                    mode === "create"
                        ? "Designation created successfully"
                        : "Designation updated successfully"
                );
                if (onSuccess) onSuccess();
            } else {
                console.log(res?.data?.message || "Failed to process designation request");
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to process designation request"
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <DepartmentDetailsSkeleton />;
    }

    const isViewOnly = mode === "view";

    const options = departments?.filter((item) => item.status === "active").map((item) => ({
        value: item.id,
        label: item.name,
    }))


    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validation()}
            onSubmit={onSubmit}
        >
            {({ isSubmitting, errors, touched, values, setFieldValue, setFieldTouched }) => {
                const hasDeptError = touched.departmentId && errors.departmentId;
                return (
                    <Form className="dept-form-container">
                        <div className="dept-fields-grid">
                            <div className="dept-field">
                                <label htmlFor="name" className="dept-label">
                                    Designation Name <span className="required-star">*</span>
                                </label>
                                <div className={`dept-input-wrap ${isViewOnly ? "is-view" : ""}`}>
                                    <i className="bi bi-building dept-input-icon" aria-hidden="true" />
                                    <Field
                                        name="name"
                                        id="name"
                                        placeholder="e.g. Senior Software Engineer"
                                        className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                                        disabled={isViewOnly}
                                    />
                                </div>
                                <ErrorMessage name="name" component="div" className="dept-error-text" />
                            </div>

                            <div className="dept-field">
                                <label htmlFor="code" className="dept-label">
                                    Designation Code <span className="required-star">*</span>
                                </label>
                                <div className={`dept-input-wrap ${isViewOnly ? "is-view" : ""}`}>
                                    <i className="bi bi-hash dept-input-icon" aria-hidden="true" />
                                    <Field
                                        name="code"
                                        id="code"
                                        placeholder="e.g. SSE"
                                        className={`form-control ${touched.code && errors.code ? "is-invalid" : ""}`}
                                        disabled={isViewOnly}
                                    />
                                </div>
                                <ErrorMessage name="code" component="div" className="dept-error-text" />
                            </div>

                            <div className="dept-field dept-full-width">
                                <label htmlFor="description" className="dept-label">
                                    Description <span className="optional-tag text-muted font-normal">(Optional)</span>
                                </label>
                                <div className={`dept-input-wrap ${isViewOnly ? "is-view" : ""}`}>
                                    <i className="bi bi-info-circle dept-input-icon" style={{ top: "0.95rem", transform: "none" }} aria-hidden="true" />
                                    <Field
                                        as="textarea"
                                        name="description"
                                        id="description"
                                        placeholder="Provide designation purpose and key responsibilities..."
                                        className={`form-control ${touched.description && errors.description ? "is-invalid" : ""}`}
                                        disabled={isViewOnly}
                                    />
                                </div>
                                <ErrorMessage name="description" component="div" className="dept-error-text" />
                            </div>


                            <div className="dept-field">
                                <label htmlFor="departmentId" className="dept-label">
                                    Department <span className="required-star">*</span>
                                </label>

                                <div className={`department-select-wrap ${isViewOnly ? "is-view" : ""}`}>
                                    <SelectPicker
                                        key="departmentId"
                                        options={options}
                                        name="departmentId"
                                        id="departmentId"
                                        placeholder="Select Department..."
                                        isDisabled={isViewOnly}
                                        value={
                                            options?.find(
                                                (opt) =>
                                                    String(opt.value) === String(values.departmentId)
                                            ) || null
                                        }
                                        onChange={(selectedOption) =>
                                            setFieldValue(
                                                "departmentId",
                                                selectedOption ? selectedOption.value : ""
                                            )
                                        }
                                        className={`department-select ${touched.departmentId && errors.departmentId
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        classNamePrefix="department"
                                        isSearchable={false}
                                    />
                                </div>

                                <ErrorMessage
                                    name="departmentId"
                                    component="div"
                                    className="dept-error-text"
                                />
                            </div>

                            <div className="dept-field">
                                <label htmlFor="level" className="dept-label">
                                    Level <span className="required-star">*</span>
                                </label>
                                <div className={`dept-input-wrap ${isViewOnly ? "is-view" : ""}`}>
                                    <i className="bi bi-hash dept-input-icon" aria-hidden="true" />
                                    <Field
                                        name="level"
                                        id="level"
                                        placeholder="e.g. 1"
                                        className={`form-control ${touched.level && errors.level ? "is-invalid" : ""}`}
                                        disabled={isViewOnly}
                                    />
                                </div>
                                <ErrorMessage name="level" component="div" className="dept-error-text" />
                            </div>

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

                        {mode !== "view" && <div className="dept-modal-footer">
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
                                    <>
                                        {mode === "create" ? "Create Designation" : "Save Changes"}
                                    </>
                                )}
                            </button>
                        </div>}
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AdminDesignationDetail;