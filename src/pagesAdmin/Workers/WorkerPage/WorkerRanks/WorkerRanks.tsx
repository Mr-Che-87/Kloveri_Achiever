import { useState } from "react";
import styles from "./WorkerRanks.module.scss";
import iconRanks from "@/assets/icon-ranks.png";


export default function WorkerRanks() {
  
  //заглушка:
  const [points, setPoints] = useState(450);  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoints(Number(event.target.value));
  };



  return (
    <div className={styles.workerRanksMenu}>
        <h1 className={styles.workerRanksTitle}>Ваша копилка</h1>
        <img className={styles.workerRanksIcon} src={iconRanks} alt="Ranks" />
        <input
          className={styles.workerRanksInput}
          type="number"
          value={points}
          onChange={handleChange} 
        />
        
     </div>  
        

  );
}
