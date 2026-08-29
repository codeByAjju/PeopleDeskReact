import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { SuperAdminEmployeeServices } from "../../../../Services/SuperAdmin/Employee/index.service";
import { SuperAdminDepartmentServices } from "../../../../Services/SuperAdmin/Department/index.service";
import { SuperAdminDesignationServices } from "../../../../Services/SuperAdmin/Designation/index.service";
import { SuperAdminBranchServices } from "../../../../Services/SuperAdmin/Branch/index.service";
import { SuperAdminLocationServices } from "../../../../Services/SuperAdmin/Location/index.service";
import { SuperAdminShiftServices } from "../../../../Services/SuperAdmin/Shift/index.service";
import { SuperAdminCountryServices } from "../../../../Services/SuperAdmin/Country/index.service";
import { SuperAdminStateServices } from "../../../../Services/SuperAdmin/State/index.service";
import { SuperAdminCityServices } from "../../../../Services/SuperAdmin/City/index.service";
import CommonEmployeeForm from "../../../../components/Form/SuperAdmin/Employee/index.jsx";
import { extractApiList, uploadImage } from "../../../../utils/common.util";
import { addEmployeeValidation, editEmployeeValidation } from "../../../../components/Form/SuperAdmin/Employee/validation";
import SuperAdminAccessRoute from "../../../../routeControl/superAdminRoutMap";

const LIST_QUERY = { limit: 1000, page: 1 };

const INITIAL_VALUES = {
    employeeCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    phoneNumberCountryCode: "+91",
    dateOfBirth: "",
    gender: "",
    dateOfJoining: "",
    dateOfLeaving: "",
    employmentType: "full_time",
    employmentStatus: "active",
    profileImage: null,
    address: "",
    countryId: "",
    stateId: "",
    cityId: "",
    postalCode: "",
    departmentId: "",
    designationId: "",
    branchId: "",
    locationId: "",
    shiftId: "",
    managerId: "",
    canEmployeeLogin: true,
};

const ID_FIELDS = [
    "countryId",
    "stateId",
    "cityId",
    "departmentId",
    "designationId",
    "branchId",
    "locationId",
    "shiftId",
    "managerId",
];

const toDateInput = (val) => (val ? String(val).slice(0, 10) : "");
const toSelectValue = (val) => (val === null || val === undefined || val === "" ? "" : String(val));
const emptyId = (val) => (val === "" || val === null || val === undefined ? null : Number(val));

const mapEmployeeToForm = (data) => ({
    employeeCode: data.employeeCode || "",
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    email: data.email || "",
    phoneNumber: data.phoneNumber || "",
    phoneNumberCountryCode: data.phoneNumberCountryCode || "+91",
    dateOfBirth: toDateInput(data.dateOfBirth),
    gender: data.gender || "",
    dateOfJoining: toDateInput(data.dateOfJoining),
    dateOfLeaving: toDateInput(data.dateOfLeaving),
    employmentType: data.employmentType || "full_time",
    employmentStatus: data.employmentStatus || "active",
    profileImage: data.profileImage || null,
    address: data.address || "",
    countryId: toSelectValue(data.countryId),
    stateId: toSelectValue(data.stateId),
    cityId: toSelectValue(data.cityId),
    postalCode: data.postalCode || "",
    departmentId: toSelectValue(data.departmentId),
    designationId: toSelectValue(data.designationId),
    branchId: toSelectValue(data.branchId),
    locationId: toSelectValue(data.locationId),
    shiftId: toSelectValue(data.shiftId),
    managerId: toSelectValue(data.managerId),
    canEmployeeLogin: data.canEmployeeLogin ?? true,
});

