import styles from "./WorkerInitial.module.scss";
import WorkerAvatar from "../../../../assets/Worker-Avatar.png";

interface WorkerInitialProps {
  showEmail: boolean;
  userData: {
    name?: string;
    email?: string;
    foto?: string;
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
        src={userData.foto}  // {WorkerAvatar  || userData.foto} - фотка из заглушки пока
        alt="Avatar"
      />
      <div>
        <div className={styles.workerName}>
          {userData.name || "Загружаем имя..."}
        </div>
        {showEmail && (
          <div className={styles.workerMail}>
            {userData.email || "Загружаем email..."}
          </div>
        )}
      </div>
    </div>
  );
}
