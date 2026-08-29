const SuperAdminCity = {
    getCitiesByStateId: (stateId) => ({
        url: `/city/state/${stateId}`,
        method: "GET",
    }),
    getCityById: (id) => ({
        url: `/city/${id}`,
        method: "GET",
    }),
};
export default SuperAdminCity;
