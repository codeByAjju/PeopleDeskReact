import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { SuperAdminCompanyServices } from "../../../../Services/SuperAdmin/Company/index.service";
import CommonCompanyForm from "../../../../components/Form/SuperAdmin/Company/index.jsx";
import { uploadImage } from "../../../../utils/common.util";
import { addCompanyValidation, editCompanyValidation } from "../../../../components/Form/SuperAdmin/Company/validation";

function SuperAdminCompanyAdd() {
    const { id } = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    const fileInputRef = useRef(null);

    const typeModal = id ? "edit" : "add";

    const [initialLoading, setInitialLoading] = useState(typeModal === "edit");
    const [initialData, setInitialData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const initialAddData = {
        name: "",
        code: "",
        email: "",
        phoneNumber: "",
        website: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        logo: null,
    };
    const initialEditData = {
        name: initialData?.name || "",
        code: initialData?.code || "",
        email: initialData?.email || "",
        phoneNumber: initialData?.phoneNumber || "",
        website: initialData?.website || "",
        address: initialData?.address || "",
        city: initialData?.city || "",
        state: initialData?.state || "",
        country: initialData?.country || "",
        postalCode: initialData?.postalCode || "",
        logo: initialData?.logo || null,
    };
    const handleSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            if (typeModal === "add") {
                const res = await SuperAdminCompanyServices.superAdminCompanyCreate(values);
                if (res?.status === 200) {
                    toast.success(res?.message || "Company created successfully");
                    navigate("/superadmin/company");
                }
            } else {
                const res = await SuperAdminCompanyServices.superAdminCompanyUpdate(id, values);
                if (res?.status === 200) {
                    toast.success(res?.message || "Company updated successfully");
                    navigate("/superadmin/company");
                }
            }
        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                `Failed to ${typeModal === "add" ? "create" : "update"} company`
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues: typeModal === "add" ? initialAddData : initialEditData,
        validationSchema:
            typeModal === "add" ? addCompanyValidation : editCompanyValidation,
        onSubmit: handleSubmit,
        enableReinitialize: true,
    });

    const { values, errors, touched, handleChange, setFieldValue, setValues } = formik;

    useEffect(() => {
        if (typeModal === "edit" && id) {
            setInitialLoading(true);
            SuperAdminCompanyServices.superAdminGetCompanyById(id)
                .then((res) => {
                    const data = res?.data?.result ?? res?.data?.result;
                    if (data) {
                        setInitialData(data);
                        setLogoPreview(data.logo);
                        setValues({
                            name: data.name || "",
                            code: data.code || "",
                            email: data.email || "",
                            phoneNumber: data.phoneNumber || "",
                            website: data.website || "",
                            address: data.address || "",
                            city: data.city || "",
                            state: data.state || "",
                            country: data.country || "",
                            postalCode: data.postalCode || "",
                            logo: data.logo || null,
                        });
                    }
                })
                .catch((err) => {
                    setFetchError(
                        err?.response?.data?.message || "Failed to load company details"
                    );
                    toast.error(
                        err?.response?.data?.message || "Failed to load company details"
                    );
                })
                .finally(() => setInitialLoading(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeModal, id]);


    const handleLogoChange = async (e) => {
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
                const uploaded = await uploadImage(file, "image", "company");
                if (uploaded?.status) {
                    setLogoPreview(uploaded?.result?.baseUrl);
                    setFieldValue("logo", uploaded?.result?.baseUrl);
                    toast.success(uploaded?.msg || "Image uploaded successfully");
                } else {
                    toast.error(uploaded?.msg || "Failed to upload image");
                }
            }
        } catch (error) {
            console.log("error :", error);
            toast.error(error?.message || "Failed to upload image");
        }
    };

    const handleRemoveLogo = (e) => {
        e.stopPropagation();
        setFieldValue("logo", null);
        setLogoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleCancel = () => navigate("/superAdmin/company");

    if (fetchError) {
        return <div className="text-danger p-3">{fetchError}</div>;
    }

    return (
        <div className="card p-3">
            <div className="card-inner">
                <div className="card-title-group mb-3">
                    <h5 className="title">
                        {typeModal === "add" ? "Create Company" : "Update Company"}
                    </h5>
                </div>

                <CommonCompanyForm
                    ref={formRef}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleSubmit={formik.handleSubmit}
                    initialLoading={initialLoading}
                    logoPreview={logoPreview}
                    fileInputRef={fileInputRef}
                    onLogoChange={handleLogoChange}
                    onRemoveLogo={handleRemoveLogo}
                    typeModal={typeModal}
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
                                ? "Create Company"
                                : "Update Company"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SuperAdminCompanyAdd;