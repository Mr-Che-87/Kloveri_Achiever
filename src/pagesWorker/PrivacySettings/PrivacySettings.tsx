<<<<<<< HEAD
import React, {
  useState as useUserState,
  useEffect as useUserEffect,
} from "react";
import LogoutButton from "./LogoutButton";
import ChangePassword from "./ChangePassword";
import userStyles from "./PrivacySettings.module.scss";
import { IUser } from "../../types/IUser";
import defaultAvatar from "@/assets/defaultAvatar.png"; // Заглушка, если бэк недоступен

interface UserSettingsPageProps {
  userData: IUser | null;
}

const UserSettingsPage: React.FC<UserSettingsPageProps> = ({ userData }) => {
  const [formData, setFormData] = useUserState<IUser | null>(null);

  useUserEffect(() => {
    if (userData) {
      setFormData({ ...userData });
    }
  }, [userData]);

  return (
    <div className={userStyles.userSettingsPage}>
      <h1>Настройки пользователя</h1>
      {formData ? (
        <>
          <div className={userStyles.userFullName}>
            {`${formData.first_name || ""} ${formData.middle_name || ""} ${formData.last_name || ""}`}
          </div>
          <div className={userStyles.userAvatarWrapper}>
            <img
              src={formData.photo_small || defaultAvatar}
              alt="User Avatar"
              className={userStyles.userAvatar}
            />
          </div>
=======
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
>>>>>>> dev3
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
