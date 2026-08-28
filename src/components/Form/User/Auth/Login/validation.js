import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password should be at least 6 characters long")
      .max(15, "Password should not exceed 15 characters")
      .matches(/^[^\s].+[^\s]$/, "Password should not contain spaces"),
  });
}
