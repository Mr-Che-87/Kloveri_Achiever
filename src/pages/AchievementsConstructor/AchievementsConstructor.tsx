import styles from "../../pages/AchievementsConstructor/AchievementsConstructor.module.scss";
import { useEffect, useState } from "react";

import ModalAddingAchieve from "./ModalAddingAchieve";
import ModalConfirmDelete from "./ModalConfirmDelete"; // Импорт нового компонента
import { SearchAllAchieveInput } from "../Workers/WorkerPage/buttons&inputes/SearchAllAchieveInput";
import BookAvatar from "../../assets/book-icon.png";

import { IAchieve } from "../../types/IAchieve";
import {
  fetchGetAchieveLibrary,
  fetchGetAvatars,
  fetchGetBackgrounds,
  fetchDeleteAchieve, // Импорт метода удаления достижения
} from "../../api/apiService";

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
    setAchievements((prevAchievements) => [...prevAchievements, newAchieve]);
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
              style={{
                "--background-image": `url(${achievement.data.achiev_style})`,
              }}
            >
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteClick(achievement.id)}
              >
                &#128465;
              </button>
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
