import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    name: yup
      .string()
      .required("Designation name is required")
      .max(100, "Designation name should not exceed 100 characters")
      .trim(),

    code: yup
      .string()
      .required("Designation code is required")
      .max(50, "Designation code should not exceed 50 characters")
      .trim(),

    description: yup
      .string()
      .max(500, "Description should not exceed 500 characters")
      .nullable(),

    departmentId: yup
      .string()
      .required("Department is required"),

    level: yup
      .number()
      .typeError("Level must be a number")
      .integer("Level must be an integer")
      .required("Level is required"),

    status: yup
      .string()
      .oneOf(["active", "inactive", "deleted"], "Invalid status")
      .required("Status is required"),
  });
}



