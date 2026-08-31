import { baseRoutes } from "../helpers/baseRoutes";

const SuperAdminAccessRoute = {
  HOME: {
    path: `${baseRoutes.userBaseRoutes}`,
  },
  DASHBOARD: {
    path: `${baseRoutes.superAdminBaseRoute}/dashboard`,
  },
  ADMIN_USERS: {
    path: `${baseRoutes.superAdminBaseRoute}/users`,
  },
  ADMIN_ADD_USERS: {
    path: `${baseRoutes.superAdminBaseRoute}/add-users`,
  },
  ADMIN_PROFILE: {
    path: `${baseRoutes.superAdminBaseRoute}/profile`,
  },
  ADMIN_CHARTS: {
    path: `${baseRoutes.superAdminBaseRoute}/charts`,
  },
  ADMIN_COMPANY: {
    path: `${baseRoutes.superAdminBaseRoute}/company`,
  },
  MASTERS: { path: `${baseRoutes.superAdminBaseRoute}/masters` },
  LOGIN: { path: `${baseRoutes.superAdminBaseRoute}/login` },
  CREATE_COMPANY: { path: `${baseRoutes.superAdminBaseRoute}/create-company` },
  EDIT_COMPANY: { path: `${baseRoutes.superAdminBaseRoute}/edit-company/:id` },
  VIEW_COMPANY: { path: `${baseRoutes.superAdminBaseRoute}/company/:id` },
  CREATE_EMPLOYEE: { path: `${baseRoutes.superAdminBaseRoute}/create-employee` },
  EDIT_EMPLOYEE: { path: `${baseRoutes.superAdminBaseRoute}/edit-employee/:id` },
  VIEW_EMPLOYEE: { path: `${baseRoutes.superAdminBaseRoute}/employee/:id` },
  ADMIN_EMPLOYEE: { path: `${baseRoutes.superAdminBaseRoute}/employee` },
  ADMIN_DEPARTMENT: { path: `${baseRoutes.superAdminBaseRoute}/department` },
  ADMIN_DESIGNATION: { path: `${baseRoutes.superAdminBaseRoute}/designation` },
  ADMIN_BRANCH: { path: `${baseRoutes.superAdminBaseRoute}/branch` },
  ADMIN_LOCATION: { path: `${baseRoutes.superAdminBaseRoute}/location` },
  ADMIN_SHIFT: { path: `${baseRoutes.superAdminBaseRoute}/shift` },

};

export default SuperAdminAccessRoute;
