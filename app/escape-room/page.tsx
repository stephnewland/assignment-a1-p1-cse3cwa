"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useKeyboardNavigation } from "../../hooks/useKeyboardNavigation";

export default function EscapeRoomContent() {
  const { containerRef } = useKeyboardNavigation({
    wrapAround: true,
    enableArrowKeys: true,
    enableHomeEnd: true,
  });

  useEffect(() => {
    document.cookie = "lastTab=escape-room; path=/";
  }, []);

  return (
    <>
      {/* The main content area is now contained and centered */}
      <main
        ref={containerRef}
        role="main"
        aria-labelledby="escape-room-heading"
        className="container mx-auto px-4 py-8 space-y-6"
      >
        {/* Screen reader instructions */}
        <div className="sr-only">
          <p>
            Use arrow keys to navigate between interactive elements, Home/End to
            jump to first/last element.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center min-h-[20vh] px-4 space-y-6">
          <h1 id="escape-room-heading" className="big-title">
            Escape Room Page
          </h1>

          <div className="space-y-4">
            <h2>This page is under construction.</h2>
            <p>Please check back later for updates.</p>
          </div>

          {/* Interactive navigation section */}
          <section
            aria-labelledby="navigation-heading"
            className="mt-8 space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border"
          >
            <h3
              id="navigation-heading"
              className="text-lg font-semibold text-gray-800 dark:text-gray-200"
            >
              Quick Navigation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Use{" "}
              <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                Tab
              </kbd>{" "}
              or
              <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs mx-1">
                ↑↓
              </kbd>{" "}
              to navigate,
              <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                Enter
              </kbd>{" "}
              to select
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Go to Home page"
              >
                🏠 Home
              </Link>

              <Link
                href="/about"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="Go to About page"
              >
                ℹ️ About
              </Link>

              <Link
                href="/tabs"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Go to Tab Generator"
              >
                📋 Tab Generator
              </Link>

              <Link
                href="/coding-races"
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                aria-label="Go to Coding Races page"
              >
                🏁 Coding Races
              </Link>

              <Link
                href="/court-room"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Go to Court Room page"
              >
                ⚖️ Court Room
              </Link>
            </div>
          </section>

          {/* Status section with interactive element */}
          <section
            aria-labelledby="status-heading"
            className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg"
          >
            <h3
              id="status-heading"
              className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2"
            >
              Development Status
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 mb-3">
              This escape room game is currently in development. Stay tuned for
              exciting puzzles and challenges!
            </p>

            <button
              onClick={() =>
                alert(
                  "Thanks for your interest! We'll notify you when it's ready."
                )
              }
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              aria-label="Get notified when Escape Room is ready"
            >
              🔔 Notify Me When Ready
            </button>
          </section>
        </div>
      </main>
    </>
  );
}
