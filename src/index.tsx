import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/general.scss";

import AppAdmin from "./AppAdmin";
import AppWorker from "./AppWorker";
import Login from "./Login/Login";
import Registration from "./Registration/Registretion";

const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AppAdmin />} />{" "}
        {/*  "/*"-чтоб был возможен дальнейший под-роутинг */}
        <Route path="/worker/*" element={<AppWorker />} />
        <Route path="/registrations" element={<Registration />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
