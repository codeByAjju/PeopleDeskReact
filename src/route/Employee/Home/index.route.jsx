import employeeAccessRoute from "../../../routeControl/employeeRoutMap";
import { EmployeeHomePage } from "../../../pages/Employee";

export default function route() {
  return [
    {
      path: employeeAccessRoute.EMPLOYEE_PUBLIC_HOMEPAGE.path,
      name: "Employee Homepage",
      key: employeeAccessRoute.EMPLOYEE_PUBLIC_HOMEPAGE.path,
      commonRoute: true,
      private: false,
      employeeAccess: false,
      withAuth: false,
      belongsToHeader: true,
      element: <EmployeeHomePage />,
    },
  ];
}
