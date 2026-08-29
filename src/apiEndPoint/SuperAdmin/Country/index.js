const SuperAdminCountry = {
    getAllCountry: {
        method: "GET",
        url: "/country/list",
    },
    getCountryById: (id) => ({
        url: `/country/${id}`,
        method: "GET",
    }),
};
export default SuperAdminCountry;
