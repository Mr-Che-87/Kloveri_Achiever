import { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
import styles from "./MyPage.module.scss";
import WorkerData from "./WorkerData/WorkerData";
// import WorkerTeams from "./WorkerTeams/WorkerTeams";
import { WorkerAchievements } from "./WorkerAchievements/WorkerAchievements";
import WorkerRanks from "./WorkerRanks/WorkerRanks";
import { IUser } from "../../types/IUser";
import { IConnection } from "../../types/IConnection";
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
  const profileId = localStorage.getItem("profileId")
  const [userData, setUserData] = useState<IUser | null>(null); //state данных юзера
  const [isEditing, setIsEditing] = useState(false);  //редактирование полей
 const [linkData, setLinkData] = useState<ILinkData | null>(null);
 //стейт для подъёма состояния (lifting state up) баллов ачивок из WorkerAchievements,
//чтобы баллы юзера отображались без перезагрузки:
const [userAchievements, setUserAchievements] = useState<IConnection[]>([]); 


 useEffect(() => {
  const userDataString = localStorage.getItem("userData");
  let organizationId = "";
  if(userDataString){
    try{
      const userData = JSON.parse(userDataString);
      organizationId = userData.organization_id
    } catch(error){
      console.error("Ошибка при парсинге данных userData из localStorage:", error)
    }
  }else{
    console.error("Данные userData не найдены в localStorage")
  }


  console.log("Profile ID from localStorage:", profileId);
  if (profileId) {
    fetchGetUserData(profileId)
      .then((response) => {
        console.log("User data fetched:", response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    console.log("Organization ID from localStorage:", organizationId);
    if (organizationId) {
      fetchGetLink(profileId, organizationId)
        .then((response) => {
          console.log("Link data fetched:", response.data);
          setLinkData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching link data:", error);
        });
    } else {
      console.error("Organization ID is not available");
    }
  } else {
    console.error("Profile ID is not available");
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



  //подъём состояния (lifting state up):
  const handleUpdateUserAchievements = (updatedAchievements: IConnection[]) => {
    setUserAchievements(updatedAchievements);
  };

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
            avatarSize={"large"} // прокидываем userData в WorkerData
            onPhotoUpdate={onPhotoUpdate}
             linkData={linkData}          />
        </div>
        {/*
        <div className={styles.workerTeams}>
          <WorkerTeams />
        </div>
        */}
      </section>

      <section className={styles.workerRanksAndAchievements}>
        <div className={styles.workerRanks}>
        <WorkerRanks userAchievements={userAchievements}/> {/*подъём состояния (lifting state up)*/}
        </div>

        <div className={styles.workerAchievements}>
        {userData && (
          <WorkerAchievements 
            //прокидываем uuid юзера(из userData<IUser> внутрь WorkerAchievements    
            userId={userData.profile_id}  
            //подъём состояния (lifting state up):
            onUpdateUserAchievements={handleUpdateUserAchievements}/>  
        )}
        </div>
      </section>
    </div>
  );
}

