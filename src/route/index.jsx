import { EmployeeLayout, UserLayout, SuperAdminLayout } from "../layouts";
import { userRoutes } from "./User";
import { superAdminRoutes } from "./SuperAdmin";
import { employeeRoutes } from "./Employee";
export const routes = () => {
  return [
    {
      element: <SuperAdminLayout />,
      children: [...superAdminRoutes()],
    },
    {
      element: <EmployeeLayout />,
      children: [...employeeRoutes()],
    },
    {
      element: <UserLayout />,
      children: [...userRoutes()],
    },
  ];
};

export const routesList = () => {
  // Retrieve the routes from user and admin sections
  const [superAdminRoutesConfig] = [superAdminRoutes()];
  const [employeeRoutesConfig] = [employeeRoutes()];
  const [userRoutesConfig] = [userRoutes()];

  // Concatenate the children arrays from both user and admin routes
  const routeArr = [
    ...superAdminRoutesConfig[0].children,
    ...superAdminRoutesConfig[1].children,
    ...employeeRoutesConfig[0].children,
    ...employeeRoutesConfig[1].children,
    ...userRoutesConfig[0].children,
    ...userRoutesConfig[1].children,
  ];
  return [...routeArr];
};
export const moduleRoutesList = () => {
  let routeArr = {
    superAdmin: [...superAdminRoutes()[0].children, ...superAdminRoutes()[1].children],
    employee: [...employeeRoutes()[0].children, ...employeeRoutes()[1].children],
    user: [
      ...userRoutes()[0].children,
      ...userRoutes()[1].children,
    ],
  };
  return routeArr;
};

let completePathListCache = null;

export const getCompletePathList = () => {
  if (!completePathListCache) {
    completePathListCache = routesList().reduce((prev, curr) => {
      prev.push(curr);
      if (curr.children) {
        prev.push(...curr.children);
      }
      return prev;
    }, []);
  }
  return completePathListCache;
};