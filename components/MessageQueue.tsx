"use client";
import { useEffect, useState } from "react";
import FineAlert from "@/components/FineAlert";

const messages = [
  {
    id: "imgAlt",
    text: "Fix alt in img1",
    escalateAfter: 120000,
    law: "Disability Act",
  },
  {
    id: "inputValidation",
    text: "Fix input validation",
    escalateAfter: 120000,
    law: "Laws of Tort",
  },
];

export default function MessageQueue() {
  const [activeMessages, setActiveMessages] = useState<any[]>([]);
  const [fines, setFines] = useState<string[]>([]);
  const [fineAlerts, setFineAlerts] = useState<
    { id: string; message: string; law: string }[]
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = messages[Math.floor(Math.random() * messages.length)];
      console.log("Trying to add message:", next.id);

      setActiveMessages((prev) => {
        if (!prev.find((m) => m.id === next.id)) {
          console.log("Added message:", next.id);

          return [...prev, { ...next, timestamp: Date.now() }];
        }
        return prev;
      });
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const escalationCheck = setInterval(() => {
      const now = Date.now();
      activeMessages.forEach((msg) => {
        const overdue = now - msg.timestamp > msg.escalateAfter;
        const alreadyFined = fines.includes(msg.id);

        if (overdue && !alreadyFined) {
          setFines((prev) => [...prev, msg.id]);
          setFineAlerts((prev) => [
            ...prev,
            {
              id: `${msg.id}-${Date.now()}`,
              message: msg.text,
              law: msg.law,
            },
          ]);
          console.log("Fined:", msg.id);
        }
      });
    }, 10000);

    return () => clearInterval(escalationCheck);
  }, [activeMessages, fines]);

  const dismissAlert = (id: string) => {
    setFineAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">📨 Messages:</h3>
      <ul className="space-y-2">
        {activeMessages.map((msg) => (
          <li key={msg.id} className="bg-yellow-100 text-black p-2 rounded">
            {msg.text}
          </li>
        ))}
      </ul>

      <div className="fixed bottom-4 right-4 flex flex-col gap-4 z-50">
        {fineAlerts.map((alert, index) => (
          <div
            key={alert.id}
            style={{ transform: `translateY(-${index * 10}px)` }}
          >
            <FineAlert
              message={alert.message}
              law={alert.law}
              onClose={() => dismissAlert(alert.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
