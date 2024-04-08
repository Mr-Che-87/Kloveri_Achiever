import styles from "./buttons.module.scss";
import linkWorkerIcon from "@/assets/linkWorkerIcon.svg";
export function LinkWorkerButton() {
  return (
    <button className={styles.linkWorkerButton}>
      <img src={linkWorkerIcon} alt="изменить" />
      Ссылка для авторизации
    </button>
  );
}
