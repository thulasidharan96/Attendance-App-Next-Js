/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const LOGIN_URL = "https://rest-api-hp0n.onrender.com/user/login";

// Login API
export const LoginApi = async (email: string, password: string) => {
  const data = { email, password };
  return await axios.post(LOGIN_URL, data);
};


const REGISTER_URL = "https://rest-api-hp0n.onrender.com/user/signup";

// Register API
export const RegisterApi = async (email: string, password: string, name: string, RegisterNumber: number) => {
  const data = { email, password, name, RegisterNumber };
  return await axios.post(REGISTER_URL, data);
};