import { useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import WorkerData from "./WorkerData/WorkerData";
// import WorkerTeams from "./WorkerTeams/WorkerTeams";
import mockWithoutAchieve from "@/assets/mock_withoutAchieve.png";
import { IUser } from "../../types/IUser";
import { fetchGetLink, fetchGetUserData } from "../../api/apiService";

interface IMyPageProps {
  onPhotoUpdate: (newPhotoUrl: string) => void;
}

interface ILinkData {
  link_id: string;
  specialty: string;
  start_work_date: string;
}

export default function MyPage({ onPhotoUpdate }: IMyPageProps) {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const profileId = localStorage.getItem("profileId");
  const [linkData, setLinkData] = useState<ILinkData | null>(null);


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
            userData={userData}
            avatarSize={"large"}
            linkData={linkData}
          />
        </div>
        {/* <div className={styles.workerTeams}>
          <WorkerTeams />
        </div> */}
      </section>
      <section className={styles.mockWithoutAchieve}>
        <h2>ИНФОРМАЦИЯ О ТАРИФАХ И ПРОБНОМ ПЕРИОДЕ</h2>
        <img className={styles.mockWithoutAchieveImg} src={mockWithoutAchieve} />
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

