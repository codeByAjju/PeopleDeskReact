const SuperAdminLocation = {
    getAllLocation: {
        method: "GET",
        url: "/location/list",
    },
    getLocationById: (id) => ({
        url: `/location/${id}`,
        method: "GET",
    }),
};
export default SuperAdminLocation;
