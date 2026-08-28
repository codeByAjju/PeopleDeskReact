import { PublicLayout, PrivateLayout } from "../../layouts";
import publicRoutes from "./public.route";
import privateRoutes from "./private.route";

export const userRoutes = () => {
  return [
    {
      element: <PublicLayout />,
      children: [...publicRoutes()]
    },
    {
      element: <PrivateLayout />,
      children: [...privateRoutes()]
    }
  ];
};
