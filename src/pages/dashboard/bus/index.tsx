import { DashboardHeader } from "@/components/dashboard/header";
import { Layout } from "@/components/layout";
import { isAuthenticated } from "@/components/services/auth";
import Router from "next/router";
import React, { useEffect, useState } from "react";

const busData = [
  { id: 1, location: "Near Kovilpatti Bus Stand" },
  { id: 2, location: "Close to Kovilpatti Railway Station" },
  { id: 3, location: "On NH-44 near Kovilpatti Toll Plaza" },
  { id: 4, location: "At Unnamalai Institute of Technology Campus" },
];

const Index = () => {
  const [selectedBus, setSelectedBus] = useState<number | null>(null);
  const [busLocation, setBusLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mapInteraction, setMapInteraction] = useState<boolean>(false);

  const fetchBusLocation = () => {
    if (selectedBus === null) {
      alert("Please select a bus.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const busInfo = busData.find((bus) => bus.id === selectedBus);
      setBusLocation(
        busInfo
          ? `Bus ${busInfo.id} is currently at ${busInfo.location}.`
          : "Location not found."
      );
      setLoading(false);
    }, 2000); // Simulated API call delay
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      Router.replace("/");
      return;
    }
  }, []);

  return (
    <Layout>
      <DashboardHeader />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Bus Locations</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-2">
          <select
            onChange={(e) => setSelectedBus(Number(e.target.value))}
            className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select a Bus
            </option>
            {busData.map((bus) => (
              <option key={bus.id} value={bus.id}>
                Bus {bus.id}
              </option>
            ))}
          </select>
          <button
            onClick={fetchBusLocation}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              "Fetch Location"
            )}
          </button>
        </div>
        {busLocation && (
          <p className="text-lg font-medium text-gray-700">{busLocation}</p>
        )}
        <div className="mt-2 relative">
          <div
            className="absolute inset-0 bg-transparent"
            style={{ pointerEvents: mapInteraction ? "auto" : "none" }}
          />
          <iframe
            title="Unnamalai Institute of Technology Map"
            width="100%"
            height="400"
            style={{
              border: 0,
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
            loading="lazy"
            allowFullScreen
            src="https://maps.google.com/maps?q=Unnamalai%20Institute%20of%20Technology,Tamil%20Nadu&t=&z=15&ie=UTF8&iwloc=&output=embed"
            onMouseEnter={() => setMapInteraction(true)}
            onMouseLeave={() => setMapInteraction(false)}
          ></iframe>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
