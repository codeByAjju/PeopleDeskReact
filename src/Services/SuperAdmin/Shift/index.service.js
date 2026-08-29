import SuperAdminShift from "../../../apiEndPoint/SuperAdmin/Shift";
import { APIrequest } from "../../axios";

export const SuperAdminShiftServices = {
  superAdminGetAllShift: async (queryParams) => {
    try {
      const payload = {
        ...SuperAdminShift.getAllShift,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
