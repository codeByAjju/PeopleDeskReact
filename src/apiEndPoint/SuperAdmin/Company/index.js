const SuperAdminCompany = {
    getAllCompany: {
        method: "GET",
        url: "/company/list"
    },
    createCompany: {
        method: "POST",
        url: "/company/create"
    },
    updateCompanyById: (id) => ({
        url: `/company-update/${id}`,
        method: "PUT",
    }),
    deleteCompanyById: (id) => ({
        url: `/company-delete/${id}`,
        method: "PATCH",
    }),
    getCompanyById: (id) => ({
        url: `/company/${id}`,
        method: "GET",
    }),
}
export default SuperAdminCompany;