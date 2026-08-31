import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { SuperAdminLocationDashboard } from "../../../pages";
export default function route() {
    return [
        {
            path: SuperAdminAccessRoute.ADMIN_LOCATION.path,
            key: SuperAdminAccessRoute.ADMIN_LOCATION.path,
            name: "Admin Location Dashboard",
            private: true,
            adminAccess: true,
            commonRoute: false,
            element: <SuperAdminLocationDashboard />
        }

    ];
}
