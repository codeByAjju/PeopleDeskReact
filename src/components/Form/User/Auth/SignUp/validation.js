import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    firstname: yup
      .string()
      .required("First Name is required")
      .test(
        "is-non-numeric",
        "First Name should not contain numeric values",
        (value) => {
          if (value) {
            return /^\D*$/.test(value);
          }
          return true;
        }
      )
      .min(3, "First Name should be at least 3 characters long")
      .matches(/^[^\s].+[^\s]$/, "First Name should not contain spaces"),

    lastname: yup
      .string()
      .required("Last Name is required")
      .min(3, "Last Name should be at least 3 characters long")
      .matches(/^[^\s].+[^\s]$/, "Last Name should not contain spaces"),

    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password should be at least 6 characters long")
      .max(15, "Password should not exceed 15 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]+$/,
        "Password must contain at least one letter"
      )
      .matches(/^[^\s].+[^\s]$/, "Password should not contain spaces"),

    phoneNumber: yup.number()
      .required("Phone number is required")
      .positive("Phone number should be a positive number")
      .test('isValid', 'Invalid phone number', value => {
        if (!value) return false; // Required field
        const phoneNumber = Math.floor(value); // Convert to integer
        return phoneNumber >= 1000000000 && phoneNumber <= 9999999999;
      })

  });
}
