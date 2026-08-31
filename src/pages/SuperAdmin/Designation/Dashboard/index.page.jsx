import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { SweetAlert } from "../../../../components/UiElement/SweetAlert";
import { useDebounce } from "../../../../hooks";
import { SuperAdminDesignationServices } from "../../../../Services/SuperAdmin/Designation/index.service";
import { AdminDepartmentDashboard, AdminDepartmentDetail, AdminDesignationDashboard, AdminDesignationDetail, Badge, DataTable } from "../../../../components";
import { Modal } from "../../../../components/UiElement";
import { SuperAdminDepartmentServices } from "../../../../Services/SuperAdmin/Department/index.service";

function SuperAdminDesignationDashboard() {
    const [dashboardStats, setDashboardStats] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, totalItems: 0 });
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, order: "desc" });
    const [colFilters, setColFilters] = useState({});
    const [debounceFlushKey, setDebounceFlushKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [designations, setDesignations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("view"); // "view" | "edit" | "create"
    const [selectedDesignationId, setSelectedDesignationId] = useState(null);
    const [departments, setDepartments] = useState([]);
    const debouncedSearch = useDebounce(searchQuery, 900, debounceFlushKey);
    const debouncedColFilters = useDebounce(colFilters, 900, debounceFlushKey);

    const handleClose = () => {
        setShowModal(false);
        setSelectedDesignationId(null);
    };

    const fetchDepartments = async () => {
        try {
            const res = await SuperAdminDepartmentServices.superAdminGetAllDepartment()
            setDepartments(res?.data?.result?.departments)
        } catch (error) {
            toast.error("Error fetching department data");
        }
    }
    const fetchDesignations = useCallback(async () => {
        setLoading(true);
        try {
            const res = await SuperAdminDesignationServices.superAdminGetAllDesignation({
                search: debouncedSearch,
                limit: pagination.limit,
                page: pagination.page,
                sortBy: sortConfig.key,
                sortOrder: sortConfig.order,
                filters: debouncedColFilters,
            });
            const result = res?.data?.result;
            const designationList = result?.designations || (Array.isArray(result) ? result : []);
            const total = result?.pagination?.totalItems ?? result?.total ?? designationList.length;
            setDesignations(designationList);
            setPagination((prev) => ({ ...prev, totalItems: total }));
        } catch (error) {
            toast.error("Error fetching designation data");
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.limit, debouncedSearch, sortConfig, debouncedColFilters]);

    const handleDelete = async (designation) => {
        const confirmed = await SweetAlert.confirm({
            title: "Delete Designation",
            text: "Are you sure you want to delete this designation?",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (confirmed) {
            const res = await SuperAdminDesignationServices.superAdminDeleteDesignation(designation?.id);
            if (res?.status === 200) {
                toast.success("Designation deleted successfully");
                fetchDesignations();
            } else {
                toast.error("Error deleting designation");
            }
        }
    };

    const fetchDashBoardStats = useCallback(async () => {
        try {
            const res = await SuperAdminDesignationServices.superAdminDesignationStats();
            setDashboardStats(res?.data?.result)
        } catch (error) {
            toast.error("Error fetching designation data");
        }
    }, []);

    const handleView = (designation) => {
        setSelectedDesignationId(designation?.id);
        setModalMode("view");
        setShowModal(true);
    };

    const handleEdit = (designation) => {
        setSelectedDesignationId(designation?.id);
        setModalMode("edit");
        setShowModal(true);
    };

    const handleCreate = () => {
        setSelectedDesignationId(null);
        setModalMode("create");
        setShowModal(true);
    };

    useEffect(() => {
        fetchDesignations();
    }, [fetchDesignations]);

    useEffect(() => {
        fetchDashBoardStats();
    }, [fetchDashBoardStats])
    useEffect(() => {
        fetchDepartments();
    }, [])

    const designationTableData = useMemo(() => ({
        columns: [
            { title: "#", key: "srNo" },
            { title: "Designation Name", key: "name", sorting: true, filter: true },
            { title: "Description", key: "description", sorting: true, filter: true },
            { title: "Code", key: "code", sorting: true, filter: true },
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
        rows: designations?.map((designation, index) => ({
            ...designation,
            srNo: (pagination.page - 1) * pagination.limit + index + 1,
            status: (
                <Badge extraClass={`dt-badge dt-badge-${designation.status}`} label={designation.status} />
            ),
            action: (
                <ul className="nk-tb-actions gx-1 d-flex flex-row justify-content-center align-items-center list-unstyled gap-2 mb-0 w-100">
                    <li>
                        <button type="button" className="btn btn-icon btn-trigger" title="View Details" onClick={() => handleView(designation)}>
                            <em className="bi bi-eye" style={{ color: "#364a63" }} />
                        </button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-icon btn-trigger" title="Edit" onClick={() => handleEdit(designation)}>
                            <em className="bi bi-pencil" style={{ color: "#364a63" }} />
                        </button>
                    </li>
                    <li>
                        <button disabled={designation.status === "deleted"} type="button" className="btn btn-icon btn-trigger" title="Delete" onClick={() => handleDelete(designation)}>
                            <em className="bi bi-trash" style={{ color: designation.status === "deleted" ? "gray" : "#e85347", border: designation.status === "deleted" ? "none" : "#e85347" }} />
                        </button>
                    </li>
                </ul>
            ),
        })),
    }), [designations, pagination.page, pagination.limit]);

    return (
        <>
            <AdminDesignationDashboard dashboardStats={dashboardStats} onCreateClick={handleCreate} />
            <div className="container-fluid px-4 pb-4">
                <div className="mt-4">
                    <DataTable
                        options={designationTableData}
                        title="Designation Records"
                        searchPlaceholder="Search designations..."
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
                                <i className="bi bi-hash" aria-hidden="true" />
                            </div>
                            <div>
                                <h5 className="designation-modal-title mb-0">
                                    {modalMode === "create" ? "Create Designation" : modalMode === "edit" ? "Edit Designation" : "Designation Details"}
                                </h5>
                            </div>
                        </div>
                    }
                    size="lg"
                    show={showModal}
                    handleClose={handleClose}
                    extraClass="designation-custom-modal"
                >
                    <AdminDesignationDetail
                        departments={departments}
                        designationId={selectedDesignationId}
                        mode={modalMode}
                        onClose={handleClose}
                        onSuccess={() => {
                            handleClose();
                            fetchDesignations();
                        }}
                    />
                </Modal>
            </div>
        </>
    );
}

export default SuperAdminDesignationDashboard;
