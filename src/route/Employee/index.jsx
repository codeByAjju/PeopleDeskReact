import publicRoutes from "./public.route";
import privateRoutes from "./private.route";
import { EmployeePrivateLayout, EmployeePublicLayout } from "../../layouts";

export const employeeRoutes = () => {
  return [
    {
      element: <EmployeePublicLayout />,
      children: [...publicRoutes()],
    },
    {
      element: <EmployeePrivateLayout />,
      children: [...privateRoutes()],
    },
  ];
};
