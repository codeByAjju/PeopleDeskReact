import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { SweetAlert } from "../../../../components/UiElement/SweetAlert";
import { useDebounce } from "../../../../hooks";
import { SuperAdminBranchServices } from "../../../../Services/SuperAdmin/Branch/index.service";
import { AdminBranchDashboard, AdminBranchDetail, Badge, DataTable } from "../../../../components";
import { Modal } from "../../../../components/UiElement";
import { SuperAdminCountryServices } from "../../../../Services/SuperAdmin/Country/index.service";
import { SuperAdminStateServices } from "../../../../Services/SuperAdmin/State/index.service";
import { SuperAdminCityServices } from "../../../../Services/SuperAdmin/City/index.service";

function SuperAdminBranchDashboard() {
    const [dashboardStats, setDashboardStats] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, totalItems: 0 });
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, order: "desc" });
    const [colFilters, setColFilters] = useState({});
    const [debounceFlushKey, setDebounceFlushKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [branches, setBranches] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("view"); // "view" | "edit" | "create"
    const [selectedBranchId, setSelectedBranchId] = useState(null);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const debouncedSearch = useDebounce(searchQuery, 900, debounceFlushKey);
    const debouncedColFilters = useDebounce(colFilters, 900, debounceFlushKey);

    const handleClose = () => {
        setShowModal(false);
        setSelectedBranchId(null);
    };

    const fetchCountries = async () => {
        try {
            const res = await SuperAdminCountryServices.superAdminGetAllCountry();
            setCountries(res?.data?.result?.countries || res?.data?.result || []);
        } catch (error) {
            toast.error("Error fetching country data");
        }
    };

    const fetchBranches = useCallback(async () => {
        setLoading(true);
        try {
            const res = await SuperAdminBranchServices.superAdminGetAllBranch({
                search: debouncedSearch,
                limit: pagination.limit,
                page: pagination.page,
                sortBy: sortConfig.key,
                sortOrder: sortConfig.order,
                filters: debouncedColFilters,
            });
            const result = res?.data?.result;
            const branchList = result?.branches || (Array.isArray(result) ? result : []);
            const total = result?.pagination?.totalItems ?? result?.total ?? branchList.length;
            setBranches(branchList);
            setPagination((prev) => ({ ...prev, totalItems: total }));
        } catch (error) {
            toast.error("Error fetching branch data");
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.limit, debouncedSearch, sortConfig, debouncedColFilters]);

    const handleDelete = async (branch) => {
        const confirmed = await SweetAlert.confirm({
            title: "Delete Branch",
            text: "Are you sure you want to delete this branch?",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (confirmed) {
            const res = await SuperAdminBranchServices.superAdminDeleteBranch(branch?.id);
            if (res?.status === 200) {
                toast.success("Branch deleted successfully");
                fetchBranches();
            } else {
                toast.error("Error deleting branch");
            }
        }
    };

    const fetchDashBoardStats = useCallback(async () => {
        try {
            const res = await SuperAdminBranchServices.superAdminBranchGlobalStats();
            setDashboardStats(res?.data?.result);
        } catch (error) {
            toast.error("Error fetching branch stats");
        }
    }, []);

    const handleView = (branch) => {
        setSelectedBranchId(branch?.id);
        setModalMode("view");
        setShowModal(true);
    };

    const handleEdit = (branch) => {
        setSelectedBranchId(branch?.id);
        setModalMode("edit");
        setShowModal(true);
    };

    const handleCreate = () => {
        setSelectedBranchId(null);
        setModalMode("create");
        setShowModal(true);
    };

    useEffect(() => {
        fetchBranches();
    }, [fetchBranches]);

    useEffect(() => {
        fetchDashBoardStats();
    }, [fetchDashBoardStats]);

    useEffect(() => {
        fetchCountries();
    }, []);

    const branchTableData = useMemo(() => ({
        columns: [
            { title: "#", key: "srNo" },
            { title: "Branch Name", key: "name", sorting: true, filter: true },
            { title: "Code", key: "code", sorting: true, filter: true },
            { title: "Phone", key: "phoneNumber", sorting: false, filter: false },
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
        rows: branches?.map((branch, index) => ({
            ...branch,
            srNo: (pagination.page - 1) * pagination.limit + index + 1,
            status: (
                <Badge extraClass={`dt-badge dt-badge-${branch.status}`} label={branch.status} />
            ),
            action: (
                <ul className="nk-tb-actions gx-1 d-flex flex-row justify-content-center align-items-center list-unstyled gap-2 mb-0 w-100">
                    <li>
                        <button type="button" className="btn btn-icon btn-trigger" title="View Details" onClick={() => handleView(branch)}>
                            <em className="bi bi-eye" style={{ color: "#364a63" }} />
                        </button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-icon btn-trigger" title="Edit" onClick={() => handleEdit(branch)}>
                            <em className="bi bi-pencil" style={{ color: "#364a63" }} />
                        </button>
                    </li>
                    <li>
                        <button disabled={branch.status === "deleted"} type="button" className="btn btn-icon btn-trigger" title="Delete" onClick={() => handleDelete(branch)}>
                            <em className="bi bi-trash" style={{ color: branch.status === "deleted" ? "gray" : "#e85347", border: branch.status === "deleted" ? "none" : "#e85347" }} />
                        </button>
                    </li>
                </ul>
            ),
        })),
    }), [branches, pagination.page, pagination.limit]);

    return (
        <>
            <AdminBranchDashboard dashboardStats={dashboardStats} onCreateClick={handleCreate} />
            <div className="container-fluid px-4 pb-4">
                <div className="mt-4">
                    <DataTable
                        options={branchTableData}
                        title="Branch Records"
                        searchPlaceholder="Search branches..."
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
                <Modal
                    headingText={
                        <div className="d-flex align-items-center gap-3">
                            <div className="designation-header-icon-box">
                                <i className="bi bi-building" aria-hidden="true" />
                            </div>
                            <div>
                                <h5 className="designation-modal-title mb-0">
                                    {modalMode === "create" ? "Create Branch" : modalMode === "edit" ? "Edit Branch" : "Branch Details"}
                                </h5>
                            </div>
                        </div>
                    }
                    size="lg"
                    show={showModal}
                    handleClose={handleClose}
                    extraClass="designation-custom-modal"
                >
                    <AdminBranchDetail
                        countries={countries}
                        branchId={selectedBranchId}
                        mode={modalMode}
                        onClose={handleClose}
                        onSuccess={() => {
                            handleClose();
                            fetchBranches();
                        }}
                    />
                </Modal>
            </div>
        </>
    );
}

export default SuperAdminBranchDashboard;
