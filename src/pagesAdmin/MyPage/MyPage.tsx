import { useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import WorkerData from "./WorkerData/WorkerData";
import WorkerTeams from "./WorkerTeams/WorkerTeams";
import mockWithoutAchieve from "@/assets/mock_withoutAchieve.png"
// import { WorkerAchievements } from "./WorkerAchievements/WorkerAchievements";
// import WorkerRanks from "./WorkerRanks/WorkerRanks";

import { IUser } from "../../types/IUser";
import { fetchGetUserData } from "../../api/apiService";  //api

interface IMyPageProps{
  onPhotoUpdate: (newPhotoUrl: string) => void;
}

export default function MyPage({onPhotoUpdate}: IMyPageProps) {
  // const { profile_id } = useParams();    //получаем profileId из параметров маршрута
  const [userData, setUserData] = useState<IUser | null>(null); //state данных юзера
  const [isEditing, setIsEditing] = useState(false);  //редактирование полей
  const profileId = localStorage.getItem("profileId");


  // GET-Получение данных одного пользователя по ID:
  useEffect(() => {
    // const adminId = "4d90df35-0d1f-4cba-b1e9-47674bca2f51";    //заглушка для презентации
    
    if (profileId) { //проверяем, что profile_id определен
      //console.log("useEffect: Загружен список данных юзера");
      fetchGetUserData(profileId)
        .then((response) => {
          setUserData(response.data);   //data - все данные юзера из бэка {....}
         
        })
        .catch((error) => {
          console.error("Ошибка при получении данных пользователя:", error);
        });
    }
  }, [profileId]);

// Обновление аватарки
 


  //Функция переключения режима редактирования:
  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className={styles.workerPage}>
      <section className={styles.workerSection}>
        <div className={styles.workerData}>
          <WorkerData
           onPhotoUpdate={onPhotoUpdate}
            showEmail={true}
            isEditing={isEditing}
            toggleEdit={toggleEdit}
            userData={userData} // прокидываем userData в WorkerData
            avatarSize={"large"}                     
                   />
        </div>
        
        <div className={styles.workerTeams}>
          <WorkerTeams />
        </div>
      </section>

      <section className={styles.mockWithoutAchieve}>
        <h2>ЭЭЭЭ, ЗАЧЭМ ТЭБЭ АЧИВКИ ДАРАГОЙ, ТЫ ИТАК КРАСАУЧЕГ!!</h2>
        <img  className={styles.mockWithoutAchieveImg} src={mockWithoutAchieve}  />

      </section>

      {/* на случай, если hr-у можно будет выдавать ачивки  
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
      */}
    </div>
  );
}

