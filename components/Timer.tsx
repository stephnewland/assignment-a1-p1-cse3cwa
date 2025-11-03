"use client";
import { useEffect, useState } from "react";

export default function Timer({ onTick }: { onTick: () => void }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        onTick();
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onTick]);

  return <div>⏱️ Time Elapsed: {seconds}s</div>;
}
