import React, { useState } from "react";
import { useTheme } from "next-themes";

interface LeaveFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeaveForm: React.FC<LeaveFormProps> = ({ isOpen, onClose }) => {
  const { resolvedTheme } = useTheme(); // Get current theme
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = () => {
    if (!fromDate || !toDate || !reason.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (fromDate > toDate) {
      alert("To Date must be after From Date.");
      return;
    }

    console.log({ fromDate, toDate, reason });
    alert("Leave Application Submitted!");
    onClose();
  };

  if (!isOpen) return null;

  // Set dynamic styles based on theme
  const isDarkMode = resolvedTheme === "dark";
  const formBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const inputBg = isDarkMode
    ? "bg-gray-700 border-gray-600 text-white"
    : "bg-gray-100 border-gray-300 text-gray-900";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div
        className={`p-6 rounded-lg shadow-lg w-96 transition-colors ${formBg} ${textColor}`}
      >
        <h2 className="text-xl font-semibold mb-4">Leave Application</h2>

        <label className="block text-sm font-medium">From Date</label>
        <input
          type="date"
          value={fromDate}
          min={today}
          onChange={(e) => setFromDate(e.target.value)}
          className={`w-full p-2 border rounded-lg mb-3 transition-colors ${inputBg}`}
        />

        <label className="block text-sm font-medium">To Date</label>
        <input
          type="date"
          value={toDate}
          min={fromDate || today}
          onChange={(e) => setToDate(e.target.value)}
          className={`w-full p-2 border rounded-lg mb-3 transition-colors ${inputBg}`}
        />

        <label className="block text-sm font-medium">Reason</label>
        <input
          type="text"
          placeholder="Enter reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className={`w-full p-2 border rounded-lg mb-4 transition-colors ${inputBg}`}
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-400 text-gray-900 rounded-lg hover:bg-gray-500 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveForm;
