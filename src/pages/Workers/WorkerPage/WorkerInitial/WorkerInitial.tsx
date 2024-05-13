import styles from "./WorkerInitial.module.scss";
import WorkerAvatar from "../../../../assets/Worker-Avatar.png";  //заглушка на резерв
import { IUser } from "../../../../types/IUser";

interface WorkerInitialProps {
  user: IUser | undefined;
  showEmail: boolean;  //отображение мейла
  photoType: "photo_small" | "photo_main";  //отображение размера фотки
}

export default function WorkerInitial({
  user,
  showEmail,
  photoType
}: WorkerInitialProps) {
  if (!user) {
    return <div>Не можем найти данные с бэка - user data...</div>;
  }

  
  return (
    <div className={styles.workerInitial}>
      <img
        className={styles.workerAvatar}
        src={user[photoType] || WorkerAvatar}    //WorkerAvatar - фотка из заглушки на резерв - НЕ РАБОТАЕТ С ПУСТЫМ url!!!  - попробовать через вес или 404
        alt="Avatar"
      />
      <div>
        <div className={styles.workerName}>
          {`${user.first_name} ${user.last_name}` || "Загружаем имя..."}
        </div>
        {showEmail && (
          <div className={styles.workerMail}>
            {user.contact_email?.[0]?.value || "Загружаем email..."}
          </div>
        )}
      </div>
    </div>
  );
}
