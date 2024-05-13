import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./NavigationMenu.scss";

import Workers from "../../pages/Workers/Workers";
import Teams from "../../pages/Teams/Teams";
import AchievementsConstructor from "../../pages/AchievementsConstructor/AchievementsConstructor";
import AdminAccount from "../../pages/AdminAccount/AdminAccount";

import workersIcon from "@/assets/workers.svg";
import managementIcon from "@/assets/management.svg";
import userAvatarIcon from "@/assets/user-avatar.png";
import achievementsIcon from "@/assets/achievements.svg";
import logoIcon from "@/assets/logo.svg";
import WorkerPage from "../../pages/Workers/WorkerPage/WorkerPage";

// Components for routing
const NotFound = () => <div>404 Not Found</div>;

// NavigationMenu component
const NavigationMenu = () => {
  return (
    <Router>
      <nav className="navigation-menu">
        <div className="menu">
          <div className="logo-container">
            <img src={logoIcon} alt="Логотип" />
          </div>
          <NavLink to="/achievements-constructor" className="menu-item">
            <img src={achievementsIcon} alt="Библиотека достижений" />
            Библиотека достижений
          </NavLink>
          <NavLink to="/teams" className="menu-item">
            <img src={workersIcon} alt="Команды" />
            Команды
          </NavLink>
          <NavLink to="/workers" className="menu-item">
            <img src={managementIcon} alt="Сотрудники" />
            Сотрудники
          </NavLink>
        </div>
        <div className="admin-account">
          <NavLink to="/admin-account">
            <img src={userAvatarIcon} alt="Admin" />
          </NavLink>
        </div>
      </nav>

      <div className="routes">
        <Routes>
          <Route path="/" element={<Workers />} />
          <Route
            path="/achievements-constructor"
            element={<AchievementsConstructor />}
          />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workers" element={<Workers />} />
          <>
            <Route path="/worker-page/:profile_id" element={<WorkerPage />} />  {/*в путь добавлен id юзера*/}
          </>

          <Route path="/admin-account" element={<AdminAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default NavigationMenu;
