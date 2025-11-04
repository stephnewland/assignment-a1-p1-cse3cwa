"use client";

export default function FineAlert({
  message,
  law,
  onClose,
}: {
  message: string;
  law: string;
  onClose: () => void;
}) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-800 p-4 rounded shadow-lg max-w-sm w-full">
      <p>
        🚨 Courtroom fine issued for <em>{message}</em> under <em>{law}</em>
      </p>
      <button
        onClick={onClose}
        className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Close
      </button>
    </div>
  );
}
