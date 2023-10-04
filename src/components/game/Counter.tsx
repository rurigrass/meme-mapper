import { animate } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface CounterProps {
  distance: number;
  decimals?: boolean;
}

const Counter = ({ distance, decimals }: CounterProps) => {
  const nodeRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const node = nodeRef.current;

    if (node) {
      const controls = animate(0, distance, {
        duration: 1,
        onUpdate(value) {
          if (node) {
            node.textContent = value.toFixed(decimals ? 2 : 0);
          }
        },
      });

      return () => controls.stop();
    }
  }, [distance]);

  return <p className="text-yellow-400" ref={nodeRef} />;
};

export default Counter;
