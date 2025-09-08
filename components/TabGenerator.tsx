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

  const addTab = () => {
    const newId = tabs.length > 0 ? Math.max(...tabs.map((t) => t.id)) + 1 : 1;
    setTabs([
      ...tabs,
      { id: newId, header: `Step ${newId}`, content: `Step ${newId} Content` },
    ]);
    setActiveTabId(newId);
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
          `<button onclick="openTab(event, 'tab-${tab.id}')" style="padding:10px; margin-right:5px; cursor:pointer; border:1px solid #ccc; background-color:#f0f0f0;">
          ${tab.header}
        </button>`
      )
      .join("\n");

    const contents = tabs
      .map(
        (tab) =>
          `<div id="tab-${tab.id}" style="display:none; margin-top:10px;">
          <h3>${tab.header}</h3>
          <p>${tab.content}</p>
        </div>`
      )
      .join("\n");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tabs Example</title>
  <script>
    function openTab(evt, tabId) {
      document.querySelectorAll('div[id^="tab-"]').forEach(el => el.style.display = 'none');
      document.getElementById(tabId).style.display = 'block';
      evt.currentTarget.style.backgroundColor = '#007bff';
      evt.currentTarget.style.color = 'white';
    }
    document.addEventListener('DOMContentLoaded', () => {
      const firstBtn = document.querySelector('button');
      if (firstBtn) firstBtn.click();
    });
  </script>
</head>
<body>
  <div>${buttons}</div>
  ${contents}
</body>
</html>`;
  };

  return (
    <main
      role="main"
      aria-labelledby="tab-generator-heading"
      className="px-4 py-8 space-y-6"
    >
      <div className="text-left">
        <Breadcrumbs />
      </div>

      <h1 id="tab-generator-heading" className="big-title">
        Tab Generator
      </h1>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Tab Headers</h2>

          {/* Screen reader instructions */}
          <p className="sr-only" id="tab-instructions">
            Use arrow keys to navigate between tabs. Press Home or End to jump
            to the first or last tab.
          </p>

          <div
            role="tablist"
            aria-label="Tab Headers"
            aria-orientation="vertical"
            aria-describedby="tab-instructions"
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
                className={`block w-full text-left p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeTabId === tab.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {tab.header}
              </button>
            ))}
          </div>

          <button
            onClick={addTab}
            className="mt-2 w-full p-2 bg-green-500 text-white rounded"
          >
            ➕ Add Tab
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Tab Content</h2>
          {tabs.map(
            (tab) =>
              activeTabId === tab.id && (
                <div
                  key={tab.id}
                  id={`tab-${tab.id}-panel`}
                  role="tabpanel"
                  aria-labelledby={`tab-${tab.id}-button`}
                  className="space-y-2"
                >
                  <input
                    type="text"
                    value={tab.header}
                    onChange={(e) =>
                      updateTab(tab.id, "header", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    placeholder="Tab Header"
                  />
                  <textarea
                    value={tab.content}
                    onChange={(e) =>
                      updateTab(tab.id, "content", e.target.value)
                    }
                    className="w-full h-32 p-2 border rounded"
                    placeholder="Tab Content"
                  />
                </div>
              )
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Output HTML</h2>
        <div className="relative" aria-live="polite" aria-atomic="true">
          <pre className="p-4 bg-gray-900 text-white rounded overflow-auto max-h-96">
            <code>{generateHTML()}</code>
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(generateHTML())}
            className="absolute top-2 right-2 p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            📋 Copy
          </button>
        </div>
      </div>
    </main>
  );
}
