import SuperAdminLocation from "../../../apiEndPoint/SuperAdmin/Location";
import { APIrequest } from "../../axios";

export const SuperAdminLocationServices = {
  superAdminGetAllLocation: async (queryParams) => {
    try {
      const payload = {
        ...SuperAdminLocation.getAllLocation,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminGetLocationById: async (id) => {
    try {
      const payload = {
        ...SuperAdminLocation.getLocationById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
