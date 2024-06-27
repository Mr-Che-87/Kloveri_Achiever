import { useState, useEffect } from "react";
import { Routes, Route, NavLink} from "react-router-dom";
import "./NavigationMenu.scss";

import MyPage from "../../pagesWorker/MyPage/MyPage";
import MyAchievements from "../../pagesWorker/MyAchievements/MyAchievements";
import Teams from "../../pagesWorker/Teams/Teams";
import MyShop from "../../pagesWorker/MyShop/MyShop";
import PrivacySettings from "../../pagesWorker/PrivacySettings/PrivacySettings";

import myPageIcon from "@/assets/mypage-icon.png";
import defaultAvatar from "@/assets/defaultAvatar.png";  //заглушка если бэк ниалё
//import workersIcon from "@/assets/workers.svg";
//import achievementsIcon from "@/assets/achievements.svg";
//import ShopIcon from "@/assets/shop-icon.png";
//import logoIcon from "@/assets/logo.svg";

import { IUser } from "../../types/IUser";


  interface NavigationMenuProps {
    //profileId: string | null;
    //userAvatar: string | undefined;
    userData: IUser | null;
  }

// Components for routing
const NotFound = () => <div>404 Not Found</div>;

//NavMenu РАБОТНИКА c прокинутым аватаром
const NavMenuWorker: React.FC<NavigationMenuProps> = ({ userData }) => { 
 const [formData, setFormData] = useState<IUser | null>(null);    //внутренний state данных юзера

  useEffect(() => {
    if (userData) {
      setFormData({...userData });
    }
  }, [userData]);


  return (
    <>
      <nav className="navigation-menu">
        <div className="menu">
          {/*
          <div className="logo-container">
            <img src={logoIcon} alt="Логотип" />
          </div>
          */}
          <NavLink to="/my-page" className="menu-item">
            <img src={myPageIcon} alt="Личная карточка" />
            Личный кабинет
          </NavLink>
          {/*
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
          */}
        </div>
        <div className="privacy-settings">
          <NavLink to="/privacy-settings">
          <img src={formData?.photo_small || defaultAvatar} alt="User" />
          <h1>{formData?.first_name || ""}</h1>  
          </NavLink>
        </div>
      </nav>

      <div className="routes">
        <Routes>
          <Route path="my-page" element={<MyPage />} />
          <Route path="my-achievements" element={<MyAchievements />} />
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
