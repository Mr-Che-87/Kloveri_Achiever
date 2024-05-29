import styles from "./buttons.module.scss";
import giveAchieveIcon from "@/assets/giveAchieveIcon.png";

interface GiveAchieveButtonProps {
  onClick: () => void;
}

export function GiveAchieveButton({ onClick }: GiveAchieveButtonProps) {
  return (
    <button className={styles.giveAchieveButton} onClick={onClick}>
      <img src={giveAchieveIcon} alt="Наградить" />
      Наградить
    </button>
  );
}
