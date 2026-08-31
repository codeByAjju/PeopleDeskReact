import PropTypes from "prop-types";
import "./datatable.css";
import { useMemo, useState } from "react";
import { SelectPicker } from "../SelectPicker";
import { Spinner } from "react-bootstrap";

export function DataTable({
  options = { columns: [], rows: [] },
  title,
  subtitle,
  searchPlaceholder = "Search...",
  exportLabel = "Export CSV",
  onExport,
  summaryBar,
  emptyIcon = "bi-inbox",
  emptyTitle = "No records found",
  emptySubtitle = "Try changing your search or filters.",

  // ── Server-driven state (all controlled by parent) ──────────────
  searchQuery = "",
  onSearchChange,

  sortConfig = { key: null, order: "asc" },
  onSortChange,

  colFilters = {},
  onColFilterChange,

  currentPage = 1,
  rowsPerPage = 10,
  totalItems = 0,
  onPageChange,
  onRowsPerPageChange,

  loading = false,
  ...props
}) {
  const [openFilter, setOpenFilter] = useState(null);

  // Normalize pagination props so 0 or invalid numbers safely default to valid 1-based page & positive limit
  const safeCurrentPage = Math.max(Number(currentPage) || 1, 1);
  const safeRowsPerPage = Math.max(Number(rowsPerPage) || 10, 1);
  const totalPages = Math.ceil(totalItems / safeRowsPerPage) || 1;

  const pageWindow = useMemo(() => {
    const delta = 2;
    const pages = [];
    const left = Math.max(1, safeCurrentPage - delta);
    const right = Math.min(totalPages, safeCurrentPage + delta);
    for (let i = left; i <= right; i++) pages.push(i);
    return pages;
  }, [safeCurrentPage, totalPages]);

  const startRecord = totalItems === 0 ? 0 : (safeCurrentPage - 1) * safeRowsPerPage + 1;
  const endRecord = Math.min(safeCurrentPage * safeRowsPerPage, totalItems);
  const hasSearchValue = searchQuery !== "";
  const immediateClearMeta = { action: "clear", immediate: true };

  const toggleFilter = (key) => setOpenFilter((prev) => (prev === key ? null : key));

  const handleSort = (key) => {
    let newOrder = "asc";
    if (sortConfig.key === key && sortConfig.order === "asc") newOrder = "desc";
    onSortChange?.({ key, order: newOrder });
  };

  const handleSearchChange = (event) => {
    const nextValue = event.target.value;
    onSearchChange?.(
      nextValue,
      nextValue === "" && hasSearchValue ? immediateClearMeta : undefined
    );
  };

  const handleSearchClear = () => {
    onSearchChange?.("", immediateClearMeta);
  };

  const handleColumnFilterChange = (key, value, meta) => {
    onColFilterChange?.(key, value, meta);
  };

  const handleColumnFilterClear = (key) => {
    handleColumnFilterChange(key, "", immediateClearMeta);
    setOpenFilter(null);
  };

  const renderFilterControl = (col) => {
    const filterVal = colFilters[col.key] ?? "";

    if (typeof col.filterRender === "function") {
      return col.filterRender({
        column: col,
        value: filterVal,
        onChange: (val, meta) => handleColumnFilterChange(col.key, val, meta),
        closeFilter: () => setOpenFilter(null),
      });
    }

    const isStatusKey =
      col.key === "status" ||
      (typeof col.key === "string" && col.key.toLowerCase().includes("status"));

    const filterType = col.filterType || (isStatusKey || col.filterOptions ? "select" : "text");

    if (filterType === "select") {
      let selectOptions = col.filterOptions;
      if (!selectOptions && isStatusKey) {
        selectOptions = [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "Deleted", value: "deleted" },
        ];
      }

      return (
        <div className="dt-col-filter-select-wrap">
          <SelectPicker
            autoFocus
            name={`col-filter-${col.key}`}
            placeholder={col.filterPlaceholder || `Select ${col.title}...`}
            options={selectOptions || []}
            value={filterVal}
            onChange={(selected) => {
              const val = selected ? (selected.value !== undefined ? selected.value : selected) : "";
              handleColumnFilterChange(
                col.key,
                val,
                !selected && filterVal !== "" ? immediateClearMeta : undefined
              );
            }}
            isClearable
          />
        </div>
      );
    }

    if (filterType === "date") {
      return (
        <input
          autoFocus
          type="date"
          className="dt-col-filter-input"
          value={filterVal}
          onChange={(e) => {
            const nextValue = e.target.value;
            handleColumnFilterChange(
              col.key,
              nextValue,
              nextValue === "" && filterVal !== "" ? immediateClearMeta : undefined
            );
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") setOpenFilter(null);
          }}
        />
      );
    }

    if (filterType === "number") {
      return (
        <input
          autoFocus
          type="number"
          className="dt-col-filter-input"
          placeholder={col.filterPlaceholder || `Filter ${col.title}...`}
          value={filterVal}
          onChange={(e) => {
            const nextValue = e.target.value;
            handleColumnFilterChange(
              col.key,
              nextValue,
              nextValue === "" && filterVal !== "" ? immediateClearMeta : undefined
            );
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") setOpenFilter(null);
          }}
        />
      );
    }

    // Default: text filter
    return (
      <input
        autoFocus
        type="text"
        className="dt-col-filter-input"
        placeholder={col.filterPlaceholder || `Filter ${col.title}...`}
        value={filterVal}
        onChange={(e) => {
          const nextValue = e.target.value;
          handleColumnFilterChange(
            col.key,
            nextValue,
            nextValue === "" && filterVal !== "" ? immediateClearMeta : undefined
          );
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape" || e.key === "Enter") setOpenFilter(null);
        }}
      />
    );
  };

  return (
    <div className="dt-wrapper">
      <div className="dt-topbar">
        <div className="dt-topbar-left">
          {title && <div className="dt-title">{title}</div>}
          {subtitle && <div className="dt-subtitle">{subtitle}</div>}
        </div>
        <div className="dt-topbar-right">
          <div className="dt-search-wrap">
            <i className="bi bi-search dt-search-icon" aria-hidden="true" />
            <input
              type="search"
              className="dt-search-input"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {hasSearchValue && (
              <button
                type="button"
                className="dt-search-clear-btn"
                onClick={handleSearchClear}
                aria-label="Clear search"
                title="Clear search"
              >
                <i className="bi bi-x" aria-hidden="true" />
              </button>
            )}
          </div>
          {onExport && (
            <button className="dt-export-btn" onClick={onExport} type="button">
              <i className="bi bi-download" aria-hidden="true" />
              <span>{exportLabel}</span>
            </button>
          )}
        </div>
      </div>

      <div className="dt-table-wrap">
        <table className="dt-table" {...props}>
          <thead>
            <tr>
              {options.columns.map((col, index) => {
                const isActive = sortConfig.key === col.key;
                const hasFilter = col.filter;
                const isFilterOpen = openFilter === col.key;
                const isFilterActive =
                  colFilters[col.key] !== undefined &&
                  colFilters[col.key] !== null &&
                  colFilters[col.key] !== "";

                const isRightAligned = index >= options.columns.length - 2 && options.columns.length > 2;

                return (
                  <th
                    key={col.key || index}
                    className={`dt-th${col.extraClass ? ` ${col.extraClass}` : ""}${isActive ? " dt-th-active" : ""}`}
                    style={{ width: col.width || undefined }}
                  >
                    <div className="dt-th-inner">
                      <span
                        className={`dt-th-label${col.sorting ? " dt-th-sortable" : ""}`}
                        onClick={col.sorting ? () => handleSort(col.key) : undefined}
                      >
                        {col.title}
                        {col.sorting && (
                          <span className="dt-sort-icons">
                            <i className={`bi bi-caret-up-fill dt-sort-up${isActive && sortConfig.order === "asc" ? " dt-sort-on" : ""}`} />
                            <i className={`bi bi-caret-down-fill dt-sort-down${isActive && sortConfig.order === "desc" ? " dt-sort-on" : ""}`} />
                          </span>
                        )}
                      </span>

                      {hasFilter && (
                        <div className="dt-col-filter-wrap">
                          <button
                            type="button"
                            className={`dt-col-filter-btn${isFilterActive ? " dt-col-filter-active" : ""}${isFilterOpen ? " dt-col-filter-open" : ""}`}
                            onClick={() => toggleFilter(col.key)}
                            title={`Filter ${col.title}`}
                          >
                            <i className="bi bi-funnel-fill" />
                          </button>
                          {isFilterOpen && (
                            <div
                              className={`dt-col-filter-popover${isRightAligned ? " dt-col-filter-popover-right" : ""}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="dt-col-filter-header">
                                <span className="dt-col-filter-title">{col.title}</span>
                                {isFilterActive && (
                                  <button
                                    type="button"
                                    className="dt-col-filter-clear-btn"
                                    onClick={() => handleColumnFilterClear(col.key)}
                                  >
                                    Clear
                                  </button>
                                )}
                              </div>
                              <div className="dt-col-filter-body">
                                {renderFilterControl(col)}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={options.columns.length} className="dt-empty">
                  <div className="dt-empty-inner">
                    <Spinner animation="border" variant="primary" />
                  </div>
                </td>
              </tr>
            ) : options?.rows?.length > 0 ? (
              options?.rows?.map((row, rowIndex) => (
                <tr key={row.id ?? rowIndex} className="dt-row">
                  {options.columns.map((col, colIndex) => (
                    <td key={colIndex} className={`dt-td${col.extraClass ? ` ${col.extraClass}` : ""}`}>
                      {row[col.key] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={options.columns.length} className="dt-empty">
                  <div className="dt-empty-inner">
                    <div className="dt-empty-icon">
                      <i className={`bi ${emptyIcon}`} />
                    </div>
                    <p className="dt-empty-title">{emptyTitle}</p>
                    <p className="dt-empty-sub">{emptySubtitle}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {summaryBar}

      <div className="dt-footer">
        <div className="dt-footer-info">
          {totalItems > 0 ? (
            <>
              Showing {startRecord}–{endRecord} of{" "}
              <strong>{totalItems.toLocaleString()}</strong> records
            </>
          ) : (
            "No data available"
          )}
          <span className="dt-rows-per-page">
            &nbsp;&nbsp;Rows per page
            <select
              className="dt-rpp-select"
              value={safeRowsPerPage}
              onChange={(e) => onRowsPerPageChange?.(parseInt(e.target.value, 10))}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </span>
        </div>

        <div className="dt-pagination">
          <button
            type="button"
            className="dt-page-btn dt-page-prev"
            disabled={safeCurrentPage <= 1}
            onClick={() => onPageChange?.(safeCurrentPage - 1)}
          >
            Previous
          </button>

          {pageWindow[0] > 1 && (
            <>
              <button type="button" className="dt-page-btn" onClick={() => onPageChange?.(1)}>1</button>
              {pageWindow[0] > 2 && <span className="dt-page-ellipsis">…</span>}
            </>
          )}

          {pageWindow.map((page) => (
            <button
              key={page}
              type="button"
              className={`dt-page-btn${safeCurrentPage === page ? " dt-page-active" : ""}`}
              onClick={() => onPageChange?.(page)}
            >
              {page}
            </button>
          ))}

          {pageWindow[pageWindow.length - 1] < totalPages && (
            <>
              {pageWindow[pageWindow.length - 1] < totalPages - 1 && (
                <span className="dt-page-ellipsis">…</span>
              )}
              <button type="button" className="dt-page-btn" onClick={() => onPageChange?.(totalPages)}>
                {totalPages}
              </button>
            </>
          )}

          <button
            type="button"
            className="dt-page-btn dt-page-next"
            disabled={safeCurrentPage >= totalPages || totalPages === 0}
            onClick={() => onPageChange?.(safeCurrentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {openFilter && <div className="dt-filter-backdrop" onClick={() => setOpenFilter(null)} />}
    </div>
  );
}

DataTable.propTypes = {
  options: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.node.isRequired,
        key: PropTypes.string.isRequired,
        sorting: PropTypes.bool,
        filter: PropTypes.bool,
        filterType: PropTypes.oneOf(["text", "select", "date", "number", "boolean", "custom"]),
        filterOptions: PropTypes.array,
        filterPlaceholder: PropTypes.string,
        filterRender: PropTypes.func,
        extraClass: PropTypes.string,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      })
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  title: PropTypes.node,
  subtitle: PropTypes.node,
  searchPlaceholder: PropTypes.string,
  exportLabel: PropTypes.string,
  onExport: PropTypes.func,
  summaryBar: PropTypes.node,
  emptyIcon: PropTypes.string,
  emptyTitle: PropTypes.string,
  emptySubtitle: PropTypes.string,
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    order: PropTypes.oneOf(["asc", "desc"]),
  }),
  onSortChange: PropTypes.func,
  colFilters: PropTypes.object,
  onColFilterChange: PropTypes.func,
  currentPage: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalItems: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  loading: PropTypes.bool,
};

export default DataTable;
