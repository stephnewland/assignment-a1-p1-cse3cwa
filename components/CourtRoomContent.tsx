"use client";

import { useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CourtRoomContent() {
  useEffect(() => {
    document.cookie = "lastTab=court-room; path=/";
  }, []);

  return (
    <main className="px-4 py-8 space-y-6">
      {/* Breadcrumbs always top-left */}
      <div className="text-left">
        <Breadcrumbs />
      </div>

      <div className="flex flex-col items-center justify-center text-center min-h-[20vh] px-4 space-y-4">
        <Breadcrumbs />
        <h1 className="big-title">Court Room Page</h1>
        <h2>This page is under construction.</h2>
        <p>Please check back later for updates.</p>
      </div>
    </main>
  );
}
