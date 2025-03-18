import { Layout } from "@/components/layout";
import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import { DashboardHeader } from "@/components/dashboard/header";
import LeaveForm from "@/components/LeaveForm";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const invoices = useMemo(
    () => [
      { invoice: "INV001", paymentStatus: "Paid" },
      { invoice: "INV002", paymentStatus: "Pending" },
      { invoice: "INV003", paymentStatus: "Unpaid" },
      { invoice: "INV004", paymentStatus: "Paid" },
      { invoice: "INV005", paymentStatus: "Paid" },
      { invoice: "INV006", paymentStatus: "Pending" },
      { invoice: "INV007", paymentStatus: "Unpaid" },
      { invoice: "INV008", paymentStatus: "Unpaid" },
      { invoice: "INV009", paymentStatus: "Unpaid" },
      { invoice: "INV010", paymentStatus: "Unpaid" },
    ],
    []
  );

  return (
    <Layout>
      <DashboardHeader />

      <div className={isFormOpen ? "blur-md pointer-events-none" : ""}>
        <div className="mb-4">
          <button
            className="px-4 py-2 bg-purple1 text-white font-medium rounded-lg hover:bg-primary-dark transition focus:ring-2 focus:ring-primary-light"
            onClick={() => setIsFormOpen(true)}
            aria-label="Open leave form"
          >
            Leave Form
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-500">Attendance</h1>

          {/* Scrollable Table Wrapper */}
          <div className="w-full mx-auto border rounded-lg flex flex-col min-h-0 shadow-lg bg-white">
            <div className="sticky top-0 bg-gray-50 shadow-md px-4 py-2 z-10 rounded-t-lg">
              <div className="flex justify-between font-semibold text-gray-700">
                <h2 className="w-1/2">Date</h2>
                <h2 className="w-1/2 text-center">Status</h2>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[50vh] touch-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map(({ invoice, paymentStatus }, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-gray-50 transition"
                    >
                      <TableCell className="text-gray-800">{invoice}</TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`p-1 rounded-lg text-sm font-medium ${
                            paymentStatus === "Paid"
                              ? "bg-green-100 text-green-700"
                              : paymentStatus === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {paymentStatus}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <LeaveForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </Layout>
  );
};

export default Index;
