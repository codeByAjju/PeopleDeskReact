import routesMap from "../../../routeControl/userRoutMap";
import { UsersList } from "../../../components/SuperAdmin/Dashboard";

export default function route() {
  return [
    {
      path: routesMap.USERS.path,
      name: "USERS",
      key: routesMap.USERS.path,
      commonRoute: true,
      private: true,
      withAuth: true,
      belongsToHeader: true,
      element: <UsersList />,
    },
  ];
}
