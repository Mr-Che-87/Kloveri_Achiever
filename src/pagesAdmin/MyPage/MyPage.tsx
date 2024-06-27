import { useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import WorkerData from "./WorkerData/WorkerData";
import WorkerTeams from "./WorkerTeams/WorkerTeams";
import mockWithoutAchieve from "@/assets/mock_withoutAchieve.png"
//import WorkerTeams from "./WorkerTeams/WorkerTeams";
// import { WorkerAchievements } from "./WorkerAchievements/WorkerAchievements";
// import WorkerRanks from "./WorkerRanks/WorkerRanks";

import { IUser } from "../../types/IUser";
import { fetchGetLink, fetchGetUserData } from "../../api/apiService";  //api

interface IMyPageProps{
  onPhotoUpdate: (newPhotoUrl: string) => void;
}
interface ILinkData {
  link_id: string;
  specialty: string;
  start_work_date: string;
}

export default function MyPage({onPhotoUpdate}: IMyPageProps) {
  // const { profile_id } = useParams();    //получаем profileId из параметров маршрута
  const [userData, setUserData] = useState<IUser | null>(null); //state данных юзера
  const [isEditing, setIsEditing] = useState(false);  //редактирование полей
  const profileId = localStorage.getItem("profileId");
  const [linkData, setLinkData] = useState<ILinkData | null>(null);

  // GET-Получение данных одного пользователя по ID:
  useEffect(() => {
    if (profileId) {
      console.log("Fetching user data...");
      fetchGetUserData(profileId)
        .then((response) => {
          console.log("User data received:", response.data);
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
  
        const organizationId = localStorage.getItem("organization_id");
        console.log("organizationId from localStorage:", organizationId);
        
        if (organizationId) {
          console.log("Fetching link data...");
          fetchGetLink(profileId, organizationId)
            .then((response) => {
              console.log("Link data received:", response.data);
              setLinkData(response.data);
            })
            .catch((error) => {
              console.error("Error fetching link data:", error);
            });
        }
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
            linkData = {linkData} 
            onPhotoUpdate={onPhotoUpdate}                 
                   />
        </div>
        
        <div className={styles.workerTeams}>
          <WorkerTeams />
        </div>
      </section>

      <section className={styles.mockWithoutAchieve}>
        <h2>ИНФОРМАЦИЯ О ТАРИФАХ И ПРОБНОМ ПЕРИОДЕ</h2>
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

