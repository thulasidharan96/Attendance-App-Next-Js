"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Layout } from "@/components/layout";
import { isAuthenticated } from "@/components/services/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Router from "next/router";

const StudentProfile = () => {
  const [name, setName] = useState(localStorage.getItem("name") || "John Doe");
  const [email] = useState(
    localStorage.getItem("email") || "johndoe@example.com"
  );
  const [registerNumber] = useState(
    localStorage.getItem("RegisterNumber") || "2025001"
  );
  const [phoneNumber] = useState("+1234567890");
  const [address] = useState("123, Main Street, City");
  const [dob] = useState("2000-01-01");
  const [community] = useState("XXXX");
  const [gender] = useState("XXXX");

  useEffect(() => {
    if (!isAuthenticated()) {
      Router.replace("/");
      return;
    }
    setName(localStorage.getItem("name") || "User");
  }, []);

  return (
    <Layout>
      <DashboardHeader />
      <Card className="w-full shadow-xl rounded-2xl bg-white dark:bg-gray-900 p-6">
        <CardContent>
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
            Student Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Full Name", name],
              ["Gender", gender],
              ["Register Number", registerNumber],
              ["Email Address", email],
              ["Date of Birth", dob],
              ["Phone Number", phoneNumber],
              ["Address", address],
              ["Community", community],
            ].map(([label, value]) => (
              <div key={label} className="grid gap-1">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {label}
                </Label>
                <Input
                  value={value}
                  disabled
                  className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-end"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default StudentProfile;
