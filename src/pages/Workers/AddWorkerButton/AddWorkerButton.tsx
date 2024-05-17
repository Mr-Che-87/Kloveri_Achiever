import styles from "./AddWorkerButton.module.scss";

const AddWorkerButton = ({onClick}) => {
  return <button 
  onClick={onClick}
  className={styles.addWorkerButton}>+ Добавить</button>;
};

export default AddWorkerButton;



