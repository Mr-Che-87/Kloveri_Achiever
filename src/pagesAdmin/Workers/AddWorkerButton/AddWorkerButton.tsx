import styles from "./AddWorkerButton.module.scss";

interface AddWorkerButtonProps{
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AddWorkerButton: React.FC<AddWorkerButtonProps> = ({onClick}) => {
  return <button 
  onClick={onClick}
  className={styles.addWorkerButton}>+ Добавить</button>;
};

export default AddWorkerButton;



