"use client";

import { useState, useEffect } from "react";

interface Tab {
  id: number;
  header: string;
  content: string;
}

export default function TabGenerator() {
  const demoPresets: Record<number, Tab[]> = {
    1: [{ id: 1, header: "Step 1", content: "Step 1 Content" }],
    3: [
      { id: 1, header: "Step 1", content: "Step 1 Content" },
      { id: 2, header: "Step 2", content: "Step 2 Content" },
      { id: 3, header: "Step 3", content: "Step 3 Content" },
    ],
    5: [
      { id: 1, header: "Step 1", content: "Step 1 Content" },
      { id: 2, header: "Step 2", content: "Step 2 Content" },
      { id: 3, header: "Step 3", content: "Step 3 Content" },
      { id: 4, header: "Step 4", content: "Step 4 Content" },
      { id: 5, header: "Step 5", content: "Step 5 Content" },
    ],
  };

  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<number | null>(null);
  const [showHtml, setShowHtml] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialIsDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(initialIsDark);
    setIsInitialized(true);

    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  if (isDarkMode === null || !isInitialized) return null;

  const addTab = () => {
    const newId = tabs.length > 0 ? Math.max(...tabs.map((t) => t.id)) + 1 : 1;
    const newTab = {
      id: newId,
      header: `Step ${newId}`,
      content: `Step ${newId} Content`,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
  };

  const removeTab = (id: number) => {
    const updatedTabs = tabs.filter((t) => t.id !== id);
    setTabs(updatedTabs);
    if (activeTabId === id) setActiveTabId(updatedTabs[0]?.id ?? null);
  };

  const updateTab = (
    id: number,
    field: "header" | "content",
    value: string
  ) => {
    setTabs(tabs.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (!tabs.length) return;
    if (e.key === "ArrowRight")
      setActiveTabId(tabs[(index + 1) % tabs.length].id);
    else if (e.key === "ArrowLeft")
      setActiveTabId(tabs[(index - 1 + tabs.length) % tabs.length].id);
    else if (e.key === "Home") setActiveTabId(tabs[0].id);
    else if (e.key === "End") setActiveTabId(tabs[tabs.length - 1].id);
  };

  const generateHTML = () => {
    const styleBlock = `
<style>
.tab-button { padding: 10px 15px; cursor: pointer; border: 1px solid #ccc; background-color: #f3f4f6; color: #111827; border-radius: 6px; font-weight: 500; margin-right: 8px; }
.tab-button.active { background-color: #e5e7eb; box-shadow: 2px 2px 4px rgba(0,0,0,0.1); }
.tab-content { display: none; padding: 20px; border: 1px solid #e2e8f0; border-radius: 6px; background-color: white; margin-top: 16px; }
</style>
`;
    const buttons = tabs
      .map(
        (t) =>
          `<button class="tab-button" onclick="openTab(this, 'tab-${t.id}')" data-tab-id="tab-${t.id}">${t.header}</button>`
      )
      .join("\n");
    const contents = tabs
      .map(
        (t) =>
          `<div id="tab-${t.id}" class="tab-content"><h3>${t.header}</h3><p>${t.content}</p></div>`
      )
      .join("\n");
    const script = `
<script>
function openTab(evt, tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.tab-button').forEach(el => el.classList.remove('active'));
  const activeContent = document.getElementById(tabId);
  if (activeContent) activeContent.style.display = 'block';
  if (evt) evt.classList.add('active');
}
document.addEventListener('DOMContentLoaded', () => {
  const firstButton = document.querySelector('.tab-button');
  if (firstButton) openTab(firstButton, firstButton.getAttribute('data-tab-id'));
});
</script>
`;
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Tabs Example</title>
${styleBlock}
</head>
<body>
<div>${buttons}</div>
${contents}
${script}
</body>
</html>`;
  };

  const preloadTabs = (count: number) => {
    const exampleTabs: Tab[] = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      header: `Step ${i + 1}`,
      content: `Step ${i + 1} Content`,
    }));
    setTabs(exampleTabs);
    setActiveTabId(exampleTabs[0]?.id || 0);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateHTML());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto p-8">
        <h1
          className={`text-5xl font-bold mb-8 text-center ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Tab Generator
        </h1>

        <div role="main" className="w-full mx-auto space-y-8">
          {/* Grid Panels */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Define Tabs Panel */}
            <div
              className={`p-6 rounded-lg shadow-lg border flex flex-col w-full flex-1 ${
                isDarkMode
                  ? "bg-gray-700 text-gray-100"
                  : "bg-blue-50 text-gray-900"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Define Your Tabs
              </h2>

              {/* Demo Tabs Buttons (kept only here) */}
              <div className="flex space-x-2 mb-4">
                <span className="self-center font-semibold">Demo Tabs:</span>
                <button
                  onClick={() => preloadTabs(1)}
                  className="py-1 px-2 border rounded-md"
                >
                  1 Tab
                </button>
                <button
                  onClick={() => preloadTabs(3)}
                  className="py-1 px-2 border rounded-md"
                >
                  3 Tabs
                </button>
                <button
                  onClick={() => preloadTabs(5)}
                  className="py-1 px-2 border rounded-md"
                >
                  5 Tabs
                </button>
              </div>

              <div
                role="tablist"
                aria-label="Tab Headers"
                className="flex flex-col space-y-2"
              >
                {tabs.map((tab, idx) => (
                  <div key={tab.id} className="flex items-center space-x-2">
                    <button
                      role="tab"
                      aria-selected={activeTabId === tab.id}
                      onClick={() => setActiveTabId(tab.id)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      tabIndex={activeTabId === tab.id ? 0 : -1}
                      className={`py-2 px-4 w-full rounded-md text-sm font-medium border ${
                        activeTabId === tab.id
                          ? "bg-blue-500 text-white"
                          : isDarkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-white text-gray-900"
                      }`}
                    >
                      {tab.header}
                    </button>
                    {tabs.length > 1 && (
                      <button
                        onClick={() => removeTab(tab.id)}
                        aria-label={`Remove ${tab.header}`}
                        className="text-xs"
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addTab}
                  className="py-2 px-4 border rounded-md mt-2"
                >
                  ➕ Add Tab
                </button>
              </div>
            </div>

            {/* Edit Tab Content Panel */}
            <div
              className={`p-6 rounded-lg shadow-lg border flex flex-col w-full flex-1 ${
                isDarkMode
                  ? "bg-gray-700 text-gray-100"
                  : "bg-blue-50 text-gray-900"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Edit Tab Content
              </h2>
              {tabs
                .filter((t) => t.id === activeTabId)
                .map((tab) => (
                  <div key={tab.id} className="space-y-3 flex flex-col">
                    <input
                      type="text"
                      value={tab.header}
                      onChange={(e) =>
                        updateTab(tab.id, "header", e.target.value)
                      }
                      className="w-full p-3 border rounded-md"
                      placeholder="Tab Header"
                    />
                    <textarea
                      value={tab.content}
                      onChange={(e) =>
                        updateTab(tab.id, "content", e.target.value)
                      }
                      className="w-full h-40 p-3 border rounded-md resize-y"
                      placeholder="Tab Content"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Generated HTML Panel */}
          <div
            className={`p-6 rounded-lg shadow-lg border w-full ${
              isDarkMode
                ? "bg-gray-700 text-gray-100"
                : "bg-blue-50 text-gray-900"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Generated HTML Output</h2>
              <button
                onClick={() => setShowHtml(!showHtml)}
                className="py-2 px-4 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {showHtml ? "Hide HTML" : "Show HTML"}
              </button>
            </div>
            {showHtml && (
              <div>
                <pre className="p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono leading-relaxed border">
                  <code>{generateHTML()}</code>
                </pre>
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 border rounded-md"
                    title="Copy HTML to clipboard"
                  >
                    {copied ? "Copied!" : "📋 Copy"}
                  </button>
                  <div
                    aria-live="polite"
                    className="text-green-500 self-center"
                  >
                    {copied ? "Copied to clipboard!" : ""}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
