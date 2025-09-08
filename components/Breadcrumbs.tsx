"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" role="navigation" className="text-sm mb-4">
      <ol className="flex flex-wrap gap-2 text-gray-600 dark:text-gray-300">
        <li>
          <Link href="/" className="hover:underline font-medium">
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;
          const label = decodeURIComponent(segment).replace(/-/g, " ");

          return (
            <li key={href} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-semibold text-gray-900 dark:text-white"
                >
                  {label}
                </span>
              ) : (
                <Link href={href} className="hover:underline font-medium">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
