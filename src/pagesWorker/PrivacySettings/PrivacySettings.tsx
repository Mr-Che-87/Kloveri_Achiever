import React from "react";
import WorkerInitial from "../MyPage/WorkerInitial/WorkerInitial";
import LogoutButton from "./LogoutButton";
import ChangePassword from "./ChangePassword";
import styles from "./PrivacySettings.module.scss";
import { IUser } from "../../types/IUser";

interface UserSettingsPageProps {
  user: IUser | null;
}

const UserSettingsPage: React.FC<UserSettingsPageProps> = ({ user }) => {
  console.log("User data:", user); // вывод для отладки

  return (
    <div className={styles.userSettingsPage}>
      <h1>Настройки пользователя</h1>
      {user ? (
        <>
          <div className={styles.userFullName}>
            {`${user.first_name || ""} ${user.middle_name || ""} ${user.last_name || ""}`}
          </div>
          <WorkerInitial user={user} showEmail={true} avatarSize="large" />
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
