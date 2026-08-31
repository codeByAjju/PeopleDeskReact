import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to debounce any value (string, object, array, etc.)
 * @param {any} value - Value to debounce
 * @param {number} delay - Debounce delay in milliseconds (default: 400ms)
 * @param {any} immediateKey - Change this value to flush the latest value without delay
 * @returns {any} Debounced value
 */
export function useDebounce(value, delay = 1000, immediateKey) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const lastImmediateKey = useRef(immediateKey);

  useEffect(() => {
    if (immediateKey !== lastImmediateKey.current) {
      lastImmediateKey.current = immediateKey;
      setDebouncedValue(value);
      return undefined;
    }

    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, immediateKey]);

  return debouncedValue;
}

export default useDebounce;
