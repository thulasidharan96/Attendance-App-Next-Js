import { DashboardHeader } from "@/components/dashboard/header";
import { Layout } from "@/components/layout";
import { isAuthenticated } from "@/components/services/auth";
import Image from "next/image";
import Router from "next/router";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [avatar, setAvatar] = useState<string | null>(null);

  // Handle file upload
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      Router.replace("/");
      return;
    }

    setName(localStorage.getItem("name") || "User!");
  }, []);

  return (
    <Layout>
      <DashboardHeader />
      <div className="shadow-lg rounded-lg p-6">
        {" "}
        {/* Profile Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <div className="flex items-center mb-4">
            <label className="mr-4">Avatar:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              id="avatar-upload"
            />
            <label htmlFor="avatar-upload" className="cursor-pointer">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full border"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  📷
                </div>
              )}
            </label>
          </div>
          <div>
            <label className="block mb-2">Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};
export default Index;
