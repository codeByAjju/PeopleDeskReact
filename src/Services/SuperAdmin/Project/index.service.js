import SuperAdminProject from "../../../apiEndPoint/SuperAdmin/Project";
import { APIrequest } from "../../axios";


export const SuperAdminProjectServices = {
    superAdminProjectCreate: async (bodyData) => {
        try {
          const payload = {
            ...SuperAdminProject.projectCreate,
            bodyData,
          };
          const res = await APIrequest(payload);
          return res;
        } catch (error) {
          throw error;
        }
      }
}