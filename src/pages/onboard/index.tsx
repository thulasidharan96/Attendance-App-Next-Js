import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    setFormData((prevData) => ({
      ...prevData,
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      registerNumber: localStorage.getItem("registerNumber") || "",
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Registered:", formData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-purple1 p-4 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-3xl"
      >
        <Card className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4 sm:mb-6">
            Welcome! Please Fill in the Form
          </h2>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 overflow-y-auto max-h-[75vh] px-2"
            >
              {[
                {
                  name: "name",
                  type: "text",
                  placeholder: "Full Name",
                  disabled: true,
                },
                {
                  name: "email",
                  type: "email",
                  placeholder: "Email Address",
                  disabled: true,
                },
                {
                  name: "registerNumber",
                  type: "text",
                  placeholder: "Register Number",
                  disabled: true,
                },
                { name: "dob", type: "date", placeholder: "Date of Birth" },
                { name: "address", type: "text", placeholder: "Address" },
                {
                  name: "fatherName",
                  type: "text",
                  placeholder: "Father's Name",
                },
                {
                  name: "motherName",
                  type: "text",
                  placeholder: "Mother's Name",
                },
                {
                  name: "fatherPhone",
                  type: "tel",
                  placeholder: "Father's Phone Number",
                },
                {
                  name: "motherPhone",
                  type: "tel",
                  placeholder: "Mother's Phone Number",
                },
              ].map(({ name, type, placeholder, disabled }) => (
                <div key={name} className="space-y-1">
                  <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
                    {placeholder}
                  </label>
                  <Input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    disabled={disabled}
                    className={`w-full ${
                      disabled
                        ? "bg-gray-200 dark:bg-gray-800 cursor-not-allowed"
                        : ""
                    }`}
                  />
                </div>
              ))}

              <div className="space-y-1">
                <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
                  Community
                </label>
                <select
                  name="community"
                  value={formData.community}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Select Community</option>
                  <option value="BC">BC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="MBC">MBC</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex justify-center mt-2 sm:mt-4">
                <Button
                  type="submit"
                  className="w-full py-2 text-lg font-semibold"
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardUser;
