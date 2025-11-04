"use client";

import { useEffect, useState } from "react";
import Timer from "@/components/Timer";
import MessageQueue from "@/components/MessageQueue";

export default function CourtRoomContent() {
  useEffect(() => {
    document.cookie = "lastTab=court-room; path=/";
  }, []);

  const [stage, setStage] = useState(1);

  return (
    <main
      role="main"
      aria-labelledby="court-room-heading"
      className="px-4 py-8 space-y-6"
    >
      <div className="flex flex-col items-center justify-center text-center min-h-[20vh] px-4 space-y-4">
        <h1 id="court-room-heading" className="big-title">
          Court Room Simulation
        </h1>

        <Timer onTick={() => {}} />

        <p className="text-lg">
          Current Stage: <strong>{stage}</strong>
        </p>

        {/* ✅ Stage-specific content */}
        {stage === 1 && <p>🛠️ Stage 1: Debug the code below...</p>}
        {stage === 2 && (
          <div className="w-full max-w-xl">
            <MessageQueue />
          </div>
        )}
        {stage === 3 && (
          <p>🔐 Stage 3: Fix accessibility and security issues...</p>
        )}

        {/* ✅ Navigation buttons */}
        <div className="flex gap-4 mt-4">
          {stage > 1 && (
            <button
              onClick={() => setStage((prev) => Math.max(prev - 1, 1))}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white"
            >
              Previous Stage
            </button>
          )}

          {stage < 3 && (
            <button
              onClick={() => setStage((prev) => Math.min(prev + 1, 3))}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
            >
              Next Stage
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
