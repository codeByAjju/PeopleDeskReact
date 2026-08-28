import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { AdminCharts, AdminProfile, DashboardContent } from "../../../components/SuperAdmin";
import { SuperAdminAddUser } from "../../../components/SuperAdmin";
export default function route() {
  return [
    {
      path: SuperAdminAccessRoute.DASHBOARD.path,
      key: SuperAdminAccessRoute.DASHBOARD.path,
      name: "Admin Dashboard",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <DashboardContent />
    },
    {
      path: SuperAdminAccessRoute.ADMIN_ADD_USERS.path,
      key: SuperAdminAccessRoute.ADMIN_ADD_USERS.path,
      name: "Admin Add Users",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <SuperAdminAddUser />
    },
    {
      path: SuperAdminAccessRoute.ADMIN_PROFILE.path,
      key: SuperAdminAccessRoute.ADMIN_PROFILE.path,
      name: "Admin Profile",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <AdminProfile />
    },
    {
      path: SuperAdminAccessRoute.ADMIN_CHARTS.path,
      key: SuperAdminAccessRoute.ADMIN_CHARTS.path,
      name: "Admin Charts",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <AdminCharts />
    },
  ];
}
