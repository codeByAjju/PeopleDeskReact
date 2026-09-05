import { EmployeeDashboard } from "../../../pages/Employee";
import employeeAccessRoute from "../../../routeControl/employeeRoutMap";

export default function route() {
  return [
    {
      path: employeeAccessRoute.EMPLOYEE_DASHBOARD.path,
      key: employeeAccessRoute.EMPLOYEE_DASHBOARD.path,
      name: "Employee Dashboard",
      private: true,
      employeeAccess: true,
      commonRoute: false,
      belongsToHeader: true,
      element: <EmployeeDashboard />
    },
  ];
}
