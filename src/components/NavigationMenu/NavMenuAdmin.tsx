import { useEffect, useState } from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import "./NavigationMenu.scss";

import MyPage from "../../pagesAdmin/MyPage/MyPage";
import AchievementsConstructor from "../../pagesAdmin/AchievementsConstructor/AchievementsConstructor";
import Workers from "../../pagesAdmin/Workers/Workers";
import WorkerPage from "../../pagesAdmin/Workers/WorkerPage/WorkerPage";
import Teams from "../../pagesAdmin/Teams/Teams";
import ShopConstructor from "../../pagesAdmin/ShopConstructor/ShopConstructor";
import PrivacySettings from "../../pagesAdmin/PrivacySettings/PrivacySettings";

import logoIcon from "@/assets/logo-icon.svg";
import navMyPageIcon from "@/assets/nav-mypage-icon.svg";
import navMyPageIconActive  from "@/assets/nav-mypage-icon-active.svg";
import navAchievementsIcon from "@/assets/nav-achievements-icon.svg";
import navAchievementsIconActive from "@/assets/nav-achievements-icon-active.svg";
import navWorkersIcon from "@/assets/nav-workers-icon.svg";
import navWorkersIconActive from "@/assets/nav-workers-icon-active.svg";
//import navShopIcon from "@/assets/nav-shop-icon.svg";

import defaultAvatar from "@/assets/defaultAvatar.png"; // заглушка если бэк ниалё
import { IUser } from "../../types/IUser";




interface NavigationMenuProps {
  profileId: string | null;
  userAvatar: string | undefined;
  userData: IUser | null;
  handlePhotoUpdate: (newPhotoUrl: string) => void;
}

// Components for routing
const NotFound = () => <div>404 Not Found</div>;


//NavMenu HR-а c прокинутым аватаром
const NavMenuAdmin: React.FC<NavigationMenuProps> = ({
  userAvatar,
  userData,
  handlePhotoUpdate: parentHandlePhotoUpdate,
}) => {
  const [avatar, setAvatar] = useState(userAvatar || defaultAvatar);
  const [formData, setFormData] = useState<IUser | null>(null); // внутренний state данных юзера
  const [isPrivacySettingsOpen, setIsPrivacySettingsOpen] = useState(false); //для модального окна настроек
  const location = useLocation();

  useEffect(() => {
    if (userData) {
      setFormData({ ...userData });
    }
  }, [userData]);

  useEffect(() => {
    if (userAvatar) {
      setAvatar(userAvatar);
    }
  }, [userAvatar]);

  const handleAvatarUpdate = (newPhotoUrl: string) => {
    console.log("New Photo URL:", newPhotoUrl);
    setAvatar(newPhotoUrl);
    parentHandlePhotoUpdate(newPhotoUrl);
  };

  const isActive = (paths: string[]) => {
    return paths.some(path => location.pathname.includes(path));
  };

  const openPrivacySettings = () => {
    setIsPrivacySettingsOpen(true);
  };

  const closePrivacySettings = () => {
    setIsPrivacySettingsOpen(false);
  };

  return (
    <>
      <nav className="navigation-menu">
        <div className="menu">
        <div className="logo-container">
            <img src={logoIcon} alt="Логотип" />
          </div>

          <NavLink to="/admin-panel/my-page" className="menu-item">
            <img
              src={isActive(["/admin-panel/my-page"]) ? navMyPageIconActive : navMyPageIcon}
              alt="Кабинет администратора"
            />
            Кабинет администратора
          </NavLink>
          <NavLink to="/admin-panel/achievements-constructor" className="menu-item">
            <img
              src={isActive(["/admin-panel/achievements-constructor"]) ? navAchievementsIconActive : navAchievementsIcon}
              alt="Конструктор достижений"
            />
            Конструктор достижений
          </NavLink>
          <NavLink to="/admin-panel/workers" className="menu-item">
            <img
              src={isActive(["/admin-panel/workers", "/admin-panel/worker-page"]) ? navWorkersIconActive : navWorkersIcon}
              alt="Cотрудники"
            />
            Сотрудники
          </NavLink>
          {/*
          <NavLink to="/admin-panel/teams" className="menu-item">
            <img src={navWorkersIcon} alt="Команды и проекты" />
            Команды и проекты
          </NavLink>
          <NavLink to="/admin-panel/shop-constructor" className="menu-item">
            <img src={navShopIcon} alt="Конструктор товаров" />
            Конструктор товаров
          </NavLink>
          */}
        </div>
        <div className="privacy-settings" onClick={openPrivacySettings}>
          <img
            className="large"
            src={avatar || defaultAvatar}
            alt="Admin"
          />
          <h1>{formData?.first_name || ""}</h1>
        </div>
      </nav>

      {isPrivacySettingsOpen && (
        <PrivacySettings user={formData} userData={userData!} onClose={closePrivacySettings} />
      )}


      <div className="routes">
        <Routes>
          <Route
            path="my-page"
            element={<MyPage onPhotoUpdate={handleAvatarUpdate} />}
          />
          <Route path="achievements-constructor" element={<AchievementsConstructor />} />
          <Route path="workers" element={<Workers />} />
          <Route path="worker-page/:profile_id" element={<WorkerPage />} />
          <Route path="teams" element={<Teams />} />
          <Route path="shop-constructor" element={<ShopConstructor />} />
          {/* <Route path="privacy-settings" element={<PrivacySettings />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default NavMenuAdmin;
