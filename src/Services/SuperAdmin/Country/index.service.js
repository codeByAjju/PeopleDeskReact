import SuperAdminCountry from "../../../apiEndPoint/SuperAdmin/Country";
import { APIrequest } from "../../axios";

export const SuperAdminCountryServices = {
  superAdminGetAllCountry: async (queryParams) => {
    try {
      const payload = {
        ...SuperAdminCountry.getAllCountry,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminGetCountryById: async (id) => {
    try {
      const payload = {
        ...SuperAdminCountry.getCountryById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
