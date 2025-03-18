import { useState, useEffect, useCallback } from "react";
import { MapPin } from "lucide-react";
import { location } from "../services/location";

const FIXED_LOCATION = {
  latitude: 8.764166,
  longitude: 78.134836,
};

const PROXIMITY_THRESHOLD = 5000; // 5000 meters = 5km
const EARTH_RADIUS = 6371e3; // Earth radius in meters

const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const toRad = (deg: number): number => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS * c; // Distance in meters
};

type LocationStatus = "unknown" | "nearby" | "far" | "checking";

export default function LocationButton() {
  const [locationStatus, setLocationStatus] =
    useState<LocationStatus>("unknown");

  const checkLocation = useCallback(async () => {
    try {
      setLocationStatus("checking");

      const userLocation = await location.tryGetLocation();

      if (!userLocation) {
        setLocationStatus("unknown");
        return;
      }

      const distance = getDistance(
        userLocation.latitude,
        userLocation.longitude,
        FIXED_LOCATION.latitude,
        FIXED_LOCATION.longitude
      );

      setLocationStatus(distance <= PROXIMITY_THRESHOLD ? "nearby" : "far");
    } catch (error) {
      console.error("Error getting location:", error);
      setLocationStatus("unknown");
    }
  }, []);

  useEffect(() => {
    checkLocation();
  }, [checkLocation]);

  const getIconColor = () => {
    switch (locationStatus) {
      case "nearby":
        return "text-green-500";
      case "far":
        return "text-red-500";
      case "checking":
        return "text-blue-500";
      case "unknown":
      default:
        return "text-gray-500";
    }
  };

  const getButtonClasses = () => {
    const baseClasses = "rounded-full transition duration-300";
    const hoverClasses = "hover:bg-gray-100";
    const activeClasses = locationStatus === "checking" ? "animate-pulse" : "";

    return `${baseClasses} ${hoverClasses} ${activeClasses}`;
  };

  return (
    <button
      className={getButtonClasses()}
      onClick={checkLocation}
      aria-label="Check location"
      title="Check your location"
    >
      <MapPin className={`h-5 w-5 ${getIconColor()}`} />
    </button>
  );
}
