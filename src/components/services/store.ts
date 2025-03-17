export const store = (token: string) =>
  localStorage.setItem("AuthToken", token);

export const getToken = () => localStorage.getItem("AuthToken");

export const userId = (value: string) => localStorage.setItem("userId", value);
export const RegisterNumber = (value: string) =>
  localStorage.setItem("RegisterNumber", value);
export const name = (value: string) => localStorage.setItem("name", value);
export const department = (value: string) =>
  localStorage.setItem("department", value);
