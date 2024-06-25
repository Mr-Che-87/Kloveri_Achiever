import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./WokerPage.module.scss";
import { LinkWorkerButton } from "./buttons&inputes/LinkWorkerButton";
import { DeleteBanWorkerButton } from "./buttons&inputes/DeleteBanWorkerButton";
import WorkerData from "./WorkerData/WorkerData";
import { WorkerAchievements } from "./WorkerAchievements/WorkerAchievements";
import WorkerRanks from "./WorkerRanks/WorkerRanks";
//import WorkerTeams from "./WorkerTeams/WorkerTeams";

import { IUser } from "../../../types/IUser";
import { fetchGetUserData } from "../../../api/apiService"; //api

export default function WorkerPage() {
  const { profile_id } = useParams(); //получаем profileId из параметров маршрута
  const [userData, setUserData] = useState<IUser | null>(null); //state данных юзера
  const [isEditing, setIsEditing] = useState(false); //редактирование полей

  // GET-Получение данных одного пользователя по ID:
  useEffect(() => {
    //const userRoleId = "1";    //0 - admin, 1 - worker - старое

    if (profile_id) {
      //проверяем, что profile_id определен
      //console.log("useEffect: Загружен список данных юзера");
      fetchGetUserData(profile_id)
        .then((response) => {
          setUserData(response.data); //data - все данные юзера из бэка {....}
        })
        .catch((error) => {
          console.error("Ошибка при получении данных пользователя:", error);
        });
    }
  }, [profile_id]);

  //Функция переключения режима редактирования:
  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className={styles.workerPage}>
      <section className={styles.workerSection}>
        <div className={styles.workerData}>
          <WorkerData
            showEmail={true}
            isEditing={isEditing}
            toggleEdit={toggleEdit}
            userData={userData} // прокидываем userData в WorkerData
            avatarSize={"large"}
          />
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
        <div className={styles.workerTeams}>
          <WorkerTeams />
        </div>
        */}
      </section>

      <section className={styles.workerRanksAndAchievements}>
        <div className={styles.workerRanks}>
          <WorkerRanks />
        </div>

        <div className={styles.workerAchievements}>
          {userData && (
            <WorkerAchievements userId={userData.profile_id} /> //прокидываем uuid юзера(из userData<IUser> внутрь WorkerAchievements
          )}
        </div>
      </section>
    </div>
  );
}
