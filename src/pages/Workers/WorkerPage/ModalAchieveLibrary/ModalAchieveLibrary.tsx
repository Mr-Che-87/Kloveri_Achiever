import React from "react";
import styles from "./ModalAchieveLibrary.module.scss";

//import { IAchieve } from "../../../../mocks/AchieveLibrary";
import { IAchieve } from "../../../../types/IAchieve";


interface ModalAchievementsProps {
  allAchievements: IAchieve[];
  userAchievements: IAchieve[];
  closeModal: () => void;
  onAchieveAdd: (achieve: IAchieve) => void; //  функция для передачи ачивки родителю
}


export const ModalAchieveLibrary: React.FC<ModalAchievementsProps> = ({ allAchievements, userAchievements,  closeModal, onAchieveAdd }) => {

  const handleAchieveAdd = (achieve: IAchieve) => {
    onAchieveAdd(achieve); //вызываем функцию родителя при добавлении ачивки
     
    //????ЛИБО ТУТ(либо в WorkerAchievements) - POST-запрос user-achiev(соединяет юзера и награду)
        
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
              <button onClick={() => handleAchieveAdd(achieve)}> 
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


