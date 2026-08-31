import SuperAdminAccessRoute from "../../../routeControl/superAdminRoutMap";
import { SuperAdminBranchDashboard } from "../../../pages";
export default function route() {
    return [
        {
            path: SuperAdminAccessRoute.ADMIN_BRANCH.path,
            key: SuperAdminAccessRoute.ADMIN_BRANCH.path,
            name: "Admin Branch Dashboard",
            private: true,
            adminAccess: true,
            commonRoute: false,
            element: <SuperAdminBranchDashboard />
        }

    ];
}
