import * as Yup from "yup";
const phoneRegex = /^[0-9]{10}$/;
const postalCodeRegex = /^[0-9A-Za-z\- ]{3,10}$/;

const requiredId = (label) =>
  Yup.number()
    .typeError(`${label} is required`)
    .required(`${label} is required`);

const baseEmployeeShape = {
  employeeCode: Yup.string().trim().required("Employee code is required"),
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),

  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),

  phoneNumber: Yup.string()
    .trim()
    .required("Phone number is required")
    .matches(phoneRegex, {
      message: "Enter a valid 10-digit phone number",
      excludeEmptyString: true,
    }),

  phoneNumberCountryCode: Yup.string().trim().required("Country code is required"),

  // If your date picker gives you Date objects, don't use Yup.string().trim() on them.
  dateOfBirth: Yup.date()
    .typeError("Enter a valid date of birth")
    .required("Date of birth is required"),

  gender: Yup.string().trim().required("Gender is required"),

  dateOfJoining: Yup.date()
    .typeError("Enter a valid date of joining")
    .required("Date of joining is required"),

  dateOfLeaving: Yup.date()
    .typeError("Enter a valid date of leaving")
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    ),

  employmentType: Yup.string().trim().required("Employment type is required"),
  employmentStatus: Yup.string().trim().required("Employment status is required"),
  address: Yup.string().trim().required("Address is required"),

  countryId: requiredId("Country"),
  stateId: requiredId("State"),
  cityId: requiredId("City"),

  postalCode: Yup.string()
    .trim()
    .required("Postal code is required")
    .matches(postalCodeRegex, {
      message: "Enter a valid postal code",
      excludeEmptyString: true,
    }),

  departmentId: requiredId("Department"),
  designationId: requiredId("Designation"),
  branchId: requiredId("Branch"),
  locationId: requiredId("Location"),
  shiftId: requiredId("Shift"),

  managerId: Yup.number()
    .typeError("Select a valid manager")
    .transform((value, originalValue) =>
      originalValue === "" || originalValue === null || originalValue === undefined
        ? null
        : value
    )
    .nullable(),

  canEmployeeLogin: Yup.boolean().default(false),
};

export const addEmployeeValidation = Yup.object().shape({
  ...baseEmployeeShape,
  profileImage: Yup.mixed().nullable(),
});

export const editEmployeeValidation = Yup.object().shape({
  ...baseEmployeeShape,
  profileImage: Yup.mixed().nullable(),
});
