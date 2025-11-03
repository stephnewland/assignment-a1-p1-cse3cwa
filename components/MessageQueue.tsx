"use client";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const interval = setInterval(() => {
      const next = messages[Math.floor(Math.random() * messages.length)];
      if (!activeMessages.find((m) => m.id === next.id)) {
        setActiveMessages((prev) => [
          ...prev,
          { ...next, timestamp: Date.now() },
        ]);
      }
    }, 25000);
    return () => clearInterval(interval);
  }, [activeMessages]);

  useEffect(() => {
    const escalationCheck = setInterval(() => {
      const now = Date.now();
      activeMessages.forEach((msg) => {
        if (
          now - msg.timestamp > msg.escalateAfter &&
          !fines.includes(msg.id)
        ) {
          setFines((prev) => [...prev, msg.id]);
          alert(`🚨 Courtroom fine issued for ${msg.text} under ${msg.law}`);
        }
      });
    }, 10000);
    return () => clearInterval(escalationCheck);
  }, [activeMessages, fines]);

  return (
    <div>
      <h3>Incoming Messages:</h3>
      <ul>
        {activeMessages.map((msg) => (
          <li key={msg.id}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
}
