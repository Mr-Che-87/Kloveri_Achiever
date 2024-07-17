import styles from "./buttons.module.scss";
import arrowRight from "@/assets/arrow-right.png";

interface AllAchieveButtonProps {
  onClick: () => void;
}

export function AllAchieveButton({ onClick }: AllAchieveButtonProps) {
  return (
    <button className={styles.allAchieveButton} onClick={onClick}>
       Все доступные&nbsp;&nbsp;
       <img src={arrowRight} alt="Все доступные" />
    </button>
  );
}



