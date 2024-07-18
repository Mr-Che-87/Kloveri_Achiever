import { useState, useEffect } from "react";
import styles from "./WorkerRanks.module.scss";
import iconRanks from "@/assets/Money-Coin.svg";
// import { fetchGetIDUserAchieve } from "../../../../api/apiService";
// import { useParams } from "react-router-dom";
import { IConnection } from "../../../types/IConnection";

interface WorkerRanksProps {
  userAchievements: IConnection[];  //userAchievements - подъём состояния (lifting state up)
}

const WorkerRanks: React.FC<WorkerRanksProps> = ({ userAchievements }) => {
  const [ranksSum, setRanksSum] = useState(0);

  //подъём состояния (lifting state up) - чтобы баллы суммировались без перезагрузки:
  useEffect(() => {
    const sum = userAchievements.reduce(
      (acc, achievement) => acc + achievement.data.achievement.data.rank,
      0
    );
    setRanksSum(sum);
  }, [userAchievements]);

  
  return (
    <div className={styles.workerRanksMenu}>
      <img className={styles.workerRanksIcon} src={iconRanks} alt="Ranks" />
      <div className={styles.workerRanksSum}>
        {ranksSum}
      </div>
      <span className={styles.workerRanksUnit}>&nbsp;&#x20BF;</span>
    </div>
  );
}


export default WorkerRanks;