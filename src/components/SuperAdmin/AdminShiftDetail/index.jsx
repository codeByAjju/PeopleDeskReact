import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { extractApiItem } from "../../../utils/common.util";
import validation from "./validation";
import "./AdminShiftDetail.css";
import { DepartmentDetailsSkeleton, StatusSelector, TimePicker, MinutePicker, HourPicker } from "../../UiElement";
import { SuperAdminShiftServices } from "../../../Services/SuperAdmin/Shift/index.service";

const AdminShiftDetail = ({ shiftId, mode = "view", onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: "",
        code: "",
        startTime: "",
        endTime: "",
        workingHours: "",
        breakDuration: "",
        status: "active",
    });

    useEffect(() => {
        if ((mode === "view" || mode === "edit") && shiftId) {
            let active = true;
            const loadDetails = async () => {
                setLoading(true);
                try {
                    const res = await SuperAdminShiftServices.superAdminGetShiftById(shiftId);
                    const data = extractApiItem(res);
                    if (data && active) {
                        setInitialValues({
                            name: data.name || "",
                            code: data.code || "",
                            startTime: data.startTime || "",
                            endTime: data.endTime || "",
                            workingHours: data.workingHours || "",
                            breakDuration: data.breakDuration || "",
                            status: data.status || "active",
                        });
                        // Pre-load dependent dropdowns
                        if (data.countryId) await fetchStates(data.countryId);
                        if (data.stateId) await fetchCities(data.stateId);
                    }
                } catch (error) {
                    toast.error("Failed to load location details");
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
                startTime: "",
                endTime: "",
                workingHours: "",
                breakDuration: "",
                status: "active",
            });
        }
    }, [shiftId, mode]);

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const startHour = parseInt(values.startTime.split(":")[0], 10);
            const endHour = parseInt(values.endTime.split(":")[0], 10);
            const isOvernight = endHour < startHour;
            const payloadValues = {
                ...values,
                isOvernight,
            };

            let res;
            if (mode === "create") {
                res = await SuperAdminShiftServices.superAdminCreateShift(payloadValues);
            } else {
                res = await SuperAdminShiftServices.superAdminUpdateShift(shiftId, payloadValues);
            }

            if (res?.status === 200 || res?.status === 201) {
                toast.success(
                    mode === "create"
                        ? "Shift created successfully"
                        : "Shift updated successfully"
                );
                if (onSuccess) onSuccess();
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to process shift request"
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

                        {/* Shift Name */}
                        <div className="dept-field">
                            <label htmlFor="name" className="dept-label">
                                Shift Name <span className="required-star">*</span>
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

                        {/* Shift Code */}
                        <div className="dept-field">
                            <label htmlFor="code" className="dept-label">
                                Shift Code <span className="required-star">*</span>
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

                        {/* Start Time */}
                        <div className="dept-field">
                            <label htmlFor="startTime" className="dept-label">
                                Start Time <span className="required-star">*</span>
                            </label>
                            <div className={`dept-input-wrap ${isViewOnly ? "is-view" : ""}`}>
                                <i className="bi bi-clock dept-input-icon" aria-hidden="true" />
                                {isViewOnly ? (
                                    <input
                                        type="text"
                                        value={values.startTime}
                                        className="form-control"
                                        disabled
                                    />
                                ) : (
                                    <TimePicker
                                        value={values.startTime}
                                        onChange={(time) => setFieldValue("startTime", time)}
                                        disabled={isViewOnly}
                                        placeholder="HH:MM"
                                        title="Start Time"
                                    />
                                )}
                            </div>
                            <ErrorMessage name="startTime" component="div" className="dept-error-text" />
                        </div>

                        {/* End Time */}
                        <div className="dept-field">
                            <label htmlFor="endTime" className="dept-label">
                                End Time <span className="required-star">*</span>
                            </label>
                            <div className={`dept-input-wrap ${isViewOnly ? "is-view" : ""}`}>
                                <i className="bi bi-clock dept-input-icon" aria-hidden="true" />
                                {isViewOnly ? (
                                    <input
                                        type="text"
                                        value={values.endTime}
                                        className="form-control"
                                        disabled
                                    />
                                ) : (
                                    <TimePicker
                                        value={values.endTime}
                                        onChange={(time) => setFieldValue("endTime", time)}
                                        disabled={isViewOnly}
                                        placeholder="HH:MM"
                                        title="End Time"
                                    />
                                )}
                            </div>
                            <ErrorMessage name="endTime" component="div" className="dept-error-text" />
                        </div>

                        {/* Break Duration */}
                        <div className="dept-field">
                            <label htmlFor="breakDuration" className="dept-label">
                                Break Duration (minutes) <span className="required-star">*</span>
                            </label>
                            <div className={`dept-input-wrap ${isViewOnly ? "is-view" : ""}`}>
                                <i className="bi bi-hourglass-split dept-input-icon" aria-hidden="true" />
                                {isViewOnly ? (
                                    <input
                                        type="text"
                                        value={values.breakDuration}
                                        className="form-control"
                                        disabled
                                    />
                                ) : (
                                    <MinutePicker
                                        value={values.breakDuration}
                                        onChange={(minute) => setFieldValue("breakDuration", minute)}
                                        disabled={isViewOnly}
                                        placeholder="Select minutes"
                                    />
                                )}
                            </div>
                            <ErrorMessage name="breakDuration" component="div" className="dept-error-text" />
                        </div>

                        {/* Working Hours */}
                        <div className="dept-field">
                            <label htmlFor="workingHours" className="dept-label">
                                Working Hours <span className="required-star">*</span>
                            </label>
                            <div className={`dept-input-wrap ${isViewOnly ? "is-view" : ""}`}>
                                <i className="bi bi-briefcase dept-input-icon" aria-hidden="true" />
                                {isViewOnly ? (
                                    <input
                                        type="text"
                                        value={values.workingHours}
                                        className="form-control"
                                        disabled
                                    />
                                ) : (
                                    <HourPicker
                                        value={values.workingHours}
                                        onChange={(hour) => setFieldValue("workingHours", hour)}
                                        disabled={isViewOnly}
                                        placeholder="Select hours"
                                    />
                                )}
                            </div>
                            <ErrorMessage name="workingHours" component="div" className="dept-error-text" />
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
                                    <>{mode === "create" ? "Create Shift" : "Save Changes"}</>
                                )}
                            </button>
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    );
};

export default AdminShiftDetail;