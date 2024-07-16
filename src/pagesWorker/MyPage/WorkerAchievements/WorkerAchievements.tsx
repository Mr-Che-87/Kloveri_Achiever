import { useState, useEffect, CSSProperties } from "react";
import styles from "./WorkerAchievements.module.scss";
import { SearchAchieveInput } from "../buttons&inputes/SearchAchieveInput";
import { AllAchieveButton } from "../buttons&inputes/AllAchieveButton";

import { ModalAchieveLibrary } from "../ModalAchieveLibrary/ModalAchieveLibrary";

//import { mockAchieveLibrary, IAchieve } from "../../../../mocks/AchieveLibrary";  //старая заглушка
//import { IUser } from "../../../../types/IUser";
import { IAchieve } from "../../../types/IAchieve";
import { IConnection } from "../../../types/IConnection";
import { fetchGetAchieveLibrary, 
         fetchGetIDUserAchieve,
        } from "../../../api/apiService";


interface WorkerAchievementsProps {
  userId: string | undefined;
}

interface CSSPropertiesWithVars extends CSSProperties {
  '--background-image'?: string;
}

export const WorkerAchievements: React.FC<WorkerAchievementsProps> = ({ userId }) => {
 
  //const [achieveList, setAchieveList] = useState<IAchieve[]>([]);  //старый-единый стейт(фильтрация по added)
  const [allAchievements, setAllAchievements] = useState<IAchieve[]>([]);  //стейт на ачивки библиотеки
  const [userAchievements, setUserAchievements] = useState<IConnection[]>([]);  //стейт на ачивки юзера
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");



// GET-Получение всей библиотеки наград:
  useEffect(() => {
    //console.log("useEffect: загрузка всей библиотеки наград"); 
    fetchGetAchieveLibrary()
     .then((response) => {
      //console.log("useEffect: Response всей библиотеки наград", response);
      setAllAchievements(response.data);   //data - все данные из бэка{...}
    })
      .catch((error) => {
        console.error("Ошибка при получении данных пользователя:", error);
      });
  }, []);



//GET-Получение списка достижений пользователя по ID:
//проблема в отображении дублирующихся ачивок!!(отображает, но криво удаляет + ошибка)
useEffect(() => {
  if (userId) {
    console.log("useEffect: загрузка ачивок пользователя с userId:", userId);
    fetchGetIDUserAchieve(userId)
    .then((response) => {
      console.log("useEffect: Response ачивок пользователя:", response);
      const userAchievements: IConnection[] = response.data.map((connection: IConnection) => ({
        id: connection.id,
        data: connection.data
        //connection.data.achievement); // извлекаем только награды из соединений
      }))
      
        setUserAchievements(userAchievements);
    })
    .catch((error) => {
      console.error("Ошибка при загрузке ачивок пользователя:", error);
    });
  }
}, [userId]);



  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.workerAchievements}>
      <h1>Достижения</h1>
      <div className={styles.workerAchievementsNav}>
      <ul>
        <li className={styles.allAchieveButton}>
          <AllAchieveButton onClick={openModal}/>
        </li>
        <li className={styles.searchAchieveInput}>
          <SearchAchieveInput 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} />
        </li>
      </ul>
    </div>

    <div className={styles.workerAchievementsList}>
        {userAchievements
          .filter((connect) =>
            searchQuery
              ? connect.data.achievement.data.title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              : true
          )
          .map((connect, index) => (
            <div
              key={index}
              className={styles.achievementCard}
              style={
                {
                  '--background-image': `url(${connect.data.achievement.data.achiev_style})`,
                } as CSSPropertiesWithVars
              }
            >
                <img
                  className={styles.achieveImg}
                  src={connect.data.achievement.data.image}
                  alt={connect.data.achievement.data.title}
                />
                <div className={styles.achieveContent}>
                  <h2 className={styles.achieveTitle}>
                    {connect.data.achievement.data.title}
                  </h2>
                  <p className={styles.achieveDescription}>
                    {connect.data.achievement.data.description.length > 100 
                      ? connect.data.achievement.data.description.slice(0, 100) + '...' 
                      : connect.data.achievement.data.description}
                  </p>
                  <div className={styles.achieveRank}>
                    {connect.data.achievement.data.rank}<span>&nbsp;&#x20BF;</span>
                  </div>
                </div>
            </div>
          ))}
      </div>

      {showModal && (
        <ModalAchieveLibrary 
          allAchievements={allAchievements} 
          userAchievements={userAchievements} 
          closeModal={closeModal} 
        />    
        )}
    </div>
  );
}



