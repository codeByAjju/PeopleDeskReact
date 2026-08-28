import * as Yup from "yup";
const phoneRegex = /^[0-9]{10}$/;
const websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/;
const postalCodeRegex = /^[0-9A-Za-z\- ]{3,10}$/;

const baseCompanyShape = {
  name: Yup.string().trim().required("Company name is required"),
  code: Yup.string().trim().required("Company code is required"),
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .trim()
    .matches(phoneRegex, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),
  website: Yup.string()
    .trim()
    .matches(websiteRegex, "Enter a valid website URL")
    .nullable(),
  address: Yup.string().trim().required("Address is required"),
  city: Yup.string().trim().required("City is required"),
  state: Yup.string().trim().required("State is required"),
  country: Yup.string().trim().required("Country is required"),
  postalCode: Yup.string()
    .trim()
    .matches(postalCodeRegex, "Enter a valid postal code")
    .required("Postal code is required"),
};

export const addCompanyValidation = Yup.object().shape({
  ...baseCompanyShape,
  logo: Yup.mixed().nullable(),
});

export const editCompanyValidation = Yup.object().shape({
  ...baseCompanyShape,
  logo: Yup.mixed().nullable(),
});
