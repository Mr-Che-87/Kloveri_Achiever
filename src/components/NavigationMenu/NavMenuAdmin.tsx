import {
  
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./NavigationMenu.scss";

import MyPage from "../../pagesAdmin/MyPage/MyPage";
import AchievementsConstructor from "../../pagesAdmin/AchievementsConstructor/AchievementsConstructor";
import Workers from "../../pagesAdmin/Workers/Workers";
import WorkerPage from "../../pagesAdmin/Workers/WorkerPage/WorkerPage";
import Teams from "../../pagesAdmin/Teams/Teams";
import ShopConstructor from "../../pagesAdmin/ShopConstructor/ShopConstructor";
import PrivacySettings from "../../pagesAdmin/PrivacySettings/PrivacySettings";


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

//NavMenu HR-а c прокинутым аватаром
const NavMenuAdmin: React.FC<NavigationMenuProps> = ({ userAvatar }) => { 
  return (
    <>
      <nav className="navigation-menu">
        <div className="menu">
          <div className="logo-container">
            <img src={logoIcon} alt="Логотип" />
          </div>
          <NavLink to="/admin/my-page" className="menu-item">
            <img src={myPageIcon} alt="Личная карточка" />
            Личная карточка
          </NavLink>
          <NavLink to="/admin/achievements-constructor" className="menu-item">
            <img src={achievementsIcon} alt="Конструктор достижений" />
            Конструктор достижений
          </NavLink>
          <NavLink to="/admin/workers" className="menu-item">
            <img src={managementIcon} alt="Сотрудники" />
            Сотрудники
          </NavLink>
          <NavLink to="/admin/teams" className="menu-item">
            <img src={workersIcon} alt="Команды и проекты" />
            Команды и проекты
          </NavLink>
          <NavLink to="/admin/shop-constructor" className="menu-item">
            <img src={ShopIcon} alt="Конструктор товаров" />
            Конструктор товаров
          </NavLink>
        </div>
        <div className="privacy-settings">
          <NavLink to="/admin/privacy-settings">
            <img src={userAvatar || defaultAvatar} alt="Admin" />
          </NavLink>
        </div>
      </nav>

      <div className="routes">
        <Routes>
          <Route path="/" element={<MyPage />} />
          <Route path="my-page" element={<MyPage />}  />
          <Route
            path="achievements-constructor"
            element={<AchievementsConstructor />}
          />
          <Route path="workers" element={<Workers />} />
          <>
            <Route path="worker-page/:profile_id" element={<WorkerPage />} />  {/*в путь добавлен id юзера*/}
          </>
          <Route path="teams" element={<Teams />} />
          <Route path="shop-constructor" element={<ShopConstructor />} />
          <Route path="privacy-settings" element={<PrivacySettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default NavMenuAdmin;
