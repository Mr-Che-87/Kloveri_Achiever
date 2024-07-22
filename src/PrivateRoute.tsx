import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  linkWeightRequired?: number;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ linkWeightRequired }) => {
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  if (!user || !user.profile_id) {
    // Если пользователь не авторизован
    return <Navigate to="/login" />;
  }

  const linkWeight = parseFloat(localStorage.getItem("link_weight") || "0");

  if (linkWeightRequired && linkWeight < linkWeightRequired) {
    // Если у пользователя недостаточный вес ссылки
    console.log(
      `User link weight (${linkWeight}) is less than required (${linkWeightRequired})`
    );
    return <Navigate to="/login" />;
  }

  // Если пользователь авторизован и имеет необходимый вес ссылки
  return <Outlet />;
};

export default PrivateRoute;
