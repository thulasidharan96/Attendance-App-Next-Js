import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { getRecentLeaveStatus } from "@/pages/api/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define API response type
interface LeaveRequestResponse {
  recentLeaveRequest?: {
    StartDate: string;
    EndDate: string;
    Reason?: string;
    status?: string;
  };
}

// Define local state type
interface LeaveRequest {
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}

const LeaveStatus = () => {
  const [showLeaveStatus, setShowLeaveStatus] = useState<boolean>(false);
  const [leaveData, setLeaveData] = useState<LeaveRequest | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLeaveStatus = async () => {
    setLoading(true);
    try {
      const response = (await getRecentLeaveStatus()) as LeaveRequestResponse;
      if (response?.recentLeaveRequest) {
        const { StartDate, EndDate, Reason, status } =
          response.recentLeaveRequest;
        setLeaveData({
          startDate: new Date(StartDate).toLocaleDateString(),
          endDate: new Date(EndDate).toLocaleDateString(),
          reason: Reason || "No Reason Provided",
          status: status || "Pending",
        });
      } else {
        setLeaveData(null);
      }
    } catch (error) {
      console.error("Error fetching leave status:", error);
      setLeaveData(null);
    } finally {
      setLoading(false);
    }
  };
  const getStatusClasses = (status: string): string => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 p-2">
      <Button
        className="font-medium py-2 px-4 rounded-lg shadow-md bg-orange-500"
        onClick={() => {
          setShowLeaveStatus(true);
          fetchLeaveStatus();
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Leave Status"}
      </Button>
      {showLeaveStatus && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-80 z-50 p-4">
          <Card className="w-96 shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-center">
                Leave Request Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center text-gray-700 dark:text-gray-300">
                  Fetching leave status...
                </p>
              ) : leaveData ? (
                <div className="space-y-3">
                  <p className="flex justify-between">
                    <strong>Start Date:</strong>{" "}
                    <span>{leaveData.startDate}</span>
                  </p>
                  <p className="flex justify-between">
                    <strong>End Date:</strong> <span>{leaveData.endDate}</span>
                  </p>
                  <p className="flex justify-between">
                    <strong>Reason:</strong> <span>{leaveData.reason}</span>
                  </p>
                  <p className="flex justify-between">
                    <strong>Status:</strong>
                    <span
                      className={`px-3 py-1 rounded-lg ${getStatusClasses(
                        leaveData.status
                      )}`}
                    >
                      {leaveData.status}
                    </span>
                  </p>
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No Previous Leave Data
                </p>
              )}
              <div className="flex justify-end gap-3 mt-4">
                <Button
                  variant="secondary"
                  onClick={() => setShowLeaveStatus(false)}
                >
                  Close
                </Button>
                <Button onClick={fetchLeaveStatus} disabled={loading}>
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  {loading ? "Refreshing..." : "Refresh"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LeaveStatus;
