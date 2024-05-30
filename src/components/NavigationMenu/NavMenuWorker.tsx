import {
  
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./NavigationMenu.scss";

import MyPage from "../../pagesWorker/MyPage/MyPage";
import MyAchievements from "../../pagesWorker/MyAchievements/MyAchievements";
import Teams from "../../pagesWorker/Teams/Teams";
import MyShop from "../../pagesWorker/MyShop/MyShop";
import PrivacySettings from "../../pagesWorker/PrivacySettings/PrivacySettings";


import myPageIcon from "@/assets/mypage-icon.png";
import workersIcon from "@/assets/workers.svg";
import defaultAvatar from "@/assets/defaultAvatar.png";  //заглушка если бэк ниалё
import achievementsIcon from "@/assets/achievements.svg";
import ShopIcon from "@/assets/shop-icon.png";
import logoIcon from "@/assets/logo.svg";




interface NavigationMenuProps {
  userAvatar: string | undefined;
}


// Components for routing
const NotFound = () => <div>404 Not Found</div>;

//NavMenu РАБОТНИКА c прокинутым аватаром
const NavMenuWorker: React.FC<NavigationMenuProps> = ({ userAvatar }) => { 
  return (
    <>
      <nav className="navigation-menu">
        <div className="menu">
          <div className="logo-container">
            <img src={logoIcon} alt="Логотип" />
          </div>
          <NavLink to="/worker/my-page" className="menu-item">
            <img src={myPageIcon} alt="Личная карточка" />
            Личная карточка
          </NavLink>
          <NavLink to="/worker/my-achievements" className="menu-item">
            <img src={achievementsIcon} alt="Мои достижения и баллы" />
            Мои достижения и баллы
          </NavLink>
          <NavLink to="/worker/teams" className="menu-item">
            <img src={workersIcon} alt="Команды и проекты" />
            Команды и проекты
          </NavLink>
          <NavLink to="/worker/my-shop" className="menu-item">
            <img src={ShopIcon} alt="Мой магазин" />
            Мой магазин
          </NavLink>
        </div>
        <div className="privacy-settings">
          <NavLink to="/worker/privacy-settings">
            <img src={userAvatar || defaultAvatar} alt="User" />
          </NavLink>
        </div>
      </nav>

      <div className="routes">
        <Routes>
             <Route path="/" element={<MyPage />} />
             <Route path="my-page" element={<MyPage />}  />
          <Route
            path="my-achievements"
            element={<MyAchievements />}
          />
          <Route path="teams" element={<Teams />} />
          <Route path="my-shop" element={<MyShop />} />
          <Route path="privacy-settings" element={<PrivacySettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default NavMenuWorker;
