const SuperAdminLocation = {
    getAllLocation: {
        method: "GET",
        url: "/location/list",
    },
    getLocationById: (id) => ({
        url: `/location/${id}`,
        method: "GET",
    }),
    createLocation: {
        method: "POST",
        url: "/location/create",
    },
    updateLocation: (id) => ({
        method: "PUT",
        url: `/location-update/${id}`,
    }),
    deleteLocation: (id) => ({
        method: "PATCH",
        url: `/location-delete/${id}`,
    }),
    getLocationByBranchId: (branchId) => ({
        method: "GET",
        url: `/location/branch/${branchId}`,
    }),
    locationGlobalStats: {
        method: "GET",
        url: "/location/stats",
    },
    locationStats: (locationId) => ({
        method: "GET",
        url: `/location/${locationId}/stats`,
    }),
    getAllBranchesByLocationId: (locationId) => ({
        method: "GET",
        url: `/location/${locationId}/branches`,
    }), getAllEmployeesByLocationId: (locationId) => ({
        method: "GET",
        url: `/location/${locationId}/employees`,
    }),
    restoreLocationById: (id) => ({
        method: "PATCH",
        url: `/location-restore/${id}`,
    })

};
export default SuperAdminLocation;
