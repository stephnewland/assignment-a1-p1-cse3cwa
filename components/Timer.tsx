"use client";
import { useEffect, useState } from "react";

export default function Timer({ onTick }: { onTick: () => void }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        onTick();
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onTick]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="text-lg space-y-2">
      <p>⏱️ Time Elapsed: {seconds}s</p>

      <div className="flex gap-3">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Pause
          </button>
        )}

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
