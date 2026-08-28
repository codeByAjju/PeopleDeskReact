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

  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "34px",
      borderRadius: "6px",
      borderColor: isInvalid ? "#dc3545" : state.isFocused ? "#2563eb" : "#e5e7eb",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(37,99,235,.12)" : "none",
      fontSize: "13px",
      backgroundColor: "#fff",
      cursor: "pointer",
      "&:hover": {
        borderColor: isInvalid ? "#dc3545" : "#2563eb",
      },
      ...externalStyles?.control?.(base, state),
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "2px 8px",
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      fontSize: "13px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
      fontSize: "13px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#111827",
      fontSize: "13px",
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
      className={`formSelect${isInvalid ? " is-invalid" : ""}`}
      classNamePrefix="selectPicker"
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
};

export default SelectPicker;