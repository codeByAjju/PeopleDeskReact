import UserAuth from "../../../apiEndPoint/User/Auth";
import { APIrequest } from "../../axios";


export const UserAuthServices = {
    userSignUp: async (bodyData) => {
        try {
          const payload = {
            ...UserAuth.userSignUp,
            bodyData,
          };
          const res = await APIrequest(payload);
          return res;
        } catch (error) {
          throw error;
        }
      },
      userLogIn: async(bodyData)=>{
        try {
          const payload = {
            ...UserAuth.userLogIn,
            bodyData,
          };
          const res = await APIrequest(payload);
          return res;
        } catch (error) {
          throw error;
        }
      }
}