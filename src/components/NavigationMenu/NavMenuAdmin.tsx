<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
>>>>>>> dev3
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
import defaultAvatar from "@/assets/defaultAvatar.png"; // заглушка если бэк ниалё
import achievementsIcon from "@/assets/achievements.svg";
<<<<<<< HEAD
=======
import { IUser } from "../../types/IUser";
>>>>>>> dev3
//import ShopIcon from "@/assets/shop-icon.png";
//import logoIcon from "@/assets/logo.svg";

import { IUser } from "../../types/IUser";


interface NavigationMenuProps {
<<<<<<< HEAD
  //profileId: string | null;
  //userAvatar: string | undefined;
  userData: IUser | null;
=======
  profileId: string | null;
  userAvatar: string | undefined;
  userData: IUser | null;
  handlePhotoUpdate: (newPhotoUrl: string) => void;
>>>>>>> dev3
}

// Components for routing
const NotFound = () => <div>404 Not Found</div>;

//NavMenu HR-а c прокинутым аватаром
<<<<<<< HEAD
const NavMenuAdmin: React.FC<NavigationMenuProps> = ({ userData }) => {
  const [formData, setFormData] = useState<IUser | null>(null);    //внутренний state данных юзера

  useEffect(() => {
    if (userData) {
      setFormData({...userData });
    }
  }, [userData]);

 
=======

const NavMenuAdmin: React.FC<NavigationMenuProps> = ({
  userAvatar,
  userData,
  handlePhotoUpdate: parentHandlePhotoUpdate,
}) => {
  const [avatar, setAvatar] = useState(userAvatar || defaultAvatar);
  const [formData, setFormData] = useState<IUser | null>(null); // внутренний state данных юзера

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

>>>>>>> dev3
  return (
    <>
      <nav className="navigation-menu">
        <div className="menu">
<<<<<<< HEAD
          {/*<div className="logo-container">
            <img src={logoIcon} alt="Логотип" />
          </div>*/}
=======
>>>>>>> dev3
          <NavLink to="/admin-panel/my-page" className="menu-item">
            <img src={myPageIcon} alt="Личная карточка" />
            Ваш Ачивер
          </NavLink>
<<<<<<< HEAD
          <NavLink to="/admin-panel/achievements-constructor" className="menu-item">
=======
          <NavLink
            to="/admin-panel/achievements-constructor"
            className="menu-item"
          >
>>>>>>> dev3
            <img src={achievementsIcon} alt="Конструктор достижений" />
            Конструктор достижений
          </NavLink>
          <NavLink to="/admin-panel/workers" className="menu-item">
            <img src={managementIcon} alt="Сотрудники" />
            Сотрудники
          </NavLink>
<<<<<<< HEAD
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
          <img src={formData?.photo_small || defaultAvatar} alt="User" />
          <h1>{formData?.first_name || ""}</h1>  
=======
        </div>
        <div className="privacy-settings">
          <NavLink to="/admin-panel/privacy-settings">
            <img
              className="large"
              src={avatar || defaultAvatar}
              alt="Admin"
            />
            <h1>{formData?.first_name || ""}</h1>
>>>>>>> dev3
          </NavLink>
        </div>
      </nav>

<<<<<<< HEAD

      <div className="routes">
        <Routes>
          
          <Route path="my-page" element={<MyPage />} />
=======
      <div className="routes">
        <Routes>
          <Route
            path="my-page"
            element={<MyPage onPhotoUpdate={handleAvatarUpdate} />}
          />
>>>>>>> dev3
          <Route
            path="achievements-constructor"
            element={<AchievementsConstructor />}
          />
<<<<<<< HEAD
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
            <Route path="worker-page/:profile_id" element={<WorkerPage />} />{" "}
            {/*в путь добавлен id юзера*/}
          </>
=======
          <Route path="workers" element={<Workers />} />
          <Route path="worker-page/:profile_id" element={<WorkerPage />} />
>>>>>>> dev3
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

