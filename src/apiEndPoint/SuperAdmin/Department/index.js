const SuperAdminDepartment = {
    getAllDepartment: {
        method: "GET",
        url: "/department/list",
    },
    createDepartment: {
        method: "POST",
        url: "/depdepartment/create",
    },
    editDepartment: {
        method: "PUT",
        url: "/department-update/:id",
    },
    deleteDepartment: {
        method: "PATCH",
        url: "/department-delete/:id",
    },
    departmentDetails: {
        method: "GET",
        url: "/department/:id",
    },
};
export default SuperAdminDepartment;
