import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { AdminMasters } from "../../../pages/SuperAdmin";
import { Navbar } from "../../../components";
export default function route() {
  return [
    {
      path: SuperAdminAccessRoute.MASTERS.path,
      key: SuperAdminAccessRoute.MASTERS.path,
      name: "Masters",
      private: true,
      adminAccess: true,
      commonRoute: false,
      element: <AdminMasters />,
    }
  ];
}
