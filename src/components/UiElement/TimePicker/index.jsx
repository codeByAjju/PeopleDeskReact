import React, { useState, useEffect, useRef } from "react";
import "./TimePicker.css";

export function TimePicker({ value = "", onChange, disabled = false, placeholder = "HH:MM" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [ampm, setAmpm] = useState("AM");
    const containerRef = useRef(null);
    const hoursListRef = useRef(null);
    const minutesListRef = useRef(null);

    // Parse initial value
    useEffect(() => {
        if (value) {
            const parts = value.split(":");
            if (parts.length >= 2) {
                const hour = parseInt(parts[0], 10);
                const minute = parseInt(parts[1], 10);
                setHours(hour);
                setMinutes(minute);
                setAmpm(hour >= 12 ? "PM" : "AM");
            }
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

    const handleMinuteSelect = (minute) => {
        setMinutes(minute);
    };

    const handleAmPmToggle = (type) => {
        setAmpm(type);
    };

    const handleConfirm = () => {
        const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
        onChange?.(timeString);
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const displayTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`;
    const displayValue = value || placeholder;

    const hours24 = Array.from({ length: 24 }, (_, i) => i);
    const minutesArray = Array.from({ length: 60 }, (_, i) => i);

    return (
        <div className="time-picker-wrapper" ref={containerRef}>
            <input
                type="text"
                className="time-picker-input"
                value={displayValue}
                readOnly
                onClick={() => !disabled && setIsOpen(!isOpen)}
                placeholder={placeholder}
                disabled={disabled}
            />

            {isOpen && !disabled && (
                <>
                    <div className="time-picker-modal-backdrop" onClick={handleCancel} />
                    <div className="time-picker-modal">
                        <div className="time-picker-container">
                            {/* Header */}
                            <div className="time-picker-header">
                                <div className="time-picker-title">Basic time picker</div>
                                <div className="time-picker-display">
                                    <input
                                        type="text"
                                        className="time-picker-input-field"
                                        value={`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`}
                                        readOnly
                                    />
                                    <div className="time-picker-ampm-toggle">
                                        <button
                                            type="button"
                                            className={`time-picker-ampm-btn ${ampm === "AM" ? "active" : ""}`}
                                            onClick={() => handleAmPmToggle("AM")}
                                        >
                                            AM
                                        </button>
                                        <button
                                            type="button"
                                            className={`time-picker-ampm-btn ${ampm === "PM" ? "active" : ""}`}
                                            onClick={() => handleAmPmToggle("PM")}
                                        >
                                            PM
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Time Selection Grid */}
                            <div className="time-picker-content">
                                {/* Hours Column */}
                                <div className="time-picker-column" ref={hoursListRef}>
                                    <div className="time-picker-column-header">Hours</div>
                                    {hours24.map((hour) => (
                                        <div
                                            key={hour}
                                            className={`time-picker-item ${hours === hour ? "active" : ""}`}
                                            onClick={() => handleHourSelect(hour)}
                                        >
                                            {String(hour).padStart(2, "0")}
                                        </div>
                                    ))}
                                </div>

                                {/* Minutes Column */}
                                <div className="time-picker-column" ref={minutesListRef}>
                                    <div className="time-picker-column-header">Minutes</div>
                                    {minutesArray.map((minute) => (
                                        <div
                                            key={minute}
                                            className={`time-picker-item ${minutes === minute ? "active" : ""}`}
                                            onClick={() => handleMinuteSelect(minute)}
                                        >
                                            {String(minute).padStart(2, "0")}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="time-picker-footer">
                                <button
                                    type="button"
                                    className="time-picker-btn time-picker-btn-cancel"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="time-picker-btn time-picker-btn-ok"
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
