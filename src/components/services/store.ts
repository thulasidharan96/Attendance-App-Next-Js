import * as cookie from "cookie";

export const getToken = () => {
  if (typeof document === "undefined") return null; // Ensure this runs only on the client

  const cookies = cookie.parse(document.cookie);
  return cookies.auth_token || null;
};

export const userId = (value: string) => localStorage.setItem("userId", value);
export const RegisterNumber = (value: string) =>
  localStorage.setItem("RegisterNumber", value);
export const name = (value: string) => localStorage.setItem("name", value);
export const department = (value: string) =>
  localStorage.setItem("department", value);
