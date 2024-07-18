import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  rankRequired?: number;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ rankRequired }) => {
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  if (!user || !user.profile_id) {
    // Если пользователь не авторизован
    return <Navigate to="/login" />;
  }

  if (rankRequired && (!user.rank || user.rank < rankRequired)) {
    // Если у пользователя недостаточный ранг
    return <Navigate to="/" />;
  }

  // Если пользователь авторизован и имеет необходимый ранг
  return <Outlet />;
};

export default PrivateRoute;
