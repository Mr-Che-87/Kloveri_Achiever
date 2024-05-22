import styles from "./buttons.module.scss";
import arrowRight from "@/assets/arrow-right.png";

export function AllAchieveButton() {
  return (
    <button className={styles.allAchieveButton}>
        Все&nbsp;&nbsp;
        <img src={arrowRight} alt="Все" />
    </button>
  );
}


