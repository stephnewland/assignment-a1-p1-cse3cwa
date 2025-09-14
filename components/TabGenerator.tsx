"use client";

import { useState, useEffect } from "react";

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
  const [copied, setCopied] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.title = "Tab Generator - CSE3CWA";
    setIsDarkMode(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

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

  // ✅ Inline-only generated HTML
  const generateHTML = () => {
    const buttonStyle = `
      padding:10px 15px; 
      cursor:pointer; 
      border:1px solid #ccc;
      background-color:#f3f4f6; 
      color:#111827;
      border-radius:6px; 
      font-weight:500; 
      margin-right:8px;
    `;

    const activeButtonStyle = `
      ${buttonStyle}
      background-color:#e5e7eb; 
      box-shadow:2px 2px 4px rgba(0,0,0,0.1);
    `;

    const contentStyle = `
      display:none; 
      padding:20px; 
      border:1px solid #e2e8f0; 
      border-radius:6px; 
      background-color:white; 
      margin-top:16px;
    `;

    const buttons = tabs
      .map(
        (tab) => `
          <button 
            style="${buttonStyle}" 
            onclick="openTab(event, 'tab-${tab.id}')"
            data-tab-id="tab-${tab.id}">
            ${tab.header}
          </button>
        `
      )
      .join("\n");

    const contents = tabs
      .map(
        (tab) => `
          <div id="tab-${tab.id}" style="${contentStyle}">
            <h3>${tab.header}</h3>
            <p>${tab.content}</p>
          </div>
        `
      )
      .join("\n");

    const scriptForHTML = `
<script>
  function openTab(evt, tabId) {
    document.querySelectorAll('[id^="tab-"]').forEach(el => el.style.display = 'none');
    document.querySelectorAll('button[data-tab-id]').forEach(el => el.setAttribute('style', '${buttonStyle}'));
    const activeContent = document.getElementById(tabId);
    if(activeContent) activeContent.style.display = 'block';
    if(evt && evt.currentTarget) evt.currentTarget.setAttribute('style', '${activeButtonStyle}');
  }
  document.addEventListener('DOMContentLoaded', () => {
    const firstButton = document.querySelector('button[data-tab-id]');
    if(firstButton) {
      const firstTabId = firstButton.getAttribute('data-tab-id');
      if(firstTabId) openTab({ currentTarget: firstButton }, firstTabId);
    }
  });
</script>
`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Tabs Example</title>
</head>
<body>
<div>${buttons}</div>
${contents}
${scriptForHTML}
</body>
</html>`;
  };

  const copyToClipboard = () => {
    const htmlCode = generateHTML();
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = htmlCode;
    document.body.appendChild(tempTextarea);
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto p-8">
        <h1
          id="tab-generator-heading"
          className={`text-5xl font-bold mb-8 text-center ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Tab Generator
        </h1>

        {/* Main content constrained */}
        <div
          role="main"
          aria-labelledby="tab-generator-heading"
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Grid Panels */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Panel */}
            <div
              className={`p-6 rounded-lg shadow-sm border flex flex-col ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              }`}
            >
              <h2
                className={`text-2xl font-semibold mb-4 text-center ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Define Your Tabs
              </h2>
              <div
                role="tablist"
                aria-label="Tab Headers"
                aria-orientation="horizontal"
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
                    className={`py-2 px-4 w-full rounded-md text-sm font-medium border ${
                      activeTabId === tab.id
                        ? "bg-blue-500 text-white"
                        : isDarkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {tab.header}
                    {tabs.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTab(tab.id);
                        }}
                        aria-label={`Remove tab ${tab.header}`}
                        className="ml-2 text-xs"
                      >
                        X
                      </button>
                    )}
                  </button>
                ))}
                <button
                  onClick={addTab}
                  className="py-2 px-4 border rounded-md"
                >
                  ➕ Add Tab
                </button>
              </div>
            </div>

            {/* Right Panel */}
            <div
              className={`p-6 rounded-lg shadow-sm border flex flex-col ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              }`}
            >
              <h2
                className={`text-2xl font-semibold mb-4 text-center ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Edit Tab Content
              </h2>
              {tabs
                .filter((tab) => tab.id === activeTabId)
                .map((tab) => (
                  <div key={tab.id} className="space-y-3 flex-1 flex flex-col">
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

          {/* Generated HTML */}
          <div
            className={`p-6 rounded-lg shadow-sm border ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Generated HTML Output</h2>
              <button
                onClick={() => setShowHtml(!showHtml)}
                className="py-2 px-4 border rounded-md"
              >
                {showHtml ? "Hide HTML" : "Show HTML"}
              </button>
            </div>
            {showHtml && (
              <div className="relative">
                <pre className="p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono leading-relaxed border">
                  <code>{generateHTML()}</code>
                </pre>
                <button
                  onClick={copyToClipboard}
                  className="absolute bottom-4 right-4 p-2 border rounded-md"
                  title="Copy HTML to clipboard"
                >
                  {copied ? "Copied!" : "📋 Copy"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
