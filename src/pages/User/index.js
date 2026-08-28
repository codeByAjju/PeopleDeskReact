import React from "react";

export const UserSignUp = React.lazy(() => import("./SignUp/index.page"));
export const Home = React.lazy(()=>import("./Home/index.page"));
export const UserDashboard = React.lazy(() => import("./Dashboard/index.page"));