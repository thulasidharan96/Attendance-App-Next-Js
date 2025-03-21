/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import * as cookie from "cookie";
import { getToken } from "@/components/services/store";

const BASE_URL = "https://rest-api-hp0n.onrender.com/user";
const ATTENDANCE_URL = "https://rest-api-hp0n.onrender.com/attendance";
const LOGIN_URL = "https://rest-api-hp0n.onrender.com/user/login";

interface ApiResponse<T> {
  status: number;
  data: T;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  RegisterNumber: string;
}

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

export const RegisterApi = async (
  data: RegisterData
): Promise<ApiResponse<unknown> | undefined> => {
  try {
    const response: AxiosResponse<unknown> = await axios.post(
      `${BASE_URL}/signup`,
      data
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      return error.response;
    }
    console.error("Unexpected error:", error);
    throw error;
  }
};

export const UserApi = async (): Promise<AxiosResponse | undefined> => {
  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("User ID is missing");
  const token = getToken();
  if (!token) throw new Error("Authentication token is missing");
  try {
    return await axios.get(`${ATTENDANCE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getRecentLeaveStatus = async (): Promise<unknown> => {
  const userId = localStorage.getItem("userId");
  const token = getToken();

  if (!token || !userId)
    throw new Error("Missing authentication token or userId");

  try {
    // Check if this is the correct endpoint structure
    const response = await axios.get(`${ATTENDANCE_URL}/leave/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching leave status:", error);
    throw error;
  }
};

export const getUserMessages = async (): Promise<unknown> => {
  const userId = localStorage.getItem("userId");
  const token = getToken();

  if (!token || !userId)
    throw new Error("Missing authentication token or userId");

  try {
    const response = await axios.get(`${ATTENDANCE_URL}/message/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user messages:", error);
    throw error;
  }
};

export const LeaveRequest = async (data: any) => {
  const token = getToken();
  const RegisterNumber = localStorage.getItem("RegisterNumber");
  const userId = localStorage.getItem("userId");
  const dept = localStorage.getItem("department");

  if (!token) {
    throw new Error("Missing authentication token");
  }
  if (!RegisterNumber) {
    throw new Error("Missing RegisterNumber");
  }

  try {
    const response = await axios.post(
      `https://rest-api-hp0n.onrender.com/user/leave`,
      {
        StartDate: data.fromDate,
        EndDate: data.toDate,
        Reason: data.reason,
        RegisterNumber: RegisterNumber,
        userId: userId,
        Department: dept,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Return the error response so we can handle it in the UI
      return {
        status: error.response.status,
        message: error.response.data.message || "Request failed",
        data: error.response.data,
      };
    } else if (error.request) {
      console.error("Network error:", error.request);
      throw new Error("Network error. Please check your connection.");
    } else {
      console.error("Unexpected error:", error.message);
      throw new Error("An unexpected error occurred.");
    }
  }
};
