import { baseRoutes } from "../helpers/baseRoutes";

const employeeAccessRoute = {
  EMPLOYEE_DASHBOARD: {
    path: `${baseRoutes.employeeBaseRoute}/dashboard`,
  },
  EMPLOYEE_PUBLIC_HOMEPAGE: {
    path: `${baseRoutes.employeeBaseRoute}`,
  },

};

export default employeeAccessRoute;
