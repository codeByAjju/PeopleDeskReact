import SuperAdminDesignation from "../../../apiEndPoint/SuperAdmin/Designation";
import { APIrequest } from "../../axios";

export const SuperAdminDesignationServices = {
  superAdminGetAllDesignation: async (queryParams) => {
    try {
      const payload = {
        ...SuperAdminDesignation.getAllDesignation,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminGetDesignationsByDepartmentId: async (departmentId) => {
    try {
      const payload = {
        ...SuperAdminDesignation.getDesignationsByDepartmentId(departmentId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
