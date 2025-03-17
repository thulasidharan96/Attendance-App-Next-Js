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
