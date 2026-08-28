import loadable from "@loadable/component";

export const SignUpform=loadable(()=> import ("./SignUp/index.form"));
export const LoginForm = loadable(() => import("./Login/index.form"));
