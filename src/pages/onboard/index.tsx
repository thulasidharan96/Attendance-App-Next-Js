"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const OnboardUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registerNumber: "",
    gender: "",
    dob: "",
    address: "",
    fatherName: "",
    motherName: "",
    fatherPhone: "",
    motherPhone: "",
    bloodGroup: "",
    community: "",
  });

  useEffect(() => {
    // Uncomment when ready to validate
    // validate();

    setFormData((prevData) => ({
      ...prevData,
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      registerNumber: localStorage.getItem("RegisterNumber") || "",
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Registered:", formData);
  };

  // Form field groups
  const basicInfoFields = [
    {
      name: "name",
      type: "text",
      label: "Full Name",
      disabled: true,
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      disabled: true,
    },
    {
      name: "registerNumber",
      type: "text",
      label: "Register Number",
      disabled: true,
    },
    {
      name: "dob",
      type: "date",
      label: "Date of Birth",
    },
  ];

  const familyInfoFields = [
    {
      name: "fatherName",
      type: "text",
      label: "Father's Name",
    },
    {
      name: "motherName",
      type: "text",
      label: "Mother's Name",
    },
    {
      name: "fatherPhone",
      type: "tel",
      label: "Father's Phone Number",
    },
    {
      name: "motherPhone",
      type: "tel",
      label: "Mother's Phone Number",
    },
  ];

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-gradient-to-b from-purple-200 to-purple-300 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
      <Card className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        <CardHeader className="pb-2 pt-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
            Welcome! Complete Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <section>
              <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3 border-b pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {basicInfoFields.map(({ name, type, label, disabled }) => (
                  <div key={name} className="space-y-2">
                    <Label htmlFor={name} className="text-sm font-medium">
                      {label}
                    </Label>
                    <Input
                      id={name}
                      type={type}
                      name={name}
                      value={formData[name as keyof typeof formData]}
                      onChange={handleChange}
                      required
                      disabled={disabled}
                      className={`w-full ${
                        disabled
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                          : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Personal Information Section */}
            <section>
              <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3 border-b pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm font-medium">
                    Gender
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleSelectChange("gender", value)
                    }
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloodGroup" className="text-sm font-medium">
                    Blood Group
                  </Label>
                  <Select
                    value={formData.bloodGroup}
                    onValueChange={(value) =>
                      handleSelectChange("bloodGroup", value)
                    }
                  >
                    <SelectTrigger id="bloodGroup">
                      <SelectValue placeholder="Select Blood Group" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                        (group) => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="community" className="text-sm font-medium">
                    Community
                  </Label>
                  <Select
                    value={formData.community}
                    onValueChange={(value) =>
                      handleSelectChange("community", value)
                    }
                  >
                    <SelectTrigger id="community">
                      <SelectValue placeholder="Select Community" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BC">BC</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="ST">ST</SelectItem>
                      <SelectItem value="MBC">MBC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter your full address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="min-h-[80px] resize-none"
                  />
                </div>
              </div>
            </section>

            {/* Family Information Section */}
            <section>
              <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3 border-b pb-2">
                Family Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {familyInfoFields.map(({ name, type, label }) => (
                  <div key={name} className="space-y-2">
                    <Label htmlFor={name} className="text-sm font-medium">
                      {label}
                    </Label>
                    <Input
                      id={name}
                      type={type}
                      name={name}
                      value={formData[name as keyof typeof formData]}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </section>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full py-2.5 text-base font-semibold transition-colors duration-200"
              >
                Complete Registration
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardUser;
