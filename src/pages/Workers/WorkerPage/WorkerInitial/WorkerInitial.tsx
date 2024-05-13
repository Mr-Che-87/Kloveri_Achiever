import styles from "./WorkerInitial.module.scss";
import WorkerAvatar from "../../../../assets/Worker-Avatar.png";

interface WorkerInitialProps {
  showEmail: boolean;
  userData: {
    first_name?: string;
    email:string;
    photo_main?: string;
   
  } | null;
}

export default function WorkerInitial({
  showEmail,
  userData,
}: WorkerInitialProps) {
  if (!userData) {
    return <div>Не можем найти данные с бэка - user data...</div>;
  }

  return (
    <div className={styles.workerInitial}>
      <img
        className={styles.workerAvatar}
        src={userData?.photo_main || WorkerAvatar} // WorkerAvatar  - фотка из заглушки на резерв
        alt="Avatar"
      />
      <div>
        <div className={styles.workerName}>
          {userData?.first_name || "Загружаем имя..."}
        </div>
        {showEmail && (
          <div className={styles.workerMail}>
            {userData?.email || "Загружаем email..."}
          </div>
        )}
      </div>
    </div>
  );
}
