import UserLogIn from "../../../pages/SuperAdmin/SignIn/index.page.jsx";
import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
export default function route() {
  return [
    {
      path: SuperAdminAccessRoute.LOGIN.path,
      key: SuperAdminAccessRoute.LOGIN.path,
      name: "Login",
      commonRoute: false,
      private: false,
      element: <UserLogIn />,
    },
  ]
}
