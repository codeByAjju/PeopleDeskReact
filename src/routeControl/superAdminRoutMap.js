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

};

export default SuperAdminAccessRoute;
