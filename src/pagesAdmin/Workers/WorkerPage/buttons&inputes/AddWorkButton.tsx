import { MouseEventHandler } from "react";
import styles from "./buttons.module.scss";

interface AddWorkButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
  }

const AddWorkButton:React.FC<AddWorkButtonProps> = ({onClick}) => {
  return <button 
  onClick={onClick}
  className={styles.addWorkButton}>+ Добавить</button>;
};

export default AddWorkButton;
