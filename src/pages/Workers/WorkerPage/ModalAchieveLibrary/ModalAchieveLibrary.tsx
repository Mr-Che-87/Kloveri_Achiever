import React from "react";
import styles from "./ModalAchieveLibrary.module.scss";
import { IAchieve } from "../../../../mocks/AchieveLibrary";

interface ModalAchievementsProps {
  achiveList: IAchieve[];
  closeModal: () => void;
  onAchieveAdd: (achive: IAchieve) => void; //  функция для передачи ачивки родителю
}


export const ModalAchieveLibrary: React.FC<ModalAchievementsProps> = ({ achiveList, closeModal, onAchieveAdd }) => {
  const handleAchieveAdd = (achive: IAchieve) => {
    onAchieveAdd(achive); // Вызываем функцию родителя при добавлении ачивки
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
          {achiveList.map((achive) => (
            <div key={achive.id} className={styles.achiveItem}>
              <button onClick={() => handleAchieveAdd(achive)}> {/* Добавляем обработчик на кнопку */}
              <img src={achive.image} alt={achive.title} />
              <h3 className={styles.achiveTitle}>{achive.title}</h3>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


