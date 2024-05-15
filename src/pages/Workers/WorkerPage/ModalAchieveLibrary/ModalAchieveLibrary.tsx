import React from "react";
import styles from "./ModalAchieveLibrary.module.scss";

//import { IAchieve } from "../../../../mocks/AchieveLibrary";
import { IAchieve } from "../../../../types/IAchieve";


interface ModalAchievementsProps {
  allAchievements: IAchieve[];
  userAchievements: IAchieve[];
  closeModal: () => void;
  onAchieveAdd: (achieveId: string) => void; //функция для передачи ачивки родителю
}

export const ModalAchieveLibrary: React.FC<ModalAchievementsProps> = ({ allAchievements, closeModal, onAchieveAdd }) => {

  const handleAchieveAdd = (achieveId: string) => {
    //console.log("Модалка: Добавление пользователю ачивки с achieveId:", achieveId); 
    onAchieveAdd(achieveId); //вызываем функцию родителя при добавлении ачивки
              
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
          {allAchievements.map(achieve => (
            <div key={achieve.id} className={styles.achieveItem}>
              <button onClick={() => handleAchieveAdd(achieve.id)}> 
              <img src={achieve.data.image} alt={achieve.data.title} />
              <h3 className={styles.achieveTitle}>{achieve.data.title}</h3>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



