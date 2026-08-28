import publicRoutes from "./public.route";
import privateRoutes from "./private.route";
import { SuperAdminPrivateLayout, SuperAdminPublicLayout } from "../../layouts";

export const superAdminRoutes = () => {
  return [
    {
      element: <SuperAdminPublicLayout />,
      children: [...publicRoutes()],
    },
    {
      element: <SuperAdminPrivateLayout />,
      children: [...privateRoutes()],
    },
  ];
};
