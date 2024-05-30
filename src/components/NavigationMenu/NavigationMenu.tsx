import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./NavigationMenu.scss";

import MyPage from "../../pages/MyPage/MyPage";
import AchievementsConstructor from "../../pages/AchievementsConstructor/AchievementsConstructor";
import Workers from "../../pages/Workers/Workers";
import WorkerPage from "../../pages/Workers/WorkerPage/WorkerPage";
import Teams from "../../pages/Teams/Teams";
import ShopConstructor from "../../pages/ShopConstructor/ShopConstructor";
import PrivacySettings from "../../pages/PrivacySettings/PrivacySettings";


import myPageIcon from "@/assets/mypage-icon.png";
import workersIcon from "@/assets/workers.svg";
import managementIcon from "@/assets/management.svg";
import defaultAvatar from "@/assets/defaultAvatar.png";  //заглушка если бэк ниалё
import achievementsIcon from "@/assets/achievements.svg";
import ShopIcon from "@/assets/shop-icon.png";
import logoIcon from "@/assets/logo.svg";




interface NavigationMenuProps {
  userAvatar: string | undefined;
}


// Components for routing
const NotFound = () => <div>404 Not Found</div>;

// NavigationMenu c прокинутым аватаром
const NavigationMenu: React.FC<NavigationMenuProps> = ({ userAvatar }) => { 
  return (
    <Router>
      <nav className="navigation-menu">
        <div className="menu">
          <div className="logo-container">
            <img src={logoIcon} alt="Логотип" />
          </div>
          <NavLink to="/my-page" className="menu-item">
            <img src={myPageIcon} alt="Личная карточка" />
            Личная карточка
          </NavLink>
          <NavLink to="/achievements-constructor" className="menu-item">
            <img src={achievementsIcon} alt="Конструктор достижений" />
            Конструктор достижений
          </NavLink>
          <NavLink to="/workers" className="menu-item">
            <img src={managementIcon} alt="Сотрудники" />
            Сотрудники
          </NavLink>
          <NavLink to="/teams" className="menu-item">
            <img src={workersIcon} alt="Команды и проекты" />
            Команды и проекты
          </NavLink>
          <NavLink to="/shop-constructor" className="menu-item">
            <img src={ShopIcon} alt="Конструктор товаров" />
            Конструктор товаров
          </NavLink>
        </div>
        <div className="privacy-settings">
          <NavLink to="/privacy-settings">
            <img src={userAvatar || defaultAvatar} alt="Admin" />
          </NavLink>
        </div>
      </nav>

      <div className="routes">
        <Routes>
          <Route path="/" element={<MyPage />} />
          <Route
            path="/my-page"
            element={<MyPage />}
          />
          <Route
            path="/achievements-constructor"
            element={<AchievementsConstructor />}
          />
          <Route path="/workers" element={<Workers />} />
          <>
            <Route path="/worker-page/:profile_id" element={<WorkerPage />} />  {/*в путь добавлен id юзера*/}
          </>
          <Route path="/teams" element={<Teams />} />
          <Route path="/shop-constructor" element={<ShopConstructor />} />
          <Route path="/privacy-settings" element={<PrivacySettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default NavigationMenu;
