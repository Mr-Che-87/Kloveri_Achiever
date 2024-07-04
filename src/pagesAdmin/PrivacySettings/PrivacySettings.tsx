<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import WorkerInitial from "../MyPage/WorkerInitial/WorkerInitial";
=======
import React from "react";

>>>>>>> dev3
import LogoutButton from "./LogoutButton";
import ChangePassword from "./ChangePassword";
import styles from "./PrivacySettings.module.scss";
import { IUser } from "../../types/IUser";
<<<<<<< HEAD
import WelcomeImg from "@/assets/Welcome-img.png";

interface UserSettingsPageProps {
  userData: IUser | null;
}

const UserSettingsPage: React.FC<UserSettingsPageProps> = ({ userData }) => {
  const [formData, setFormData] = useState<IUser | null>(null);

  useEffect(() => {
    if (userData) {
      setFormData({ ...userData });
    }
  }, [userData]);
=======
import WorkerInitial from "../Workers/WorkerPage/WorkerInitial/WorkerInitial";

interface UserSettingsPageProps {
  user: IUser | null;
  userData: IUser;
}

const UserSettingsPage: React.FC<UserSettingsPageProps> = ({ user, userData}) => {
  console.log("User data:", user); // вывод для отладки
>>>>>>> dev3

  return (
    <div className={styles.userSettingsPage}>
      <h1>Настройки пользователя</h1>
<<<<<<< HEAD
      <img src={WelcomeImg} alt="Welcome" />
      {formData ? (
        <>
          <div className={styles.userFullName}>
            {`${formData.first_name || ""} ${formData.middle_name || ""} ${formData.last_name || ""}`}
          </div>
          <WorkerInitial user={formData} showEmail={true} avatarSize="large" />
=======
      {user ? (
        <>
          <div className={styles.userFullName}>
            {`${user.first_name || ""} ${user.middle_name || ""} ${user.last_name || ""}`}
          </div>
          <WorkerInitial  
            user={user} //передаем данные пользователя в WorkerInitial
            showEmail={false}
            avatarSize={"small"}
            userData={userData}                   />
>>>>>>> dev3
        </>
      ) : (
        <div>Загрузка данных пользователя...</div>
      )}
<<<<<<< HEAD

      <ChangePassword />
      <LogoutButton />
=======
      <LogoutButton />
      <ChangePassword />
>>>>>>> dev3
    </div>
  );
};

export default UserSettingsPage;
