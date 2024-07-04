import { useEffect, useState } from "react";


import styles from "./MyPage.module.scss";

import WorkerInitial from "./WorkerInitial/WorkerInitial";
import WorkerData from "./WorkerData/WorkerData";
<<<<<<< HEAD
=======
// import WorkerTeams from "./WorkerTeams/WorkerTeams";
>>>>>>> dev3
import { WorkerAchievements } from "./WorkerAchievements/WorkerAchievements";
import WorkerRanks from "./WorkerRanks/WorkerRanks";
//import WorkerTeams from "./WorkerTeams/WorkerTeams";

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
  // const { profileId } = useParams();    //получаем profileId из параметров маршрута
  const [userData, setUserData] = useState<IUser | null>(null); //state данных юзера
  const [isEditing, setIsEditing] = useState(false);  //редактирование полей
 const profileId = localStorage.getItem("profileId")
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
<<<<<<< HEAD
            isEditing={isEditing}
            toggleEdit={toggleEdit}
            userData={userData} // прокидываем userData в WorkerData
          />
=======
            showEmail={true}
            isEditing={isEditing}
            toggleEdit={toggleEdit}
            userData={userData} // прокидываем userData в WorkerData
            avatarSize={"large"} // прокидываем userData в WorkerData
            onPhotoUpdate={onPhotoUpdate}
             linkData={linkData}          />
>>>>>>> dev3
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

