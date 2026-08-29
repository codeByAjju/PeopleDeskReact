import SuperAdminCity from "../../../apiEndPoint/SuperAdmin/City";
import { APIrequest } from "../../axios";

export const SuperAdminCityServices = {
  superAdminGetCitiesByStateId: async (stateId, queryParams) => {
    try {
      const payload = {
        ...SuperAdminCity.getCitiesByStateId(stateId),
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminGetCityById: async (id) => {
    try {
      const payload = {
        ...SuperAdminCity.getCityById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
