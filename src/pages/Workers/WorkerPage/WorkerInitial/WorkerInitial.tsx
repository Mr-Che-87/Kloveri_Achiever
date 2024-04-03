import styles from "./WorkerInitial.module.scss";
import WorkerAvatar from "@/assets/Worker-Avatar.png";

export default function WorkerInitial({ showEmail }: any) {
  return (
    <div className={styles.workerInitial}>
      <img src={WorkerAvatar} alt="Avatar" />
      <div>
        <div className={styles.workerName}>...Иван Михайлов</div>
        {/* Используем шаблонную строку для условного добавления класса */}
        <div
          className={`${styles.workerMail} ${showEmail ? "" : styles.hidden}`}
        >
          ...ioann_mikh@company.am
        </div>
      </div>
    </div>
  );
}
