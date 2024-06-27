import { useEffect, useState } from "react";


import styles from "./MyPage.module.scss";

import WorkerInitial from "./WorkerInitial/WorkerInitial";
import WorkerData from "./WorkerData/WorkerData";
import { WorkerAchievements } from "./WorkerAchievements/WorkerAchievements";
import WorkerRanks from "./WorkerRanks/WorkerRanks";
//import WorkerTeams from "./WorkerTeams/WorkerTeams";

import { IUser } from "../../types/IUser";
import { fetchGetUserData } from "../../api/apiService";  //api


export default function MyPage() {
  // const { profileId } = useParams();    //получаем profileId из параметров маршрута
  const [userData, setUserData] = useState<IUser | null>(null); //state данных юзера
  const [isEditing, setIsEditing] = useState(false);  //редактирование полей
 const profileId = localStorage.getItem("profileId")



  // GET-Получение данных одного пользователя по ID:
  useEffect(() => {
    // const workerId = "86d767a8-225b-46db-846b-cae5f462c188";    //заглушка для презентации
    // const token = localStorage.getItem("token")
    if (profileId) { //проверяем, что profile_id определен
      // console.log("useEffect: Загружен список данных юзера");
      fetchGetUserData(profileId)
        .then((response) => {
          console.log("Received user data:", response.data);
          setUserData(response.data); 
           //data - все данные юзера из бэка {....}
        })
        .catch((error) => {
          console.error("Ошибка при получении данных пользователя:", error);
        });
    }
  }, [profileId]);

console.log(JSON.stringify(userData))

  // useEffect(() => {
  //   console.log("useEffect сработал!");
  //   if (profileId) {
  //     console.log(profileId,"profiled")
  //     fetchGetUserData(profileId)
  //       .then((response) => {
  //         console.log(response,"response")
  //         console.log("Received user data:", response.data);
  
  //         // Проверка на корректность данных
  //         if (
  //           response.data &&
  //           "first_name" in response.data &&
  //           "last_name" in response.data &&
  //           "email" in response.data &&
  //           "start_work" in response.data
  //         ) {
  //           setUserData(response.data);
  //         } else {
  //           console.error("Invalid user data received from API");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Ошибка при получении данных пользователя:", error);
  //       });
  //   }
  // }, [ profileId]);

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
        {/*
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
          <WorkerAchievements     userId={userData.profile_id} />  //прокидываем uuid юзера(из userData<IUser> внутрь WorkerAchievements 
        )}
        </div>
      </section>
    </div>
  );
}

