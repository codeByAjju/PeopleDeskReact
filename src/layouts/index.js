import React from "react";

export const UserLayout = React.lazy(()=>import("./Main/index.layout"));
export const PublicLayout = React.lazy(()=> import("./public/index.layout"));
export const PrivateLayout = React.lazy(()=> import("./private/index.layout"));
export const SuperAdminLayout = React.lazy(() => import("./SuperAdmin/index.layout"));
export const SuperAdminPublicLayout = React.lazy(() => import("./SuperAdmin/public.layout"));
export const SuperAdminPrivateLayout = React.lazy(() => import("./SuperAdmin/private.layout"));
