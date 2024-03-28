import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./NavigationMenu.scss";

import WorkersAchievements from "../../pages/WorkersAchievements/WorkersAchievements";
import TeamsAchievements from "../../pages/TeamsAchievements/TeamsAchievements";
import AchievementsConstructor from "../../pages/AchievementsConstructor/AchievementsConstructor";
import AdminAccount from "../../pages/AdminAccount/AdminAccount"; //
import AccountManagement from "../../pages/AccountManagement/AccountManagement";

import workersIcon from "../../assets/workers.svg";
import managementIcon from "../../assets/management.svg";
import userAvatarIcon from "../../assets/user-avatar.png";
import achievementsIcon from "../../assets/achievements.svg";
import logoIcon from "../../assets/logo.svg";

// Components for routing
const NotFound = () => <div>404 Not Found</div>;

// NavigationMenu component
const NavigationMenu = () => {
  return (
    <Router>
      <nav className="navigation-menu">
        <div className="menu">
          <div className="logo-container">
            <NavLink to="/">
              <img src={logoIcon} alt="Сотрудники" />
            </NavLink>
          </div>
          <NavLink to="/achievements-constructor" className="menu-item">
            <img src={achievementsIcon} alt="Сотрудники" />
            Библиотека достижений
          </NavLink>
          <NavLink to="/workers-achievements" className="menu-item">
            <img src={workersIcon} alt="Сотрудники" />
            Команды
          </NavLink>
          <NavLink to="/account-management" className="menu-item">
            <img src={managementIcon} alt="Управление аккаунтами" />
            Управление аккаунами
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
          <Route path="/" element={<AdminAccount />} />
          <Route
            path="/workers-achievements"
            element={<WorkersAchievements />}
          />
          <Route path="/teams-achievements" element={<TeamsAchievements />} />
          <Route
            path="/achievements-constructor"
            element={<AchievementsConstructor />}
          />
          <Route path="/admin-account" element={<AdminAccount />} />
          <Route path="/account-management" element={<AccountManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default NavigationMenu;
