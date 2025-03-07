export const store = (token: string) =>
  localStorage.setItem("AuthToken", token);

export const getToken = () => localStorage.getItem("AuthToken");

export const role = (value: string) => localStorage.setItem("role", value);
export const userId = (value: string) => localStorage.setItem("userId", value);
export const RegisterNumber = (value: string) =>
  localStorage.setItem("RegisterNumber", value);
export const name = (value: string) => localStorage.setItem("name", value);
export const department = (value: string) =>
  localStorage.setItem("department", value);

export const remove = () => localStorage.clear();

// "userId": "67bfec1c64251a37a8411eb7",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2JmZWMxYzY0MjUxYTM3YTg0MTFlYjciLCJlbWFpbCI6InRodWxhc2lkaGFyYW42MzgxQGdtYWlsLmNvbSIsIm5hbWUiOiJUaHVsYXNpZGhhcmFuIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDEzNTA0NzgsImV4cCI6MTc0MTM1NDA3OH0.aHcrukQA6-6X1PJfQO2QyDUPzGpzXmP1QFGm94gbyk4",
//     "name": "Thulasidharan",
//     "RegisterNumber": "953321104301",
//     "department": "CSE",
//     "role": "user"
