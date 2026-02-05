"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import { DebugLog } from "./MainLayout";

const MobileDebugPanel = ({
  addLog,
  logs,
}: {
  addLog: (message: string, type: DebugLog["type"]) => void;
  logs: DebugLog[];
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useSelector((state: Rootstate) => state.auth);

  //   const addLog = (message: string, type: DebugLog["type"] = "info") => {
  //     const timestamp = new Date().toLocaleTimeString();
  //     setLogs((prev) => [...prev, { timestamp, message, type }].slice(-10)); // Keep last 10 logs
  //   };

  useEffect(() => {
    // Log initial state
    addLog(`User authenticated: ${user.isAuthenticated}`, "info");
    addLog(`User email: ${user.email || "none"}`, "info");

    const csrfToken = localStorage.getItem("csrfToken");
    addLog(
      `CSRF token exists: ${!!csrfToken}`,
      csrfToken ? "success" : "error",
    );

    if (csrfToken) {
      addLog(`CSRF token: ${csrfToken.substring(0, 20)}...`, "info");
    }

    // Check if cookies are accessible
    addLog(
      `Document.cookie: ${document.cookie || "EMPTY"}`,
      document.cookie ? "success" : "warning",
    );

    // Log user agent
    addLog(
      `Device: ${/mobile/i.test(navigator.userAgent) ? "Mobile" : "Desktop"}`,
      "info",
    );

    // Log current URL
    addLog(`Current URL: ${window.location.href}`, "info");
  }, [user]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-[99999] text-xs"
      >
        Show Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 text-white p-4 z-[99999] max-h-[50vh] overflow-y-auto text-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">🔍 Mobile Debug Panel</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="bg-red-500 px-2 py-1 rounded text-xs"
        >
          Hide
        </button>
      </div>

      <div className="space-y-1 mb-3">
        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="text-gray-400">Authenticated:</span>
          <span
            className={user.isAuthenticated ? "text-green-400" : "text-red-400"}
          >
            {user.isAuthenticated ? "✓ YES" : "✗ NO"}
          </span>
        </div>

        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="text-gray-400">Email:</span>
          <span className="text-yellow-400">{user.email || "none"}</span>
        </div>

        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="text-gray-400">CSRF Token:</span>
          <span
            className={
              localStorage.getItem("csrfToken")
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {localStorage.getItem("csrfToken") ? "✓ Present" : "✗ Missing"}
          </span>
        </div>

        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="text-gray-400">Cookies:</span>
          <span className={document.cookie ? "text-green-400" : "text-red-400"}>
            {document.cookie ? "✓ Present" : "✗ Empty"}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-2">
        <div className="font-bold mb-1">Recent Logs:</div>
        {logs.map((log, idx) => (
          <div key={idx} className="text-[10px] mb-1">
            <span className="text-gray-500">[{log.timestamp}]</span>{" "}
            <span
              className={
                log.type === "success"
                  ? "text-green-400"
                  : log.type === "error"
                    ? "text-red-400"
                    : log.type === "warning"
                      ? "text-yellow-400"
                      : "text-gray-300"
              }
            >
              {log.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileDebugPanel;
