import React, { useState } from "react";

interface LeaveFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeaveForm: React.FC<LeaveFormProps> = ({ isOpen, onClose }) => {
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className=" p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Leave Application</h2>

        <label className="block text-sm font-medium text-gray-700">
          From Date
        </label>
        <input
          type="date"
          value={fromDate}
          min={today} // Prevent past dates
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full p-2 border rounded-lg mb-3"
        />

        <label className="block text-sm font-medium text-gray-700">
          To Date
        </label>
        <input
          type="date"
          value={toDate}
          min={fromDate || today} // Prevent past dates and ensure "To Date" is not before "From Date"
          onChange={(e) => setToDate(e.target.value)}
          className="w-full p-2 border rounded-lg mb-3"
        />

        <label className="block text-sm font-medium text-gray-700">
          Reason
        </label>
        <input
          type="text"
          placeholder="Enter reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
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
