import React from "react";
import styles from "./ModalAchieveLibrary.module.scss";
import { IAchieve } from "../../../../mocks/AchieveLibrary";
//TODO:  fetchGetAchieveLibrary  - !!!!!!!!!!!!!!!!!!!!!!
//ЛИБО ТУТ:  fetchPostUserAchieve    - !!!!!!фильтр от Лёни!!!!

interface ModalAchievementsProps {
  achieveList: IAchieve[];
  closeModal: () => void;
  onAchieveAdd: (achieve: IAchieve) => void; //  функция для передачи ачивки родителю
}

export const ModalAchieveLibrary: React.FC<ModalAchievementsProps> = ({
  achieveList,
  closeModal,
  onAchieveAdd,
}) => {
  //ЛИБО ТУТ(либо в мок-заглушке)  - GET-запрос на всю библиотеку ачивок fetchGetAchieveLibrary

  const handleAchieveAdd = (achieve: IAchieve) => {
    onAchieveAdd(achieve); //вызываем функцию родителя при добавлении ачивки

    //ЛИБО ТУТ(либо в WorkerAchievements) - POST-запрос user-achiev(соединяет юзера и награду) - !!!!фильтр от Лёни!!!!

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
              <button onClick={() => handleAchieveAdd(achieve)}>
                {" "}
                {/* Добавляем обработчик на кнопку */}
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
