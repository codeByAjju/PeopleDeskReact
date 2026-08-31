import { Badge, DataTable } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AdminCompanyDashboard } from "../../../../components";
import { SuperAdminCompanyServices } from "../../../../Services/SuperAdmin/Company/index.service";
import { SweetAlert } from "../../../../components/UiElement/SweetAlert";
import { useDebounce } from "../../../../hooks";

function SuperAdminCompanyDashboard() {
    const [pagination, setPagination] = useState({ page: 1, limit: 10, totalItems: 0 });
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, order: "desc" });
    const [colFilters, setColFilters] = useState({});
    const [debounceFlushKey, setDebounceFlushKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();

    // Debounce search query and column filters to prevent redundant API calls
    const debouncedSearch = useDebounce(searchQuery, 900, debounceFlushKey);
    const debouncedColFilters = useDebounce(colFilters, 900, debounceFlushKey);

    const fetchCompanies = useCallback(async () => {
        setLoading(true);
        try {
            const res = await SuperAdminCompanyServices.superAdminGetAllCompany({
                search: debouncedSearch,
                limit: pagination.limit,
                page: pagination.page,
                sortBy: sortConfig.key,
                sortOrder: sortConfig.order,
                filters: debouncedColFilters,
            });
            const result = res?.data?.result;
            const companiesList = result?.companies || (Array.isArray(result) ? result : []);
            const total = result?.pagination?.totalItems ?? result?.total ?? companiesList.length;

            setCompanies(companiesList);
            setPagination((prev) => ({ ...prev, totalItems: total }));
        } catch (error) {
            toast.error("Error fetching company data");
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.limit, debouncedSearch, sortConfig, debouncedColFilters]);

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    const handleView = (company) => {
        navigate(`/superAdmin/company/${company.id}`);
    };

    const handleEdit = (company) => {
        navigate(`/superAdmin/edit-company/${company.id}`);
    };

    const handleDelete = async (company) => {
        const confirmed = await SweetAlert.confirm({
            title: "Delete Company",
            text: "Are you sure you want to delete this company?",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (confirmed) {
            const res = await SuperAdminCompanyServices.superAdminDeleteCompanyById(
                company.id
            );
            if (res?.status === 200) {
                toast.success("Company deleted successfully");
                fetchCompanies();
            } else {
                toast.error("Error deleting company");
            }
        }
    };

    const companyTableData = useMemo(() => ({
        columns: [
            { title: "#", key: "srNo" },
            { title: "Company Name", key: "name", sorting: true, filter: true },
            { title: "Email", key: "email", sorting: true, filter: true },
            { title: "Phone Number", key: "phoneNumber", sorting: true, filter: true },
            { title: "Postal Code", key: "postalCode", sorting: true, filter: true },
            {
                title: "Status",
                key: "status",
                sorting: true,
                filter: true,
                filterType: "select",
                filterOptions: [
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                    { label: "Deleted", value: "deleted" },
                ],
            },
            { title: "Action", key: "action", extraClass: "text-center" },
        ],
        rows: companies?.map((company, index) => ({
            ...company,
            srNo: (pagination.page - 1) * pagination.limit + index + 1,
            status: (
                <Badge extraClass={`dt-badge dt-badge-${company.status}`} label={company.status} />
            ),
            action: (
                <ul className="nk-tb-actions gx-1 d-flex flex-row justify-content-center align-items-center list-unstyled gap-2 mb-0 w-100">
                    <li>
                        <button type="button" className="btn btn-icon btn-trigger" title="View Details" onClick={() => handleView(company)}>
                            <em className="bi bi-eye" style={{ color: "#364a63" }} />
                        </button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-icon btn-trigger" title="Edit" onClick={() => handleEdit(company)}>
                            <em className="bi bi-pencil" style={{ color: "#364a63" }} />
                        </button>
                    </li>
                    <li>
                        <button disabled={company.status === "deleted"} type="button" className="btn btn-icon btn-trigger" title="Delete" onClick={() => handleDelete(company)}>
                            <em className="bi bi-trash" style={{ color: company.status === "deleted" ? "gray" : "#e85347", border: company.status === "deleted" ? "none" : "#e85347" }} />
                        </button>
                    </li>
                </ul>
            ),
        })),
    }), [companies, pagination.page, pagination.limit]);

    return (
        <>
            <AdminCompanyDashboard />
            <div className="container-fluid px-4 pb-4">
                <div className="mt-4">
                    <DataTable
                        options={companyTableData}
                        title="Company Records"
                        searchPlaceholder="Search companies..."
                        loading={loading}
                        searchQuery={searchQuery}
                        onSearchChange={(val, meta) => {
                            setSearchQuery(val);
                            if (meta?.immediate) setDebounceFlushKey((key) => key + 1);
                            setPagination((p) => ({ ...p, page: 1 }));
                        }}
                        sortConfig={sortConfig}
                        onSortChange={(cfg) => {
                            setSortConfig(cfg);
                            setPagination((p) => ({ ...p, page: 1 }));
                        }}
                        colFilters={colFilters}
                        onColFilterChange={(key, val, meta) => {
                            setColFilters((prev) => ({ ...prev, [key]: val }));
                            if (meta?.immediate) setDebounceFlushKey((flushKey) => flushKey + 1);
                            setPagination((p) => ({ ...p, page: 1 }));
                        }}
                        currentPage={pagination.page}
                        rowsPerPage={pagination.limit}
                        totalItems={pagination.totalItems}
                        onPageChange={(p) => setPagination((prev) => ({ ...prev, page: p }))}
                        onRowsPerPageChange={(limit) => setPagination((prev) => ({ ...prev, page: 1, limit }))}
                    />
                </div>
            </div>
        </>
    );
}

export default SuperAdminCompanyDashboard;
