"use client";

import { useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

export default function CourtRoomContent() {
  const { containerRef } = useKeyboardNavigation({
    wrapAround: true,
    enableArrowKeys: true,
    enableHomeEnd: true,
  });

  useEffect(() => {
    document.cookie = "lastTab=court-room; path=/";
  }, []);

  return (
    <>
      {/* Breadcrumbs are outside the main container to ensure they are full width */}
      <div className="text-left">
        <Breadcrumbs />
      </div>

      {/* The main content area is now contained and centered */}
      <main
        ref={containerRef}
        role="main"
        aria-labelledby="court-room-heading"
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
          <h1 id="court-room-heading" className="big-title">
            Court Room Page
          </h1>

          <div className="space-y-4">
            <h2>This page is under construction.</h2>
            <p>Please check back later for updates.</p>
          </div>

          {/* Legal simulation preview section */}
          <section
            aria-labelledby="simulation-heading"
            className="mt-8 space-y-4 p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg border border-red-200 dark:border-red-700"
          >
            <h3
              id="simulation-heading"
              className="text-xl font-semibold text-red-800 dark:text-red-200"
            >
              ⚖️ Legal Simulation Platform
            </h3>
            <p className="text-red-700 dark:text-red-300 mb-4">
              Practice your legal skills in a virtual courtroom environment
            </p>

            <div className="grid md:grid-cols-3 gap-4 text-left max-w-3xl">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-4 border-red-500">
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                  👨‍⚖️ Role Playing
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Take on roles as judge, lawyer, or jury member in simulated
                  cases
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">
                  📚 Case Studies
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Learn from real historical cases and practice legal reasoning
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
                  🎯 Skills Training
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Develop argumentation, evidence analysis, and decision-making
                  skills
                </p>
              </div>
            </div>
          </section>

          {/* Court procedures section */}
          <section
            aria-labelledby="procedures-heading"
            className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg"
          >
            <h3
              id="procedures-heading"
              className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3"
            >
              📋 Planned Features
            </h3>
            <ul className="text-left text-blue-700 dark:text-blue-300 space-y-2 max-w-md mx-auto">
              <li>• Interactive court proceedings simulation</li>
              <li>• Evidence presentation and analysis tools</li>
              <li>• Legal document drafting practice</li>
              <li>• Peer collaboration and debate features</li>
              <li>• Expert feedback and assessment system</li>
            </ul>
          </section>

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
                href="/tabs"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Visit the working Tab Generator"
              >
                📋 Tab Generator
              </Link>

              <Link
                href="/coding-races"
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                aria-label="Check out Coding Races page"
              >
                🏁 Coding Races
              </Link>

              <Link
                href="/escape-room"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Visit Escape Room page"
              >
                🔐 Escape Room
              </Link>

              <Link
                href="/about"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="Learn more on About page"
              >
                ℹ️ About
              </Link>

              <Link
                href="/"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Return to Home page"
              >
                🏠 Home
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
