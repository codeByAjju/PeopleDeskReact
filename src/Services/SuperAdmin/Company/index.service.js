import SuperAdminCompany from "../../../apiEndPoint/SuperAdmin/Company";
import { APIrequest } from "../../axios";


export const SuperAdminCompanyServices = {
  superAdminCompanyCreate: async (bodyData) => {
    try {
      const payload = {
        ...SuperAdminCompany.createCompany,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminCompanyUpdate: async (id, bodyData) => {
    try {
      const payload = {
        ...SuperAdminCompany.updateCompanyById(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminDeleteCompanyById: async (id) => {
    try {
      const payload = {
        ...SuperAdminCompany.deleteCompanyById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminGetCompanyById: async (id) => {
    try {
      const payload = {
        ...SuperAdminCompany.getCompanyById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminGetAllCompany: async (queryParams) => {
    try {
      const payload = {
        ...SuperAdminCompany.getAllCompany,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
}