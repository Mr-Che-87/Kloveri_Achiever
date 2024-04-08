import styles from "./WorkerInitial.module.scss";
import WorkerAvatar from "@/assets/Worker-Avatar.png";

interface WorkerInitialProps {
  showEmail: boolean;
}
export default function WorkerInitial({ showEmail }: WorkerInitialProps) {
  return (
    <div className={styles.workerInitial}>
      <img className={styles.workerAvatar} src={WorkerAvatar} alt="Avatar" />
      <div>
        <div className={styles.workerName}>...Иван Михайлов</div>
        <div
          className={`${styles.workerMail} ${showEmail ? "" : styles.hidden}`}
        >
          ...ioann_mikh@company.am
        </div>
      </div>
    </div>
  );
}
