import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { SuperAdminEmployeeDashboard, SuperAdminEmployeeAdd, SuperAdminEmployeeEdit, SuperAdminEmployeeView } from "../../../pages";
export default function route() {
  return [
    {
      path: SuperAdminAccessRoute.ADMIN_EMPLOYEE.path,
      key: SuperAdminAccessRoute.ADMIN_EMPLOYEE.path,
      name: "Admin Employee Dashboard",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <SuperAdminEmployeeDashboard />
    },
    {
      path: SuperAdminAccessRoute.CREATE_EMPLOYEE.path,
      key: SuperAdminAccessRoute.CREATE_EMPLOYEE.path,
      name: "Admin Employee Create",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <SuperAdminEmployeeAdd />
    },
    {
      path: SuperAdminAccessRoute.EDIT_EMPLOYEE.path,
      key: SuperAdminAccessRoute.EDIT_EMPLOYEE.path,
      name: "Admin Employee Edit",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <SuperAdminEmployeeAdd />
    },
    {
      path: SuperAdminAccessRoute.VIEW_EMPLOYEE.path,
      key: SuperAdminAccessRoute.VIEW_EMPLOYEE.path,
      name: "Admin Employee View",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <SuperAdminEmployeeView />
    },

  ];
}
