import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/general.scss";

import AppAdmin from "./AppAdmin";
import AppWorker from "./AppWorker";
import Login from "./Login/Login";
import LoginAdmin from "./Login/LoginAdmin";
import Registration from "./Registration/Registration";
import RegistrationAdmin from "./Registration/RegistrationAdmin";


const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-panel/login" element={<LoginAdmin />} />
        <Route path="/admin-panel" element={<LoginAdmin />} />
        <Route path="/registrations" element={<Registration />} />
        <Route path="/admin-panel/registrations" element={<RegistrationAdmin />} />
        
        <Route path="/*" element={<AppWorker />} />
        <Route path="/admin-panel/*" element={<AppAdmin />} />{" "}
        {/*  "*"-чтоб был возможен дальнейший под-роутинг */}
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);


