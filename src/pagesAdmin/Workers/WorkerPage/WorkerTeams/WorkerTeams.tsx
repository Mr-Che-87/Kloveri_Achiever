import styles from "./WorkerTeams.module.scss";
import iconTeam from "@/assets/icon-Empty.png";

export default function WorkerTeams() {
  return (
    <div className={styles.workerTeamsMenu}>
        <h1>Команды</h1>
        <div className={styles.workerTeamsList}>
          <div className={styles.workerTeam}>
            <img className={styles.workerImg} src={iconTeam} alt="Avatar" />
            <h2 className={styles.workerName}>Название команды-1</h2>
          </div>
          <div className={styles.workerTeam}>
            <img className={styles.workerImg} src={iconTeam} alt="Avatar" />
            <h2 className={styles.workerName}>Название команды-2</h2>
            </div>
       </div>  
        


     
    </div>
  );
}
