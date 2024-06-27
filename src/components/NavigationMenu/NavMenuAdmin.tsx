/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./NavigationMenu.scss";

import MyPage from "../../pagesAdmin/MyPage/MyPage";
import AchievementsConstructor from "../../pagesAdmin/AchievementsConstructor/AchievementsConstructor";
import Workers from "../../pagesAdmin/Workers/Workers";
import WorkerPage from "../../pagesAdmin/Workers/WorkerPage/WorkerPage";
import Teams from "../../pagesAdmin/Teams/Teams";
import ShopConstructor from "../../pagesAdmin/ShopConstructor/ShopConstructor";
import PrivacySettings from "../../pagesAdmin/PrivacySettings/PrivacySettings";

import myPageIcon from "@/assets/mypage-icon.png";

import managementIcon from "@/assets/management.svg";
import defaultAvatar from "@/assets/defaultAvatar.png"; //заглушка если бэк ниалё
import achievementsIcon from "@/assets/achievements.svg";
import { IUser } from "../../types/IUser";
//import ShopIcon from "@/assets/shop-icon.png";
//import logoIcon from "@/assets/logo.svg";

interface NavigationMenuProps {
  userAvatar: string | undefined;
  userData: IUser | null
}

// Components for routing
const NotFound = () => <div>404 Not Found</div>;

//NavMenu HR-а c прокинутым аватаром

const NavMenuAdmin: React.FC<NavigationMenuProps> = ({ userAvatar, userData }) => {

  //на будущее - выпадающее меню:
  // const [isAchievementsMenuOpen, setAchievementsMenuOpen] = useState(false);
  // const [isShopMenuOpen, setShopMenuOpen] = useState(false);
  const [avatar, setAvatar] = useState(userAvatar || defaultAvatar);
  const [formData, setFormData] = useState<IUser | null>(null);    //внутренний state данных юзера

  useEffect(() => {
    if (userData) {
      setFormData({...userData });
    }
  }, [userData]);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatar");
    if(storedAvatar){
      setAvatar(storedAvatar)
    }
  }, []);

  const handlePhotoUpdate = (newPhotoUrl: string) => {
    setAvatar(newPhotoUrl);
    localStorage.setItem("avatar", newPhotoUrl)
  };


 

  return (
    <>
      <nav className="navigation-menu">
        <div className="menu">
          {/*<div className="logo-container">
            <img src={logoIcon} alt="Логотип" />
          </div>*/}
          <NavLink to="/admin-panel/my-page" className="menu-item">
            <img src={myPageIcon} alt="Личная карточка" />
            Ваш Ачивер
          </NavLink>
          <NavLink to="/admin-panel/achievements-constructor" className="menu-item">
            <img src={achievementsIcon} alt="Конструктор достижений" />
            Конструктор достижений
          </NavLink>
          <NavLink to="/admin-panel/workers" className="menu-item">
            <img src={managementIcon} alt="Сотрудники" />
            Сотрудники
          </NavLink>
          {/*<NavLink to="/admin/teams" className="menu-item">
            <img src={workersIcon} alt="Команды и проекты" />
            Команды и проекты
          </NavLink>
          <NavLink to="/admin/shop-constructor" className="menu-item">
            <img src={ShopIcon} alt="Конструктор товаров" />
            Конструктор товаров
          </NavLink>
          */}
        </div>
        <div className="privacy-settings">
          <NavLink to="/admin-panel/privacy-settings">
          <img className="large" src={avatar || defaultAvatar} alt="Admin" />
          <h1>{formData?.first_name || ""}</h1>  
          </NavLink>
        </div>
      </nav>


      <div className="routes">
        <Routes>
          
          <Route path="my-page" element={<MyPage  onPhotoUpdate={handlePhotoUpdate}  />} />
          <Route
            path="achievements-constructor"
            element={<AchievementsConstructor />}
          />
          <Route
            path="workers"
            element={
              <Workers
                // isOpne={false}
                // onClose={function (): void {
                //   throw new Error("Function not implemented.");
                //  }}
                // createdUser={null}
              />
            }
          />
          <>
            <Route path="worker-page/:profile_id" element={<WorkerPage  onPhotoUpdate={handlePhotoUpdate}  />} />{" "}
            {/*в путь добавлен id юзера*/}
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

