const EmployeeAttendance = {
    getAllAttendance: {
        method: "GET",
        url: "/attendance/list"
    },
    createAttendance: {
        method: "POST",
        url: "/attendance/create"
    },
    updateAttendanceById: (id) => ({
        url: `/attendance-update/${id}`,
        method: "PUT",
    }),
    deleteAttendanceById: (id) => ({
        url: `/attendance-delete/${id}`,
        method: "PATCH",
    }),
    getAttendanceById: (id) => ({
        url: `/attendance/${id}`,
        method: "GET",
    }),
}
export default EmployeeAttendance;