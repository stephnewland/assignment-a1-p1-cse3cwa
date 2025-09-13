"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

interface Tab {
  id: number;
  header: string;
  content: string;
}

export default function TabGenerator() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, header: "Step 1", content: "Step 1 Content" },
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [showHtml, setShowHtml] = useState(false);

  const addTab = () => {
    const newId = tabs.length > 0 ? Math.max(...tabs.map((t) => t.id)) + 1 : 1;
    setTabs([
      ...tabs,
      { id: newId, header: `Step ${newId}`, content: `Step ${newId} Content` },
    ]);
    setActiveTabId(newId);
  };

  const removeTab = (idToRemove: number) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== idToRemove);
    setTabs(updatedTabs);

    if (activeTabId === idToRemove) {
      if (updatedTabs.length > 0) {
        const removedIndex = tabs.findIndex((tab) => tab.id === idToRemove);
        const newActiveTab =
          removedIndex > 0 ? updatedTabs[removedIndex - 1] : updatedTabs[0];
        setActiveTabId(newActiveTab ? newActiveTab.id : 0);
      } else {
        setActiveTabId(0);
      }
    }
  };

  const updateTab = (
    id: number,
    field: "header" | "content",
    value: string
  ) => {
    setTabs(
      tabs.map((tab) => (tab.id === id ? { ...tab, [field]: value } : tab))
    );
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "ArrowRight") {
      const nextIndex = (index + 1) % tabs.length;
      setActiveTabId(tabs[nextIndex].id);
    } else if (e.key === "ArrowLeft") {
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      setActiveTabId(tabs[prevIndex].id);
    } else if (e.key === "Home") {
      setActiveTabId(tabs[0].id);
    } else if (e.key === "End") {
      setActiveTabId(tabs[tabs.length - 1].id);
    }
  };

  const generateHTML = () => {
    const buttons = tabs
      .map(
        (tab) =>
          `<button onclick="openTab(event, 'tab-${tab.id}')" class="tab-button" data-tab-id="tab-${tab.id}">${tab.header}</button>`
      )
      .join("\n");

    const contents = tabs
      .map(
        (tab) =>
          `<div id="tab-${tab.id}" class="tab-content"><h3>${tab.header}</h3><p>${tab.content}</p></div>`
      )
      .join("\n");

    const scriptForHTML = `
<script>
  function openTab(evt, tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.tab-button').forEach(el => el.classList.remove('active'));
    const activeContent = document.getElementById(tabId);
    if(activeContent) activeContent.style.display = 'block';
    if(evt && evt.currentTarget) evt.currentTarget.classList.add('active');
    else {
      const buttonToActivate = document.querySelector('.tab-button[data-tab-id="' + tabId + '"]');
      if(buttonToActivate) buttonToActivate.classList.add('active');
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    const firstTabButton = document.querySelector('.tab-button');
    if(firstTabButton) {
      const firstTabId = firstTabButton.getAttribute('data-tab-id');
      if(firstTabId) openTab(null, firstTabId);
    }
  });
</script>
`;

    const stylesForHTML = `
<style>
  .tab-buttons-container { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
  .tab-button { padding: 10px 15px; cursor: pointer; border: 1px solid #ccc; background-color: transparent; color: black; border-radius: 6px; font-weight: 500; transition: all 0.2s ease-in-out; }
  .tab-button:hover { background-color: transparent; }
  .tab-button.active { background-color: transparent; color: black; box-shadow: 2px 2px 4px rgba(0,0,0,0.1); }
  .tab-content { display: none; padding: 20px; border: 1px solid #e2e8f0; border-radius: 6px; background-color: white; margin-top: 16px; }
  .tab-content h3 { margin-top: 0; margin-bottom: 10px; color: #2d3748; }
  .tab-content p { color: #4a5568; line-height: 1.6; }
</style>
`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Tabs Example</title>
${stylesForHTML}
${scriptForHTML}
</head>
<body>
<div class="tab-buttons-container">${buttons}</div>
${contents}
</body>
</html>`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs always top-left */}
      <div className="text-left">
        <Breadcrumbs />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div
          role="main"
          aria-labelledby="tab-generator-heading"
          className="space-y-6 max-w-4xl mx-auto"
        >
          <h1 id="tab-generator-heading" className="big-title mb-8">
            Tab Generator
          </h1>

          {/* Grid Panels */}
          <div className="grid grid-cols-2 gap-8 flex-1">
            {/* Left Panel */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-sm border flex flex-col flex-1 min-h-[300px]">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Define Your Tabs
              </h2>
              <p className="sr-only" id="tab-instructions">
                Use arrow keys to navigate between tabs. Press Home or End to
                jump to the first or last tab.
              </p>
              <p className="mb-4 text-gray-700 text-sm text-center">
                Use <kbd>←</kbd> / <kbd>→</kbd> to navigate tabs. Press{" "}
                <kbd>Home</kbd> or <kbd>End</kbd> to jump to first/last tab.
              </p>

              <div
                role="tablist"
                aria-label="Tab Headers"
                aria-orientation="horizontal"
                aria-describedby="tab-instructions"
                className="flex flex-col space-y-2 flex-1 w-full"
              >
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    role="tab"
                    id={`tab-${tab.id}-button`}
                    aria-selected={activeTabId === tab.id}
                    aria-controls={`tab-${tab.id}-panel`}
                    onClick={() => setActiveTabId(tab.id)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    tabIndex={activeTabId === tab.id ? 0 : -1}
                    className={`py-2 px-4 w-full rounded-md text-sm font-medium flex justify-between items-center border text-gray-800 transition-all duration-200 ease-in-out
                      ${
                        activeTabId === tab.id
                          ? "border-2 shadow-md"
                          : "hover:bg-transparent"
                      }
                      focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2`}
                  >
                    <div className="flex-grow flex justify-center items-center">
                      <span>{tab.header}</span>
                    </div>
                    {tabs.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTab(tab.id);
                        }}
                        aria-label={`Remove tab ${tab.header}`}
                        className="p-1 border border-gray-400 text-gray-800 text-xs font-bold rounded-md w-4 h-4 flex items-center justify-center hover:bg-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700"
                      >
                        X
                      </button>
                    )}
                  </button>
                ))}

                <button
                  onClick={addTab}
                  className="py-2 px-4 bg-transparent border text-gray-800 rounded-md text-sm font-medium hover:bg-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  ➕ Add Tab
                </button>
              </div>
            </div>

            {/* Right Panel */}
            <div className="bg-purple-100 p-6 rounded-lg shadow-sm border flex flex-col flex-1 min-h-[300px]">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Edit Tab Content
              </h2>
              {tabs.length === 0 ? (
                <p className="text-gray-600 italic">
                  Add a tab to start editing its content.
                </p>
              ) : (
                tabs.map(
                  (tab) =>
                    activeTabId === tab.id && (
                      <div
                        key={tab.id}
                        id={`tab-${tab.id}-panel`}
                        role="tabpanel"
                        aria-labelledby={`tab-${tab.id}-button`}
                        className="space-y-3 flex-1 flex flex-col"
                      >
                        <input
                          type="text"
                          value={tab.header}
                          onChange={(e) =>
                            updateTab(tab.id, "header", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 bg-transparent text-center"
                          placeholder="Tab Header"
                        />
                        <textarea
                          value={tab.content}
                          onChange={(e) =>
                            updateTab(tab.id, "content", e.target.value)
                          }
                          className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 resize-y bg-transparent text-center flex-1"
                          placeholder="Tab Content"
                        />
                      </div>
                    )
                )
              )}
            </div>
          </div>

          {/* Generated HTML */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-center">
                Generated HTML Output
              </h2>
              <button
                onClick={() => setShowHtml(!showHtml)}
                className="py-2 px-4 border text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                {showHtml ? "Hide HTML" : "Show HTML"}
              </button>
            </div>
            {showHtml && (
              <div className="relative">
                <pre
                  className="p-4 bg-gray-100 text-gray-800 rounded-lg overflow-auto max-h-96 text-sm font-mono leading-relaxed"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <code>{generateHTML()}</code>
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(generateHTML())}
                  className="absolute bottom-4 right-4 p-2 bg-gray-100 border text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
                  title="Copy HTML to clipboard"
                >
                  📋 Copy
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