function SuperAdminEmployeeAdd() {
    const { id } = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    const fileInputRef = useRef(null);
    const typeModal = id ? "edit" : "add";

    const [initialLoading, setInitialLoading] = useState(typeModal === "edit");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [branches, setBranches] = useState([]);
    const [locations, setLocations] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [managers, setManagers] = useState([]);
    const [loadingDesignations, setLoadingDesignations] = useState(false);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);
    const [loadingLocations, setLoadingLocations] = useState(false);

    const loadDesignations = useCallback(async (departmentId) => {
        if (!departmentId) {
            setDesignations([]);
            return;
        }
        setLoadingDesignations(true);
        try {
            const res = await SuperAdminDesignationServices.superAdminGetDesignationsByDepartmentId(departmentId);
            setDesignations(extractApiList(res, ["designations", "designation"]));
        } catch (error) {
            toast.error("Failed to load designations");
            setDesignations([]);
        } finally {
            setLoadingDesignations(false);
        }
    }, []);

    const loadStates = useCallback(async (countryId) => {
        if (!countryId) {
            setStates([]);
            return;
        }
        setLoadingStates(true);
        try {
            const res = await SuperAdminStateServices.superAdminGetStatesByCountryId(countryId);
            setStates(extractApiList(res, ["states", "state"]));
        } catch (error) {
            toast.error("Failed to load states");
            setStates([]);
        } finally {
            setLoadingStates(false);
        }
    }, []);

    const loadCities = useCallback(async (stateId) => {
        if (!stateId) {
            setCities([]);
            return;
        }
        setLoadingCities(true);
        try {
            const res = await SuperAdminCityServices.superAdminGetCitiesByStateId(stateId);
            setCities(extractApiList(res, ["cities", "city"]));
        } catch (error) {
            toast.error("Failed to load cities");
            setCities([]);
        } finally {
            setLoadingCities(false);
        }
    }, []);

    const loadLocations = useCallback(async (branchId) => {
        setLoadingLocations(true);
        try {
            const res = await SuperAdminLocationServices.superAdminGetAllLocation({
                ...LIST_QUERY,
                ...(branchId ? { branchId } : {}),
            });
            setLocations(extractApiList(res, ["locations", "location"]));
        } catch (error) {
            toast.error("Failed to load locations");
            setLocations([]);
        } finally {
            setLoadingLocations(false);
        }
    }, []);

    useEffect(() => {
        const loadMasters = async () => {
            try {
                const [
                    departmentRes,
                    branchRes,
                    shiftRes,
                    countryRes,
                    employeeRes,
                    locationRes,
                ] = await Promise.all([
                    SuperAdminDepartmentServices.superAdminGetAllDepartment(LIST_QUERY),
                    SuperAdminBranchServices.superAdminGetAllBranch(LIST_QUERY),
                    SuperAdminShiftServices.superAdminGetAllShift(LIST_QUERY),
                    SuperAdminCountryServices.superAdminGetAllCountry(LIST_QUERY),
                    SuperAdminEmployeeServices.superAdminGetAllEmployee(LIST_QUERY),
                    SuperAdminLocationServices.superAdminGetAllLocation(LIST_QUERY),
                ]);
                setDepartments(extractApiList(departmentRes, ["departments", "department"]));
                setBranches(extractApiList(branchRes, ["branches", "branch"]));
                setShifts(extractApiList(shiftRes, ["shifts", "shift"]));
                console.log("countries :", countryRes);
                setCountries(extractApiList(countryRes, ["countries", "country"]));
                setLocations(extractApiList(locationRes, ["locations", "location"]));
                const employeeList = extractApiList(employeeRes, ["employees", "employee"]);
                setManagers(
                    employeeList.filter((emp) => String(emp.id) !== String(id))
                );
            } catch (error) {
                toast.error("Failed to load dropdown data");
            }
        };
        loadMasters();
    }, [id]);

    const buildPayload = (values) => {
        const payload = { ...values };
        ID_FIELDS.forEach((key) => {
            payload[key] = emptyId(values[key]);
        });
        payload.dateOfLeaving = values.dateOfLeaving || null;
        return payload;
    };

    const handleSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            const payload = buildPayload(values);
            if (typeModal === "add") {
                const res = await SuperAdminEmployeeServices.superAdminEmployeeCreate(payload);
                if (res?.status === 200 || res?.status === 201) {
                    toast.success(res?.data?.message || res?.message || "Employee created successfully");
                    navigate(SuperAdminAccessRoute.ADMIN_EMPLOYEE.path);
                }
            } else {
                const res = await SuperAdminEmployeeServices.superAdminEmployeeUpdate(id, payload);
                if (res?.status === 200 || res?.status === 201) {
                    toast.success(res?.data?.message || res?.message || "Employee updated successfully");
                    navigate(SuperAdminAccessRoute.ADMIN_EMPLOYEE.path);
                }
            }
        } catch (err) {
            console.log("errqqqqqqq", err)
            // toast.error(
            //     err?.response?.data?.message ||
            //     `Failed to ${typeModal === "add" ? "create" : "update"} employee`
            // );
        } finally {
            setIsSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues: INITIAL_VALUES,
        validationSchema:
            typeModal === "add" ? addEmployeeValidation : editEmployeeValidation,
        onSubmit: handleSubmit,
        enableReinitialize: false,
        validateOnChange: false,
        validateOnBlur: true,
    });

    const { values, errors, touched, setFieldValue, setValues } = formik;

    // Stable refs for formik methods that change identity every render
    const formikRef = useRef(formik);
    formikRef.current = formik;

    const handleFormChange = useCallback((e) => {
        const { name, value } = e.target;
        const fk = formikRef.current;
        fk.handleChange(e);

        // Clear error on the field being edited so validation messages
        // disappear as soon as the user starts correcting them.
        if (fk.errors[name]) {
            fk.setFieldError(name, undefined);
        }

        if (name === "departmentId") {
            fk.setFieldValue("designationId", "");
            loadDesignations(value);
        }
        if (name === "countryId") {
            fk.setFieldValue("stateId", "");
            fk.setFieldValue("cityId", "");
            setCities([]);
            loadStates(value);
        }
        if (name === "stateId") {
            fk.setFieldValue("cityId", "");
            loadCities(value);
        }
        if (name === "branchId") {
            fk.setFieldValue("locationId", "");
            loadLocations(value);
        }
    }, [loadDesignations, loadStates, loadCities, loadLocations]);

    useEffect(() => {
        if (typeModal !== "edit" || !id) return;
        setInitialLoading(true);
        SuperAdminEmployeeServices.superAdminGetEmployeeById(id)
            .then(async (res) => {
                const data = res?.data?.result ?? res?.data?.data;
                if (data) {
                    setLogoPreview(data.profileImage);
                    setValues(mapEmployeeToForm(data));
                    if (data.countryId) {
                        await loadStates(data.countryId);
                    }
                    if (data.stateId) {
                        await loadCities(data.stateId);
                    }
                    if (data.branchId) {
                        await loadLocations(data.branchId);
                    }
                    if (data.departmentId) {
                        await loadDesignations(data.departmentId);
                    }
                }
            })
            .catch((err) => {
                setFetchError(
                    err?.response?.data?.message || "Failed to load employee details"
                );
                toast.error(
                    err?.response?.data?.message || "Failed to load employee details"
                );
            })
            .finally(() => setInitialLoading(false));
    }, [typeModal, id, setValues, loadStates, loadCities, loadLocations, loadDesignations]);

    const handleLogoChange = useCallback(async (e) => {
        try {
            const file = e.target.files?.[0];
            if (file) {
                const isValidFormat = [
                    "image/jpeg",
                    "image/png",
                    "image/webp",
                    "image/svg+xml",
                ].includes(file.type);
                if (!isValidFormat) {
                    toast.error("Only JPG, PNG, WEBP, or SVG images are allowed.");
                    return;
                }
                if (file.size > 2 * 1024 * 1024) {
                    toast.error("Image size must be less than 2MB.");
                    return;
                }
                const uploaded = await uploadImage(file, "image", "employee");
                if (uploaded?.status) {
                    setLogoPreview(uploaded?.result?.baseUrl);
                    formikRef.current.setFieldValue("profileImage", uploaded?.result?.baseUrl);
                    toast.success(uploaded?.msg || "Image uploaded successfully");
                } else {
                    toast.error(uploaded?.msg || "Failed to upload image");
                }
            }
        } catch (error) {
            toast.error(error?.message || "Failed to upload image");
        }
    }, []);

    const handleRemoveLogo = useCallback((e) => {
        e.stopPropagation();
        formikRef.current.setFieldValue("profileImage", null);
        setLogoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, []);

    const handleCancel = useCallback(() => navigate(SuperAdminAccessRoute.ADMIN_EMPLOYEE.path), [navigate]);

    const dropdowns = useMemo(
        () => ({
            departments,
            designations,
            branches,
            locations,
            shifts,
            countries,
            states,
            cities,
            managers,
            loadingDesignations,
            loadingStates,
            loadingCities,
            loadingLocations,
        }),
        [
            departments,
            designations,
            branches,
            locations,
            shifts,
            countries,
            states,
            cities,
            managers,
            loadingDesignations,
            loadingStates,
            loadingCities,
            loadingLocations,
        ]
    );

    if (fetchError) {
        return <div className="text-danger p-3">{fetchError}</div>;
    }

    return (
        <div className="card p-3">
            <div className="card-inner">
                <div className="card-title-group mb-3">
                    <h5 className="title">
                        {typeModal === "add" ? "Create Employee" : "Update Employee"}
                    </h5>
                </div>

                <CommonEmployeeForm
                    ref={formRef}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleFormChange}
                    setFieldValue={formikRef.current.setFieldValue}
                    handleSubmit={formikRef.current.handleSubmit}
                    initialLoading={initialLoading}
                    logoPreview={logoPreview}
                    fileInputRef={fileInputRef}
                    onLogoChange={handleLogoChange}
                    onRemoveLogo={handleRemoveLogo}
                    typeModal={typeModal}
                    dropdowns={dropdowns}
                />

                <div className="form-actions mt-4 d-flex gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={isSubmitting || initialLoading}
                        onClick={() => formRef.current?.requestSubmit()}
                    >
                        {isSubmitting
                            ? "Saving..."
                            : typeModal === "add"
                                ? "Create Employee"
                                : "Update Employee"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SuperAdminEmployeeAdd;
