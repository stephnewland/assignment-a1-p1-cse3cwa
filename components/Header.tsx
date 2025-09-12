"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header({ studentNumber }: { studentNumber: string }) {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center gap-8">
        <span className="student-number text-lg font-bold text-gray-900 dark:text-white">
          Student No: {studentNumber}
        </span>
        <nav className="flex gap-6 text-lg font-semibold tracking-wide">
          <Link
            href="/"
            className="text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100 hover:underline transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100 hover:underline transition-colors"
          >
            About
          </Link>
          <Link
            href="/tabs"
            className="text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100 hover:underline transition-colors"
          >
            Tabs
          </Link>
          <Link
            href="/escape-room"
            className="text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100 hover:underline transition-colors"
          >
            Escape Room
          </Link>
          <Link
            href="/coding-races"
            className="text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100 hover:underline transition-colors"
          >
            Coding Races
          </Link>
          <Link
            href="/court-room"
            className="text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100 hover:underline transition-colors"
          >
            Court Room
          </Link>
        </nav>
      </div>
      <ThemeToggle />
    </header>
  );
}
