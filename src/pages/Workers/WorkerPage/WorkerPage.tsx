import { useEffect, useState } from "react";
import styles from "./WokerPage.module.scss";
import WorkerInitial from "./WorkerInitial/WorkerInitial";
import { LinkWorkerButton } from "./buttons&inputes/LinkWorkerButton";
import { DeleteBanWorkerButton } from "./buttons&inputes/DeleteBanWorkerButton";
import WorkerData from "./WorkerData/WorkerData";
import WorkerTeams from "./WorkerTeams/WorkerTeams";
import { WorkerAchievements } from "./WorkerAchievements/WorkerAchievements";

import { IUser } from "../../../types/IUser";
import {
  fetchGetUserData,  
  //как будет реестр:  POST-запрос user  -  2) изменяет данные существующего юзера 
} from "../../../api/apiService";  //api


export default function WorkerPage() {
  const [userData, setUserData] = useState<IUser | null>(null);
  //const [userAchievements, setUserAchievements] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  ////GET-запрос user(возвращает данные юзера):
  useEffect(() => {
    
    const userRoleId = "";    //0 - admin, 1 - worker 
    // console.log("useEffect: Загружен список данных юзера");
   
    fetchGetUserData(userRoleId)
      .then((response) => {
        console.log("useEffect: Response списка данных юзера:", response.data);
        setUserData(response.data);   //data - все данные юзера из бэка {....}
       
         console.log("userRoleId", response.data)
        
      })
      .catch((error) => {
        console.error("Ошибка при получении данных пользователя:", error);
      });
  }, []);

  //Функция переключения режима редактирования:
  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className={styles.workerPage}>
      <section className={styles.workerSection}>
        <div className={styles.workerInitial}>
          {userData && (
            <WorkerInitial
              showEmail={true}
              userData={userData} // передаем объект userData только если он не null
            />
            
          )}
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
          <WorkerData
            isEditing={isEditing}
            toggleEdit={toggleEdit}
            userData={userData} // прокидываем userData в WorkerData
          />
        </div>
        <div className={styles.workerTeams}>
          <WorkerTeams />
        </div>
      </section>

      <div className={styles.workerAchievements}>
      {userData && (
        <WorkerAchievements     userId={userData.profile_id} />  //прокидываем uuid юзера(из userData<IUser> внутрь WorkerAchievements 
      )}
      </div>
    </div>
  );
}
