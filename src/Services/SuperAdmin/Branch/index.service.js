import SuperAdminBranch from "../../../apiEndPoint/SuperAdmin/Branch";
import { APIrequest } from "../../axios";

export const SuperAdminBranchServices = {
  superAdminGetAllBranch: async (queryParams) => {
    try {
      const payload = {
        ...SuperAdminBranch.getAllBranch,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminBranchDetails: async (id) => {
    try {
      const payload = {
        ...SuperAdminBranch.branchDetailsByBranchId(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminCreateBranch: async (bodyData) => {
    try {
      const payload = {
        ...SuperAdminBranch.createBranch,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminUpdateBranch: async (id, bodyData) => {
    try {
      const payload = {
        ...SuperAdminBranch.updateBranch(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminDeleteBranch: async (id) => {
    try {
      const payload = {
        ...SuperAdminBranch.deleteBranch(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminBranchGlobalStats: async () => {
    try {
      const payload = {
        ...SuperAdminBranch.branchGlobalStats,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminGetBranchById: async (branchId) => {
    try {
      const payload = {
        ...SuperAdminBranch.branchDetailsByBranchId(branchId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminGetBranchDetailsByCityId: async (cityId) => {
    try {
      const payload = {
        ...SuperAdminBranch.branchDetailsByCityId(cityId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminGetBranchDetailsByStateId: async (stateId) => {
    try {
      const payload = {
        ...SuperAdminBranch.branchDetailsByStateId(stateId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminGetBranchDetailsByCountryId: async (countryId) => {
    try {
      const payload = {
        ...SuperAdminBranch.branchDetailsByCountryId(countryId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminGetEmployeeByBranchId: async (branchId) => {
    try {
      const payload = {
        ...SuperAdminBranch.getEmployeeByBranchId(branchId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  superAdminBranchStats: async (branchId) => {
    try {
      const payload = {
        ...SuperAdminBranch.branchStats(branchId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

