const SuperAdminEmployee = {
    getAllEmployee: {
        method: "GET",
        url: "/employee/list"
    },
    createEmployee: {
        method: "POST",
        url: "/employee/create"
    },
    updateEmployeeById: (id) => ({
        url: `/employee-update/${id}`,
        method: "PUT",
    }),
    deleteEmployeeById: (id) => ({
        url: `/employee-delete/${id}`,
        method: "PATCH",
    }),
    restoreEmployeeById: (id) => ({
        url: `/employee-restore/${id}`,
        method: "PATCH",
    }),
    updateEmployeeStatus: (id) => ({
        url: `/employee-status/${id}`,
        method: "PATCH",
    }),
    getEmployeeById: (id) => ({
        url: `/employee/${id}`,
        method: "GET",
    }),
}
export default SuperAdminEmployee;
