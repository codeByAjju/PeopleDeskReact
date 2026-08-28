import routesMap from "../../../routeControl/userRoutMap";
import { UserDashboard } from "../../../components/SuperAdmin";

export default function route() {
  return [
    {
      path: routesMap.DASHBOARD.path,
      name: "DASHBOARD",
      key: routesMap.DASHBOARD.path,
      commonRoute: true,
      private: true,
      withAuth: true,
      belongsToHeader: true,
      element: <UserDashboard />,
    },
  ];
}
