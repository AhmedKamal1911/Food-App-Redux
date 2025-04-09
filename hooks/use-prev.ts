import { useState } from "react";

export function usePrevious<T>(newValue: T) {
  const [current, setCurrent] = useState<T>(newValue);
  const [previous, setPrevious] = useState<T | null>(null);
  if (newValue !== current) {
    setPrevious(current);
    setCurrent(newValue);
  }
  return previous;
}
