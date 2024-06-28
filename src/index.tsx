import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./styles/general.scss";

import AppAdmin from "./AppAdmin";
import AppWorker from "./AppWorker";
import Login from "./Login/Login";
import LoginAdmin from "./Login/LoginAdmin";
import Registration from "./Registration/Registration";
import RegistrationAdmin from "./Registration/RegistrationAdmin";
import PrivateRoute from "./PrivateRoute";


const Root: React.FC = () => {
  const isAuth = localStorage.getItem('profileId'); // проверка наличия profileId в localStorage


return (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to={isAuth ? "/my-page" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-panel" element={<Navigate to={isAuth ? "/admin-panel/my-page" : "/admin-panel/login"} />} />
      <Route path="/admin-panel" element={<LoginAdmin />} />
      <Route path="/admin-panel/login" element={<LoginAdmin />} />
      <Route path="/registrations" element={<Registration />} />
      <Route path="/admin-panel/registrations" element={<RegistrationAdmin />} />
      
      <Route path="/*" element={<PrivateRoute />}>
        <Route path="*" element={<AppWorker />} />
      </Route>
      <Route path="/admin-panel/*" element={<PrivateRoute />}>
        <Route path="*" element={<AppAdmin />} />
          {/*  "*"-чтоб был возможен дальнейший под-роутинг */}
      </Route>
    </Routes>
  </Router>
);
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);


