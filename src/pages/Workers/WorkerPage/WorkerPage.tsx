import styles from "./WokerPage.module.scss";

import WorkerInitial from "./WorkerInitial/WorkerInitial";
import { LinkWorkerButton } from "./buttons&inputes/LinkWorkerButton";
import { DeleteBanWorkerButton } from "./buttons&inputes/DeleteBanWorkerButton";
import WorkerData from "./WorkerData/WorkerData";
import WorkerTeams from "./WorkerTeams/WorkerTeams";
import WorkerAchivements from "./WorkerAchivements/WorkerAchivements";

import { useState } from "react";
//import { users } from "../../../mocks/usersData";

export default function WorkerPage() {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  return (
    <div className={styles.workerPage}>
      <section className={styles.workerSection}>
        <div className={styles.workerInitial}>
          <WorkerInitial showEmail={true} />{" "}
          {/* Передаём проп showEmail со значением true */}
        </div>

        <div className={styles.workerBtnMenu}>
          <ul>
            <li>
              <LinkWorkerButton />
            </li>
            <li>
              <DeleteBanWorkerButton />
            </li>
          </ul>
        </div>
        <div className={styles.divider}></div>
       

        <div className={styles.workerData}>
          <WorkerData isEditing={isEditing} toggleEdit={toggleEdit} />
        </div>
        <div className={styles.workerTeams}>
          <WorkerTeams />
        </div>

      </section>
      <div className={styles.workerAchievements}>
        <WorkerAchivements />
      </div>
    </div>
  );
}
