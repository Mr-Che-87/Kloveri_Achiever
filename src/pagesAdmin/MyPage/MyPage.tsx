import { useEffect, useState } from "react";

import styles from "./MyPage.module.scss";

import WorkerInitial from "./WorkerInitial/WorkerInitial";
import WorkerData from "./WorkerData/WorkerData";
<<<<<<< HEAD
import mockWithoutAchieve from "@/assets/mock_withoutAchieve.png"
//import WorkerTeams from "./WorkerTeams/WorkerTeams";
// import { WorkerAchievements } from "./WorkerAchievements/WorkerAchievements";
// import WorkerRanks from "./WorkerRanks/WorkerRanks";

=======
import WorkerTeams from "./WorkerTeams/WorkerTeams";
import mockWithoutAchieve from "@/assets/mock_withoutAchieve.png";
>>>>>>> dev3
import { IUser } from "../../types/IUser";
import { fetchGetLink, fetchGetUserData } from "../../api/apiService";

<<<<<<< HEAD

export default function MyPage() {
  // const { profile_id } = useParams();    //получаем profileId из параметров маршрута
  const [userData, setUserData] = useState<IUser | null>(null); //state данных юзера
  const [isEditing, setIsEditing] = useState(false);  //редактирование полей
=======
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
>>>>>>> dev3
  const profileId = localStorage.getItem("profileId");
  const [linkData, setLinkData] = useState<ILinkData | null>(null);


  useEffect(() => {
    if (profileId) {
      fetchGetUserData(profileId)
        .then((response) => {
<<<<<<< HEAD
          setUserData(response.data);   //data - все данные юзера из бэка {....}
=======
          setUserData(response.data);
>>>>>>> dev3
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      const organizationId = localStorage.getItem("organization_id");
      if (organizationId) {
        fetchGetLink(profileId, organizationId)
          .then((response) => {
            setLinkData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching link data:", error);
          });
      }
    }
  }, [profileId]);


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
          
        </div>
        {/*
=======
            onPhotoUpdate={onPhotoUpdate}
            showEmail={true}
            isEditing={isEditing}
            toggleEdit={toggleEdit}
            userData={userData}
            avatarSize={"large"}
            linkData={linkData}
          />
        </div>
>>>>>>> dev3
        <div className={styles.workerTeams}>
          <WorkerTeams />
        </div>
        */}
      </section>
      <section className={styles.mockWithoutAchieve}>
        <h2>ИНФОРМАЦИЯ О ТАРИФАХ И ПРОБНОМ ПЕРИОДЕ</h2>
<<<<<<< HEAD
        <img  className={styles.mockWithoutAchieveImg} src={mockWithoutAchieve}  />

=======
        <img className={styles.mockWithoutAchieveImg} src={mockWithoutAchieve} />
>>>>>>> dev3
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

