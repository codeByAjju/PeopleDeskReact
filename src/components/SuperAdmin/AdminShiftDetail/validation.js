import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    name: yup
      .string()
      .required("Shift name is required")
      .max(100, "Shift name should not exceed 100 characters")
      .trim(),

    code: yup
      .string()
      .required(" Shift code is required")
      .max(50, "Shift code should not exceed 50 characters")
      .trim(),

    startTime: yup
      .string()
      .required("Start time is required"),

    endTime: yup
      .string()
      .required("End time is required"),

    workingHours: yup
      .number()
      .required("Working hours is required"),

    breakDuration: yup
      .number()
      .required("Break duration is required"),

    status: yup
      .string()
      .oneOf(["active", "inactive", "deleted"], "Invalid status")
      .required("Status is required"),
  });
}
