import SuperAdminBranch from "../../../apiEndPoint/SuperAdmin/Branch";
import { APIrequest } from "../../axios";

export const SuperAdminBranchServices = {
  superAdminGetAllBranch: async (queryParams) => {
    try {
      const payload = {
        ...SuperAdminBranch.getAllBranch,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
