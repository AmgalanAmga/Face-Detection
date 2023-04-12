import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const PrivateRoute = () => {
  const { user } = useAuthContext();
  return user.token ? <Outlet /> : <Navigate to={"/"} />;
};
