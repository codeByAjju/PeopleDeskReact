import React from "react";

export const SuperAdminHomePage = React.lazy(() => import("./Home/index.page"));
export const AdminMasters = React.lazy(() => import("./AdminMasters/index.page"));
export const SuperAdminUsersList = React.lazy(() => import("./SuperAdminUsersList/index.page"));
export * from "./Company/index.page";
