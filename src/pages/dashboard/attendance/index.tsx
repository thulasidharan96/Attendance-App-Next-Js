import { Layout } from "@/components/layout";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DashboardHeader } from "@/components/dashboard/header";
import LeaveForm from "@/components/LeaveForm";
import { UserApi } from "@/pages/api/User";
import LeaveStatus from "@/components/LeaveStstus";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  const FetchAttendance = async () => {
    try {
      const response = await UserApi();
      if (response && response.data) {
        //console.log("API Response:", response.data);
        const sortedData = response.data.sort(
          (a: { dateOnly: string }, b: { dateOnly: string }) =>
            new Date(b.dateOnly).getTime() - new Date(a.dateOnly).getTime()
        );

        setAttendanceData(sortedData);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    FetchAttendance();
  }, []);

  return (
    <Layout>
      <DashboardHeader />

      {/* Wrapper that applies blur effect when form is open */}
      <div className={isFormOpen ? "blur-sm pointer-events-none" : ""}>
        <div className="mx-auto">
          {/* Button to open the leave form */}
          <div className="flex justify-end gap-2">
            <LeaveStatus />
            <div className="flex flex-col items-center gap-2 p-2">
              <Button
                className="font-medium py-2 px-4 rounded-lg shadow-md bg-purple1"
                onClick={() => setIsFormOpen(true)}
              >
                Leave Form
              </Button>
            </div>

            {/* <button
              className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition"
              onClick={() => setIsFormOpen(true)}
            >
              Leave Form
            </button> */}
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Attendance</h1>

            {/* Table Wrapper with Fixed Header & Scrollable Body */}
            <div className="w-full border rounded-lg flex flex-col min-h-0 shadow-lg overflow-hidden">
              {/* Sticky Header */}
              <div className="sticky top-0 shadow-md px-4 py-2 z-10 rounded-t-lg">
                <div className="flex justify-between font-semibold">
                  <h2 className="w-1/2">Date</h2>
                  <h2 className="w-1/2 text-center">Status</h2>
                </div>
              </div>

              {/* Scrollable Table Body */}
              <div className="flex-1 overflow-y-auto max-h-[60vh] touch-auto">
                <Table className="w-full text-sm sm:text-base">
                  <TableBody>
                    {attendanceData.length > 0 ? (
                      attendanceData.map(
                        (
                          record: {
                            _id: string;
                            dateOnly: string;
                            attendanceStatus: string;
                          },
                          index
                        ) => (
                          <TableRow
                            key={record._id || index}
                            className="text-sm sm:text-base"
                          >
                            <TableCell className="px-4 py-2">
                              {record.dateOnly}
                            </TableCell>
                            <TableCell className="text-center px-4 py-2">
                              <span
                                className={`p-1 rounded-lg text-sm font-medium sm:text-base ${
                                  record.attendanceStatus === "present"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {record.attendanceStatus}
                              </span>
                            </TableCell>
                          </TableRow>
                        )
                      )
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center py-4">
                          No attendance records found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Form Popup */}
      <LeaveForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </Layout>
  );
};

export default Index;
