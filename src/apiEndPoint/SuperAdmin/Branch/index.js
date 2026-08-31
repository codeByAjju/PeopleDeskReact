const SuperAdminBranch = {
    getAllBranch: {
        method: "GET",
        url: "/branch/list",
    },
    branchGlobalStats: {
        method: "GET",
        url: "/branch/stats",
    },
    createBranch: {
        method: "POST",
        url: "/branch/create",
    },
    branchDetailsByBranchId: (id) => ({
        method: "GET",
        url: `/branch/${id}`,
    }),
    branchDetailsByCityId: (cityId) => ({
        method: "GET",
        url: `/branch/city/${cityId}`,
    }),
    branchDetailsByStateId: (stateId) => ({
        method: "GET",
        url: `/branch/state/${stateId}`,
    }),
    branchDetailsByCountryId: (countryId) => ({
        method: "GET",
        url: `/branch/country/${countryId}`,
    }),
    getEmployeeByBranchId: (branchId) => ({
        method: "GET",
        url: `/branch/${branchId}/employees`,
    }),
    branchStats: (branchId) => ({
        method: "GET",
        url: `/branch/${branchId}/stats`,
    }),
    updateBranch: (id) => ({
        method: "PUT",
        url: `/branch-update/${id}`,
    }),
    deleteBranch: (id) => ({
        method: "PATCH",
        url: `/branch-delete/${id}`,
    }),
};
export default SuperAdminBranch;
