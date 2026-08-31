import { useMemo } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

export function SelectPicker({
  options = [],
  isInvalid = false,
  value,
  onChange,
  placeholder = "Select...",
  isClearable = true,
  isSearchable = true,
  menuPortalTarget,
  styles: externalStyles = {},
  className = "",
  classNamePrefix = "selectPicker",
  ...props
}) {
  // Normalize options (supports array of strings or { label, value } objects)
  const normalizedOptions = useMemo(() => {
    return (options || []).map((opt) => {
      if (typeof opt === "object" && opt !== null) {
        return {
          label: opt.label ?? opt.name ?? String(opt.value),
          value: opt.value,
          ...opt,
        };
      }
      return {
        label: String(opt).charAt(0).toUpperCase() + String(opt).slice(1),
        value: opt,
      };
    });
  }, [options]);

  // Compute matching option value for react-select
  const selectedValue = useMemo(() => {
    if (value === null || value === undefined || value === "") return null;
    if (typeof value === "object" && !Array.isArray(value)) return value;
    if (Array.isArray(value)) {
      return normalizedOptions.filter((opt) => value.includes(opt.value));
    }
    return normalizedOptions.find((opt) => opt.value === value) || { label: String(value), value };
  }, [value, normalizedOptions]);

  const hasInvalidClass =
    typeof className === "string" && className.split(/\s+/).includes("is-invalid");
  const invalidState = isInvalid || hasInvalidClass;
  const selectClassName = [
    "formSelect",
    className,
    invalidState && !hasInvalidClass ? "is-invalid" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "44px",
      borderRadius: "0.75rem",
      borderColor: invalidState ? "#ef4444" : state.isFocused ? "#6366f1" : "#e2e8f0",
      borderStyle: state.isDisabled ? "dashed" : "solid",
      borderWidth: "1.5px",
      boxShadow: state.isFocused
        ? invalidState
          ? "0 0 0 3.5px rgba(239, 68, 68, 0.08)"
          : "0 0 0 3.5px rgba(99, 102, 241, 0.12)"
        : "0 1px 2px rgba(0, 0, 0, 0.02)",
      fontSize: "0.9rem",
      backgroundColor: state.isFocused ? "#ffffff" : "#f8fafc",
      cursor: state.isDisabled ? "default" : "pointer",
      opacity: 1,
      "&:hover": {
        borderColor: invalidState ? "#ef4444" : state.isDisabled ? "#cbd5e1" : "#cbd5e1",
        backgroundColor: state.isDisabled ? "#f8fafc" : "#ffffff",
      },
      ...externalStyles?.control?.(base, state),
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0.45rem 0.75rem",
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      fontSize: "0.9rem",
      color: "#1e293b",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
      fontSize: "0.9rem",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#1e293b",
      fontSize: "0.9rem",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: "#e2e8f0",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? "#6366f1" : "#94a3b8",
      "&:hover": {
        color: state.isDisabled ? "#94a3b8" : "#6366f1",
      },
    }),
    clearIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? "#6366f1" : "#94a3b8",
      "&:hover": {
        color: state.isDisabled ? "#94a3b8" : "#6366f1",
      },
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 99999,
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "8px",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e5e7eb",
      overflow: "hidden",
      fontSize: "13px",
      zIndex: 99999,
      ...externalStyles?.menu?.(base),
    }),
    option: (base, state) => ({
      ...base,
      fontSize: "13px",
      cursor: "pointer",
      backgroundColor: state.isSelected
        ? "#1d4ed8"
        : state.isFocused
        ? "rgba(37, 99, 235, 0.08)"
        : "#fff",
      color: state.isSelected ? "#ffffff" : "#374151",
      "&:active": {
        backgroundColor: "#1d4ed8",
        color: "#fff",
      },
      ...externalStyles?.option?.(base, state),
    }),
  };

  const portalTarget =
    menuPortalTarget !== undefined
      ? menuPortalTarget
      : typeof document !== "undefined"
      ? document.body
      : null;

  return (
    <Select
      key={props.name ? `${props.name}-${value}` : undefined}
      styles={customStyles}
      className={selectClassName}
      classNamePrefix={classNamePrefix}
      menuPortalTarget={portalTarget}
      options={normalizedOptions}
      value={selectedValue}
      onChange={onChange}
      placeholder={placeholder}
      isClearable={isClearable}
      isSearchable={isSearchable}
      {...props}
    />
  );
}

SelectPicker.propTypes = {
  options: PropTypes.array,
  isInvalid: PropTypes.bool,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  menuPortalTarget: PropTypes.any,
  styles: PropTypes.object,
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
};

export default SelectPicker;
