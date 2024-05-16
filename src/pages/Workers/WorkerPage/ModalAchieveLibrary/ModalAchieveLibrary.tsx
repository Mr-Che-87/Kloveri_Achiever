import { useState, useEffect } from "react";
import styles from "./ModalAchieveLibrary.module.scss";
import { SearchAchieveInput } from "../buttons&inputes/SearchAchieveInput";

//import { IAchieve } from "../../../../mocks/AchieveLibrary";
import { IAchieve } from "../../../../types/IAchieve";
import { IConnection } from "../../../../types/IConnection";


interface ModalAchievementsProps {
  allAchievements: IAchieve[];
  userAchievements: IConnection[];
  closeModal: () => void;
  onAchieveAdd: (achieveId: string) => void; //функция для передачи ачивки родителю
}

export const ModalAchieveLibrary: React.FC<ModalAchievementsProps> = ({ allAchievements, closeModal, onAchieveAdd }) => {
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
//закрытие страницы по кнопке Esc:
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

//вызов функции добавления ачивки юзеру:
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
        <h1>Библиотека достижений</h1>
        <div className={styles.searchInput}>
          <SearchAchieveInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <div className={styles.achievementsList}>
        {allAchievements
            .filter((achieve) =>
              searchQuery ? achieve.data.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
            )
          .map(achieve => (
            <div
            key={achieve.id}
            className={styles.achieveCard}
            style={{
              backgroundImage: `url(${achieve.data.achiev_style})`,
            }}
          >
              <button className={styles.achieveButton} onClick={() => handleAchieveAdd(achieve.id)}> 
              <img className={styles.achieveImg} src={achieve.data.image} alt={achieve.data.title} />
              <h3 className={styles.achieveTitle}>{achieve.data.title}</h3>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



