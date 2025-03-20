/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { startAuthentication } from "@simplewebauthn/browser";
import { useState } from "react";

export default function FingerprintAuth() {
  const [authStatus, setAuthStatus] = useState<string | null>(null);

  const authenticate = async () => {
    try {
      console.log("Authenticating...");
      setAuthStatus("Authenticating...");

      // Generate a secure challenge
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const options = {
        publicKey: {
          challenge: challenge.buffer,
          timeout: 60000,
          userVerification: "required",
          allowCredentials: [], // Use empty array for new credentials
          rpId: window.location.hostname, // Important for PWA security
        },
      };

      // Start fingerprint authentication
      const authResult = await startAuthentication(options.publicKey as any);
      console.log("Auth Result:", authResult);

      setAuthStatus("Fingerprint has been read!");
      alert("Fingerprint has been read!");
    } catch (error) {
      console.error("Authentication failed:", error);
      setAuthStatus("Authentication failed.");
      alert("Authentication failed.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={authenticate}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Authenticate with Fingerprint
      </button>
      {authStatus && <p className="text-white">{authStatus}</p>}
    </div>
  );
}
