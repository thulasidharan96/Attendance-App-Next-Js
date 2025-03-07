import { remove } from "./store";
import { useRouter } from "next/router";

export const isAuthenticated = (token: string | null): boolean => {
  if (!token) {
    return false;
  }
  return true;
};

export const LogOut = (): void => {
  remove();
  // Using Next.js router for client-side navigation
  const router = useRouter();
  router.push("/");
};

export const validate = (): void => {
  const role = localStorage.getItem("role");
  const router = useRouter();

  switch (role) {
    case "admin":
      router.push("/admin");
      break;
    case "user":
      router.push("/dashboard");
      break;
    default:
      router.push("/");
  }
};
