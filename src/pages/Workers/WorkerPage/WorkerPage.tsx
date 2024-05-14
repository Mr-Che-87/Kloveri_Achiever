import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  fetchUpdateUser,
  //как будет реестр:  POST-запрос user  -  2) изменяет данные существующего юзера 
} from "../../../api/apiService";  //api


export default function WorkerPage() {
  const { profile_id } = useParams();    //получаем profileId из параметров маршрута
  const [userData, setUserData] = useState<IUser | null>(null); //state данных юзера
  const [isEditing, setIsEditing] = useState(false);  //редактирование полей

  // GET-Получение данных одного пользователя по ID:
  useEffect(() => {
    //const userRoleId = "1";    //0 - admin, 1 - worker 
    if (profile_id) { // Проверяем, что profile_id определен
      //console.log("useEffect: Загружен список данных юзера");
      fetchGetUserData(profile_id)
        .then((response) => {
          setUserData(response.data);   //data - все данные юзера из бэка {....}
        })
        .catch((error) => {
          console.error("Ошибка при получении данных пользователя:", error);
        });
    }
  }, [profile_id]);

  //Функция переключения режима редактирования:
  const toggleEdit = () => setIsEditing(!isEditing);

/*
  const updateUserData = (updatedUserData: IUser) => {
    setUserData(updatedUserData); // Обновление состояния данных пользователя
    // Проверка на наличие profile_id
    if (updatedUserData.profile_id) {
      // Вызов апи для обновления данных на сервере
      fetchUpdateUser(updatedUserData.profile_id, updatedUserData)
        .then((response) => {
          console.log("Данные юзера успешно обновлены:", response.data);
        })
        .catch((error) => {
          console.error("Ошибка при обновлении данных пользователя:", error);
        });
    }
  };
*/


  return (
    <div className={styles.workerPage}>
      <section className={styles.workerSection}>
        <div className={styles.workerInitial}>
          {userData && (
            <WorkerInitial
              user={userData}  //передаем данные пользователя в WorkerInitial
              showEmail={true}
              avatarSize="large"
              
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
            profile_id={profile_id}
                        //updateUserData={updateUserData}
          />
        </div>
        <div className={styles.workerTeams}>
          <WorkerTeams />
        </div>
      </section>

{/*ВЕРНУТЬ
      <div className={styles.workerAchievements}>
      {userData && (
        <WorkerAchievements     userId={userData.uuid} />  //прокидываем uuid юзера(из userData<IUser> внутрь WorkerAchievements 
      )}
      </div>
*/}
    </div>
  );
}
