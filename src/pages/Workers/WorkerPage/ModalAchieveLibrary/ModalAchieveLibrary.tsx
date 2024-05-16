import React from "react";
import styles from "./ModalAchieveLibrary.module.scss";
import { IAchieve } from "../../../../types/IAchieve";

interface ModalAchievementsProps {
  allAchievements: IAchieve[];
  closeModal: () => void;
  onAchieveAdd: (achieveId: string) => void; // функция для передачи ачивки родителю
}

export const ModalAchieveLibrary: React.FC<ModalAchievementsProps> = ({
  allAchievements,
  closeModal,
  onAchieveAdd,
}) => {
  const handleAchieveAdd = (achieveId: string) => {
    onAchieveAdd(achieveId); // вызываем функцию родителя при добавлении ачивки
    closeModal(); // Закрываем модальное окно
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={closeModal}>
          &times;
        </button>
        <h2>Библиотека достижений</h2>
        <div className={styles.achievementsList}>
          {allAchievements.map((achieve) => (
            <div
              key={achieve.id}
              className={styles.achieveCard}
              style={{
                backgroundImage: `url(${achieve.data.achiev_style})`,
              }}
            >
              <button
                className={styles.achieveButton}
                onClick={() => handleAchieveAdd(achieve.id)}
              >
                <img
                  className={styles.achieveImg}
                  src={achieve.data.image}
                  alt={achieve.data.title}
                />
                <h3 className={styles.achieveTitle}>{achieve.data.title}</h3>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
