"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useKeyboardNavigation } from "../../hooks/useKeyboardNavigation";

export default function CodingRacesContent() {
  const { containerRef } = useKeyboardNavigation({
    wrapAround: true,
    enableArrowKeys: true,
    enableHomeEnd: true,
  });

  useEffect(() => {
    document.cookie = "lastTab=coding-races; path=/";
  }, []);

  return (
    <>
      <main
        ref={containerRef}
        role="main"
        aria-labelledby="coding-races-heading"
        className="container mx-auto px-4 py-8 space-y-6"
      >
        <div className="sr-only">
          <p>
            Use arrow keys to navigate between interactive elements, Home/End to
            jump to first/last element.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center min-h-[20vh] px-4 space-y-6">
          <h1 id="coding-races-heading" className="big-title">
            Coding Races Page
          </h1>

          <div className="space-y-4">
            <h2>This page is under construction.</h2>
            <p>Please check back later for updates.</p>
          </div>

          <section
            aria-labelledby="preview-heading"
            className="mt-8 space-y-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border"
          >
            <h3 id="preview-heading" className="text-xl font-semibold">
              🏁 Coming Soon: Competitive Coding Challenges
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  ⚡ Speed Coding
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Race against the clock to solve programming challenges
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                  🏆 Leaderboards
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Compete with other developers worldwide
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                  💡 Multiple Languages
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Code in JavaScript, Python, Java, and more
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">
                  📊 Analytics
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track your progress and improvement over time
                </p>
              </div>
            </div>
          </section>

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
                aria-label="Try the working Tab Generator"
              >
                📋 Try Tab Generator
              </Link>

              <Link
                href="/escape-room"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Check out Escape Room page"
              >
                🔐 Escape Room
              </Link>

              <Link
                href="/court-room"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Visit Court Room page"
              >
                ⚖️ Court Room
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

          <section
            aria-labelledby="beta-heading"
            className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-700 rounded-lg"
          >
            <h3
              id="beta-heading"
              className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2"
            >
              🚀 Beta Testing Program
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-3">
              Be among the first to test our coding race platform and shape its
              development!
            </p>

            <button
              onClick={() =>
                alert(
                  "Thanks for your interest! We'll add you to our beta testing list."
                )
              }
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mr-3"
              aria-label="Join beta testing program"
            >
              🧪 Join Beta Testing
            </button>

            <button
              onClick={() => alert("We'll send you updates on our progress!")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Get development updates"
            >
              📬 Get Updates
            </button>
          </section>
        </div>
      </main>
    </>
  );
}
