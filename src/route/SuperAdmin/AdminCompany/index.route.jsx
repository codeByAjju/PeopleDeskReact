import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { SuperAdminCompanyDashboard, SuperAdminCompanyAdd, SuperAdminCompanyEdit, SuperAdminCompanyView } from "../../../pages";
export default function route() {
  return [
    {
      path: SuperAdminAccessRoute.ADMIN_COMPANY.path,
      key: SuperAdminAccessRoute.ADMIN_COMPANY.path,
      name: "Admin Company Dashboard",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <SuperAdminCompanyDashboard />
    },
    {
      path: SuperAdminAccessRoute.CREATE_COMPANY.path,
      key: SuperAdminAccessRoute.CREATE_COMPANY.path,
      name: "Admin Company Create",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <SuperAdminCompanyAdd />
    },
    {
      path: SuperAdminAccessRoute.EDIT_COMPANY.path,
      key: SuperAdminAccessRoute.EDIT_COMPANY.path,
      name: "Admin Company Edit",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <SuperAdminCompanyAdd />
    },
    {
      path: SuperAdminAccessRoute.VIEW_COMPANY.path,
      key: SuperAdminAccessRoute.VIEW_COMPANY.path,
      name: "Admin Company View",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <SuperAdminCompanyView />
    },

  ];
}
