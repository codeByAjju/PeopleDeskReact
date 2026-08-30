import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    name: yup
      .string()
      .required("Department name is required")
      .max(100, "Department name should not exceed 100 characters")
      .trim(),

    code: yup
      .string()
      .required("Department code is required")
      .max(50, "Department code should not exceed 50 characters")
      .trim(),

    description: yup
      .string()
      .max(500, "Description should not exceed 500 characters")
      .nullable(),

    status: yup
      .string()
      .oneOf(["active", "inactive", "deleted"], "Invalid status")
      .required("Status is required"),
  });
}

