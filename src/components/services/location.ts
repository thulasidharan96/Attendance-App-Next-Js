interface LocationService {
  getCurrentLocation: (retries?: number) => Promise<GeolocationPosition>;
  formatLocation: (position: GeolocationPosition) => {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
    timestamp: string;
  };
  handleGeoError: (error: GeolocationPositionError) => string;
  tryGetLocation: () => Promise<ReturnType<
    LocationService["formatLocation"]
  > | null>;
}

export const location: LocationService = {
  getCurrentLocation: (retries = 2): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
        return;
      }

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        async (error) => {
          if (retries > 0 && error.code !== error.PERMISSION_DENIED) {
            console.warn(`Retrying location fetch... (${3 - retries} attempt)`);
            resolve(await location.getCurrentLocation(retries - 1));
          } else {
            reject(location.handleGeoError(error));
          }
        },
        options
      );
    });
  },

  formatLocation: (position: GeolocationPosition) => ({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude ?? null,
    altitudeAccuracy: position.coords.altitudeAccuracy ?? null,
    heading: position.coords.heading ?? null,
    speed: position.coords.speed ?? null,
    timestamp: new Date(position.timestamp).toISOString(),
  }),

  handleGeoError: (error: GeolocationPositionError): string => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "Location access denied by user.";
      case error.POSITION_UNAVAILABLE:
        return "Location data is unavailable.";
      case error.TIMEOUT:
        return "Location request timed out.";
      default:
        return "An unknown error occurred while retrieving location.";
    }
  },

  tryGetLocation: async (): Promise<ReturnType<
    LocationService["formatLocation"]
  > | null> => {
    try {
      const position = await location.getCurrentLocation();
      const locationData = location.formatLocation(position);
      console.log("Location Data:", locationData);
      return locationData;
    } catch (error) {
      console.error("Location Error:", error);
      return null;
    }
  },
};
