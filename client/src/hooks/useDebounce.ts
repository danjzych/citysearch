import { useState, useEffect } from "react";

const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  return debouncedValue;
};

export default useDebounce;
