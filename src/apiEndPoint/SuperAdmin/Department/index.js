const SuperAdminDepartment = {
    getAllDepartment: {
        method: "GET",
        url: "/department/list",
    },
    createDepartment: {
        method: "POST",
        url: "/department/create",
    },
    departmentStats: {
        method: "GET",
        url: "/department/stats",
    },
    editDepartment: (id) => ({
        method: "PUT",
        url: `/department-update/${id}`,
    }),
    deleteDepartment: (id) => ({
        method: "PATCH",
        url: `/department-delete/${id}`,
    }),
    departmentDetails: (id) => ({
        method: "GET",
        url: `/department/${id}`,
    }),
};
export default SuperAdminDepartment;
