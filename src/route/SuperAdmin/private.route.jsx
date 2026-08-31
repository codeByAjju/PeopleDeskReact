import adminMasters from "../SuperAdmin/AdminMaster/index.route";
import adminUsers from "../SuperAdmin/Users/index.route";
import adminDashboard from '../SuperAdmin/AdminDashboard/index.route';
import adminCompany from '../SuperAdmin/AdminCompany/index.route';
import adminEmployee from '../SuperAdmin/AdminEmployee/index.route';
import adminDepartment from "../SuperAdmin/AdminDepartment/index.route";
import adminDesignation from "../SuperAdmin/AdminDesignation/index.route";
import adminBranch from "../SuperAdmin/AdminBranch/index.route";
import adminLocation from "../SuperAdmin/AdminLocation/index.route";
import adminShift from "../SuperAdmin/AdminShift/index.route";
export default function route() {
    return [
        ...adminDashboard(),
        ...adminMasters(),
        ...adminUsers(),
        ...adminCompany(),
        ...adminEmployee(),
        ...adminDepartment(),
        ...adminDesignation(),
        ...adminBranch(),
        ...adminLocation(),
        ...adminShift()
    ];
}