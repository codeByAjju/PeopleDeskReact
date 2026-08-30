import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { SweetAlert } from "../../../../components/UiElement/SweetAlert";
import { useDebounce } from "../../../../hooks";
import { SuperAdminDepartmentServices } from "../../../../Services/SuperAdmin/Department/index.service";
import { AdminDepartmentDashboard, AdminDepartmentDetail, Badge, DataTable } from "../../../../components";
import { Modal } from "../../../../components/UiElement";

function SuperAdminDepartmentDashboard() {
    const [dashboardStats, setDashboardStats] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, totalItems: 0 });
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, order: "desc" });
    const [colFilters, setColFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("view"); // "view" | "edit" | "create"
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

    const debouncedSearch = useDebounce(searchQuery, 900);
    const debouncedColFilters = useDebounce(colFilters, 900);

    const handleClose = () => {
        setShowModal(false);
        setSelectedDepartmentId(null);
    };

    const fetchDepartments = useCallback(async () => {
        setLoading(true);
        try {
            const res = await SuperAdminDepartmentServices.superAdminGetAllDepartment({
                search: debouncedSearch,
                limit: pagination.limit,
                page: pagination.page,
                sortBy: sortConfig.key,
                sortOrder: sortConfig.order,
                filters: debouncedColFilters,
            });
            const result = res?.data?.result;
            const departmentsList = result?.departments || (Array.isArray(result) ? result : []);
            const total = result?.pagination?.totalItems ?? result?.total ?? departmentsList.length;
            setDepartments(departmentsList);
            setPagination((prev) => ({ ...prev, totalItems: total }));
        } catch (error) {
            toast.error("Error fetching department data");
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.limit, debouncedSearch, sortConfig, debouncedColFilters]);

    const handleDelete = async (department) => {
        const confirmed = await SweetAlert.confirm({
            title: "Delete Department",
            text: "Are you sure you want to delete this department?",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (confirmed) {
            const res = await SuperAdminDepartmentServices.superAdminDeleteDepartment(department?.id);
            if (res?.status === 200) {
                toast.success("Department deleted successfully");
                fetchDepartments();
            } else {
                toast.error("Error deleting department");
            }
        }
    };

    const fetchDashBoardStats = useCallback(async () => {
        try {
            const res = await SuperAdminDepartmentServices.superAdminDepartmentStats();
            setDashboardStats(res?.data?.result)
        } catch (error) {
            toast.error("Error fetching department data");
        }
    }, []);

    const handleView = (department) => {
        setSelectedDepartmentId(department?.id);
        setModalMode("view");
        setShowModal(true);
    };

    const handleEdit = (department) => {
        setSelectedDepartmentId(department?.id);
        setModalMode("edit");
        setShowModal(true);
    };

    const handleCreate = () => {
        setSelectedDepartmentId(null);
        setModalMode("create");
        setShowModal(true);
    };

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);

    useEffect(() => {
        fetchDashBoardStats();
    }, [fetchDashBoardStats])

    const departmentTableData = useMemo(() => ({
        columns: [
            { title: "#", key: "srNo" },
            { title: "Department Name", key: "name", sorting: true, filter: true },
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
        rows: departments?.map((department, index) => ({
            ...department,
            srNo: (pagination.page - 1) * pagination.limit + index + 1,
            status: (
                <Badge extraClass={`dt-badge dt-badge-${department.status}`} label={department.status} />
            ),
            action: (
                <ul className="nk-tb-actions gx-1 d-flex flex-row justify-content-center align-items-center list-unstyled gap-2 mb-0 w-100">
                    <li>
                        <button type="button" className="btn btn-icon btn-trigger" title="View Details" onClick={() => handleView(department)}>
                            <em className="bi bi-eye" style={{ color: "#364a63" }} />
                        </button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-icon btn-trigger" title="Edit" onClick={() => handleEdit(department)}>
                            <em className="bi bi-pencil" style={{ color: "#364a63" }} />
                        </button>
                    </li>
                    <li>
                        <button disabled={department.status === "deleted"} type="button" className="btn btn-icon btn-trigger" title="Delete" onClick={() => handleDelete(department)}>
                            <em className="bi bi-trash" style={{ color: department.status === "deleted" ? "gray" : "#e85347", border: department.status === "deleted" ? "none" : "#e85347" }} />
                        </button>
                    </li>
                </ul>
            ),
        })),
    }), [departments, pagination.page, pagination.limit]);

    return (
        <>
            <AdminDepartmentDashboard dashboardStats={dashboardStats} onCreateClick={handleCreate} />
            <div className="container-fluid px-4 pb-4">
                <div className="mt-4">
                    <DataTable
                        options={departmentTableData}
                        title="Department Records"
                        searchPlaceholder="Search departments..."
                        loading={loading}
                        searchQuery={searchQuery}
                        onSearchChange={(val) => {
                            setSearchQuery(val);
                            setPagination((p) => ({ ...p, page: 1 }));
                        }}
                        sortConfig={sortConfig}
                        onSortChange={(cfg) => {
                            setSortConfig(cfg);
                            setPagination((p) => ({ ...p, page: 1 }));
                        }}
                        colFilters={colFilters}
                        onColFilterChange={(key, val) => {
                            setColFilters((prev) => ({ ...prev, [key]: val }));
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
                            <div className="dept-header-icon-box">
                                <i className="bi bi-building" aria-hidden="true" />
                            </div>
                            <div>
                                <h5 className="dept-modal-title mb-0">
                                    {modalMode === "create" ? "Create Department" : modalMode === "edit" ? "Edit Department" : "Department Details"}
                                </h5>
                                <p className="dept-modal-subtitle mb-0">
                                    {modalMode === "create" ? "Add a new department to the system" : modalMode === "edit" ? "Update department attributes" : "Overview of department properties"}
                                </p>
                            </div>
                        </div>
                    }
                    size="lg"
                    show={showModal}
                    handleClose={handleClose}
                    extraClass="department-custom-modal"
                >
                    <AdminDepartmentDetail
                        departmentId={selectedDepartmentId}
                        mode={modalMode}
                        onClose={handleClose}
                        onSuccess={() => {
                            handleClose();
                            fetchDepartments();
                        }}
                    />
                </Modal>
            </div>
        </>
    );
}

export default SuperAdminDepartmentDashboard;
