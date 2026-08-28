import loadable from "@loadable/component";
export const Sidebar = loadable(() => import("../SuperAdmin/Dashboard/Sidebar/index"));
export const UserDashboard = loadable(() => import("../SuperAdmin/Dashboard/Home/index"));
export const UserProfile = loadable(() => import("../User/Profile/index"));
export const AdminSidebar = loadable(() => import("../SuperAdmin/AdminSidebar/index"));
export const Navbar = loadable(() => import("../SuperAdmin/Dashboard/Navbar/index"));
export const DashboardContent = loadable(() => import("../SuperAdmin/Dashboard/DashboardContent/index"));
