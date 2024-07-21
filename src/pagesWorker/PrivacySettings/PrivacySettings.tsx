import { useState, useEffect } from "react";
import styles from "./PrivacySettings.module.scss";

import iconSettings from "@/assets/icon-settings.svg";
import iconLogout from "@/assets/icon-logout.png";
import iconHelp from "@/assets/icon-help.png";
import iconChangePassword from "@/assets/icon-change_password.png";
import ChangePassword from "./ChangePassword";

import { IUser } from "../../types/IUser";
import WorkerInitial from "../Workers/WorkerPage/WorkerInitial/WorkerInitial";

interface UserSettingsPageProps {
  user: IUser | null;
  userData: IUser;
  onClose: () => void;
}

const UserSettingsPage: React.FC<UserSettingsPageProps> = ({ user, userData, onClose }) => {
  console.log("User data:", user); // вывод для отладки НЕ РАБОТАЕТ
  console.log("UserData data:", userData); // вывод для отладки НЕ РАБОТАЕТ

  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

 
    const handleLogout = () => {
      localStorage.clear();
      window.location.href = "/login"; // перенаправляем на страницу логина
    };
  


  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.userSettingsPage} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
              &times;
            </button>
            <div className={styles.userSettingsTitle}>
              <img className={styles.userSettingsImg} src={iconSettings}/>
              <h1>Настройки пользователя</h1>
            </div>
        { /* НЕ РАБОТАЕТ ПЕРЕДАЧА ИМЕНИ-ФАМИЛИИ:
        {user ? (
          <>
            <div className={styles.userFullName}>
              {`${user.first_name || ""} ${user.middle_name || ""} ${user.last_name || ""}`}
            </div>
            <WorkerInitial
              user={user}  // передаем данные пользователя в WorkerInitial
              showEmail={false}
              avatarSize="small"
              userData={userData}
              linkData={null}  // передаем linkData как null, если у вас нет данных для этого пропса
            />
          </>
          ) : (
            <div>Загрузка данных пользователя...</div>
          )
        } */}
          <div  className={styles.buttonsGroup}> 
            <button onClick={() => setShowChangePassword(!showChangePassword)}>
              <img className={styles.buttonIcon} src={iconChangePassword} alt="Change Password" />
              <span className={styles.buttonText}>Безопасность и вход</span>
            </button>
              {showChangePassword && <ChangePassword />}
            <button> 
              <img className={styles.buttonIcon} src={iconHelp} alt="Help" />
              <span className={styles.buttonText}>Помощь</span>
            </button>
            <button onClick={handleLogout}>
              <img className={styles.buttonIcon} src={iconLogout} alt="Logout" />
              <span className={styles.buttonText}>Выйти</span>
            </button>
          </div>
        </div>
    </div>
  );
};

export default UserSettingsPage;
