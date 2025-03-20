import React, { useState } from "react";
import { useThemeStyles } from "@/components/Hook/useThemeStyles";
import { LeaveRequest } from "@/pages/api/User";

interface LeaveFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeaveForm: React.FC<LeaveFormProps> = ({ isOpen, onClose }) => {
  const { themeStyles } = useThemeStyles();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const predefinedReasons = [
    "Sick Leave",
    "Family Emergency",
    "Personal Work",
    "Other",
  ];

  const handleSubmit = async () => {
    const finalReason = reason === "Other" ? customReason : reason;

    if (!fromDate || !toDate || !finalReason.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    if (fromDate > toDate) {
      alert("To Date must be after From Date.");
      return;
    }

    try {
      const response = await LeaveRequest({
        fromDate,
        toDate,
        reason: finalReason,
      });

      // Check if response is an error object
      if (response && response.status === 400) {
        alert(
          response.message || "You have already applied for leave on this date."
        );
        return;
      }

      if (response) {
        alert("Leave Request Sent Successfully");
        onClose();
        // Optionally refresh the page or update the UI
      } else {
        alert("Failed to submit leave request.");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("An error occurred while submitting the leave request.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div
        className={`p-6 rounded-lg shadow-lg w-96 transition-colors ${themeStyles.background} ${themeStyles.text}`}
      >
        <h2 className="text-xl font-semibold mb-4">Leave Application</h2>

        <label className="block text-sm font-medium">From Date</label>
        <input
          type="date"
          value={fromDate}
          min={today}
          onChange={(e) => setFromDate(e.target.value)}
          className={`w-full p-2 border rounded-lg mb-3 transition-colors ${themeStyles.inputBg}`}
        />

        <label className="block text-sm font-medium">To Date</label>
        <input
          type="date"
          value={toDate}
          min={fromDate || today}
          onChange={(e) => setToDate(e.target.value)}
          className={`w-full p-2 border rounded-lg mb-3 transition-colors ${themeStyles.inputBg}`}
        />

        <label className="block text-sm font-medium">Reason</label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className={`w-full p-2 border rounded-lg mb-3 transition-colors ${themeStyles.inputBg}`}
        >
          <option value="">Select a reason</option>
          {predefinedReasons.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {reason === "Other" && (
          <input
            type="text"
            placeholder="Enter custom reason"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            className={`w-full p-2 border rounded-lg mb-4 transition-colors ${themeStyles.inputBg}`}
          />
        )}

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
