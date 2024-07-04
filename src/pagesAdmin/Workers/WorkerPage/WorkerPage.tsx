import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./WokerPage.module.scss";
import WorkerInitial from "./WorkerInitial/WorkerInitial";
import { LinkWorkerButton } from "./buttons&inputes/LinkWorkerButton";
import { DeleteBanWorkerButton } from "./buttons&inputes/DeleteBanWorkerButton";
import WorkerData from "./WorkerData/WorkerData";
import { WorkerAchievements } from "./WorkerAchievements/WorkerAchievements";
import WorkerRanks from "./WorkerRanks/WorkerRanks";
<<<<<<< HEAD
//import WorkerTeams from "./WorkerTeams/WorkerTeams";

import { IUser } from "../../../types/IUser";
import { fetchGetUserData } from "../../../api/apiService";  //api


export default function WorkerPage() {
  const { profile_id } = useParams();    //получаем profileId из параметров маршрута
  const [userData, setUserData] = useState<IUser | null>(null); //state данных юзера
  const [isEditing, setIsEditing] = useState(false);  //редактирование полей
  
  // GET-Получение данных одного пользователя по ID:
  useEffect(() => {
    //const userRoleId = "1";    //0 - admin, 1 - worker - старое
    
    if (profile_id) { //проверяем, что profile_id определен
      //console.log("useEffect: Загружен список данных юзера");
      fetchGetUserData(profile_id)
        .then((response) => {
          setUserData(response.data);   //data - все данные юзера из бэка {....}
=======
import WorkerTeams from "./WorkerTeams/WorkerTeams";
import { IUser } from "../../../types/IUser";
import { fetchGetLink, fetchGetUserData } from "../../../api/apiService";





interface ILinkData {
  link_id: string;
  specialty: string;
  start_work_date: string;
}




export default function WorkerPage() {
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
>>>>>>> dev3
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

<<<<<<< HEAD


  //Функция переключения режима редактирования:
=======
  // Функция переключения режима редактирования:
>>>>>>> dev3
  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className={styles.workerPage}>
      <section className={styles.workerSection}>
<<<<<<< HEAD
        <div className={styles.workerInitial}>
          {userData && (
            <WorkerInitial
              user={userData}  //передаем данные пользователя в WorkerInitial
              showEmail={true}
              avatarSize="large"  //пропс файла и css-размеров картинки
            />
          )}
=======
        <div className={styles.workerData}>
          <WorkerData
            showEmail={true}
            isEditing={isEditing}
            toggleEdit={toggleEdit}
            userData={userData}
            avatarSize={"large"}
            linkData = {linkData} 
          />
>>>>>>> dev3
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
<<<<<<< HEAD

        <div className={styles.divider}></div>

        <div className={styles.workerData}>
          <WorkerData
            isEditing={isEditing}
            toggleEdit={toggleEdit}
            userData={userData} // прокидываем userData в WorkerData
          />
        </div>
        {/*
=======
>>>>>>> dev3
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
<<<<<<< HEAD
        {userData && (
          <WorkerAchievements     userId={userData.profile_id} />  //прокидываем uuid юзера(из userData<IUser> внутрь WorkerAchievements 
        )}
=======
          {userData && (
            <WorkerAchievements userId={userData.profile_id} />
          )}
>>>>>>> dev3
        </div>
      </section>
    </div>
  );
}