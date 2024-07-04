import React from "react";

import LogoutButton from "./LogoutButton";
import ChangePassword from "./ChangePassword";
import styles from "./PrivacySettings.module.scss";
import { IUser } from "../../types/IUser";
import WorkerInitial from "../Workers/WorkerPage/WorkerInitial/WorkerInitial";

interface UserSettingsPageProps {
  user: IUser | null;
  userData: IUser;
}

const UserSettingsPage: React.FC<UserSettingsPageProps> = ({ user, userData}) => {
  console.log("User data:", user); // вывод для отладки

  return (
    <div className={styles.userSettingsPage}>
      <h1>Настройки пользователя</h1>
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
        </>
      ) : (
        <div>Загрузка данных пользователя...</div>
      )}
      <LogoutButton />
      <ChangePassword />
    </div>
  );
};

export default UserSettingsPage;
