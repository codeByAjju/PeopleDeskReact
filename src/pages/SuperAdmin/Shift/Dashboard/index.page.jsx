import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { SweetAlert } from "../../../../components/UiElement/SweetAlert";
import { useDebounce } from "../../../../hooks";
import { AdminLocationDashboard, AdminLocationDetail, AdminShiftDashboard, AdminShiftDetail, Badge, DataTable } from "../../../../components";
import { Modal } from "../../../../components/UiElement";
import { SuperAdminCountryServices } from "../../../../Services/SuperAdmin/Country/index.service";
import { SuperAdminLocationServices } from "../../../../Services/SuperAdmin/Location/index.service";
import { SuperAdminBranchServices } from "../../../../Services/SuperAdmin/Branch/index.service";
import { SuperAdminShiftServices } from "../../../../Services/SuperAdmin/Shift/index.service";

function SuperAdminShiftDashboard() {
    const [dashboardStats, setDashboardStats] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, totalItems: 0 });
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, order: "desc" });
    const [colFilters, setColFilters] = useState({});
    const [debounceFlushKey, setDebounceFlushKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [shifts, setShifts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("view"); // "view" | "edit" | "create"
    const [selectedShiftId, setSelectedShiftId] = useState(null);
    const debouncedSearch = useDebounce(searchQuery, 900, debounceFlushKey);
    const debouncedColFilters = useDebounce(colFilters, 900, debounceFlushKey);
    const handleClose = () => {
        setShowModal(false);
        setSelectedShiftId(null);
    };


    const fetchShift = useCallback(async () => {
        setLoading(true);
        try {
            const res = await SuperAdminShiftServices.superAdminGetAllShift({
                search: debouncedSearch,
                limit: pagination.limit,
                page: pagination.page,
                sortBy: sortConfig.key,
                sortOrder: sortConfig.order,
                filters: debouncedColFilters,
            });
            const result = res?.data?.result;
            const shiftList = result?.shifts || (Array.isArray(result) ? result : []);
            console.log("shiftList", shiftList)
            const shiftData = shiftList?.map(shift => {
                return {
                    ...shift,
                    branchName: shift?.branch?.name,
                    branchId: shift?.branch?.name,
                }
            })
            const total = result?.pagination?.totalItems ?? result?.total ?? shiftList.length;
            setShifts(shiftData);
            setPagination((prev) => ({ ...prev, totalItems: total }));
        } catch (error) {
            toast.error("Error fetching shift data");
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.limit, debouncedSearch, sortConfig, debouncedColFilters]);

    const handleDelete = async (shift) => {
        const confirmed = await SweetAlert.confirm({
            title: "Delete Shift",
            text: "Are you sure you want to delete this shift?",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (confirmed) {
            const res = await SuperAdminShiftServices.superAdminDeleteShift(shift?.id);
            if (res?.status === 200) {
                toast.success("Shift deleted successfully");
                fetchShift();
            } else {
                toast.error("Error deleting shift");
            }
        }
    };

    const fetchDashBoardStats = useCallback(async () => {
        try {
            const res = await SuperAdminLocationServices.superAdminLocationGlobalStats();
            setDashboardStats(res?.data?.result);
        } catch (error) {
            toast.error("Error fetching location stats");
        }
    }, []);

    const handleView = (shift) => {
        setSelectedShiftId(shift?.id);
        setModalMode("view");
        setShowModal(true);
    };

    const handleEdit = (shift) => {
        setSelectedShiftId(shift?.id);
        setModalMode("edit");
        setShowModal(true);
    };

    const handleCreate = () => {
        setSelectedShiftId(null);
        setModalMode("create");
        setShowModal(true);
    };

    useEffect(() => {
        fetchShift();
    }, [fetchShift]);

    useEffect(() => {
        fetchDashBoardStats();
    }, [fetchDashBoardStats]);


    const shiftTableData = useMemo(() => ({
        columns: [
            { title: "#", key: "srNo" },
            { title: "Shift Name", key: "name", sorting: true, filter: true },
            { title: "Code", key: "code", sorting: true, filter: true },
            { title: "Start Time", key: "startTime", sorting: true, filter: true },
            { title: "End Time", key: "endTime", sorting: true, filter: true },
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
        rows: shifts?.map((shift, index) => ({
            ...shift,
            srNo: (pagination.page - 1) * pagination.limit + index + 1,
            status: (
                <Badge extraClass={`dt-badge dt-badge-${shift.status}`} label={shift.status} />
            ),
            action: (
                <ul className="nk-tb-actions gx-1 d-flex flex-row justify-content-center align-items-center list-unstyled gap-2 mb-0 w-100">
                    <li>
                        <button type="button" className="btn btn-icon btn-trigger" title="View Details" onClick={() => handleView(shift)}>
                            <em className="bi bi-eye" style={{ color: "#364a63" }} />
                        </button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-icon btn-trigger" title="Edit" onClick={() => handleEdit(shift)}>
                            <em className="bi bi-pencil" style={{ color: "#364a63" }} />
                        </button>
                    </li>
                    <li>
                        <button disabled={shift.status === "deleted"} type="button" className="btn btn-icon btn-trigger" title="Delete" onClick={() => handleDelete(shift)}>
                            <em className="bi bi-trash" style={{ color: shift.status === "deleted" ? "gray" : "#e85347", border: shift.status === "deleted" ? "none" : "#e85347" }} />
                        </button>
                    </li>
                </ul>
            ),
        })),
    }), [shifts, pagination.page, pagination.limit]);

    return (
        <>
            <AdminShiftDashboard dashboardStats={dashboardStats} onCreateClick={handleCreate} />
            <div className="container-fluid px-4 pb-4">
                <div className="mt-4">
                    <DataTable
                        options={shiftTableData}
                        title="Shift Records"
                        searchPlaceholder="Search shifts..."
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
                                    {modalMode === "create" ? "Create Shift" : modalMode === "edit" ? "Edit Shift" : "Shift Details"}
                                </h5>
                            </div>
                        </div>
                    }
                    size="lg"
                    show={showModal}
                    handleClose={handleClose}
                    extraClass="designation-custom-modal"
                >
                    <AdminShiftDetail
                        shiftId={selectedShiftId}
                        mode={modalMode}
                        onClose={handleClose}
                        onSuccess={() => {
                            handleClose();
                            fetchShift();
                        }}
                    />
                </Modal>
            </div>
        </>
    );
}

export default SuperAdminShiftDashboard;
