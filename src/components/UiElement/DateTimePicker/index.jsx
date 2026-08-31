import React, { useState, forwardRef } from "react";
import { FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "./DateTimePicker.css";

export function DateTimePicker({
    icon = "",
    position = "",
    placeholder = "",
    size = "",
    pickerType = "default",
    portalId= "root",
    popperClassName= "datePicker",
    value = null,
    onChange,
    ...props
}) {
    const [selectedDate, setSelectedDate] = useState(value instanceof Date ? value : null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const formatDate = (date, type) => {
        if (!(date instanceof Date) || isNaN(date)) return "";
        switch (type) {
            case "month":
                return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
            case "year":
                return date.getFullYear();
            case "time":
                return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
            default:
                return date.toLocaleDateString();
        }
    };

    const handleDateChange = (date) => {
        if (pickerType === "range") {
            const [start, end] = date || [];
            setStartDate(start);
            setEndDate(end);
            onChange?.(date);
        } else {
            setSelectedDate(date);
            onChange?.(date);
        }
    };

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="d-flex align-items-center">
            {icon && (
                <div className={`form-icon form-icon-${position}`}>
                    <em className={`icon ni ni-${icon}`} />
                </div>
            )}
            <FormControl
                ref={ref}
                type="text"
                value={value}
                onClick={onClick}
                size={size}
                placeholder={placeholder}
                readOnly
            />
        </div>
    ));

    return (
        <DatePicker
            placeholderText={placeholder}
            selected={pickerType === "range" ? startDate : selectedDate}
            startDate={pickerType === "range" ? startDate : undefined}
            endDate={pickerType === "range" ? endDate : undefined}
            selectsRange={pickerType === "range"}
            showTimeSelect={pickerType === "time"}
            showTimeSelectOnly={pickerType === "time"}
            timeIntervals={15}
            timeCaption="Time"
            dateFormat={pickerType === "time" ? "h:mm aa" : undefined}
            customInput={
                icon ? (
                    <CustomInput
                        value={
                            pickerType === "range"
                                ? `${formatDate(startDate, pickerType)} - ${formatDate(endDate, pickerType)}`
                                : formatDate(selectedDate, pickerType)
                        }
                    />
                ) : (
                    <FormControl
                        size={size}
                        value={
                            pickerType === "range"
                                ? `${formatDate(startDate, pickerType)} - ${formatDate(endDate, pickerType)}`
                                : formatDate(selectedDate, pickerType)
                        }
                        readOnly
                    />
                )
            }
            onChange={handleDateChange}
            portalId={portalId} 
            popperClassName={popperClassName}
            popperContainer={({ children }) => <>{children}</>}
            popperPlacement="bottom-start"
            {...props}
            {...(pickerType === "month" && {
                showMonthYearPicker: true,
                dateFormat: "MMMM yyyy",
            })}
            {...(pickerType === "year" && {
                showYearPicker: true,
                dateFormat: "yyyy",
            })}
        />
    );
}
