import adminMasters from "../SuperAdmin/AdminMaster/index.route";
import adminUsers from "../SuperAdmin/Users/index.route";
import adminDashboard from '../SuperAdmin/AdminDashboard/index.route';
import adminCompany from '../SuperAdmin/AdminCompany/index.route';
import adminEmployee from '../SuperAdmin/AdminEmployee/index.route';
import adminDepartment from "../SuperAdmin/AdminDepartment/index.route";
export default function route() {
    return [
        ...adminDashboard(),
        ...adminMasters(),
        ...adminUsers(),
        ...adminCompany(),
        ...adminEmployee(),
        ...adminDepartment()
    ];
}