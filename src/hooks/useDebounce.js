import { useEffect, useState } from "react";

/**
 * Custom hook to debounce any value (string, object, array, etc.)
 * @param {any} value - Value to debounce
 * @param {number} delay - Debounce delay in milliseconds (default: 400ms)
 * @returns {any} Debounced value
 */
export function useDebounce(value, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
