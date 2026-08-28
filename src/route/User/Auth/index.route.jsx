import userAccessRoute from "../../../routeControl/userRoutMap";
import UserSignUp from "../../../pages/User/SignUp/index.page.jsx";
import UserLogIn from "../../../pages/User/SignIn/index.page.jsx";
export default function route(){
    return [
        {
            path: userAccessRoute.SIGNUP.path,
            name: "Sign Up",
            key: userAccessRoute.SIGNUP.path,
            commonRoute: false,
            private: false,
            element: <UserSignUp/>,
          },
          {
            path: userAccessRoute.LOGIN.path,
            name: "Login",
            key: userAccessRoute.LOGIN.path,
            commonRoute: false,
            private: false,
            element: <UserLogIn/>,
          },
    ]    
}