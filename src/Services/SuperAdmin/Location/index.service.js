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
  superAdminLocationRestoreById: async (id) => {
    try {
      const payload = {
        ...SuperAdminLocation.restoreLocationById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminLocationStatusById: async (id) => {
    try {
      const payload = {
        ...SuperAdminLocation.updateLocationStatus(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminCreateLocation: async (bodyData) => {
    try {
      const payload = {
        ...SuperAdminLocation.createLocation,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminUpdateLocation: async (id, bodyData) => {
    try {
      const payload = {
        ...SuperAdminLocation.updateLocation(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminDeleteLocation: async (id) => {
    try {
      const payload = {
        ...SuperAdminLocation.deleteLocation(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminGetLocationByBranchId: async (branchId) => {
    try {
      const payload = {
        ...SuperAdminLocation.getLocationByBranchId(branchId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminLocationGlobalStats: async () => {
    try {
      const payload = {
        ...SuperAdminLocation.locationGlobalStats,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminLocationStats: async (locationId) => {
    try {
      const payload = {
        ...SuperAdminLocation.locationStats(locationId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminGetAllBranchesByLocationId: async (locationId) => {
    try {
      const payload = {
        ...SuperAdminLocation.getAllBranchesByLocationId(locationId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminGetAllEmployeesByLocationId: async (locationId) => {
    try {
      const payload = {
        ...SuperAdminLocation.getAllEmployeesByLocationId(locationId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
