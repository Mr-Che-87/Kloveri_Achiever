import { useState, useEffect, CSSProperties } from "react";
import styles from "./ModalAchieveLibrary.module.scss";
import { SearchAchieveInput } from "../buttons&inputes/SearchAchieveInput";
import BookAvatar from "../../../assets/book-icon.png";

//import { IAchieve } from "../../../../mocks/AchieveLibrary";
import { IAchieve } from "../../../types/IAchieve";
import { IConnection } from "../../../types/IConnection";


interface ModalAchievementsProps {
  allAchievements: IAchieve[];
  userAchievements: IConnection[];
  closeModal: () => void;
}
interface CSSPropertiesWithVars extends CSSProperties {
  '--background-image'?: string;
}

export const ModalAchieveLibrary: React.FC<ModalAchievementsProps> = ({ 
  allAchievements, 
  closeModal, 
}) => {
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
    

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={closeModal}>
          &times;
        </button>
        <div className={styles.titleContainer}>
          <img src={BookAvatar} alt="Библиотека достижений" />
          <h1>Библиотека достижений</h1>
        </div>
        <div className={styles.searchInput}>
          <SearchAchieveInput 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          />
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
            style={
              {
                '--background-image': `url(${achieve.data.achiev_style})`,
              } as CSSPropertiesWithVars
            }
          >
              <button className={styles.achieveButton} >
                  <img
                    className={styles.achieveImg}
                    src={achieve.data.image}
                    alt={achieve.data.title}
                  />
                  <div className={styles.achieveContent}>
                    <h2 className={styles.achieveTitle}>
                      {achieve.data.title}
                    </h2>
                    <p className={styles.achieveDescription}>
                    {achieve.data.description.length > 100 
                      ? achieve.data.description.slice(0, 100) + '...' 
                      : achieve.data.description}
                  </p>
                  <div className={styles.achieveRank}>
                    {achieve.data.rank}<span>&nbsp;&#x20BF;</span>
                  </div>
                </div>
                </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};





/*
//МОДАЛКО_ПИЗДЕЦ (не удалять пока)


interface ModalAchievementsProps {
  allAchievements: IAchieve[];
  userAchievements: IConnection[];
  closeModal: () => void;
  onAchieveAdd: (achieveId: string) => void; 
  setShowAddModal: (show: boolean) => void;  //*мутки с модалками
  setShowConfirmModal: (show: boolean) => void;   //*мутки с модалками
  setShowDeleteModal: (show: boolean) => void;  //*мутки с модалками
}

export const ModalAchieveLibrary: React.FC<ModalAchievementsProps> = ({ allAchievements, closeModal, onAchieveAdd, setShowAddModal, setShowConfirmModal, setShowDeleteModal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAchieveId, setSelectedAchieveId] = useState<string | null>(null);  //*мутки с модалками


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



//*мутки с модалками(начало)  
  const openAddModal = (achieveId: string) => {
    if (achieveId) {
      setSelectedAchieveId(achieveId);
      setShowAddModal(true);
    }
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
    setShowAddModal(false);
  };

//вызов функции добавления ачивки юзеру:
  const handleAchieveAdd = (achieveId: string) => {
    //console.log("Модалка: Добавление пользователю ачивки с achieveId:", achieveId); 
    openAddModal(achieveId)
    onAchieveAdd(achieveId);//вызываем функцию родителя при добавлении ачивки 
    //setShowConfirmModal(true);  //по ней 2 раза ачивка добавляется
    handleCancel();
    closeModal(); // Закрываем модальное окно
};
//мутки с модалками(конец)*  

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
*/

