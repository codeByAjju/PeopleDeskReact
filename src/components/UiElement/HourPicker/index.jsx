import React, { useState, useEffect, useRef } from "react";
import "./HourPicker.css";

export function HourPicker({ value = "", onChange, disabled = false, placeholder = "Hours" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hours, setHours] = useState(0);
    const containerRef = useRef(null);
    const hoursListRef = useRef(null);

    // Parse initial value
    useEffect(() => {
        if (value) {
            const hour = parseFloat(value);
            setHours(Math.floor(hour));
        }
    }, [value]);

    // Handle clicks outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleHourSelect = (hour) => {
        setHours(hour);
    };

    const handleConfirm = () => {
        onChange?.(String(hours));
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const displayValue = value ? `${String(Math.floor(parseFloat(value))).padStart(2, "0")} hrs` : placeholder;
    const hoursArray = Array.from({ length: 24 }, (_, i) => i);

    return (
        <div className="hour-picker-wrapper" ref={containerRef}>
            <input
                type="text"
                className="hour-picker-input"
                value={displayValue}
                readOnly
                onClick={() => !disabled && setIsOpen(!isOpen)}
                placeholder={placeholder}
                disabled={disabled}
            />

            {isOpen && !disabled && (
                <>
                    <div className="hour-picker-modal-backdrop" onClick={handleCancel} />
                    <div className="hour-picker-modal">
                        <div className="hour-picker-container">
                            {/* Header */}
                            <div className="hour-picker-header">
                                <div className="hour-picker-title">Working Hours</div>
                                <div className="hour-picker-display">
                                    <div className="hour-picker-input-field">
                                        {String(hours).padStart(2, "0")}
                                    </div>
                                    <div className="hour-picker-label">Hours</div>
                                </div>
                            </div>

                            {/* Hours Selection */}
                            <div className="hour-picker-content">
                                <div className="hour-picker-column" ref={hoursListRef}>
                                    <div className="hour-picker-column-header">Hours</div>
                                    {hoursArray.map((hour) => (
                                        <div
                                            key={hour}
                                            className={`hour-picker-item ${hours === hour ? "active" : ""}`}
                                            onClick={() => handleHourSelect(hour)}
                                        >
                                            {String(hour).padStart(2, "0")}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="hour-picker-footer">
                                <button
                                    type="button"
                                    className="hour-picker-btn hour-picker-btn-cancel"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="hour-picker-btn hour-picker-btn-ok"
                                    onClick={handleConfirm}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
