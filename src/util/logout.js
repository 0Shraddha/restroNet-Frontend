import { redirect } from "react-router-dom";

export function logout() {
  localStorage.removeItem("restaurantUser");
  return redirect("/auth?mode=login");
}
