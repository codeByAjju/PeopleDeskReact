import SuperAdminEmployee from "../../../apiEndPoint/SuperAdmin/Employee";
import { APIrequest } from "../../axios";


export const SuperAdminEmployeeServices = {
  superAdminEmployeeCreate: async (bodyData) => {
    try {
      const payload = {
        ...SuperAdminEmployee.createEmployee,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminEmployeeUpdate: async (id, bodyData) => {
    try {
      const payload = {
        ...SuperAdminEmployee.updateEmployeeById(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminDeleteEmployeeById: async (id) => {
    try {
      const payload = {
        ...SuperAdminEmployee.deleteEmployeeById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminRestoreEmployeeById: async (id) => {
    try {
      const payload = {
        ...SuperAdminEmployee.restoreEmployeeById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminUpdateEmployeeStatus: async (id, bodyData) => {
    try {
      const payload = {
        ...SuperAdminEmployee.updateEmployeeStatus(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminGetEmployeeById: async (id) => {
    try {
      const payload = {
        ...SuperAdminEmployee.getEmployeeById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminGetAllEmployee: async (queryParams) => {
    try {
      const payload = {
        ...SuperAdminEmployee.getAllEmployee,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminEmployeeStats: async () => {
    try {
      const payload = {
        ...SuperAdminEmployee.employeeStats,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
}
