const SuperAdminState = {
    getStatesByCountryId: (countryId) => ({
        url: `/state/country/${countryId}`,
        method: "GET",
    }),
    getStateById: (id) => ({
        url: `/state/${id}`,
        method: "GET",
    }),
};
export default SuperAdminState;
