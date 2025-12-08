import { redirect } from "react-router-dom";

export function logout() {
  localStorage.removeItem("restaurantUser"); //NOT removeddddd??
  return redirect("/auth?mode=login");
}
