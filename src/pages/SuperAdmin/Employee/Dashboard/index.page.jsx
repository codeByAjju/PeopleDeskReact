import { Badge, DataTable } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AdminEmployeeDashboard } from "../../../../components";
import { SuperAdminEmployeeServices } from "../../../../Services/SuperAdmin/Employee/index.service";
import { SweetAlert } from "../../../../components/UiElement/SweetAlert";
import { useDebounce } from "../../../../hooks";
import SuperAdminAccessRoute from "../../../../routeControl/superAdminRoutMap";

function SuperAdminEmployeeDashboard() {
    const [dashboardStats, setDashboardStats] = useState([])
    const [pagination, setPagination] = useState({ page: 1, limit: 10, totalItems: 0 });
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, order: "desc" });
    const [colFilters, setColFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    const debouncedSearch = useDebounce(searchQuery, 900);
    const debouncedColFilters = useDebounce(colFilters, 900);

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        try {
            const res = await SuperAdminEmployeeServices.superAdminGetAllEmployee({
                search: debouncedSearch,
                limit: pagination.limit,
                page: pagination.page,
                sortBy: sortConfig.key,
                sortOrder: sortConfig.order,
                filters: debouncedColFilters,
            });
            const result = res?.data?.result;
            const employeesList = result?.employees || (Array.isArray(result) ? result : []);
            const total = result?.pagination?.totalItems ?? result?.total ?? employeesList.length;

            setEmployees(employeesList);
            setPagination((prev) => ({ ...prev, totalItems: total }));
        } catch (error) {
            toast.error("Error fetching employee data");
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.limit, debouncedSearch, sortConfig, debouncedColFilters]);

    const fetchDashBoardStats = useCallback(async () => {
        try {
            const res = await SuperAdminEmployeeServices.superAdminEmployeeStats();
            setDashboardStats(res?.data?.result)
        } catch (error) {
            toast.error("Error fetching employee data");
        }
    }, []);
    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);
    useEffect(() => {
        fetchDashBoardStats();
    }, [fetchDashBoardStats])

    const handleView = (employee) => {
        navigate(`${SuperAdminAccessRoute.ADMIN_EMPLOYEE.path}/${employee.id}`);
    };

    const handleEdit = (employee) => {
        navigate(`/superAdmin/edit-employee/${employee.id}`);
    };


    const handleDelete = async (employee) => {
        const confirmed = await SweetAlert.confirm({
            title: "Delete Employee",
            text: "Are you sure you want to delete this employee?",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (confirmed) {
            const res = await SuperAdminEmployeeServices.superAdminDeleteEmployeeById(
                employee.id
            );
            if (res?.status === 200) {
                toast.success("Employee deleted successfully");
                fetchEmployees();
            } else {
                toast.error("Error deleting employee");
            }
        }
    };

    const employeeTableData = useMemo(() => ({
        columns: [
            { title: "#", key: "srNo" },
            { title: "Employee Code", key: "employeeCode", sorting: true, filter: true },
            { title: "Name", key: "firstName", sorting: true, filter: true },
            { title: "Email", key: "email", sorting: true, filter: true },
            { title: "Phone Number", key: "phoneNumber", sorting: true, filter: true },
            {
                title: "Employment Type", key: "employmentType",
                filterType: "select",
                filterOptions: [
                    { label: "Full Time", value: "full_time" },
                    { label: "Part Time", value: "part_time" },
                    { label: "Contract", value: "contract" },
                    { label: "Intern", value: "intern" },
                    { label: "Temporary", value: "temporary" },
                ],
                sorting: true, filter: true
            },
            {
                title: "Status",
                key: "employmentStatus",
                sorting: true,
                filter: true,
                filterType: "select",
                filterOptions: [
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                    { label: "Terminated", value: "terminated" },
                    { label: "Deleted", value: "deleted" },
                ],
            },
            { title: "Action", key: "action", extraClass: "text-center" },
        ],
        rows: employees?.map((employee, index) => ({
            ...employee,
            srNo: (pagination.page - 1) * pagination.limit + index + 1,
            firstName: `${employee.firstName || ""} ${employee.lastName || ""}`.trim() || "-",
            employmentType: employee.employmentType ? String(employee.employmentType).replace(/_/g, " ") : "-",
            employmentStatus: (
                <Badge extraClass={`dt-badge dt-badge-${employee.employmentStatus}`} label={employee.employmentStatus} />
            ),
            action: (
                <ul className="nk-tb-actions gx-1 d-flex flex-row justify-content-center align-items-center list-unstyled gap-2 mb-0 w-100">
                    <li>
                        <button type="button" className="btn btn-icon btn-trigger" title="View Details" onClick={() => handleView(employee)}>
                            <em className="bi bi-eye" style={{ color: "#364a63" }} />
                        </button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-icon btn-trigger" title="Edit" onClick={() => handleEdit(employee)}>
                            <em className="bi bi-pencil" style={{ color: "#364a63" }} />
                        </button>
                    </li>
                    <li>
                        <button disabled={employee.employmentStatus === "deleted"} type="button" className="btn btn-icon btn-trigger" title="Delete" onClick={() => handleDelete(employee)}>
                            <em
                                className="bi bi-trash"
                                style={{
                                    color:
                                        employee.employmentStatus === "deleted" ? "gray" :
                                            employee.employmentStatus === "inactive" ? "#f0ad4e" :
                                                employee.employmentStatus === "terminated" ? "#6c757d" :
                                                    "#e85347",
                                    border: employee.employmentStatus === "deleted" ? "none" : "1px solid currentColor",
                                }}
                            />
                        </button>
                    </li>
                </ul>
            ),
        })),
    }), [employees, pagination.page, pagination.limit]);

    return (
        <>
            <AdminEmployeeDashboard dashboardStats={dashboardStats} />
            <div className="container-fluid px-4 pb-4">
                <div className="mt-4">
                    <DataTable
                        options={employeeTableData}
                        title="Employee Records"
                        searchPlaceholder="Search employees..."
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
            </div>
        </>
    );
}

export default SuperAdminEmployeeDashboard;
