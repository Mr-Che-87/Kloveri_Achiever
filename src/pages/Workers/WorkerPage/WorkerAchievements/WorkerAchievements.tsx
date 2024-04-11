import { useState, useEffect } from "react";

import styles from "./WorkerAchievements.module.scss";
import { GiveAchieveButton } from "../buttons&inputes/GiveAchieveButton";
import { SearchAchieveInput } from "../buttons&inputes/SearchAchieveInput";
import { AllAchieveButton } from "../buttons&inputes/AllAchieveButton";

import { mockAchieveLibrary, IAchieve } from "../../../../mocks/AchieveLibrary";
import { ModalAchieveLibrary } from "../ModalAchieveLibrary/ModalAchieveLibrary";

export default function WorkerAchievements() {
  const [achieveList, setAchieveList] = useState<IAchieve[]>(mockAchieveLibrary);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  //отображение актуального списка добавленных ачивок и сохранение их в localStorage:
  useEffect(() => {

    setAchieveList(mockAchieveLibrary);
    
    /*
    const storedAchieves = localStorage.getItem("achieveList");
      if (storedAchieves) {
        setAchieveList(JSON.parse(storedAchieves));
      } else {
        setAchieveList(mockAchieveLibrary);
        localStorage.setItem("achieveList", JSON.stringify(mockAchieveLibrary));
      }
      */

      
    
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addAchieve = (achive: IAchieve) => {
    const updatedAchieves = achieveList.map((item) =>
      item.id === achive.id ? { ...item, added: true } : item
    );
    setAchieveList(updatedAchieves);
    localStorage.setItem("achieveList", JSON.stringify(updatedAchieves));
  };

   // Функция удаления ачивки
   const removeAchieve = (id: number) => {
    const updatedAchieves = achieveList.map((item) =>
      item.id === id ? { ...item, added: false } : item
    );
    setAchieveList(updatedAchieves);
    localStorage.setItem("achieveList", JSON.stringify(updatedAchieves));
  };


  return (
    <div className={styles.workerAchievements}>
      <h1>Достижения</h1>
      <div className={styles.workerAchievementsNav}>
      <ul>
        <li><GiveAchieveButton onClick={openModal}/></li>
        <li><SearchAchieveInput searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
       </li>
        <li><AllAchieveButton /></li>
      </ul>
      </div>

      <div className={styles.workerAchievementsList}>
      {achieveList.filter(achieve => achieve.added).map((achive) => (
          <div key={achive.id} className={styles.achieveItem}>
            <button>
              <img src={achive.image} alt={achive.title} />
              <h3 className={styles.achieveTitle}>{achive.title}</h3>
              <button className={styles.removeButton} onClick={() => removeAchieve(achive.id)}>
                &times;
              </button>
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <ModalAchieveLibrary achieveList={achieveList} closeModal={closeModal} onAchieveAdd={addAchieve} />
      )}
    </div>
  );
}
