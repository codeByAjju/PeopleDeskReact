const SuperAdminDesignation = {
    getAllDesignation: {
        method: "GET",
        url: "/designation/list",
    },
    getDesignationsByDepartmentId: (departmentId) => ({
        method: "GET",
        url: `/designation/department/${departmentId}`,
    }),
};
export default SuperAdminDesignation;
