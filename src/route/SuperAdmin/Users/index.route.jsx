import routesMap from "../../../routeControl/superAdminRoutMap";
import { UsersList } from "../../../components/SuperAdmin";

export default function route() {
  return [
    {
      path: routesMap.ADMIN_USERS.path,
      name: "ADMIN_USERS",
      key: routesMap.ADMIN_USERS.path,
      commonRoute: true,
      private: true,
      withAuth: true,
      belongsToHeader: true,
      adminAccess: true,
      element: <UsersList />,
    },
  ];
}
