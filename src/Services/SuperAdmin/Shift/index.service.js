import SuperAdminShift from "../../../apiEndPoint/SuperAdmin/Shift";
import { APIrequest } from "../../axios";

export const SuperAdminShiftServices = {
  superAdminGetAllShift: async (queryParams) => {
    try {
      const payload = {
        ...SuperAdminShift.getAllShift,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminUpdateShift: async (id, bodyData) => {
    try {
      const payload = {
        ...SuperAdminShift.updateShift(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminCreateShift: async (bodyData) => {
    try {
      const payload = {
        ...SuperAdminShift.createShift,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminDeleteShift: async (id) => {
    try {
      const payload = {
        ...SuperAdminShift.deleteShift(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminGetShiftById: async (id) => {
    try {
      const payload = {
        ...SuperAdminShift.getShiftById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  superAdminShiftStats: async (shiftId) => {
    try {
      const payload = {
        ...SuperAdminShift.shiftStats(shiftId),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
