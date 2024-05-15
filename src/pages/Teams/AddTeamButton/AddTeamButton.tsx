import styles from "./AddTeamButton.module.scss";

const AddTeamButton = ({onClick}) => {
  return <button 
  onClick={onClick}
  className={styles.addTeamButton}>+ Добавить</button>;
};

export default AddTeamButton;



