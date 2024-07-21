import { useState } from "react";
import styles from "./WorkerRanks.module.scss";
import iconRanks from "@/assets/Money-Coin.svg";

export default function WorkerRanks() {
  
  //заглушка:
  const [points, setPoints] = useState(450);  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoints(Number(event.target.value));
  };



  return (
    <div className={styles.workerRanksMenu}>
        <img className={styles.workerRanksIcon} src={iconRanks} alt="Ranks" />
        <input
          className={styles.workerRanksInput}
          type="number"
          value={points}
          onChange={handleChange} 
        />
          <span className={styles.workerRanksUnit}>&nbsp;&#x20BF;</span>
     </div>  
        

  );
}
