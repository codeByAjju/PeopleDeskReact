const SuperAdminDesignation = {
    getAllDesignation: {
        method: "GET",
        url: "/designation/list",
    },
    getDesignationsByDepartmentId: (departmentId) => ({
        method: "GET",
        url: `/designation/department/${departmentId}`,
    }),
    designationStats: {
        method: "GET",
        url: "/designation/stats",
    },
    createDesignation: {
        method: "POST",
        url: "/designation/create",
    },
    designationDetails: (id) => ({
        method: "GET",
        url: `/designation/${id}`,
    }),
    updateDesignation: (id) => ({
        method: "PUT",
        url: `/designation-update/${id}`,
    }),
    deleteDesignation: (id) => ({
        method: "PATCH",
        url: `/designation-delete/${id}`,
    }),
};
export default SuperAdminDesignation;
