import loadable from "@loadable/component";

export const CompanyDetailsSkeleton = loadable(() => import("./CompanyDetailsSkeleton/index.jsx"));
export const EmployeeDetailsSkeleton = loadable(() => import("./EmployeeDetails/index.jsx"));
export const DepartmentDetailsSkeleton = loadable(() => import("./DepartmentDetailsSkelton/index.jsx"));