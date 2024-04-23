import axios from "axios";
import { useEffect, useState } from "react";
//import { SearchAllAchieveInput } from "../Workers/WorkerPage/buttons&inputes/SearchAllAchieveInput";
import styles from "../../pages/AchievementsConstructor/AchievementsConstructor.module.scss";
//import BookAvatar from "../../assets/book-icon.png";
import { IAchieve } from "../../types/IAchieve";


export default function AchievementsConstructor() {

return (
  <div>блаблабла</div>
)

}

/*
export default function AchievementsConstructor() {
  const [achievements, setAchievements] = useState<IAchieve[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(
          "https://reg.achiever.skroy.ru/achievs-lib/list/ "
        );
        setAchievements(response.data);
      } catch (error) {
        console.error("Ошибка при получении достижений:", error);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <div className={styles.achievementsConstructor}>
      <div className={styles.titleContainer}>
        <img src={BookAvatar} alt="Библиотека достижений" />
        <h1>Библиотека достижений</h1>
      </div>
      <SearchAllAchieveInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
  />*
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
*/