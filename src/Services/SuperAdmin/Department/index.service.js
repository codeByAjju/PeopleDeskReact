import SuperAdminDepartment from "../../../apiEndPoint/SuperAdmin/Department";
import { APIrequest } from "../../axios";

export const SuperAdminDepartmentServices = {
  superAdminGetAllDepartment: async (queryParams) => {
    try {
      const payload = {
        ...SuperAdminDepartment.getAllDepartment,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
