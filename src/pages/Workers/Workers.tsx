import { NavLink } from "react-router-dom";

import WorkerPage from "./WorkerPage/WorkerPage";


export default function Workers() {
  return (
    <div>
      Список сотрудников....
      <br/>....
      <br/>....
      <NavLink to="/worker-page">
      <WorkerPage />  
           </NavLink>

          
    </div>
  );
}
