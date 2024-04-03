import { NavLink } from "react-router-dom";
import WorkerInitial from "./WorkerPage/WorkerInitial/WorkerInitial";

export default function Workers() {
  return (
    <div>
      Список сотрудников....
      <br/>....
      <br/>....
      <NavLink to="/worker-page">
      <WorkerInitial showEmail={false} /> {/* Передаём проп showEmail со значением false */}
           </NavLink>

          
    </div>
  );
}
