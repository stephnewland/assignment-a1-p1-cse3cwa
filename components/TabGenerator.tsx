"use client";

import { useState, useEffect } from "react";

// The Breadcrumbs component is defined here to resolve the compilation error.
const Breadcrumbs = () => {
  return (
    <nav
      className="text-gray-500 dark:text-gray-400 p-4"
      aria-label="Breadcrumbs"
    >
      <ol className="list-none p-0 inline-flex space-x-2">
        <li className="flex items-center">
          <a
            href="#"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Home
          </a>
          <span className="mx-2">/</span>
        </li>
        <li className="flex items-center">
          <a
            href="#"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Generator Tools
          </a>
          <span className="mx-2">/</span>
        </li>
        <li className="flex items-center">
          <span className="text-gray-800 dark:text-gray-200 font-semibold">
            Tab Generator
          </span>
        </li>
      </ol>
    </nav>
  );
};

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

  // State to manage the theme within this component
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.title = "Tab Generator - CSE3CWA";
    // Check for the 'dark' class on the HTML element and set the initial state
    setIsDarkMode(document.documentElement.classList.contains("dark"));

    // Observe changes to the 'dark' class on the HTML element
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

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }

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
  html.dark {
    --bg-primary: #1F2937;
    --bg-secondary: #374151;
    --text-primary: #D1D5DB;
    --text-secondary: #9CA3AF;
  }
  html:not(.dark) {
    --bg-primary: white;
    --bg-secondary: #F3F4F6;
    --text-primary: #111827;
    --text-secondary: #4B5563;
  }
  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: sans-serif;
    margin: 0;
    padding: 20px;
  }
  .tab-buttons-container { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
  .tab-button {
    padding: 10px 15px; cursor: pointer; border: 1px solid #ccc;
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    border-radius: 6px; font-weight: 500; transition: all 0.2s ease-in-out;
  }
  .tab-button:hover { background-color: var(--bg-secondary); }
  .tab-button.active {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
  .tab-content { display: none; padding: 20px; border: 1px solid #e2e8f0; border-radius: 6px; background-color: var(--bg-primary); margin-top: 16px; }
  .tab-content h3 { margin-top: 0; margin-bottom: 10px; color: var(--text-primary); }
  .tab-content p { color: var(--text-secondary); line-height: 1.6; }
</style>
`;
    const toggleButtonForHTML = `
<button onclick="toggleTheme()" style="position:fixed; top:10px; right:10px; padding:8px 12px; background:var(--bg-secondary); color:var(--text-primary); border:1px solid #ccc; border-radius:6px; cursor:pointer;">
  Toggle Theme
</button>`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Tabs Example</title>
${stylesForHTML}
${scriptForHTML}
</head>
<body>
${toggleButtonForHTML}
<div class="tab-buttons-container">${buttons}</div>
${contents}
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
    // The main container for the component, ensuring it fills the screen and has a transition for theme changes.
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex justify-between items-start px-4 py-8">
        <div className="text-left">
          <Breadcrumbs />
        </div>
      </div>

      <div className="container mx-auto">
        {/* The main content card, now explicitly using isDarkMode for background color */}
        <div
          role="main"
          aria-labelledby="tab-generator-heading"
          className={`space-y-6 max-w-4xl mx-auto rounded-xl p-8 shadow-lg transition-colors duration-300 ease-in-out ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Main heading, now explicitly using isDarkMode for text color */}
          <h1
            id="tab-generator-heading"
            className={`text-5xl font-bold mb-4 text-center transition-colors duration-300 ease-in-out ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Tab Generator
          </h1>

          {/* Grid Panels */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Panel, explicitly using isDarkMode for background and text colors */}
            <div
              className={`p-6 rounded-lg shadow-sm border flex flex-col min-h-[300px] transition-colors duration-300 ease-in-out ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              } border-gray-200 dark:border-gray-700`}
            >
              <h2
                className={`text-2xl font-semibold mb-4 text-center transition-colors duration-300 ease-in-out ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Define Your Tabs
              </h2>
              <p className="sr-only" id="tab-instructions">
                Use arrow keys to navigate between tabs. Press Home or End to
                jump to the first or last tab.
              </p>
              <p
                className={`mb-4 text-sm text-center transition-colors duration-300 ease-in-out ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
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
                    className={`py-2 px-4 w-full rounded-md text-sm font-medium flex justify-between items-center border transition-all duration-200 ease-in-out
                      ${
                        activeTabId === tab.id
                          ? "bg-blue-500 text-white border-blue-600 shadow-md"
                          : `${
                              isDarkMode
                                ? "bg-gray-700 text-gray-300"
                                : "bg-gray-100 text-gray-800"
                            } hover:bg-gray-200 dark:hover:bg-gray-600`
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
                        className={`p-1 border text-xs font-bold rounded-md w-4 h-4 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700 border-gray-400 dark:border-gray-500 ${
                          isDarkMode ? "text-gray-300" : "text-gray-800"
                        } hover:bg-transparent`}
                      >
                        X
                      </button>
                    )}
                  </button>
                ))}

                <button
                  onClick={addTab}
                  className={`py-2 px-4 border rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-white text-gray-800"
                  } hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  ➕ Add Tab
                </button>
              </div>
            </div>

            {/* Right Panel, explicitly using isDarkMode for background and text colors */}
            <div
              className={`p-6 rounded-lg shadow-sm border flex flex-col min-h-[300px] transition-colors duration-300 ease-in-out ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              } border-gray-200 dark:border-gray-700`}
            >
              <h2
                className={`text-2xl font-semibold mb-4 text-center transition-colors duration-300 ease-in-out ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Edit Tab Content
              </h2>
              {tabs.length === 0 ? (
                <p
                  className={`italic transition-colors duration-300 ease-in-out ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
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
                          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300 ease-in-out ${
                            isDarkMode
                              ? "bg-gray-800 text-gray-200"
                              : "bg-gray-100 text-gray-800"
                          } border-gray-300 dark:border-gray-600 focus:ring-gray-500 dark:focus:ring-gray-400`}
                          placeholder="Tab Header"
                        />
                        <textarea
                          value={tab.content}
                          onChange={(e) =>
                            updateTab(tab.id, "content", e.target.value)
                          }
                          className={`w-full h-40 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 resize-y flex-1 transition-colors duration-300 ease-in-out ${
                            isDarkMode
                              ? "bg-gray-800 text-gray-200"
                              : "bg-gray-100 text-gray-800"
                          } border-gray-300 dark:border-gray-600 focus:ring-gray-500 dark:focus:ring-gray-400`}
                          placeholder="Tab Content"
                        />
                      </div>
                    )
                )
              )}
            </div>
          </div>

          {/* Generated HTML */}
          <div
            className={`p-6 rounded-lg shadow-sm border transition-colors duration-300 ease-in-out ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } border-gray-200 dark:border-gray-700`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-2xl font-semibold transition-colors duration-300 ease-in-out ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Generated HTML Output
              </h2>
              <button
                onClick={() => setShowHtml(!showHtml)}
                className={`py-2 px-4 border rounded-md text-sm font-medium transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-800"
                } hover:bg-gray-200 dark:hover:bg-gray-600`}
              >
                {showHtml ? "Hide HTML" : "Show HTML"}
              </button>
            </div>
            {showHtml && (
              <div className="relative">
                <pre
                  className={`p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono leading-relaxed border transition-colors duration-300 ease-in-out ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-100 text-gray-800"
                  } border-gray-300 dark:border-gray-700`}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <code>{generateHTML()}</code>
                </pre>
                <button
                  onClick={copyToClipboard}
                  className={`absolute bottom-4 right-4 p-2 border rounded-md transition-colors duration-200 ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-white text-gray-800"
                  } hover:bg-gray-200 dark:hover:bg-gray-700`}
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
