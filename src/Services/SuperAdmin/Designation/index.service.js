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
  superAdminCreateDesignation: async (bodyData) => {
    try {
      const payload = {
        ...SuperAdminDesignation.createDesignation,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminUpdateDesignation: async (id, bodyData) => {
    try {
      const payload = {
        ...SuperAdminDesignation.updateDesignation(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminDeleteDesignation: async (id) => {
    try {
      const payload = {
        ...SuperAdminDesignation.deleteDesignation(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminDesignationDetails: async (id) => {
    try {
      const payload = {
        ...SuperAdminDesignation.designationDetails(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminDesignationStats: async (queryParams) => {
    try {
      const payload = {
        ...SuperAdminDesignation.designationStats,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

