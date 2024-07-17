import styles from "./AchievementsConstructor.module.scss";
import { useEffect, useState, CSSProperties } from "react";

import ModalAddingAchieve from "./ModalAddingAchieve";
import ModalConfirmDelete from "./ModalConfirmDelete"; 
import { SearchAchieveInput } from "./buttons&inputes/SearchAchieveInput";
import BookAvatar from "../../assets/book-icon.png";

import { IAchieve } from "../../types/IAchieve";
import {
  fetchGetAchieveLibrary,
  fetchGetAvatars,
  fetchGetBackgrounds,
  fetchDeleteAchieve, 
} from "../../api/apiService";


interface CSSPropertiesWithVars extends CSSProperties {
  '--background-image'?: string;
}

export default function AchievementsConstructor() {
  const [achievements, setAchievements] = useState<IAchieve[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Состояние для модального окна подтверждения
  const [selectedAchieveId, setSelectedAchieveId] = useState<string | null>(
    null
  ); // Состояние для выбранного достижения
  const [avatars, setAvatars] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleConfirmModal = () => {
    setIsConfirmModalOpen(!isConfirmModalOpen);
  };

  const handleDeleteClick = (achieveId: string) => {
    setSelectedAchieveId(achieveId);
    toggleConfirmModal();
  };

  const confirmDeleteAchieve = () => {
    if (selectedAchieveId) {
      fetchDeleteAchieve(selectedAchieveId)
        .then(() => {
          setAchievements(
            achievements.filter((achieve) => achieve.id !== selectedAchieveId)
          );
          toggleConfirmModal();
        })
        .catch((error) => {
          console.error("Ошибка при удалении достижения:", error);
        });
    }
  };

  const handleAchieveAdd = (newAchieve: IAchieve) => {
    setAchievements((prevAchievements) => [ newAchieve, ...prevAchievements ]);
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
        <img src={BookAvatar} alt="Конструктор достижений" />
        <h1>Конструктор достижений</h1>
      </div>
      <div className={styles.searchAchieveInputContainer}>
        <SearchAchieveInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.achievementsGrid}>
        <button
          onClick={toggleModal}
          className={styles.createAchievementButton}
        ></button>
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
              style={
                {
                  '--background-image': `url(${achievement.data.achiev_style})`,
                } as CSSPropertiesWithVars
              }
            >
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteClick(achievement.id)}
              >
                &#128465;
              </button>
              <img 
                className={styles.achieveImg}
                src={achievement.data.image} 
                alt={achievement.data.title} 
              />
              <div className={styles.achieveContent}>
                <h2 className={styles.achieveTitle}>
                  {achievement.data.title}
                </h2>
                <p className={styles.achieveDescription}>
                  {achievement.data.description.length > 100 
                    ? achievement.data.description.slice(0, 100) + '...' 
                    : achievement.data.description}
                </p>
                <div className={styles.achieveRank}>
                  {achievement.data.rank}<span>&nbsp;&#x20BF;</span>
                </div>
              </div>
            </div>
          ))}
      </div>
      {isModalOpen && (
        <ModalAddingAchieve
          closeModal={toggleModal}
          avatars={avatars}
          backgrounds={backgrounds}
          onAchieveAdd={handleAchieveAdd}
        />
      )}
      {isConfirmModalOpen && (
        <ModalConfirmDelete
          closeModal={toggleConfirmModal}
          confirmDelete={confirmDeleteAchieve}
        />
      )}
    </div>
  );
}
