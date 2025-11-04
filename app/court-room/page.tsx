"use client";

import { useEffect, useState } from "react";
import CourtRoomContent from "@/components/CourtRoomContent";

export default function CourtRoom() {
  const [bgImage, setBgImage] = useState("/CourtRoomStageLight.png");

  useEffect(() => {
    const updateBackground = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setBgImage(
        isDark ? "/CourtRoomStageDark.png" : "/CourtRoomStageLight.png"
      );
    };

    // Initial check
    updateBackground();

    // Listen for class changes on <html>
    const observer = new MutationObserver(updateBackground);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main
      className="flex-grow bg-cover bg-center bg-no-repeat min-h-screen transition-all duration-300"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="min-h-screen w-full bg-white/60 dark:bg-black/55 transition-colors duration-300">
        <CourtRoomContent />
      </div>
    </main>
  );
}
