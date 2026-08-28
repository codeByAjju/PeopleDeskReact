import homeRoutes from "./Home/index.route";
import UserDashboard from "../User/Dashboard/index.route";

export default function route(){
    return [
    ...homeRoutes(),
    ...UserDashboard()
    ];
}
