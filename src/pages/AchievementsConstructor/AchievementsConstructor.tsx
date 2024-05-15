import styles from "../../pages/AchievementsConstructor/AchievementsConstructor.module.scss";
import { useEffect, useState } from "react";

import ModalAddingAchieve from "./ModalAddingAchieve";
import { SearchAllAchieveInput } from "../Workers/WorkerPage/buttons&inputes/SearchAllAchieveInput";
import BookAvatar from "../../assets/book-icon.png";

import { IAchieve } from "../../types/IAchieve";
import {
  fetchGetAchieveLibrary,
  fetchGetAvatars,
  fetchGetBackgrounds,
} from "../../api/apiService";

export default function AchievementsConstructor() {
  const [achievements, setAchievements] = useState<IAchieve[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Получение библиотеки достижений
  useEffect(() => {
    fetchGetAchieveLibrary()
      .then((response) => {
        setAchievements(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении библиотеки достижений:", error);
      });

    // Получение аватаров
    fetchGetAvatars()
      .then((response) => {
        setAvatars(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении аватаров:", error);
      });

    // Получение фоновых изображений
    fetchGetBackgrounds()
      .then((response) => {
        setBackgrounds(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении фоновых изображений:", error);
      });
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
        {achievements
          .filter((achievement) =>
            achievement.data.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
          .map((achievement) => (
            <div
              key={achievement.id}
              className={styles.achievementCard}
              style={{
                backgroundImage: `url(${achievement.data.achiev_style})`,
              }}
            >
              <img src={achievement.data.image} alt={achievement.data.title} />
              <div className={styles.cardContent}>
                <h2>{achievement.data.title}</h2>
                <p>{achievement.data.description}</p>
              </div>
            </div>
          ))}
      </div>
      {isModalOpen && (
        <ModalAddingAchieve
          closeModal={toggleModal}
          avatars={avatars}
          backgrounds={backgrounds}
        />
      )}
    </div>
  );
}
