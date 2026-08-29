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

  superAdminCreateDepartment: async (data) => {
    try {
      const payload = {
        ...SuperAdminDepartment.createDepartment,
        data,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminDepartmentDetails: async (id) => {
    try {
      const payload = {
        ...SuperAdminDepartment.departmentDetails,
        params: { id },
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminEditDepartment: async (id, data) => {
    try {
      const payload = {
        ...SuperAdminDepartment.editDepartment,
        params: { id },
        data,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminDeleteDepartment: async (id) => {
    try {
      const payload = {
        ...SuperAdminDepartment.deleteDepartment,
        params: { id },
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
