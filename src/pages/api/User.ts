import { getToken } from "@/components/services/store";
import axios from "axios";
import * as cookie from "cookie";

const LOGIN_URL = "https://rest-api-hp0n.onrender.com/user/login";

// Login API
export const LoginApi = async (email: string, password: string) => {
  const data = { email, password };

  try {
    const response = await axios.post(LOGIN_URL, data);

    if (response.status === 200) {
      const { token } = response.data;

      // Store token in client-side cookies for 20 minutes
      document.cookie = cookie.serialize("auth_token", token, {
        path: "/",
        maxAge: 1200, // 20 minutes (1200 seconds)
      });
      console.log("Token stored in cookies", document.cookie);
    }
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
    throw error;
  }
};

const REGISTER_URL = "https://rest-api-hp0n.onrender.com/user/signup";

// Register API
export const RegisterApi = async (
  email: string,
  password: string,
  name: string,
  RegisterNumber: string
) => {
  const data = { email, password, name, RegisterNumber };
  try {
    const response = await axios.post(REGISTER_URL, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      return error.response;
    }
    throw error;
  }
};

// Get User Attendance API
export const UserApi = async () => {
  const userId = localStorage.getItem("userId");
  const USER_URL = `https://rest-api-hp0n.onrender.com/attendance/${userId}`;
  const token = getToken();
  return await axios.get(USER_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRecentLeaveStatus = async () => {
  const token = getToken();
  const userId = localStorage.getItem("userId");

  if (!token) {
    throw new Error("Missing authentication token");
  }

  try {
    const response = await axios.get(
      `https://rest-api-hp0n.onrender.com/attendance/leave/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    // Type guard to check if error is an axios error
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle known HTTP errors
        console.error(
          `Error (${error.response.status}): ${error.response.data}`
        );
      } else if (error.request) {
        // Network error or no response from server
        console.error("Network error:", error.request);
      } else {
        // Handle other axios errors
        console.error("Unexpected error:", error.message);
      }
    } else {
      // Handle non-axios errors
      console.error(
        "Unexpected error:",
        error instanceof Error ? error.message : String(error)
      );
    }
    throw error;
  }
};
