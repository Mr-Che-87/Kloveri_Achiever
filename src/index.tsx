import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./styles/general.scss";

import AppAdmin from "./AppAdmin";
import AppWorker from "./AppWorker";
import Login from "./Login/Login";
import LoginAdmin from "./Login/LoginAdmin";
import Registration from "./Registration/Registration";
import RegistrationAdmin from "./Registration/RegistrationAdmin";
import PrivateRoute from "./PrivateRoute";

const Root: React.FC = () => {
  const isAuth = localStorage.getItem("profileId"); // проверка наличия profileId в localStorage
  const linkWeight = parseFloat(localStorage.getItem("link_weight") || "0"); // Получение веса ссылки пользователя из localStorage

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                isAuth
                  ? linkWeight >= 1
                    ? "/admin-panel"
                    : "/my-page"
                  : "/login"
              }
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-panel/login" element={<LoginAdmin />} />
        <Route path="/registrations" element={<Registration />} />
        <Route
          path="/admin-panel/registrations"
          element={<RegistrationAdmin />}
        />

        <Route path="/my-page/*" element={<PrivateRoute />}>
          <Route path="*" element={<AppWorker />} />
        </Route>

        <Route
          path="/admin-panel/*"
          element={<PrivateRoute linkWeightRequired={1} />}
        >
          <Route path="*" element={<AppAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<Root />);
}
