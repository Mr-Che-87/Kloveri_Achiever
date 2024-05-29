import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./MyPage.module.scss";

import WorkerInitial from "./WorkerInitial/WorkerInitial";
import WorkerData from "./WorkerData/WorkerData";
import WorkerTeams from "./WorkerTeams/WorkerTeams";
import { WorkerAchievements } from "./WorkerAchievements/WorkerAchievements";
import WorkerRanks from "./WorkerRanks/WorkerRanks";

import { IUser } from "../../types/IUser";
import { fetchGetUserData } from "../../api/apiService";  //api


export default function MyPage() {
  const { profile_id } = useParams();    //получаем profileId из параметров маршрута
  const [userData, setUserData] = useState<IUser | null>(null); //state данных юзера
  const [isEditing, setIsEditing] = useState(false);  //редактирование полей

  // GET-Получение данных одного пользователя по ID:
  useEffect(() => {
    const adminId = "4d90df35-0d1f-4cba-b1e9-47674bca2f51";    //заглушка для презентации
    
    if (adminId) { //проверяем, что profile_id определен
      //console.log("useEffect: Загружен список данных юзера");
      fetchGetUserData(adminId)
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

  return (
    <div className={styles.workerPage}>
      <section className={styles.workerSection}>
        <div className={styles.workerInitial}>
          {userData && (
            <WorkerInitial
              user={userData}  //передаем данные пользователя в WorkerInitial
              showEmail={true}
              avatarSize="large"  //пропс файла и css-размеров картинки
            />
          )}
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

      <section className={styles.workerRanksAndAchievements}>
        <div className={styles.workerRanks}>
        <WorkerRanks />
        </div>

        <div className={styles.workerAchievements}>
        {userData && (
          <WorkerAchievements     userId={userData.profile_id} />  //прокидываем uuid юзера(из userData<IUser> внутрь WorkerAchievements 
        )}
        </div>
      </section>
    </div>
  );
}

