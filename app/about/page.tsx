"use client";

import { useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { useKeyboardNavigation } from "../../hooks/useKeyboardNavigation";

export default function AboutContent() {
  const { containerRef } = useKeyboardNavigation({
    wrapAround: true,
    enableArrowKeys: true,
    enableHomeEnd: true,
  });

  useEffect(() => {
    document.title = "About - CSE3CWA";
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-50"
      ref={containerRef as React.RefObject<HTMLDivElement>}
    >
      {/* Breadcrumbs always top-left */}
      <div className="text-left">
        <Breadcrumbs />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              About CSE3CWA
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive web application demonstrating modern full-stack
              development principles and practices.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2">
            <div
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              tabIndex={0}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Project Overview
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                CSE3CWA represents a modern approach to web development,
                incorporating cutting-edge technologies and best practices to
                create an engaging, accessible, and performant user experience.
              </p>
            </div>

            <div
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              tabIndex={0}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Key Features
                </h2>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Responsive design across all devices
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Full keyboard navigation support
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Modern React and Next.js architecture
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Accessible UI components
                </li>
              </ul>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow-lg p-8 mt-8 hover:shadow-xl transition-shadow duration-300"
            tabIndex={0}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-gray-800">
                Technology Stack
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  React
                </div>
                <p className="text-sm text-gray-600">Frontend Framework</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-black mb-2">
                  Next.js
                </div>
                <p className="text-sm text-gray-600">Full-stack Framework</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-500 mb-2">
                  TypeScript
                </div>
                <p className="text-sm text-gray-600">Type Safety</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-teal-500 mb-2">
                  Tailwind
                </div>
                <p className="text-sm text-gray-600">Styling</p>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow-lg p-8 mt-8 hover:shadow-xl transition-shadow duration-300"
            tabIndex={0}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-gray-800">
                Development Philosophy
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              This project emphasizes clean code architecture, user experience
              design, and accessibility standards. Every component is built with
              performance and maintainability in mind, following modern
              development best practices and industry standards.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 mb-2">
                  User-Centric
                </h3>
                <p className="text-sm text-gray-600">
                  Designing with the end user experience as the primary focus
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 mb-2">Scalable</h3>
                <p className="text-sm text-gray-600">
                  Built to grow and adapt to changing requirements
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Maintainable
                </h3>
                <p className="text-sm text-gray-600">
                  Clean, documented code that's easy to understand and modify
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
