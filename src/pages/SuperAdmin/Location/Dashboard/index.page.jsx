import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { SweetAlert } from "../../../../components/UiElement/SweetAlert";
import { useDebounce } from "../../../../hooks";
import { AdminLocationDashboard, AdminLocationDetail, Badge, DataTable } from "../../../../components";
import { Modal } from "../../../../components/UiElement";
import { SuperAdminCountryServices } from "../../../../Services/SuperAdmin/Country/index.service";
import { SuperAdminLocationServices } from "../../../../Services/SuperAdmin/Location/index.service";
import { SuperAdminBranchServices } from "../../../../Services/SuperAdmin/Branch/index.service";

function SuperAdminLocationDashboard() {
    const [dashboardStats, setDashboardStats] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, totalItems: 0 });
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, order: "desc" });
    const [colFilters, setColFilters] = useState({});
    const [debounceFlushKey, setDebounceFlushKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("view"); // "view" | "edit" | "create"
    const [selectedLocationId, setSelectedLocationId] = useState(null);
    const [countries, setCountries] = useState([]);
    const [branches, setBranches] = useState([]);
    const debouncedSearch = useDebounce(searchQuery, 900, debounceFlushKey);
    const debouncedColFilters = useDebounce(colFilters, 900, debounceFlushKey);
    const handleClose = () => {
        setShowModal(false);
        setSelectedLocationId(null);
    };

    const fetchCountries = async () => {
        try {
            const res = await SuperAdminCountryServices.superAdminGetAllCountry();
            setCountries(res?.data?.result?.countries || res?.data?.result || []);
        } catch (error) {
            toast.error("Error fetching country data");
        }
    };

    const fetchBranches = async () => {
        try {
            const res = await SuperAdminBranchServices.superAdminGetAllBranch();
            setBranches(res?.data?.result?.branches || res?.data?.result || []);
        } catch {
            toast.error("Error fetching branches");
        }
    }

    const fetchLocation = useCallback(async () => {
        setLoading(true);
        try {
            const res = await SuperAdminLocationServices.superAdminGetAllLocation({
                search: debouncedSearch,
                limit: pagination.limit,
                page: pagination.page,
                sortBy: sortConfig.key,
                sortOrder: sortConfig.order,
                filters: debouncedColFilters,
            });
            const result = res?.data?.result;
            const locationList = result?.locations || (Array.isArray(result) ? result : []);
            const locationData = locationList?.map(location => {
                return {
                    ...location,
                    branchName: location?.branch?.name,
                }
            })
            const total = result?.pagination?.totalItems ?? result?.total ?? locationList.length;
            setLocations(locationData);
            setPagination((prev) => ({ ...prev, totalItems: total }));
        } catch (error) {
            toast.error("Error fetching location data");
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.limit, debouncedSearch, sortConfig, debouncedColFilters]);

    const handleDelete = async (location) => {
        const confirmed = await SweetAlert.confirm({
            title: "Delete Location",
            text: "Are you sure you want to delete this location?",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (confirmed) {
            const res = await SuperAdminLocationServices.superAdminDeleteLocation(location?.id);
            if (res?.status === 200) {
                toast.success("Location deleted successfully");
                fetchLocation();
            } else {
                toast.error("Error deleting location");
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

    const handleView = (location) => {
        setSelectedLocationId(location?.id);
        setModalMode("view");
        setShowModal(true);
    };

    const handleEdit = (location) => {
        setSelectedLocationId(location?.id);
        setModalMode("edit");
        setShowModal(true);
    };

    const handleCreate = () => {
        setSelectedLocationId(null);
        setModalMode("create");
        setShowModal(true);
    };

    useEffect(() => {
        fetchLocation();
    }, [fetchLocation]);

    useEffect(() => {
        fetchDashBoardStats();
    }, [fetchDashBoardStats]);

    useEffect(() => {
        fetchCountries();
        fetchBranches();
    }, []);

    const locationTableData = useMemo(() => ({
        columns: [
            { title: "#", key: "srNo" },
            { title: "Location Name", key: "name", sorting: true, filter: true },
            { title: "Code", key: "code", sorting: true, filter: true },
            { title: "branch Name", key: "branchName", sorting: false, filter: true, filterType: "select", filterOptions: branches },
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
        rows: locations?.map((location, index) => ({
            ...location,
            srNo: (pagination.page - 1) * pagination.limit + index + 1,
            status: (
                <Badge extraClass={`dt-badge dt-badge-${location.status}`} label={location.status} />
            ),
            action: (
                <ul className="nk-tb-actions gx-1 d-flex flex-row justify-content-center align-items-center list-unstyled gap-2 mb-0 w-100">
                    <li>
                        <button type="button" className="btn btn-icon btn-trigger" title="View Details" onClick={() => handleView(location)}>
                            <em className="bi bi-eye" style={{ color: "#364a63" }} />
                        </button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-icon btn-trigger" title="Edit" onClick={() => handleEdit(location)}>
                            <em className="bi bi-pencil" style={{ color: "#364a63" }} />
                        </button>
                    </li>
                    <li>
                        <button disabled={location.status === "deleted"} type="button" className="btn btn-icon btn-trigger" title="Delete" onClick={() => handleDelete(location)}>
                            <em className="bi bi-trash" style={{ color: location.status === "deleted" ? "gray" : "#e85347", border: location.status === "deleted" ? "none" : "#e85347" }} />
                        </button>
                    </li>
                </ul>
            ),
        })),
    }), [locations, pagination.page, pagination.limit]);

    return (
        <>
            <AdminLocationDashboard dashboardStats={dashboardStats} onCreateClick={handleCreate} />
            <div className="container-fluid px-4 pb-4">
                <div className="mt-4">
                    <DataTable
                        options={locationTableData}
                        title="Location Records"
                        searchPlaceholder="Search locations..."
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
                                    {modalMode === "create" ? "Create Location" : modalMode === "edit" ? "Edit Location" : "Location Details"}
                                </h5>
                            </div>
                        </div>
                    }
                    size="lg"
                    show={showModal}
                    handleClose={handleClose}
                    extraClass="designation-custom-modal"
                >
                    <AdminLocationDetail
                        countries={countries}
                        branches={branches}
                        locationId={selectedLocationId}
                        mode={modalMode}
                        onClose={handleClose}
                        onSuccess={() => {
                            handleClose();
                            fetchLocation();
                        }}
                    />
                </Modal>
            </div>
        </>
    );
}

export default SuperAdminLocationDashboard;
