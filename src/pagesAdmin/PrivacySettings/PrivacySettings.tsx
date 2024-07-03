import React, { useState, useEffect } from "react";
import WorkerInitial from "../MyPage/WorkerInitial/WorkerInitial";
import LogoutButton from "./LogoutButton";
import ChangePassword from "./ChangePassword";
import styles from "./PrivacySettings.module.scss";
import { IUser } from "../../types/IUser";
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

  return (
    <div className={styles.userSettingsPage}>
      <h1>Настройки пользователя</h1>
      <img src={WelcomeImg} alt="Welcome" />
      {formData ? (
        <>
          <div className={styles.userFullName}>
            {`${formData.first_name || ""} ${formData.middle_name || ""} ${formData.last_name || ""}`}
          </div>
          <WorkerInitial user={formData} showEmail={true} avatarSize="large" />
        </>
      ) : (
        <div>Загрузка данных пользователя...</div>
      )}

      <ChangePassword />
      <LogoutButton />
    </div>
  );
};

export default UserSettingsPage;
