import { Layout } from "@/components/layout";
import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DashboardHeader } from "@/components/dashboard/header";

const invoices = [
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
  { invoice: "INV010", paymentStatus: "Unpaid" },
  { invoice: "INV010", paymentStatus: "Unpaid" },
];

const Index = () => {
  return (
    <Layout>
      <DashboardHeader />
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Attendance</h1>

        {/* Table Wrapper with Proper Scrolling & Responsive Design */}
        <div className="w-full mx-auto border rounded-lg h-[70vh] flex flex-col min-h-0 shadow-lg">
          {/* Sticky Header */}
          <div className="sticky top-0 flex justify-between px-4 py-2 shadow-md z-10 rounded-t-lg">
            <h2 className="w-1/2 font-semibold">Date</h2>
            <h2 className="w-1/2 text-center font-semibold">Status</h2>
          </div>

          {/* Scrollable Table */}
          <div className="overflow-auto flex-1">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableBody>
                  {invoices.map((invoice, index) => (
                    <TableRow key={index} className="hover:bg-gray-100">
                      <TableCell>{invoice.invoice}</TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`p-1 rounded-lg text-sm font-medium ${
                            invoice.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-700"
                              : invoice.paymentStatus === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {invoice.paymentStatus}
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
    </Layout>
  );
};

export default Index;
