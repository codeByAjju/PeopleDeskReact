import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { SuperAdminDesignationDashboard } from "../../../pages";
export default function route() {
    return [
        {
            path: SuperAdminAccessRoute.ADMIN_DESIGNATION.path,
            key: SuperAdminAccessRoute.ADMIN_DESIGNATION.path,
            name: "Admin Designation Dashboard",
            private: true,
            adminAccess: true,
            commonRoute: false,
            element: <SuperAdminDesignationDashboard />
        }

    ];
}
