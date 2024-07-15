import { Routes, Route, NavLink, useLocation  } from "react-router-dom";
import { useEffect, useState } from "react";
import "./NavigationMenu.scss";

import MyPage from "../../pagesWorker/MyPage/MyPage";
import MyAchievements from "../../pagesWorker/MyAchievements/MyAchievements";
import Teams from "../../pagesWorker/Teams/Teams";
import MyShop from "../../pagesWorker/MyShop/MyShop";
import PrivacySettings from "../../pagesWorker/PrivacySettings/PrivacySettings";

import logoIcon from "@/assets/logo-icon.svg";
import navMyPageIcon  from "@/assets/nav-mypage-icon.svg";
import navMyPageIconActive  from "@/assets/nav-mypage-icon-active.svg";
//import navAchievementsIcon from "@/assets/nav-achievements-icon.svg";
//import navAchievementsIconActive from "@/assets/nav-achievements-icon-active.svg";
//import navWorkersIcon from "@/assets/nav-workers-icon.svg";
//import navWorkersIconActive from "@/assets/nav-workers-icon-active.svg";
//import navShopIcon from "@/assets/nav-shop-icon.png";

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


//NavMenu РАБОТНИКА c прокинутым аватаром
const NavMenuWorker: React.FC<NavigationMenuProps> = ({
  userAvatar,
  userData,
  handlePhotoUpdate: parentHandlePhotoUpdate,
}) => {
  const [formData, setFormData] = useState<IUser | null>(null); // внутренний state данных юзера
  const [avatar, setAvatar] = useState(userAvatar || defaultAvatar);
  const location = useLocation();

  useEffect(() => {
    if (userData) {
      setFormData({ ...userData });
    }
  }, [userData]);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatarWorker");
    console.log("Stored Avatar: ", storedAvatar);
    if (storedAvatar) {
      setAvatar(storedAvatar);
    } else if (userAvatar) {
      setAvatar(userAvatar);
    }
  }, [userAvatar]);

  const handleAvatarUpdate = (newPhotoUrl: string) => {
    setAvatar(newPhotoUrl);
    parentHandlePhotoUpdate(newPhotoUrl);
  };

  const isActive = (paths: string[]) => {
    return paths.some(path => location.pathname.includes(path));
  };


  return (
    <>
      <nav className="navigation-menu">
        <div className="menu">
          <div className="logo-container">
            <img src={logoIcon} alt="Логотип" />
          </div>
          
          <NavLink to="/my-page" className="menu-item">
            <img
                src={isActive(["/my-page"]) ? navMyPageIconActive : navMyPageIcon}
                alt="Личный кабинет"
            />
            Личный кабинет
          </NavLink>


        
          {/*
          <NavLink to="/teams" className="menu-item">
            <img src={navWorkersIcon} alt="Мои коллеги" />
            Мои коллеги
          </NavLink>
          <NavLink to="/my-shop" className="menu-item">
            <img src={navShopIcon} alt="Мой магазин" />
            Мой магазин
          </NavLink>
          */}
        </div>
        <div className="privacy-settings">
          <NavLink to="/privacy-settings">
            <img className="large" src={avatar || defaultAvatar} alt="User" />
            <h1>{formData?.first_name || ""}</h1>
          </NavLink>
        </div>
      </nav>

      <div className="routes">
        <Routes>
          <Route
            path="my-page"
            element={<MyPage onPhotoUpdate={handleAvatarUpdate} />}
          />
          <Route path="my-achievements" element={<MyAchievements />} />
          <Route path="teams" element={<Teams />} />
          <Route path="my-shop" element={<MyShop />} />
          <Route
            path="privacy-settings"
            element={<PrivacySettings user={null} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default NavMenuWorker;
