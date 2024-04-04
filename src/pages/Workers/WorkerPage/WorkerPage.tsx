import styles from "./WokerPage.module.scss";

import WorkerInitial from "./WorkerInitial/WorkerInitial";
import { ChangeWorkerButton } from "./buttons/ChangeWorkerButton";
import { LinkWorkerButton } from "./buttons/LinkWorkerButton";
import { BanWorkerButton } from "./buttons/BanWorkerButton";
import { DeleteWorkerButton } from "./buttons/DeleteWorkerButton";
import WorkerData from "./WorkerData/WorkerData";
import WorkerAchivements from "./WorkerAchivements/WorkerAchivements";

import { useState } from "react";

// Функция для переключения режима редактирования

export default function WorkerPage() {
  const [isEditing, setIsEditing] = useState(false);

  // Функция для переключения режима редактирования
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  return (
    <div className={styles.workerPage}>
      <header className={styles.workerHeader}>
        <div className={styles.workerInitial}>
          <WorkerInitial showEmail={true} />{" "}
          {/* Передаём проп showEmail со значением true */}
        </div>
        <div className={styles.headerNavMenu}>
          <nav className={styles.workerNavMenu}>
            <ul>
              <li>
                <ChangeWorkerButton
                  isEditing={isEditing}
                  toggleEdit={toggleEdit}
                />
              </li>
              <li>
                <LinkWorkerButton />
              </li>
              <li>
                <BanWorkerButton />
              </li>
              <li>
                <DeleteWorkerButton />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className={styles.workerMain}>
        <div className={styles.workerData}>
          <WorkerData isEditing={isEditing} />
        </div>
        <div className={styles.workerAchievements}>
          <WorkerAchivements />
        </div>
      </main>
    </div>
  );
}
