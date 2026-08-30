import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { SuperAdminDepartmentDashboard } from "../../../pages";
export default function route() {
    return [
        {
            path: SuperAdminAccessRoute.ADMIN_DEPARTMENT.path,
            key: SuperAdminAccessRoute.ADMIN_DEPARTMENT.path,
            name: "Admin Department Dashboard",
            private: true,
            adminAccess: true,
            commonRoute: false,
            element: <SuperAdminDepartmentDashboard />
        }

    ];
}
