import styles from "./WorkerTeams.module.scss";
import iconTeam from "@/assets/icon-Empty.png";

export default function WorkerTeams() {
  return (
    <div className={styles.workerTeamsMenu}>
        <h1>Команды</h1>
        <div className={styles.workerTeamsList}>
          <div className={styles.workerTeam}>
              <img src={iconTeam} alt="Avatar" />
              <div>Название команды-1</div>
          </div>
          <div className={styles.workerTeam}>
              <img src={iconTeam} alt="Avatar" />
              <div>Название команды-2</div>
          </div>
       </div>  
        


     
    </div>
  );
}
