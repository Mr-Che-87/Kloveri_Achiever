import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./WokerPage.module.scss";
import { LinkWorkerButton } from "./buttons&inputes/LinkWorkerButton";
import { DeleteBanWorkerButton } from "./buttons&inputes/DeleteBanWorkerButton";
import WorkerData from "./WorkerData/WorkerData";
import { WorkerAchievements } from "./WorkerAchievements/WorkerAchievements";
import WorkerRanks from "./WorkerRanks/WorkerRanks";
import WorkerTeams from "./WorkerTeams/WorkerTeams";
import { IUser } from "../../../types/IUser";
import { fetchGetLink, fetchGetUserData } from "../../../api/apiService";


interface IMyPageProps{
  onPhotoUpdate: (newPhotoUrl: string) => void;
}


interface ILinkData {
  link_id: string;
  specialty: string;
  start_work_date: string;
}




export default function WorkerPage({onPhotoUpdate}: IMyPageProps) {
  const { profile_id } = useParams();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [linkData, setLinkData] = useState<ILinkData | null>(null);
  // GET-Получение данных одного пользователя по ID:
  useEffect(() => {
    if (profile_id) {
      console.log("Fetching user data...");
      fetchGetUserData(profile_id)
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
          fetchGetLink(profile_id, organizationId)
            .then((response) => {
              console.log("Link data received:", response.data);
              setLinkData(response.data);
            })
            .catch((error) => {
              console.error("Error fetching link data:", error);
            });
        }
    }
  }, [profile_id]);

  // Функция переключения режима редактирования:
  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className={styles.workerPage}>
      <section className={styles.workerSection}>
        <div className={styles.workerData}>
          <WorkerData
            showEmail={true}
            isEditing={isEditing}
            toggleEdit={toggleEdit}
            userData={userData}
            avatarSize={"large"}
            linkData = {linkData} 
            onPhotoUpdate={onPhotoUpdate}
          />
        </div>
        <div className={styles.workerBtnMenu}>
          <ul>
            <li>
              <LinkWorkerButton />
            </li>
            <li>
              <DeleteBanWorkerButton 
              setUserData={setUserData} 
              
              />
            </li>
          </ul>
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
            <WorkerAchievements userId={userData.profile_id} />
          )}
        </div>
      </section>
    </div>
  );
}