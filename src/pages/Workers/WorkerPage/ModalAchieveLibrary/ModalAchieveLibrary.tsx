import React from "react";
import styles from "./ModalAchieveLibrary.module.scss";
import { IAchieve } from "../../../../mocks/AchieveLibrary";

interface ModalAchievementsProps {
  achieveList: IAchieve[];
  closeModal: () => void;
  onAchieveAdd: (achieve: IAchieve) => void; //  функция для передачи ачивки родителю
}


export const ModalAchieveLibrary: React.FC<ModalAchievementsProps> = ({ achieveList, closeModal, onAchieveAdd }) => {
  const handleAchieveAdd = (achieve: IAchieve) => {
    onAchieveAdd(achieve); // Вызываем функцию родителя при добавлении ачивки
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
          {achieveList.map((achieve) => (
            <div key={achieve.id} className={styles.achieveItem}>
              <button onClick={() => handleAchieveAdd(achieve)}> {/* Добавляем обработчик на кнопку */}
              <img src={achieve.image} alt={achieve.title} />
              <h3 className={styles.achieveTitle}>{achieve.title}</h3>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


