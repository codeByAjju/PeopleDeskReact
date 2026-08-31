const SuperAdminShift = {
    getAllShift: {
        method: "GET",
        url: "/shift/list",
    },
    getShiftById: (id) => ({
        url: `/shift/${id}`,
        method: "GET",
    }),
    createShift: {
        method: "POST",
        url: "/shift/create",
    },
    updateShift: (id) => ({
        method: "PUT",
        url: `/shift-update/${id}`,
    }),
    deleteShift: (id) => ({
        method: "PATCH",
        url: `/shift-delete/${id}`,
    }),
    shiftStats: (shiftId) => ({
        method: "GET",
        url: `/shift/${shiftId}/stats`,
    }),
};
export default SuperAdminShift;
