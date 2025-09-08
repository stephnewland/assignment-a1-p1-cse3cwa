"use client";

import { useState } from "react";

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

  const generateHTML = () => {
    const buttons = tabs
      .map(
        (tab) =>
          `<button class="tab-button" onclick="openTab(event, 'tab-${tab.id}')">${tab.header}</button>`
      )
      .join("\n");

    const contents = tabs
      .map(
        (tab) =>
          `<div id="tab-${tab.id}" class="tab-content"><h3>${tab.header}</h3><p>${tab.content}</p></div>`
      )
      .join("\n");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tabs Example</title>
  <style>
    .tab-button { padding: 10px; margin-right: 5px; cursor: pointer; }
    .tab-content { display: none; margin-top: 10px; }
    .tab-button.active { background-color: #007bff; color: white; }
    .tab-content.active { display: block; }
  </style>
</head>
<body>
  <div class="tabs-header">${buttons}</div>
  ${contents}
  <script>
    function openTab(evt, tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      document.getElementById(tabId).style.display = 'block';
      evt.currentTarget.classList.add('active');
    }
    document.addEventListener('DOMContentLoaded', () => {
      const firstBtn = document.querySelector('.tab-button');
      if (firstBtn) firstBtn.click();
    });
  </script>
</body>
</html>`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Tab Headers</h2>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`block w-full text-left p-2 rounded ${
                activeTabId === tab.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {tab.header}
            </button>
          ))}
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
                <div key={tab.id} className="space-y-2">
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
        <div className="relative">
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
    </div>
  );
}
