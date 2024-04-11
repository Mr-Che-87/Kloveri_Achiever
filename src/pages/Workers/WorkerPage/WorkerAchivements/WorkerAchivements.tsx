import { useState, useEffect } from "react";

import styles from "./WorkerAchivements.module.scss";
import { GiveAchieveButton } from "../buttons&inputes/GiveAchieveButton";
import { SearchAchieveInput } from "../buttons&inputes/SearchAchieveInput";
import { AllAchieveButton } from "../buttons&inputes/AllAchieveButton";

// Убран неиспользуемый импорт mockAchieveLibrary
import { IAchieve } from "../../../../mocks/AchieveLibrary";
import { ModalAchieveLibrary } from "../ModalAchieveLibrary/ModalAchieveLibrary";

export default function WorkerAchivements() {
  const [achiveList, setAchiveList] = useState<IAchieve[]>(mockAchieveLibrary);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    // Динамический импорт данных из AchieveLibrary.ts:
    import("../../../../mocks/AchieveLibrary").then(({ mockAchieveLibrary }) => {
      const storedAchieves = localStorage.getItem("achieveList");
      if (storedAchieves) {
        setAchiveList(JSON.parse(storedAchieves));
      } else {
        setAchiveList(mockAchieveLibrary);
        localStorage.setItem("achieveList", JSON.stringify(mockAchieveLibrary));
      }
    });
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Функция добавления ачивки:
  const addAchieve = (achive: IAchieve) => {
    const updatedAchieves = achiveList.map((item) =>
      item.id === achive.id ? { ...item, added: true } : item
    );
    setAchiveList(updatedAchieves);
    //сохраняем в историю по ключу "achieveList", запарсив изменённый список ачивок:
    localStorage.setItem("achieveList", JSON.stringify(updatedAchieves)); 
  };

   // Функция удаления ачивки
   const removeAchieve = (id: number) => {
    const updatedAchieves = achiveList.map((item) =>
      item.id === id ? { ...item, added: false } : item
    );
    setAchiveList(updatedAchieves);
    localStorage.setItem("achieveList", JSON.stringify(updatedAchieves));
  };

  return (
    <div className={styles.workerAchievements}>
      <h1>Достижения</h1>
      <div className={styles.workerAchivementsNav}>
      <ul>
        <li><GiveAchieveButton onClick={openModal}/></li>
        <li><SearchAchieveInput /></li>
        <li><AllAchieveButton /></li>
      </ul>
      </div>

      <div className={styles.workerAchivementsList}>
      {achiveList.filter(achive => achive.added).map((achive) => (
          <div key={achive.id} className={styles.achiveItem}>
            <button>
              <img src={achive.image} alt={achive.title} />
              <h3 className={styles.achiveTitle}>{achive.title}</h3>
              <button className={styles.removeButton} onClick={() => removeAchieve(achive.id)}>
                &times;
              </button>
            </div>
          ))}
      </div>

      {showModal && (
        <ModalAchieveLibrary achiveList={achiveList} closeModal={closeModal} onAchieveAdd={addAchieve} />
      )}
    </div>
  );
}
