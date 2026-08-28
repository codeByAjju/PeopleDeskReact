import routesMap from "../../../routeControl/userRoutMap";

export default function route() {
  return [
    {
      path: routesMap.HOME.path,
      name: "Home",
      key: routesMap.HOME.path,
      commonRoute: true,
      private: true,
      withAuth: true,
      belongsToHeader: true,
      element: <h1>User Private routes</h1>,
    },
  ];
}
