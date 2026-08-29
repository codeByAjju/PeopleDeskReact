import SuperAdminState from "../../../apiEndPoint/SuperAdmin/State";
import { APIrequest } from "../../axios";

export const SuperAdminStateServices = {
  superAdminGetStatesByCountryId: async (countryId, queryParams) => {
    try {
      const payload = {
        ...SuperAdminState.getStatesByCountryId(countryId),
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminGetStateById: async (id) => {
    try {
      const payload = {
        ...SuperAdminState.getStateById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
