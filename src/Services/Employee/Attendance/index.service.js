import EmployeeAttendance from "../../../apiEndPoint/Employee/Attendance";
import { APIrequest } from "../../axios";


export const EmployeeAttendanceServices = {
  createAttendance: async (bodyData) => {
    try {
      const payload = {
        ...EmployeeAttendance.createAttendance,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  updateAttendance: async (id, bodyData) => {
    try {
      const payload = {
        ...EmployeeAttendance.updateAttendanceById(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  deleteAttendance: async (id) => {
    try {
      const payload = {
        ...EmployeeAttendance.deleteAttendanceById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  getAttendanceById: async (id) => {
    try {
      const payload = {
        ...EmployeeAttendance.getAttendanceById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
  getAllAttendance: async (queryParams) => {
    try {
      const payload = {
        ...EmployeeAttendance.getAllAttendance,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
}