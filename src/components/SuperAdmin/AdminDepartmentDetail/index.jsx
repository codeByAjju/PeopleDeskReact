import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SuperAdminDepartmentServices } from "../../../Services/SuperAdmin/Department/index.service";
import { extractApiItem } from "../../../utils/common.util";
import validation from "./validation";
import "./AdminDepartmentDetail.css";
import { DepartmentDetailsSkeleton, StatusSelector } from "../../UiElement";

const AdminDepartmentDetail = ({ departmentId, mode = "view", onClose, onSuccess }) => {
    console.log("departmentId", departmentId)
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: "",
        code: "",
        description: "",
        status: "active",
    });

    useEffect(() => {
        if ((mode === "view" || mode === "edit") && departmentId) {
            let active = true;
            const loadDetails = async () => {
                setLoading(true);
                try {
                    const res = await SuperAdminDepartmentServices.superAdminDepartmentDetails(departmentId);
                    const data = extractApiItem(res);
                    if (data && active) {
                        setInitialValues({
                            name: data.name || "",
                            code: data.code || "",
                            description: data.description || "",
                            status: data.status || "active",
                        });
                    }
                } catch (error) {
                    toast.error("Failed to load department details");
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
                status: "active",
            });
        }
    }, [departmentId, mode]);

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            let res;
            if (mode === "create") {
                res = await SuperAdminDepartmentServices.superAdminCreateDepartment(values);
            } else {
                res = await SuperAdminDepartmentServices.superAdminEditDepartment(departmentId, values);
            }

            if (res?.status === 200 || res?.status === 201) {
                toast.success(
                    mode === "create"
                        ? "Department created successfully"
                        : "Department updated successfully"
                );
                if (onSuccess) onSuccess();
            } else {
                toast.error(res?.data?.message || "Failed to process department request");
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to process department request"
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <DepartmentDetailsSkeleton />;
    }

    const isViewOnly = mode === "view";

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validation()}
            onSubmit={onSubmit}
        >
            {({ isSubmitting, errors, touched, values, setFieldValue }) => (
                <Form className="dept-form-container">
                    <div className="dept-fields-grid">
                        <div className="dept-field">
                            <label htmlFor="name" className="dept-label">
                                Department Name <span className="required-star">*</span>
                            </label>
                            <div className={`dept-input-wrap ${isViewOnly ? "is-view" : ""}`}>
                                <i className="bi bi-building dept-input-icon" aria-hidden="true" />
                                <Field
                                    name="name"
                                    id="name"
                                    placeholder="e.g. Human Resources"
                                    className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                                    disabled={isViewOnly}
                                />
                            </div>
                            <ErrorMessage name="name" component="div" className="dept-error-text" />
                        </div>

                        <div className="dept-field">
                            <label htmlFor="code" className="dept-label">
                                Department Code <span className="required-star">*</span>
                            </label>
                            <div className={`dept-input-wrap ${isViewOnly ? "is-view" : ""}`}>
                                <i className="bi bi-hash dept-input-icon" aria-hidden="true" />
                                <Field
                                    name="code"
                                    id="code"
                                    placeholder="e.g. HR"
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
                                    placeholder="Provide department purpose and key operations..."
                                    className={`form-control ${touched.description && errors.description ? "is-invalid" : ""}`}
                                    disabled={isViewOnly}
                                />
                            </div>
                            <ErrorMessage name="description" component="div" className="dept-error-text" />
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
                                    {mode === "create" ? "Create Department" : "Save Changes"}
                                </>
                            )}
                        </button>
                    </div>}
                </Form>
            )}
        </Formik>
    );
};

export default AdminDepartmentDetail;