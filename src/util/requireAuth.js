import { redirect } from "react-router-dom";
import getAuthToken from "./auth";

export function requireAuth() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return null;
}
