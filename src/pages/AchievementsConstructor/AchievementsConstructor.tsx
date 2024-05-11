import axios from "axios";
import { useEffect, useState } from "react";
import ModalAddingAchieve from "./ModalAddingAchieve";
import { SearchAllAchieveInput } from "../Workers/WorkerPage/buttons&inputes/SearchAllAchieveInput";
import styles from "../../pages/AchievementsConstructor/AchievementsConstructor.module.scss";
import BookAvatar from "../../assets/book-icon.png";
import { IAchieve } from "../../types/IAchieve";

export default function AchievementsConstructor() {
  const [achievements, setAchievements] = useState<IAchieve[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(
          "https://reg.achiever.skroy.ru/achievements/"
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
      />
      <div className={styles.divider}></div>
      <div className={styles.achievementsGrid}>
        <button
          onClick={toggleModal}
          className={styles.createAchievementButton}
        >
          Создать достижение
        </button>
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={styles.achievementCard}
            style={{ backgroundImage: `url(${achievement.data.achiev_style})` }}
          >
            <img src={achievement.data.image} alt={achievement.data.title} />
            <div className={styles.cardContent}>
              <h2>{achievement.data.title}</h2>
              <p>{achievement.data.description}</p>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && <ModalAddingAchieve closeModal={toggleModal} />}
    </div>
  );
}
