import { useRef, useEffect } from "react";

export const usePrevious = <TValue extends unknown>(value: TValue) => {
  const ref = useRef<TValue>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
