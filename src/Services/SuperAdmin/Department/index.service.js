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

  superAdminCreateDepartment: async (bodyData) => {
    try {
      const payload = {
        ...SuperAdminDepartment.createDepartment,
        bodyData,
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
        ...SuperAdminDepartment.departmentDetails(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminEditDepartment: async (id, bodyData) => {
    try {
      const payload = {
        ...SuperAdminDepartment.editDepartment(id),
        bodyData,
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
        ...SuperAdminDepartment.deleteDepartment(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminDepartmentStats: async () => {
    try {
      const payload = {
        ...SuperAdminDepartment.departmentStats,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
