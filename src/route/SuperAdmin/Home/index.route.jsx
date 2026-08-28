import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { SuperAdminHomePage } from "../../../pages/SuperAdmin";

export default function route() {
  return [
    {
      path: SuperAdminAccessRoute.DASHBOARD.path,
      name: "Dashboard",
      key: SuperAdminAccessRoute.DASHBOARD.path,
      commonRoute: false,
      private: true,
      adminAccess: true,
      withAuth: true,
      belongsToHeader: true,
      element: <SuperAdminHomePage />,
    },
  ];
}
