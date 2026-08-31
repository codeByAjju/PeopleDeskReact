import React, { useState, useEffect, useRef } from "react";
import "./MinutePicker.css";

export function MinutePicker({ value = "", onChange, disabled = false, placeholder = "Minutes" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const containerRef = useRef(null);
    const minutesListRef = useRef(null);

    // Parse initial value
    useEffect(() => {
        if (value) {
            const minute = parseInt(value, 10);
            setMinutes(minute);
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

    const handleMinuteSelect = (minute) => {
        setMinutes(minute);
    };

    const handleConfirm = () => {
        onChange?.(String(minutes));
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const displayValue = value ? `${String(value).padStart(2, "0")} min` : placeholder;
    const minutesArray = Array.from({ length: 60 }, (_, i) => i);

    return (
        <div className="minute-picker-wrapper" ref={containerRef}>
            <input
                type="text"
                className="minute-picker-input"
                value={displayValue}
                readOnly
                onClick={() => !disabled && setIsOpen(!isOpen)}
                placeholder={placeholder}
                disabled={disabled}
            />

            {isOpen && !disabled && (
                <>
                    <div className="minute-picker-modal-backdrop" onClick={handleCancel} />
                    <div className="minute-picker-modal">
                        <div className="minute-picker-container">
                            {/* Header */}
                            <div className="minute-picker-header">
                                <div className="minute-picker-title">Break Duration</div>
                                <div className="minute-picker-display">
                                    <div className="minute-picker-input-field">
                                        {String(minutes).padStart(2, "0")}
                                    </div>
                                    <div className="minute-picker-label">Minutes</div>
                                </div>
                            </div>

                            {/* Minutes Selection */}
                            <div className="minute-picker-content">
                                <div className="minute-picker-column" ref={minutesListRef}>
                                    <div className="minute-picker-column-header">Minutes</div>
                                    {minutesArray.map((minute) => (
                                        <div
                                            key={minute}
                                            className={`minute-picker-item ${minutes === minute ? "active" : ""}`}
                                            onClick={() => handleMinuteSelect(minute)}
                                        >
                                            {String(minute).padStart(2, "0")}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="minute-picker-footer">
                                <button
                                    type="button"
                                    className="minute-picker-btn minute-picker-btn-cancel"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="minute-picker-btn minute-picker-btn-ok"
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
