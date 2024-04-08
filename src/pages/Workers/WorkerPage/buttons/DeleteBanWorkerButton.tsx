import styles from "./buttons.module.scss";
import deliteBanIcon from "@/assets/deliteBanIcon.svg";
export function DeleteBanWorkerButton() {
  return (
    <button className={styles.deleteBanWorkerButton}>
      <img src={deliteBanIcon} alt="" />
      Удалить аккаунт
    </button>
  );
}
