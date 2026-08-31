import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { SuperAdminShiftDashboard } from "../../../pages";
export default function route() {
    return [
        {
            path: SuperAdminAccessRoute.ADMIN_SHIFT.path,
            key: SuperAdminAccessRoute.ADMIN_SHIFT.path,
            name: "Admin Shift Dashboard",
            private: true,
            adminAccess: true,
            commonRoute: false,
            element: <SuperAdminShiftDashboard />
        }

    ];
}
