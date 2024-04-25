
/*
export default function AchievementsConstructor() {

return (
  <div>блаблабла</div>
)

}
*/


//import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../pages/AchievementsConstructor/AchievementsConstructor.module.scss";
import BookAvatar from "../../assets/book-icon.png";
import { SearchAllAchieveInput } from "../Workers/WorkerPage/buttons&inputes/SearchAllAchieveInput";

import { IAchieve } from "../../types/IAchieve";
import { fetchGetAchieveLibrary } from "../../api/apiService";

export default function AchievementsConstructor() {
  const [achievements, setAchievements] = useState<IAchieve[]>([]);
  const [searchQuery, setSearchQuery] = useState("");


//GET-запрос achiev-lib(возвращает всю библиотеку наград):
useEffect(() => {
  //console.log("useEffect: загрузка всей библиотеки наград"); 
  fetchGetAchieveLibrary()
   .then((response) => {
    //console.log("useEffect: Response всей библиотеки наград", response);
    setAchievements(response.data);   //data - все данные из бэка{...}
  })
    .catch((error) => {
      console.error("Ошибка при получении данных пользователя:", error);
    });
}, []);

  /*
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(
          "https://reg.achiever.skroy.ru/achiev-lib/list/ "
        );
        setAchievements(response.data);
      } catch (error) {
        console.error("Ошибка при получении достижений:", error);
      }
    };

    fetchAchievements();
  }, []);
  */

  return (
    <div className={styles.achievementsConstructor}>
      <div className={styles.titleContainer}>
        <img src={BookAvatar} alt="Библиотека достижений" />
        <h1>Библиотека достижений</h1>
      </div>
      <SearchAllAchieveInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
  />
      <div className={styles.divider}></div>
      <div className={styles.achievementsGrid}>
        {achievements.map((achievement: IAchieve) => (
          <div key={achievement.id} className={styles.achievementCard}>
            <img src={achievement.data.image} alt={achievement.data.title} />
            <div className={styles.cardContent}>
              <h2>{achievement.data.title}</h2>
              <p>{achievement.data.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
