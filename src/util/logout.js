import { redirect } from "react-router-dom";

export function logout() {
  localStorage.removeItem("restaurantUser"); //NOT removeddddd??
  localStorage.removeItem("user")
  return redirect("/auth?mode=login");
}
