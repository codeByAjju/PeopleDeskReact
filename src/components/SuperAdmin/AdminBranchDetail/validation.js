import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    name: yup
      .string()
      .required("Branch name is required")
      .max(100, "Branch name should not exceed 100 characters")
      .trim(),

    code: yup
      .string()
      .required("Branch code is required")
      .max(50, "Branch code should not exceed 50 characters")
      .trim(),

    postalCode: yup
      .string()
      .max(20, "Postal code should not exceed 20 characters")
      .trim(),

    address: yup
      .string()
      .max(500, "Address should not exceed 500 characters")
      .nullable(),

    phoneNumber: yup
      .string()
      .max(10, "Phone should not exceed 10 characters")
      .nullable(),

    countryId: yup
      .number()
      .required("Country is required"),

    stateId: yup
      .number()
      .required("State is required"),

    cityId: yup
      .number()
      .required("City is required"),

    status: yup
      .string()
      .oneOf(["active", "inactive", "deleted"], "Invalid status")
      .required("Status is required"),
  });
}
