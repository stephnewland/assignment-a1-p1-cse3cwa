"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer({
  studentName,
  studentNumber,
}: {
  studentName: string;
  studentNumber: string;
}) {
  const currentDate = new Date().toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleHomeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = "/";
    }
  };

  return (
    <footer
      className="px-4 py-2 text-sm flex flex-col items-center text-gray-600 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Home link when not on home page */}
      {!isHomePage && (
        <Link
          href="/"
          className="mt-2 mb-2 bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onKeyDown={handleHomeKeyDown}
          aria-label="Return to home page"
        >
          Home
        </Link>
      )}

      {/* Copyright and student information */}
      <p className="text-center leading-none pt-2">
        &copy; {new Date().getFullYear()} {studentName} — Student No:{" "}
        {studentNumber}
        <br />
        {currentDate}
      </p>
    </footer>
  );
}
